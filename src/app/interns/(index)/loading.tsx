import * as React from "react";
import { PageTemplate } from "@/components/templates";
import { LoadingHero, LoadingSection, LoadingCardGrid } from "@/components/molecules/LoadingBlocks";

export default function InternsLoading() {
  return (
    <PageTemplate>
      <LoadingHero />
      <LoadingSection>
        <LoadingCardGrid count={4} />
      </LoadingSection>
    </PageTemplate>
  );
}
