"use client";

import * as React from "react";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: { reset: (widget?: string | HTMLElement) => void };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Cloudflare Turnstile challenge. Rendered implicitly: Turnstile adds a `cf-turnstile-response` field
 * to the enclosing form, which the server action verifies. Tokens are single-use, so call `reset()`
 * on the ref after any submission that did not succeed.
 */
export const TurnstileWidget = React.forwardRef<{ reset: () => void }>(function TurnstileWidget(_, ref) {
  const container = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => ({
    reset: () => {
      if (container.current) window.turnstile?.reset(container.current);
    },
  }));

  if (!SITE_KEY) return null;
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      <div ref={container} className="cf-turnstile mb-5" data-sitekey={SITE_KEY} />
    </>
  );
});
