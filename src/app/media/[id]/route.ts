import { NextRequest, NextResponse } from "next/server";

const FILE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

interface DirectusList<T> {
  data: T[];
}

interface UpdateReference {
  id: string;
  status: string;
  sensitive?: boolean | null;
}

async function getJson<T>(url: string, token: string): Promise<T | null> {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) return null;
  return response.json() as Promise<T>;
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const directusUrl = process.env.DIRECTUS_URL;
  const token = process.env.DIRECTUS_TOKEN;
  if (!directusUrl || !token || !FILE_ID.test(id)) return new NextResponse(null, { status: 404 });

  const updateParams = new URLSearchParams({
    "filter[image][_eq]": id,
    fields: "id,status,sensitive",
    limit: "-1",
  });
  const missionaryParams = new URLSearchParams({
    "filter[image][_eq]": id,
    fields: "id",
    limit: "1",
  });
  const [updates, missionaries] = await Promise.all([
    getJson<DirectusList<UpdateReference>>(
      `${directusUrl}/items/field_updates?${updateParams}`,
      token,
    ),
    getJson<DirectusList<{ id: string }>>(
      `${directusUrl}/items/missionaries?${missionaryParams}`,
      token,
    ),
  ]);

  // Fail closed unless Directus proves that the file belongs to public
  // content. Published sensitive prayers never authorize their attached file.
  if (!updates || !missionaries) return new NextResponse(null, { status: 502 });
  const belongsToPublicProfile = missionaries.data.length > 0;
  const belongsToPublicUpdate = updates.data.some(
    (update) => update.status === "published" && !update.sensitive,
  );
  if (!belongsToPublicProfile && !belongsToPublicUpdate) {
    return new NextResponse(null, { status: 404 });
  }

  const upstream = await fetch(`${directusUrl}/assets/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!upstream.ok || !upstream.body) return new NextResponse(null, { status: upstream.status === 404 ? 404 : 502 });
  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") ?? "application/octet-stream",
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
