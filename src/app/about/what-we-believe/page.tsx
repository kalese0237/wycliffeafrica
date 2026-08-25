import * as React from "react";
import { PageTemplate } from "@/components/templates";
import { AboutMasthead, CreedBand, ArticleList, CoreValues, AboutCTA } from "@/components/organisms";
import {
  DOCTRINAL_TRUTHS,
  WYCLIFFE_BELIEFS,
  CHURCH_ROLE,
  MISSION_AGENCY_ROLE,
} from "@/content/about";

export const metadata = {
  title: "What We Believe | Wycliffe Africa",
  description:
    "The statement of faith, convictions and core values held by every member of Wycliffe Africa — board, staff and missionary alike.",
};

/**
 * The one page in the About family that refuses photography.
 *
 * A pastor or partner agency arrives here to weigh doctrine, and may print or forward what they find.
 * So the page opens on a masthead rather than a photograph, and runs as four numbered articles under
 * one continuous document grammar: the creed, the beliefs that follow from it, the role of the Church,
 * and the values the whole thing commits us to.
 */
export default function WhatWeBelievePage() {
  return (
    <PageTemplate>
      <AboutMasthead
        eyebrow="About Us · II"
        rubric="Statement of Faith"
        title="What we"
        titleAccent="believe"
        standfirst="The convictions held by every member of Wycliffe Africa — board, staff and missionary alike."
      />

      <CreedBand
        eyebrow="Article One"
        title="The truths we adhere to"
        intro="We adhere to the following truths."
        articles={DOCTRINAL_TRUTHS}
        attestation="Held by every member of Wycliffe Africa without exception, and by every church and agency we partner with."
        signatory="Wycliffe Africa"
      />

      <ArticleList
        eyebrow="Article Two"
        title="Wycliffe Africa believes"
        rubric="Why translation, specifically"
        items={WYCLIFFE_BELIEFS}
      />

      <ArticleList
        eyebrow="Article Three"
        title="The role of the Church"
        rubric="And the place of a mission agency"
        items={CHURCH_ROLE}
        coda={MISSION_AGENCY_ROLE}
      />

      <CoreValues />

      <AboutCTA
        title="Convictions become people who go."
        body="Meet the board accountable for this work, and the missionaries carrying it."
        primary={{ label: "Our leadership", href: "/about/leadership" }}
        secondary={{ label: "Meet the missionaries", href: "/missionaries" }}
      />
    </PageTemplate>
  );
}
