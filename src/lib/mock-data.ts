import type {
  NewsRecord,
  PrayerRequestRecord,
  MissionaryRecord,
  InternRecord,
  ResourceRecord,
  FaqRecord,
} from "@/lib/directus/schema";
import { isFreshPrayer } from "@/lib/prayer-freshness";

/** Relative so the fixture keeps demonstrating both fresh and stale prayers regardless of when it runs. */
function daysAgo(n: number): string {
  return new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString();
}

/**
 * Local fixtures shaped identically to the Directus schema (src/lib/directus/schema.ts).
 * Ported from the design system's reference content.
 * Swap src/lib/content.ts to import from directus/queries instead once a live instance exists.
 */

export const LYDIA_TEERA: MissionaryRecord = {
  id: "teera",
  slug: "lydia-teera",
  name: "Lydia Teera",
  place: "Uganda",
  roles: "Programme Manager, Learning & Development – SIL Africa",
  intro:
    "Lydia works with schools and churches in Uganda so that refugee and host communities can learn, and read God’s Word, in the languages they speak at home.",
  bio: `Lydia Teera is a Ugandan mission leader serving as Programme Manager with the Learning & Development team at SIL Africa, seconded from Wycliffe Africa. She has been in missionary service for more than twenty years, most of them spent on one problem: across Africa, children and adults are asked to learn, worship and read Scripture in languages they only half understand.

Much of her current work is with refugee and host communities in Uganda, where a single classroom can hold speakers of five languages and the lessons reach none of them well. She has co-led programmes that train teachers to work multilingually, with methods practical enough for schools and governments to adopt, and she is co-author of a bridging programme that helps refugee children settle into Ugandan schools.

Her call to missions came more than twenty years ago, when she decided to give her working life to Bible translation and language development. Ask her about Scripture, or about what language does to a person’s sense of identity and faith, and the conversation will run long. At home, she gardens.

Among the communities she has served, the Pokot of northeastern Uganda hold a particular place in her heart: a marginalised people with low literacy, few basic services, and a church that has long lacked Scripture it can read. She has given years to their language development. She also works on Wycliffe Africa’s partnerships with other mission agencies to recruit and send African missionaries into translation work. Several of those now serving in Uganda came through her.`,
  email: "lydia_teera@wycliffeafrica.org",
};

