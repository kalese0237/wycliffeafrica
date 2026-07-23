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
    "Lydia champions language-inclusive education and Scripture engagement across Uganda, helping refugee and host communities access learning and God’s Word in the languages they understand best.",
  bio: [
    "Lydia Teera is a Ugandan mission leader and Programme Manager serving with the Learning & Development team at SIL Africa while seconded from Wycliffe Africa. With more than two decades of missionary service, Lydia is passionate about helping communities access education and Scripture in languages they understand best. Her work focuses on advocacy, alliance building, and strengthening partnerships that promote language-inclusive education and meaningful Scripture engagement across African communities.",
    "In her current role, Lydia contributes to initiatives that address language barriers in education, particularly among refugee and host communities in Uganda. She has co-led evidence-based programs that equip educators with multilingual classroom strategies and practical approaches that governments and institutions can adopt in their education systems. Her work brings together research, training, and community engagement to ensure that language becomes a bridge—rather than a barrier—to learning, faith formation, and community transformation.",
    "Lydia’s calling to missionary service began more than 20 years ago when she made the courageous decision to dedicate her life to advancing God’s mission through Bible translation and language development. Known for her strengths in advocacy, communication, and partnership building, she is also a co-author of a bridging program that supports refugee learners transitioning into Ugandan schools. Beyond her professional work, Lydia enjoys meaningful conversations around Scripture and the role of language in shaping identity and faith. She also loves sharing stories that highlight the impact of Bible translation and education initiatives, and when she is at home, she enjoys spending time in her garden.",
    "Among the many language communities she has worked with, Lydia holds a special place in her heart for the Pokot, a marginalised tribe in northeastern Uganda facing low literacy, limited access to basic resources, and an undiscipled church shaped by language barriers and remote geography. She has dedicated significant time to supporting their language development. She is also a key contributor to Wycliffe Africa’s partnership with other mission organisations to recruit and send African missionaries into Bible translation work worldwide, having helped recruit several missionaries serving in Uganda.",
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
