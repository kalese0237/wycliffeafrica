/**
 * Migrates the legacy `field_updates` collection to `prayer_requests`.
 * Directus has no in-place collection rename, so this creates the new
 * collection (base fields only — run scripts/setup-missionary-portal.mjs
 * afterward to add the review fields, relations, and permissions) and
 * copies every row across by id.
 *
 * Safe to re-run: each row is upserted by id, so running this again after
 * setup-missionary-portal.mjs backfills reviewNotes/reviewedAt/reviewedBy,
 * and also picks up anything submitted to field_updates in the meantime.
 *
 * Usage:
 *   DIRECTUS_URL=... DIRECTUS_ADMIN_TOKEN=... node scripts/migrate-field-updates-to-prayer-requests.mjs
 *   DIRECTUS_URL=... DIRECTUS_ADMIN_TOKEN=... node scripts/migrate-field-updates-to-prayer-requests.mjs --delete-old
 *
 * --delete-old removes the field_updates collection (and its now-orphaned
 * fields/relations/permissions/presets) once row counts match. Omit it on
 * every run until you've verified prayer_requests works end to end.
 */

const DIRECTUS_URL = process.env.DIRECTUS_URL?.replace(/\/$/, "");
const ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;
const DELETE_OLD = process.argv.includes("--delete-old");

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
  // Directus returns 403, not 404, for a single item that doesn't exist —
  // even for a full admin token — so treat both as "not found" here.
  if (ok404 && (response.status === 404 || response.status === 403)) return null;
  if (!response.ok) {
    throw new Error(`${method} ${path} → ${response.status}: ${(await response.text()).slice(0, 500)}`);
  }
  if (response.status === 204) return null;
  return (await response.json()).data;
}

async function prayerRequestsCollectionExists() {
  // Directus's /collections/{name} returns 403, not 404, for a collection
  // that doesn't exist — even for a full admin — so treat both as "missing".
  const response = await fetch(`${DIRECTUS_URL}/collections/prayer_requests`, {
    headers: { Authorization: `Bearer ${ADMIN_TOKEN}` },
    signal: AbortSignal.timeout(20_000),
  });
  if (response.status === 404 || response.status === 403) return false;
  if (!response.ok) throw new Error(`GET /collections/prayer_requests → ${response.status}`);
  return true;
}

async function ensurePrayerRequestsCollection() {
  if (await prayerRequestsCollectionExists()) {
    console.log("✓ prayer_requests collection already exists");
    return;
  }
  await api("/collections", {
    method: "POST",
    body: {
      collection: "prayer_requests",
      schema: {},
      meta: {
        icon: "volunteer_activism",
        note: "Prayer requests drafted via the missionary portal",
        archive_field: "status",
        archive_value: "archived",
        unarchive_value: "draft",
      },
      fields: [
        { field: "id", type: "uuid", schema: { is_primary_key: true }, meta: { special: ["uuid"], readonly: true } },
        {
          field: "status",
          type: "string",
          schema: { default_value: "draft" },
          meta: {
            interface: "select-dropdown",
            options: { choices: [
              { text: "Draft (in review)", value: "draft" },
              { text: "Published", value: "published" },
              { text: "Archived", value: "archived" },
            ] },
          },
        },
        {
          field: "type",
          type: "string",
          schema: { default_value: "prayer" },
          meta: { interface: "select-dropdown", options: { choices: [{ text: "Prayer request", value: "prayer" }] } },
        },
        { field: "missionaryId", type: "string", schema: {}, meta: { interface: "input" } },
        { field: "title", type: "string", schema: {}, meta: { interface: "input" } },
        { field: "body", type: "text", schema: {}, meta: { interface: "input-multiline" } },
        { field: "date", type: "string", schema: {}, meta: { interface: "input" } },
        { field: "sensitive", type: "boolean", schema: { default_value: false }, meta: { interface: "boolean" } },
        { field: "image", type: "string", schema: {}, meta: { interface: "input" } },
        { field: "user_created", type: "uuid", schema: {}, meta: { special: ["user-created"], hidden: true } },
        { field: "date_created", type: "timestamp", schema: {}, meta: { special: ["date-created"], hidden: true } },
      ],
    },
  });
  console.log("✓ created prayer_requests collection (base fields only)");
}

function basePayload(row) {
  return {
    status: row.status,
    type: row.type,
    missionaryId: row.missionaryId,
    title: row.title,
    body: row.body,
    date: row.date,
    sensitive: row.sensitive,
    image: row.image,
  };
}

function fullPayload(row) {
  const payload = basePayload(row);
  for (const field of ["reviewNotes", "reviewedAt", "reviewedBy"]) {
    if (row[field] !== undefined) payload[field] = row[field];
  }
  return payload;
}

async function upsertRow(row) {
  const existing = await api(`/items/prayer_requests/${row.id}`, { ok404: true });
  const attempt = (payload) =>
    existing
      ? api(`/items/prayer_requests/${row.id}`, { method: "PATCH", body: payload })
      : api("/items/prayer_requests", { method: "POST", body: { id: row.id, ...payload } });

  try {
    await attempt(fullPayload(row));
    return { id: row.id, action: existing ? "updated" : "created" };
  } catch {
    try {
      await attempt(basePayload(row));
      return { id: row.id, action: existing ? "updated" : "created" };
    } catch (error) {
      return { id: row.id, action: "failed", error: error.message };
    }
  }
}

async function main() {
  await ensurePrayerRequestsCollection();

  const rows = await api("/items/field_updates?fields=*&limit=-1");
  console.log(`fetched ${rows.length} row(s) from field_updates`);

  const results = [];
  for (const row of rows) results.push(await upsertRow(row));

  const created = results.filter((r) => r.action === "created").length;
  const updated = results.filter((r) => r.action === "updated").length;
  const failed = results.filter((r) => r.action === "failed");
  console.log(`✓ ${created} created, ${updated} updated, ${failed.length} failed`);
  for (const f of failed) console.error(`  ✗ ${f.id}: ${f.error}`);

  const target = await api("/items/prayer_requests?fields=id&limit=-1");
  console.log(`prayer_requests now has ${target.length} row(s); field_updates has ${rows.length}`);

  if (!DELETE_OLD) {
    console.log(
      "\nNext: run node scripts/setup-missionary-portal.mjs, then re-run this script to backfill review fields.",
    );
    console.log("Pass --delete-old once verified end-to-end to remove the old field_updates collection.");
    if (failed.length) process.exit(1);
    return;
  }

  if (failed.length || target.length < rows.length) {
    console.error("Refusing to delete field_updates: migration is incomplete.");
    process.exit(1);
  }
  await api("/collections/field_updates", { method: "DELETE" });
  console.log("✓ deleted field_updates collection");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
