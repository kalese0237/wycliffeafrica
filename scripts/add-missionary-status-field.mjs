/**
 * Adds a draft/published `status` field to the `missionaries` collection, matching the
 * existing news/prayer_requests workflow, and locks the public "Site (read-only)" policy
 * down to `status: published` so new profiles can be created as drafts without going live.
 *
 * Idempotent — safe to re-run: the one-time backfill (force-publishing every row that predates
 * this field) only runs the first time, when the field doesn't exist yet. Re-running afterward
 * only reconciles the field definition and permission, and won't touch legitimate drafts added
 * later.
 *
 * Usage:
 *   DIRECTUS_URL=... DIRECTUS_ADMIN_TOKEN=... node scripts/add-missionary-status-field.mjs
 */

const DIRECTUS_URL = process.env.DIRECTUS_URL?.replace(/\/$/, "");
const ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;

if (!DIRECTUS_URL || !ADMIN_TOKEN) {
  console.error("Set DIRECTUS_URL and DIRECTUS_ADMIN_TOKEN.");
  process.exit(1);
}

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
  if (ok404 && (response.status === 404 || response.status === 403)) return null;
  if (!response.ok) {
    throw new Error(`${method} ${path} → ${response.status}: ${(await response.text()).slice(0, 500)}`);
  }
  if (response.status === 204) return null;
  return (await response.json()).data;
}

async function ensureField(collection, definition) {
  const current = (await api(`/fields/${collection}`)).find((field) => field.field === definition.field);
  if (current) {
    await api(`/fields/${collection}/${definition.field}`, { method: "PATCH", body: definition });
    return;
  }
  await api(`/fields/${collection}`, { method: "POST", body: definition });
}

async function findOne(path) {
  return (await api(`${path}${path.includes("?") ? "&" : "?"}limit=1`))[0] ?? null;
}

async function main() {
  const fieldAlreadyExisted = (await api("/fields/missionaries")).some((field) => field.field === "status");

  await ensureField("missionaries", {
    field: "status",
    type: "string",
    schema: { default_value: "draft" },
    meta: {
      interface: "select-dropdown",
      options: {
        choices: [
          { text: "Draft (in review)", value: "draft" },
          { text: "Published", value: "published" },
          { text: "Archived", value: "archived" },
        ],
      },
    },
  });
  console.log("✓ missionaries.status field ensured");

  await api("/collections/missionaries", {
    method: "PATCH",
    body: { meta: { archive_field: "status", archive_value: "archived", unarchive_value: "draft" } },
  });
  console.log("✓ missionaries collection archive behavior configured");

  if (fieldAlreadyExisted) {
    console.log("- skipping backfill: status field already existed, so pre-existing rows are left alone");
  } else {
    // Postgres backfills a just-added column's DEFAULT for existing rows immediately (no
    // rewrite needed since PG 11), so every pre-existing row already reads back
    // `status: "draft"` here — there is no "unset" state to detect. These rows were public
    // before this migration ran, so on first creation of the field they're force-published
    // rather than left at its draft default.
    const existing = await api("/items/missionaries?fields=id,status&limit=-1");
    for (const row of existing) {
      await api(`/items/missionaries/${row.id}`, { method: "PATCH", body: { status: "published" } });
    }
    console.log(`✓ force-published ${existing.length} pre-existing missionary row(s)`);
  }

  const sitePolicy = await findOne(`/policies?filter[name][_eq]=${encodeURIComponent("Site (read-only)")}`);
  if (!sitePolicy) throw new Error('Policy "Site (read-only)" not found.');
  const readPermission = await findOne(
    `/permissions?filter[policy][_eq]=${sitePolicy.id}&filter[collection][_eq]=missionaries&filter[action][_eq]=read`,
  );
  if (!readPermission) throw new Error("Site (read-only) has no read permission on missionaries.");
  await api(`/permissions/${readPermission.id}`, {
    method: "PATCH",
    body: { permissions: { status: { _eq: "published" } } },
  });
  console.log("✓ Site (read-only) missionaries read permission now requires status=published");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
