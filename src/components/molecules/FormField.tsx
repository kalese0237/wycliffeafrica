import * as React from "react";
import { cn } from "@/lib/cn";

export interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  helper?: string;
  children: React.ReactNode;
  className?: string;
}

/** Label + control wrapper with optional helper/error text and a required marker. */
export function FormField({ label, htmlFor, required = false, error, helper, children, className }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={htmlFor} className="font-ui text-sm font-semibold text-body">
          {label}
          {required && <span className="ml-[3px] text-primary">*</span>}
        </label>
      )}
      {children}
      {(error || helper) && (
        <span className={cn("font-body text-xs", error ? "text-danger" : "text-faint")}>{error || helper}</span>
      )}
    </div>
  );
}
