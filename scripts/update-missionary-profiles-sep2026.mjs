/**
 * Updates the Barah and Teera missionary profiles with fuller bio copy, and
 * publishes Mwendwa and Otabil (previously name+place-only drafts) with full
 * profile content. Also sets each missionary's `prayerPoints` field — standing
 * prayer points, always shown on the profile page (unlike `prayer_requests`,
 * which are time-boxed and expire after two weeks). Ensures the
 * `prayerPoints` field exists on the `missionaries` collection first.
 *
 * Safe to re-run: missionaries are upserted by `id`.
 *
 * Usage (static admin token):
 *   DIRECTUS_URL=https://directus-production-3ac1.up.railway.app \
 *   DIRECTUS_ADMIN_TOKEN=... \
 *   node scripts/update-missionary-profiles-sep2026.mjs
 *
 * Usage (email/password login, e.g. via `railway run --service directus --`
 * so ADMIN_EMAIL/ADMIN_PASSWORD come from the directus service's own vars):
 *   DIRECTUS_URL=https://directus-production-3ac1.up.railway.app \
 *   ADMIN_EMAIL=... ADMIN_PASSWORD=... \
 *   node scripts/update-missionary-profiles-sep2026.mjs
 */

const DIRECTUS_URL = process.env.DIRECTUS_URL?.replace(/\/$/, "");
let adminToken = process.env.DIRECTUS_ADMIN_TOKEN ?? null;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!DIRECTUS_URL || (!adminToken && !(ADMIN_EMAIL && ADMIN_PASSWORD))) {
  console.error("Set DIRECTUS_URL, and either DIRECTUS_ADMIN_TOKEN or ADMIN_EMAIL + ADMIN_PASSWORD.");
  process.exit(1);
}

