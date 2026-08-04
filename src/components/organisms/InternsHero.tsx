import * as React from "react";
import { Globe2, GraduationCap, Users } from "lucide-react";
import { Divider } from "@/components/atoms/Divider";

export interface InternsHeroProps {
  internCount: number;
  countryCount: number;
}

/** Page hero for /interns: title, framing copy, and program stats in one band. */
export function InternsHero({ internCount, countryCount }: InternsHeroProps) {
  return (
    <section className="mx-auto max-w-(--container-max) px-5 pb-10 pt-14 text-center sm:px-12 sm:pt-16">
      <div className="mx-auto max-w-[760px]">
        <Divider variant="accent" width={56} className="mx-auto mb-5" />
        <p className="mb-2 font-ui text-xs font-bold uppercase tracking-caps text-green-700">
          The Internship Program
        </p>
        <h1 className="mb-4 font-display text-2xl font-semibold leading-tight text-strong sm:text-3xl">
          Our Interns
        </h1>
        <p className="mx-auto max-w-[65ch] font-body text-base leading-relaxed text-body sm:text-md">
          Each intern is spending a year learning the work of Bible translation beside a missionary in the
          field, before deciding whether God is calling them into it for good. None have been commissioned
          yet; each is raising support for this training year on their own.
        </p>
        <div className="mt-9 grid overflow-hidden rounded-lg border border-hair bg-sunk text-left sm:grid-cols-3">
          <div className="flex items-center gap-3 border-b border-hair px-5 py-4 font-ui text-sm font-semibold text-body sm:border-b-0 sm:border-r">
            <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-card text-primary shadow-sm">
              <Users size={17} />
            </span>
            <span><strong className="block text-base text-strong">{internCount}</strong> interns in training</span>
          </div>
          <div className="flex items-center gap-3 border-b border-hair px-5 py-4 font-ui text-sm font-semibold text-body sm:border-b-0 sm:border-r">
            <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-card text-primary shadow-sm">
              <Globe2 size={17} />
            </span>
            <span><strong className="block text-base text-strong">{countryCount}</strong> countries across Africa</span>
          </div>
          <div className="flex items-center gap-3 px-5 py-4 font-ui text-sm font-semibold text-body">
            <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-card text-primary shadow-sm">
              <GraduationCap size={17} />
            </span>
            <span><strong className="block text-base text-strong">1 year</strong> of mentored training</span>
          </div>
        </div>
      </div>
    </section>
  );
}
