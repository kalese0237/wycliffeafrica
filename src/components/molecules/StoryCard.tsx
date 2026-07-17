import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag, type Journey } from "@/components/atoms/Tag";
import { Avatar } from "@/components/atoms/Avatar";
import { cn } from "@/lib/cn";

export interface StoryCardProps {
  href?: string;
  image?: string;
  journey?: Journey;
  tagLabel?: string;
  title: string;
  excerpt?: string;
  author?: string;
  place?: string;
  date?: string;
  className?: string;
}

/** An impact story / field update card. Hover lifts the shadow. */
export function StoryCard({
  href,
  image,
  journey = "stories",
  tagLabel,
  title,
  excerpt,
  author,
  place,
  date,
  className,
}: StoryCardProps) {
  const card = (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-lg border border-hair bg-card shadow-sm transition-[box-shadow,transform] duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-md",
        href && "cursor-pointer",
        className,
      )}
    >
      <div
        className={cn(
          "relative h-[172px]",
          !image && "bg-linear-to-br from-green-200 to-paper-2",
        )}
      >
        {image && <Image src={image} alt="" fill className="object-cover" />}
        <div className="absolute left-4 top-4">
          <Tag journey={journey}>{tagLabel}</Tag>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-strong">{title}</h3>
        {excerpt && <p className="flex-1 font-body text-base leading-[1.5] text-muted">{excerpt}</p>}
        {(author || place || date) && (
          <div className="mt-2 flex items-center gap-3">
            {author && <Avatar name={author} size={30} />}
            <div className="font-ui text-sm leading-[1.3] text-muted">
              {author && <div className="font-semibold text-body">{author}</div>}
              <div>{[place, date].filter(Boolean).join(" · ")}</div>
            </div>
          </div>
        )}
      </div>
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {card}
      </Link>
    );
  }
  return card;
}
