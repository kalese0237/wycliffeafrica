import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Called by a Directus flow whenever published content changes, so edits
 * appear on the next request instead of waiting out the 5-minute cache
 * window in src/lib/content.ts.
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!secret || secret !== process.env.DIRECTUS_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  // Next 16 requires a profile argument; "max" means purge immediately
  // rather than reuse the tag's original cache-life window.
  revalidateTag("directus-content", "max");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
