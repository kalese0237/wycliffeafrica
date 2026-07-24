import { createDirectus, rest, staticToken } from "@directus/sdk";
import type { DirectusSchema } from "./schema";
import { fetchWithRetry } from "./retry-fetch";

const url = process.env.DIRECTUS_INTERNAL_URL ?? process.env.DIRECTUS_URL ?? "http://localhost:8055";
const token = process.env.DIRECTUS_TOKEN;

function buildClient() {
  const base = createDirectus<DirectusSchema>(url, { globals: { fetch: fetchWithRetry } }).with(rest());
  return token ? base.with(staticToken(token)) : base;
}

/** Typed public-content client; the static token is never exposed to browser code. */
export const directus = buildClient();
