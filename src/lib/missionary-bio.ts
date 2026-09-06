export function normalizeMissionaryBio(value: unknown): string | null {
  if (Array.isArray(value)) {
    const paragraphs = value.filter((item): item is string => typeof item === "string");
    return paragraphs.join("\n\n") || null;
  }

  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (!trimmed.startsWith("[")) return value;

  try {
    const parsed: unknown = JSON.parse(trimmed);
    return Array.isArray(parsed) ? normalizeMissionaryBio(parsed) : value;
  } catch {
    return value;
  }
}