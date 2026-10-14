import { describe, expect, it } from "vitest";
import { BOARD } from "../content/about";
import { boardDisplayName, boardMonogram, boardSlug } from "./board";

describe("boardSlug", () => {
  it("gives every board member a distinct fragment", () => {
    const slugs = BOARD.map((member) => boardSlug(member.name));
    expect(new Set(slugs).size).toBe(BOARD.length);
    expect(slugs).toContain("joseph-opanda-namutala");
  });

  it("drops accents and punctuation", () => {
    expect(boardSlug("Améyo D'Souza")).toBe("ameyo-d-souza");
  });
});

describe("boardDisplayName", () => {
  it("puts the honorific before the name only when there is one", () => {
    expect(boardDisplayName({ name: "Daniel Muvengi", honorific: "Dr." })).toBe("Dr. Daniel Muvengi");
    expect(boardDisplayName({ name: "Bryan" })).toBe("Bryan");
  });
});

describe("boardMonogram", () => {
  it("uses the first and last name", () => {
    expect(boardMonogram("Joseph Opanda Namutala")).toBe("JN");
    expect(boardMonogram("Mary Wamey Wong")).toBe("MW");
    expect(boardMonogram("Bryan")).toBe("B");
  });
});

describe("BOARD", () => {
  it("never carries a location for a member whose portrait is withheld", () => {
    for (const member of BOARD.filter((m) => m.photoWithheld)) {
      expect(member.country).toBeUndefined();
      expect(member.photo).toBeUndefined();
    }
  });
});
