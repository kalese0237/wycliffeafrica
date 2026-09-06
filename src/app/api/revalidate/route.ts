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

  // Next 16 requires a profile argument. Named profiles like "max" only
  // mark the tag stale while pushing its expiry a year out, so cached
  // pages never actually count as expired. { expire: 0 } is what forces
  // an immediate, blocking regeneration on the next request.
  revalidateTag("directus-content", { expire: 0 });
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
