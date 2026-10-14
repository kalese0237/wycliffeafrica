/**
 * Creates the `questionnaire_submissions` collection behind /questionnaire and lets the website's
 * "Site (read-only)" policy create rows in it. The site writes submissions and never reads them back;
 * the membership team works them in Directus.
 *
 * Each row carries a `review` status (new → contacted → closed) so the team can track follow-up.
 * It is not part of the public create permission: new rows are always forced to `new`.
 *
 * Idempotent: safe to re-run. An existing collection is left in place and only its field definitions,
 * collection settings and the Site create permission are reconciled. No rows are created or changed.
 *
 * Usage:
 *   DIRECTUS_URL=... DIRECTUS_ADMIN_TOKEN=... node scripts/add-questionnaire-submissions-collection.mjs
 */

const DIRECTUS_URL = process.env.DIRECTUS_URL?.replace(/\/$/, "");
const ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;

if (!DIRECTUS_URL || !ADMIN_TOKEN) {
  console.error("Set DIRECTUS_URL and DIRECTUS_ADMIN_TOKEN.");
  process.exit(1);
}

const COLLECTION = "questionnaire_submissions";

/** What the website may set on create. Matches QuestionnaireSubmissionInput in src/lib/directus/schema.ts. */
const CREATE_FIELDS = ["first_name", "last_name", "email", "phone", "country", "church", "skills", "motivation"];

const text = (field, note, extra = {}) => ({
  field,
  type: "string",
  schema: {},
  meta: { interface: "input", width: "half", note, ...extra },
});

const FIELDS = [
  {
    field: "id",
    type: "uuid",
    schema: { is_primary_key: true },
    meta: { special: ["uuid"], readonly: true, hidden: true },
  },
  {
    field: "review",
    type: "string",
    schema: { default_value: "new" },
    meta: {
      interface: "select-dropdown",
      display: "labels",
      width: "half",
      note: "Where this person is in the follow-up. The website always files new submissions as New.",
      options: {
        choices: [
          { text: "New", value: "new" },
          { text: "Contacted", value: "contacted" },
          { text: "Closed", value: "closed" },
        ],
      },
    },
  },
  { ...text("first_name", "", { required: true }), schema: { is_nullable: false } },
  { ...text("last_name", "", { required: true }), schema: { is_nullable: false } },
  { ...text("email", "", { required: true }), schema: { is_nullable: false } },
  text("phone", ""),
  { ...text("country", "Country of residence", { required: true }), schema: { is_nullable: false } },
  text("church", "Church and denomination", { width: "full" }),
  {
    field: "skills",
    type: "text",
    schema: {},
    meta: { interface: "input-multiline", note: "Skills or training they would bring." },
  },
  {
    field: "motivation",
    type: "text",
    schema: {},
    meta: { interface: "input-multiline", note: "Why they are interested in serving." },
  },
  {
    field: "date_created",
    type: "timestamp",
    schema: {},
    meta: { special: ["date-created"], readonly: true, width: "half" },
  },
];

const COLLECTION_META = {
  icon: "assignment_ind",
  note: "Preliminary questionnaire responses from /questionnaire",
  display_template: "{{first_name}} {{last_name}} · {{country}}",
  sort_field: null,
  archive_field: "review",
  archive_value: "closed",
  unarchive_value: "new",
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

  // Create only: no read, update or delete, so a leaked website token cannot read applicants back.
  const permission = { fields: CREATE_FIELDS, presets: { review: "new" } };
  const createPermission = await findOne(
    `/permissions?filter[policy][_eq]=${sitePolicy.id}&filter[collection][_eq]=${COLLECTION}&filter[action][_eq]=create`,
  );
  if (createPermission) {
    await api(`/permissions/${createPermission.id}`, { method: "PATCH", body: permission });
  } else {
    await api("/permissions", {
      method: "POST",
      body: { policy: sitePolicy.id, collection: COLLECTION, action: "create", ...permission },
    });
  }
  console.log("✓ Site (read-only) can create questionnaire submissions (and nothing else on them)");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
