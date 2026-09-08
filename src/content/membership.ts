/**
 * "Become a Member" content — the route onto the Wycliffe Africa team, as supplied by Wycliffe
 * Africa.
 *
 * Every qualification, condition and stage below comes from the supplied text; the wording here is
 * ours, the substance is theirs. Nothing about timelines, fees, quotas or interview stages was
 * supplied, so nothing of the sort is stated. Where the source only named a step ("Complete the
 * application process") the entry says what the reader can actually do next and sends them to the
 * office rather than inventing the procedure.
 */

export interface MembershipStep {
  /** Anchor id — the contents rail links to it. */
  id: string;
  title: string;
  /** Short gloss set opposite the step title. */
  rubric: string;
  body: string[];
  /** Optional ruled sub-series, e.g. the qualifications list. */
  listTitle?: string;
  list?: string[];
  link?: { label: string; href: string };
}

export const MEMBERSHIP_STEPS: MembershipStep[] = [
  {
    id: "qualified",
    title: "Get qualified",
    rubric: "Character first, then training",
    body: [
      "The most important qualification for anyone in ministry is a personal knowledge of Jesus as Saviour and Lord, and a settled commitment to serving him as the primary focus of your life. Everything below assumes that and builds on it.",
    ],
    listTitle: "Other qualifications include",
    list: [
      "Active membership of a local church, with a real part in its ministries — evangelism, discipleship, whatever your church is actually doing.",
      "Practical experience of witnessing, whether through your home church or a university Christian fellowship.",
      "A conviction that God has called you into full-time Christian ministry, and a sending church that recognises the same call.",
      "A university first degree, or an equivalent professional training and qualification — accountancy, for instance.",
      "Further study if you are heading for language work. Where to get training lists the SIL partner schools in Africa that offer it.",
    ],
    link: { label: "Where to get training", href: "/resources/training" },
  },
  {
    id: "apply",
    title: "Complete the application process",
    rubric: "Start with the questionnaire",
    body: [
      "The preliminary questionnaire comes first. It is short, and it tells us who you are, what you have trained in, and what you think you are being called to.",
      "The office reads every one and writes back. The full application, and the requirements particular to the role you are asking about, come from us at that point — so you are never filling in forms for a position that was never the right fit.",
    ],
    link: { label: "Preliminary questionnaire", href: "/questionnaire" },
  },
  {
    id: "prayer",
    title: "Find prayer support",
    rubric: "Before anything else is in place",
    body: [
      "Bible translation is spiritual work, and there is sure to be spiritual opposition to it. Anyone going into this needs regular, earnest prayer around them — not goodwill, but people who actually pray.",
    ],
    listTitle: "That can be built in several ways",
    list: [
      "Your church commits to praying for you as a congregation.",
      "A group of friends meets weekly or monthly to intercede on your behalf.",
      "Twenty, forty, sixty, eighty, a hundred personal friends each promise to pray for you regularly on their own.",
    ],
    link: { label: "How to pray with us", href: "/prayer" },
  },
  {
    id: "church",
    title: "Enlist your church to help",
    rubric: "If people are to go, they need to be sent",
    body: [
      "Every member of a Bible translation team is commissioned for the work by their church. In practice that means your church recognising that God is calling you into this service, committing itself to regular prayer for you, accepting responsibility for your long-term pastoral care, and making some contribution to your financial support.",
      "So tell your pastor, your church leaders and your Christian friends what you believe God wants you to do. Ask for their counsel and their prayer. If it would help, we will speak with your church leadership ourselves and work with them through the application.",
    ],
    link: { label: "Church partnership", href: "/involved/partnership" },
  },
  {
    id: "support",
    title: "Raise financial support",
    rubric: "A team of sponsors, not a salary",
    body: [
      "Wycliffe Africa missionaries are not salaried. Each one goes to the field on gifts committed by a team of people who have decided this work is worth funding, month after month, for as long as it takes.",
      "That sounds daunting until you have seen it happen. It is also, for many missionaries, where the deepest partnerships of their working life begin.",
    ],
    link: { label: "More about support", href: "/give" },
  },
  {
    id: "final-steps",
    title: "Take the final steps",
    rubric: "Orientation, then an assignment",
    body: [
      "You will take an initial orientation. It carries enough introductory training for you to serve two to six months as an intern in your chosen area of ministry.",
      "After that you receive an assignment to a particular country and a particular ministry. You complete whatever preparations remain, your church commissions you, and you go.",
    ],
    link: { label: "Meet our interns", href: "/interns" },
  },
  {
    id: "beginning",
    title: "And this is not the end of the road",
    rubric: "It is the beginning of one",
    body: [
      "Training continues once you are working. There are on-the-job seminars and workshops, and in some cases the opportunity of advanced study at university.",
      "Those who show outstanding ability over the course of their work are invited to train further and serve as consultants. Sooner or later the point of all of it is the same: to use what you have learned to multiply the work by investing it in other people.",
    ],
  },
];
