import * as React from "react";
import { HISTORY } from "@/content/about";
import { PendingNote } from "./PendingNote";

/**
 * The founding story as a dated rail.
 *
 * Every milestone but the last is pending: Wycliffe Africa has not supplied the founding year, the
 * founders, or the intermediate dates, so the rail renders them as "Year to be confirmed" in a muted
 * italic and states the gap plainly underneath. Filling `HISTORY` in `src/content/about.ts` is the
 * only change needed — the rail does not care whether a milestone is pending or real.
 */
export function HistoryRail() {
  return (
    <section className="mx-auto max-w-(--container-max) px-5 pt-16 sm:px-12 sm:pt-20">
      <h2 className="mb-10 font-display text-2xl font-normal leading-tight text-strong sm:text-[48px]">
        How Wycliffe Africa began
      </h2>

      <ol className="grid grid-cols-1 border-t-2 border-primary sm:grid-cols-2 lg:grid-cols-4">
        {HISTORY.map(({ year, title, body, pending }) => (
          <li key={title} className="relative pr-8 pt-7">
            <span
              aria-hidden
              className="absolute -top-[7px] left-0 h-3 w-3 rounded-full bg-primary"
            />
            <p className="mb-2.5 font-ui text-sm font-semibold tracking-wide text-primary-hover">{year}</p>
            <h3 className="mb-2 font-display text-md font-semibold leading-snug text-strong">{title}</h3>
            <p className={`font-body text-sm leading-relaxed ${pending ? "italic text-faint" : "text-muted"}`}>
              {body}
            </p>
          </li>
        ))}
      </ol>

      <PendingNote>
        The founding year, the founders&apos; names and every milestone above are awaiting confirmation
        from Wycliffe Africa. Nothing on this rail is invented — the dates read as unconfirmed until
        the real ones are supplied.
      </PendingNote>
    </section>
  );
}
