import type { StoryRecord, FieldUpdateRecord, MissionaryRecord, ResourceRecord, FaqRecord } from "@/lib/directus/schema";

/**
 * Local fixtures shaped identically to the Directus schema (src/lib/directus/schema.ts).
 * Ported from the design system's reference content.
 * Swap src/lib/content.ts to import from directus/queries instead once a live instance exists.
 */

const MISSIONARIES: MissionaryRecord[] = [
  {
    id: "otieno",
    slug: "otieno",
    name: "Samuel & Grace Otieno",
    place: "Turkana, Kenya",
    roles: "Translation Team Advisors",
    intro:
      "Samuel and Grace walk alongside mother-tongue translators drafting the New Testament, checking each book with the community until it reads clearly and naturally.",
  },
  {
    id: "wanjiru",
    slug: "wanjiru",
    name: "Miriam Wanjiru",
    place: "Nairobi, Kenya",
    roles: "Literacy Specialist",
    intro:
      "Miriam develops reading primers and adult literacy programmes so that when Scripture arrives, communities can read it for themselves.",
  },
  {
    id: "mwangi",
    slug: "mwangi",
    name: "David Mwangi",
    place: "South Sudan",
    roles: "Scripture Engagement",
    intro:
      "David helps churches put translated Scripture to use in worship, discipleship and daily life — through song, audio and Bible study.",
  },
  {
    id: "achieng",
    slug: "achieng",
    name: "Esther Achieng",
    place: "Uganda",
    roles: "Language Survey Specialist",
    intro: "Esther travels across language areas gathering the data that guides where translation work is needed most.",
  },
  {
    id: "kamau",
    slug: "kamau",
    name: "Joseph Kamau",
    place: "Nairobi, Kenya",
    roles: "Finance & Administration",
    intro: "Joseph stewards the funds entrusted to the movement, ensuring every gift is accounted for and directed to the field.",
  },
  {
    id: "njoroge",
    slug: "njoroge",
    name: "Peter & Hannah Njoroge",
    place: "Cameroon",
    roles: "Bible Translation Advisors",
    intro: "Peter and Hannah serve a cluster of related languages, training local translators and checking drafts with consultants.",
  },
];

const STORIES: StoryRecord[] = [
  {
    id: "why",
    slug: "why",
    journey: "give",
    tagLabel: "Why translation",
    title: "2,000+ languages still wait for Scripture",
    excerpt:
      "Across Africa, millions have never read a single verse in the language they think, pray and dream in. Bible translation closes that gap.",
    body: [
      "Across Africa, millions have never read a single verse in the language they think, pray and dream in. Bible translation closes that gap.",
      "For years, prayers, songs and Sunday readings came in a language learned at school — never the one spoken at home. That distance is what Bible translation closes: not merely swapping words, but letting the living Word be heard in the tongue of the heart.",
    ],
    author: "Wycliffe Africa",
    place: "Continental",
    date: "2026",
  },
  {
    id: "member",
    slug: "member",
    journey: "serve",
    tagLabel: "Serve",
    title: "Becoming a member: your first step into the work",
    excerpt:
      "From linguists to teachers, accountants to pilots — every calling has a place in Bible translation. Discover how to join.",
    body: [
      "From linguists to teachers, accountants to pilots — every calling has a place in Bible translation. Discover how to join.",
    ],
    author: "Membership Team",
    place: "Nairobi, Kenya",
    date: "2026",
  },
  {
    id: "church",
    slug: "church",
    journey: "churches",
    tagLabel: "Church partnership",
    title: "Partnering churches into the Great Commission",
    excerpt:
      "We walk with congregations to adopt language communities in prayer, giving and people — until every group has the Word.",
    body: [
      "We walk with congregations to adopt language communities in prayer, giving and people — until every group has the Word.",
    ],
    author: "Partnership Team",
    place: "Kenya",
    date: "2026",
  },
];

