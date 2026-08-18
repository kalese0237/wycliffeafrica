/**
 * Public prayer requests older than this are hidden from the site and the
 * prayer guide PDF, though they remain untouched in Directus — office staff
 * can still see and manage them there. Freshness is judged by `date_created`
 * (when Directus recorded the row), not the free-text `date` label, which is
 * editor-written and too loosely formatted for a reliable day-level cutoff.
 */
export const PRAYER_FRESHNESS_DAYS = 14;
const PRAYER_FRESHNESS_WINDOW_MS = PRAYER_FRESHNESS_DAYS * 24 * 60 * 60 * 1000;

/** ISO cutoff for a live Directus `date_created` filter — anything before this is stale. */
export function prayerFreshnessCutoffIso(): string {
  return new Date(Date.now() - PRAYER_FRESHNESS_WINDOW_MS).toISOString();
}

/** For mock fixtures, which carry `date_created` directly rather than querying Directus. */
export function isFreshPrayer(dateCreated: string | null | undefined): boolean {
  if (!dateCreated) return true;
  return Date.now() - new Date(dateCreated).getTime() <= PRAYER_FRESHNESS_WINDOW_MS;
}
