import type { UpdateType } from "@/lib/directus/schema";

export const SUBMISSION_LIMITS = {
  titleMin: 8,
  titleMax: 120,
  bodyMin: 30,
  bodyMax: 5000,
  pullQuoteMax: 220,
  captionMax: 140,
  /** Shared with the browser-side picker so the two checks cannot drift apart. */
  imageMaxBytes: 5 * 1024 * 1024,
  imageTypes: ["image/jpeg", "image/png", "image/webp"],
} as const;

export interface SubmissionFields {
  type: UpdateType;
  title: string;
  body: string;
  sensitive: boolean;
  /** Update-only: a highlighted quote shown between body paragraphs. */
  pullQuote?: string;
  /** Update-only: caption for the optional inline image. */
  inlineImageCaption?: string;
}

/**
 * Prayer requests never retain an update photo. Returning null makes Directus
 * explicitly detach an existing file instead of leaving it unchanged.
 */
export function submissionImageValue(
  type: UpdateType,
  uploadedImage?: string,
): string | null | undefined {
  return type === "prayer" ? null : uploadedImage;
}

export function parseSubmission(formData: FormData):
  | { value: SubmissionFields; error?: never }
  | { value?: never; error: string } {
  const type: UpdateType = formData.get("type") === "prayer" ? "prayer" : "update";
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const sensitive = type === "prayer" && formData.get("sensitive") === "on";

  if (title.length < SUBMISSION_LIMITS.titleMin) {
    return { error: `Please use at least ${SUBMISSION_LIMITS.titleMin} characters for the title.` };
  }
  if (title.length > SUBMISSION_LIMITS.titleMax) {
    return { error: `The title must be ${SUBMISSION_LIMITS.titleMax} characters or fewer.` };
  }
  if (body.length < SUBMISSION_LIMITS.bodyMin) {
    return { error: `Please share at least ${SUBMISSION_LIMITS.bodyMin} characters in the message.` };
  }
  if (body.length > SUBMISSION_LIMITS.bodyMax) {
    return { error: `The message must be ${SUBMISSION_LIMITS.bodyMax} characters or fewer.` };
  }

  // Pull quote and inline-image caption apply to field updates only.
  const pullQuoteRaw = String(formData.get("pullQuote") ?? "").trim();
  const captionRaw = String(formData.get("inlineImageCaption") ?? "").trim();
  if (type === "update") {
    if (pullQuoteRaw.length > SUBMISSION_LIMITS.pullQuoteMax) {
      return { error: `The pull quote must be ${SUBMISSION_LIMITS.pullQuoteMax} characters or fewer.` };
    }
    if (captionRaw.length > SUBMISSION_LIMITS.captionMax) {
      return { error: `The photo caption must be ${SUBMISSION_LIMITS.captionMax} characters or fewer.` };
    }
  }
  const pullQuote = type === "update" && pullQuoteRaw ? pullQuoteRaw : undefined;
  const inlineImageCaption = type === "update" && captionRaw ? captionRaw : undefined;

  return { value: { type, title, body, sensitive, pullQuote, inlineImageCaption } };
}
