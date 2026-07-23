import * as React from "react";
import { PageTemplate } from "@/components/templates";
import { ResourceCard } from "@/components/molecules/ResourceCard";
import { getResources } from "@/lib/content";

export const metadata = {
  title: "Resources | Wycliffe Africa",
};

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <PageTemplate heroTitle="Resources">
      <section className="mx-auto max-w-[var(--container-max)] px-5 py-16 sm:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {resources.map((r) => (
            <ResourceCard key={r.id} type={r.type} title={r.title} meta={r.meta} />
          ))}
        </div>
      </section>
    </PageTemplate>
  );
}