const MISSIONARIES: MissionaryRecord[] = [
  {
    id: "barah",
    slug: "frans-lilian-barah",
    name: "Frans & Lilian Barah",
    place: "Yaoundé, Cameroon",
    roles: "Language Technology Consultant & Discipleship Ministry",
    intro:
      "Frans and Lilian are Cameroonian missionaries based in Yaoundé: Frans in translation technology, Lilian in discipleship and trauma healing. They have served together for over twenty years.",
    bio: `Frans is a Language Technology Consultant and Associate Domain Team Leader for Language Technology in the SIL Africa Area. He trains and supports Bible translation teams across Africa in the software they use for translation, literacy work, and producing printed and digital Scripture. What he cares about most is training African specialists, so that the work no longer depends on outside help.

Lilian's ministry is discipleship and trauma healing, mostly among children and young women. Her groups pair Bible study with sewing and other practical skills.

Two decades in, their aim has not changed: to know Christ and make Him known, mostly by equipping other people to do the work.`,
    email: "frans_barah@wycliffeafrica.org",
  },
  {
    id: "otieno",
    slug: "samuel-grace-otieno",
    name: "Samuel & Grace Otieno",
    place: "Turkana, Kenya",
    roles: "Translation Team Advisors",
    intro:
      "Samuel and Grace walk alongside mother-tongue translators drafting the New Testament, checking each book with the community until it reads clearly and naturally.",
    bio: `Samuel grew up in Kisumu hearing Scripture read in a language his grandmother never fully understood. That memory carried him through linguistics training and, in 2014, into full-time translation work with Grace, a trained teacher.

Today they serve the Turkana cluster as team advisors: coaching mother-tongue translators through drafting, arranging community checks in village congregations, and preparing each book for consultant review. Their long-term prayer is a complete Turkana New Testament read aloud in every church in the region.`,
    pullQuote: "Their long-term prayer is a complete Turkana New Testament read aloud in every church in the region.",
    email: "portal-demo@wycliffeafrica.org",
  },
  LYDIA_TEERA,
  {
    id: "wanjiru",
    slug: "miriam-wanjiru",
    name: "Miriam Wanjiru",
    place: "Nairobi, Kenya",
    roles: "Literacy Specialist",
    intro:
      "Miriam develops reading primers and adult literacy programmes so that when Scripture arrives, communities can read it for themselves.",
    bio: `A translated Bible no one can read stays closed. Miriam joined the movement after a decade teaching primary school, convinced that literacy is the bridge between a finished translation and a transformed community.

From Nairobi she designs reading primers, trains volunteer literacy teachers, and runs adult reading groups in partner language areas, most recently in the Kakuma refugee settlement.`,
  },
  {
    id: "mwangi",
    slug: "david-mwangi",
    name: "David Mwangi",
    place: "South Sudan",
    roles: "Scripture Engagement",
    intro:
      "David helps churches put translated Scripture to use in worship, discipleship and daily life, through song, audio and Bible study.",
    bio: `David's conviction is simple: translation is finished not when the books are printed, but when people meet God in them. He serves churches in South Sudan as a Scripture engagement facilitator.

His weeks are spent helping congregations weave newly translated Scripture into worship: recording Scripture songs with local choirs, distributing audio Bibles for listening groups, and training pastors to preach from the mother-tongue text.`,
  },
  {
    id: "achieng",
    slug: "esther-achieng",
    name: "Esther Achieng",
    place: "Uganda",
    roles: "Language Survey Specialist",
    intro: "Esther travels across language areas gathering the data that guides where translation work is needed most.",
    bio: `Before a single verse can be drafted, someone has to listen. Esther leads survey trips across Uganda's language areas: recording word lists, testing comprehension between dialects, and sitting with elders to understand how communities actually speak.

Her reports guide where the movement begins its next translation projects, making her work the first chapter of every future Scripture launch.`,
  },
  {
    id: "kamau",
    slug: "joseph-kamau",
    name: "Joseph Kamau",
    place: "Nairobi, Kenya",
    roles: "Finance & Administration",
    intro: "Joseph stewards the funds entrusted to the movement, ensuring every gift is accounted for and directed to the field.",
    bio: `Every translation project runs on the trust of language communities, churches, and the givers who fund the work. Joseph keeps that trust: he manages the movement's accounts from Nairobi, ensuring every gift is tracked from donor to field.

A certified accountant, he left corporate practice in 2018 because he wanted his ledgers to count for something eternal.`,
  },
  {
    id: "njoroge",
    slug: "peter-hannah-njoroge",
    name: "Peter & Hannah Njoroge",
    place: "Cameroon",
    roles: "Bible Translation Advisors",
    intro: "Peter and Hannah serve a cluster of related languages, training local translators and checking drafts with consultants.",
    bio: `Peter and Hannah moved to Cameroon in 2019 to serve a cluster of four related languages in the Northwest. Rather than translating themselves, they train and mentor local translation teams, one team per language, sharing tools, terminology and checked drafts across the cluster.

Their joy is watching a community leader read a freshly checked chapter aloud and hearing the room answer back in recognition.`,
  },
];

