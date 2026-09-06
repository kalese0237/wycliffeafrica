import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PartnerCallout } from "@/components/molecules/PartnerCallout";
import { cn } from "@/lib/cn";

export interface MissionaryDossierProps {
  name: string;
  bio: string[];
  /** A sentence already present in `bio`, set apart after the opening paragraph. */
  pullQuote?: string | null;
  /** Direct contact address for the partner callout's "Send a greeting" link. */
  email?: string | null;
}

/**
 * The reverse of the card: the story.
 *
 * The card turns over in the ground, not in a heading — sunk `paper-1` between hairlines, where
 * everything above and below it sits on the page's cream. That is the one physical move the thesis
 * asks for, and it costs no copy.
 *
 * The block starts on the container's own left edge, the same edge as the section heads and the
 * closing band. An earlier revision centred it in the band; at 1440px that put the prose in the
 * middle of the page sharing a left edge with nothing, which reads as an orphaned column between two
 * voids rather than as a page. DESIGN.md's shared left edge is the whole point of the document
 * grammar, and the reverse is not the place to break it.
 *
 * The portrait used to alternate with the partner card in the second column, present only for
 * missionaries without a household photograph. It now lives on the card face instead — tucked into
 * the corner of the family photograph where one exists — so the second column here is free for the
 * partner ask on every profile, not just the ones that had nowhere else to put a photo.
 *
 * The back link lives at the top of this column rather than its own row above the fold: it now
 * scrolls down with the partner card and holds there once it reaches the header, so a supporter deep
 * in a long bio still has both "leave" and "give" one glance away, not left behind at the top.
 *
 * There is deliberately no fact rail. Field and ministry are already set twice on the face — in the
 * rubric row and the roles line — and a labelled table restating them one scroll later is length,
 * not information.
 */
export function MissionaryDossier({ name, bio, pullQuote, email }: MissionaryDossierProps) {
  const firstName = name.split(" ")[0];

  return (
    <section className="border-y border-hair bg-sunk">
      <div className="mx-auto max-w-(--container-max) px-5 py-12 sm:px-12 sm:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-14">
          <div className="min-w-0 space-y-5">
            {bio.map((paragraph, i) => (
              <React.Fragment key={i}>
                <p
                  className={cn(
                    "max-w-[68ch] font-body text-base leading-relaxed text-body sm:text-md",
                    /* The drop cap marks the opening line only — a second one further down would
                       read as a mistake, not a flourish. */
                    i === 0 &&
                      "first-letter:float-left first-letter:mr-2 first-letter:mt-0.5 first-letter:font-display first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-primary-hover",
                  )}
                >
                  {paragraph}
                </p>
                {i === 0 && pullQuote && (
                  <blockquote className="border-l-4 border-primary bg-card py-4 pl-5 pr-4 font-display text-xl font-medium italic leading-snug text-primary-hover">
                    {pullQuote}
                  </blockquote>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex flex-col gap-5 lg:sticky lg:top-[calc(var(--site-header-stack-height,116px)+24px)] lg:max-w-90 lg:transition-[top] lg:duration-300">
            <Link
              href="/missionaries"
              className="inline-flex items-center gap-1.5 font-ui text-sm font-semibold text-link underline-offset-4 hover:underline"
            >
              <ArrowLeft size={15} aria-hidden /> All missionaries
            </Link>
            <PartnerCallout firstName={firstName} email={email} />
          </div>
        </div>
      </div>
    </section>
  );
}
