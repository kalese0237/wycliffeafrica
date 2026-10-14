/**
 * About Us family content.
 *
 * The doctrinal statement, the Wycliffe Africa beliefs, the role-of-the-Church list and the core
 * values are **verbatim** text supplied by Wycliffe Africa. Do not edit, condense or paraphrase them
 * — design serves the words. See `.impeccable/surfaces/src-app-about.md`.
 *
 * Board roles and biographies are NOT on file. They render as visibly marked placeholders rather than
 * as invented fact. The history milestones come from docs/content/history-of-wycliffe-africa.md.
 */

export interface HistoryMilestone {
  /** Reads "YEAR — TBC" until Wycliffe Africa confirms the date. */
  year: string;
  title: string;
  body: string;
  /** True while the milestone is awaiting confirmation; renders in the pending style. */
  pending: boolean;
}

export interface BoardMember {
  name: string;
  /** Absent until confirmed — the card falls back to "Role to be confirmed". */
  role?: string;
  /** Absent until supplied. Rows are sized for 40–70 words. */
  bio?: string;
  /** Absent until portraits arrive — the card renders a monogram tile instead. */
  photo?: string;
  /**
   * Set for members whose portrait is not to be published. The monogram tile becomes permanent and
   * drops its "Portrait pending" stamp, so nothing implies a photo is coming.
   */
  photoWithheld?: boolean;
}

/** The seven truths, verbatim. Rendered as Roman-numeraled articles; never as a plain bullet list. */
export const DOCTRINAL_TRUTHS: string[] = [
  "The divine inspiration and consequent authority of the whole canonical Scripture.",
  "The doctrine of the trinity.",
  "The fall of man, his consequent moral depravity, and his need for transformation.",
  "The atonement through the substitutionary death of Christ.",
  "The doctrine of justification by faith.",
  "The resurrection of the body, both in the case of the just and the unjust.",
  "The eternal life of the saved and the eternal punishment of the lost.",
];

/**
 * "Wycliffe Africa believes", verbatim — the five unique convictions.
 *
 * The supplied source list ended with two further bullets ("The resurrection of the body..." and
 * "The eternal life of the saved...") repeated word-for-word from DOCTRINAL_TRUTHS above. That reads
 * as a copy-paste slip and the duplicates are omitted here pending confirmation from Wycliffe Africa.
 * If they were intentional, append them rather than re-typing the list.
 */
export const WYCLIFFE_BELIEFS: string[] = [
  "The Bible is God's message for people everywhere.",
  "The message of the Bible is evangelistic and is the basis for church planting and growth.",
  "The most effective means of communication is the mother tongue.",
  "For a church to be truly indigenous, it must have the Bible in its mother tongue.",
  "Bible translation is the task of the whole Church, and everyone can have a part.",
];

/** The role of the Church, verbatim. */
export const CHURCH_ROLE: string[] = [
  "God wants everyone to have the opportunity to enter into eternal life through Jesus Christ, regardless of background or location.",
  "God works through his Church to accomplish this, as the Holy Spirit empowers and directs members of the body to reach out to the world.",
  "Each local church fellowship shares responsibility for the whole world, as well as its own locality, and all believers should be concerned about God's worldwide purposes.",
  "Local church leadership is responsible for the nurture of believers in its care, including pastoral guidance, the identification and confirmation of God's call to individuals, and oversight of their training and equipping for service.",
];

/** Closes the role-of-the-Church article. Verbatim. */
export const MISSION_AGENCY_ROLE =
  "Mission agencies exist to serve the Church and to provide information, facilities, and expertise that would not normally be found within the resources of a local fellowship. This particularly applies to specialised ministries and oversight of work in distant areas.";

/** The five core values, verbatim. Surfaced at /about/what-we-believe#core-values. */
export const CORE_VALUES: { title: string; body: string }[] = [
  {
    title: "Dependence on God",
    body: "We depend on God for everything needed to complete the otherwise impossible task of worldwide Bible translation.",
  },
  { title: "Christ-centred", body: "We aspire to be like Christ in all aspects of our lives." },
  {
    title: "Centrality of the Church in God's mission",
    body: "The church is central to our work through the sending of missionaries and the use of the translated Bible. God himself is the one who calls the church.",
  },
  {
    title: "Service through partnerships",
    body: "Collaborative partnerships, working closely with individuals, churches, and organisations.",
  },
  {
    title: "Holistic approach to missionary care",
    body: "We care for the well-being of our members and their families.",
  },
];

/**
 * The ten board members. Names and eight portraits are on file; roles and bios are deliberately absent
 * rather than invented. Adding a `role`, `bio` or `photo` here is all that is needed — no layout change.
 * Portraits are square head-and-shoulders crops in `public/Leadership/`, at most 800px.
 *
 * Bryan is listed by first name only, without a portrait, by decision of the office. Do not add a
 * surname, photo or location for him.
 */
export const BOARD: BoardMember[] = [
  { name: "Daniel Muvengi", photo: "/Leadership/daniel-muvengi.webp" },
  { name: "Joyce Kule", photo: "/Leadership/joyce-kule.webp" },
  { name: "Edwyn Kiptinness", photo: "/Leadership/edwyn-kiptinness.webp" },
  { name: "Joseph Namutala" },
  { name: "George Mwita", photo: "/Leadership/george-mwita.webp" },
  { name: "Bryan", photoWithheld: true },
  { name: "Mary Wamey", photo: "/Leadership/mary-wamey.webp" },
  { name: "Onesmas Muchesia", photo: "/Leadership/onesmas-muchesia.webp" },
  { name: "Mark Mwanzia", photo: "/Leadership/mark-mwanzia.webp" },
  { name: "Jerry Faruk", photo: "/Leadership/jerry-faruk.webp" },
];

