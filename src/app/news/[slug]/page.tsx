import { notFound } from "next/navigation";
import { NewsArticleTemplate } from "@/components/templates";
import {
  getMissionaryById,
  getNews,
  getNewsBySlug,
  getPrayerRequestsForMissionary,
} from "@/lib/content";

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

  const missionary =
    item.category === "update" && item.missionaryId
      ? await getMissionaryById(item.missionaryId)
      : undefined;
  const prayers =
    item.category === "update" && item.missionaryId
      ? (await getPrayerRequestsForMissionary(item.missionaryId)).slice(0, 2)
      : [];

  return <NewsArticleTemplate item={item} missionary={missionary} prayers={prayers} />;
}
