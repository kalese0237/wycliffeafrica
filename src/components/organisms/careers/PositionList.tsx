import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PublicStaffPositionRecord } from "@/lib/directus/schema";
import { positionAnchors, positionEnquiryHref, requirementLines } from "@/lib/staff-positions";

export interface PositionListProps {
  positions: PublicStaffPositionRecord[];
  /** Sits above the list: what these positions are and how they are filled. */
  standfirst: string;
  /** Where a reader goes when nothing listed fits, or nothing is listed at all. */
  fallback: { label: string; href: string };
}

const arrowLink =
  "group inline-flex w-fit items-center gap-2 font-ui text-xs font-bold uppercase tracking-caps text-primary transition-colors duration-150 hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-focus-ring)";

function positionCountLabel(count: number) {
  return count === 1 ? "1 open" : `${count} open`;
}

/**
 * The open positions, set as ruled entries on the About family's document grid rather than as job
 * cards: a hanging numeral, the title in Fraunces, a folio line of area · location · commitment, the
 * summary, and what the person needs to bring. Each entry carries its own fragment id so one role can
 * be shared on its own, and closes on a link into the contact form with the role already named.
 *
 * The empty state is designed, not apologetic. Positions open and close, and a reader who arrives
 * between them still has a next step, the same one the Serve page gives.
 */
export function PositionList({ positions, standfirst, fallback }: PositionListProps) {
  const anchors = positionAnchors(positions);

  return (
    <section className="mx-auto max-w-(--container-max) px-5 py-16 sm:px-12 sm:py-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[210px_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-ui text-xs font-semibold uppercase tracking-caps text-primary-active">
            Open positions
          </h2>
        </div>

        <div>
          <p className="max-w-[62ch] font-body text-md leading-relaxed text-body sm:text-lg">{standfirst}</p>

          <div className="mt-12 flex items-baseline justify-between gap-6 pb-3">
            <p className="font-display text-xl font-normal leading-snug text-strong sm:text-2xl">
              {positions.length > 0 ? "Where the team is short" : "Nothing listed right now"}
            </p>
            {positions.length > 0 && (
              <span className="flex-none font-ui text-xs font-semibold uppercase tracking-caps text-muted">
                {positionCountLabel(positions.length)}
              </span>
            )}
          </div>
          <div aria-hidden className="rule-draw h-0.5 bg-terra-900" />

          {positions.length > 0 ? (
            <ol>
              {positions.map((position, index) => {
                const folio = [position.area, position.location, position.commitment].filter(Boolean);
                const requirements = requirementLines(position.requirements);
                return (
                  <li
                    key={position.id}
                    id={anchors.get(position.id)}
                    className="reveal grid scroll-mt-28 grid-cols-[28px_1fr] gap-x-4 border-b border-hair py-8 sm:grid-cols-[52px_1fr]"
                  >
                    <span aria-hidden className="pt-1.5 font-display text-sm text-primary">
                      {index + 1}
                    </span>
                    <div className="max-w-[62ch]">
                      <h3 className="font-display text-lg font-normal leading-snug text-strong sm:text-xl">
                        {position.title}
                      </h3>
                      {folio.length > 0 && (
                        <p className="mt-2 font-ui text-xs font-semibold uppercase tracking-caps text-muted">
                          {folio.join(" · ")}
                        </p>
                      )}
                      <p className="mt-4 whitespace-pre-line font-body text-base leading-relaxed text-body sm:text-md">
                        {position.summary}
                      </p>
                      {requirements.length > 0 && (
                        <>
                          <h4 className="mt-6 font-ui text-xs font-semibold uppercase tracking-caps text-primary-active">
                            What you would bring
                          </h4>
                          <ul className="mt-3 border-t border-hair">
                            {requirements.map((line) => (
                              <li
                                key={line}
                                className="border-b border-hair py-2.5 font-body text-base leading-relaxed text-body"
                              >
                                {line}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      <Link href={positionEnquiryHref(position.title)} className={`${arrowLink} mt-6`}>
                        Ask about this position
                        <span className="sr-only">: {position.title}</span>
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-150 ease-out group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="reveal max-w-[62ch] py-8">
              <p className="font-body text-base leading-relaxed text-body sm:text-md">
                Positions open and close as the work needs them, and this list is updated when they do. A
                skill that fits no listed position can still fit the work. Tell us what yours is and we
                will look for where it counts.
              </p>
              <Link href={fallback.href} className={`${arrowLink} mt-6`}>
                {fallback.label}
                <ArrowRight
                  size={14}
                  className="transition-transform duration-150 ease-out group-hover:translate-x-1"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
