"use client";

import * as React from "react";
import Script from "next/script";

interface TurnstileApi {
  render: (container: HTMLElement, options: { sitekey: string }) => string;
  reset: (widget?: string) => void;
  remove: (widget: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export interface TurnstileHandle {
  reset: () => void;
}

/**
 * Cloudflare Turnstile challenge, rendered explicitly. Turnstile adds a `cf-turnstile-response` field
 * to the enclosing form, which the server action verifies with `verifyTurnstile`.
 *
 * Tokens are single-use: call `reset()` on the ref after any submission that did not succeed.
 * Pass `armed={false}` to hold the widget (and the Cloudflare script) back until the reader starts
 * using the form, so a form that sits in every page's footer costs nothing until it is touched.
 */
export const TurnstileWidget = React.forwardRef<TurnstileHandle, { armed?: boolean; className?: string }>(
  function TurnstileWidget({ armed = true, className }, ref) {
    const container = React.useRef<HTMLDivElement>(null);
    const widgetId = React.useRef<string | null>(null);
    const [ready, setReady] = React.useState(
      () => typeof window !== "undefined" && Boolean(window.turnstile),
    );

    React.useImperativeHandle(ref, () => ({
      reset: () => {
        if (widgetId.current) window.turnstile?.reset(widgetId.current);
      },
    }));

    React.useEffect(() => {
      const element = container.current;
      if (!SITE_KEY || !armed || !ready || !element || !window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(element, { sitekey: SITE_KEY });
      return () => {
        if (widgetId.current) window.turnstile?.remove(widgetId.current);
        widgetId.current = null;
      };
    }, [armed, ready]);

    if (!SITE_KEY || !armed) return null;
    return (
      <>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={() => setReady(true)}
        />
        <div ref={container} className={className} />
      </>
    );
  },
);
