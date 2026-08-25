import * as React from "react";
import Image from "next/image";
import { initials, type BoardMember } from "@/content/about";

export interface BoardMemberCardProps {
  member: BoardMember;
}

/**
 * One board member.
 *
 * Wycliffe Africa has supplied names only, so the portrait slot is a designed placeholder rather than
 * an empty box: a monogram tile in the terra tints, stamped "Portrait pending". It holds the exact
 * square the real photograph will occupy, so dropping a `photo` into `BOARD` swaps the image in with
 * no relayout and no visual surprise. The same applies to `role` and `bio`.
 */
export function BoardMemberCard({ member }: BoardMemberCardProps) {
  const { name, role, bio, photo } = member;

  return (
    <li className="flex flex-col overflow-hidden rounded-md border border-hair bg-card shadow-sm">
      <div className="relative aspect-square border-b border-hair bg-[linear-gradient(140deg,var(--color-terra-050),var(--color-paper-2))]">
        {photo ? (
          <Image src={photo} alt={`Portrait of ${name}`} fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
        ) : (
          <>
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center font-display text-2xl font-semibold text-terra-300"
            >
              {initials(name)}
            </span>
            <span className="absolute inset-x-0 bottom-2.5 text-center font-ui font-semibold text-[9px] uppercase tracking-caps text-faint">
              Portrait pending
            </span>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h3 className="font-display text-md font-semibold leading-snug text-strong">{name}</h3>
        {/* mt-auto keeps every role line on one baseline across the row when a name wraps. */}
        <p className="mt-auto pt-1.5 font-body text-sm italic text-faint">{role ?? "Role to be confirmed"}</p>
        {bio && <p className="mt-2.5 font-body text-sm leading-relaxed text-muted">{bio}</p>}
      </div>
    </li>
  );
}
