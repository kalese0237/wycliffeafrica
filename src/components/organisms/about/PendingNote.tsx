import * as React from "react";

export interface PendingNoteProps {
  children: React.ReactNode;
  /** The label chip. Defaults to "Placeholder". */
  label?: string;
}

/**
 * A visible, deliberate marker for content Wycliffe Africa has not supplied yet.
 *
 * This is a designed state, not a defect. The About pages carry real absences — board portraits,
 * roles, biographies, the founding year — and the project rule is that nothing unverified ever ships
 * looking like fact. The dashed border and the terra chip make the gap legible to a reader and
 * impossible to miss in review; remove the note when the content arrives.
 */
export function PendingNote({ children, label = "Placeholder" }: PendingNoteProps) {
  return (
    <p className="mt-8 flex max-w-[74ch] flex-col gap-2 rounded-sm border border-dashed border-terra-300 bg-sunk px-5 py-4 font-body text-sm leading-relaxed text-muted sm:flex-row sm:gap-3.5">
      <span className="flex-none pt-0.5 font-ui text-xs font-bold uppercase tracking-caps text-primary-hover">
        {label}
      </span>
      <span>{children}</span>
    </p>
  );
}
