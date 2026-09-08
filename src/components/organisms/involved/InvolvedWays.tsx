import * as React from "react";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

export interface InvolvedWay {
  title: string;
  body: string;
  href: string;
  /** Who this one is for — the folio at the top of the card. */
  audience: string;
  /** The link's own words, so seven cards do not all say "Learn more". */
  cta: string;
  icon: LucideIcon;
}

export interface InvolvedWaysProps {
  ways: InvolvedWay[];
  /** Sits above the grid — what this set is and how to read it. */
  standfirst: string;
  /** The one way that is not a commitment of time: given the closing band to itself. */
  feature: Omit<InvolvedWay, "audience">;
}

/**
 * The ways into the work, as cards.
 *
 * Each card is a whole link, so the target is the card and not a 90px button inside it. The audience
 * folio sits at the top under a hairline rather than a coloured chip — it is apparatus, and the card
 * has only one accent to spend. Every card names its own action, because seven cards that all say
 * "Learn more" make seven different commitments look like one.
 *
 * Six sit in the grid and Give closes on a band of its own: it is the only entry that asks for money
 * rather than time, and putting it in the grid made it a seventh peer and left an orphan cell.
 */
export function InvolvedWays({ ways, standfirst, feature }: InvolvedWaysProps) {
  const FeatureIcon = feature.icon;

  return (
    <section className="mx-auto max-w-(--container-max) px-5 py-16 sm:px-12 sm:py-20">
      <p className="max-w-[62ch] font-body text-md leading-relaxed text-body sm:text-lg">{standfirst}</p>

      <ul className="reveal-group mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ways.map(({ title, body, href, audience, cta, icon: WayIcon }) => (
          <li key={title} className="reveal flex">
            <Link
              href={href}
              className="group flex flex-1 flex-col rounded-md border border-hair bg-card p-6 shadow-sm transition-[box-shadow,border-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-border hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-400"
            >
              <span className="flex items-center justify-between gap-4 border-b border-hair pb-4">
                <span className="font-ui text-xs font-semibold uppercase tracking-caps text-muted">
                  {audience}
                </span>
                <WayIcon size={18} className="flex-none text-primary" aria-hidden />
              </span>

              <span className="mt-5 block font-display text-lg font-normal leading-snug text-strong underline-offset-[6px] group-hover:underline sm:text-xl">
                {title}
              </span>
              <span className="mt-2.5 mb-6 block flex-1 font-body text-base leading-relaxed text-body">
                {body}
              </span>

              <span className="flex items-center gap-2 font-ui text-xs font-bold uppercase tracking-caps text-primary">
                {cta}
                <ArrowRight
                  size={14}
                  className="transition-transform duration-150 ease-out group-hover:translate-x-1"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href={feature.href}
        className="reveal group mt-5 flex flex-col gap-5 rounded-md border border-primary-border bg-primary-tint p-7 transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-400 sm:flex-row sm:items-center sm:justify-between sm:gap-12 sm:p-8"
      >
        <span className="flex items-start gap-5">
          <FeatureIcon size={22} className="mt-1 flex-none text-primary" aria-hidden />
          <span>
            <span className="block font-display text-lg font-normal leading-snug text-strong underline-offset-[6px] group-hover:underline sm:text-xl">
              {feature.title}
            </span>
            <span className="mt-2 block max-w-[60ch] font-body text-base leading-relaxed text-body">
              {feature.body}
            </span>
          </span>
        </span>
        <span className="flex flex-none items-center gap-2 font-ui text-xs font-bold uppercase tracking-caps text-primary">
          {feature.cta}
          <ArrowRight size={14} className="transition-transform duration-150 ease-out group-hover:translate-x-1" />
        </span>
      </Link>
    </section>
  );
}
