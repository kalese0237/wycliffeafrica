import * as React from "react";
import { PageTemplate } from "@/components/templates";
import { AboutMasthead, AboutCTA } from "@/components/organisms/about";
import { InvolvedWays, type InvolvedWay } from "@/components/organisms/involved";
import { HandHeart, HeartHandshake, Compass, UserPlus, Megaphone, Church, Gift } from "lucide-react";

export const metadata = {
  title: "Get Involved | Wycliffe Africa",
  description:
    "Seven ways to take part in Bible translation in Africa, from praying for one language community this week to sending a missionary from your own congregation.",
};

/**
 * Ordered by what each one asks of the reader: what anyone can start this week first, what a whole
 * congregation commits to over years last. Giving is not in this set — it asks for money rather than
 * time, and closes the section on a band of its own.
 */
const WAYS: InvolvedWay[] = [
  {
    title: "Pray",
    body: "Take one language community, or one missionary, and hold them before God by name. Current requests from the field are published as they come in.",
    href: "/prayer",
    audience: "Anyone, this week",
    cta: "Pray with us",
    icon: HandHeart,
  },
  {
    title: "Support a missionary",
    body: "Commit to one field worker: their monthly support, their prayer, and the letters that tell them somebody at home is still there.",
    href: "/missionaries",
    audience: "Individuals and families",
    cta: "Meet the missionaries",
    icon: HeartHandshake,
  },
  {
    title: "Serve",
    body: "Give your skills to a translation programme. Teachers, accountants, builders and IT people are needed as badly as linguists, from home or on the field.",
    href: "/involved/serve",
    audience: "Working professionals",
    cta: "See what is needed",
    icon: Compass,
  },
  {
    title: "Become a member",
    body: "Make Wycliffe Africa your sending organisation and go — after orientation, an internship, and a church that commissions you.",
    href: "/involved/become-a-member",
    audience: "Long-term service",
    cta: "The seven steps",
    icon: UserPlus,
  },
  {
    title: "Motivate your church",
    body: "Bring the need home to your congregation, with ideas, materials and a structure that does not depend on one enthusiast.",
    href: "/involved/motivate-your-church",
    audience: "Church members",
    cta: "Get the ideas",
    icon: Megaphone,
  },
  {
    title: "Church partnership",
    body: "Your congregation takes on a language community, a missionary, or a whole project, and stays with it for as long as the work takes.",
    href: "/involved/partnership",
    audience: "Pastors and leaders",
    cta: "How partnership works",
    icon: Church,
  },
];

/** The one way in that costs money rather than time. */
const GIVE = {
  title: "Give",
  body: "Fund the work itself, once or month by month. Translation runs on people who decided it was worth paying for.",
  href: "/give",
  cta: "Give now",
  icon: Gift,
};

export default function InvolvedPage() {
  return (
    <PageTemplate>
      <AboutMasthead
        rubric="Get Involved"
        title="There is a place for you in"
        titleAccent="Bible translation"
        standfirst="Some people move to the field. Most serve from where they already are — praying, giving, lending a profession, or bringing a whole congregation along with them."
      />

      <InvolvedWays
        ways={WAYS}
        feature={GIVE}
        standfirst="Seven ways in, ordered by what each one asks of you. Start at the top: the first costs you nothing but attention, and the work has never yet run short of people who began there."
      />

      <AboutCTA
        title="Not sure which one is yours?"
        body="Fill in the preliminary questionnaire, or simply write to us and say where you have got to. Neither commits you to anything, and both reach a person who will answer."
        primary={{ label: "Preliminary questionnaire", href: "/questionnaire" }}
        secondary={{ label: "Contact us", href: "/contact" }}
        flush
      />
    </PageTemplate>
  );
}
