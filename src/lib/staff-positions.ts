/**
 * Small, pure helpers behind /careers and the contact form's position prefill. Kept out of the
 * components so they can be tested without rendering.
 */

/** Longest position title the contact form will echo back from a URL. */
const MAX_POSITION_TITLE = 120;

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * A readable fragment id per position, e.g. `/careers#finance-officer`, so one role can be shared on
 * its own. Two positions with the same title get `-2`, `-3`; a title with no Latin letters at all
 * falls back to `position-N` rather than an empty id.
 */
export function positionAnchors(positions: { id: string; title: string }[]): Map<string, string> {
  const anchors = new Map<string, string>();
  const used = new Set<string>();
  positions.forEach((position, index) => {
    const base = slugify(position.title) || `position-${index + 1}`;
    let anchor = base;
    for (let n = 2; used.has(anchor); n += 1) anchor = `${base}-${n}`;
    used.add(anchor);
    anchors.set(position.id, anchor);
  });
  return anchors;
}

/** `requirements` is one per line in Directus; tolerate pasted bullets and blank lines. */
export function requirementLines(requirements: string | null | undefined): string[] {
  if (!requirements) return [];
  return requirements
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*(?:[-*•–]|\d+[.)])\s+/, "").trim())
    .filter(Boolean);
}

export function positionEnquiryHref(title: string) {
  return `/contact?position=${encodeURIComponent(title)}`;
}

/**
 * The opening line the contact form starts with when it was reached from a position. The title comes
 * from the URL, so it is trimmed, collapsed to one line and capped; it only ever lands in a textarea
 * the visitor reads and can edit before sending.
 */
export function positionEnquiryMessage(title: string | null | undefined): string | null {
  const clean = title?.replace(/\s+/g, " ").trim().slice(0, MAX_POSITION_TITLE).trim();
  return clean ? `I would like to ask about the ${clean} position.\n\n` : null;
}
