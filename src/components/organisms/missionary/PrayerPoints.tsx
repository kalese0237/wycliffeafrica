import * as React from "react";
import { ROMAN } from "@/components/organisms/about/roman";
import type { PublicPrayerRequestRecord } from "@/lib/directus/schema";

export interface PrayerPointsProps {
  /** The missionary's given name, for the section head. */
  firstName: string;
  requests: PublicPrayerRequestRecord[];
}

/**
 * The prayer points — the part of a prayer card that is actually used.
 *
 * Deliberately not the three-card grid this page used to ship: a supporter prays down this list in
 * order, one item at a time, and a grid of equal tiles has no order to pray down. Hanging numerals
 * in their own column, one hairline between entries, the date as a folio at the right. Nothing here
 * is a discrete object, so nothing here is carded, filled, or elevated.
 */
export function PrayerPoints({ firstName, requests }: PrayerPointsProps) {
  if (requests.length === 0) return null;

  return (
    <section className="mx-auto max-w-(--container-max) px-5 pt-16 sm:px-12 sm:pt-20">
      <div className="flex flex-col gap-3 pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
        <h2 className="font-display text-2xl font-normal leading-tight text-strong sm:text-[48px]">
          Pray with {firstName}
        </h2>
        <p className="flex-none font-display text-base italic text-muted sm:text-md">
          {requests.length === 1 ? "One request from the field" : `${requests.length} requests from the field`}
        </p>
      </div>
      {/* The division rule is its own element so the scroll-driven draw clips the rule alone; a clip
          on the header would take the heading with it. Ships fully drawn where the timeline can't run. */}
      <div aria-hidden className="rule-draw h-0.5 bg-terra-900" />

      <ol>
        {requests.map((request, index) => (
          <li
            key={request.id}
            className="grid grid-cols-[28px_1fr] gap-x-4 border-b border-hair py-6 sm:grid-cols-[70px_1fr] sm:gap-x-0"
          >
            <span
              aria-hidden
              className="pt-1 font-display text-sm font-semibold tracking-wide text-primary sm:text-base"
            >
              {ROMAN[index] ?? index + 1}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-display text-lg font-normal leading-snug text-strong sm:text-xl">
                  {request.title}
                </h3>
                <span className="flex-none font-ui text-xs font-semibold uppercase tracking-caps text-faint">
                  {request.date}
                </span>
              </div>
              <p className="mt-2.5 max-w-[66ch] font-body text-base leading-relaxed text-body sm:text-md">
                {request.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
