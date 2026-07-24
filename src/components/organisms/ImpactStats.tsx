import * as React from "react";
import { StatItem, type StatTone } from "@/components/molecules/StatItem";
import { Divider } from "@/components/atoms/Divider";

export interface ImpactStat {
  value: React.ReactNode;
  label: string;
  sub?: string;
}

export interface ImpactStatsProps {
  heading?: string;
  stats?: ImpactStat[];
  tone?: StatTone;
  /** Floats the stats as a shadowed card pulled up over the section above it (e.g. a photo hero). */
  overlap?: boolean;
}

const defaultStats: ImpactStat[] = [
  { value: "1,800+", label: "Languages in Africa" },
  { value: "734", label: "Active projects" },
  { value: "40", label: "Countries" },
  { value: "3.2M", label: "People reached" },
];

/** A band of impact figures on sunk paper, separated by hairline rules. */
export function ImpactStats({ heading, stats = defaultStats, tone = "primary", overlap = false }: ImpactStatsProps) {
  const grid = (
    <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr">
      {stats.map((s, i) => (
        <div
          key={`${s.label}-${i}`}
          className={i === 0 ? undefined : "border-t border-hair pt-6 sm:border-t-0 sm:pt-0 lg:border-l"}
        >
          <StatItem value={s.value} label={s.label} sub={s.sub} tone={tone} />
        </div>
      ))}
    </div>
  );

  if (overlap) {
    return (
      <div className="relative z-10 mx-auto -mt-16 max-w-(--container-max) px-5 sm:px-12">
        <div className="rounded-2xl border border-hair bg-card px-6 py-9 shadow-lg sm:px-10">{grid}</div>
      </div>
    );
  }

  return (
    <section className="bg-sunk">
      <div className="mx-auto max-w-(--container-max) px-5 py-16 sm:px-12">
        {heading && (
          <>
            <Divider variant="accent" width={56} className="mx-auto mb-4" />
            <h2 className="mb-12 text-center font-display text-2xl font-semibold text-strong">{heading}</h2>
          </>
        )}
        {grid}
      </div>
    </section>
  );
}
