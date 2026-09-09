"use server";

import { createItem } from "@directus/sdk";
import { directus } from "@/lib/directus/client";

/**
 * The two public write paths on the site: the contact form and the newsletter signup.
 *
 * Both post into Directus collections that the office reads there; nothing is emailed from here and
 * no address is exposed to browser code. If the collections or their create permission are missing,
 * the action says so plainly and the form offers the office email instead — a form that reports a
 * failure it actually had is worth more than one that shows a tick and drops the message.
 */

export type SubmitResult = { ok: true } | { ok: false; error: string };

const FALLBACK_EMAIL = "info@wycliffeafrica.org";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function failed(what: string) {
  return {
    ok: false as const,
    error: `We could not ${what} just now. Please email ${FALLBACK_EMAIL} and we will pick it up from there.`,
  };
}

export async function submitContactMessage(formData: FormData): Promise<SubmitResult> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const sourcePath = String(formData.get("sourcePath") ?? "") || null;

  if (!name || !email || !message) return { ok: false, error: "Please fill in every field." };
  if (!EMAIL_PATTERN.test(email)) return { ok: false, error: "That email address does not look right." };
  if (message.length > 5000) return { ok: false, error: "Please keep the message under 5000 characters." };

  try {
    await directus.request(
      createItem("contact_messages", { name, email, message, source_path: sourcePath }),
    );
    return { ok: true };
  } catch (error) {
    console.error("contact form submission failed", error);
    return failed("send that message");
  }
}

export async function subscribeToNewsletter(formData: FormData): Promise<SubmitResult> {
  const email = String(formData.get("email") ?? "").trim();
  const sourcePath = String(formData.get("sourcePath") ?? "") || null;

  if (!EMAIL_PATTERN.test(email)) return { ok: false, error: "That email address does not look right." };

  try {
    await directus.request(createItem("newsletter_subscribers", { email, source_path: sourcePath }));
    return { ok: true };
  } catch (error) {
    console.error("newsletter signup failed", error);
    return failed("add you to the list");
  }
}
