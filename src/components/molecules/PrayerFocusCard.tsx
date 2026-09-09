import * as React from "react";
import { HandHeart } from "lucide-react";
import { cn } from "@/lib/cn";

export interface PrayerFocusCardProps {
  firstName: string;
  /** Standing prayer points, already split into lines. Renders nothing when empty. */
  points: string[];
  className?: string;
}

/**
 * The missionary's standing prayer focus — set once for an ongoing calling, never time-boxed.
 * Sits directly beneath the partner ask, same card stock, because "pray" belongs next to "give"
 * and "write" as one more way to support this person right now.
 *
 * Deliberately plainer than the `PrayerPoints` organism further down the page: no numerals, no
 * per-item date. Those are field updates that rotate off after two weeks; these are standing, so
 * the ledger apparatus that says "here is what's new" would be the wrong claim to make about them.
 */
export function PrayerFocusCard({ firstName, points, className }: PrayerFocusCardProps) {
  if (points.length === 0) return null;

  return (
    <aside className={cn("w-full rounded-lg border border-hair bg-card p-6 shadow-sm", className)}>
      <span className="inline-flex w-fit items-center gap-1.5 rounded-pill bg-tag-pray-tint px-3 py-1 font-ui text-xs font-bold uppercase tracking-wide text-tag-pray">
        <HandHeart size={13} /> Ongoing prayer
      </span>
      <h3 className="mt-3 font-display text-lg font-semibold text-strong">How to pray for {firstName}</h3>
      <ul className="mt-4 flex flex-col">
        {points.map((point, i) => (
          <li
            key={i}
            className={cn(
              "py-3 font-body text-sm leading-relaxed text-body first:pt-0 last:pb-0",
              i > 0 && "border-t border-hair",
            )}
          >
            {point}
          </li>
        ))}
      </ul>
    </aside>
  );
}
