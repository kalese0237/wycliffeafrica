/**
 * Creates the `staff_positions` collection behind /careers, lets the public "Site (read-only)"
 * policy read published rows only, and adds the collection to the "Revalidate site cache" flow.
 *
 * The office opens a position by publishing it and closes it by archiving it once filled. Drafts are
 * never public. Rows are ordered by the drag handle in the Directus list view (`sort`), then by title.
 *
 * Idempotent: safe to re-run. An existing collection is left in place and only its field definitions,
 * collection settings and the Site read permission are reconciled. No rows are created or changed.
 *
 * Usage:
 *   DIRECTUS_URL=... DIRECTUS_ADMIN_TOKEN=... node scripts/add-staff-positions-collection.mjs
 */

const DIRECTUS_URL = process.env.DIRECTUS_URL?.replace(/\/$/, "");
const ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;

if (!DIRECTUS_URL || !ADMIN_TOKEN) {
  console.error("Set DIRECTUS_URL and DIRECTUS_ADMIN_TOKEN.");
  process.exit(1);
}

const COLLECTION = "staff_positions";
const REVALIDATE_FLOW = "Revalidate site cache";

/** What the public site may read. Matches STAFF_POSITION_PUBLIC_FIELDS in src/lib/directus/queries.ts. */
const PUBLIC_FIELDS = ["id", "status", "sort", "title", "area", "location", "commitment", "summary", "requirements"];

const FIELDS = [
  {
    field: "id",
    type: "uuid",
    schema: { is_primary_key: true },
    meta: { special: ["uuid"], readonly: true, hidden: true },
  },
  {
    field: "status",
    type: "string",
    schema: { default_value: "draft" },
    meta: {
      interface: "select-dropdown",
      display: "labels",
      width: "half",
      note: "Only published positions appear on /careers. Archive a position once it is filled.",
      options: {
        choices: [
          { text: "Draft", value: "draft" },
          { text: "Published (open)", value: "published" },
          { text: "Archived (filled or closed)", value: "archived" },
        ],
      },
    },
  },
  { field: "sort", type: "integer", schema: {}, meta: { interface: "input", hidden: true } },
  {
    field: "title",
    type: "string",
    schema: { is_nullable: false },
    meta: { interface: "input", required: true, note: "The role, e.g. Finance Officer." },
  },
  {
    field: "area",
    type: "string",
    schema: {},
    meta: { interface: "input", width: "half", note: "The discipline, e.g. Finance, IT, Translation." },
  },
  {
    field: "location",
    type: "string",
    schema: {},
    meta: { interface: "input", width: "half", note: "Where the work is done, e.g. Nairobi, Kenya or Remote." },
  },
  {
    field: "commitment",
    type: "string",
    schema: {},
    meta: {
      interface: "select-dropdown",
      width: "half",
      options: {
        allowOther: true,
        choices: [
          { text: "Full-time", value: "Full-time" },
          { text: "Part-time", value: "Part-time" },
          { text: "Short-term", value: "Short-term" },
        ],
      },
    },
  },
  {
    field: "summary",
    type: "text",
    schema: { is_nullable: false },
    meta: { interface: "input-multiline", required: true, note: "What the role is for, in a sentence or two." },
  },
  {
    field: "requirements",
    type: "text",
    schema: {},
    meta: { interface: "input-multiline", note: "What the person needs to bring. One per line." },
  },
  {
    field: "date_created",
    type: "timestamp",
    schema: {},
    meta: { special: ["date-created"], readonly: true, hidden: true },
  },
  {
    field: "date_updated",
    type: "timestamp",
    schema: {},
    meta: { special: ["date-updated"], readonly: true, hidden: true },
  },
];

const COLLECTION_META = {
  icon: "work",
  note: "Open staff positions listed on /careers",
  display_template: "{{title}}",
  sort_field: "sort",
  archive_field: "status",
  archive_value: "archived",
  unarchive_value: "draft",
};

async function api(path, { method = "GET", body, ok404 = false } = {}) {
  const response = await fetch(`${DIRECTUS_URL}${path}`, {
    method,
    signal: AbortSignal.timeout(20_000),
    headers: {
      Authorization: `Bearer ${ADMIN_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  // Directus answers 403 (not 404) for collections that don't exist.
  if (ok404 && (response.status === 404 || response.status === 403)) return null;
  if (!response.ok) {
    throw new Error(`${method} ${path} → ${response.status}: ${(await response.text()).slice(0, 500)}`);
  }
  if (response.status === 204) return null;
  return (await response.json()).data;
}

async function findOne(path) {
  return (await api(`${path}${path.includes("?") ? "&" : "?"}limit=1`))[0] ?? null;
}

async function ensureFields() {
  const current = new Set((await api(`/fields/${COLLECTION}`)).map((field) => field.field));
  for (const definition of FIELDS) {
    if (definition.field === "id") continue;
    if (current.has(definition.field)) {
      await api(`/fields/${COLLECTION}/${definition.field}`, { method: "PATCH", body: { meta: definition.meta } });
    } else {
      await api(`/fields/${COLLECTION}`, { method: "POST", body: definition });
    }
  }
}

async function main() {
  const existing = await api(`/collections/${COLLECTION}`, { ok404: true });
  if (existing) {
    await ensureFields();
    await api(`/collections/${COLLECTION}`, { method: "PATCH", body: { meta: COLLECTION_META } });
    console.log(`✓ ${COLLECTION} already existed; fields and settings reconciled`);
  } else {
    await api("/collections", {
      method: "POST",
      body: { collection: COLLECTION, schema: {}, meta: COLLECTION_META, fields: FIELDS },
    });
    console.log(`✓ ${COLLECTION} collection created`);
  }

  const sitePolicy = await findOne(`/policies?filter[name][_eq]=${encodeURIComponent("Site (read-only)")}`);
  if (!sitePolicy) throw new Error('Policy "Site (read-only)" not found.');

  const permission = {
    fields: PUBLIC_FIELDS,
    permissions: { status: { _eq: "published" } },
  };
  const readPermission = await findOne(
    `/permissions?filter[policy][_eq]=${sitePolicy.id}&filter[collection][_eq]=${COLLECTION}&filter[action][_eq]=read`,
  );
  if (readPermission) {
    await api(`/permissions/${readPermission.id}`, { method: "PATCH", body: permission });
  } else {
    await api("/permissions", {
      method: "POST",
      body: { policy: sitePolicy.id, collection: COLLECTION, action: "read", ...permission },
    });
  }
  console.log("✓ Site (read-only) can read published staff positions only");

  // The flow that calls /api/revalidate is scoped to named collections; without this, opening or
  // closing a position waits out the 5-minute content cache.
  const flow = await findOne(`/flows?filter[name][_eq]=${encodeURIComponent(REVALIDATE_FLOW)}`);
  if (!flow) {
    console.log(`- no "${REVALIDATE_FLOW}" flow found; changes appear within the 5-minute cache window`);
    return;
  }
  const collections = flow.options?.collections ?? [];
  if (!collections.includes(COLLECTION)) {
    await api(`/flows/${flow.id}`, {
      method: "PATCH",
      body: { options: { ...flow.options, collections: [...collections, COLLECTION] } },
    });
  }
  console.log(`✓ "${REVALIDATE_FLOW}" flow fires for ${COLLECTION}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
