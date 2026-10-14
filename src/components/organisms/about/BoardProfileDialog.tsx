"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, Check, Link as LinkIcon, X } from "lucide-react";
import type { BoardMember } from "@/content/about";
import { Icon } from "@/components/atoms/Icon";
import { BoardPortrait } from "@/components/molecules/BoardPortrait";
import { boardDisplayName } from "@/lib/board";
import { PendingNote } from "./PendingNote";

export interface BoardProfileDialogProps {
  ref: React.Ref<HTMLDialogElement>;
  member: BoardMember;
  slug: string;
  /** 1-based, for "3 of 10". */
  position: number;
  total: number;
  previous: BoardMember;
  next: BoardMember;
  onPrevious: () => void;
  onNext: () => void;
  /** Fired once the dialog has closed by any route: the close button, Escape, or the backdrop. */
  onClosed: () => void;
}

/**
 * One board member's full profile, in a native modal `<dialog>`: a side panel from `sm` up, a bottom
 * sheet below it. The dialog brings focus trapping, Escape to close, an inert page behind and focus
 * returned to the row that opened it, so none of that is reimplemented here. The owner opens and
 * closes it through `ref`.
 */
export function BoardProfileDialog({
  ref,
  member,
  slug,
  position,
  total,
  previous,
  next,
  onPrevious,
  onNext,
  onClosed,
}: BoardProfileDialogProps) {
  const { role, country, bio } = member;

  return (
    <dialog
      ref={ref}
      aria-labelledby="board-profile-name"
      onClose={onClosed}
      // A click that lands on the dialog element itself, rather than its content, is on the backdrop.
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      className="m-0 max-h-none max-w-none overflow-hidden border-0 bg-cream p-0 text-body shadow-lg backdrop:bg-[rgb(23_20_15/0.5)] inset-x-0 top-auto bottom-0 h-[88dvh] w-full rounded-t-lg translate-y-full open:translate-y-0 starting:open:translate-y-full sm:inset-y-0 sm:right-0 sm:left-auto sm:h-dvh sm:w-[640px] sm:rounded-none sm:translate-x-full sm:translate-y-0 sm:open:translate-x-0 sm:starting:open:translate-x-full sm:starting:open:translate-y-0 transition-[translate,display,overlay] transition-discrete duration-420 ease-[cubic-bezier(0,0,0.2,1)] motion-reduce:transition-none print:hidden"
    >
      <div className="flex h-full flex-col">
        <span aria-hidden className="mx-auto mt-2.5 h-1 w-10 flex-none rounded-pill bg-hair sm:hidden" />

        <div className="flex flex-none items-center justify-between border-b border-hair py-1.5 pl-5 pr-2 sm:py-3 sm:pl-10 sm:pr-4">
          <p className="font-ui text-xs font-semibold uppercase tracking-caps text-muted">
            The Board · {position} of {total}
          </p>
          <form method="dialog">
            <button
              aria-label="Close profile"
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-strong transition-colors hover:bg-paper-2"
            >
              <Icon icon={X} size={20} />
            </button>
          </form>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-8 pt-6 sm:px-10 sm:pt-8">
          <div className="flex items-center gap-5 sm:gap-8">
            <BoardPortrait
              member={member}
              sizes="(min-width: 640px) 200px, 112px"
              className="w-28 flex-none sm:w-50"
              monogramClassName="text-2xl sm:text-4xl"
            />
            <div className="min-w-0">
              <h2
                id="board-profile-name"
                className="font-display text-xl font-normal leading-tight text-strong sm:text-2xl"
              >
                {boardDisplayName(member)}
              </h2>
              <p className="mt-2.5 font-ui text-xs font-semibold uppercase tracking-caps">
                {role ? (
                  <span className="text-primary-hover">{role}</span>
                ) : (
                  <span className="font-body text-sm font-normal normal-case tracking-normal italic text-faint">
                    Role to be confirmed
                  </span>
                )}
                {country && <span className="text-muted"> · {country}</span>}
              </p>
            </div>
          </div>

          {bio ? (
            <div className="mt-6 space-y-4 border-t-2 border-primary pt-6 sm:mt-8">
              {bio.map((paragraph, index) => (
                <p key={index} className="font-body text-md leading-relaxed text-body">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <PendingNote>This profile is still to come from the office.</PendingNote>
          )}

          {/* Keyed by member so "Link copied" resets when the reader steps to the next profile. */}
          <CopyLinkButton key={slug} slug={slug} />
        </div>

        <div className="grid flex-none grid-cols-2 gap-3 border-t border-hair bg-sunk px-2 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 sm:px-6">
          <StepButton direction="previous" member={previous} onClick={onPrevious} />
          <StepButton direction="next" member={next} onClick={onNext} />
        </div>
      </div>
    </dialog>
  );
}

function StepButton({
  direction,
  member,
  onClick,
}: {
  direction: "previous" | "next";
  member: BoardMember;
  onClick: () => void;
}) {
  const isNext = direction === "next";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-11 cursor-pointer flex-col gap-0.5 rounded-md px-3 py-1.5 transition-colors hover:bg-paper-2 ${isNext ? "items-end text-right" : "items-start text-left"}`}
    >
      <span className="inline-flex items-center gap-1.5 font-ui text-xs font-semibold uppercase tracking-caps text-muted">
        {!isNext && <Icon icon={ArrowLeft} size={14} />}
        {isNext ? "Next" : "Previous"}
        {isNext && <Icon icon={ArrowRight} size={14} />}
      </span>
      <span className="font-display text-sm font-semibold text-strong sm:text-md">{boardDisplayName(member)}</span>
    </button>
  );
}

/**
 * Copies the profile's own URL. The address bar already carries the same link while the panel is
 * open, so if the clipboard is unavailable the reader is pointed there instead.
 */
function CopyLinkButton({ slug }: { slug: string }) {
  const [status, setStatus] = React.useState<"idle" | "copied" | "failed">("idle");

  React.useEffect(() => {
    if (status !== "copied") return;
    const timer = window.setTimeout(() => setStatus("idle"), 2400);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${slug}`);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
      <button
        type="button"
        onClick={copy}
        className="-ml-3 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md px-3 font-ui text-sm font-semibold text-primary transition-colors hover:bg-primary-tint"
      >
        <Icon icon={status === "copied" ? Check : LinkIcon} size={16} />
        {status === "copied" ? "Link copied" : "Copy link to this profile"}
      </button>
      <span role="status" className="font-body text-sm text-muted">
        {status === "failed" ? "Copy the link from your browser's address bar." : ""}
      </span>
    </div>
  );
}
