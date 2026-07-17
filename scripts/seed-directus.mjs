/**
 * One-time Directus bootstrap for the Wycliffe Africa site.
 *
 * Creates the content collections (missionaries, field_updates, stories,
 * resources, faqs), a read-only "Site" role for the Next.js server, a
 * "Missionary" role for portal logins (create drafts + read own items),
 * a site API user with a static token, a demo missionary account, and
 * seeds the fixture content.
 *
 * Usage:
 *   DIRECTUS_URL=... ADMIN_EMAIL=... ADMIN_PASSWORD=... node scripts/seed-directus.mjs
 *
 * Idempotency: aborts if the `missionaries` collection already exists.
 */

import crypto from "node:crypto";

const DIRECTUS_URL = process.env.DIRECTUS_URL?.replace(/\/$/, "");
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!DIRECTUS_URL || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("Set DIRECTUS_URL, ADMIN_EMAIL and ADMIN_PASSWORD.");
  process.exit(1);
}

let adminToken = null;

async function api(path, { method = "GET", body, ok404 = false } = {}) {
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  // Directus answers 403 (not 404) for collections that don't exist.
  if ((res.status === 404 || res.status === 403) && ok404) return null;
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${method} ${path} → ${res.status}: ${text.slice(0, 400)}`);
  }
  if (res.status === 204) return null;
  return (await res.json()).data;
}

// ---------------------------------------------------------------- fixtures

const MISSIONARIES = [
  {
    id: "otieno",
    slug: "otieno",
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
    slug: "wanjiru",
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
    slug: "mwangi",
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
    slug: "achieng",
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
    slug: "kamau",
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
    slug: "njoroge",
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

const UPDATES = [
  {
    type: "update",
    missionaryId: "otieno",
    title: "New Testament draft reaches Turkana churches",
    body: "After three years of drafting and community checking, the Gospels are now being read aloud in Sunday services across six Turkana congregations.",
    date: "June 2026",
    status: "published",
    sensitive: false,
  },
  {
    type: "prayer",
    missionaryId: "wanjiru",
    title: "Pray for the literacy workshop in Kakuma",
    body: "Miriam leaves next week to train twelve new literacy teachers. Pray for safe travel and for teachers eager to learn.",
    date: "June 2026",
    status: "published",
    sensitive: false,
  },
  {
    type: "update",
    missionaryId: "mwangi",
    title: "First recorded Scripture songs released",
    body: "A local choir has recorded the first Scripture songs in their language — already spreading through phones and radio in the community.",
    date: "May 2026",
    status: "published",
    sensitive: false,
  },
  {
    type: "prayer",
    missionaryId: "njoroge",
    title: "Pray for Peter & Hannah's consultant check",
    body: "An outside consultant arrives this month to check the drafted books. Pray for clarity, patience, and unity with the translation team.",
    date: "May 2026",
    status: "published",
    sensitive: false,
  },
  {
    type: "update",
    missionaryId: "achieng",
    title: "Language survey completed in three new communities",
    body: "Esther's team has finished surveying three previously undocumented language communities — the first step toward future translation work.",
    date: "April 2026",
    status: "published",
    sensitive: false,
  },
  {
    type: "prayer",
    missionaryId: "kamau",
    title: "Pray for provision as we close the fiscal year",
    body: "Joseph asks for prayer as the team finalises this year's accounts — for wisdom in stewardship and provision for next year's projects.",
    date: "April 2026",
    status: "published",
    sensitive: false,
  },
  {
    type: "prayer",
    missionaryId: "mwangi",
    title: "Pray for a listening group in a restricted area",
    body: "A new Scripture listening group has begun meeting quietly in a community where open Christian gatherings draw hostility. Pray for the group's protection, and for the Word to take root.",
    date: "June 2026",
    status: "published",
    sensitive: true,
  },
];

const STORIES = [
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

const RESOURCES = [
  { id: "r1", type: "report", title: "2026 Impact Report", meta: "12 pages", href: "#" },
  { id: "r2", type: "guide", title: "Prayer Guide for Bible Translation", meta: "Monthly", href: "#" },
  { id: "r3", type: "pdf", title: "Church Partnership Starter Pack", meta: "8 pages", href: "#" },
  { id: "r4", type: "video", title: "Vision 2025 — Field Film", meta: "6 min", href: "#" },
  { id: "r5", type: "audio", title: "Field Update Podcast, Episode 12", meta: "24 min", href: "#" },
  { id: "r6", type: "pdf", title: "No Bible Sunday Planning Kit", meta: "5 pages", href: "#" },
];

const FAQS = [
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

// ------------------------------------------------------------ field helpers

const stringPk = { field: "id", type: "string", schema: { is_primary_key: true, length: 64 }, meta: { interface: "input", readonly: true } };
const uuidPk = { field: "id", type: "uuid", schema: { is_primary_key: true }, meta: { special: ["uuid"], readonly: true } };
const str = (field, opts = {}) => ({ field, type: "string", schema: {}, meta: { interface: "input", ...opts } });
const text = (field) => ({ field, type: "text", schema: {}, meta: { interface: "input-multiline" } });
const json = (field) => ({ field, type: "json", schema: {}, meta: { interface: "input-code" } });
const bool = (field) => ({ field, type: "boolean", schema: { default_value: false }, meta: { interface: "boolean" } });

const COLLECTIONS = [
  {
    collection: "missionaries",
    meta: { icon: "person", note: "Serving missionaries shown on the website" },
    fields: [
      stringPk,
      str("slug"),
      str("name"),
      str("place"),
      str("roles"),
      text("intro"),
      json("bio"),
      { field: "user", type: "uuid", schema: {}, meta: { interface: "select-dropdown-m2o", note: "Portal login that owns this profile" } },
      str("image"),
    ],
  },
  {
    collection: "field_updates",
    meta: { icon: "campaign", note: "Field updates and prayer requests, drafted via the missionary portal", archive_field: "status", archive_value: "archived", unarchive_value: "draft" },
    fields: [
      uuidPk,
      { field: "status", type: "string", schema: { default_value: "draft" }, meta: { interface: "select-dropdown", options: { choices: [
        { text: "Draft (in review)", value: "draft" },
        { text: "Published", value: "published" },
        { text: "Archived", value: "archived" },
      ] } } },
      { field: "type", type: "string", schema: { default_value: "update" }, meta: { interface: "select-dropdown", options: { choices: [
        { text: "Field update", value: "update" },
        { text: "Prayer request", value: "prayer" },
      ] } } },
      str("missionaryId"),
      str("title"),
      text("body"),
      str("date"),
      bool("sensitive"),
      str("image"),
      { field: "user_created", type: "uuid", schema: {}, meta: { special: ["user-created"], hidden: true } },
      { field: "date_created", type: "timestamp", schema: {}, meta: { special: ["date-created"], hidden: true } },
    ],
  },
  {
    collection: "stories",
    meta: { icon: "auto_stories" },
    fields: [stringPk, str("slug"), str("journey"), str("tagLabel"), str("title"), text("excerpt"), json("body"), str("author"), str("place"), str("date"), str("image")],
  },
  {
    collection: "resources",
    meta: { icon: "folder" },
    fields: [stringPk, str("type"), str("title"), str("meta"), str("href")],
  },
  {
    collection: "faqs",
    meta: { icon: "help" },
    fields: [stringPk, str("question"), text("answer")],
  },
];

// ------------------------------------------------------------------- main

async function main() {
  const auth = await api("/auth/login", { method: "POST", body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, mode: "json" } });
  adminToken = auth.access_token;
  console.log("✓ admin login");

  const existing = await api("/collections/missionaries", { ok404: true });
  if (existing) {
    console.error("Collection `missionaries` already exists — aborting to avoid duplicate seeding.");
    process.exit(1);
  }

  for (const c of COLLECTIONS) {
    await api("/collections", { method: "POST", body: { collection: c.collection, schema: {}, meta: c.meta, fields: c.fields } });
    console.log(`✓ collection ${c.collection}`);
  }

  // --- Site policy/role: read-only access for the Next.js server ---
  const sitePolicy = await api("/policies", { method: "POST", body: { name: "Site (read-only)", icon: "public", admin_access: false, app_access: false } });
  await api("/permissions", { method: "POST", body: [
    { policy: sitePolicy.id, collection: "missionaries", action: "read", fields: ["*"], permissions: {} },
    { policy: sitePolicy.id, collection: "field_updates", action: "read", fields: ["*"], permissions: { status: { _eq: "published" } } },
    { policy: sitePolicy.id, collection: "stories", action: "read", fields: ["*"], permissions: {} },
    { policy: sitePolicy.id, collection: "resources", action: "read", fields: ["*"], permissions: {} },
    { policy: sitePolicy.id, collection: "faqs", action: "read", fields: ["*"], permissions: {} },
  ] });
  const siteRole = await api("/roles", { method: "POST", body: { name: "Site", icon: "public" } });
  await api("/access", { method: "POST", body: { role: siteRole.id, policy: sitePolicy.id } });
  console.log("✓ Site role + policy");

  // --- Missionary policy/role: create drafts, read own ---
  const missionaryPolicy = await api("/policies", { method: "POST", body: { name: "Missionary portal", icon: "person", admin_access: false, app_access: false } });
  await api("/permissions", { method: "POST", body: [
    {
      policy: missionaryPolicy.id,
      collection: "field_updates",
      action: "create",
      fields: ["type", "title", "body", "sensitive", "missionaryId", "date", "status"],
      validation: { status: { _eq: "draft" } },
      presets: { status: "draft" },
    },
    { policy: missionaryPolicy.id, collection: "field_updates", action: "read", fields: ["*"], permissions: { user_created: { _eq: "$CURRENT_USER" } } },
    { policy: missionaryPolicy.id, collection: "missionaries", action: "read", fields: ["*"], permissions: { user: { _eq: "$CURRENT_USER" } } },
    { policy: missionaryPolicy.id, collection: "directus_users", action: "read", fields: ["id", "email", "first_name"], permissions: { id: { _eq: "$CURRENT_USER" } } },
  ] });
  const missionaryRole = await api("/roles", { method: "POST", body: { name: "Missionary", icon: "person" } });
  await api("/access", { method: "POST", body: { role: missionaryRole.id, policy: missionaryPolicy.id } });
  console.log("✓ Missionary role + policy");

  // --- Users ---
  const siteToken = crypto.randomBytes(24).toString("hex");
  await api("/users", { method: "POST", body: {
    email: "site-api@wycliffeafrica.org",
    first_name: "Site",
    last_name: "API",
    role: siteRole.id,
    token: siteToken,
    status: "active",
  } });

  const demoPassword = crypto.randomBytes(12).toString("base64url");
  const demoUser = await api("/users", { method: "POST", body: {
    email: "portal-demo@wycliffeafrica.org",
    password: demoPassword,
    first_name: "Samuel & Grace",
    last_name: "Otieno",
    role: missionaryRole.id,
    status: "active",
  } });
  console.log("✓ users (site API + demo missionary)");

  // --- Content ---
  await api("/items/missionaries", { method: "POST", body: MISSIONARIES.map((m) => m.id === "otieno" ? { ...m, user: demoUser.id } : m) });
  await api("/items/field_updates", { method: "POST", body: UPDATES });
  await api("/items/stories", { method: "POST", body: STORIES });
  await api("/items/resources", { method: "POST", body: RESOURCES });
  await api("/items/faqs", { method: "POST", body: FAQS });
  console.log("✓ content seeded");

  console.log("\n--- Connect the site ---");
  console.log(`DIRECTUS_URL=${DIRECTUS_URL}`);
  console.log(`DIRECTUS_TOKEN=${siteToken}`);
  console.log("\n--- Demo portal login (linked to Samuel & Grace Otieno) ---");
  console.log("email:    portal-demo@wycliffeafrica.org");
  console.log(`password: ${demoPassword}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