const INTERNS: InternRecord[] = [
  {
    id: "tavuyire",
    slug: "jean-claude-tavuyire",
    name: "Rev. Jean-Claude Tavuyire",
    place: "Nairobi, Kenya",
    roles: "Bible Translation & Mission Ministry",
    intro:
      "Jean-Claude is an ordained CBCA pastor serving in Bible translation and mission work, so that many may come to salvation through Scripture they can understand.",
    bio: [
      "I am an ordained pastor in the Baptist Church (CBCA), married, and a father of three. Serving God and supporting marginalized people has shaped most of my ministry, and it is what drew me to Wycliffe Africa.",
      "I believe every person should be able to read the Word of God in their own heart language. That conviction is why I serve in Bible translation and mission work: so that many may come to salvation through Scripture they can actually understand.",
    ],
    monthlyGoal: "Gifts of $20, $50, or $100 a month",
    giveDetails: ["Paybill 400200 | Account No. 1073007"],
  },
  {
    id: "kalese",
    slug: "yuh-kalese-mnason",
    name: "Yuh Kalese Mnason",
    place: "Cameroon",
    roles: "Language Technologies Intern",
    intro:
      "Kalese supports Bible translation teams by training them on language technology tools and connecting new software with real mother-tongue Scripture projects.",
    bio: [
      "My name is Yuh Kalese Mnason. I follow Jesus, and I am deeply grateful for the way He saved and changed my life. That encounter convinced me that everyone deserves to hear God's message of hope in their mother tongue, the language that reaches them most powerfully.",
      "As a Language Technologies Intern, I support Bible translation teams by training them on language technology tools, improving their workflows, and connecting new software with real mother-tongue Scripture projects. Translation is slow, careful work; the right tools can save a team years. I'm glad to use the skills God has given me for people who are still waiting for His Word.",
    ],
    contact: "+237 672 190 922",
    monthlyGoal: "$75/month",
    giveDetails: ["MTN MoMo 672 190 922", "Ecobank Account No. 31545011672"],
  },
  {
    id: "rasoanantenaina",
    slug: "lydia-vonitsoa-rasoanantenaina",
    name: "Lydia Vonitsoa Rasoanantenaina",
    place: "Madagascar",
    roles: "Intern, Bible Translation Ministry",
    intro:
      "Lydia serves with the Bible translation team in Madagascar, helping communities access God's Word in their own language.",
    bio: [
      "My name is Lydia Vonitsoa Rasoanantenaina. My devotion to Jesus Christ and my commitment to spreading the Gospel led me to join Wycliffe Africa's Bible translation ministry. I now serve with the team in Madagascar, helping communities here access God's Word in their own language.",
      "A verse that carries me in this work is Jeremiah 1:7: \"Don't say, 'I'm too young,' for you must go wherever I send you and say whatever I tell you.\"",
    ],
    contact: "+261 37 77 656 18",
  },
  {
    id: "uwimana",
    slug: "lynn-uwimana",
    name: "Lynn Uwimana",
    place: "Kenya",
    roles: "Mission Mobilizer Intern",
    intro:
      "Lynn works with churches to raise awareness of unreached people groups and helps recruit missionaries for Bible translation.",
    bio: [
      "My name is Lynn Uwimana. I follow Christ, and my passion is mission mobilization: bringing awareness of unreached people groups and equipping the body of Christ to carry the Gospel to those near and far, unhindered by language or culture. My hope is that all people may call on the name of the Lord and be saved.",
      "As a Mission Mobilizer intern, I work with churches to raise awareness of the people groups that still have no Scripture in their language, and I help recruit missionaries for Bible translation and the ministries that support it. God has given me experiences and skills for this work, and He keeps growing them in me.",
    ],
    contact: "0706 782 088",
    monthlyGoal: "$75/month",
    giveDetails: ["Equity Bank, Account No. 1031102422607"],
  },
];

