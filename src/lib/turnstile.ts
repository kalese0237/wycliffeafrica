const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Checks a Turnstile token with Cloudflare. Tokens are single-use and expire after five minutes.
 * With no secret configured this passes outside production (local development) and fails in
 * production, so a missing variable can never leave the form unprotected.
 */
export async function verifyTurnstile(token: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== "production";
  if (!token) return false;

  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({ secret, response: token }),
    });
    if (!response.ok) return false;
    return (await response.json()).success === true;
  } catch (error) {
    console.error("turnstile verification failed", error);
    return false;
  }
}
