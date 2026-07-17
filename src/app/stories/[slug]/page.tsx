import * as React from "react";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PageTemplate } from "@/components/templates";
import { Tag } from "@/components/atoms/Tag";
import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";
import { PhotoPlaceholder } from "@/components/molecules/PhotoPlaceholder";
import { getStories, getStoryBySlug } from "@/lib/content";

export async function generateStaticParams() {
  const stories = await getStories();
  return stories.map((s) => ({ slug: s.slug }));
}

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) notFound();

  return (
    <PageTemplate>
      <article className="mx-auto max-w-[760px] px-5 py-16 sm:px-6">
        <Link href="/stories" className="mb-5 inline-flex items-center gap-1.5 font-ui text-sm font-semibold text-link">
          <ArrowLeft size={15} /> All media
        </Link>
        <Tag journey={story.journey}>{story.tagLabel}</Tag>
        <h1 className="mb-3.5 mt-4 font-display text-2xl font-semibold leading-tight text-strong sm:text-3xl">
          {story.title}
        </h1>
        <div className="mb-6 flex items-center gap-2.5">
          <Avatar name={story.author} size={36} />
          <span className="font-ui text-sm text-muted">
            <b className="text-body">{story.author}</b> · {story.place} · {story.date}
          </span>
        </div>
        <PhotoPlaceholder caption={story.place} aspect="16/9" />
        <div className="mt-6 flex flex-col gap-4 font-body text-md leading-relaxed text-body">
          {(story.body ?? [story.excerpt]).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <div className="mt-8 flex gap-3 border-t border-hair pt-6">
          <Button href="/give" variant="accent">
            Support this work
          </Button>
          <Button href="/stories" variant="secondary">
            More stories
          </Button>
        </div>
      </article>
    </PageTemplate>
  );
}
