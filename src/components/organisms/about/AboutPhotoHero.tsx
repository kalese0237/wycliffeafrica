import * as React from "react";
import Image from "next/image";

export interface AboutPhotoHeroProps {
  /** Leading plain words of the H1. */
  title: string;
  /** The emphasised tail of the H1, set in Fraunces italic. */
  titleAccent: string;
  standfirst: string;
  image: string;
  imageAlt: string;
  /** CSS object-position for the photograph. Defaults to a centred, slightly-high crop. */
  focalPoint?: string;
  priority?: boolean;
}

/**
 * The About family's photographic opening: a full-bleed photograph under a terra-900 scrim, with the
 * headline set bottom-left. Used by Why Bible Translation and Leadership. What We Believe deliberately
 * refuses this and opens on `AboutMasthead` instead — a photograph beside the creed is decoration.
 *
 * There is no kicker above the headline: the heading carries its own weight, and a label restating
 * the section the reader already navigated to is noise.
 *
 * The scrim is a three-stop gradient rather than a flat overlay so the top of the frame keeps its
 * image while the type sits on near-solid ground; white text over photography needs the contrast to be
 * built into the scrim, not hoped for from the crop.
 */
export function AboutPhotoHero({
  title,
  titleAccent,
  standfirst,
  image,
  imageAlt,
  focalPoint = "50% 42%",
  priority = true,
}: AboutPhotoHeroProps) {
  return (
    <section className="relative flex min-h-[420px] items-end overflow-hidden bg-terra-900 sm:min-h-[520px] lg:min-h-[600px]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: focalPoint }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(42,20,10,0.94)_0%,rgba(42,20,10,0.72)_38%,rgba(42,20,10,0.18)_74%,rgba(42,20,10,0.35)_100%)]"
      />
      <div className="relative z-10 mx-auto w-full max-w-(--container-max) px-5 pb-12 pt-24 sm:px-12 sm:pb-16">
        <h1 className="wonk max-w-[16ch] text-balance font-display text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl lg:text-[76px]">
          {title} <em className="italic">{titleAccent}</em>
        </h1>
        <p className="mt-5 max-w-[60ch] font-body text-md leading-relaxed text-terra-100 sm:text-lg">
          {standfirst}
        </p>
      </div>
    </section>
  );
}
