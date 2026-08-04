/**
 * Where portal account requests go. The portal has no self-service account
 * creation, so password resets are handled by the office by hand — change this
 * one constant to redirect them.
 */
export const PORTAL_ADMIN_EMAIL = "info@wycliffeafrica.org";

/**
 * Builds the `mailto:` for a password-reset request, pre-filling the subject and
 * a short template so the office receives the one thing it needs to act: which
 * account. `accountEmail` is whatever the missionary had typed into the sign-in
 * field, and is omitted from the template when empty.
 */
export function passwordResetMailto(accountEmail?: string) {
  const subject = "Field portal — password reset request";
  const body = [
    "Hello,",
    "",
    "Please reset the password for my Wycliffe Africa field portal account.",
    "",
    `Portal email address: ${accountEmail?.trim() || ""}`,
    "Name:",
    "",
    "Thank you.",
  ].join("\n");

  return `mailto:${PORTAL_ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
