/**
 * About Us family content.
 *
 * The doctrinal statement, the Wycliffe Africa beliefs, the role-of-the-Church list and the core
 * values are **verbatim** text supplied by Wycliffe Africa. Do not edit, condense or paraphrase them
 * — design serves the words. See `.impeccable/surfaces/src-app-about.md`.
 *
 * Board profiles come from docs/content/board-profiles.md. The founding year, the founders and every
 * history milestone are NOT on file; they render as visibly marked placeholders rather than as
 * invented fact.
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
  /** Given and family names only; initials and anchors derive from it, so no honorific here. */
  name: string;
  /** "Dr." or "Rev.", shown before the name. */
  honorific?: string;
  /** Absent until confirmed — the card falls back to "Role to be confirmed". */
  role?: string;
  country?: string;
  /** Paragraphs, verbatim from docs/content/board-profiles.md. Absent until supplied. */
  bio?: string[];
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
 * The ten board members, in the order the office supplied their profiles, followed by the two whose
 * profiles are still to come. Roles, countries and bios are verbatim from
 * docs/content/board-profiles.md, which records the few corrections made to the supplied text.
 * Portraits are square head-and-shoulders crops in `public/Leadership/`, at most 800px.
 *
 * Bryan is listed by first name only, without a portrait or country, by decision of the office. Do not
 * add a surname, photo or location for him. His bio, which names the organisation he serves with, was
 * cleared for publication on 2026-10-13.
 */
