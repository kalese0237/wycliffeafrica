import { readItems } from "@directus/sdk";
import { directus } from "./client";
import type { FieldUpdateRecord, MissionaryRecord } from "./schema";

/**
 * Live Directus queries. Function names and signatures mirror
 * src/lib/mock-data.ts exactly — src/lib/content.ts picks one of the two.
 * Public reads only ever return `published` items.
 */

const PUBLISHED = { status: { _eq: "published" } } as const;

export async function getStories() {
  return directus.request(readItems("stories", { sort: ["-date"] }));
}

export async function getStoryBySlug(slug: string) {
  const results = await directus.request(
    readItems("stories", { filter: { slug: { _eq: slug } }, limit: 1 }),
  );
  return results[0];
}

export async function getMissionaries(): Promise<MissionaryRecord[]> {
  return directus.request(readItems("missionaries", { sort: ["name"] }));
}

export async function getMissionaryBySlug(slug: string): Promise<MissionaryRecord | undefined> {
  const results = await directus.request(
    readItems("missionaries", { filter: { slug: { _eq: slug } }, limit: 1 }),
  );
  return results[0];
}

export async function getMissionaryById(id: string): Promise<MissionaryRecord | undefined> {
  const results = await directus.request(
    readItems("missionaries", { filter: { id: { _eq: id } }, limit: 1 }),
  );
  return results[0];
}

export async function getUpdates(): Promise<FieldUpdateRecord[]> {
  return directus.request(readItems("field_updates", { filter: PUBLISHED, sort: ["-date"] }));
}

export async function getUpdatesForMissionary(missionaryId: string): Promise<FieldUpdateRecord[]> {
  return directus.request(
    readItems("field_updates", {
      filter: { _and: [PUBLISHED, { missionaryId: { _eq: missionaryId } }] },
      sort: ["-date"],
    }),
  );
}

export async function getPrayerRequests(): Promise<FieldUpdateRecord[]> {
  return directus.request(
    readItems("field_updates", {
      filter: { _and: [PUBLISHED, { type: { _eq: "prayer" } }] },
      sort: ["-date"],
    }),
  );
}

export async function getFaqs() {
  return directus.request(readItems("faqs"));
}

export async function getResources() {
  return directus.request(readItems("resources"));
}
