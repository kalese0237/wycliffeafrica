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
}

const defaultStats: ImpactStat[] = [
  { value: "1,800+", label: "Languages in Africa" },
  { value: "734", label: "Active projects" },
  { value: "40", label: "Countries" },
  { value: "3.2M", label: "People reached" },
];

/** A band of impact figures on sunk paper, separated by hairline rules. */
export function ImpactStats({ heading, stats = defaultStats, tone = "primary" }: ImpactStatsProps) {
  return (
    <section className="bg-sunk">
      <div className="mx-auto max-w-[var(--container-max)] px-5 py-16 sm:px-12">
        {heading && (
          <>
            <Divider variant="accent" width={56} className="mx-auto mb-4" />
            <h2 className="mb-12 text-center font-display text-2xl font-semibold text-strong">{heading}</h2>
          </>
        )}
        <div className="grid items-center gap-6" style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}>
          {stats.map((s, i) => (
            <div key={i} className={i === 0 ? undefined : "border-l border-hair"}>
              <StatItem value={s.value} label={s.label} sub={s.sub} tone={tone} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
