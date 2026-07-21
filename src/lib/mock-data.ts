import type { StoryRecord, FieldUpdateRecord, MissionaryRecord, ResourceRecord, FaqRecord } from "@/lib/directus/schema";

/**
 * Local fixtures shaped identically to the Directus schema (src/lib/directus/schema.ts).
 * Ported from the design system's reference content.
 * Swap src/lib/content.ts to import from directus/queries instead once a live instance exists.
 */

const MISSIONARIES: MissionaryRecord[] = [
  {
    id: "barah",
    slug: "frans-lilian-barah",
    name: "Frans & Lilian Barah",
    place: "Yaoundé, Cameroon",
    roles: "Language Technology Consultant & Discipleship Ministry",
    intro:
      "Frans and Lilian are Cameroonian missionaries who have served together for more than two decades in Bible translation, church ministry, leadership development, and community transformation.",
    bio: [
      "Frans serves as a Language Technology Consultant and Associate Domain Team Leader for Language Technology in the SIL Africa Area. He trains, mentors, and supports Bible translation teams across Africa in using technology for translation, literacy, and the production of printed and digital Scripture resources. He is especially passionate about developing African leaders and building sustainable local capacity.",
      "Lilian serves through discipleship, trauma healing, mentoring, and practical skills development. She has a special passion for children and young women, helping them grow spiritually and practically through Bible study, sewing, and life-skills training.",
      "For more than two decades, Frans and Lilian have served together in Bible translation, church ministry, leadership development, and community transformation. Their calling: to know Christ and make Him known by equipping others and helping communities experience the transforming power of God's Word.",
    ],
  },
  {
    id: "otieno",
    slug: "samuel-grace-otieno",
    name: "Samuel & Grace Otieno",
    place: "Turkana, Kenya",
    roles: "Translation Team Advisors",
    intro:
      "Samuel and Grace walk alongside mother-tongue translators drafting the New Testament, checking each book with the community until it reads clearly and naturally.",
    bio: [
      "Samuel grew up in Kisumu hearing Scripture read in a language his grandmother never fully understood. That memory carried him through linguistics training and, in 2014, into full-time translation work with Grace, a trained teacher.",
      "Today they serve the Turkana cluster as team advisors: coaching mother-tongue translators through drafting, arranging community checks in village congregations, and preparing each book for consultant review. Their long-term prayer is a complete Turkana New Testament read aloud in every church in the region.",
    ],
  },
  {
    id: "wanjiru",
    slug: "miriam-wanjiru",
    name: "Miriam Wanjiru",
    place: "Nairobi, Kenya",
    roles: "Literacy Specialist",
    intro:
      "Miriam develops reading primers and adult literacy programmes so that when Scripture arrives, communities can read it for themselves.",
    bio: [
      "A translated Bible no one can read stays closed. Miriam joined the movement after a decade teaching primary school, convinced that literacy is the bridge between a finished translation and a transformed community.",
      "From Nairobi she designs reading primers, trains volunteer literacy teachers, and runs adult reading groups in partner language areas — most recently in the Kakuma refugee settlement.",
    ],
  },
  {
    id: "mwangi",
    slug: "david-mwangi",
    name: "David Mwangi",
    place: "South Sudan",
    roles: "Scripture Engagement",
    intro:
      "David helps churches put translated Scripture to use in worship, discipleship and daily life — through song, audio and Bible study.",
    bio: [
      "David's conviction is simple: translation is finished not when the books are printed, but when people meet God in them. He serves churches in South Sudan as a Scripture engagement facilitator.",
      "His weeks are spent helping congregations weave newly translated Scripture into worship — recording Scripture songs with local choirs, distributing audio Bibles for listening groups, and training pastors to preach from the mother-tongue text.",
    ],
  },
  {
    id: "achieng",
    slug: "esther-achieng",
    name: "Esther Achieng",
    place: "Uganda",
    roles: "Language Survey Specialist",
    intro: "Esther travels across language areas gathering the data that guides where translation work is needed most.",
    bio: [
      "Before a single verse can be drafted, someone has to listen. Esther leads survey trips across Uganda's language areas — recording word lists, testing comprehension between dialects, and sitting with elders to understand how communities actually speak.",
      "Her reports guide where the movement begins its next translation projects, making her work the first chapter of every future Scripture launch.",
    ],
  },
  {
    id: "kamau",
    slug: "joseph-kamau",
    name: "Joseph Kamau",
    place: "Nairobi, Kenya",
    roles: "Finance & Administration",
    intro: "Joseph stewards the funds entrusted to the movement, ensuring every gift is accounted for and directed to the field.",
    bio: [
      "Every translation project runs on trust — of language communities, of churches, and of the givers who fund the work. Joseph keeps that trust: he manages the movement's accounts from Nairobi, ensuring every gift is tracked from donor to field.",
      "A certified accountant, he left corporate practice in 2018 because he wanted his ledgers to count for something eternal.",
    ],
  },
  {
    id: "njoroge",
    slug: "peter-hannah-njoroge",
    name: "Peter & Hannah Njoroge",
    place: "Cameroon",
    roles: "Bible Translation Advisors",
    intro: "Peter and Hannah serve a cluster of related languages, training local translators and checking drafts with consultants.",
    bio: [
      "Peter and Hannah moved to Cameroon in 2019 to serve a cluster of four related languages in the Northwest. Rather than translating themselves, they train and mentor local translation teams — one team per language, sharing tools, terminology and checked drafts across the cluster.",
      "Their joy is watching a community leader read a freshly checked chapter aloud and hearing the room answer back in recognition.",
    ],
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
    status: "published",
  },
  {
    id: "u2",
    type: "prayer",
    missionaryId: "wanjiru",
    title: "Pray for the literacy workshop in Kakuma",
    body: "Miriam leaves next week to train twelve new literacy teachers. Pray for safe travel and for teachers eager to learn.",
    date: "June 2026",
    status: "published",
  },
  {
    id: "u3",
    type: "update",
    missionaryId: "mwangi",
    title: "First recorded Scripture songs released",
    body: "A local choir has recorded the first Scripture songs in their language — already spreading through phones and radio in the community.",
    date: "May 2026",
    status: "published",
  },
  {
    id: "u4",
    type: "prayer",
    missionaryId: "njoroge",
    title: "Pray for Peter & Hannah's consultant check",
    body: "An outside consultant arrives this month to check the drafted books. Pray for clarity, patience, and unity with the translation team.",
    date: "May 2026",
    status: "published",
  },
  {
    id: "u5",
    type: "update",
    missionaryId: "achieng",
    title: "Language survey completed in three new communities",
    body: "Esther's team has finished surveying three previously undocumented language communities — the first step toward future translation work.",
    date: "April 2026",
    status: "published",
  },
  {
    id: "u6",
    type: "prayer",
    missionaryId: "kamau",
    title: "Pray for provision as we close the fiscal year",
    body: "Joseph asks for prayer as the team finalises this year's accounts — for wisdom in stewardship and provision for next year's projects.",
    date: "April 2026",
    status: "published",
  },
  {
    id: "u7",
    type: "prayer",
    missionaryId: "mwangi",
    title: "Pray for a listening group in a restricted area",
    body: "A new Scripture listening group has begun meeting quietly in a community where open Christian gatherings draw hostility. Pray for the group's protection, and for the Word to take root.",
    date: "June 2026",
    status: "published",
    sensitive: true,
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
  return UPDATES.filter((u) => u.status === "published");
}

export async function getUpdatesForMissionary(missionaryId: string): Promise<FieldUpdateRecord[]> {
  return UPDATES.filter((u) => u.missionaryId === missionaryId && u.status === "published");
}

export async function getPrayerRequests(): Promise<FieldUpdateRecord[]> {
  return UPDATES.filter((u) => u.type === "prayer" && u.status === "published");
}

export async function getResources(): Promise<ResourceRecord[]> {
  return RESOURCES;
}

export async function getFaqs(): Promise<FaqRecord[]> {
  return FAQS;
}

export async function getMissionaryById(id: string): Promise<MissionaryRecord | undefined> {
  return MISSIONARIES.find((m) => m.id === id);
}
