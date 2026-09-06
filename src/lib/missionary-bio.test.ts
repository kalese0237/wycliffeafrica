import { describe, expect, it } from "vitest";
import { normalizeMissionaryBio } from "./missionary-bio";

describe("normalizeMissionaryBio", () => {
  it("joins legacy paragraph arrays", () => {
    expect(normalizeMissionaryBio(["First paragraph.", "Second paragraph."])).toBe(
      "First paragraph.\n\nSecond paragraph.",
    );
  });

  it("handles arrays serialized into text fields", () => {
    expect(normalizeMissionaryBio('["First paragraph.","Second paragraph."]')).toBe(
      "First paragraph.\n\nSecond paragraph.",
    );
  });
});