/**
 * The history rail, condensed from docs/content/history-of-wycliffe-africa.md. The source gives no year
 * for the 55-missionary target beyond "within approximately two years", so that milestone is not dated.
 */
export const HISTORY: HistoryMilestone[] = [
  {
    year: "Late 1990s",
    title: "A conversation",
    body: "Edwyn Kiptinness and John Bendor-Samuel discuss a growing need in the Bible translation movement: raising Africans as missionaries to serve Bible translation in Africa.",
    pending: false,
  },
  {
    year: "2004",
    title: "Registered in Nairobi",
    body: "Wycliffe Africa is registered in Kenya with an African mandate: to recruit, train, send and support African missionaries for Bible translation organisations across Africa.",
    pending: false,
  },
  {
    year: "Within two years",
    title: "55 missionaries raised",
    body: "The founding target is met. In time, some of that work grows into independent national organisations: Wycliffe Ethiopia, Wycliffe Togo and Wycliffe Benin.",
    pending: false,
  },
  {
    year: "Today",
    title: "31 missionaries serving",
    body: "Across Africa and beyond, in translation consultancy, Scripture engagement, language technology, programme management and administration.",
    pending: false,
  },
];

/**
 * One block of the full history narrative. `turn` marks the source's own one-sentence paragraphs,
 * which the page sets in the display face as the story's turning points.
 */
export type HistoryStoryBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "turn"; text: string }
  | { kind: "list"; intro: string; items: string[] };

/**
 * "The Story and Growth of Wycliffe Africa", verbatim from docs/content/history-of-wycliffe-africa.md.
 * Do not edit, condense or paraphrase it; change the source doc and this together.
 */
export const HISTORY_STORY: HistoryStoryBlock[] = [
  {
    kind: "paragraph",
    text: "The story of Wycliffe Africa began in the late 1990s with a conversation between Edwyn Kiptinness and John Bendor-Samuel around a growing need within the Bible translation movement: raising Africans as missionaries to participate in and support Bible translation in Africa.",
  },
  {
    kind: "paragraph",
    text: "At the time, there was an increasing desire among African communities and churches to see Africans actively involved in the work of Bible translation. This was informed by the declining number of Western Missionaries who had been at the frontline in serving in the Bible Translation movement. This created both a challenge and an opportunity - the need to intentionally raise and equip African missionaries who could serve within the Bible translation movement across the continent.",
  },
  { kind: "turn", text: "It was from this vision that Wycliffe Africa was born." },
  {
    kind: "paragraph",
    text: "Wycliffe Africa was eventually registered in 2004 in Nairobi, Kenya, with an intentional African mandate: to recruit, train, send and support African missionaries who would serve Bible translation organizations across Africa, particularly within the Wycliffe Global Alliance Africa Area and SIL Africa Area.",
  },
  {
    kind: "paragraph",
    text: "From the beginning, the vision was ambitious. Wycliffe Africa set out to raise at least 55 missionaries within approximately two years. By God's grace, that target was achieved.",
  },
  {
    kind: "paragraph",
    text: "As the movement continued to grow, some of the missionaries and structures that had initially been part of Wycliffe Africa developed into independent national entities. This included the establishment of Wycliffe Ethiopia, Wycliffe Togo and Wycliffe Benin. Consequently, the number of missionaries directly under Wycliffe Africa reduced for a season, but the vision did not diminish. Instead, the work continued to grow and evolve.",
  },
  {
    kind: "paragraph",
    text: "Today, Wycliffe Africa has 31 missionaries serving across various African countries, including Madagascar, South Africa, South Sudan, Kenya, Nigeria, Uganda, The Gambia, Cameroon, Ghana, Tunisia, Tanzania and Eurasia with the number continuing to grow.",
  },
  {
    kind: "list",
    intro:
      "Our missionaries serve in a variety of critical areas that strengthen Bible translation movements across the continent. Their roles include:",
    items: [
      "Bible translation consultancy",
      "Human resources and senior administration",
      "Scripture engagement",
      "Language technologies",
      "Language programme management",
    ],
  },
  {
    kind: "paragraph",
    text: "As Bible translation continues to embrace new technologies, the opportunities and needs are also changing. Technology is enabling translation teams to draft Scripture more quickly and efficiently. However, faster translation also creates an increasing need for skilled Bible translation consultants and other specialists who can help ensure that translated Scripture is accurate, clear, natural and meaningful to the communities receiving it.",
  },
  { kind: "turn", text: "Wycliffe Africa therefore looks to the future with faith and expectation." },
  {
    kind: "paragraph",
    text: "The vision that began with a conversation between two African leaders continues today: to see more Africans raised, equipped and sent to serve the Bible translation movement.",
  },
  {
    kind: "paragraph",
    text: "Our desire is to see a growing number of African missionaries serving wherever they are needed, across Africa and beyond, providing the skills, leadership and spiritual commitment required for Bible translation to flourish.",
  },
  {
    kind: "paragraph",
    text: "We believe the future of Bible translation in Africa requires African participation at every level. And as God continues to call and equip people, Wycliffe Africa is committed to raising more missionaries for the work, so that more communities can have access to God's Word in languages they understand.",
  },
];
