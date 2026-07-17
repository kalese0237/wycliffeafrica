import * as React from "react";
import { Tag, type Journey } from "@/components/atoms/Tag";

export interface PageIntroProps {
  journey: Journey;
  eyebrowLabel: string;
  title: string;
  subtitle?: string;
}

/** Tag + serif H1 + subtitle intro band used by About/Give/Get Involved-family pages (no navy pageHero). */
export function PageIntro({ journey, eyebrowLabel, title, subtitle }: PageIntroProps) {
  return (
    <section className="mx-auto max-w-[var(--container-max)] px-5 pb-8 pt-16 sm:px-12">
      <Tag journey={journey} dot={false}>
        {eyebrowLabel}
      </Tag>
      <h1 className="mb-2.5 mt-4 max-w-[20ch] text-balance font-display text-2xl font-semibold leading-tight text-strong sm:text-3xl">
        {title}
      </h1>
      {subtitle && <p className="max-w-[62ch] font-body text-md text-muted">{subtitle}</p>}
    </section>
  );
}
