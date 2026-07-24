import * as React from "react";
import { Globe2, HandHeart, Users } from "lucide-react";
import { Divider } from "@/components/atoms/Divider";

export interface MissionariesHeroProps {
  missionaryCount: number;
  countryCount: number;
}

/** Page hero for /missionaries: title, framing copy, and serving stats in one band. */
export function MissionariesHero({ missionaryCount, countryCount }: MissionariesHeroProps) {
  return (
    <section className="mx-auto max-w-(--container-max) px-5 pb-10 pt-14 text-center sm:px-12 sm:pt-16">
      <div className="mx-auto max-w-[760px]">
        <Divider variant="accent" width={56} className="mx-auto mb-5" />
        <p className="mb-2 font-ui text-xs font-bold uppercase tracking-caps text-green-700">
          The people behind the work
        </p>
        <h1 className="mb-4 font-display text-2xl font-semibold leading-tight text-strong sm:text-3xl">
          Our Missionaries
        </h1>
        <p className="mx-auto max-w-[65ch] font-body text-base leading-relaxed text-muted sm:text-md">
          Every translation project is carried by people — translators, literacy teachers, surveyors,
          administrators. None of them draw a salary; each serves on the prayers and monthly gifts of their
          supporters.
        </p>
        <div className="mt-9 grid overflow-hidden rounded-lg border border-hair bg-sunk text-left sm:grid-cols-3">
          <div className="flex items-center gap-3 border-b border-hair px-5 py-4 font-ui text-sm font-semibold text-body sm:border-b-0 sm:border-r">
            <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-card text-primary shadow-sm">
              <Users size={17} />
            </span>
            <span><strong className="block text-base text-strong">{missionaryCount}</strong> serving missionaries</span>
          </div>
          <div className="flex items-center gap-3 border-b border-hair px-5 py-4 font-ui text-sm font-semibold text-body sm:border-b-0 sm:border-r">
            <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-card text-primary shadow-sm">
              <Globe2 size={17} />
            </span>
            <span><strong className="block text-base text-strong">{countryCount}</strong> countries across Africa</span>
          </div>
          <div className="flex items-center gap-3 px-5 py-4 font-ui text-sm font-semibold text-body">
            <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-card text-primary shadow-sm">
              <HandHeart size={17} />
            </span>
            <span><strong className="block text-base text-strong">100%</strong> partner supported</span>
          </div>
        </div>
      </div>
    </section>
  );
}
