import * as React from "react";

export interface TrainingNoteProps {
  heading: string;
  paragraphs: string[];
}

/**
 * The endnote to the index — what Wycliffe Africa does and does not administer, set as the small print
 * of a prospectus: a ruled two-column note on the sunk cream ground, quiet after the dense list.
 */
export function TrainingNote({ heading, paragraphs }: TrainingNoteProps) {
  return (
    <section className="border-y border-hair bg-sunk">
      <div className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-6 px-5 py-14 sm:px-12 lg:grid-cols-[210px_1fr] lg:gap-20">
        <h2 className="font-ui text-xs font-semibold uppercase tracking-caps text-primary-active">{heading}</h2>
        <div className="max-w-[68ch]">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-3.5 font-body text-base leading-relaxed text-body last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
