/**
 * Content data source used by pages. Currently re-exports the local mock
 * fixtures; once a live Directus instance exists, swap these imports for
 * `@/lib/directus/queries` (same function names/signatures) and delete
 * mock-data.ts.
 */
export {
  getStories,
  getStoryBySlug,
  getMissionaries,
  getMissionaryBySlug,
  getMissionaryById,
  getUpdates,
  getUpdatesForMissionary,
  getResources,
  getFaqs,
} from "@/lib/mock-data";
