"use client";

import * as React from "react";
import { Check, Copy, Heart } from "lucide-react";
import { Button } from "@/components/atoms/Button";

export interface AlternateGiving {
  text: string;
  /** The full label shown in the code chip, e.g. a partner-team name and number. */
  label: string;
  /** Just the part that gets copied, e.g. the number alone rather than the name beside it. */
  copyValue: string;
  href: string;
  cta: string;
}

/** A one-off alternate giving route: copy a code, then continue to the linked page to use it. */
export function AlternateGivingCallout({ text, label, copyValue, href, cta }: AlternateGiving) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
    } catch {
      // Clipboard access can be denied or unavailable; the code stays visible to copy by hand.
    }
  }

  return (
    <div className="mt-5 border-t border-hair pt-5">
      <p className="font-body text-sm leading-relaxed text-muted">{text}</p>
      <div className="mt-3 flex items-center gap-2 rounded-md border border-hair bg-sunk py-2 pl-3 pr-2">
        <code className="flex-1 truncate font-mono text-sm text-strong">{label}</code>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded px-2 py-1 font-ui text-sm font-semibold text-primary hover:bg-card"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <Button
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        iconLeft={<Heart size={16} />}
        className="mt-3 w-full"
      >
        {cta}
      </Button>
    </div>
  );
}
