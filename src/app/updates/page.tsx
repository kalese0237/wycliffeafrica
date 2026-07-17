import * as React from "react";
import { PageTemplate } from "@/components/templates";
import { UpdatesGrid } from "@/components/organisms/UpdatesGrid";
import { getUpdates, getMissionaries } from "@/lib/content";

export const metadata = {
  title: "Updates from the Field — Wycliffe Africa",
};

export default async function UpdatesPage() {
  const [updates, missionaries] = await Promise.all([getUpdates(), getMissionaries()]);
  const authorNames = Object.fromEntries(missionaries.map((m) => [m.id, m.name]));

  return (
    <PageTemplate heroTitle="Updates from the Field">
      <section className="mx-auto max-w-[var(--container-max)] px-5 py-16 sm:px-12">
        <UpdatesGrid updates={updates} authorNames={authorNames} />
      </section>
    </PageTemplate>
  );
}