export const BOARD: BoardMember[] = [
  {
    name: "Daniel Muvengi",
    honorific: "Dr.",
    role: "Board Chair",
    country: "Kenya",
    photo: "/Leadership/daniel-muvengi.webp",
    bio: [
      "Dr. Daniel Muvengi is a seasoned international development leader with more than three decades of experience across Africa and beyond. He serves with World Vision International as a Director for Faith & Development, providing leadership at the intersection of faith, transformational development, church engagement and community empowerment. His areas of expertise include strategic leadership, faith and development, people empowerment, leadership development and partnership building. Dr. Muvengi holds a PhD in International Development from North-West University, South Africa, as well as an MBA from Assam Don Bosco University, an MA in Theology and Development from the University of Leeds, and a BA in Sociology from Egerton University. He is also a leadership coach.",
      "Dr. Muvengi is passionate about seeing the Church play a meaningful role in the transformation of communities and the development of Africa's next generation of leaders. His extensive experience working with churches, faith-based organisations, development agencies and other stakeholders gives him a broad perspective on Christian mission and organisational leadership. As Chair of the Wycliffe Africa Board, he provides strategic leadership and governance as Wycliffe Africa seeks to mobilise more people for Bible translation and strengthen its contribution to the Church and communities across Africa.",
    ],
  },
  {
    name: "Joyce Kule",
    honorific: "Dr.",
    role: "Vice-Chair",
    country: "Uganda",
    photo: "/Leadership/joyce-kule.webp",
    bio: [
      "Dr. Joyce Kule is a Christian leader, leadership developer and missions practitioner with extensive experience in equipping, empowering and mobilising leaders for Christian ministry. She serves with LIFE Ministry Uganda, where she holds senior leadership responsibilities. Her work focuses on developing people and leadership capacity, strengthening strategic partnerships, and extending Christian ministry into communities and areas where there are significant missional gaps. She has been involved with LIFE Ministry from her student years and has a long-standing passion for missions and the transformation of lives through the Word of God.",
      "Joyce is particularly passionate about helping people discover and develop their God-given potential and equipping leaders who can multiply their influence. Her leadership philosophy is centred on equipping, empowering and multiplying others, while building effective collaboration and strategic partnerships.",
    ],
  },
  {
    name: "Joseph Opanda Namutala",
    role: "Executive Director",
    country: "Kenya",
    bio: [
      "Joseph Opanda Namutala is the Executive Director of Wycliffe Africa, providing strategic leadership to advance Bible translation and missionary engagement across the continent. With nearly two decades of leadership experience in Christian ministry and nonprofit management, he has served in senior leadership roles at FOCUS Kenya and Wycliffe Africa, with experience in organisational development, resource mobilisation, financial stewardship, partnerships and leadership development.",
      "Joseph is passionate about equipping leaders, strengthening organisations and mobilising the African Church to participate in God’s mission. He has facilitated leadership and organisational capacity-building workshops for churches and ministries across Africa and is committed to mentoring and developing emerging leaders. In his role at Wycliffe Africa, he provides strategic direction as the organisation seeks to mobilise people and resources for Bible translation and strengthen its partnerships with the Church and like-minded organisations across Africa.",
      "He holds a Bachelor of Science in Physics from Jomo Kenyatta University of Agriculture and Technology and a Master of Arts in Leadership (Business and Entrepreneurship) from Pan Africa Christian University, where he graduated as the Best Master’s Student. Joseph is based in Nairobi, Kenya.",
    ],
  },
  {
    name: "Mary Wamey Wong",
    role: "Board Member",
    country: "Cameroon",
    photo: "/Leadership/mary-wamey.webp",
    bio: [
      "Mary Wong is a development and education professional with experience serving communities in Cameroon through programmes focused on education, literacy, human rights and the protection of vulnerable people. She has worked with Nascent Solutions in Cameroon in a number of roles, including as an Education Programme Manager and Project Manager. Her work has included initiatives supporting vulnerable communities, addressing child trafficking and promoting locally relevant educational resources. She has also contributed to efforts to strengthen reading and writing culture among Cameroonian children by encouraging the development of locally relevant books and learning materials.",
      "Mary is passionate about empowering communities and creating opportunities for children and families to thrive. Her experience in programme management, education, community development and working with vulnerable populations brings a valuable perspective to the Wycliffe Africa Board. As a Board member, she contributes to the organisation's wider mission of strengthening the Church's participation in Bible translation and supporting the transformation that takes place when people have access to God's Word in languages that speak meaningfully to their lives.",
    ],
  },
  {
    name: "George Mwita",
    honorific: "Dr.",
    role: "Board Member",
    country: "Tanzania",
    photo: "/Leadership/george-mwita.webp",
    bio: [
      "Dr. George Mwita is a development and humanitarian professional with extensive experience in strategic leadership, programme management and community development. He has served in senior leadership roles within the development sector, including as Country Director for Nutrition International in Tanzania and previously as Country Director for Medical Teams International Tanzania. Earlier in his career, he worked with Oxfam in Tanzania and the Democratic Republic of Congo, contributing to organisational strategy and programmes serving vulnerable communities. His professional experience spans development, humanitarian response, organisational leadership and strategic management.",
      "Dr. Mwita holds a PhD in Strategic Management from the University of Nairobi, a Master's degree in Applied Statistics and Public Policy, and a Bachelor of Science degree from Jomo Kenyatta University of Agriculture and Technology. His combination of strategic, analytical and development experience enables him to bring a strong organisational and leadership perspective to the Wycliffe Africa Board. He is committed to strengthening organisations and partnerships that contribute to sustainable transformation and the wellbeing of communities across Africa.",
    ],
  },
  {
    name: "Jerry Farouk",
    honorific: "Rev.",
    role: "Board Member",
    country: "Nigeria",
    photo: "/Leadership/jerry-faruk.webp",
    bio: [
      "Rev. Jerry Farouk is a Christian leader from Nigeria with a passion for the Church and its role in advancing God's mission. He brings to the Wycliffe Africa Board a perspective shaped by the Nigerian and West African Christian context, as well as a commitment to strengthening Christian leadership and ministry. Rev. Jerry serves with Global Partnerships as the Partnerships Facilitator, as well as the National Director at Missionary Love & Care Initiative. Rev. Farouk also serves on boards of various organizations.",
      "As a member of the Wycliffe Africa Board, Rev. Farouk contributes to the organisation's strategic leadership, governance and mission. He is passionate about seeing African churches and Christian leaders participate actively in reaching communities with the Gospel and ensuring that people can encounter Scripture in languages they understand best.",
    ],
  },
  {
    name: "Edwyn Kiptinness",
    role: "Board Member",
    country: "Kenya",
    photo: "/Leadership/edwyn-kiptinness.webp",
    bio: [
      "Mr. Edwyn Kiptinness is a Christian ministry and organisational leader with extensive experience in counselling, human resources, NGO management and leadership development. He has served in leadership roles within Christian organisations and has been involved in Bible translation and literacy ministry in Kenya and the wider region. His professional experience includes NGO management and organisational development, with particular interest in human resources and people development. He is also an experienced counsellor and presenter, with particular experience in grief counselling and supporting people through difficult life experiences. Kip, as we fondly call him, is a founding member of Bible Translation and Literacy East Africa, as well as the Founder of Wycliffe Africa, together with John Bendor-Samuel.",
      "Edwyn has a long-standing commitment to Christian mission and Bible translation. His involvement with Wycliffe has included leadership and personnel responsibilities, and he previously served as Executive Director of Wycliffe Africa. He has also served on the boards of other Christian and development organisations, bringing broad experience in governance, leadership and organisational stewardship. As a member of the Wycliffe Africa Board, he contributes institutional knowledge, pastoral care and practical leadership experience to the organisation's ongoing mission across Africa.",
    ],
  },
  {
    name: "Bryan",
    photoWithheld: true,
    bio: [
      "Bryan is a Christian leader who has been involved with Bible Translation for many years. Through this involvement, Bryan has contributed to the organisation's mission of advancing Bible translation and supporting the global Church in making God's Word accessible to people from diverse linguistic and cultural communities. Bryan holds a Master's degree in Bible Translation and Linguistics. He serves with PBT based in Africa.",
      "Bryan is passionate about Christian mission and the role of Scripture in transforming individuals, churches and communities. His engagement with PBT reflects a commitment to supporting Bible translation and the mobilisation of people and resources for this important ministry. Through his leadership and service, he brings a perspective shaped by the needs of the global Bible translation movement and the importance of strong partnerships in advancing the mission of making God's Word available to all peoples.",
    ],
  },
  { name: "Onesmas Muchesia", photo: "/Leadership/onesmas-muchesia.webp" },
  { name: "Mark Mwanzia", photo: "/Leadership/mark-mwanzia.webp" },
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
