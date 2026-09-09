import * as React from "react";
import { SiteHeader } from "@/components/organisms/SiteHeader";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { PageHero } from "@/components/organisms/PageHero";
import { RouteTransition } from "./RouteTransition";
import { RevealObserver } from "./RevealObserver";

export interface PageTemplateProps {
  children: React.ReactNode;
  /** Home's photo hero needs a transparent-over-photo header; every other page is opaque. */
  transparentHeader?: boolean;
  /** Renders the shared terra pageHero band with this title above `children`. Omit on Home. */
  heroTitle?: string;
}

/** SiteHeader + optional pageHero band + page content + SiteFooter — every route composes this. */
export function PageTemplate({ children, transparentHeader = false, heroTitle }: PageTemplateProps) {
  return (
    <>
      <RevealObserver />
      <SiteHeader transparent={transparentHeader} />
      <main>
        <RouteTransition>
          {heroTitle && <PageHero title={heroTitle} />}
          {children}
        </RouteTransition>
      </main>
      <SiteFooter />
    </>
  );
}