const NEWS: NewsRecord[] = [
  {
    id: "why",
    slug: "why",
    category: "story",
    journey: "give",
    tagLabel: "Why translation",
    title: "2,000+ languages still wait for Scripture",
    excerpt:
      "Across Africa, millions have never read a single verse in the language they think, pray and dream in. Bible translation closes that gap.",
    body: "Across Africa, millions have never read a single verse in the language they think, pray and dream in. Bible translation closes that gap.\n\nFor generations, prayers, songs and Sunday readings have come in a language learned at school, never the one spoken at home. Translation closes that distance. When it does, people stop overhearing the gospel and start hearing it.",
    author: "Wycliffe Africa",
    place: "Continental",
    date: "2026",
    status: "published",
    date_created: daysAgo(60),
  },
  {
    id: "member",
    slug: "member",
    category: "story",
    journey: "serve",
    tagLabel: "Serve",
    title: "Becoming a member: your first step into the work",
    excerpt:
      "Translation teams need more than linguists. Teachers, accountants, IT people and pilots all keep the work moving. Here is how membership works.",
    body: "Translation teams need more than linguists. Teachers, accountants, IT people and pilots all keep the work moving. Here is how membership works.",
    author: "Membership Team",
    place: "Nairobi, Kenya",
    date: "2026",
    status: "published",
    date_created: daysAgo(65),
  },
  {
    id: "church",
    slug: "church",
    category: "story",
    journey: "churches",
    tagLabel: "Church partnership",
    title: "Partnering churches into the Great Commission",
    excerpt:
      "We walk with congregations to adopt language communities in prayer, giving and people, until every group has the Word.",
    body: "We walk with congregations to adopt language communities in prayer, giving and people, until every group has the Word.",
    author: "Partnership Team",
    place: "Kenya",
    date: "2026",
    status: "published",
    date_created: daysAgo(70),
  },
  {
    id: "u1",
    slug: "new-testament-draft-reaches-turkana-churches",
    category: "update",
    missionaryId: "otieno",
    title: "New Testament draft reaches Turkana churches",
    excerpt:
      "After three years of drafting and community checking, the Gospels are now being read aloud in Sunday services across six Turkana congregations.",
    body: "After three years of drafting and community checking, the Gospels are now being read aloud in Sunday services across six Turkana congregations.",
    date: "June 2026",
    status: "published",
    date_created: daysAgo(5),
  },
  {
    id: "u3",
    slug: "first-recorded-scripture-songs-released",
    category: "update",
    missionaryId: "mwangi",
    title: "First recorded Scripture songs released",
    excerpt:
      "A local choir has recorded the first Scripture songs in their language, already spreading through phones and radio in the community.",
    body: "A local choir has recorded the first Scripture songs in their language. We set up in the back room of the church with a borrowed microphone, and by the second evening the neighbours had started drifting in to listen.\n\nThe songs carry passages the choir helped check during translation, so the words are already familiar to them. Now they are set to melodies people hum while they work. One recording reached a market town two valleys away within the week, passed phone to phone.\n\nFor people who do not yet read, this is how Scripture arrives first: sung, memorised, repeated. It is not a substitute for the printed text, but it opens the door to it.",
    pullQuote: "By the second evening, the neighbours had started drifting in to listen.",
    inlineImageCaption: "The choir recording in the back room of the church.",
    date: "May 2026",
    status: "published",
    date_created: daysAgo(15),
  },
  {
    id: "u5",
    slug: "language-survey-completed-in-three-new-communities",
    category: "update",
    missionaryId: "achieng",
    title: "Language survey completed in three new communities",
    excerpt:
      "Esther's team has finished surveying three previously undocumented language communities, the first step toward future translation work.",
    body: "Esther's team has finished surveying three previously undocumented language communities, the first step toward future translation work.",
    date: "April 2026",
    status: "published",
    date_created: daysAgo(40),
  },
];

