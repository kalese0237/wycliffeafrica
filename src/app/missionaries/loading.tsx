import * as React from "react";
import { PageTemplate } from "@/components/templates";
import { LoadingHero, LoadingSection, LoadingCardGrid } from "@/components/molecules/LoadingBlocks";

export default function MissionariesLoading() {
  return (
    <PageTemplate>
      <LoadingHero />
      <LoadingSection>
        <LoadingCardGrid count={6} />
      </LoadingSection>
    </PageTemplate>
  );
}
