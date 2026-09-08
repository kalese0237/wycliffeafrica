import * as React from "react";
import { PageTemplate } from "@/components/templates";
import { LoadingHero, LoadingSection, LoadingRows } from "@/components/molecules/LoadingBlocks";

export default function PrayerRequestsLoading() {
  return (
    <PageTemplate>
      <LoadingHero className="h-[220px] sm:h-[260px]" />
      <LoadingSection>
        <LoadingRows count={4} />
      </LoadingSection>
    </PageTemplate>
  );
}
