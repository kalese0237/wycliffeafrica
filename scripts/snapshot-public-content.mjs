/**
 * Refresh the cold-start snapshot from currently published Directus content.
 *
 * DIRECTUS_URL=... DIRECTUS_TOKEN=... node scripts/snapshot-public-content.mjs
 */

import { writeFile } from "node:fs/promises";

const DIRECTUS_URL = (process.env.DIRECTUS_INTERNAL_URL ?? process.env.DIRECTUS_URL)?.replace(/\/$/, "");
const TOKEN = process.env.DIRECTUS_TOKEN;
const OUTPUT = new URL("../src/lib/content-snapshot.ts", import.meta.url);

function normalizeMissionaryBio(value) {
  if (Array.isArray(value)) {
    const paragraphs = value.filter((item) => typeof item === "string");
    return paragraphs.join("\n\n") || null;
  }

  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (!trimmed.startsWith("[")) return value;

  try {
    const parsed = JSON.parse(trimmed);
    return Array.isArray(parsed) ? normalizeMissionaryBio(parsed) : value;
  } catch {
    return value;
  }
}

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
    // date_created isn't in `fields` (never written to the snapshot) but
    // sorting by it is still allowed, and gives true chronological order —
    // `date` is a loosely-formatted editorial label, not sortable reliably.
    news: await get(items("news", {
      "filter[status][_eq]": "published",
      fields: "id,status,category,slug,title,excerpt,body,author,missionaryId,place,journey,tagLabel,date,image",
      sort: "-date_created",
      limit: "-1",
    })),
    missionaries: (await get(items("missionaries", {
      fields: "id,slug,name,place,roles,intro,bio,image,familyImage,familyCaption,user.email",
      sort: "name",
      limit: "-1",
    }))).map(({ user, bio, ...m }) => ({
      ...m,
      bio: normalizeMissionaryBio(bio),
      email: user?.email ?? null,
    })),
    // date_created isn't in `fields` (never written to the snapshot) but
    // filtering/sorting by it is still allowed — matches src/lib/prayer-freshness.ts's
    // 14-day cutoff, applied here at generation time since the snapshot is static.
    prayerRequests: await get(items("prayer_requests", {
      "filter[status][_eq]": "published",
      "filter[type][_eq]": "prayer",
      "filter[date_created][_gte]": new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      fields: "id,status,type,missionaryId,title,body,date,sensitive,image",
      sort: "-date_created",
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
  PublicPrayerRequestRecord,
  PublicMissionaryRecord,
  PublicNewsRecord,
  ResourceRecord,
} from "@/lib/directus/schema";

/**
 * Last-known-good public CMS snapshot for cold builds and cold starts.
 * Refresh intentionally from published Directus content after editorial changes.
 *
 * Annotated, not "satisfies" — an empty array in the live data (e.g. no prayer requests inside the
 * freshness window) would otherwise infer as never[] from the literal and break every caller.
 */
export const CONTENT_SNAPSHOT: {
  news: PublicNewsRecord[];
  missionaries: PublicMissionaryRecord[];
  prayerRequests: PublicPrayerRequestRecord[];
  resources: ResourceRecord[];
  faqs: FaqRecord[];
} = ${JSON.stringify(snapshot, null, 2)};
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
