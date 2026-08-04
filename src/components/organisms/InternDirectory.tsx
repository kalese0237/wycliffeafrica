"use client";

import * as React from "react";
import { InternCard } from "@/components/molecules/InternCard";
import { cn } from "@/lib/cn";
import type { InternRecord } from "@/lib/directus/schema";

export interface InternDirectoryProps {
  interns: InternRecord[];
}

/** The country is the segment after the last comma of `place` ("Nairobi, Kenya" → "Kenya"). */
function countryOf(i: InternRecord): string {
  const parts = i.place.split(",");
  return parts[parts.length - 1].trim();
}

/** Filterable intern grid — country chips above the card grid. */
export function InternDirectory({ interns }: InternDirectoryProps) {
  const countries = React.useMemo(
    () => Array.from(new Set(interns.map(countryOf))).sort(),
    [interns],
  );
  const [active, setActive] = React.useState<string | null>(null);
  const visible = active ? interns.filter((i) => countryOf(i) === active) : interns;

  return (
    <div>
      <div className="mb-8 rounded-lg border border-hair bg-sunk px-4 py-4 sm:px-5">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="font-display text-md font-semibold text-strong">Meet our interns</h2>
          <span aria-live="polite" className="font-ui text-sm text-faint">
            {visible.length} {visible.length === 1 ? "profile" : "profiles"}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2" aria-label="Filter interns by country">
          {[null, ...countries].map((country) => (
            <button
              key={country ?? "all"}
              type="button"
              aria-pressed={active === country}
              onClick={() => setActive(country)}
              className={cn(
                "cursor-pointer rounded-md border px-4 py-1.5 font-ui text-sm font-semibold transition-colors duration-130",
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
        {visible.map((i) => (
          <InternCard key={i.id} intern={i} />
        ))}
      </div>
    </div>
  );
}
