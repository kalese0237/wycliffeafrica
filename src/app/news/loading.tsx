import * as React from "react";
import { PageTemplate } from "@/components/templates";
import { LoadingHero, LoadingSection, LoadingCardGrid } from "@/components/molecules/LoadingBlocks";

export default function NewsLoading() {
  return (
    <PageTemplate>
      <LoadingHero className="h-[420px] sm:h-[520px]" />
      <LoadingSection>
        <LoadingCardGrid count={6} />
      </LoadingSection>
    </PageTemplate>
  );
}
