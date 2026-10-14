import * as React from "react";
import { ArrowRight } from "lucide-react";
import type { BoardMember } from "@/content/about";
import { Icon } from "@/components/atoms/Icon";
import { BoardPortrait } from "@/components/molecules/BoardPortrait";
import { boardDisplayName } from "@/lib/board";

export interface BoardMemberRowProps {
  member: BoardMember;
  /** The member's fragment. The row carries it as its id, so /about/leadership#slug lands here. */
  slug: string;
  onOpen: () => void;
}

/**
 * One entry in the board roster: portrait, name, role and country, opening the member's profile.
 *
 * The bio is in the markup but shown only in print, so a printed or forwarded page still carries every
 * profile. On screen it lives in the profile panel.
 */
export function BoardMemberRow({ member, slug, onOpen }: BoardMemberRowProps) {
  const { role, country, bio } = member;

  return (
    <li id={slug} className="reveal scroll-mt-32 border-b border-hair">
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        className="group grid w-full cursor-pointer grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-4 px-1 py-5 text-left transition-colors hover:bg-sunk focus-visible:bg-sunk sm:grid-cols-[112px_minmax(0,1fr)_auto] sm:gap-6 sm:px-3 sm:py-6"
      >
        <BoardPortrait
          member={member}
          sizes="(min-width: 640px) 112px, 72px"
          alt=""
          stamp={false}
          monogramClassName="text-lg sm:text-2xl"
        />
        <span className="flex min-w-0 flex-col">
          <span className="font-display text-lg font-semibold leading-snug text-strong transition-colors group-hover:text-primary-hover">
            {boardDisplayName(member)}
          </span>
          {role ? (
            <span className="mt-1.5 font-ui text-xs font-semibold uppercase tracking-caps text-primary-hover">
              {role}
            </span>
          ) : (
            <span className="mt-1 font-body text-sm italic text-faint">Role to be confirmed</span>
          )}
          {country && (
            <span className="mt-2 font-ui text-xs font-semibold uppercase tracking-caps text-muted">{country}</span>
          )}
        </span>
        <span
          aria-hidden
          className="flex size-8 items-center justify-center rounded-full border border-hair text-primary transition-[translate,background-color] group-hover:translate-x-0.5 group-hover:bg-primary-tint sm:size-10 print:hidden"
        >
          <Icon icon={ArrowRight} size={18} />
        </span>
      </button>

      {bio && (
        <div className="hidden pb-6 print:block">
          {bio.map((paragraph, index) => (
            <p key={index} className="mt-3 font-body text-sm leading-relaxed text-body">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </li>
  );
}
