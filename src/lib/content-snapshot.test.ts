import { describe, expect, it } from "vitest";
import { CONTENT_SNAPSHOT } from "./content-snapshot";

describe("public content snapshot", () => {
  it("contains no private workflow or ownership fields", () => {
    const forbidden = ["reviewNotes", "reviewedAt", "reviewedBy", "user_created", "user"];
    for (const item of [...CONTENT_SNAPSHOT.news, ...CONTENT_SNAPSHOT.missionaries]) {
      for (const field of forbidden) expect(item).not.toHaveProperty(field);
    }
  });
});
