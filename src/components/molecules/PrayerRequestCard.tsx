import * as React from "react";
import { HandHeart, MapPin, ShieldCheck } from "lucide-react";
import { Avatar } from "@/components/atoms/Avatar";
import { cn } from "@/lib/cn";
import type { PublicFieldUpdateRecord, PublicMissionaryRecord } from "@/lib/directus/schema";

export interface PrayerRequestCardProps {
  request: PublicFieldUpdateRecord;
  missionary?: PublicMissionaryRecord;
  className?: string;
}

/** The region is the segment after the last comma of `place` ("Turkana, Kenya" → "Kenya"). */
function regionOf(missionary?: PublicMissionaryRecord): string {
  if (!missionary) return "Africa";
  const parts = missionary.place.split(",");
  return parts[parts.length - 1].trim();
}

/**
 * Prayer request card. Sensitive requests render anonymized — no name or
 * portrait, region instead of place — for workers in security-restricted
 * areas. Render server-side only, so withheld names never reach the client.
 */
export function PrayerRequestCard({ request, missionary, className }: PrayerRequestCardProps) {
  const sensitive = Boolean(request.sensitive);

  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-lg border border-hair bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:gap-6",
        className,
      )}
    >
      <div className="flex flex-none items-center gap-2.5 sm:w-56 sm:flex-col sm:items-start sm:border-r sm:border-hair sm:pr-6">
        {sensitive ? (
          <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-tag-pray-tint text-tag-pray">
            <ShieldCheck size={15} />
          </span>
        ) : (
          <Avatar name={missionary?.name ?? "Wycliffe Africa"} size={32} />
        )}
        <div className="font-ui text-xs leading-[1.3] text-muted">
          <div className="font-semibold text-body">
            {sensitive ? "A Wycliffe Africa worker" : missionary?.name ?? "Wycliffe Africa"}
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={11} /> {sensitive ? regionOf(missionary) : missionary?.place ?? "Africa"} ·{" "}
            {request.date}
          </div>
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-pill bg-tag-pray-tint px-3 py-1 font-ui text-xs font-bold uppercase tracking-wide text-tag-pray">
            <HandHeart size={13} /> Prayer request
          </span>
          {sensitive && (
            <span
              className="inline-flex items-center gap-1 font-ui text-xs font-semibold text-faint"
              title="Details withheld to protect workers in a security-restricted area"
            >
              <ShieldCheck size={13} /> Identity protected
            </span>
          )}
        </div>
        <h3 className="mb-2 font-display text-lg font-semibold leading-snug text-strong">{request.title}</h3>
        <p className="font-body text-base leading-[1.55] text-muted">{request.body}</p>
      </div>
    </article>
  );
}
