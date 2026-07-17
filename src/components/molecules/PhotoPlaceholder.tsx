import * as React from "react";
import { cn } from "@/lib/cn";

export interface PhotoPlaceholderProps {
  /** Describes the real photo that should replace this placeholder, e.g. "A woman in prayer". */
  caption: string;
  className?: string;
  /** CSS aspect-ratio value, e.g. "4/5", "16/9". */
  aspect?: string;
}

/**
 * Striped-gradient placeholder standing in for real photography, per the
 * design system's fidelity note. Swap for real archival photography at the
 * same aspect ratio when it's available — keep this rounded-corner + shadow
 * treatment.
 */
export function PhotoPlaceholder({ caption, className, aspect = "4/5" }: PhotoPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex items-end overflow-hidden rounded-lg border border-hair shadow-md",
        "bg-[repeating-linear-gradient(135deg,var(--color-green-200)_0px,var(--color-green-200)_18px,var(--color-paper-2)_18px,var(--color-paper-2)_36px)]",
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      <span className="m-3 rounded-sm bg-[rgba(3,3,8,0.55)] px-2 py-1 font-mono text-xs text-white">{caption}</span>
    </div>
  );
}
