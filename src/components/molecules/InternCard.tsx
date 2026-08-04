import * as React from "react";
import Image from "next/image";
import { ArrowRight, GraduationCap, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { PhotoPlaceholder } from "@/components/molecules/PhotoPlaceholder";
import { cn } from "@/lib/cn";
import type { InternRecord } from "@/lib/directus/schema";

export interface InternCardProps {
  intern: InternRecord;
  className?: string;
}

/** Directory card for an intern — portrait, location, role, intro, profile + support actions. */
export function InternCard({ intern: i, className }: InternCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-hair bg-card shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-primary-border hover:shadow-lg",
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 z-10 h-1 bg-primary" aria-hidden />
      {i.image ? (
        <div className="relative aspect-16/10 overflow-hidden bg-sunk">
          <Image src={`/media/${i.image}`} alt={`${i.name} portrait`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        </div>
      ) : (
        <PhotoPlaceholder caption={`${i.name} portrait`} person={i.name} aspect="16/10" className="rounded-none border-none shadow-none" />
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div>
          {/* Place and role sit under the name: they are metadata about the
              person, and above it they read as a kicker introducing the heading. */}
          <h3 className="font-display text-lg font-semibold leading-snug text-strong">{i.name}</h3>
          <div className="mt-1.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 font-ui text-xs font-bold uppercase tracking-wide text-green-700">
              <MapPin size={13} /> {i.place}
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-sunk px-2.5 py-0.5 font-ui text-[11px] font-bold uppercase tracking-wide text-faint">
              <GraduationCap size={12} /> Intern
            </span>
          </div>
        </div>
        <div className="mt-1 font-ui text-sm font-medium leading-snug text-faint">{i.roles}</div>
        <p className="mt-4 flex-1 border-t border-hair pt-4 font-body text-base leading-relaxed text-body">{i.intro}</p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Button href={`/interns/${i.slug}`} variant="secondary" size="sm" iconRight={<ArrowRight size={14} />} className="flex-1">
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
