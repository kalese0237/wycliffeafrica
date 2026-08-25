import * as React from "react";
import { ROMAN } from "./roman";

export interface CreedBandProps {
  eyebrow: string;
  title: string;
  /** The line that introduces the articles, e.g. "We adhere to the following truths." */
  intro: string;
  /** Verbatim doctrinal statements. Never edit, condense or paraphrase these. */
  articles: string[];
  /** Left side of the closing signature rule. */
  attestation: string;
  /** Right side of the closing signature rule — set as a signatory. */
  signatory: string;
}

/**
 * The centrepiece of the About family: the statement of faith set as a confession meant to be read,
 * printed and forwarded, rather than as a bulleted list or an accordion.
 *
 * The design decisions here are load-bearing and should survive refactors. Statements are set in
 * Fraunces at reading scale, not UI scale, because a vetting pastor reads every word. Numerals hang in
 * their own column so the statements share a left edge and scan as a series. The band closes on a 2px
 * terra-900 rule with the organisation's name as a signatory — the visual claim that these words are
 * owned, not decorative. It is an `<ol>` because the articles are an ordered, cited series.
 */
export function CreedBand({
  eyebrow,
  title,
  intro,
  articles,
  attestation,
  signatory,
}: CreedBandProps) {
  return (
    <section className="border-y border-hair bg-sunk">
      <div className="mx-auto max-w-(--container-max) px-5 py-16 sm:px-12 sm:py-24">
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-4 font-ui text-xs font-semibold uppercase tracking-caps text-primary-active">
            {eyebrow}
          </p>
          <h2 className="wonk font-display text-2xl font-normal leading-tight text-strong sm:text-3xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-[50ch] font-body text-base text-muted sm:text-md">{intro}</p>
        </div>

        <ol className="mx-auto max-w-[860px]">
          {articles.map((article, index) => (
            <li
              key={article}
              className="grid grid-cols-[44px_1fr] border-t border-paper-3 py-6 last:border-b sm:grid-cols-[70px_1fr]"
            >
              <span
                aria-hidden
                className="pt-2 font-display text-sm font-semibold tracking-wide text-primary"
              >
                {ROMAN[index] ?? index + 1}
              </span>
              <p className="max-w-[34ch] font-display text-md font-normal leading-snug text-strong sm:text-lg lg:text-[25px]">
                {article}
              </p>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-12 flex max-w-[860px] flex-col gap-4 border-t-2 border-terra-900 pt-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <p className="max-w-[46ch] font-body text-sm leading-relaxed text-muted">{attestation}</p>
          <p className="flex-none font-display text-lg italic text-primary-active">{signatory}</p>
        </div>
      </div>
    </section>
  );
}
