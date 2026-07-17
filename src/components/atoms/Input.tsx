import * as React from "react";
import { cn } from "@/lib/cn";

export type InputSize = "sm" | "md" | "lg";

const sizeClasses: Record<InputSize, string> = {
  sm: "px-3 py-[7px] text-sm",
  md: "px-[14px] py-[10px] text-base",
  lg: "px-4 py-[13px] text-md",
};

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  iconLeft?: React.ReactNode;
  invalid?: boolean;
  wrapperClassName?: string;
}

/** Text input on warm paper — hairline border, green focus ring. Pair with `FormField` for labels. */
export function Input({
  size = "md",
  iconLeft,
  invalid = false,
  disabled,
  className,
  wrapperClassName,
  ...rest
}: InputProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md border bg-card transition-[border-color,box-shadow] duration-[130ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
        "focus-within:border-spark focus-within:shadow-[0_0_0_3px_var(--color-spark-tint)]",
        invalid ? "border-danger" : "border-hair",
        disabled && "opacity-55",
        sizeClasses[size],
        wrapperClassName,
      )}
    >
      {iconLeft && <span className="inline-flex flex-none text-faint">{iconLeft}</span>}
      <input
        disabled={disabled}
        className={cn(
          "min-w-0 flex-1 border-none bg-transparent font-body text-inherit outline-none placeholder:text-faint",
          className,
        )}
        {...rest}
      />
    </div>
  );
}
