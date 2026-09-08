"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Check, Loader2, Mail, TriangleAlert } from "lucide-react";
import { Button, type ButtonSize } from "@/components/atoms/Button";
import { Input, type InputSize } from "@/components/atoms/Input";
import { cn } from "@/lib/cn";
import { subscribeToNewsletter, type SubmitResult } from "@/app/actions/submit";

export interface NewsletterSignupProps {
  title?: string;
  blurb?: string;
  cta?: string;
  compact?: boolean;
  /** Stacks the compact form's input above the button instead of side-by-side. */
  stacked?: boolean;
  variant?: "primary" | "accent";
  /** Sizes the compact form's input and button. Ignored outside `compact`. */
  size?: InputSize & ButtonSize;
  className?: string;
}

/** Inline email capture (prayer/news). Compact single-row variant for footers. */
export function NewsletterSignup({
  title = "Stay in the story",
  blurb = "Prayer points and field updates, once a month.",
  cta = "Subscribe",
  compact = false,
  stacked = false,
  variant = "primary",
  size = "md",
  className,
}: NewsletterSignupProps) {
  const pathname = usePathname();
  const [pending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<SubmitResult | null>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("sourcePath", pathname);
    setResult(null);
    startTransition(async () => {
      setResult(await subscribeToNewsletter(formData));
    });
  }

  /* Success and failure are said in place, under the field the reader just used, rather than in a
     toast that leaves the screen before it has been read. */
  const notice = result && (
    <p
      role={result.ok ? "status" : "alert"}
      className={cn(
        "mt-2.5 flex items-start gap-2 font-body text-base leading-relaxed",
        result.ok ? "text-green-700" : "text-danger",
      )}
    >
      {result.ok ? (
        <Check size={16} className="mt-1 flex-none" />
      ) : (
        <TriangleAlert size={16} className="mt-1 flex-none" />
      )}
      {result.ok ? "You are on the list. Watch for the next field update." : result.error}
    </p>
  );

  if (compact) {
    return (
      <div className={className}>
        <form className={cn("flex gap-2", stacked ? "flex-col" : "flex-row")} onSubmit={onSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email address"
            required
            disabled={pending}
            size={size}
            wrapperClassName="flex-1"
          />
          <Button
            type="submit"
            variant={variant}
            size={size}
            disabled={pending}
            className={stacked ? "justify-center" : undefined}
            iconRight={pending ? <Loader2 size={15} className="animate-spin motion-reduce:animate-none" /> : undefined}
          >
            {pending ? "Sending" : cta}
          </Button>
        </form>
        {notice}
      </div>
    );
  }
  return (
    <div className={className}>
      <h3 className="mb-2 font-display text-xl font-semibold text-strong">{title}</h3>
      <p className="mb-4 max-w-[46ch] font-body text-base text-body">{blurb}</p>
      <form className="flex max-w-[460px] gap-2" onSubmit={onSubmit}>
        <Input
          type="email"
          name="email"
          required
          disabled={pending}
          placeholder="you@email.com"
          iconLeft={<Mail width={16} height={16} />}
          wrapperClassName="flex-1"
        />
        <Button
          type="submit"
          variant="primary"
          disabled={pending}
          iconRight={pending ? <Loader2 size={15} className="animate-spin motion-reduce:animate-none" /> : undefined}
        >
          {pending ? "Sending" : cta}
        </Button>
      </form>
      {notice}
    </div>
  );
}
