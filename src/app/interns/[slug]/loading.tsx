import * as React from "react";
import { PageTemplate } from "@/components/templates";
import { LoadingHero, LoadingSection, LoadingArticle } from "@/components/molecules/LoadingBlocks";

export default function InternProfileLoading() {
  return (
    <PageTemplate>
      <LoadingHero className="h-[340px] sm:h-[414px]" />
      <LoadingSection>
        <LoadingArticle />
      </LoadingSection>
    </PageTemplate>
  );
}
