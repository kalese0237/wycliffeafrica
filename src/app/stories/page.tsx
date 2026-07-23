import * as React from "react";
import { PageTemplate } from "@/components/templates";
import { StoryCard } from "@/components/molecules/StoryCard";
import { getStories } from "@/lib/content";

export const metadata = {
  title: "Media & Stories | Wycliffe Africa",
};

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <PageTemplate heroTitle="Stories, photos & video from the field">
      <section className="mx-auto max-w-[var(--container-max)] px-5 py-16 sm:px-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((s) => (
            <StoryCard
              key={s.id}
              href={`/stories/${s.slug}`}
              journey={s.journey}
              tagLabel={s.tagLabel}
              title={s.title}
              excerpt={s.excerpt}
              author={s.author}
              place={s.place}
              date={s.date}
            />
          ))}
        </div>
      </section>
    </PageTemplate>
  );
}
