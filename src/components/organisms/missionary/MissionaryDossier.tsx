import * as React from "react";
import Image from "next/image";
import { PhotoPlaceholder } from "@/components/molecules/PhotoPlaceholder";
import { PartnerCallout } from "@/components/molecules/PartnerCallout";

export interface MissionaryDossierProps {
  name: string;
  /** Set as the portrait's folio — where the picture was made, not the name again. */
  place: string;
  bio: string[];
  /** Portrait file id. Rendered here only when the family photograph took the opening. */
  portrait?: string | null;
  /** True when the opening was the family photograph, so the portrait is still unplaced. */
  showPortrait: boolean;
  /** Direct contact address for the partner callout's "Send a greeting" link. */
  email?: string | null;
}

/**
 * The reverse of the card: the story.
 *
 * The card turns over in the ground, not in a heading — sunk `paper-1` between hairlines, where
 * everything above and below it sits on the page's cream. That is the one physical move the thesis
 * asks for, and it costs no copy.
 *
 * The block starts on the container's own left edge, the same edge as the back link, the section
 * heads and the closing band. An earlier revision centred it in the band; at 1440px that put the
 * prose in the middle of the page sharing a left edge with nothing, which reads as an orphaned
 * column between two voids rather than as a page. DESIGN.md's shared left edge is the whole point of
 * the document grammar, and the reverse is not the place to break it.
 *
 * The prose centres against the portrait rather than topping out beside it: at 420px the plate is
 * taller than most bios, and top-alignment pools the whole difference into one void beneath the
 * text. Centred, the leftover splits and the two columns read as a spread.
 *
 * There is deliberately no fact rail here. Field and ministry are already set twice on the face — in
 * the rubric row and the roles line — and a labelled table restating them one scroll later is
 * length, not information.
 */
export function MissionaryDossier({ name, place, bio, portrait, showPortrait, email }: MissionaryDossierProps) {
  const firstName = name.split(" ")[0];

  return (
    <section className="border-y border-hair bg-sunk">
      <div className="mx-auto max-w-(--container-max) px-5 py-12 sm:px-12 sm:py-14">
        <div
          className={
            showPortrait
              ? "grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:gap-14"
              : "grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-14"
          }
        >
          <div className="min-w-0 space-y-5">
            {bio.map((paragraph, i) => (
              <p
                key={i}
                className="max-w-[68ch] font-body text-base leading-relaxed text-body sm:text-md"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {showPortrait && (
            /* A figure, not decoration beside prose: the folio carries where the portrait was made.
               It does not repeat the name — the H1 set that at 76px a screen above — and it follows
               the story on a phone, where the household photograph has just been shown at full width
               and a second frame ahead of the first sentence reads as a false start. */
            <figure className="w-full max-w-[420px]">
              {portrait ? (
                <div className="relative aspect-4/5 overflow-hidden rounded-md border border-hair bg-card shadow-md">
                  <Image
                    src={`/media/${portrait}`}
                    alt={`${name}, portrait`}
                    fill
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <PhotoPlaceholder
                  caption={`${name}, portrait`}
                  person={name}
                  aspect="4/5"
                  className="rounded-md"
                />
              )}
              <figcaption className="mt-3 font-ui text-xs font-semibold uppercase tracking-caps text-faint">
                {place}
              </figcaption>
            </figure>
          )}

          {!showPortrait && (
            /* No portrait to fill this column — it was already tipped in on the card face — so the
               support ask takes the space instead of leaving it empty. */
            <PartnerCallout firstName={firstName} email={email} className="lg:max-w-90" />
          )}
        </div>
      </div>
    </section>
  );
}
