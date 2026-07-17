import * as React from "react";
import { notFound } from "next/navigation";
import { MissionaryProfileTemplate } from "@/components/templates";
import { getMissionaries, getMissionaryBySlug, getUpdatesForMissionary } from "@/lib/content";

/** Re-check Directus for newly published updates every 5 minutes. */
export const revalidate = 300;

export async function generateStaticParams() {
  const missionaries = await getMissionaries();
  return missionaries.map((m) => ({ slug: m.slug }));
}

export default async function MissionaryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const missionary = await getMissionaryBySlug(slug);
  if (!missionary) notFound();
  const updates = await getUpdatesForMissionary(missionary.id);

  return <MissionaryProfileTemplate missionary={missionary} updates={updates} />;
}
