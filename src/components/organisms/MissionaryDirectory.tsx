"use client";

import * as React from "react";
import { MissionaryCard } from "@/components/molecules/MissionaryCard";
import { cn } from "@/lib/cn";
import type { MissionaryRecord } from "@/lib/directus/schema";

export interface MissionaryDirectoryProps {
  missionaries: MissionaryRecord[];
}

/** The country is the segment after the last comma of `place` ("Turkana, Kenya" → "Kenya"). */
function countryOf(m: MissionaryRecord): string {
  const parts = m.place.split(",");
  return parts[parts.length - 1].trim();
}

/** Filterable missionary grid — country chips above the card grid. */
export function MissionaryDirectory({ missionaries }: MissionaryDirectoryProps) {
  const countries = React.useMemo(
    () => Array.from(new Set(missionaries.map(countryOf))).sort(),
    [missionaries],
  );
  const [active, setActive] = React.useState<string | null>(null);
  const visible = active ? missionaries.filter((m) => countryOf(m) === active) : missionaries;

  return (
    <div>
      <div className="mb-8 rounded-lg border border-hair bg-sunk px-4 py-4 sm:px-5">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="font-display text-md font-semibold text-strong">Meet our missionaries</h2>
          <span aria-live="polite" className="font-ui text-sm text-faint">
            {visible.length} {visible.length === 1 ? "profile" : "profiles"}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2" aria-label="Filter missionaries by country">
          {[null, ...countries].map((country) => (
            <button
              key={country ?? "all"}
              type="button"
              aria-pressed={active === country}
              onClick={() => setActive(country)}
              className={cn(
                "cursor-pointer rounded-pill border px-4 py-1.5 font-ui text-sm font-semibold transition-colors duration-[130ms]",
                active === country
                  ? "border-primary bg-primary text-on-primary"
                  : "border-hair bg-card text-muted hover:border-primary-border hover:text-strong",
              )}
            >
              {country ?? "All countries"}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((m) => (
          <MissionaryCard key={m.id} missionary={m} />
        ))}
      </div>
    </div>
  );
}
