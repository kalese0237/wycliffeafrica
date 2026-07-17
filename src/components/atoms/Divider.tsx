import * as React from "react";
import { cn } from "@/lib/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  /** `hair` is a 1px rule; `accent` is the signature 2px green rule. */
  variant?: "hair" | "accent";
  /** Width in px, only used for the `accent` variant. */
  width?: number;
  vertical?: boolean;
}

/** Hairline rule, or the signature 2px green accent rule for section breaks. */
export function Divider({ variant = "hair", width = 56, vertical = false, className, style, ...rest }: DividerProps) {
  if (vertical) {
    return <span className={cn("inline-block w-px self-stretch bg-hair", className)} {...rest} />;
  }
  if (variant === "accent") {
    return (
      <div
        className={cn("h-[2px] bg-accent", className)}
        style={{ width, ...style }}
        {...rest}
      />
    );
  }
  return <div className={cn("h-px w-full bg-hair", className)} {...rest} />;
}
