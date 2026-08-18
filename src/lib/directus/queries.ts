import { readItems } from "@directus/sdk";
import { directus } from "./client";
import type { PublicPrayerRequestRecord, PublicMissionaryRecord, PublicNewsRecord } from "./schema";

/**
 * Live Directus queries. Function names and signatures mirror
 * src/lib/mock-data.ts exactly — src/lib/content.ts picks one of the two.
 * Public reads only ever return `published` items.
 */

const PUBLISHED = { status: { _eq: "published" } } as const;
const NEWS_CORE_PUBLIC_FIELDS = [
  "id",
  "status",
  "category",
  "slug",
  "title",
  "excerpt",
  "body",
  "author",
  "missionaryId",
  "place",
  "journey",
  "tagLabel",
  "date",
  "image",
] as const;
const NEWS_RICH_PUBLIC_FIELDS = [
  ...NEWS_CORE_PUBLIC_FIELDS,
  "pullQuote",
  "inlineImage",
  "inlineImageCaption",
] as const;
const MISSIONARY_PUBLIC_FIELDS = ["id", "slug", "name", "place", "roles", "intro", "bio", "image"] as const;
const PRAYER_PUBLIC_FIELDS = [
  "id",
  "status",
  "type",
  "missionaryId",
  "title",
  "body",
  "date",
  "sensitive",
  "image",
] as const;

let richNewsFieldsSupported: boolean | undefined;

function isUnsupportedRichNewsFields(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const message = "message" in error && typeof error.message === "string" ? error.message : "";
  const response = "response" in error ? error.response : undefined;
  const status =
    response && typeof response === "object" && "status" in response && typeof response.status === "number"
      ? response.status
      : undefined;
  return (
    status === 403 &&
    ["pullQuote", "inlineImage", "inlineImageCaption"].some((field) => message.includes(field))
  );
}

/**
 * Rich story fields were added after the original news collection. Some
 * deployments can briefly run the newer frontend before their Directus schema
 * and read policy are upgraded. Fall back to the original public field set
 * instead of turning that rollout mismatch into a page-level server error.
 */
async function withCompatibleNewsFields<T>(
  richRequest: () => Promise<T>,
  coreRequest: () => Promise<T>,
): Promise<T> {
  if (richNewsFieldsSupported === false) return coreRequest();
  try {
    const result = await richRequest();
    richNewsFieldsSupported = true;
    return result;
  } catch (error) {
    if (!isUnsupportedRichNewsFields(error)) throw error;
    richNewsFieldsSupported = false;
    return coreRequest();
  }
}

/** Whether the configured server-side Directus identity can read rich story fields. */
export async function supportsRichNewsFields(): Promise<boolean> {
  if (richNewsFieldsSupported !== undefined) return richNewsFieldsSupported;
  try {
    await directus.request(
      readItems("news", {
        fields: ["id", "pullQuote", "inlineImage", "inlineImageCaption"],
        limit: 1,
      }),
    );
    richNewsFieldsSupported = true;
    return true;
  } catch (error) {
    if (isUnsupportedRichNewsFields(error)) richNewsFieldsSupported = false;
    return false;
  }
}

export async function getNews(): Promise<PublicNewsRecord[]> {
  return withCompatibleNewsFields(
    () =>
      directus.request(
        readItems("news", { fields: [...NEWS_RICH_PUBLIC_FIELDS], filter: PUBLISHED, sort: ["-date"] }),
      ),
    () =>
      directus.request(
        readItems("news", { fields: [...NEWS_CORE_PUBLIC_FIELDS], filter: PUBLISHED, sort: ["-date"] }),
      ),
  );
}

export async function getNewsBySlug(slug: string): Promise<PublicNewsRecord | undefined> {
  const results = await withCompatibleNewsFields(
    () =>
      directus.request(
        readItems("news", {
          fields: [...NEWS_RICH_PUBLIC_FIELDS],
          filter: { _and: [PUBLISHED, { slug: { _eq: slug } }] },
          limit: 1,
        }),
      ),
    () =>
      directus.request(
        readItems("news", {
          fields: [...NEWS_CORE_PUBLIC_FIELDS],
          filter: { _and: [PUBLISHED, { slug: { _eq: slug } }] },
          limit: 1,
        }),
      ),
  );
  return results[0];
}

export async function getMissionaries(): Promise<PublicMissionaryRecord[]> {
  return directus.request(
    readItems("missionaries", { fields: [...MISSIONARY_PUBLIC_FIELDS], sort: ["name"] }),
  );
}

export async function getMissionaryBySlug(slug: string): Promise<PublicMissionaryRecord | undefined> {
  const results = await directus.request(
    readItems("missionaries", {
      fields: [...MISSIONARY_PUBLIC_FIELDS],
      filter: { slug: { _eq: slug } },
      limit: 1,
    }),
  );
  return results[0];
}

export async function getMissionaryById(id: string): Promise<PublicMissionaryRecord | undefined> {
  const results = await directus.request(
    readItems("missionaries", {
      fields: [...MISSIONARY_PUBLIC_FIELDS],
      filter: { id: { _eq: id } },
      limit: 1,
    }),
  );
  return results[0];
}

export async function getUpdatesForMissionary(missionaryId: string): Promise<PublicNewsRecord[]> {
  return withCompatibleNewsFields(
    () =>
      directus.request(
        readItems("news", {
          fields: [...NEWS_RICH_PUBLIC_FIELDS],
          filter: {
            _and: [PUBLISHED, { category: { _eq: "update" } }, { missionaryId: { _eq: missionaryId } }],
          },
          sort: ["-date"],
        }),
      ),
    () =>
      directus.request(
        readItems("news", {
          fields: [...NEWS_CORE_PUBLIC_FIELDS],
          filter: {
            _and: [PUBLISHED, { category: { _eq: "update" } }, { missionaryId: { _eq: missionaryId } }],
          },
          sort: ["-date"],
        }),
      ),
  );
}

export async function getPrayerRequests(): Promise<PublicPrayerRequestRecord[]> {
  return directus.request(
    readItems("prayer_requests", {
      fields: [...PRAYER_PUBLIC_FIELDS],
      filter: { _and: [PUBLISHED, { type: { _eq: "prayer" } }] },
      sort: ["-date"],
    }),
  );
}

/**
 * Scoped to a missionary's own profile page — excludes `sensitive` requests,
 * which only ever appear anonymized on `/prayer`, never tied to a name here.
 */
export async function getPrayerRequestsForMissionary(
  missionaryId: string,
): Promise<PublicPrayerRequestRecord[]> {
  return directus.request(
    readItems("prayer_requests", {
      fields: [...PRAYER_PUBLIC_FIELDS],
      filter: {
        _and: [
          PUBLISHED,
          { type: { _eq: "prayer" } },
          { missionaryId: { _eq: missionaryId } },
          { sensitive: { _neq: true } },
        ],
      },
      sort: ["-date"],
    }),
  );
}

export async function getFaqs() {
  return directus.request(readItems("faqs", { fields: ["id", "question", "answer"] }));
}

export async function getResources() {
  return directus.request(readItems("resources", { fields: ["id", "type", "title", "meta", "href"] }));
}
