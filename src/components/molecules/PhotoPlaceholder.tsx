import * as React from "react";
import { cn } from "@/lib/cn";
import { initialsOf } from "@/lib/initials";

export interface PhotoPlaceholderProps {
  /** Describes the real photo that should replace this panel, e.g. "A woman in prayer". Read to screen readers. */
  caption: string;
  className?: string;
  /** CSS aspect-ratio value, e.g. "4/5", "16/9". */
  aspect?: string;
  /** Person's name — renders a monogram instead of the quote glyph (for missing portraits). */
  person?: string;
}

/**
 * Stand-in for photography that hasn't been supplied yet, styled as a quiet
 * manuscript page — ruled baselines waiting for words, echoing languages
 * still waiting for Scripture. Swap for real photography at the same aspect
 * ratio when it's available.
 */
export function PhotoPlaceholder({ caption, className, aspect = "4/5", person }: PhotoPlaceholderProps) {
  const initials = person ? initialsOf(person) : "";
  return (
    <div
      role="img"
      aria-label={caption}
      className={cn(
        "relative overflow-hidden rounded-lg border border-hair bg-paper-1 shadow-md [container-type:inline-size]",
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      {/* Ruled baselines, like a page awaiting text. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_26px,var(--color-paper-2)_26px,var(--color-paper-2)_27px)]"
      />
      {/* Soft warm light so the panel doesn't sit flat. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 100% at 18% 0%, rgba(253,247,236,0.95), transparent 62%), radial-gradient(90% 80% at 100% 100%, rgba(243,217,196,0.35), transparent 55%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 flex items-center justify-center">
        {initials ? (
          <span className="flex aspect-square w-[32cqw] max-w-[130px] items-center justify-center rounded-full border border-terra-100 bg-card/75 font-display text-[clamp(18px,11cqw,44px)] font-medium tracking-[0.06em] text-terra-500">
            {initials}
          </span>
        ) : (
          <span className="translate-y-[16%] font-display text-[clamp(80px,40cqw,170px)] italic leading-none text-terra-300/45">
            &ldquo;
          </span>
        )}
      </div>
    </div>
  );
}
