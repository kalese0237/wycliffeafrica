"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { NewsCard } from "@/components/molecules/NewsCard";
import { cn } from "@/lib/cn";
import type { NewsCategory, PublicNewsRecord } from "@/lib/directus/schema";

const FILTERS: { value: "all" | NewsCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "story", label: "Stories" },
  { value: "update", label: "Missionary updates" },
  { value: "project", label: "Project updates" },
];

export interface NewsGridProps {
  items: PublicNewsRecord[];
  authorNames: Record<string, string>;
}

/** Full news feed with the all/story/update/project segmented filter. */
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
      <div className="mb-8 flex flex-wrap gap-2.5">
        {FILTERS.map((f) => (
          <Link
            key={f.value}
            href={f.value === "all" ? "/news" : `/news?type=${f.value}`}
            aria-current={filter === f.value ? "page" : undefined}
            className={cn(
              "rounded-pill border px-[18px] py-2 font-ui text-sm font-semibold transition-colors",
              filter === f.value
                ? "border-primary bg-primary text-on-primary"
                : "border-hair bg-card text-muted hover:bg-sunk",
            )}
          >
            {f.label}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <NewsCard
            key={item.id}
            item={item}
            authorName={item.missionaryId ? authorNames[item.missionaryId] : undefined}
          />
        ))}
      </div>
    </>
  );
}
