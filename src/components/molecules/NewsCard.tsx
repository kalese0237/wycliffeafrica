import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/components/atoms/Tag";
import { Avatar } from "@/components/atoms/Avatar";
import { cn } from "@/lib/cn";
import type { PublicNewsRecord } from "@/lib/directus/schema";

const CATEGORY_LABEL: Record<PublicNewsRecord["category"], string> = {
  story: "Story",
  update: "Missionary update",
  project: "Project update",
};

export interface NewsCardProps {
  item: PublicNewsRecord;
  /** Missionary display name for `update` posts — falls back to `item.author` otherwise. */
  authorName?: string;
  className?: string;
}

/** Unified card for the News feed — renders a story, missionary update, or project post. */
export function NewsCard({ item, authorName, className }: NewsCardProps) {
  const author = item.category === "update" ? authorName ?? "Wycliffe Africa" : item.author;
  const tagLabel = item.tagLabel ?? CATEGORY_LABEL[item.category];

  return (
    <Link href={`/news/${item.slug}`} className="block h-full">
      <article
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-lg border border-hair bg-card shadow-sm transition-[box-shadow,transform] duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-md",
          className,
        )}
      >
        <div
          className={cn(
            "relative h-[172px]",
            !item.image && "bg-linear-to-br from-green-200 to-paper-2",
          )}
        >
          {item.image && <Image src={`/media/${item.image}`} alt="" fill className="object-cover" />}
          <div className="absolute left-4 top-4">
            <Tag journey={item.journey ?? "stories"}>{tagLabel}</Tag>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="font-display text-lg font-semibold leading-snug text-strong">{item.title}</h3>
          {item.excerpt && <p className="flex-1 font-body text-base leading-[1.5] text-muted">{item.excerpt}</p>}
          {(author || item.place || item.date) && (
            <div className="mt-2 flex items-center gap-3">
              {author && <Avatar name={author} size={30} />}
              <div className="font-ui text-sm leading-[1.3] text-muted">
                {author && <div className="font-semibold text-body">{author}</div>}
                <div>{[item.place, item.date].filter(Boolean).join(" · ")}</div>
              </div>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
