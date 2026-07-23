/**
 * Adds Lydia Teera as a missionary record plus her portal login. Safe to
 * re-run: if her missionary record already exists, this patches its content
 * fields (e.g. after editing the bio below) instead of erroring out; her
 * portal login is only ever created once.
 *
 * Usage (static admin token):
 *   DIRECTUS_URL=https://directus-production-3ac1.up.railway.app \
 *   DIRECTUS_ADMIN_TOKEN=... \
 *   node scripts/add-missionary-lydia.mjs
 *
 * Usage (email/password login):
 *   DIRECTUS_URL=https://directus-production-3ac1.up.railway.app \
 *   ADMIN_EMAIL=admin@wycliffeafrica.org \
 *   ADMIN_PASSWORD=... \
 *   node scripts/add-missionary-lydia.mjs
 */

import crypto from "node:crypto";

const DIRECTUS_URL = process.env.DIRECTUS_URL?.replace(/\/$/, "");
const ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!DIRECTUS_URL || (!ADMIN_TOKEN && !(ADMIN_EMAIL && ADMIN_PASSWORD))) {
  console.error("Set DIRECTUS_URL, and either DIRECTUS_ADMIN_TOKEN or ADMIN_EMAIL + ADMIN_PASSWORD.");
  process.exit(1);
}

const LOGIN_EMAIL = "lydia.teera@wycliffeafrica.org";

const MISSIONARY = {
  id: "teera",
  slug: "lydia-teera",
  name: "Lydia Teera",
  place: "Uganda",
  roles: "Programme Manager, Learning & Development – SIL Africa",
  intro:
    "Lydia works with schools and churches in Uganda so that refugee and host communities can learn — and read God’s Word — in the languages they speak at home.",
  bio: [
    "Lydia Teera is a Ugandan mission leader serving as Programme Manager with the Learning & Development team at SIL Africa, seconded from Wycliffe Africa. She has been in missionary service for more than twenty years, most of them spent on one problem: across Africa, children and adults are asked to learn, worship and read Scripture in languages they only half understand.",
    "Much of her current work is with refugee and host communities in Uganda, where a single classroom can hold speakers of five languages and the lessons reach none of them well. She has co-led programmes that train teachers to work multilingually, with methods practical enough for schools and governments to adopt, and she is co-author of a bridging programme that helps refugee children settle into Ugandan schools.",
    "Her call to missions came more than twenty years ago, when she decided to give her working life to Bible translation and language development. Ask her about Scripture, or about what language does to a person’s sense of identity and faith, and the conversation will run long. At home, she gardens.",
    "Among the communities she has served, the Pokot of northeastern Uganda hold a particular place in her heart: a marginalised people with low literacy, few basic services, and a church that has long lacked Scripture it can read. She has given years to their language development. She also works on Wycliffe Africa’s partnerships with other mission agencies to recruit and send African missionaries into translation work — several of those now serving in Uganda came through her.",
  ],
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

  const existingMissionary = await api(`/items/missionaries/${MISSIONARY.id}`, { ok404: true });

  if (!existingMissionary) {
    const slugMatches = await api(
      `/items/missionaries?filter[slug][_eq]=${encodeURIComponent(MISSIONARY.slug)}&limit=1`,
    );
    if (slugMatches.length > 0) {
      throw new Error(
        `Slug "${MISSIONARY.slug}" already belongs to missionary "${slugMatches[0].id}"; refusing to create a duplicate.`,
      );
    }
  }

  const roles = await api(`/roles?filter[name][_eq]=Missionary&limit=1`);
  if (roles.length === 0) {
    throw new Error('No "Missionary" role found — has scripts/seed-directus.mjs been run on this instance?');
  }
  const missionaryRoleId = roles[0].id;

  const existingUser = await api(`/users?filter[email][_eq]=${encodeURIComponent(LOGIN_EMAIL)}&limit=1`);

  let userId;
  let newPassword;
  if (existingUser.length > 0) {
    userId = existingUser[0].id;
    await api(`/users/${userId}`, {
      method: "PATCH",
      body: {
        first_name: "Lydia",
        last_name: "Teera",
        role: missionaryRoleId,
        status: "active",
      },
    });
    console.log("✓ existing portal user reconciled (password unchanged)");
  } else {
    newPassword = crypto.randomBytes(12).toString("base64url");
    const user = await api("/users", {
      method: "POST",
      body: {
        email: LOGIN_EMAIL,
        password: newPassword,
        first_name: "Lydia",
        last_name: "Teera",
        role: missionaryRoleId,
        status: "active",
      },
    });
    userId = user.id;
    console.log("✓ portal user created");
  }

  if (existingMissionary) {
    const { id, ...fields } = MISSIONARY;
    await api(`/items/missionaries/${id}`, {
      method: "PATCH",
      body: { ...fields, user: userId },
    });
    console.log(`✓ existing missionary record "${id}" reconciled`);
  } else {
    await api("/items/missionaries", {
      method: "POST",
      body: { ...MISSIONARY, user: userId },
    });
    console.log("✓ missionary record created");
  }

  if (newPassword) {
    console.log("\n--- Lydia's portal login — share securely ---");
    console.log(`email:    ${LOGIN_EMAIL}`);
    console.log(`password: ${newPassword}`);
  }
  console.log(`\nProfile: /missionaries/${MISSIONARY.slug}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
