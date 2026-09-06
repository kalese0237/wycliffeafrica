import * as React from "react";
import { NewsCard } from "@/components/molecules/NewsCard";
import type { PublicNewsRecord } from "@/lib/directus/schema";

export interface FieldUpdatesIndexProps {
  updates: PublicNewsRecord[];
  /** The missionary's display name — credited as the byline on their own posts. */
  authorName: string;
}

/**
 * What this missionary has written, newest first — the same card the site uses everywhere else a
 * feed of news posts appears (`NewsCard`, via the homepage's "Latest news" and `/news`), so a
 * supporter recognizes the format rather than learning a page-local one.
 */
export function FieldUpdatesIndex({ updates, authorName }: FieldUpdatesIndexProps) {
  if (updates.length === 0) return null;

  return (
    <section className="mx-auto max-w-(--container-max) px-5 pt-16 sm:px-12 sm:pt-20">
      <div className="flex flex-col gap-3 pb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
        <h2 className="font-display text-2xl font-normal leading-tight text-strong sm:text-[48px]">
          Updates from the field
        </h2>
        <p className="flex-none font-display text-base italic text-muted sm:text-md">
          Written from the work itself
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {updates.map((update) => (
          <NewsCard key={update.id} item={update} authorName={authorName} />
        ))}
      </div>
    </section>
  );
}
