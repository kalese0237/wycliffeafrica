"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { UpdateCard } from "@/components/molecules/UpdateCard";
import { cn } from "@/lib/cn";
import type { FieldUpdateRecord, UpdateType } from "@/lib/directus/schema";

const FILTERS: { value: "all" | UpdateType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "update", label: "Missionary updates" },
  { value: "prayer", label: "Prayer requests" },
];

export interface UpdatesGridProps {
  updates: FieldUpdateRecord[];
  authorNames: Record<string, string>;
}

/** Full updates feed with the all/update/prayer segmented filter. */
export function UpdatesGrid({ updates, authorNames }: UpdatesGridProps) {
  const searchParams = useSearchParams();
  const requestedType = searchParams.get("type");
  const filter: "all" | UpdateType =
    requestedType === "update" || requestedType === "prayer" ? requestedType : "all";
  const visible = filter === "all" ? updates : updates.filter((u) => u.type === filter);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2.5">
        {FILTERS.map((f) => (
          <Link
            key={f.value}
            href={f.value === "all" ? "/updates" : `/updates?type=${f.value}`}
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {visible.map((u) => (
          <UpdateCard key={u.id} update={u} authorName={authorNames[u.missionaryId] ?? "Wycliffe Africa"} />
        ))}
      </div>
    </>
  );
}
