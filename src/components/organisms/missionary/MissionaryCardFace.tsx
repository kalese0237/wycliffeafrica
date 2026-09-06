import * as React from "react";
import Image from "next/image";
import { PortraitTile } from "@/components/molecules/PortraitTile";
import { Rubric } from "@/components/molecules/Rubric";

export interface MissionaryCardFaceProps {
  name: string;
  place: string;
  roles: string;
  /** Portrait file id (4:5). */
  image?: string | null;
  /** Landscape household photograph (16:9). Its presence chooses the opening. */
  familyImage?: string | null;
  /** Names the people in the family photograph. Omitted rather than invented. */
  familyCaption?: string | null;
}

const PORTRAIT_SIZES = "(min-width: 1280px) 252px, (min-width: 1024px) 204px, 204px";

/**
 * The face of the prayer card — the profile's opening, in one of two forms.
 *
 * Both forms are the same two-column grid — type block bigger and flexible on the left, portrait
 * smaller and fixed-width on the right — and only the ground behind that grid changes. A missionary
 * with a household photograph gets it full-bleed behind the grid, because a supporter praying for the
 * Otienos is praying for four people, not one face; the portrait still gets its own column on top of
 * it, so the family photo carries both images at once. A missionary without one gets the terra-900
 * masthead behind the same grid instead, which is what a single worker's prayer card looks like in the
 * hand. Same columns, same rubric row (place only, no affiliation label — that's carried by the
 * "Wycliffe Africa" wordmark in the header above, not repeated here), same folio either way, so the
 * two openings read as one card stock rather than two templates.
 *
 * The text column caps at a fixed measure (`max-w-2xl`) rather than stretching to meet the portrait
 * column, so a short roles line and a long one still end at the same edge instead of each wrapping
 * wherever their own words happen to run out.
 *
 * The name's final word is set in terra-300 italic, matching the About family's H1 treatment; for a
 * couple ("Frans & Lilian Barah") that lands on the surname, which is the shared half of the name.
 */
export function MissionaryCardFace({
  name,
  place,
  roles,
  image,
  familyImage,
  familyCaption,
}: MissionaryCardFaceProps) {
  const words = name.trim().split(/\s+/);
  // The ampersand is bound to both neighbours so a two-name H1 can only break before the surname.
  // Left free it orphans as "Samuel &" / "Grace Otieno", which reads the surname as Grace's alone.
  const lead = words.slice(0, -1).join(" ").replace(/ & /g, " & ");
  const tail = words[words.length - 1];

  const heading = (
    <h1 className="wonk max-w-[26ch] text-balance font-display text-2xl font-normal leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
      {lead ? `${lead} ` : ""}
      <em className="italic text-terra-300">{tail}</em>
    </h1>
  );

  const rolesLine = (
    <p className="mt-3 font-body text-sm leading-relaxed text-terra-100 sm:text-base">{roles}</p>
  );

  // The grid track only needs to exist when there's a portrait column to give it; without an
  // image, the text column may as well take the whole row rather than leave a dead-width gutter.
  const gridCols = image
    ? "grid-cols-1 lg:grid-cols-[1fr_204px] xl:grid-cols-[1fr_252px] lg:gap-8 xl:gap-10"
    : "grid-cols-1";

  if (familyImage) {
    return (
      <section className="relative bg-terra-900 sm:flex sm:min-h-88.5 sm:items-end sm:overflow-hidden lg:min-h-103.5">
        {/*
          One image element, two compositions. On a phone the frame sits in the flow at its own 16:9
          and the type block follows it on solid terra-900 — a household photograph cropped to a 440px
          tall band loses the very people the page is about, and type over the thinnest part of a
          scrim measured 2.45:1 there. From sm up the same frame goes absolute and the grid below
          returns to the bottom-left of a full-bleed card face, where the scrim is built for it.
        */}
        <div className="relative aspect-video w-full sm:absolute sm:inset-0 sm:aspect-auto sm:h-full">
          <Image
            src={`/media/${familyImage}`}
            /* The visible caption names who is pictured; where there is none, describe the frame
               rather than assert a household the record never stated. */
            alt={familyCaption ? "" : `Photograph of ${name}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "50% 38%" }}
          />
          <div
            aria-hidden
            className="absolute inset-0 hidden bg-[linear-gradient(to_top,rgba(42,20,10,0.96)_0%,rgba(42,20,10,0.82)_40%,rgba(42,20,10,0.34)_74%,rgba(42,20,10,0.45)_100%)] sm:block"
          />
        </div>
        {/* Same two-column grid as the masthead below — text bigger and flexible, portrait smaller
            and fixed — just floated over the photograph instead of the solid terra-900 ground. */}
        <div
          className={`relative z-10 mx-auto grid w-full max-w-(--container-max) items-center gap-6 px-5 py-7 sm:px-12 sm:pb-8 sm:pt-14 ${gridCols}`}
        >
          <div className="max-w-2xl">
            <Rubric label={place} onPhoto />
            {heading}
            {rolesLine}
            {familyCaption && (
              <p className="mt-4 border-t border-terra-100/35 pt-3.5 font-ui text-xs font-semibold uppercase tracking-caps text-terra-100">
                {familyCaption}
              </p>
            )}
          </div>
          {image && <PortraitTile image={image} name={name} sizes={PORTRAIT_SIZES} />}
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-terra-900 sm:flex sm:min-h-88.5 sm:items-center lg:min-h-103.5">
      {/* Faint column rules — the masthead texture the About family established. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[repeating-linear-gradient(to_right,transparent_0px,transparent_91px,rgba(243,217,196,0.09)_91px,rgba(243,217,196,0.09)_92px)]"
      />
      {/* Always two columns here — unlike the family-photo opening, this one never has a photo of
          its own to fall back to full-width, so the portrait column (its placeholder standing in for
          a missing file) is a constant, not conditional on `image`. */}
      <div className="relative z-10 mx-auto grid w-full max-w-(--container-max) grid-cols-1 items-center gap-6 px-5 py-10 sm:px-12 sm:py-12 lg:grid-cols-[1fr_204px] lg:gap-8 xl:grid-cols-[1fr_252px] xl:gap-10">
        <div className="max-w-2xl">
          <Rubric label={place} />
          {heading}
          {rolesLine}
        </div>
        <PortraitTile image={image} name={name} sizes={PORTRAIT_SIZES} priority />
      </div>
    </section>
  );
}
