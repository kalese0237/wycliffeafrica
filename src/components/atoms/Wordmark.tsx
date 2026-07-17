import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

/** Source art is 3204x1216. */
const LOGO_ASPECT = 3204 / 1216;

export interface WordmarkProps {
  height?: number;
  className?: string;
  /** Uses the white-and-green variant — for navy/dark grounds. */
  onDark?: boolean;
}

/**
 * Renders the official Wycliffe Africa logo. Use this instead of an ad hoc
 * `<img>` wherever the wordmark appears — never redraw the mark. Both
 * variants sit on a transparent ground.
 */
export function Wordmark({ height = 44, className, onDark = false }: WordmarkProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={onDark ? "/brand/wycliffe-africa-white-green.svg" : "/brand/wycliffe-africa-original.svg"}
        alt="Wycliffe Africa — Partners in Bible Translation"
        width={Math.round(height * LOGO_ASPECT)}
        height={height}
        style={{ height, width: "auto" }}
        priority
      />
    </span>
  );
}
