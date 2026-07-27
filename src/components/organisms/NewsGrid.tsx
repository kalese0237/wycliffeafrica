"use client";

import { useSearchParams } from "next/navigation";
import { NewsCard } from "@/components/molecules/NewsCard";
import type { NewsCategory, PublicNewsRecord } from "@/lib/directus/schema";

const FILTER_LABEL: Record<"all" | NewsCategory, string> = {
  all: "Latest news",
  story: "Stories",
  update: "Missionary updates",
  project: "Projects",
};

export interface NewsGridProps {
  items: PublicNewsRecord[];
  authorNames: Record<string, string>;
}

/** News feed filtered by the topic-card navigation in the page hero. */
export function NewsGrid({ items, authorNames }: NewsGridProps) {
  const searchParams = useSearchParams();
  const requestedType = searchParams.get("type");
  const filter: "all" | NewsCategory =
    requestedType === "story" || requestedType === "update" || requestedType === "project"
      ? requestedType
      : "all";

  const visible = filter === "all" ? items : items.filter((item) => item.category === filter);

  return (
    <>
      <div className="mb-9 flex items-end justify-between gap-4 border-b border-hair pb-5">
        <div>
          <p className="mb-2 font-ui text-xs font-bold uppercase tracking-caps text-green-700">
            News from the field
          </p>
          <h2 className="font-display text-2xl font-semibold leading-tight text-strong">
            {FILTER_LABEL[filter]}
          </h2>
        </div>
        <p className="font-ui text-sm text-muted">
          {visible.length} {visible.length === 1 ? "article" : "articles"}
        </p>
      </div>
      {visible.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
              authorName={item.missionaryId ? authorNames[item.missionaryId] : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-hair bg-sunk px-6 py-16 text-center">
          <p className="font-display text-xl font-semibold text-strong">More news is on the way.</p>
          <p className="mt-2 font-body text-base text-muted">
            There are no published articles in this topic yet.
          </p>
        </div>
      )}
    </>
  );
}
