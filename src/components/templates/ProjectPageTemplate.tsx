import * as React from "react";
import { ImpactStats, type ImpactStat } from "@/components/organisms/ImpactStats";
import { ProjectHero, type ProjectHeroProps } from "@/components/organisms/ProjectHero";
import { PageTemplate } from "./PageTemplate";

export interface ProjectPageTemplateProps {
  hero: ProjectHeroProps;
  stats: ImpactStat[];
  children: React.ReactNode;
}

/** Shared project-page frame. Project routes provide real content and campaign data. */
export function ProjectPageTemplate({ hero, stats, children }: ProjectPageTemplateProps) {
  return (
    <PageTemplate transparentHeader>
      <ProjectHero {...hero} />
      <ImpactStats overlap variant="sunrise" stats={stats} />
      {children}
    </PageTemplate>
  );
}
