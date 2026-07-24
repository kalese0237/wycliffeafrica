import * as React from "react";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PageTemplate } from "@/components/templates";
import { Tag } from "@/components/atoms/Tag";
import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";
import { PhotoPlaceholder } from "@/components/molecules/PhotoPlaceholder";
import { getNews, getNewsBySlug, getMissionaries } from "@/lib/content";

const CATEGORY_LABEL = {
  story: "Story",
  update: "Missionary update",
  project: "Project update",
} as const;

export async function generateStaticParams() {
  const items = await getNews();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  return { title: item ? `${item.title} | Wycliffe Africa` : "News | Wycliffe Africa" };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) notFound();

  const author =
    item.category === "update"
      ? (await getMissionaries()).find((m) => m.id === item.missionaryId)?.name ?? "Wycliffe Africa"
      : item.author;

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
        <div className="mb-6 flex items-center gap-2.5">
          {author && <Avatar name={author} size={36} />}
          <span className="font-ui text-sm text-muted">
            {author && <b className="text-body">{author}</b>}
            {[item.place, item.date].filter(Boolean).length > 0 && (author ? " · " : "")}
            {[item.place, item.date].filter(Boolean).join(" · ")}
          </span>
        </div>
        <PhotoPlaceholder caption={item.place ?? item.title} aspect="16/9" />
        <div className="mt-6 flex flex-col gap-4 font-body text-md leading-relaxed text-body">
          {(item.body ?? [item.excerpt]).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <div className="mt-8 flex gap-3 border-t border-hair pt-6">
          <Button href="/give" variant="accent">
            Support this work
          </Button>
          <Button href="/news" variant="secondary">
            More news
          </Button>
        </div>
      </article>
    </PageTemplate>
  );
}
