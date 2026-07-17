import * as React from "react";
import { Divider } from "@/components/atoms/Divider";

export interface PageHeroProps {
  title: string;
}

/** Shared navy band opening every interior page (Home uses its own rotating hero instead). */
export function PageHero({ title }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[340px] flex-col items-center justify-center gap-4 overflow-hidden bg-navy-900 px-5 text-center sm:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(480px 480px at -6% -40%, rgba(47,52,104,0.55), transparent 60%), radial-gradient(420px 420px at 104% 130%, rgba(51,176,15,0.35), transparent 60%)",
        }}
      />
      <Divider variant="accent" width={56} className="relative" />
      <h1 className="relative max-w-[24ch] font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">{title}</h1>
    </section>
  );
}
