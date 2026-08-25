import * as React from "react";
import { CORE_VALUES } from "@/content/about";

/**
 * Article Four of the What We Believe document: the five core values as full-width ruled rows.
 *
 * This continues the bound-document grammar rather than breaking into a card or column row — the
 * values are the last article of one continuous confession, and a tiled treatment here would turn the
 * page's close into exactly the mission-statement-over-tiles arrangement the whole family refuses.
 * The numeral column is Fraunces, not mono: mono is reserved for codes and reference numbers, and an
 * ordinal is neither.
 *
 * Anchored at `#core-values` because the site header's About dropdown lists "Our Core Values" as its
 * own item; the values live here rather than on a route of their own, since five short statements do
 * not hold a page and a vetting reader wants them beside the doctrine they follow from.
 */
export function CoreValues() {
  return (
    <section id="core-values" className="mx-auto max-w-(--container-max) px-5 pt-16 sm:px-12 sm:pt-20">
      <div className="flex flex-col gap-3 border-b-2 border-ink-0 pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
        <div>
          <p className="mb-3.5 font-ui text-xs font-semibold uppercase tracking-caps text-primary-active">
            Article Four
          </p>
          <h2 className="font-display text-2xl font-normal leading-tight text-strong sm:text-[48px]">
            Our core values
          </h2>
        </div>
        <p className="flex-none font-display text-base italic text-muted sm:text-md">
          Five commitments we work by
        </p>
      </div>

      <ol>
        {CORE_VALUES.map(({ title, body }, index) => (
          <li
            key={title}
            className="grid grid-cols-[56px_1fr] items-baseline gap-x-4 border-b border-hair py-6 sm:grid-cols-[112px_1fr_1.2fr] sm:gap-x-0"
          >
            <span aria-hidden className="font-display text-xl font-semibold leading-none text-terra-100">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-md font-semibold leading-snug text-strong sm:pr-10 sm:text-[23px]">
              {title}
            </h3>
            <p className="col-start-2 mt-2 font-body text-base leading-relaxed text-muted sm:col-start-3 sm:mt-0">
              {body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
