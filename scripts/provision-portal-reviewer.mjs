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

async function main() {
  const email = values.get("--email")?.toLowerCase();
  const firstName = values.get("--first-name");
  const lastName = values.get("--last-name") ?? "";
  if (!email || !firstName) throw new Error("Required: --email and --first-name");
  const roles = await api("/roles?filter[name][_eq]=Portal%20Reviewer&limit=1");
  if (!roles.length) throw new Error("Run portal:setup before provisioning a reviewer.");
  const users = await api(`/users?filter[email][_eq]=${encodeURIComponent(email)}&limit=1`);
  let temporaryPassword;
  if (users.length) {
    await api(`/users/${users[0].id}`, {
      method: "PATCH",
      body: { role: roles[0].id, status: "active", first_name: firstName, last_name: lastName },
    });
  } else {
    temporaryPassword = crypto.randomBytes(18).toString("base64url");
    await api("/users", {
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
  console.log(`✓ ${email} can review portal submissions in Directus`);
  if (temporaryPassword) {
    console.log("Temporary password (share through a secure channel; shown once):");
    console.log(temporaryPassword);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
