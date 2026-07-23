import * as mock from "@/lib/mock-data";
import * as live from "@/lib/directus/queries";
import type { MissionaryRecord } from "@/lib/directus/schema";

/**
 * Content data source used by pages. When DIRECTUS_URL is configured the live
 * Directus queries serve content; otherwise the local mock fixtures do. Both
 * modules export the same function names and signatures.
 */
const source = process.env.DIRECTUS_URL ? live : mock;

export const {
  getStories,
  getStoryBySlug,
  getUpdates,
  getUpdatesForMissionary,
  getPrayerRequests,
  getResources,
  getFaqs,
} = source;

/**
 * Lydia's profile predates the CMS migration and can be absent from an
 * unseeded Directus instance. Keep the public directory complete while the
 * bundled admin script synchronises the canonical CMS record.
 */
export async function getMissionaries(): Promise<MissionaryRecord[]> {
  const missionaries = await source.getMissionaries();
  return missionaries.some((m) => m.slug === mock.LYDIA_TEERA.slug)
    ? missionaries
    : [...missionaries, mock.LYDIA_TEERA].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getMissionaryBySlug(slug: string): Promise<MissionaryRecord | undefined> {
  const missionary = await source.getMissionaryBySlug(slug);
  return missionary ?? (slug === mock.LYDIA_TEERA.slug ? mock.LYDIA_TEERA : undefined);
}

export async function getMissionaryById(id: string): Promise<MissionaryRecord | undefined> {
  const missionary = await source.getMissionaryById(id);
  return missionary ?? (id === mock.LYDIA_TEERA.id ? mock.LYDIA_TEERA : undefined);
}
