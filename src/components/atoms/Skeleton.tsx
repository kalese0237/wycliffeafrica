import * as React from "react";
import { cn } from "@/lib/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rounds the block like the thing it stands in for: text lines, tiles, portraits. */
  shape?: "line" | "block" | "circle";
}

/**
 * A placeholder for content that is on its way.
 *
 * Warm, not grey: the sweep runs between `paper-2` and `paper-3`, so a loading page reads as the same
 * cream document as the loaded one rather than as a grey app skeleton borrowed from somewhere else.
 * Under `prefers-reduced-motion` the sweep stops and the block stays a flat tint — the layout still
 * says "content is coming", without the movement.
 */
export function Skeleton({ shape = "line", className, ...rest }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "skeleton bg-paper-2",
        shape === "line" && "h-4 rounded-xs",
        shape === "block" && "rounded-md",
        shape === "circle" && "rounded-full",
        className,
      )}
      {...rest}
    />
  );
}

/** A paragraph's worth of lines, with a short last line so it reads as prose. */
export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton key={index} className={index === lines - 1 ? "w-2/3" : "w-full"} />
      ))}
    </div>
  );
}
