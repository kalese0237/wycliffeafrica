import { describe, expect, it } from "vitest";
import {
  positionAnchors,
  positionEnquiryHref,
  positionEnquiryMessage,
  requirementLines,
} from "./staff-positions";

describe("positionAnchors", () => {
  it("slugs titles and de-duplicates repeats", () => {
    const anchors = positionAnchors([
      { id: "a", title: "Finance Officer" },
      { id: "b", title: "Finance officer" },
      { id: "c", title: "Développeur (IT) - Yaoundé" },
    ]);
    expect(anchors.get("a")).toBe("finance-officer");
    expect(anchors.get("b")).toBe("finance-officer-2");
    expect(anchors.get("c")).toBe("developpeur-it-yaounde");
  });

  it("falls back to a positional id when nothing sluggable is left", () => {
    expect(positionAnchors([{ id: "a", title: "–" }]).get("a")).toBe("position-1");
  });
});

describe("requirementLines", () => {
  it("drops blank lines and pasted bullets", () => {
    expect(requirementLines("- Degree in accounting\n\n• Fluent English\n2) A driving licence\n")).toEqual([
      "Degree in accounting",
      "Fluent English",
      "A driving licence",
    ]);
  });

  it("returns nothing for an empty field", () => {
    expect(requirementLines(null)).toEqual([]);
    expect(requirementLines("  \n ")).toEqual([]);
  });
});

describe("position enquiry", () => {
  it("round-trips a title through the contact link", () => {
    const href = positionEnquiryHref("IT & Systems Lead");
    const title = new URL(href, "https://example.org").searchParams.get("position");
    expect(positionEnquiryMessage(title)).toBe("I would like to ask about the IT & Systems Lead position.\n\n");
  });

  it("collapses whitespace, caps length and ignores empty values", () => {
    expect(positionEnquiryMessage("  Finance\n\nOfficer ")).toBe(
      "I would like to ask about the Finance Officer position.\n\n",
    );
    expect(positionEnquiryMessage("x".repeat(500))?.length).toBeLessThan(180);
    expect(positionEnquiryMessage("   ")).toBeNull();
    expect(positionEnquiryMessage(null)).toBeNull();
  });
});
