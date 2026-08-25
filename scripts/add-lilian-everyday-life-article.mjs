/**
 * Adds the "Living the Good News Through Everyday Life" missionary update
 * (news, category "update") and its four prayer points (prayer_requests,
 * type "prayer") for Lilian Barah to a live Directus instance.
 * Safe to re-run: dedupes the news item by slug and prayers by title.
 *
 * Usage (static admin token):
 *   DIRECTUS_URL=... DIRECTUS_ADMIN_TOKEN=... node scripts/add-lilian-everyday-life-article.mjs
 * Usage (email/password login, if no static token is available):
 *   DIRECTUS_URL=... ADMIN_EMAIL=... ADMIN_PASSWORD=... node scripts/add-lilian-everyday-life-article.mjs
 *
 * Both records are created as status "draft" — publish them from the
 * Directus admin app once reviewed.
 */

const DIRECTUS_URL = process.env.DIRECTUS_URL?.replace(/\/$/, "");
const DIRECTUS_ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!DIRECTUS_URL || (!DIRECTUS_ADMIN_TOKEN && !(ADMIN_EMAIL && ADMIN_PASSWORD))) {
  console.error("Set DIRECTUS_URL, and either DIRECTUS_ADMIN_TOKEN or ADMIN_EMAIL + ADMIN_PASSWORD.");
  process.exit(1);
}

const MISSIONARY_ID = "barah";

const NEWS_ITEM = {
  status: "draft",
  category: "update",
  missionaryId: MISSIONARY_ID,
  slug: "living-the-good-news-through-everyday-life",
  title: "Living the Good News Through Everyday Life",
  excerpt:
    "Whether in a workplace or a children's Bible club, missionary Lilian Barah continues to share the love of Christ by helping people discover what it means to live out the Gospel every day.",
  body: [
    "Whether in a workplace or a children's Bible club, missionary Lilian Barah continues to share the love of Christ by helping people discover what it means to live out the Gospel every day.",
    "Lilian serves through discipleship, trauma healing, mentoring, and practical skills development. She has a special passion for children and young women, walking alongside them as they grow spiritually and practically through Bible study, sewing, and life-skills training.",
    "After recently completing her school term, Lilian was warmly welcomed back by the women she mentors. They were eager for her to resume leading their Bible lessons — a reminder of the meaningful relationships she has built through consistent discipleship.",
    'In her latest women\'s fellowship, Lilian taught on "Living the Good News Through Empathy in Our Workplace." As the discussion unfolded, many women reflected honestly on their experiences at work and in business. The lesson challenged them to treat customers and colleagues with greater compassion, recognizing that their workplaces are also mission fields where they can demonstrate the love of Christ.',
    '"The women openly shared their experiences," Lilian says. "Many appreciated the lesson and admitted there were times they had not treated others well. We desire to use our workplaces to share the Good News and reach those who may never hear it otherwise."',
    'Lilian also continued her children\'s Bible Club, even though attendance was smaller because many children were away on holiday. Together they explored the theme "God Created Me," based on Psalm 139:14: "I praise You because I am fearfully and wonderfully made."',
    "Through stories, questions, and lively discussions, the children learned that every person is created in God's image and deeply valued by Him. While none of the children made a decision to follow Christ during the session, Lilian remains encouraged by their growing understanding and continues to pray that the seeds planted in their hearts will bear lasting fruit.",
    "As Lilian faithfully serves through teaching, mentoring, and discipleship, lives are being shaped one lesson, one conversation, and one child at a time.",
  ],
  place: "Yaoundé, Cameroon",
  date: "August 2026",
};

const PRAYERS = [
  {
    status: "draft",
    type: "prayer",
    missionaryId: MISSIONARY_ID,
    title: "Pray for women reflecting Christ in their workplaces",
    body: "Thank God for the women who are growing in their desire to reflect Christ in their workplaces.",
    date: "August 2026",
  },
  {
    status: "draft",
    type: "prayer",
    missionaryId: MISSIONARY_ID,
    title: "Pray for everyday opportunities to share Jesus' love",
    body: "Pray that their daily interactions will become opportunities to share the love of Jesus.",
    date: "August 2026",
  },
  {
    status: "draft",
    type: "prayer",
    missionaryId: MISSIONARY_ID,
    title: "Pray for the children at Bible Club",
    body: "Pray for the children who attended Bible Club, that the truths they learned will take root and lead them to faith in Christ.",
    date: "August 2026",
  },
  {
    status: "draft",
    type: "prayer",
    missionaryId: MISSIONARY_ID,
    title: "Pray for Lilian's strength and wisdom",
    body: "Pray for God's strength, wisdom, and continued fruitfulness as Lilian serves through discipleship and mentoring.",
    date: "August 2026",
  },
];

async function api(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${method} ${path} -> ${res.status}: ${text.slice(0, 400)}`);
  }
  if (res.status === 204) return null;
  return (await res.json()).data;
}

async function main() {
  let token = DIRECTUS_ADMIN_TOKEN;
  if (!token) {
    const auth = await api("/auth/login", {
      method: "POST",
      body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, mode: "json" },
    });
    token = auth.access_token;
    console.log("logged in");
  }

  const existingNews = await api(
    `/items/news?filter[slug][_eq]=${encodeURIComponent(NEWS_ITEM.slug)}&limit=1`,
    { token },
  );
  if (existingNews.length) {
    await api(`/items/news/${existingNews[0].id}`, { method: "PATCH", body: NEWS_ITEM, token });
    console.log(`updated news '${NEWS_ITEM.slug}'`);
  } else {
    await api("/items/news", { method: "POST", body: NEWS_ITEM, token });
    console.log(`created news '${NEWS_ITEM.slug}'`);
  }

  for (const prayer of PRAYERS) {
    const existing = await api(
      `/items/prayer_requests?filter[title][_eq]=${encodeURIComponent(prayer.title)}&filter[missionaryId][_eq]=${MISSIONARY_ID}&limit=1`,
      { token },
    );
    if (existing.length) {
      await api(`/items/prayer_requests/${existing[0].id}`, { method: "PATCH", body: prayer, token });
      console.log(`updated prayer '${prayer.title}'`);
    } else {
      await api("/items/prayer_requests", { method: "POST", body: prayer, token });
      console.log(`created prayer '${prayer.title}'`);
    }
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
