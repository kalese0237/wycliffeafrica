import * as React from "react";
import Image from "next/image";
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
        "group relative flex flex-col overflow-hidden rounded-lg border border-hair bg-card shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-primary-border hover:shadow-lg",
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 z-10 h-1 bg-accent" aria-hidden />
      {m.image ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-sunk">
          <Image src={`/media/${m.image}`} alt={`${m.name} portrait`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        </div>
      ) : (
        <PhotoPlaceholder caption={`${m.name} portrait`} aspect="16/10" className="rounded-none border-none shadow-none" />
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div>
          <div className="mb-2 flex items-center gap-1.5 font-ui text-xs font-bold uppercase tracking-wide text-green-700">
            <MapPin size={13} /> {m.place}
          </div>
          <h3 className="font-display text-lg font-semibold leading-snug text-strong">{m.name}</h3>
        </div>
        <div className="mt-1 font-ui text-sm font-medium leading-snug text-faint">{m.roles}</div>
        <p className="mt-4 flex-1 border-t border-hair pt-4 font-body text-base leading-relaxed text-muted">{m.intro}</p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Button href={`/missionaries/${m.slug}`} variant="secondary" size="sm" iconRight={<ArrowRight size={14} />} className="flex-1">
            View profile
          </Button>
          <Button href="/give" variant="accent" size="sm" iconLeft={<Heart size={14} />} className="flex-1">
            Support
          </Button>
        </div>
      </div>
    </article>
  );
}
