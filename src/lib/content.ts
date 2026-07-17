import * as mock from "@/lib/mock-data";
import * as live from "@/lib/directus/queries";

/**
 * Content data source used by pages. When DIRECTUS_URL is configured the live
 * Directus queries serve content; otherwise the local mock fixtures do. Both
 * modules export the same function names and signatures.
 */
const source = process.env.DIRECTUS_URL ? live : mock;

export const {
  getStories,
  getStoryBySlug,
  getMissionaries,
  getMissionaryBySlug,
  getMissionaryById,
  getUpdates,
  getUpdatesForMissionary,
  getPrayerRequests,
  getResources,
  getFaqs,
} = source;
