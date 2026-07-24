/**
 * Provision or reconcile one missionary portal account.
 * The generated temporary password is printed once and is never stored here.
 *
 * DIRECTUS_URL=... DIRECTUS_ADMIN_TOKEN=... node scripts/provision-missionary-portal-user.mjs \
 *   --missionary-id wanjiru --email person@example.org --first-name Miriam --last-name Wanjiru
 */

import crypto from "node:crypto";

const DIRECTUS_URL = process.env.DIRECTUS_URL?.replace(/\/$/, "");
const ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;
const args = new Map();
for (let index = 2; index < process.argv.length; index += 2) {
  args.set(process.argv[index], process.argv[index + 1]);
}

if (!DIRECTUS_URL || !ADMIN_TOKEN) {
  console.error("Set DIRECTUS_URL and DIRECTUS_ADMIN_TOKEN.");
  process.exit(1);
}

async function api(path, { method = "GET", body, ok404 = false } = {}) {
  const response = await fetch(`${DIRECTUS_URL}${path}`, {
    method,
    headers: { Authorization: `Bearer ${ADMIN_TOKEN}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (ok404 && response.status === 404) return null;
  if (!response.ok) throw new Error(`${method} ${path} → ${response.status}: ${(await response.text()).slice(0, 400)}`);
  if (response.status === 204) return null;
  return (await response.json()).data;
}

async function ensureUserPolicy(user, policy) {
  const current = await api(
    `/access?filter[user][_eq]=${user}&filter[policy][_eq]=${policy}&limit=1`,
  );
  if (!current.length) {
    await api("/access", { method: "POST", body: { user, policy } });
  }
}

async function main() {
  const missionaryId = args.get("--missionary-id");
  const email = args.get("--email")?.toLowerCase();
  const firstName = args.get("--first-name");
  const lastName = args.get("--last-name") ?? "";
  const rotatePassword = args.has("--rotate-password");

  if (!missionaryId || !email || !firstName) {
    throw new Error("Required: --missionary-id, --email, and --first-name");
  }
  const missionary = await api(`/items/missionaries/${encodeURIComponent(missionaryId)}`, { ok404: true });
  if (!missionary) throw new Error(`Missionary profile '${missionaryId}' does not exist.`);
  const roles = await api("/roles?filter[name][_eq]=Missionary&limit=1");
  if (!roles.length) throw new Error("The Missionary role does not exist. Run setup-missionary-portal.mjs first.");
  const policies = await api("/policies?filter[name][_eq]=Missionary%20portal&limit=1");
  if (!policies.length) throw new Error("The Missionary portal policy is missing. Run setup-missionary-portal.mjs first.");
  const existing = await api(`/users?filter[email][_eq]=${encodeURIComponent(email)}&limit=1`);

  let user;
  let temporaryPassword;
  if (existing.length) {
    user = existing[0];
    const patch = { status: "active", first_name: firstName, last_name: lastName };
    if (rotatePassword) {
      temporaryPassword = crypto.randomBytes(18).toString("base64url");
      patch.password = temporaryPassword;
    }
    await api(`/users/${user.id}`, { method: "PATCH", body: patch });
  } else {
    temporaryPassword = crypto.randomBytes(18).toString("base64url");
    user = await api("/users", {
      method: "POST",
      body: {
        email,
        password: temporaryPassword,
        first_name: firstName,
        last_name: lastName,
        role: roles[0].id,
        status: "active",
      },
    });
  }
  await ensureUserPolicy(user.id, policies[0].id);

  const conflicts = await api(`/items/missionaries?filter[user][_eq]=${user.id}&filter[id][_neq]=${encodeURIComponent(missionaryId)}&limit=1`);
  if (conflicts.length) throw new Error(`This user is already linked to '${conflicts[0].id}'.`);
  await api(`/items/missionaries/${encodeURIComponent(missionaryId)}`, {
    method: "PATCH",
    body: { user: user.id },
  });

  console.log(`✓ ${email} is linked to ${missionary.name}`);
  if (existing.length) console.log("Existing primary role and its permissions were preserved.");
  if (temporaryPassword) {
    console.log("Temporary password (share through a secure channel; shown once):");
    console.log(temporaryPassword);
  } else {
    console.log("Existing password preserved. Use --rotate-password to replace it.");
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
