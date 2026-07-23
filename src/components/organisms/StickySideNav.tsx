import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export interface StickySideNavItem {
  label: string;
  href: string;
}

export interface StickySideNavProps {
  items: StickySideNavItem[];
  activeHref: string;
  className?: string;
}

/** Sticky in-page nav for Get Involved sub-pages (Serve / Give / Motivate your Church / ...). */
export function StickySideNav({ items, activeHref, className }: StickySideNavProps) {
  return (
    <aside className={cn("sticky top-[98px] flex flex-col gap-1.5", className)}>
      {items.map((item) => {
        const active = item.href === activeHref;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "rounded-xl px-[18px] py-[13px] font-ui text-base font-semibold transition-shadow",
              active
                ? "bg-linear-to-br from-green-400 to-green-600 text-white shadow-[0_8px_22px_-8px_rgba(38,154,11,0.5)]"
                : "border border-hair bg-card text-body hover:bg-sunk",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </aside>
  );
}
