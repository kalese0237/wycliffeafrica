import * as React from "react";
import { BOARD } from "@/content/about";
import { BoardMemberCard } from "@/components/molecules/BoardMemberCard";
import { PendingNote } from "./PendingNote";

/**
 * The board as a portrait gallery, five across so the ten members fill two complete rows — a ragged
 * final row of two reads as an oversight on a governance page, where evenness is part of the message.
 */
export function BoardGrid() {
  return (
    <section className="mx-auto max-w-(--container-max) px-5 pt-16 sm:px-12 sm:pt-20">
      <h2 className="mb-4 font-display text-2xl font-normal leading-tight text-strong sm:text-[48px]">
        The Board
      </h2>
      <p className="mb-10 max-w-[62ch] font-body text-base text-muted sm:text-md">
        Ten men and women who carry governance responsibility for the movement — and for every gift
        entrusted to it.
      </p>

      <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {BOARD.map((member) => (
          <BoardMemberCard key={member.name} member={member} />
        ))}
      </ul>

      <PendingNote>
        Initials stand in until portraits arrive, and roles and biographies are awaiting confirmation.
        The ten names are the only board fact currently on file — nothing here is invented.
      </PendingNote>
    </section>
  );
}
