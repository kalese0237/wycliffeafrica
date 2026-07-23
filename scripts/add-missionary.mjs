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
    "Frans and Lilian are Cameroonian missionaries who have served together for more than two decades in Bible translation, church ministry, leadership development, and community transformation.",
  bio: [
    "Frans serves as a Language Technology Consultant and Associate Domain Team Leader for Language Technology in the SIL Africa Area. He trains, mentors, and supports Bible translation teams across Africa in using technology for translation, literacy, and the production of printed and digital Scripture resources. He is especially passionate about developing African leaders and building sustainable local capacity.",
    "Lilian serves through discipleship, trauma healing, mentoring, and practical skills development. She has a special passion for children and young women, helping them grow spiritually and practically through Bible study, sewing, and life-skills training.",
    "For more than two decades, Frans and Lilian have served together in Bible translation, church ministry, leadership development, and community transformation. Their calling: to know Christ and make Him known by equipping others and helping communities experience the transforming power of God's Word.",
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
