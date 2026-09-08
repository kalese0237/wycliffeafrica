import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { AboutPhotoHero, AboutCTA } from "@/components/organisms/about";
import { MembershipSteps } from "@/components/organisms/involved";
import { MEMBERSHIP_STEPS } from "@/content/membership";

export const metadata = {
  title: "Become a Member | Wycliffe Africa",
  description:
    "How to join Wycliffe Africa: the qualifications, the application, prayer and financial support, church commissioning, orientation and assignment — the seven steps to membership.",
};

export default function BecomeAMemberPage() {
  return (
    <PageTemplate>
      <AboutPhotoHero
        title="Become a"
        titleAccent="member"
        standfirst="Are you committed to seeing God's Word translated and used? This is what joining Wycliffe Africa asks of you, and what we take responsibility for in return."
        image="/photos/pexels-mbaraga-bernard-2158456013-35388499.jpg"
        imageAlt="Two men worshipping with hands raised in a church service"
        focalPoint="50% 40%"
      />

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-10 px-5 pt-16 sm:px-12 sm:pt-20 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
        <div>
          <h2 className="font-display text-2xl font-normal leading-snug text-strong">
            You do not have to be certain to <em className="italic text-primary-active">begin</em>.
          </h2>
        </div>
        <div>
          <p className="mb-4.5 font-body text-md leading-relaxed text-body sm:text-[18.5px]">
            If you want to join Wycliffe Africa, or you only want to find out more about it, start by
            filling in the preliminary questionnaire and emailing it to us. It costs you nothing and it
            commits you to nothing.
          </p>
          <p className="font-body text-md leading-relaxed text-body sm:text-[18.5px]">
            The seven steps below are the general route onto the team. They are guidelines rather than a
            checklist: the particular job you are asking about may carry requirements of its own, and we
            will tell you what those are.
          </p>
          <Link
            href="/questionnaire"
            className="group mt-8 flex items-baseline justify-between gap-6 border-t-2 border-ink-0 pt-4 transition-colors duration-150 hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-400"
          >
            <span className="font-display text-lg font-normal leading-snug text-strong group-hover:text-primary">
              Fill in the preliminary questionnaire
            </span>
            <span className="flex flex-none items-center gap-2 font-ui text-xs font-bold uppercase tracking-caps text-primary">
              Start
              <ArrowRight size={14} className="transition-transform duration-150 ease-out group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      <MembershipSteps
        steps={MEMBERSHIP_STEPS}
        standfirst="Seven steps, in the order they usually happen. Most people are somewhere inside step one or two when they first write to us, and that is exactly the right time to make contact."
        figure={{
          stepId: "prayer",
          src: "/photos/pexels-kureng-workx-2546437-7878646.jpg",
          alt: "A pastor praying with his eyes closed and hands raised",
          caption:
            "Nobody goes to the field on their own strength. The prayer team is built before the support team, and it outlasts it.",
          focalPoint: "50% 40%",
        }}
      />

      <AboutCTA
        title="Tell us where you have got to."
        body="The preliminary questionnaire is short and the office reads every one. If you would rather see what the team is short of first, the staff positions list is the place to look."
        primary={{ label: "Preliminary questionnaire", href: "/questionnaire" }}
        secondary={{ label: "Staff positions needed", href: "/resources" }}
        flat
      />
    </PageTemplate>
  );
}
