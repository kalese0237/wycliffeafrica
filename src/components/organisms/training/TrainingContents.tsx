"use client";

import * as React from "react";
import type { TrainingCountry } from "@/content/training";
import { ROMAN } from "@/components/organisms/about/roman";
import { cn } from "@/lib/cn";

export interface TrainingContentsProps {
  countries: Pick<TrainingCountry, "id" | "country" | "programmes">[];
}

/**
 * The contents rail, with the reader's position in the index marked.
 *
 * This is the page's one authored motion moment: a terra marker that slides down the rail as the
 * reader passes each country division, rather than a hover effect scattered over the list. Nothing is
 * hidden until it animates — the rail is complete on first paint and the marker only moves.
 */
export function TrainingContents({ countries }: TrainingContentsProps) {
  const [activeId, setActiveId] = React.useState(countries[0]?.id ?? "");

  React.useEffect(() => {
    const sections = countries
      .map((entry) => document.getElementById(entry.id))
      .filter((node): node is HTMLElement => node !== null);
    if (sections.length === 0) return;

    // Top-band root margin: a division counts as "being read" once its head reaches the upper
    // quarter of the viewport, which matches where the eye actually sits while scrolling.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [countries]);

  const activeIndex = Math.max(
    0,
    countries.findIndex((entry) => entry.id === activeId),
  );

  return (
    <nav aria-label="Countries" className="lg:sticky lg:top-28 lg:self-start">
      <p className="mb-3 font-ui text-xs font-semibold uppercase tracking-caps text-primary-active">Contents</p>
      <div className="relative border-t-2 border-terra-900">
        {/* The position mark hangs in the margin, outside the rows, so the rail keeps the single left
            edge the whole component is built on. It slides rather than blinking between rows. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -left-4 top-0 hidden w-2 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none lg:block"
          style={{ height: `${100 / countries.length}%`, transform: `translateY(${activeIndex * 100}%)` }}
        >
          <span className="absolute top-1/2 block h-px w-full bg-primary" />
        </span>
        <ol>
          {countries.map((entry, index) => {
            const isActive = entry.id === activeId;
            return (
              <li key={entry.id} className="border-b border-hair">
                <a
                  href={`#${entry.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group flex items-baseline gap-3 py-2.5 font-body text-base hover:text-primary",
                    isActive ? "text-primary-active" : "text-body",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn("w-6 flex-none font-display text-xs", isActive ? "text-primary" : "text-muted")}
                  >
                    {ROMAN[index] ?? index + 1}
                  </span>
                  <span className={cn("flex-1 group-hover:underline", isActive && "font-semibold")}>{entry.country}</span>
                  <span aria-hidden className="font-ui text-xs text-muted">
                    {entry.programmes.length}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
