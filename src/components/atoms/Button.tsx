import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "accent" | "secondary" | "ghost" | "spark";
export type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "border-primary bg-primary text-on-primary hover:bg-primary-hover",
  accent: "border-green-700 bg-green-700 text-white hover:bg-link-hover",
  secondary: "border-primary-border bg-card text-primary hover:bg-sunk",
  ghost: "border-transparent bg-transparent text-primary shadow-none hover:bg-sunk",
  spark: "border-green-700 bg-green-700 text-white hover:bg-link-hover",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-[15px] py-[7px] text-sm",
  md: "px-[22px] py-[10px] text-base",
  lg: "px-[30px] py-[14px] text-md",
};

function buttonClassName({
  variant = "primary",
  size = "md",
  disabled,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
}) {
  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border font-ui font-semibold tracking-[0.01em] shadow-sm transition-[background-color,box-shadow] duration-[130ms] ease-[cubic-bezier(0.4,0,0.2,1)] active:shadow-inset",
    variantClasses[variant],
    sizeClasses[size],
    disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
    className,
  );
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** Renders as a Next.js Link instead of a <button> when provided. */
  href?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  children,
  className,
  disabled,
  href,
  type = "button",
  ...rest
}: ButtonProps) {
  const classes = buttonClassName({ variant, size, disabled, className });

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={disabled}>
        {iconLeft}
        {children}
        {iconRight}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes} {...rest}>
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
