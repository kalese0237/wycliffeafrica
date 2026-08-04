import * as React from "react";
import { notFound } from "next/navigation";
import { InternProfileTemplate } from "@/components/templates";
import { getInterns, getInternBySlug } from "@/lib/content";

/** Re-check content for profile changes every 5 minutes. */
export const revalidate = 300;

export async function generateStaticParams() {
  const interns = await getInterns();
  return interns.map((i) => ({ slug: i.slug }));
}

export default async function InternDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const intern = await getInternBySlug(slug);
  if (!intern) notFound();

  return <InternProfileTemplate intern={intern} />;
}
