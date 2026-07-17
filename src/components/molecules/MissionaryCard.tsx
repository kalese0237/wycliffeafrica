import * as React from "react";
import { ArrowRight, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { PhotoPlaceholder } from "@/components/molecules/PhotoPlaceholder";
import { cn } from "@/lib/cn";
import type { MissionaryRecord } from "@/lib/directus/schema";

export interface MissionaryCardProps {
  missionary: MissionaryRecord;
  className?: string;
}

/** Directory card for a missionary — portrait, location, role, intro, profile + support actions. */
export function MissionaryCard({ missionary: m, className }: MissionaryCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border border-hair bg-card shadow-sm transition-shadow duration-200 hover:shadow-lg",
        className,
      )}
    >
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
            View profile
          </Button>
          <Button href="/give" variant="accent" size="sm" iconLeft={<Heart size={14} />}>
            Support
          </Button>
        </div>
      </div>
    </article>
  );
}
