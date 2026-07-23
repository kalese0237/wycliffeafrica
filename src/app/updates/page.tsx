import { Suspense } from "react";
import { PageTemplate } from "@/components/templates";
import { UpdatesGrid } from "@/components/organisms/UpdatesGrid";
import { getUpdates, getMissionaries } from "@/lib/content";

export const metadata = {
  title: "Updates from the Field | Wycliffe Africa",
};

/** Re-check Directus for newly published updates every 5 minutes. */
export const revalidate = 300;

export default async function UpdatesPage() {
  const [updates, missionaries] = await Promise.all([getUpdates(), getMissionaries()]);
  const authorNames = Object.fromEntries(missionaries.map((m) => [m.id, m.name]));
  // UpdatesGrid is a client component, so its props reach the browser. Strip
  // the missionary link from sensitive items here so the identity is never
  // serialized — the card renders them anonymized.
  const safeUpdates = updates.map((u) => (u.sensitive ? { ...u, missionaryId: "" } : u));

  return (
    <PageTemplate heroTitle="Updates from the Field">
      <section className="mx-auto max-w-[var(--container-max)] px-5 py-16 sm:px-12">
        <Suspense fallback={<div className="min-h-[320px]" aria-label="Loading updates" />}>
          <UpdatesGrid updates={safeUpdates} authorNames={authorNames} />
        </Suspense>
      </section>
    </PageTemplate>
  );
}
