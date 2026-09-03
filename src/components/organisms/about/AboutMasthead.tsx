import * as React from "react";

export interface AboutMastheadProps {
  /** Left side of the rule, e.g. "About Us · II" — omit where no division label is carried. */
  eyebrow?: string;
  /** Right side of the rule, e.g. "Statement of Faith". */
  rubric: string;
  title: string;
  titleAccent: string;
  standfirst: string;
}

/**
 * The non-photographic opening used by What We Believe. A dark terra ground ruled with faint vertical
 * column lines — the page as a printed document rather than a photographed scene. The vertical rules
 * are decorative, so they sit on a `aria-hidden` layer and never enter the accessibility tree.
 */
export function AboutMasthead({ eyebrow, rubric, title, titleAccent, standfirst }: AboutMastheadProps) {
  return (
    <section className="relative overflow-hidden bg-terra-900">
      <div
        aria-hidden
        className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(243,217,196,0.09)_0_1px,transparent_1px_92px)]"
      />
      <div className="relative z-10 mx-auto max-w-(--container-max) px-5 py-16 sm:px-12 sm:py-20">
        <div className="mb-8 flex items-center gap-5">
          {eyebrow && (
            <span className="font-display text-xs uppercase tracking-caps-loose text-terra-300">{eyebrow}</span>
          )}
          <span aria-hidden className="h-px flex-1 bg-terra-100/30" />
          <span className="font-ui text-xs font-semibold uppercase tracking-caps text-terra-300">{rubric}</span>
        </div>
        <h1 className="wonk max-w-[15ch] text-balance font-display text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl lg:text-[76px]">
          {title} <em className="italic text-terra-300">{titleAccent}</em>
        </h1>
        <p className="mt-6 max-w-[56ch] font-body text-md leading-relaxed text-terra-100 sm:text-lg">
          {standfirst}
        </p>
      </div>
    </section>
  );
}
