/** Provision or reconcile an office reviewer account for the Directus review queue. */

import crypto from "node:crypto";

const DIRECTUS_URL = process.env.DIRECTUS_URL?.replace(/\/$/, "");
const ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;
const values = new Map();
for (let index = 2; index < process.argv.length; index += 2) values.set(process.argv[index], process.argv[index + 1]);

if (!DIRECTUS_URL || !ADMIN_TOKEN) {
  console.error("Set DIRECTUS_URL and DIRECTUS_ADMIN_TOKEN.");
  process.exit(1);
}

async function api(path, { method = "GET", body } = {}) {
  const response = await fetch(`${DIRECTUS_URL}${path}`, {
    method,
    headers: { Authorization: `Bearer ${ADMIN_TOKEN}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
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

async function ensureReviewPreset(user) {
  const bookmark = "Missionary submissions awaiting review";
  const current = await api(
    `/presets?filter[user][_eq]=${user}&filter[collection][_eq]=field_updates&filter[bookmark][_eq]=${encodeURIComponent(bookmark)}&limit=1`,
  );
  const body = {
    user,
    collection: "field_updates",
    bookmark,
    layout: "tabular",
    filter: { status: { _eq: "draft" } },
    sort: ["-date_created"],
    limit: 25,
  };
  if (current.length) {
    await api(`/presets/${current[0].id}`, { method: "PATCH", body });
  } else {
    await api("/presets", { method: "POST", body });
  }
}

async function main() {
  const email = values.get("--email")?.toLowerCase();
  const firstName = values.get("--first-name");
  const lastName = values.get("--last-name") ?? "";
  if (!email || !firstName) throw new Error("Required: --email and --first-name");
  const roles = await api("/roles?filter[name][_eq]=Portal%20Reviewer&limit=1");
  if (!roles.length) throw new Error("Run portal:setup before provisioning a reviewer.");
  const policies = await api("/policies?filter[name][_eq]=Portal%20review&limit=1");
  if (!policies.length) throw new Error("The Portal review policy is missing. Run portal:setup first.");
  const users = await api(`/users?filter[email][_eq]=${encodeURIComponent(email)}&limit=1`);
  let user;
  let temporaryPassword;
  if (users.length) {
    user = users[0];
    await api(`/users/${users[0].id}`, {
      method: "PATCH",
      body: { status: "active", first_name: firstName, last_name: lastName },
    });
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
  await ensureReviewPreset(user.id);
  console.log(`✓ ${email} can review portal submissions in Directus`);
  if (users.length) console.log("Existing primary role and its permissions were preserved.");
  if (temporaryPassword) {
    console.log("Temporary password (share through a secure channel; shown once):");
    console.log(temporaryPassword);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
