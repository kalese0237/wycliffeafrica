"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface StepContentsProps {
  steps: { id: string; title: string }[];
}

/**
 * The steps rail: the reader's position in a seven-stage process they are weighing up before they
 * start it. Same apparatus as the training contents rail — a marker that slides as the reader passes
 * each stage — because both pages are asking a reader to find their own place in a long document.
 *
 * The rail is complete on first paint; only the marker moves.
 */
export function StepContents({ steps }: StepContentsProps) {
  const [activeId, setActiveId] = React.useState(steps[0]?.id ?? "");

  React.useEffect(() => {
    const sections = steps
      .map((step) => document.getElementById(step.id))
      .filter((node): node is HTMLElement => node !== null);
    if (sections.length === 0) return;

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
  }, [steps]);

  const activeIndex = Math.max(
    0,
    steps.findIndex((step) => step.id === activeId),
  );

  return (
    <nav aria-label="Steps to membership" className="lg:sticky lg:top-28 lg:self-start">
      <p className="mb-3 font-ui text-xs font-semibold uppercase tracking-caps text-primary-active">Steps</p>
      <div className="relative border-t-2 border-terra-900">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-4 top-0 hidden w-2 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none lg:block"
          style={{ height: `${100 / steps.length}%`, transform: `translateY(${activeIndex * 100}%)` }}
        >
          <span className="absolute top-1/2 block h-px w-full bg-primary" />
        </span>
        <ol>
          {steps.map((step, index) => {
            const isActive = step.id === activeId;
            return (
              <li key={step.id} className="border-b border-hair">
                <a
                  href={`#${step.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group flex items-baseline gap-3 py-2.5 font-body text-base hover:text-primary",
                    isActive ? "text-primary-active" : "text-body",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn("w-5 flex-none font-display text-xs", isActive ? "text-primary" : "text-muted")}
                  >
                    {index + 1}
                  </span>
                  <span className={cn("flex-1 group-hover:underline", isActive && "font-semibold")}>
                    {step.title}
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
