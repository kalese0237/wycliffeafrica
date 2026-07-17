import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { UpdateCard } from "@/components/molecules/UpdateCard";
import { getUpdates, getMissionaries } from "@/lib/content";

export async function UpdatesFeed() {
  const [updates, missionaries] = await Promise.all([getUpdates(), getMissionaries()]);
  const nameById = new Map(missionaries.map((m) => [m.id, m.name]));

  return (
    <section className="mx-auto max-w-[var(--container-max)] px-5 py-20 sm:px-12">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="font-ui text-xs font-bold uppercase tracking-caps text-green-700">From the field</div>
          <h2 className="mt-2.5 font-display text-2xl font-semibold text-strong">Updates &amp; prayer requests</h2>
        </div>
        <Button href="/updates" variant="secondary" iconRight={<ArrowRight size={16} />}>
          See all updates
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {updates.slice(0, 3).map((u) => (
          <UpdateCard key={u.id} update={u} authorName={nameById.get(u.missionaryId) ?? "Wycliffe Africa"} />
        ))}
      </div>
    </section>
  );
}
