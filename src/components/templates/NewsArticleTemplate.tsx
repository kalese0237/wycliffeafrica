import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, HandHeart } from "lucide-react";
import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";
import { Tag } from "@/components/atoms/Tag";
import { EditorialImage } from "@/components/molecules/EditorialImage";
import { PhotoPlaceholder } from "@/components/molecules/PhotoPlaceholder";
import { PrayerRequestCard } from "@/components/molecules/PrayerRequestCard";
import { PageTemplate } from "@/components/templates/PageTemplate";
import type {
  PublicFieldUpdateRecord,
  PublicMissionaryRecord,
  PublicNewsRecord,
} from "@/lib/directus/schema";

const CATEGORY_LABEL = {
  story: "Story",
  update: "Missionary update",
  project: "Project update",
} as const;

function readingMinutes(paragraphs: string[]): number {
  const words = paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export interface NewsArticleTemplateProps {
  item: PublicNewsRecord;
  missionary?: PublicMissionaryRecord;
  prayers?: PublicFieldUpdateRecord[];
}

/** Public news-article composition; route pages supply resolved CMS data only. */
export function NewsArticleTemplate({
  item,
  missionary,
  prayers = [],
}: NewsArticleTemplateProps) {
  const author = item.category === "update" ? missionary?.name ?? "Wycliffe Africa" : item.author;
  const hasBody = Boolean(item.body?.length);
  const paragraphs = item.body?.length ? item.body : [item.excerpt];
  const meta = [item.place, item.date, `${readingMinutes(paragraphs)} min read`]
    .filter(Boolean)
    .join(" · ");

  return (
    <PageTemplate>
      <article className="mx-auto max-w-[760px] px-5 py-16 sm:px-6">
        <Link href="/news" className="mb-5 inline-flex items-center gap-1.5 font-ui text-sm font-semibold text-link">
          <ArrowLeft size={15} /> All news
        </Link>
        <Tag journey={item.journey ?? "stories"}>{item.tagLabel ?? CATEGORY_LABEL[item.category]}</Tag>
        <h1 className="mb-3.5 mt-4 font-display text-2xl font-semibold leading-tight text-strong sm:text-3xl">
          {item.title}
        </h1>
        {hasBody && <p className="mb-5 font-body text-lg leading-snug text-body">{item.excerpt}</p>}

        <div className="mb-6 flex items-center gap-2.5">
          {author && <Avatar src={missionary?.image ?? undefined} name={author} size={36} />}
          <span className="font-ui text-sm text-muted">
            {author && <b className="text-body">{author}</b>}
            {author && " · "}
            {meta}
          </span>
        </div>

        {item.image ? (
          <EditorialImage imageId={item.image} alt={item.title} caption={item.place} priority />
        ) : (
          <PhotoPlaceholder caption={item.place ?? item.title} aspect="16/9" />
        )}

        <div className="mt-6 flex flex-col gap-4 font-body text-md leading-relaxed text-body">
          {paragraphs.map((paragraph, index) => {
            const imageAfter = Math.min(1, paragraphs.length - 1);
            return (
              <React.Fragment key={`${index}-${paragraph.slice(0, 24)}`}>
                <p>{paragraph}</p>
                {index === 0 && item.pullQuote && (
                  <blockquote className="my-2 border-l-4 border-primary bg-sunk py-4 pl-5 pr-4 font-display text-xl font-medium italic leading-snug text-primary-hover">
                    {item.pullQuote}
                  </blockquote>
                )}
                {index === imageAfter && item.inlineImage && (
                  <EditorialImage
                    imageId={item.inlineImage}
                    alt={item.inlineImageCaption ?? `${item.title} field photo`}
                    caption={item.inlineImageCaption}
                    aspect="3/2"
                    className="my-2"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {prayers.length > 0 && (
          <section className="mt-10 border-t border-hair pt-8">
            <h2 className="mb-4 inline-flex items-center gap-2 font-ui text-sm font-bold uppercase tracking-caps text-muted">
              <HandHeart size={15} className="text-tag-pray" /> Pray with{" "}
              {missionary?.name?.split(" ")[0] ?? "this missionary"}
            </h2>
            <div className="flex flex-col gap-4">
              {prayers.map((request) => (
                <PrayerRequestCard key={request.id} request={request} missionary={missionary} />
              ))}
            </div>
          </section>
        )}

        {missionary && (
          <aside className="mt-10 flex flex-col gap-4 rounded-lg border border-hair bg-sunk p-6 shadow-sm sm:flex-row sm:items-start sm:gap-5">
            <Avatar src={missionary.image ?? undefined} name={missionary.name} size={56} />
            <div className="min-w-0">
              <h3 className="font-display text-lg font-semibold text-strong">{missionary.name}</h3>
              <p className="mb-2 font-ui text-xs font-semibold uppercase tracking-wide text-muted">
                {missionary.roles} · {missionary.place}
              </p>
              <p className="font-body text-base leading-[1.55] text-body">{missionary.intro}</p>
              <Link
                href={`/missionaries/${missionary.slug}`}
                className="mt-3 inline-flex items-center gap-1.5 font-ui text-sm font-semibold text-link"
              >
                Read {missionary.name.split(" ")[0]}&rsquo;s story <ArrowRight size={15} />
              </Link>
            </div>
          </aside>
        )}

        <div className="mt-8 flex gap-3 border-t border-hair pt-6">
          <Button href="/give" variant="accent">Support this work</Button>
          <Button href="/news" variant="secondary">More news</Button>
        </div>
      </article>
    </PageTemplate>
  );
}
