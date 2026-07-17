import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Heart } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { Button } from "@/components/atoms/Button";
import { PhotoPlaceholder } from "@/components/molecules/PhotoPlaceholder";
import { UpdateCard } from "@/components/molecules/UpdateCard";
import { getMissionaries, getMissionaryBySlug, getUpdatesForMissionary } from "@/lib/content";

export async function generateStaticParams() {
  const missionaries = await getMissionaries();
  return missionaries.map((m) => ({ slug: m.slug }));
}

export default async function MissionaryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const missionary = await getMissionaryBySlug(slug);
  if (!missionary) notFound();
  const updates = await getUpdatesForMissionary(missionary.id);

  return (
    <PageTemplate>
      <section className="mx-auto max-w-[var(--container-max)] px-5 py-16 sm:px-12">
        <Link
          href="/missionaries"
          className="mb-6 inline-flex items-center gap-1.5 font-ui text-sm font-semibold text-link"
        >
          <ArrowLeft size={15} /> All missionaries
        </Link>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <PhotoPlaceholder caption="Portrait" aspect="4/5" />
          <div>
            <h1 className="mb-2 font-display text-2xl font-semibold leading-tight text-strong sm:text-3xl">{missionary.name}</h1>
            <div className="mb-1 flex items-center gap-1.5 font-ui text-sm font-bold uppercase tracking-wide text-green-700">
              <MapPin size={15} /> {missionary.place}
            </div>
            <div className="mb-4 font-ui text-sm text-faint">{missionary.roles}</div>
            <p className="mb-6 max-w-[62ch] font-body text-md leading-relaxed text-muted">{missionary.intro}</p>
            <Button href="/give" variant="accent" iconLeft={<Heart size={16} />}>
              Support {missionary.name.split(" ")[0]}
            </Button>
          </div>
        </div>
      </section>

      {updates.length > 0 && (
        <section className="border-t border-hair bg-sunk">
          <div className="mx-auto max-w-[var(--container-max)] px-5 py-16 sm:px-12">
            <h2 className="mb-8 font-display text-2xl font-semibold text-strong">
              Latest updates &amp; prayer requests
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {updates.map((u) => (
                <UpdateCard key={u.id} update={u} authorName={missionary.name} />
              ))}
            </div>
          </div>
        </section>
      )}
    </PageTemplate>
  );
}