const MISSIONARIES = [
  {
    id: "barah",
    slug: "frans-lilian-barah",
    status: "published",
    name: "Frans & Lilian Barah",
    place: "Yaoundé, Cameroon",
    roles: "Language Technology Consultant & Discipleship Ministry",
    intro:
      "For more than two decades, Frans and Lilian Barah have served together in Bible translation, church ministry, leadership development, and community transformation. Their shared desire is simple: to know Christ and make Him known by equipping others and helping communities experience the transforming power of God's Word.",
    bio: [
      "Frans serves as a Language Technology Consultant and Associate Domain Team Leader for Language Technology in the SIL Africa Area. His work takes him alongside Bible translation teams across Africa, where he trains, mentors, and supports translators in using technology for translation, literacy, and the production of printed and digital Scripture resources.",
      "For Frans, technology is more than a tool. It can help make the work of Bible translation more effective and sustainable, while creating opportunities for African leaders to develop their skills and take greater ownership of the work in their communities. He is especially passionate about developing African leaders and building sustainable local capacity.",
      "Lilian's ministry focuses on people. She serves through discipleship, trauma healing, mentoring and practical skills development, with a special passion for children and young women. Through Bible study, sewing and life-skills training, she creates spaces where people can grow both spiritually and practically.",
      "Together, Frans and Lilian see their different gifts as part of the same calling. Whether through technology, leadership development, discipleship or practical skills, they seek to equip others to serve and to see God's Word take root in communities.",
      "Their ministry is a reminder that Bible translation is more than producing Scripture. It also involves equipping people, strengthening communities and helping the Church grow so that God's Word can continue to transform lives.",
    ],
    prayerPoints: [
      "Pray for wisdom and strength as Frans trains and supports Bible translation teams across Africa.",
      "Pray for Lilian as she disciples and mentors children and young women, especially those walking through difficult experiences.",
      "Pray for continued opportunities to develop African leaders and strengthen local capacity for Bible translation.",
      "Pray for Frans and Lilian as they serve together, that God would continue to use their gifts to make Christ known and see His Word transform lives.",
    ],
  },
  {
    id: "teera",
    slug: "lydia-teera",
    status: "published",
    name: "Lydia Teera",
    place: "Uganda",
    roles: "Programme Manager, Learning & Development – SIL Africa",
    intro:
      "Lydia Teera is a Ugandan mission leader serving as Programme Manager for Learning & Development with SIL Africa, while seconded from Wycliffe Africa. With more than two decades of missionary service, Lydia is passionate about helping people access education and Scripture in languages they understand best.",
    bio: [
      "Her work focuses on advocacy, partnership building and strengthening initiatives that promote language-inclusive education and meaningful engagement with Scripture across African communities. For Lydia, language is more than a means of communication—it can become a bridge to learning, faith and community transformation.",
      "In Uganda, Lydia contributes to initiatives addressing language barriers in education, particularly among refugee and host communities. She has co-led evidence-based programmes that equip educators with multilingual classroom strategies and practical approaches that can be adopted by governments and other institutions. By bringing together research, training and community engagement, she works to help learners access education without language becoming a barrier.",
      "Lydia's journey in missions began more than 20 years ago when she made the decision to dedicate her life to advancing God's mission through Bible translation and language development. Since then, advocacy, communication and partnership building have become important parts of her ministry. She is also a co-author of a bridging programme that supports refugee learners as they transition into Ugandan schools.",
      "One language community that holds a special place in Lydia's heart is the Pokot in northeastern Uganda. The community faces challenges including low literacy, limited access to basic resources and the difficulties of remote geography. Lydia has invested significant time in supporting their language development and helping address some of the barriers that affect their access to education and the Christian faith.",
      "Her passion for language and Scripture also shapes the way she encourages others to join the mission. Lydia is a key contributor to Wycliffe Africa's partnerships with other mission organisations to recruit and send African missionaries into Bible translation work around the world. Through this ministry, she has helped recruit several missionaries now serving in Uganda.",
      "Beyond her work, Lydia enjoys meaningful conversations about Scripture and the role language plays in shaping identity and faith. She also loves sharing stories that highlight the impact of Bible translation and education initiatives. When she is at home, you will often find her enjoying time in her garden.",
      "Across her many areas of service, Lydia continues to carry one desire: that language would open doors rather than close them—helping people learn, encounter Scripture, grow in faith and participate fully in their communities.",
    ],
    prayerPoints: [
      "Pray for Lydia as she advocates for language-inclusive education and meaningful engagement with Scripture across African communities.",
      "Pray for refugee and host communities in Uganda, that language barriers would not prevent children and families from accessing education and opportunities to thrive.",
      "Pray for the Pokot community and for continued progress in language development, literacy and access to God's Word.",
      "Pray for Wycliffe Africa's partnerships and missionary mobilisation efforts, that more African Christians would respond to God's call to serve in Bible translation around the world.",
      "Pray for wisdom, strength and grace for Lydia as she continues to serve across education, language development and mission mobilisation.",
    ],
  },
  {
    id: "mwendwa",
    slug: "nicholus-mwendwa",
    status: "published",
    name: "Nicholus Mwendwa",
    place: "Kenya",
    roles: "Accountant – Wycliffe Africa",
    intro:
      "Nicholus Mwendwa serves with Wycliffe Africa as an Accountant, using his professional skills in finance and administration to support missionaries and the wider ministry of Bible translation.",
    bio: [
      "His desire to serve God began many years ago. Growing up in a Christian family shaped his love for Christ and strengthened his desire to be involved in ministry. When he joined Wycliffe Africa, he experienced a deep sense of God's peace, confirming that this was more than a professional opportunity—it was an opportunity to serve God through the gifts and skills He had given him.",
      "One experience has particularly shaped how Nicholus sees his role. He remembers watching his grandmother read Scripture in her mother tongue. Seeing the joy and smile on her face as she engaged with God's Word helped him realise that many others deserve to experience that same joy. That moment gave him a deeper appreciation for Bible translation and for the many people whose work helps make Scripture accessible in languages people understand.",
      "As an accountant, Nicholus supports Wycliffe Africa's missionaries by helping ensure that the resources entrusted to the ministry are properly managed. His responsibilities include financial reporting, budgeting, reconciliations, expenditure monitoring, audit support and financial compliance. For Nicholus, accounting is not simply about numbers—it is about stewardship and ministry.",
      "He believes every resource entrusted to Wycliffe Africa should be handled with integrity and used responsibly to advance God's mission. By providing sound financial and administrative support, he helps create an environment where missionaries can focus on the work God has called them to do.",
      "What keeps him going is knowing that his work is connected to something much bigger than himself. Behind every financial report, payment and budget are missionaries and communities that are part of the larger story of God's Word reaching people in languages they understand. His grandmother's joy continues to remind him that many people are still waiting to experience the same privilege of reading God's Word in their own language.",
      "Nicholus desires to serve with integrity, excellence and faithfulness, knowing that even a role behind the scenes can contribute to the transformation that comes through God's Word. Looking back, he is grateful for how God has brought together his Christian upbringing, professional training, passion for ministry and desire to serve His mission. His grandmother's smile remains a powerful reminder of why this work matters—and of the joy he hopes many more people will experience as God's Word becomes available in their own languages.",
    ],
    pullQuote:
      "I may not be the person translating every word of Scripture, but I can faithfully use what God has placed in my hands to help make the work possible.",
    prayerPoints: [
      "Pray for wisdom and integrity as Nicholus manages the financial resources entrusted to Wycliffe Africa.",
      "Pray for Wycliffe Africa's missionaries, that they will have the resources and encouragement they need to serve effectively.",
      "Pray for Nicholus's continued spiritual and professional growth as he serves.",
      "Pray for the Bible translation movement and for more communities to gain access to God's Word in their own languages.",
    ],
  },
  {
    id: "otabil",
    slug: "otabil-arthur",
    status: "published",
    name: "Otabil Arthur",
    place: "Accra, Ghana",
    roles: "Online Content and Design Manager – Wycliffe Global Alliance",
    intro:
      "Otabil Arthur is a storyteller, strategic communicator, and missionary serving with Wycliffe Africa from Accra, Ghana. As the Online Content and Design Manager for the Wycliffe Global Alliance, he uses storytelling, visual communication and digital media to connect people with the work of Bible translation and help mobilise the global Church around the movement.",
    bio: [
      "Before serving in his current role, Otabil spent 11 years working in Communications and Fundraising with the Ghana Institute of Linguistics, Literacy and Bible Translation (GILLBT). During that time, he helped tell the stories of local language communities and mobilise support for mother-tongue Scripture work.",
      "His passion for communicating the Gospel also extends beyond the digital space. Otabil serves as the Distant Missions Coordinator at Legon Interdenominational Church (LIC) in Accra, where he helps lead teams in reaching unreached people groups. Through this ministry, he combines communication and media mobilisation with opportunities to engage directly in evangelism.",
      "For Otabil, communication is more than creating compelling images or telling good stories. It is a way of helping people see what God is doing among language communities and inviting them to become part of His work.",
      "With advanced degrees in IT Law and Public Relations, together with specialised training in film and artistic media, Otabil brings together professional expertise and a passion for mission. Through his work in digital content and design, he seeks to make the message of the Bible translation movement clear, engaging and accessible to people around the world.",
      "He is supported in life and ministry by his wife, Sherrita, and their two children, Menaye and Kow. Together, they share a desire to see people from every language group encounter the living Word of God.",
      "For Otabil, every story is an opportunity to point people towards what God is doing—and to inspire more people to take part in the mission of making His Word known in every language.",
    ],
    prayerPoints: [
      "Pray for wisdom and creativity as Otabil communicates the work of Bible translation to audiences around the world.",
      "Pray for the Wycliffe Global Alliance and its partners as they seek to see the Bible made accessible to people in every language.",
      "Pray for the unreached people groups Otabil and others are serving, that many will encounter the Gospel.",
      "Pray for strength and grace for Otabil, Sherrita, and their children as they serve God together.",
    ],
  },
];

