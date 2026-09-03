import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { ROMAN } from "@/components/organisms/about/roman";
import { TrainingContents } from "./TrainingContents";
import type { TrainingCountry } from "@/content/training";

export interface TrainingIndexProps {
  countries: TrainingCountry[];
  /** Sits above the first division — what this list is and what it is not. */
  standfirst: string;
  /** Closes the list: SIL's own training index, for a reader whose search runs past these countries. */
  moreHref: string;
  moreLabel: string;
  moreNote: string;
}

/** "sil.org" — the folio mark at the end of a row, so the reader sees where the link goes. */
function hostLabel(href: string) {
  return new URL(href).hostname.replace(/^www\./, "");
}

function programmeCountLabel(count: number) {
  return count === 1 ? "1 programme" : `${count} programmes`;
}

/**
 * The page's spine: an index of schools set as the contents pages of a printed prospectus rather than
 * as a grid of cards. Countries are chapter divisions carrying hanging Roman numerals; schools are
 * ruled entry rows, each a single link out to the institution's own programme page.
 *
 * Load-bearing decisions: the numerals hang in their own column so every institution name shares a
 * left edge and the list scans as a series; the sticky contents rail is the wayfinding for a reader
 * who only wants their own country; the host folio at the row's end tells the reader they are leaving
 * this site before they click. Every fact here is supplied — no language, fee or intake is inferred.
 */
export function TrainingIndex({ countries, standfirst, moreHref, moreLabel, moreNote }: TrainingIndexProps) {
  return (
    <section className="mx-auto max-w-(--container-max) px-5 py-16 sm:px-12 sm:py-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[210px_1fr] lg:gap-20">
        <TrainingContents countries={countries} />

        <div>
          <p className="max-w-[62ch] font-body text-md leading-relaxed text-body sm:text-lg">{standfirst}</p>

          {countries.map((entry, index) => (
            <section key={entry.id} id={entry.id} className="mt-14 scroll-mt-28 first:mt-12">
              <div className="flex items-baseline justify-between gap-6 pb-3">
                <h2 className="wonk flex items-baseline gap-4 font-display text-2xl font-normal leading-snug text-strong sm:text-3xl">
                  <span aria-hidden className="font-display text-sm text-primary">
                    {ROMAN[index] ?? index + 1}
                  </span>
                  {entry.country}
                </h2>
                <span className="flex-none font-ui text-xs font-semibold uppercase tracking-caps text-muted">
                  {programmeCountLabel(entry.programmes.length)}
                </span>
              </div>
              {/* The division rule is its own element so the scroll-driven draw clips the rule alone;
                  a clip on the header would take the country name with it. */}
              <div aria-hidden className="rule-draw h-0.5 bg-terra-900" />

              <ol>
                {entry.programmes.map((programme, programmeIndex) => (
                  <li key={programme.href} className="border-b border-hair">
                    <a
                      href={programme.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid grid-cols-[28px_1fr] gap-x-4 py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-focus-ring) sm:grid-cols-[52px_1fr]"
                    >
                      <span aria-hidden className="pt-1.5 font-display text-sm text-primary">
                        {programmeIndex + 1}
                      </span>
                      <span className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
                        <span className="max-w-[58ch]">
                          <span className="block font-display text-md font-normal leading-snug text-strong underline-offset-4 group-hover:underline sm:text-lg">
                            {programme.institution}
                          </span>
                          {programme.programme && (
                            <span className="mt-1.5 block font-body text-base leading-relaxed text-muted">
                              {programme.programme}
                            </span>
                          )}
                          {programme.note && (
                            <span className="mt-1.5 block font-body text-base leading-relaxed text-muted">
                              {programme.note}
                            </span>
                          )}
                        </span>
                        <span className="flex flex-none items-center gap-1.5 font-ui text-xs uppercase tracking-caps text-muted group-hover:text-primary">
                          {hostLabel(programme.href)}
                          <ArrowUpRight
                            size={14}
                            className="transition-transform duration-130 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                          <span className="sr-only">(opens in a new tab)</span>
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          ))}

          {/* The list is Africa only, so it closes on the door out of it rather than pretending to be
              complete. Sits under the last division on the list's own left edge, not in a card. */}
          <div className="mt-12 border-t-2 border-terra-900 pt-6">
            <p className="mb-5 max-w-[56ch] font-body text-base leading-relaxed text-muted">{moreNote}</p>
            <Button
              href={moreHref}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
              iconRight={<ArrowUpRight size={16} />}
            >
              {moreLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
