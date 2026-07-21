/**
 * Renames the 6 seeded missionaries' slugs from a single name to a full-name
 * slug (e.g. "otieno" → "samuel-grace-otieno"), matching the convention used
 * for new missionaries going forward. This changes their public profile URLs
 * (/missionaries/otieno → /missionaries/samuel-grace-otieno).
 *
 * Only the `slug` field changes — `id` (used internally by field_updates)
 * and every other field are left untouched.
 *
 * Usage (static admin token):
 *   DIRECTUS_URL=https://directus-production-3ac1.up.railway.app \
 *   DIRECTUS_ADMIN_TOKEN=... \
 *   node scripts/rename-missionary-slugs.mjs
 *
 * Usage (email/password login):
 *   DIRECTUS_URL=https://directus-production-3ac1.up.railway.app \
 *   ADMIN_EMAIL=admin@wycliffeafrica.org \
 *   ADMIN_PASSWORD=... \
 *   node scripts/rename-missionary-slugs.mjs
 */

const DIRECTUS_URL = process.env.DIRECTUS_URL?.replace(/\/$/, "");
const ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!DIRECTUS_URL || (!ADMIN_TOKEN && !(ADMIN_EMAIL && ADMIN_PASSWORD))) {
  console.error("Set DIRECTUS_URL, and either DIRECTUS_ADMIN_TOKEN or ADMIN_EMAIL + ADMIN_PASSWORD.");
  process.exit(1);
}

const RENAMES = {
  barah: "frans-lilian-barah",
  otieno: "samuel-grace-otieno",
  wanjiru: "miriam-wanjiru",
  mwangi: "david-mwangi",
  achieng: "esther-achieng",
  kamau: "joseph-kamau",
  njoroge: "peter-hannah-njoroge",
};

let adminToken = ADMIN_TOKEN ?? null;

async function api(path, { method = "GET", body, ok404 = false } = {}) {
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (ok404 && res.status === 404) return null;
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${method} ${path} → ${res.status}: ${text.slice(0, 400)}`);
  }
  if (res.status === 204) return null;
  return (await res.json()).data;
}

async function main() {
  if (!adminToken) {
    const auth = await api("/auth/login", { method: "POST", body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, mode: "json" } });
    adminToken = auth.access_token;
  }
  console.log("✓ authenticated");

  for (const [id, slug] of Object.entries(RENAMES)) {
    const existing = await api(`/items/missionaries/${id}`, { ok404: true });
    if (!existing) {
      console.log(`- skip "${id}": no such record`);
      continue;
    }
    if (existing.slug === slug) {
      console.log(`- skip "${id}": already "${slug}"`);
      continue;
    }
    await api(`/items/missionaries/${id}`, { method: "PATCH", body: { slug } });
    console.log(`✓ "${id}": slug "${existing.slug}" → "${slug}"`);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
