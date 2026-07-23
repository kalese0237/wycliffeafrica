import { afterEach, describe, expect, it, vi } from "vitest";
import { GET } from "./route";

const FILE_ID = "123e4567-e89b-42d3-a456-426614174000";

function directusResponse(data: unknown[]) {
  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function requestFor(updates: unknown[], missionaries: unknown[] = []) {
  return vi.fn(async (input: string | URL | Request) => {
    const url = String(input);
    if (url.includes("/items/field_updates")) return directusResponse(updates);
    if (url.includes("/items/missionaries")) return directusResponse(missionaries);
    if (url.includes("/assets/")) {
      return new Response("image-bytes", {
        status: 200,
        headers: { "Content-Type": "image/jpeg" },
      });
    }
    return new Response(null, { status: 404 });
  });
}

async function getFile() {
  return GET({} as never, { params: Promise.resolve({ id: FILE_ID }) });
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("portal media authorization", () => {
  it.each([
    ["draft", false],
    ["rejected", false],
    ["archived", false],
    ["published", true],
  ])("does not serve a %s update when sensitive=%s", async (status, sensitive) => {
    vi.stubEnv("DIRECTUS_URL", "https://directus.example");
    vi.stubEnv("DIRECTUS_TOKEN", "service-token");
    const fetchMock = requestFor([{ id: "update-1", status, sensitive }]);
    vi.stubGlobal("fetch", fetchMock);

    const response = await getFile();

    expect(response.status).toBe(404);
    expect(fetchMock.mock.calls.some(([url]) => String(url).includes("/assets/"))).toBe(false);
  });

  it("serves only published, non-sensitive update images without public caching", async () => {
    vi.stubEnv("DIRECTUS_URL", "https://directus.example");
    vi.stubEnv("DIRECTUS_TOKEN", "service-token");
    vi.stubGlobal(
      "fetch",
      requestFor([{ id: "update-1", status: "published", sensitive: false }]),
    );

    const response = await getFile();

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
  });

  it("continues to serve images attached to public missionary profiles", async () => {
    vi.stubEnv("DIRECTUS_URL", "https://directus.example");
    vi.stubEnv("DIRECTUS_TOKEN", "service-token");
    vi.stubGlobal("fetch", requestFor([], [{ id: "missionary-1" }]));

    expect((await getFile()).status).toBe(200);
  });

  it("fails closed when reference authorization cannot be checked", async () => {
    vi.stubEnv("DIRECTUS_URL", "https://directus.example");
    vi.stubEnv("DIRECTUS_TOKEN", "service-token");
    vi.stubGlobal("fetch", vi.fn(async () => new Response(null, { status: 503 })));

    expect((await getFile()).status).toBe(502);
  });
});
