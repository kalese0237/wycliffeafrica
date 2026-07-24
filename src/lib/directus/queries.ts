import { readItems } from "@directus/sdk";
import { directus } from "./client";
import type { PublicFieldUpdateRecord, PublicMissionaryRecord, PublicNewsRecord } from "./schema";

/**
 * Live Directus queries. Function names and signatures mirror
 * src/lib/mock-data.ts exactly — src/lib/content.ts picks one of the two.
 * Public reads only ever return `published` items.
 */

const PUBLISHED = { status: { _eq: "published" } } as const;
const NEWS_PUBLIC_FIELDS = [
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

export async function getNews(): Promise<PublicNewsRecord[]> {
  return directus.request(
    readItems("news", { fields: [...NEWS_PUBLIC_FIELDS], filter: PUBLISHED, sort: ["-date"] }),
  );
}

export async function getNewsBySlug(slug: string): Promise<PublicNewsRecord | undefined> {
  const results = await directus.request(
    readItems("news", {
      fields: [...NEWS_PUBLIC_FIELDS],
      filter: { _and: [PUBLISHED, { slug: { _eq: slug } }] },
      limit: 1,
    }),
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
  return directus.request(
    readItems("news", {
      fields: [...NEWS_PUBLIC_FIELDS],
      filter: { _and: [PUBLISHED, { category: { _eq: "update" } }, { missionaryId: { _eq: missionaryId } }] },
      sort: ["-date"],
    }),
  );
}

export async function getPrayerRequests(): Promise<PublicFieldUpdateRecord[]> {
  return directus.request(
    readItems("field_updates", {
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
): Promise<PublicFieldUpdateRecord[]> {
  return directus.request(
    readItems("field_updates", {
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
