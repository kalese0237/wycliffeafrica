import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/components/atoms/Tag";
import { Avatar } from "@/components/atoms/Avatar";
import { PhotoPlaceholder } from "@/components/molecules/PhotoPlaceholder";
import { cn } from "@/lib/cn";
import type { PublicNewsRecord } from "@/lib/directus/schema";

const CATEGORY_LABEL: Record<PublicNewsRecord["category"], string> = {
  story: "Story",
  update: "Missionary update",
  project: "Project",
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
    <Link
      href={`/news/${item.slug}`}
      className="block h-full rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)"
    >
      <article
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-lg border border-hair bg-card shadow-sm transition-[box-shadow,transform] duration-220 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-md",
          className,
        )}
      >
        <div className="relative h-[172px]">
          {item.image ? (
            <Image src={`/media/${item.image}`} alt="" fill className="object-cover" />
          ) : (
            <PhotoPlaceholder
              caption={item.title}
              aspect="auto"
              className="absolute inset-0 rounded-none border-none shadow-none"
            />
          )}
          <div className="absolute left-4 top-4">
            <Tag journey={item.journey ?? "stories"}>{tagLabel}</Tag>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="font-display text-lg font-semibold leading-snug text-strong">{item.title}</h3>
          {item.excerpt && <p className="flex-1 font-body text-base leading-normal text-body">{item.excerpt}</p>}
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
