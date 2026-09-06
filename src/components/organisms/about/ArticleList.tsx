import * as React from "react";
import { ROMAN } from "./roman";

export interface ArticleListProps {
  eyebrow: string;
  title: string;
  /** Short italic gloss set under the heading in the left rail. */
  rubric?: string;
  items: string[];
  /** Optional closing paragraph, set as a serif italic coda. */
  coda?: string;
  id?: string;
}

/**
 * A numbered article series on the two-column document grid — the grammar that carries the Wycliffe
 * Africa beliefs, the role of the Church, and the prayer lists.
 *
 * The head sits in a narrow left rail and the entries run in the right column, so the section fills
 * the container instead of leaving a column of empty paper beside a 66ch measure. The rules belong to
 * the entries and stop where the text stops; a rule that runs on past its content reads as a broken
 * grid, not as apparatus.
 *
 * Deliberately quieter than `CreedBand`: body-face statements at 18px rather than display-face at
 * 25px. These lists are read once and understood; the creed is read closely and weighed, and the type
 * ramp is what tells a reader which is which.
 */
export function ArticleList({ eyebrow, title, rubric, items, coda, id }: ArticleListProps) {
  return (
    <section
      id={id}
      className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-x-16 gap-y-8 px-5 pt-16 sm:px-12 sm:pt-20 lg:grid-cols-[minmax(220px,1fr)_1.9fr]"
    >
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="mb-3.5 font-ui text-xs font-semibold uppercase tracking-caps text-primary-active">
          {eyebrow}
        </p>
        <h2 className="text-balance font-display text-2xl font-normal leading-tight text-strong sm:text-[40px]">
          {title}
        </h2>
        {rubric && (
          <p className="mt-4 max-w-[34ch] font-display text-base italic leading-relaxed text-muted">
            {rubric}
          </p>
        )}
      </div>

      <div>
        <ol className="border-t-2 border-ink-0">
          {items.map((item, index) => (
            <li
              key={item}
              className="grid grid-cols-[44px_1fr] border-b border-hair py-6 last:border-b-0 sm:grid-cols-[70px_1fr]"
            >
              <span aria-hidden className="pt-1 font-display text-sm font-semibold tracking-wide text-primary">
                {ROMAN[index] ?? index + 1}
              </span>
              <p className="max-w-[66ch] font-body text-base leading-relaxed text-body sm:text-md">{item}</p>
            </li>
          ))}
        </ol>

        {coda && (
          <p className="max-w-[66ch] border-t border-hair pt-7 font-display text-base italic leading-relaxed text-muted sm:text-md">
            {coda}
          </p>
        )}
      </div>
    </section>
  );
}
