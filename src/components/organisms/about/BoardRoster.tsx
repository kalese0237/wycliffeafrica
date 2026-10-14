"use client";

import * as React from "react";
import { BOARD, type BoardMember } from "@/content/about";
import { BoardMemberRow } from "@/components/molecules/BoardMemberRow";
import { boardSlug } from "@/lib/board";
import { BoardProfileDialog } from "./BoardProfileDialog";
import { PendingNote } from "./PendingNote";

const SLUGS = BOARD.map((member) => boardSlug(member.name));

/** Fired after this component rewrites the hash itself, since pushState and replaceState emit nothing. */
const HASH_EVENT = "board-profile:hash";

function subscribeToHash(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener("hashchange", onChange);
  window.addEventListener(HASH_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener(HASH_EVENT, onChange);
  };
}

/** Index of the member the hash names, or -1. Other fragments on the page, like #history, are not ours. */
function indexFromHash(hash: string): number {
  try {
    return SLUGS.indexOf(decodeURIComponent(hash.slice(1)));
  } catch {
    return -1;
  }
}

/** Opening pushes, so the browser's Back closes the panel; stepping and closing replace. */
function setHash(slug: string | null, mode: "push" | "replace") {
  const url = slug ? `#${slug}` : window.location.pathname + window.location.search;
  if (mode === "push") window.history.pushState(null, "", url);
  else window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(HASH_EVENT));
}

const COUNT_WORDS = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

/** "Three roles, two biographies and one portrait", from whatever `BOARD` is still missing. */
function outstandingSummary(members: BoardMember[]): string | null {
  const counts: [number, string, string][] = [
    [members.filter((m) => !m.role).length, "role", "roles"],
    [members.filter((m) => !m.bio).length, "biography", "biographies"],
    [members.filter((m) => !m.photo && !m.photoWithheld).length, "portrait", "portraits"],
  ];
  const parts = counts
    .filter(([count]) => count > 0)
    .map(([count, one, many]) => `${COUNT_WORDS[count] ?? count} ${count === 1 ? one : many}`);
  if (parts.length === 0) return null;
  const list = parts.length === 1 ? parts[0] : `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
  return `${list.charAt(0).toUpperCase()}${list.slice(1)}`;
}

/**
 * The board as a ruled roster, two columns from `lg`. Each row opens that member's full profile in a
 * panel, and the open profile lives in the URL hash (/about/leadership#joyce-kule). That makes every
 * profile shareable, lets the browser's Back close the panel, and opens the right profile when someone
 * follows a shared link.
 */
export function BoardRoster() {
  const hash = React.useSyncExternalStore(subscribeToHash, () => window.location.hash, () => "");
  const openIndex = indexFromHash(hash);
  const isOpen = openIndex >= 0;

  // The panel keeps showing the last member while it animates closed, rather than snapping to the first.
  const [shownIndex, setShownIndex] = React.useState(0);
  if (isOpen && openIndex !== shownIndex) setShownIndex(openIndex);

  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  // The same lock the site drawer uses; a modal dialog alone does not stop the page scrolling beneath.
  React.useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const total = BOARD.length;
  const at = (index: number) => (index + total) % total;
  const outstanding = outstandingSummary(BOARD);

  return (
    <section className="mx-auto max-w-(--container-max) px-5 pt-16 sm:px-12 sm:pt-20">
      <h2 className="mb-4 font-display text-2xl font-normal leading-tight text-strong sm:text-[48px]">
        The Board
      </h2>
      <p className="mb-10 max-w-[62ch] font-body text-base text-muted sm:text-md">
        Ten men and women who carry governance responsibility for the movement — and for every gift
        entrusted to it.
      </p>

      <ul className="grid border-t-2 border-primary lg:grid-cols-2 lg:gap-x-12">
        {BOARD.map((member, index) => (
          <BoardMemberRow
            key={SLUGS[index]}
            member={member}
            slug={SLUGS[index]}
            onOpen={() => setHash(SLUGS[index], "push")}
          />
        ))}
      </ul>

      {outstanding && (
        <PendingNote>
          {outstanding} are still to come from the office. Nothing here is invented.
        </PendingNote>
      )}

      <BoardProfileDialog
        ref={dialogRef}
        member={BOARD[shownIndex]}
        slug={SLUGS[shownIndex]}
        position={shownIndex + 1}
        total={total}
        previous={BOARD[at(shownIndex - 1)]}
        next={BOARD[at(shownIndex + 1)]}
        onPrevious={() => setHash(SLUGS[at(shownIndex - 1)], "replace")}
        onNext={() => setHash(SLUGS[at(shownIndex + 1)], "replace")}
        onClosed={() => {
          if (indexFromHash(window.location.hash) >= 0) setHash(null, "replace");
        }}
      />
    </section>
  );
}
