import { readItems } from "@directus/sdk";
import { directus } from "./client";

export async function getStories() {
  return directus.request(readItems("stories", { sort: ["-date"] }));
}

export async function getStoryBySlug(slug: string) {
  const results = await directus.request(
    readItems("stories", { filter: { slug: { _eq: slug } }, limit: 1 }),
  );
  return results[0];
}

export async function getMissionaries() {
  return directus.request(readItems("missionaries"));
}

export async function getMissionaryBySlug(slug: string) {
  const results = await directus.request(
    readItems("missionaries", { filter: { slug: { _eq: slug } }, limit: 1 }),
  );
  return results[0];
}

export async function getUpdates() {
  return directus.request(readItems("field_updates", { sort: ["-date"] }));
}

export async function getFaqs() {
  return directus.request(readItems("faqs"));
}

export async function getResources() {
  return directus.request(readItems("resources"));
}
