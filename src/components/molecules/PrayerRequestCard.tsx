import * as React from "react";
import { HandHeart, MapPin, ShieldCheck } from "lucide-react";
import { Avatar } from "@/components/atoms/Avatar";
import { cn } from "@/lib/cn";
import type { FieldUpdateRecord, MissionaryRecord } from "@/lib/directus/schema";

export interface PrayerRequestCardProps {
  request: FieldUpdateRecord;
  missionary?: MissionaryRecord;
  className?: string;
}

/** The region is the segment after the last comma of `place` ("Turkana, Kenya" → "Kenya"). */
function regionOf(missionary?: MissionaryRecord): string {
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
    <article className={cn("flex flex-col rounded-lg border border-hair bg-card p-5 shadow-sm", className)}>
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
      <p className="flex-1 font-body text-[15px] leading-[1.55] text-muted">{request.body}</p>
      <div className="mt-4 flex items-center gap-2.5 border-t border-hair pt-3">
        {sensitive ? (
          <>
            <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-tag-pray-tint text-tag-pray">
              <ShieldCheck size={15} />
            </span>
            <div className="font-ui text-xs leading-[1.3] text-muted">
              <div className="font-semibold text-body">A Wycliffe Africa worker</div>
              <div className="flex items-center gap-1">
                <MapPin size={11} /> {regionOf(missionary)} · {request.date}
              </div>
            </div>
          </>
        ) : (
          <>
            <Avatar name={missionary?.name ?? "Wycliffe Africa"} size={32} />
            <div className="font-ui text-xs leading-[1.3] text-muted">
              <div className="font-semibold text-body">{missionary?.name ?? "Wycliffe Africa"}</div>
              <div className="flex items-center gap-1">
                <MapPin size={11} /> {missionary?.place ?? "Africa"} · {request.date}
              </div>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
