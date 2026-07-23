import * as React from "react";
import { ChevronRight } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { PageIntro, StickySideNav } from "@/components/organisms";
import { PhotoPlaceholder } from "@/components/molecules/PhotoPlaceholder";
import { Button } from "@/components/atoms/Button";

const SIDE_NAV = [
  { label: "Serve Part-time", href: "/involved" },
  { label: "Serve", href: "/involved" },
  { label: "Give", href: "/give" },
  { label: "Motivate your Church", href: "/involved/motivate-your-church" },
  { label: "Pray with Us", href: "/involved" },
];

const WEB_LINKS = ["www.calebproject.org", "www.acmcnetwork.com", "www.wycliffe.org.uk/getinvolved.html"];

const COMMITTEE_TASKS = [
  "Encourage the members of an existing small group to spend time in prayer regularly for a specific project. Stay current on news of the project and get to know the people involved with it.",
  "Work with your church leadership to “adopt” a project or country as the main focus for your church.",
  "Organize a large group prayer meeting at your church to spend a day in collective prayer. Show videos and educate the congregation about the value of the project.",
  "Try to include prayer for Bible translation in Africa as part of your Sunday church service.",
  "Coordinate a Bible study around the topic of missions or Bible translation.",
];

export const metadata = {
  title: "Motivate Your Church | Wycliffe Africa",
};

export default function MotivateYourChurchPage() {
  return (
    <PageTemplate>
      <PageIntro journey="churches" eyebrowLabel="Get Involved" title="Motivate your church" />

      <section className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 gap-10 px-5 pb-20 sm:px-12 lg:grid-cols-[260px_1fr]">
        <StickySideNav items={SIDE_NAV} activeHref="/involved/motivate-your-church" className="hidden lg:flex" />

        <div>
          <PhotoPlaceholder caption="Praying together" aspect="16/9" />

          <p className="mt-6 font-body text-base leading-relaxed text-muted">
            Do you sometimes feel like a lonely voice trying to expand awareness in your church about people
            without access to the Bible? Do you need help motivating your church to care about the millions of
            people in the world who have no way to hear about Jesus? Do you want to keep your own vision alive?
            Here are a few resources to help:
          </p>

          <h3 className="mb-3 mt-8 font-display text-xl font-semibold text-green-700">
            Organize a &ldquo;No Bible Sunday&rdquo;
          </h3>
          <p className="mb-4 font-body text-base leading-relaxed text-muted">
            This guides you through the process of setting up a Sunday at your church where the Bible cannot be
            used. A Sunday without the Bible helps people feel what they normally take for granted — and notice
            those who live without it every week.
          </p>

          <h3 className="mb-3 mt-8 font-display text-xl font-semibold text-green-700">Look on the Web</h3>
          <p className="mb-4 font-body text-base leading-relaxed text-muted">
            These sites from around the world are geared to motivate and equip churches for missions. There are
            many good ideas that can be adapted to your church as well.
          </p>
          <div className="mb-2 flex flex-col gap-2.5">
            {WEB_LINKS.map((link) => (
              <span key={link} className="flex items-center gap-2.5 font-ui text-base text-link">
                <ChevronRight size={15} className="text-green-500" /> {link}
              </span>
            ))}
          </div>

          <h3 className="mb-3 mt-8 font-display text-xl font-semibold text-green-700">Form a Missions Committee</h3>
          <p className="mb-4 font-body text-base leading-relaxed text-muted">
            If you can find a few like-minded people, form a committee to lead your church&apos;s missions effort.
            A committee keeps missions in front of the congregation, looks after the missionaries the church sends
            out, and gets far more done than one person can alone:
          </p>
          <div className="flex flex-col gap-3.5">
            {COMMITTEE_TASKS.map((task) => (
              <div key={task} className="flex items-start gap-3">
                <ChevronRight size={18} className="mt-0.5 flex-none text-green-500" />
                <span className="font-body text-base leading-relaxed text-body">{task}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-3 border-t border-hair pt-6">
            <Button href="/give" variant="accent">
              Give today
            </Button>
            <Button href="/involved" variant="secondary">
              More ways to serve
            </Button>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
}
