import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: number;
  /** Adds a card-colour ring, for avatars sitting on non-card backgrounds. */
  ring?: boolean;
  className?: string;
}

/** Circular portrait for team members / story authors. Falls back to initials. */
export function Avatar({ src, name = "", size = 44, ring = false, className }: AvatarProps) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <span
      className={cn(
        "inline-flex flex-none items-center justify-center overflow-hidden rounded-full bg-green-100 font-ui font-bold text-green-700",
        ring && "shadow-[0_0_0_2px_var(--color-card),0_0_0_3px_var(--color-primary-border)]",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {src ? (
        <Image src={src} alt={name} width={size} height={size} className="h-full w-full object-cover" />
      ) : (
        initials || "·"
      )}
    </span>
  );
}
