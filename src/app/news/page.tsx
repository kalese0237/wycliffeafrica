import { Suspense } from "react";
import { PageTemplate } from "@/components/templates";
import { NewsGrid } from "@/components/organisms/NewsGrid";
import { NewsTopicsHero } from "@/components/organisms/NewsTopicsHero";
import { getNews, getMissionaries } from "@/lib/content";

export const metadata = {
  title: "News | Wycliffe Africa",
};

/** Re-check Directus for newly published news every 5 minutes. */
export const revalidate = 300;

export default async function NewsPage() {
  const [items, missionaries] = await Promise.all([getNews(), getMissionaries()]);
  const authorNames = Object.fromEntries(missionaries.map((m) => [m.id, m.name]));

  return (
    <PageTemplate>
      <Suspense fallback={<div className="min-h-[520px] bg-sunk" aria-label="Loading news topics" />}>
        <NewsTopicsHero />
      </Suspense>
      <section className="mx-auto max-w-(--container-max) px-5 py-16 sm:px-12 sm:py-20">
        <Suspense fallback={<div className="min-h-[320px]" aria-label="Loading news" />}>
          <NewsGrid items={items} authorNames={authorNames} />
        </Suspense>
      </section>
    </PageTemplate>
  );
}
