import * as React from "react";
import { PageTemplate } from "@/components/templates";
import { LoadingHero, LoadingSection, LoadingArticle } from "@/components/molecules/LoadingBlocks";

export default function NewsArticleLoading() {
  return (
    <PageTemplate>
      <LoadingHero className="h-[320px] sm:h-[420px]" />
      <LoadingSection>
        <LoadingArticle />
      </LoadingSection>
    </PageTemplate>
  );
}
