import * as React from "react";
import { Skeleton, SkeletonText } from "@/components/atoms/Skeleton";
import { cn } from "@/lib/cn";

/**
 * The shapes the route loading states are built from.
 *
 * Each one mirrors the layout of the thing it stands in for — same grid, same card proportions, same
 * container — so the page does not jump when the content lands. A skeleton whose geometry does not
 * match what arrives is worse than no skeleton: it promises one page and delivers another.
 */

/** Stands in for the terra masthead or photo hero at the top of a route. */
export function LoadingHero({ className }: { className?: string }) {
  return (
    <div className={cn("bg-terra-900", className ?? "h-[280px] sm:h-[340px]")} aria-hidden />
  );
}

/** One portrait-over-text card, as used by the missionary and intern directories. */
export function LoadingProfileCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-hair bg-card shadow-sm">
      <Skeleton shape="block" className="aspect-16/10 rounded-none" />
      <div className="flex flex-col gap-3 p-5">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="w-1/3" />
        <SkeletonText lines={2} className="mt-1" />
      </div>
    </div>
  );
}

/** A row of profile or article cards on the directory grid. */
export function LoadingCardGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <LoadingProfileCard key={index} />
      ))}
    </div>
  );
}

/** The stacked, full-width rows the prayer requests feed uses. */
export function LoadingRows({ count = 4 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 rounded-lg border border-hair bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:gap-6"
        >
          <Skeleton shape="circle" className="h-8 w-8 flex-none" />
          <div className="flex flex-1 flex-col gap-2.5">
            <Skeleton className="h-5 w-2/5" />
            <SkeletonText lines={2} />
          </div>
        </div>
      ))}
    </div>
  );
}

/** A long-form article body: heading, standfirst, then paragraphs. */
export function LoadingArticle() {
  return (
    <div className="mx-auto flex max-w-[68ch] flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-9 w-4/5" />
        <Skeleton className="h-9 w-2/3" />
      </div>
      <SkeletonText lines={4} />
      <Skeleton shape="block" className="aspect-16/9 w-full" />
      <SkeletonText lines={5} />
      <SkeletonText lines={4} />
    </div>
  );
}

/** The shared wrapper: container padding and rhythm matching the loaded routes. */
export function LoadingSection({ children }: { children: React.ReactNode }) {
  return (
    <section
      aria-busy="true"
      aria-live="polite"
      className="mx-auto max-w-(--container-max) px-5 py-16 sm:px-12 sm:py-20"
    >
      <span className="sr-only">Loading</span>
      {children}
    </section>
  );
}
