import { unstable_cache } from "next/cache";
import * as mock from "@/lib/mock-data";
import { CONTENT_SNAPSHOT } from "@/lib/content-snapshot";
import * as live from "@/lib/directus/queries";
import type { PublicMissionaryRecord } from "@/lib/directus/schema";
import { withLastKnownGood } from "@/lib/last-known-good";

/**
 * Content data source used by pages. When DIRECTUS_URL is configured the live
 * Directus queries serve content; otherwise the local mock fixtures do. When a
 * configured CMS becomes temporarily unavailable, Next's persistent cache and
 * an in-process last-known-good cache preserve the most recent live response.
 * Production never substitutes design fixtures for live CMS content.
 */
const hasLiveContent = Boolean(process.env.DIRECTUS_INTERNAL_URL ?? process.env.DIRECTUS_URL);
const CONTENT_REVALIDATE_SECONDS = 300;

function cachedLiveQuery<Args extends unknown[], Result>(
  name: string,
  liveQuery: (...args: Args) => Promise<Result>,
  snapshotQuery: (...args: Args) => Promise<Result>,
) {
  const persistentQuery = unstable_cache(liveQuery, [`directus-${name}`], {
    revalidate: CONTENT_REVALIDATE_SECONDS,
    tags: ["directus-content", `directus-${name}`],
  });
  return withLastKnownGood(name, persistentQuery, snapshotQuery);
}

const snapshotSource = {
  async getNews() {
    return CONTENT_SNAPSHOT.news;
  },
  async getNewsBySlug(slug: string) {
    return CONTENT_SNAPSHOT.news.find((item) => item.slug === slug);
  },
  async getUpdatesForMissionary(missionaryId: string) {
    return CONTENT_SNAPSHOT.news.filter(
      (item) => item.category === "update" && item.missionaryId === missionaryId,
    );
  },
  async getPrayerRequests() {
    return CONTENT_SNAPSHOT.prayerRequests;
  },
  async getPrayerRequestsForMissionary(missionaryId: string) {
    return CONTENT_SNAPSHOT.prayerRequests.filter(
      (item) => item.missionaryId === missionaryId && !item.sensitive,
    );
  },
  async getResources() {
    return CONTENT_SNAPSHOT.resources;
  },
  async getFaqs() {
    return CONTENT_SNAPSHOT.faqs;
  },
  async getMissionaries() {
    return CONTENT_SNAPSHOT.missionaries;
  },
  async getMissionaryBySlug(slug: string) {
    return CONTENT_SNAPSHOT.missionaries.find((item) => item.slug === slug);
  },
  async getMissionaryById(id: string) {
    return CONTENT_SNAPSHOT.missionaries.find((item) => item.id === id);
  },
};

const liveSource = {
  getNews: cachedLiveQuery("news", live.getNews, snapshotSource.getNews),
  getNewsBySlug: cachedLiveQuery("news-by-slug", live.getNewsBySlug, snapshotSource.getNewsBySlug),
  getUpdatesForMissionary: cachedLiveQuery(
    "missionary-updates",
    live.getUpdatesForMissionary,
    snapshotSource.getUpdatesForMissionary,
  ),
  getPrayerRequests: cachedLiveQuery(
    "prayer-requests",
    live.getPrayerRequests,
    snapshotSource.getPrayerRequests,
  ),
  getPrayerRequestsForMissionary: cachedLiveQuery(
    "missionary-prayer-requests",
    live.getPrayerRequestsForMissionary,
    snapshotSource.getPrayerRequestsForMissionary,
  ),
  getResources: cachedLiveQuery("resources", live.getResources, snapshotSource.getResources),
  getFaqs: cachedLiveQuery("faqs", live.getFaqs, snapshotSource.getFaqs),
  getMissionaries: cachedLiveQuery("missionaries", live.getMissionaries, snapshotSource.getMissionaries),
  getMissionaryBySlug: cachedLiveQuery(
    "missionary-by-slug",
    live.getMissionaryBySlug,
    snapshotSource.getMissionaryBySlug,
  ),
  getMissionaryById: cachedLiveQuery(
    "missionary-by-id",
    live.getMissionaryById,
    snapshotSource.getMissionaryById,
  ),
};

const source = hasLiveContent ? liveSource : mock;

export const {
  getNews,
  getNewsBySlug,
  getUpdatesForMissionary,
  getPrayerRequests,
  getPrayerRequestsForMissionary,
  getResources,
  getFaqs,
} = source;

/**
 * Lydia's profile predates the CMS migration and can be absent from an
 * unseeded Directus instance. Keep the public directory complete while the
 * bundled admin script synchronises the canonical CMS record.
 */
export async function getMissionaries(): Promise<PublicMissionaryRecord[]> {
  const missionaries = await source.getMissionaries();
  return missionaries.some((m) => m.slug === mock.LYDIA_TEERA.slug)
    ? missionaries
    : [...missionaries, mock.LYDIA_TEERA].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getMissionaryBySlug(slug: string): Promise<PublicMissionaryRecord | undefined> {
  const missionary = await source.getMissionaryBySlug(slug);
  return missionary ?? (slug === mock.LYDIA_TEERA.slug ? mock.LYDIA_TEERA : undefined);
}

export async function getMissionaryById(id: string): Promise<PublicMissionaryRecord | undefined> {
  const missionary = await source.getMissionaryById(id);
  return missionary ?? (id === mock.LYDIA_TEERA.id ? mock.LYDIA_TEERA : undefined);
}
