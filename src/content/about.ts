/**
 * About Us family content.
 *
 * The doctrinal statement, the Wycliffe Africa beliefs, the role-of-the-Church list and the core
 * values are **verbatim** text supplied by Wycliffe Africa. Do not edit, condense or paraphrase them
 * — design serves the words. See `.impeccable/surfaces/src-app-about.md`.
 *
 * Board roles, biographies, portraits, the founding year, the founders and every history milestone
 * are NOT on file. They render as visibly marked placeholders rather than as invented fact.
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
 * The ten board members. Names are the only board fact currently on file; roles, bios and portraits
 * are deliberately absent rather than invented. Adding a `role`, `bio` or `photo` here is all that is
 * needed — no layout change.
 */
export const BOARD: BoardMember[] = [
  { name: "Daniel Muvengi" },
  { name: "Joyce Kule" },
  { name: "Edwyn Kiptinness" },
  { name: "Joseph Namutala" },
  { name: "George Mwita" },
  { name: "Bryan Harrison" },
  { name: "Mary Wamey" },
  { name: "Onesmas Muchesia" },
  { name: "Mark Mwanzia" },
  { name: "Jerry Faruk" },
];

/**
 * The history rail. Every dated milestone is pending confirmation — the team photograph in
 * `public/Missionaries/` carries a "20th Anniversary" backdrop, but that year has not been confirmed
 * by Wycliffe Africa, so nothing here asserts it.
 */
export const HISTORY: HistoryMilestone[] = [
  {
    year: "Year to be confirmed",
    title: "Founding",
    body: "The founders and the founding year are awaiting confirmation from Wycliffe Africa.",
    pending: true,
  },
  {
    year: "Year to be confirmed",
    title: "The first missionaries sent",
    body: "Milestone to be supplied.",
    pending: true,
  },
  {
    year: "Year to be confirmed",
    title: "SunRise Africa Centre opens",
    body: "Milestone to be supplied.",
    pending: true,
  },
  {
    year: "Today",
    title: "An African-led movement",
    body: "Raising, training and sending missionaries for Bible translation across the continent.",
    pending: false,
  },
];

/** Initials for the monogram tile that stands in for a missing portrait. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}
