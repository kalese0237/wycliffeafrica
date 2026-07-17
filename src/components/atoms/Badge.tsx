import * as React from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "neutral" | "primary" | "accent" | "gold" | "success" | "warning" | "danger";

const toneClasses: Record<BadgeTone, { soft: string; solid: string }> = {
  neutral: { soft: "bg-paper-2 text-muted", solid: "bg-ink-2 text-white" },
  primary: { soft: "bg-primary-tint text-primary", solid: "bg-primary text-white" },
  accent: { soft: "bg-accent-tint text-green-700", solid: "bg-accent text-white" },
  gold: { soft: "bg-tag-stories-tint text-tag-stories", solid: "bg-tag-stories text-white" },
  success: { soft: "bg-green-100 text-green-700", solid: "bg-success text-white" },
  warning: { soft: "bg-tag-stories-tint text-tag-stories", solid: "bg-warning text-white" },
  danger: { soft: "bg-[#f7dcd9] text-[#8f271f]", solid: "bg-danger text-white" },
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  soft?: boolean;
}

/** Status/count badge. For audience/journey labels use `Tag` instead. */
export function Badge({ tone = "neutral", soft = true, className, children, ...rest }: BadgeProps) {
  const t = toneClasses[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[5px] rounded-sm px-[9px] py-[3px] font-ui text-xs font-bold tracking-[0.04em]",
        soft ? t.soft : t.solid,
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
