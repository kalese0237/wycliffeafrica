import * as React from "react";
import Image from "next/image";
import type { BoardMember } from "@/content/about";
import { boardDisplayName, boardMonogram } from "@/lib/board";
import { cn } from "@/lib/cn";

export interface BoardPortraitProps {
  member: Pick<BoardMember, "name" | "honorific" | "photo" | "photoWithheld">;
  /** `sizes` for the photograph, matched to the width the tile renders at. */
  sizes: string;
  /** Pass "" where the name is already read out beside the tile, as in a roster row. */
  alt?: string;
  /** The "Portrait pending" stamp. Off where the tile is too small to read it. */
  stamp?: boolean;
  /** Sets the tile's width; the tile is always square. */
  className?: string;
  /** Sets the monogram's type size, which scales with the tile. */
  monogramClassName?: string;
}

/**
 * A board member's square portrait.
 *
 * Without a `photo` the tile is a designed placeholder rather than an empty box: a monogram in the
 * terra tints, stamped "Portrait pending". It holds the exact square the photograph will occupy, so
 * adding a `photo` to `BOARD` swaps the image in with no relayout. With `photoWithheld` the monogram is
 * the final state, so the stamp is left off.
 */
export function BoardPortrait({ member, sizes, alt, stamp = true, className, monogramClassName }: BoardPortraitProps) {
  const { name, photo, photoWithheld } = member;

  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-md border border-hair bg-[linear-gradient(140deg,var(--color-terra-050),var(--color-paper-2))] shadow-sm",
        className,
      )}
    >
      {photo ? (
        <Image
          src={photo}
          alt={alt ?? `Portrait of ${boardDisplayName(member)}`}
          fill
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <>
          <span
            aria-hidden
            className={cn(
              "absolute inset-0 flex items-center justify-center font-display font-semibold text-terra-300",
              monogramClassName,
            )}
          >
            {boardMonogram(name)}
          </span>
          {stamp && !photoWithheld && (
            <span className="absolute inset-x-0 bottom-2.5 text-center font-ui text-[9px] font-semibold uppercase tracking-caps text-faint">
              Portrait pending
            </span>
          )}
        </>
      )}
    </div>
  );
}
