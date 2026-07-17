import * as React from "react";
import { cn } from "@/lib/cn";

export type ProgressTone = "accent" | "primary" | "gold";

const fillClasses: Record<ProgressTone, string> = {
  accent: "bg-accent",
  primary: "bg-primary",
  gold: "bg-warning",
};

export interface ProgressBarProps {
  value?: number;
  label?: string;
  stage?: string;
  showPercent?: boolean;
  height?: number;
  tone?: ProgressTone;
  className?: string;
}

/** Translation-progress meter for a language or project. */
export function ProgressBar({
  value = 0,
  label = "",
  stage = "",
  showPercent = true,
  height = 8,
  tone = "accent",
  className,
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={className}>
      {(label || showPercent) && (
        <div className="mb-2 flex items-baseline justify-between">
          <span className="font-ui text-sm font-semibold text-body">{label}</span>
          {showPercent && <span className="font-mono text-sm text-muted">{pct}%</span>}
        </div>
      )}
      <div className="overflow-hidden rounded-pill bg-sunk" style={{ height }}>
        <div
          className={cn(
            "h-full rounded-pill transition-[width] duration-[380ms] ease-[cubic-bezier(0,0,0.2,1)]",
            fillClasses[tone],
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      {stage && <div className="mt-2 font-ui text-xs uppercase tracking-caps text-faint">{stage}</div>}
    </div>
  );
}
