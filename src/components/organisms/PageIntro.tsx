import * as React from "react";

export interface PageIntroProps {
  title: string;
  subtitle?: string;
}

/**
 * Serif H1 + subtitle intro band used by About/Give/Get Involved-family pages
 * (no terra pageHero). The journey tag that used to sit above the title was
 * restating it — the six journey colours discriminate between paths on cards,
 * which is where they carry information; on a page that is already that
 * journey they only label the heading twice.
 */
export function PageIntro({ title, subtitle }: PageIntroProps) {
  return (
    <section className="mx-auto max-w-(--container-max) px-5 pb-8 pt-16 sm:px-12">
      <h1 className="mb-2.5 max-w-[20ch] text-balance font-display text-2xl font-semibold leading-tight text-strong sm:text-3xl">
        {title}
      </h1>
      {subtitle && <p className="max-w-[62ch] font-body text-md text-body">{subtitle}</p>}
    </section>
  );
}
