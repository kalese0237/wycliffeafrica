import * as React from "react";
import Image from "next/image";
import { PhotoPlaceholder } from "@/components/molecules/PhotoPlaceholder";

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

/**
 * The face of the prayer card — the profile's opening, in one of two forms.
 *
 * A missionary with a household photograph opens on it, because a supporter praying for the Otienos
 * is praying for four people, not one face. A missionary without one opens on the terra-900 masthead
 * with the portrait tipped in at the right, which is what a single worker's prayer card looks like in
 * the hand. Same type block, same rubric row, same folio — only the ground changes, so the two
 * openings read as one card stock rather than two templates.
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
  const lead = words.slice(0, -1).join(" ").replace(/ & /g, " & ");
  const tail = words[words.length - 1];

  const heading = (
    <h1 className="wonk max-w-[15ch] text-balance font-display text-xl font-normal leading-tight tracking-tight text-white sm:text-2xl lg:text-[46px]">
      {lead ? `${lead} ` : ""}
      <em className="italic text-terra-300">{tail}</em>
    </h1>
  );

  /**
   * The rubric row: division label left, hairline flexing to fill, rubric right.
   *
   * Over photography the label lifts to terra-100 and the hairline to terra-100/40: terra-300 is
   * legible on solid terra-900 but not on the thinnest part of a photographic scrim.
   */
  const rubric = (onPhoto: boolean) => (
    <div className="mb-5 flex items-center gap-5 sm:mb-6">
      <span
        className={`flex-none font-ui text-xs font-semibold uppercase tracking-caps-loose ${
          onPhoto ? "text-terra-100" : "text-terra-300"
        }`}
      >
        {place}
      </span>
      <span aria-hidden className={`h-px flex-1 ${onPhoto ? "bg-terra-100/40" : "bg-terra-300/40"}`} />
      <span
        className={`flex-none font-ui text-xs font-semibold uppercase tracking-caps-loose ${
          onPhoto ? "text-terra-100" : "text-terra-300"
        }`}
      >
        Wycliffe Africa
      </span>
    </div>
  );

  const rolesLine = (
    <p className="mt-3 max-w-[52ch] font-body text-sm leading-relaxed text-terra-100 sm:text-base">
      {roles}
    </p>
  );

  if (familyImage) {
    return (
      <section className="relative bg-terra-900 sm:flex sm:min-h-81 sm:items-end sm:overflow-hidden lg:min-h-96">
        {/*
          One image element, two compositions. On a phone the frame sits in the flow at its own 16:9
          and the type block follows it on solid terra-900 — a household photograph cropped to a 440px
          tall band loses the very people the page is about, and type over the thinnest part of a
          scrim measured 2.45:1 there. From sm up the same frame goes absolute and the type block
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
        <div className="relative z-10 mx-auto w-full max-w-(--container-max) px-5 py-7 sm:px-12 sm:pb-8 sm:pt-14">
          {rubric(true)}
          {heading}
          {rolesLine}
          {familyCaption && (
            <p className="mt-4 max-w-[60ch] border-t border-terra-100/35 pt-3.5 font-ui text-xs font-semibold uppercase tracking-caps text-terra-100">
              {familyCaption}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-terra-900">
      {/* Faint column rules — the masthead texture the About family established. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[repeating-linear-gradient(to_right,transparent_0px,transparent_91px,rgba(243,217,196,0.09)_91px,rgba(243,217,196,0.09)_92px)]"
      />
      <div className="relative z-10 mx-auto grid w-full max-w-(--container-max) grid-cols-1 items-center gap-6 px-5 py-10 sm:px-12 sm:py-12 lg:grid-cols-[1fr_204px] lg:gap-8 xl:grid-cols-[1fr_252px] xl:gap-10">
        <div>
          {rubric(false)}
          {heading}
          {rolesLine}
        </div>
        {/* Tipped in, not laid out: the portrait is a discrete object on the band, so it keeps its
            corner and its shadow where the band itself has neither. */}
        <div className="w-full max-w-45 sm:max-w-51 lg:max-w-none">
          {image ? (
            <div className="relative aspect-4/5 overflow-hidden rounded-md border border-terra-300/30 bg-terra-800 shadow-lg">
              <Image
                src={`/media/${image}`}
                alt={`${name}, portrait`}
                fill
                priority
                sizes="(min-width: 1280px) 252px, (min-width: 1024px) 204px, 204px"
                className="object-cover"
              />
            </div>
          ) : (
            <PhotoPlaceholder
              caption={`${name}, portrait`}
              person={name}
              aspect="4/5"
              className="rounded-md border-terra-300/30"
            />
          )}
        </div>
      </div>
    </section>
  );
}
