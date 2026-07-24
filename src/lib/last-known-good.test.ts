import { afterEach, describe, expect, it, vi } from "vitest";
import {
  clearLastKnownGoodForTests,
  isTransientContentError,
  withLastKnownGood,
} from "./last-known-good";

afterEach(() => {
  clearLastKnownGoodForTests();
  vi.restoreAllMocks();
});

describe("last-known-good content", () => {
  it("serves the most recent successful result after a transient failure", async () => {
    const query = vi
      .fn<() => Promise<string[]>>()
      .mockResolvedValueOnce(["live"])
      .mockRejectedValueOnce(new TypeError("fetch failed"));
    const resilientQuery = withLastKnownGood("news", query);

    expect(await resilientQuery()).toEqual(["live"]);
    expect(await resilientQuery()).toEqual(["live"]);
  });

  it("does not hide authorization or cold-cache failures", async () => {
    const forbidden = Object.assign(new Error("Forbidden"), { response: new Response(null, { status: 403 }) });
    await expect(withLastKnownGood("news", async () => { throw forbidden; })()).rejects.toThrow("Forbidden");
    await expect(
      withLastKnownGood("missionaries", async () => { throw new TypeError("fetch failed"); })(),
    ).rejects.toThrow("fetch failed");
  });

  it("can seed a cold cache from a real content snapshot", async () => {
    const resilientQuery = withLastKnownGood(
      "news",
      async () => { throw new TypeError("fetch failed"); },
      async () => ["snapshot"],
    );

    expect(await resilientQuery()).toEqual(["snapshot"]);
  });

  it("recognizes retryable HTTP and timeout errors", () => {
    expect(
      isTransientContentError(Object.assign(new Error("Unavailable"), {
        response: new Response(null, { status: 503 }),
      })),
    ).toBe(true);
    expect(isTransientContentError(new DOMException("timed out", "TimeoutError"))).toBe(true);
  });
});
