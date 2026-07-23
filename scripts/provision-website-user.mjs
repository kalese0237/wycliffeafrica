/**
 * Provision or reconcile the Directus service account that backs DIRECTUS_TOKEN.
 * Generates a static API token; never stores or logs it beyond this one run.
 *
 * DIRECTUS_URL=... DIRECTUS_ADMIN_TOKEN=... node scripts/provision-website-user.mjs \
 *   [--email website@wycliffeafrica.org] [--rotate-token]
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
  const email = (args.get("--email") ?? "website@wycliffeafrica.org").toLowerCase();
  const rotateToken = args.has("--rotate-token");

  const roles = await api(`/roles?filter[name][_eq]=Website&limit=1`);
  if (!roles.length) throw new Error("Run portal:setup before provisioning the website service account.");
  const roleId = roles[0].id;

  const existing = await api(`/users?filter[email][_eq]=${encodeURIComponent(email)}&limit=1`);
  let userId;
  let staticToken;

  if (existing.length) {
    userId = existing[0].id;
    const patch = { role: roleId, status: "active" };
    if (rotateToken || !existing[0].token) {
      staticToken = crypto.randomBytes(32).toString("base64url");
      patch.token = staticToken;
    }
    await api(`/users/${userId}`, { method: "PATCH", body: patch });
  } else {
    staticToken = crypto.randomBytes(32).toString("base64url");
    const user = await api("/users", {
      method: "POST",
      body: {
        email,
        password: crypto.randomBytes(18).toString("base64url"),
        first_name: "Website",
        last_name: "Service Account",
        role: roleId,
        status: "active",
        token: staticToken,
      },
    });
    userId = user.id;
  }

  console.log(`✓ ${email} holds the Website role`);
  if (staticToken) {
    console.log("DIRECTUS_TOKEN (share through a secure channel; shown once):");
    console.log(staticToken);
  } else {
    console.log("Existing token preserved. Use --rotate-token to replace it.");
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
