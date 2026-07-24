/**
 * Refresh the cold-start snapshot from currently published Directus content.
 *
 * DIRECTUS_URL=... DIRECTUS_TOKEN=... node scripts/snapshot-public-content.mjs
 */

import { writeFile } from "node:fs/promises";

const DIRECTUS_URL = (process.env.DIRECTUS_INTERNAL_URL ?? process.env.DIRECTUS_URL)?.replace(/\/$/, "");
const TOKEN = process.env.DIRECTUS_TOKEN;
const OUTPUT = new URL("../src/lib/content-snapshot.ts", import.meta.url);

if (!DIRECTUS_URL || !TOKEN) {
  console.error("Set DIRECTUS_URL (or DIRECTUS_INTERNAL_URL) and DIRECTUS_TOKEN.");
  process.exit(1);
}

async function get(path) {
  let lastError;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      const response = await fetch(`${DIRECTUS_URL}${path}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
        signal: AbortSignal.timeout(20_000),
      });
      if (!response.ok) throw new Error(`${path} → ${response.status}`);
      return (await response.json()).data;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
    }
  }
  throw lastError;
}

function items(collection, params) {
  return `/items/${collection}?${new URLSearchParams(params)}`;
}

async function main() {
  const snapshot = {
    news: await get(items("news", {
      "filter[status][_eq]": "published",
      fields: "id,status,category,slug,title,excerpt,body,author,missionaryId,place,journey,tagLabel,date,image",
      sort: "-date",
      limit: "-1",
    })),
    missionaries: await get(items("missionaries", {
      fields: "id,slug,name,place,roles,intro,bio,image",
      sort: "name",
      limit: "-1",
    })),
    prayerRequests: await get(items("field_updates", {
      "filter[status][_eq]": "published",
      "filter[type][_eq]": "prayer",
      fields: "id,status,type,missionaryId,title,body,date,sensitive,image",
      sort: "-date",
      limit: "-1",
    })),
    resources: await get(items("resources", {
      fields: "id,type,title,meta,href",
      limit: "-1",
    })),
    faqs: await get(items("faqs", {
      fields: "id,question,answer",
      limit: "-1",
    })),
  };

  const source = `import type {
  FaqRecord,
  PublicFieldUpdateRecord,
  PublicMissionaryRecord,
  PublicNewsRecord,
  ResourceRecord,
} from "@/lib/directus/schema";

/**
 * Last-known-good public CMS snapshot for cold builds and cold starts.
 * Refresh intentionally from published Directus content after editorial changes.
 */
export const CONTENT_SNAPSHOT = ${JSON.stringify(snapshot, null, 2)} satisfies {
  news: PublicNewsRecord[];
  missionaries: PublicMissionaryRecord[];
  prayerRequests: PublicFieldUpdateRecord[];
  resources: ResourceRecord[];
  faqs: FaqRecord[];
};
`;
  await writeFile(OUTPUT, source);
  console.log(
    `✓ snapshot: ${snapshot.news.length} news, ${snapshot.missionaries.length} missionaries, ` +
    `${snapshot.prayerRequests.length} prayers, ${snapshot.resources.length} resources, ${snapshot.faqs.length} FAQs`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