async function api(path, { method = "GET", body, ok404 = false } = {}) {
  const response = await fetch(`${DIRECTUS_URL}${path}`, {
    method,
    signal: AbortSignal.timeout(20_000),
    headers: {
      ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {}),
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (ok404 && (response.status === 404 || response.status === 403)) return null;
  if (!response.ok) {
    throw new Error(`${method} ${path} → ${response.status}: ${(await response.text()).slice(0, 500)}`);
  }
  if (response.status === 204) return null;
  return (await response.json()).data;
}

async function ensurePrayerPointsField() {
  const current = (await api("/fields/missionaries")).find((field) => field.field === "prayerPoints");
  const definition = {
    field: "prayerPoints",
    type: "text",
    meta: {
      interface: "input-multiline",
      note: "One prayer point per line. Always shown on the profile — unlike prayer_requests, these never expire.",
    },
  };
  if (current) {
    await api("/fields/missionaries/prayerPoints", { method: "PATCH", body: definition });
  } else {
    await api("/fields/missionaries", { method: "POST", body: definition });
  }
  console.log("✓ missionaries.prayerPoints field ensured");
}

async function upsertMissionary({ bio, prayerPoints, ...record }) {
  const existing = await api(`/items/missionaries/${record.id}`, { ok404: true });
  const fields = { ...record, bio: bio.join("\n\n"), prayerPoints: prayerPoints.join("\n") };
  if (existing) {
    const { id, ...rest } = fields;
    await api(`/items/missionaries/${id}`, { method: "PATCH", body: rest });
    console.log(`✓ updated missionary '${id}'`);
  } else {
    await api("/items/missionaries", { method: "POST", body: fields });
    console.log(`✓ created missionary '${record.id}'`);
  }
}

async function main() {
  if (!adminToken) {
    const auth = await api("/auth/login", { method: "POST", body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, mode: "json" } });
    adminToken = auth.access_token;
  }
  console.log("✓ authenticated");

  await ensurePrayerPointsField();

  for (const missionary of MISSIONARIES) {
    await upsertMissionary(missionary);
  }
}

main().catch((error) => {
  console.error(error.message, error.cause ?? "");
  process.exit(1);
});
