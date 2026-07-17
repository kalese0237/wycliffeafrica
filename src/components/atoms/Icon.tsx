import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export interface IconProps extends Omit<React.SVGAttributes<SVGSVGElement>, "color"> {
  /** A lucide-react icon component, e.g. `icon={ArrowRight}`. */
  icon: LucideIcon;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

/**
 * Icon wrapper around lucide-react (replaces the reference's CDN-loaded
 * `data-lucide` string API). Monochrome only — muted ink or a brand colour.
 */
export function Icon({
  icon: LucideIconComponent,
  size = 20,
  color = "currentColor",
  strokeWidth = 1.75,
  className,
  ...rest
}: IconProps) {
  return (
    <LucideIconComponent
      width={size}
      height={size}
      color={color}
      strokeWidth={strokeWidth}
      className={cn("inline-flex flex-none", className)}
      {...rest}
    />
  );
}
