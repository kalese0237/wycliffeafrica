import { describe, expect, it } from "vitest";
import { parseSubmission, submissionImageValue, SUBMISSION_LIMITS } from "./validation";

function submission(overrides: Record<string, string> = {}) {
  const form = new FormData();
  form.set("type", overrides.type ?? "update");
  form.set("title", overrides.title ?? "A meaningful field update");
  form.set("body", overrides.body ?? "A sufficiently detailed message from the field for supporters.");
  if (overrides.sensitive) form.set("sensitive", overrides.sensitive);
  return form;
}

describe("parseSubmission", () => {
  it("normalizes valid content", () => {
    expect(parseSubmission(submission({ title: "  A useful title  " }))).toEqual({
      value: {
        type: "update",
        title: "A useful title",
        body: "A sufficiently detailed message from the field for supporters.",
        sensitive: false,
      },
    });
  });

  it("only permits sensitivity for prayer requests", () => {
    expect(parseSubmission(submission({ type: "prayer", sensitive: "on" }))).toMatchObject({
      value: { type: "prayer", sensitive: true },
    });
    expect(parseSubmission(submission({ type: "update", sensitive: "on" }))).toMatchObject({
      value: { type: "update", sensitive: false },
    });
  });

  it("rejects short and oversized input", () => {
    expect(parseSubmission(submission({ title: "short" }))).toHaveProperty("error");
    expect(parseSubmission(submission({ body: "too short" }))).toHaveProperty("error");
    expect(parseSubmission(submission({ title: "x".repeat(SUBMISSION_LIMITS.titleMax + 1) }))).toHaveProperty("error");
    expect(parseSubmission(submission({ body: "x".repeat(SUBMISSION_LIMITS.bodyMax + 1) }))).toHaveProperty("error");
  });
});

describe("submissionImageValue", () => {
  it("preserves update photos and leaves an absent update upload unchanged", () => {
    expect(submissionImageValue("update", "new-file-id")).toBe("new-file-id");
    expect(submissionImageValue("update")).toBeUndefined();
  });

  it("explicitly detaches photos from prayer requests", () => {
    expect(submissionImageValue("prayer", "new-file-id")).toBeNull();
    expect(submissionImageValue("prayer")).toBeNull();
  });
});
