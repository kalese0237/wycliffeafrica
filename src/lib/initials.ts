/**
 * Initials for a display name, skipping non-name tokens so couples like
 * "Peter & Hannah Njoroge" yield "PH" rather than "P&".
 */
export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
