import * as React from "react";
import { PageTemplate } from "@/components/templates";
import { AboutPhotoHero, HistoryRail, BoardGrid, AboutCTA } from "@/components/organisms";

export const metadata = {
  title: "Leadership & History | Wycliffe Africa",
  description:
    "The board accountable for Wycliffe Africa, and a brief history of how the movement began.",
};

export default function LeadershipPage() {
  return (
    <PageTemplate>
      <AboutPhotoHero
        title="Our history and"
        titleAccent="leadership"
        standfirst="Who founded this work, and who is accountable for it today."
        image="/Missionaries/wycliffe-africa-team.webp"
        imageAlt="The Wycliffe Africa team gathered together"
        focalPoint="50% 38%"
      />

      <HistoryRail />
      <BoardGrid />

      <AboutCTA
        title="Every gift is accounted for."
        body="The board carries governance responsibility for the movement — and for every gift entrusted to it."
        primary={{ label: "Give with confidence", href: "/give" }}
        secondary={{ label: "Contact the office", href: "/contact" }}
      />
    </PageTemplate>
  );
}
