/**
 * Creates skeleton draft missionary profiles (name + place only) for a batch of missionaries
 * the office wants added to the site. Requires scripts/add-missionary-status-field.mjs to have
 * already been run, so these land as `status: "draft"` and stay off the public site until an
 * admin fills in `roles`/`intro`/`bio`/`image` and publishes them in Directus.
 *
 * Safe to re-run: skips any entry whose `id` or `slug` already exists instead of duplicating it.
 *
 * Usage:
 *   DIRECTUS_URL=... DIRECTUS_ADMIN_TOKEN=... node scripts/add-draft-missionaries.mjs
 */

const DIRECTUS_URL = process.env.DIRECTUS_URL?.replace(/\/$/, "");
const ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;

if (!DIRECTUS_URL || !ADMIN_TOKEN) {
  console.error("Set DIRECTUS_URL and DIRECTUS_ADMIN_TOKEN.");
  process.exit(1);
}

const DRAFTS = [
  { id: "kiptinness", slug: "edwyn-edna-kiptinness", name: "Edwyn & Edna Kiptinness", place: "Kenya" },
  { id: "gudo", slug: "elly-caro-gudo", name: "Elly & Caro Gudo", place: "Kenya" },
  { id: "warachi", slug: "grace-anthony-warachi", name: "Grace & Anthony Warachi", place: "Kenya" },
  { id: "mwendwa", slug: "nicholus-mwendwa", name: "Nicholus Mwendwa", place: "Kenya" },
  { id: "namutala", slug: "joseph-ruth-namutala", name: "Joseph & Ruth Namutala", place: "Kenya" },
  { id: "hirwa", slug: "damalie-israel-hirwa", name: "Damalie & Israel Hirwa", place: "Uganda" },
  { id: "kule", slug: "joyce-kule", name: "Joyce Kule", place: "Uganda" },
  { id: "mwita", slug: "dr-mwita", name: "Dr. Mwita", place: "Tanzania" },
  { id: "rasoambola", slug: "vonjitiana-rasoambola", name: "Vonjitiana Rasoambola", place: "South Africa" },
  { id: "razafinjatoniry-serge", slug: "serge-razafinjatoniry", name: "Serge Razafinjatoniry", place: "South Africa" },
  { id: "gambo", slug: "danjuma-gambo", name: "Danjuma Gambo", place: "Nigeria" },
  { id: "harrison", slug: "byan-harrison", name: "Byan Harrison", place: "Tunisia" },
  { id: "razafinjatoniry-olivia", slug: "olivia-razafinjatoniry", name: "Olivia Razafinjatoniry", place: "Madagascar" },
  { id: "otabil", slug: "arthur-otabil", name: "Arthur Otabil", place: "Ghana" },
  { id: "marara", slug: "martin-faith-marara", name: "Martin & Faith Marara", place: "Cameroon" },
  { id: "wamey", slug: "mary-wamey", name: "Mary Wamey", place: "Cameroon" },
  { id: "muchesia", slug: "onessmas-mary-muchesia", name: "Onessmas & Mary Muchesia", place: "South Sudan" },
];

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

async function findOne(path) {
  return (await api(`${path}${path.includes("?") ? "&" : "?"}limit=1`))[0] ?? null;
}

async function main() {
  const created = [];
  const skipped = [];

  for (const draft of DRAFTS) {
    const byId = await api(`/items/missionaries/${draft.id}`, { ok404: true });
    const bySlug = byId ? null : await findOne(`/items/missionaries?filter[slug][_eq]=${encodeURIComponent(draft.slug)}`);
    if (byId || bySlug) {
      skipped.push(draft.id);
      continue;
    }
    await api("/items/missionaries", {
      method: "POST",
      body: {
        id: draft.id,
        slug: draft.slug,
        status: "draft",
        name: draft.name,
        place: draft.place,
        roles: "",
        intro: "",
      },
    });
    created.push(draft.id);
  }

  console.log(`✓ created ${created.length} draft profile(s): ${created.join(", ") || "(none)"}`);
  if (skipped.length) console.log(`- skipped ${skipped.length} already-existing profile(s): ${skipped.join(", ")}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
