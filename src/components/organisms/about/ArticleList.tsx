import * as React from "react";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"] as const;

export interface ArticleListProps {
  eyebrow: string;
  title: string;
  /** Short italic gloss set opposite the heading on the section rule. */
  rubric?: string;
  items: string[];
  /** Optional closing paragraph, set as a serif italic coda. */
  coda?: string;
  id?: string;
}

/**
 * A numbered article series under a ruled section head — the document grammar that carries the
 * Wycliffe Africa beliefs and the role of the Church.
 *
 * Deliberately quieter than `CreedBand`: body-face statements at 18px rather than display-face at
 * 25px. These lists are read once and understood; the creed is read closely and weighed, and the type
 * ramp is what tells a reader which is which.
 */
export function ArticleList({ eyebrow, title, rubric, items, coda, id }: ArticleListProps) {
  return (
    <section id={id} className="mx-auto max-w-(--container-max) px-5 pt-16 sm:px-12 sm:pt-20">
      <div className="flex flex-col gap-3 border-b-2 border-ink-0 pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
        <div>
          <p className="mb-3.5 font-ui text-xs font-semibold uppercase tracking-caps text-primary-active">
            {eyebrow}
          </p>
          <h2 className="font-display text-2xl font-normal leading-tight text-strong sm:text-[48px]">
            {title}
          </h2>
        </div>
        {rubric && (
          <p className="flex-none font-display text-base italic text-muted sm:text-md">{rubric}</p>
        )}
      </div>

      <ol>
        {items.map((item, index) => (
          <li key={item} className="grid grid-cols-[44px_1fr] border-b border-hair py-5 sm:grid-cols-[70px_1fr]">
            <span aria-hidden className="pt-1 font-display text-sm font-semibold tracking-wide text-primary">
              {ROMAN[index] ?? index + 1}
            </span>
            <p className="max-w-[66ch] font-body text-base leading-relaxed text-body sm:text-md">{item}</p>
          </li>
        ))}
      </ol>

      {coda && (
        <p className="max-w-[66ch] pt-7 font-display text-base italic leading-relaxed text-muted sm:text-md">
          {coda}
        </p>
      )}
    </section>
  );
}
