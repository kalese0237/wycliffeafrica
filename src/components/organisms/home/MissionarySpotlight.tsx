import * as React from "react";
import { ArrowRight, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { PhotoPlaceholder } from "@/components/molecules/PhotoPlaceholder";
import { getMissionaries } from "@/lib/content";

/** Highlights one missionary on the homepage. Picks the first record from Directus — swap for a `featured` field if specific curation is needed. */
export async function MissionarySpotlight() {
  const missionaries = await getMissionaries();
  const missionary = missionaries[0];
  if (!missionary) return null;

  const firstName = missionary.name.split(" ")[0];

  return (
    <section className="border-y border-hair bg-sunk">
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 items-center gap-10 px-5 py-20 sm:px-12 lg:grid-cols-2 lg:gap-16">
        <PhotoPlaceholder caption="Portrait" aspect="4/3" />
        <div>
          <div className="font-ui text-xs font-bold uppercase tracking-caps text-green-700">
            Missionary Spotlight
          </div>
          <h2 className="mb-1.5 mt-3 font-display text-2xl font-semibold leading-tight text-strong">
            {missionary.name}
          </h2>
          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 font-ui text-xs font-bold uppercase tracking-wide text-green-700">
              <MapPin size={13} /> {missionary.place}
            </span>
            <span className="font-ui text-[13px] text-faint">{missionary.roles}</span>
          </div>
          <p className="mb-6 font-body text-base leading-relaxed text-muted sm:text-md">{missionary.intro}</p>
          <div className="flex flex-wrap gap-3">
            <Button
              href={`/missionaries/${missionary.slug}`}
              variant="secondary"
              iconRight={<ArrowRight size={16} />}
            >
              View full profile
            </Button>
            <Button href="/give" variant="accent" iconLeft={<Heart size={16} />}>
              Support {firstName}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
