import * as React from "react";
import { MapPin, ArrowRight, Heart } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { Button } from "@/components/atoms/Button";
import { PhotoPlaceholder } from "@/components/molecules/PhotoPlaceholder";
import { getMissionaries } from "@/lib/content";

export const metadata = {
  title: "Our Missionaries — Wycliffe Africa",
};

export default async function MissionariesPage() {
  const missionaries = await getMissionaries();

  return (
    <PageTemplate heroTitle="Our Missionaries">
      <section className="mx-auto max-w-[var(--container-max)] px-5 py-16 sm:px-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {missionaries.map((m) => (
            <article key={m.id} className="flex flex-col overflow-hidden rounded-lg border border-hair bg-card shadow-sm">
              <PhotoPlaceholder caption="Portrait" aspect="4/3" className="rounded-none border-none shadow-none" />
              <div className="flex flex-1 flex-col gap-2.5 p-5">
                <div>
                  <h3 className="mb-1 font-display text-lg font-semibold text-strong">{m.name}</h3>
                  <div className="flex items-center gap-1.5 font-ui text-xs font-bold uppercase tracking-wide text-green-700">
                    <MapPin size={13} /> {m.place}
                  </div>
                </div>
                <div className="font-ui text-[13px] text-faint">{m.roles}</div>
                <p className="flex-1 font-body text-[15px] leading-[1.55] text-muted">{m.intro}</p>
                <div className="mt-1.5 flex gap-2.5">
                  <Button href={`/missionaries/${m.slug}`} variant="secondary" size="sm" iconRight={<ArrowRight size={14} />}>
                    Read more
                  </Button>
                  <Button href="/give" variant="accent" size="sm" iconLeft={<Heart size={14} />}>
                    Support
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageTemplate>
  );
}
