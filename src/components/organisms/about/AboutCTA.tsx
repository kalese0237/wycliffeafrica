import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/cn";

export interface AboutCTAProps {
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  image?: string;
  imageAlt?: string;
  /** Drops the top margin where the band follows a section that already owns its own ground. */
  flush?: boolean;
}

/**
 * The close every About page shares: a photographic band under a heavy left-weighted scrim, with the
 * next step matched to whoever was reading. The scrim runs to 78% opacity even at its lightest point
 * because the team photograph is busy across its full width — a conventional 50% fade left the
 * buttons sitting on faces.
 */
export function AboutCTA({
  title,
  body,
  primary,
  secondary,
  image = "/Missionaries/wycliffe-africa-team.webp",
  imageAlt = "The Wycliffe Africa team gathered together",
  flush = false,
}: AboutCTAProps) {
  return (
    <section className={cn(
        "relative flex min-h-[300px] items-center overflow-hidden bg-terra-900",
        !flush && "mt-20 sm:mt-24",
      )}>
      {/* Eager, not lazy: this band is full-bleed, and a lazy image leaves the whole close painted
          flat terra until it arrives. The asset is one small webp already shared across the family. */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        loading="eager"
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "50% 40%" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(42,20,10,0.97)_0%,rgba(42,20,10,0.9)_55%,rgba(42,20,10,0.78)_100%)]"
      />
      <div className="relative z-10 mx-auto flex w-full max-w-(--container-max) flex-col gap-8 px-5 py-14 sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div>
          <h2 className="max-w-[18ch] text-balance font-display text-xl font-normal leading-snug text-white sm:text-2xl">
            {title}
          </h2>
          <p className="mt-3.5 max-w-[50ch] font-body text-base leading-relaxed text-terra-100 sm:text-md">{body}</p>
        </div>
        <div className="flex flex-none flex-wrap gap-3.5">
          <Button href={primary.href} variant="accent">
            {primary.label}
          </Button>
          <Button
            href={secondary.href}
            variant="ghost"
            className="border-white/50 text-white hover:bg-white/10"
          >
            {secondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