const UPDATES: FieldUpdateRecord[] = [
  {
    id: "u1",
    type: "update",
    missionaryId: "otieno",
    title: "New Testament draft reaches Turkana churches",
    body: "After three years of drafting and community checking, the Gospels are now being read aloud in Sunday services across six Turkana congregations.",
    date: "June 2026",
  },
  {
    id: "u2",
    type: "prayer",
    missionaryId: "wanjiru",
    title: "Pray for the literacy workshop in Kakuma",
    body: "Miriam leaves next week to train twelve new literacy teachers. Pray for safe travel and for teachers eager to learn.",
    date: "June 2026",
  },
  {
    id: "u3",
    type: "update",
    missionaryId: "mwangi",
    title: "First recorded Scripture songs released",
    body: "A local choir has recorded the first Scripture songs in their language — already spreading through phones and radio in the community.",
    date: "May 2026",
  },
  {
    id: "u4",
    type: "prayer",
    missionaryId: "njoroge",
    title: "Pray for Peter & Hannah's consultant check",
    body: "An outside consultant arrives this month to check the drafted books. Pray for clarity, patience, and unity with the translation team.",
    date: "May 2026",
  },
  {
    id: "u5",
    type: "update",
    missionaryId: "achieng",
    title: "Language survey completed in three new communities",
    body: "Esther's team has finished surveying three previously undocumented language communities — the first step toward future translation work.",
    date: "April 2026",
  },
  {
    id: "u6",
    type: "prayer",
    missionaryId: "kamau",
    title: "Pray for provision as we close the fiscal year",
    body: "Joseph asks for prayer as the team finalises this year's accounts — for wisdom in stewardship and provision for next year's projects.",
    date: "April 2026",
  },
];

const RESOURCES: ResourceRecord[] = [
  { id: "r1", type: "report", title: "2026 Impact Report", meta: "12 pages", href: "#" },
  { id: "r2", type: "guide", title: "Prayer Guide for Bible Translation", meta: "Monthly", href: "#" },
  { id: "r3", type: "pdf", title: "Church Partnership Starter Pack", meta: "8 pages", href: "#" },
  { id: "r4", type: "video", title: "Vision 2025 — Field Film", meta: "6 min", href: "#" },
  { id: "r5", type: "audio", title: "Field Update Podcast, Episode 12", meta: "24 min", href: "#" },
  { id: "r6", type: "pdf", title: "No Bible Sunday Planning Kit", meta: "5 pages", href: "#" },
];

const FAQS: FaqRecord[] = [
  {
    id: "f1",
    question: "How is my gift used?",
    answer:
      "Gifts are stewarded toward translation drafting, community checking, consultant review, training, and Scripture engagement across Africa. Visit the Give page for a full breakdown.",
  },
  {
    id: "f2",
    question: "Can I support a specific missionary?",
    answer:
      "Yes — each missionary raises support relationship by relationship. Visit Our Missionaries to read profiles and start a monthly partnership.",
  },
  {
    id: "f3",
    question: "How can my church get involved?",
    answer:
      "Churches can adopt a language community in prayer and giving, host a missions Sunday, or form a missions committee. See Motivate your Church for a starting checklist.",
  },
  {
    id: "f4",
    question: "How do I apply to serve with Wycliffe Africa?",
    answer:
      "Start with the preliminary questionnaire — it takes about ten minutes and helps our team understand where your skills might fit the work.",
  },
];

export async function getStories(): Promise<StoryRecord[]> {
  return STORIES;
}

export async function getStoryBySlug(slug: string): Promise<StoryRecord | undefined> {
  return STORIES.find((s) => s.slug === slug);
}

export async function getMissionaries(): Promise<MissionaryRecord[]> {
  return MISSIONARIES;
}

export async function getMissionaryBySlug(slug: string): Promise<MissionaryRecord | undefined> {
  return MISSIONARIES.find((m) => m.slug === slug);
}

export async function getUpdates(): Promise<FieldUpdateRecord[]> {
  return UPDATES;
}

export async function getUpdatesForMissionary(missionaryId: string): Promise<FieldUpdateRecord[]> {
  return UPDATES.filter((u) => u.missionaryId === missionaryId);
}

export async function getResources(): Promise<ResourceRecord[]> {
  return RESOURCES;
}

export async function getFaqs(): Promise<FaqRecord[]> {
  return FAQS;
}

export function getMissionaryById(id: string): MissionaryRecord | undefined {
  return MISSIONARIES.find((m) => m.id === id);
}
