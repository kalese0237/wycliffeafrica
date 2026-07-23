/**
 * Adds or updates a single missionary record in a live Directus instance.
 * Safe to re-run: the canonical id is used to reconcile the latest fields.
 *
 * Usage:
 *   DIRECTUS_URL=... ADMIN_EMAIL=... ADMIN_PASSWORD=... node scripts/add-missionary.mjs
 *
 * Edit the MISSIONARY constant below before running.
 */

const DIRECTUS_URL = process.env.DIRECTUS_URL?.replace(/\/$/, "");
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!DIRECTUS_URL || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("Set DIRECTUS_URL, ADMIN_EMAIL and ADMIN_PASSWORD.");
  process.exit(1);
}

const MISSIONARY = {
  id: "barah",
  slug: "frans-lilian-barah",
  name: "Frans & Lilian Barah",
  place: "Yaoundé, Cameroon",
  roles: "Language Technology Consultant & Discipleship Ministry",
  intro:
    "Frans and Lilian are Cameroonian missionaries based in Yaoundé — Frans in translation technology, Lilian in discipleship and trauma healing. They have served together for over twenty years.",
  bio: [
    "Frans is a Language Technology Consultant and Associate Domain Team Leader for Language Technology in the SIL Africa Area. He trains and supports Bible translation teams across Africa in the software they use for translation, literacy work, and producing printed and digital Scripture. What he cares about most is training African specialists, so that the work no longer depends on outside help.",
    "Lilian's ministry is discipleship and trauma healing, mostly among children and young women. Her groups pair Bible study with sewing and other practical skills.",
    "Two decades in, their aim has not changed: to know Christ and make Him known — mostly by equipping other people to do the work.",
  ],
};

async function api(path, { method = "GET", body, token, ok404 = false } = {}) {
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (ok404 && res.status === 404) return null;
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${method} ${path} -> ${res.status}: ${text.slice(0, 400)}`);
  }
  if (res.status === 204) return null;
  return (await res.json()).data;
}

async function main() {
  const auth = await api("/auth/login", {
    method: "POST",
    body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, mode: "json" },
  });
  const token = auth.access_token;
  console.log("logged in");

  const existing = await api(`/items/missionaries/${MISSIONARY.id}`, { token, ok404: true });
  if (existing) {
    const { id, ...fields } = MISSIONARY;
    await api(`/items/missionaries/${id}`, { method: "PATCH", body: fields, token });
    console.log(`updated missionary '${id}'`);
    return;
  }

  await api("/items/missionaries", { method: "POST", body: MISSIONARY, token });
  console.log(`created missionary '${MISSIONARY.id}'`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
