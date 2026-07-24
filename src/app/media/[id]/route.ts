import { NextRequest, NextResponse } from "next/server";

const FILE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const MEDIA_UPSTREAM_TIMEOUT_MS = 15_000;

interface DirectusList<T> {
  data: T[];
}

interface UpdateReference {
  id: string;
  status: string;
  sensitive?: boolean | null;
}

interface NewsReference {
  id: string;
  status: string;
}

async function getJson<T>(url: string, token: string): Promise<T | null> {
  try {
    // Media authorization spans three collections. Give each parallel lookup
    // one bounded attempt rather than multiplying latency with retries.
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(MEDIA_UPSTREAM_TIMEOUT_MS),
    });
    if (!response.ok) return null;
    return response.json() as Promise<T>;
  } catch {
    return null;
  }
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const directusUrl = process.env.DIRECTUS_INTERNAL_URL ?? process.env.DIRECTUS_URL;
  const token = process.env.DIRECTUS_TOKEN;
  if (!directusUrl || !token || !FILE_ID.test(id)) return new NextResponse(null, { status: 404 });

  const updateParams = new URLSearchParams({
    "filter[image][_eq]": id,
    "filter[type][_eq]": "prayer",
    fields: "id,status,sensitive",
    limit: "-1",
  });
  const newsParams = new URLSearchParams({
    "filter[image][_eq]": id,
    fields: "id,status",
    limit: "-1",
  });
  const missionaryParams = new URLSearchParams({
    "filter[image][_eq]": id,
    fields: "id",
    limit: "1",
  });
  const [updates, news, missionaries] = await Promise.all([
    getJson<DirectusList<UpdateReference>>(
      `${directusUrl}/items/field_updates?${updateParams}`,
      token,
    ),
    getJson<DirectusList<NewsReference>>(
      `${directusUrl}/items/news?${newsParams}`,
      token,
    ),
    getJson<DirectusList<{ id: string }>>(
      `${directusUrl}/items/missionaries?${missionaryParams}`,
      token,
    ),
  ]);

  // Fail closed unless at least one lookup proves that the file belongs to
  // public content. A failed unrelated lookup must not turn a safe denial into
  // a 5xx response or override another collection's positive authorization.
  // Published sensitive prayers never authorize their attached file.
  const belongsToPublicProfile = (missionaries?.data.length ?? 0) > 0;
  const belongsToPublicUpdate = updates?.data.some(
    (update) => update.status === "published" && !update.sensitive,
  ) ?? false;
  const belongsToPublicNews = news?.data.some((item) => item.status === "published") ?? false;
  if (!belongsToPublicProfile && !belongsToPublicUpdate && !belongsToPublicNews) {
    return new NextResponse(null, { status: 404 });
  }

  const upstream = await fetch(`${directusUrl}/assets/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
    signal: AbortSignal.timeout(MEDIA_UPSTREAM_TIMEOUT_MS),
  }).catch(() => null);
  if (!upstream) return new NextResponse(null, { status: 502 });
  if (!upstream.ok || !upstream.body) return new NextResponse(null, { status: upstream.status === 404 ? 404 : 502 });
  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") ?? "application/octet-stream",
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
