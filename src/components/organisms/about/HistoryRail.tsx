import * as React from "react";
import { HISTORY } from "@/content/about";
import { PendingNote } from "./PendingNote";

/**
 * The founding story as a dated rail. `id="history"` is the target of the home page's history band.
 *
 * A milestone marked `pending` renders in a muted italic, and the placeholder note underneath appears
 * only while at least one milestone is pending. Editing `HISTORY` in `src/content/about.ts` is the only
 * change needed.
 */
export function HistoryRail() {
  const hasPending = HISTORY.some((m) => m.pending);

  return (
    <section id="history" className="mx-auto max-w-(--container-max) px-5 pt-16 sm:px-12 sm:pt-20">
      <h2 className="mb-10 font-display text-2xl font-normal leading-tight text-strong sm:text-[48px]">
        How Wycliffe Africa began
      </h2>

      {/* Each milestone carries its own rule so its dot always sits on a line: stacked on mobile, two
          rows at sm, one continuous rail at lg. */}
      <ol className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {HISTORY.map(({ year, title, body, pending }) => (
          <li key={title} className="relative border-t-2 border-primary pr-8 pt-7">
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

      {hasPending && (
        <PendingNote>
          Some milestones above are awaiting confirmation from Wycliffe Africa. Nothing on this rail is
          invented; unconfirmed dates read as unconfirmed until the real ones are supplied.
        </PendingNote>
      )}
    </section>
  );
}