const PRAYERS: PrayerRequestRecord[] = [
  {
    id: "u2",
    type: "prayer",
    missionaryId: "wanjiru",
    title: "Pray for the literacy workshop in Kakuma",
    body: "Miriam leaves next week to train twelve new literacy teachers. Pray for safe travel and for teachers eager to learn.",
    date: "June 2026",
    status: "published",
    date_created: daysAgo(3),
  },
  {
    id: "u4",
    type: "prayer",
    missionaryId: "njoroge",
    title: "Pray for Peter & Hannah's consultant check",
    body: "An outside consultant arrives this month to check the drafted books. Pray for clarity, patience, and unity with the translation team.",
    date: "May 2026",
    status: "published",
    date_created: daysAgo(9),
  },
  {
    id: "u6",
    type: "prayer",
    missionaryId: "kamau",
    title: "Pray for provision as we close the fiscal year",
    body: "Joseph asks for prayer as the team finalises this year's accounts: for wisdom in stewardship and provision for next year's projects.",
    date: "April 2026",
    status: "published",
    date_created: daysAgo(20),
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
    date_created: daysAgo(5),
  },
];

const RESOURCES: ResourceRecord[] = [
  { id: "r1", type: "report", title: "2026 Impact Report", meta: "12 pages", href: "#" },
  { id: "r2", type: "guide", title: "Prayer Guide for Bible Translation", meta: "Monthly", href: "#" },
  { id: "r3", type: "pdf", title: "Church Partnership Starter Pack", meta: "8 pages", href: "#" },
  { id: "r4", type: "video", title: "Vision 2025: Field Film", meta: "6 min", href: "#" },
  { id: "r5", type: "audio", title: "Field Update Podcast, Episode 12", meta: "24 min", href: "#" },
  { id: "r6", type: "pdf", title: "No Bible Sunday Planning Kit", meta: "5 pages", href: "#" },
];

const FAQS: FaqRecord[] = [
  {
    id: "f1",
    question: "How is my gift used?",
    answer:
      "Most of it pays for people and their work on the field: drafting, community checking sessions, consultant visits, and training for African translators. The Give page has a fuller breakdown.",
  },
  {
    id: "f2",
    question: "Can I support a specific missionary?",
    answer:
      "Yes. Each missionary raises support relationship by relationship. Visit Our Missionaries to read profiles and start a monthly partnership.",
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
      "Start with the preliminary questionnaire. It takes about ten minutes and helps our team understand where your skills might fit the work.",
  },
];

export async function getNews(): Promise<NewsRecord[]> {
  return NEWS.filter((n) => n.status === "published").sort(byNewestCreated);
}

export async function getNewsBySlug(slug: string): Promise<NewsRecord | undefined> {
  return NEWS.find((n) => n.slug === slug && n.status === "published");
}

export async function getMissionaries(): Promise<MissionaryRecord[]> {
  return MISSIONARIES;
}

export async function getMissionaryBySlug(slug: string): Promise<MissionaryRecord | undefined> {
  return MISSIONARIES.find((m) => m.slug === slug);
}

export async function getUpdatesForMissionary(missionaryId: string): Promise<NewsRecord[]> {
  return NEWS.filter(
    (n) => n.category === "update" && n.missionaryId === missionaryId && n.status === "published",
  ).sort(byNewestCreated);
}

function byNewestCreated(a: { date_created?: string | null }, b: { date_created?: string | null }): number {
  return (b.date_created ?? "").localeCompare(a.date_created ?? "");
}

export async function getPrayerRequests(): Promise<PrayerRequestRecord[]> {
  return PRAYERS.filter((u) => u.status === "published" && isFreshPrayer(u.date_created)).sort(
    byNewestCreated,
  );
}

/**
 * Scoped to a missionary's own profile page — excludes `sensitive` requests,
 * which only ever appear anonymized on `/prayer`, never tied to a name here.
 */
export async function getPrayerRequestsForMissionary(missionaryId: string): Promise<PrayerRequestRecord[]> {
  return PRAYERS.filter(
    (u) =>
      u.missionaryId === missionaryId &&
      u.status === "published" &&
      !u.sensitive &&
      isFreshPrayer(u.date_created),
  ).sort(byNewestCreated);
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

export async function getInterns(): Promise<InternRecord[]> {
  return INTERNS;
}

export async function getInternBySlug(slug: string): Promise<InternRecord | undefined> {
  return INTERNS.find((i) => i.slug === slug);
}
