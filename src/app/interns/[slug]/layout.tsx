import { notFound } from "next/navigation";
import { getInternBySlug } from "@/lib/content";

export default async function InternProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  // Checked here, above loading.tsx's Suspense boundary, so an unknown slug answers 404 before any
  // HTML streams. Inside the boundary the status is already committed as 200.
  const { slug } = await params;
  if (!(await getInternBySlug(slug))) notFound();

  return children;
}
