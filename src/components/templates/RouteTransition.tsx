"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

/**
 * A short fade-and-rise on the page body each time the route changes.
 *
 * Keyed on the pathname, so it plays once per navigation and never on a re-render within a page.
 * The animation is defined in CSS behind a reduced-motion guard, and the content is fully visible
 * without it — this only softens the swap between two documents, it never gates the content on an
 * animation finishing.
 */
export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="route-enter">
      {children}
    </div>
  );
}
