import * as React from "react";
import {
  HandHeart,
  UserPlus,
  Clock,
  Compass,
  HeartHandshake,
  Church,
  Megaphone,
  Gift,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { PageIntro, DonationCTA } from "@/components/organisms";
import { Button } from "@/components/atoms/Button";

const WAYS: { icon: LucideIcon; title: string; body: string; href: string }[] = [
  {
    icon: HandHeart,
    title: "Pray",
    body: "Join the prayer network and pray for translators and their communities by name.",
    href: "/involved",
  },
  {
    icon: UserPlus,
    title: "Become a Member",
    body: "Make Wycliffe Africa your sending organisation and serve long-term.",
    href: "/involved",
  },
  {
    icon: Clock,
    title: "Serve Part-Time",
    body: "Give your time and expertise from where you are, on your schedule.",
    href: "/involved",
  },
  {
    icon: Compass,
    title: "Serve",
    body: "Join a mission assignment in the field — from a season to a career.",
    href: "/involved",
  },
  {
    icon: HeartHandshake,
    title: "Support a Missionary",
    body: "Commit to one field worker with monthly giving and prayer.",
    href: "/missionaries",
  },
  {
    icon: Church,
    title: "Church Partnership",
    body: "Mobilise your congregation to adopt a language community.",
    href: "/involved/partnership",
  },
  {
    icon: Megaphone,
    title: "Motivate your Church",
    body: "Inspire your church to care for the Bibleless — with ready-made resources.",
    href: "/involved/motivate-your-church",
  },
  {
    icon: Gift,
    title: "Give",
    body: "Fund the work itself — once, or month by month.",
    href: "/give",
  },
];

export const metadata = {
  title: "Get Involved | Wycliffe Africa",
};

export default function InvolvedPage() {
  return (
    <PageTemplate>
      <PageIntro
        journey="serve"
        eyebrowLabel="Get Involved"
        title="There's a place for you in Bible translation."
        subtitle="Some people move to the field. Most serve from where they are — praying, giving, or bringing their church along."
      />

      <section className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 gap-6 px-5 pb-20 pt-4 sm:grid-cols-2 sm:px-12 lg:grid-cols-3">
        {WAYS.map(({ icon: WayIcon, title, body, href }) => (
          <div key={title} className="flex flex-col rounded-lg border border-hair bg-card p-6 shadow-sm">
            <span className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-green-100 text-green-700">
              <WayIcon size={24} />
            </span>
            <h3 className="mb-2 mt-4 font-display text-lg font-semibold text-strong">{title}</h3>
            <p className="mb-5 flex-1 font-body text-base leading-relaxed text-muted">{body}</p>
            <Button
              href={href}
              variant={title === "Give" ? "accent" : "secondary"}
              size="sm"
              iconRight={<ArrowRight size={15} />}
              className="w-fit"
            >
              {title === "Give" ? "Give now" : "Learn more"}
            </Button>
          </div>
        ))}
      </section>

      <DonationCTA />
    </PageTemplate>
  );
}
