"use client";

import * as React from "react";
import { UpdateCard } from "@/components/molecules/UpdateCard";
import { cn } from "@/lib/cn";
import type { FieldUpdateRecord, UpdateType } from "@/lib/directus/schema";

const FILTERS: { value: "all" | UpdateType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "update", label: "Field updates" },
  { value: "prayer", label: "Prayer requests" },
];

export interface UpdatesGridProps {
  updates: FieldUpdateRecord[];
  authorNames: Record<string, string>;
}

/** Full updates feed with the all/update/prayer segmented filter. */
export function UpdatesGrid({ updates, authorNames }: UpdatesGridProps) {
  const [filter, setFilter] = React.useState<"all" | UpdateType>("all");
  const visible = filter === "all" ? updates : updates.filter((u) => u.type === filter);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2.5">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-pill border px-[18px] py-2 font-ui text-sm font-semibold transition-colors",
              filter === f.value
                ? "border-primary bg-primary text-on-primary"
                : "border-hair bg-card text-muted hover:bg-sunk",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {visible.map((u) => (
          <UpdateCard key={u.id} update={u} authorName={authorNames[u.missionaryId] ?? "Wycliffe Africa"} />
        ))}
      </div>
    </>
  );
}
