import * as React from "react";

export interface RubricProps {
  /** Left label — a place, a division, a section number. */
  label: string;
  /** Right label, after the flexing hairline. Omitted (not just left blank) when there's no second label. */
  affiliation?: string;
  /** True when set over photography, where the softer terra-300 loses contrast against the scrim. */
  onPhoto?: boolean;
}

/**
 * The rule row the About family established: a label, a hairline that flexes to fill, and a second
 * label at the far edge. Anywhere a terra-900 opening needs a folio line above its heading.
 */
export function Rubric({ label, affiliation, onPhoto = false }: RubricProps) {
  const tone = onPhoto ? "text-terra-100" : "text-terra-300";
  return (
    <div className="mb-5 flex items-center gap-5 sm:mb-6">
      <span className={`flex-none font-ui text-xs font-semibold uppercase tracking-caps-loose ${tone}`}>{label}</span>
      {affiliation && (
        <>
          <span aria-hidden className={`h-px flex-1 ${onPhoto ? "bg-terra-100/40" : "bg-terra-300/40"}`} />
          <span className={`flex-none font-ui text-xs font-semibold uppercase tracking-caps-loose ${tone}`}>
            {affiliation}
          </span>
        </>
      )}
    </div>
  );
}
