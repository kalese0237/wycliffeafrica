import * as React from "react";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/cn";

export interface DonationCTAProps {
  eyebrow?: string;
  title?: string;
  blurb?: string;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
  /** `dark` sits on brand navy; the alternative is a green-tinted surface. */
  dark?: boolean;
}

/** Full-width giving band with a faint "give" watermark. */
export function DonationCTA({
  eyebrow = "Support the work",
  title = "Put Scripture in reach of one more language.",
  blurb = "The work runs on supported people: the translators who draft, the consultants who check, the teachers who help communities read. Your gift keeps them at it.",
  primaryCta = "Give today",
  primaryHref = "/give",
  secondaryCta = "Support a missionary",
  secondaryHref = "/missionaries",
  dark = true,
}: DonationCTAProps) {
  return (
    <section className={cn("relative overflow-hidden", dark ? "bg-navy-900" : "bg-accent-tint")}>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute right-[3%] top-1/2 -translate-y-1/2 select-none font-display text-[220px] italic leading-none sm:text-[320px]",
          dark ? "text-green-400/10" : "text-green-500/[0.07]",
        )}
      >
        give
      </div>
      <div className="relative mx-auto flex max-w-[var(--container-max)] flex-wrap items-center justify-between gap-7 px-5 py-16 sm:px-12">
        <div className="max-w-[56ch]">
          <div
            className={cn(
              "mb-3 font-ui text-xs font-bold uppercase tracking-caps",
              dark ? "text-green-300" : "text-green-700",
            )}
          >
            {eyebrow}
          </div>
          <h2 className={cn("mb-3 font-display text-2xl font-semibold leading-snug", dark ? "text-white" : "text-strong")}>
            {title}
          </h2>
          <p className={cn("font-body text-md leading-[1.5]", dark ? "text-white/82" : "text-muted")}>{blurb}</p>
        </div>
        <div className="flex flex-col gap-3">
          <Button href={primaryHref} variant="spark" size="lg">
            {primaryCta}
          </Button>
          <Button
            href={secondaryHref}
            variant={dark ? "secondary" : "ghost"}
            size="lg"
            className={dark ? "border-white/40 bg-transparent text-white hover:bg-white/10" : undefined}
          >
            {secondaryCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
