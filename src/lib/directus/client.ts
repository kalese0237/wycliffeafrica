import { createDirectus, rest, staticToken } from "@directus/sdk";
import type { DirectusSchema } from "./schema";

const url = process.env.DIRECTUS_URL ?? "http://localhost:8055";
const token = process.env.DIRECTUS_TOKEN;

function buildClient() {
  const base = createDirectus<DirectusSchema>(url).with(rest());
  return token ? base.with(staticToken(token)) : base;
}

/** Typed Directus client. No live instance is configured yet for this pass — see src/lib/content.ts. */
export const directus = buildClient();
