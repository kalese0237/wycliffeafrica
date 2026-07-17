"use client";

import * as React from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { cn } from "@/lib/cn";

export interface NewsletterSignupProps {
  title?: string;
  blurb?: string;
  cta?: string;
  compact?: boolean;
  /** Stacks the compact form's input above the button instead of side-by-side. */
  stacked?: boolean;
  variant?: "primary" | "accent";
  className?: string;
}

/** Inline email capture (prayer/updates). Compact single-row variant for footers. */
export function NewsletterSignup({
  title = "Stay in the story",
  blurb = "Prayer points and field updates, once a month.",
  cta = "Subscribe",
  compact = false,
  stacked = false,
  variant = "primary",
  className,
}: NewsletterSignupProps) {
  if (compact) {
    return (
      <form
        className={cn("flex gap-2", stacked ? "flex-col" : "flex-row", className)}
        onSubmit={(e) => e.preventDefault()}
      >
        <Input type="email" placeholder="Email address" required wrapperClassName="flex-1" />
        <Button variant={variant} className={stacked ? "justify-center" : undefined}>
          {cta}
        </Button>
      </form>
    );
  }
  return (
    <div className={className}>
      <h3 className="mb-2 font-display text-xl font-semibold text-strong">{title}</h3>
      <p className="mb-4 max-w-[46ch] font-body text-base text-muted">{blurb}</p>
      <form className="flex max-w-[460px] gap-2" onSubmit={(e) => e.preventDefault()}>
        <Input
          type="email"
          placeholder="you@email.com"
          iconLeft={<Mail width={16} height={16} />}
          wrapperClassName="flex-1"
        />
        <Button variant="primary">{cta}</Button>
      </form>
    </div>
  );
}
