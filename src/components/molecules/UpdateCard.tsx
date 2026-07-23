import * as React from "react";
import Image from "next/image";
import { Newspaper, HandHeart, ShieldCheck } from "lucide-react";
import { Avatar } from "@/components/atoms/Avatar";
import { PhotoPlaceholder } from "@/components/molecules/PhotoPlaceholder";
import { cn } from "@/lib/cn";
import type { FieldUpdateRecord } from "@/lib/directus/schema";

export interface UpdateCardProps {
  update: FieldUpdateRecord;
  authorName: string;
  className?: string;
}

/**
 * Field-update / prayer-request card — badge, title, excerpt, missionary
 * byline. Sensitive items ignore `authorName` and render anonymized.
 */
export function UpdateCard({ update, authorName, className }: UpdateCardProps) {
  const isPrayer = update.type === "prayer";
  const sensitive = Boolean(update.sensitive);
  return (
    <article className={cn("flex flex-col overflow-hidden rounded-lg border border-hair bg-card shadow-sm", className)}>
      {!isPrayer && (
        update.image ? (
          <div className="relative aspect-video overflow-hidden bg-sunk">
            <Image src={`/media/${update.image}`} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
          </div>
        ) : (
          <PhotoPlaceholder caption={update.title} aspect="16/9" className="rounded-none border-none shadow-none" />
        )
      )}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <span
          className={cn(
            "inline-flex w-fit items-center gap-1.5 rounded-pill px-3 py-1 font-ui text-xs font-bold uppercase tracking-wide",
            isPrayer ? "bg-tag-pray-tint text-tag-pray" : "bg-tag-give-tint text-tag-give",
          )}
        >
          {isPrayer ? <HandHeart size={13} /> : <Newspaper size={13} />}
          {isPrayer ? "Prayer request" : "Field update"}
        </span>
        <h3 className="font-display text-lg font-semibold leading-snug text-strong">{update.title}</h3>
        <p className="flex-1 font-body text-base leading-[1.55] text-muted">{update.body}</p>
        <div className="mt-1.5 flex items-center gap-2.5 border-t border-hair pt-3">
          {sensitive ? (
            <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-tag-pray-tint text-tag-pray">
              <ShieldCheck size={15} />
            </span>
          ) : (
            <Avatar name={authorName} size={32} />
          )}
          <div className="font-ui text-xs leading-[1.3] text-muted">
            <div className="font-semibold text-body">
              {sensitive ? "A Wycliffe Africa worker" : authorName}
            </div>
            <div>{update.date}</div>
          </div>
        </div>
      </div>
    </article>
  );
}
