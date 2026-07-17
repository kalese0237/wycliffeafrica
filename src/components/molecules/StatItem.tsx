import * as React from "react";
import { cn } from "@/lib/cn";

export type StatTone = "primary" | "accent" | "gold" | "ink";

const toneClasses: Record<StatTone, string> = {
  primary: "text-primary",
  accent: "text-green-700",
  gold: "text-tag-stories",
  ink: "text-strong",
};

export interface StatItemProps {
  value: React.ReactNode;
  label: string;
  sub?: string;
  align?: "left" | "center" | "right";
  tone?: StatTone;
  className?: string;
}

/** A single impact figure: large Cormorant number with a small-caps label. */
export function StatItem({ value, label, sub, align = "center", tone = "primary", className }: StatItemProps) {
  return (
    <div
      className={cn(
        "text-center",
        align === "left" && "text-left",
        align === "right" && "text-right",
        className,
      )}
    >
      <div
        className={cn("font-display text-3xl font-semibold leading-none", toneClasses[tone])}
        style={{ fontFeatureSettings: '"lnum" 1' }}
      >
        {value}
      </div>
      <div className="mt-3 font-ui text-xs font-bold uppercase tracking-caps text-muted">{label}</div>
      {sub && <div className="mt-1 font-body text-sm text-faint">{sub}</div>}
    </div>
  );
}
