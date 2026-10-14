import * as React from "react";
import { PageTemplate } from "@/components/templates";
import { AboutMasthead, AboutCTA } from "@/components/organisms/about";
import { PositionList } from "@/components/organisms/careers";
import { getStaffPositions } from "@/lib/content";

export const metadata = {
  title: "Staff Positions Needed | Wycliffe Africa",
  description:
    "Open staff positions at Wycliffe Africa. They can be filled by full-time or part-time volunteers, or by staff members who have raised their own financial support.",
};

export const revalidate = 300;

export default async function CareersPage() {
  const positions = await getStaffPositions();

  return (
    <PageTemplate>
      <AboutMasthead
        rubric="Staff Positions Needed"
        title="Positions we need"
        titleAccent="filled"
        standfirst="Bible translation runs on a broad, skilled team, and most of the work on that team is not translation. These are the places in it we are looking to fill."
      />

      <PositionList
        positions={positions}
        standfirst="These positions can be filled by full-time or part-time volunteers, or by staff members who have raised their own financial support. If one of them is yours, ask us about it and we will tell you what happens next."
        fallback={{ label: "Preliminary questionnaire", href: "/questionnaire" }}
      />

      <AboutCTA
        flush
        title="Have a skill we have not listed?"
        body="Not every need makes it onto this list. Fill in the preliminary questionnaire and we will work out together where your skills would count for most."
        primary={{ label: "Preliminary questionnaire", href: "/questionnaire" }}
        secondary={{ label: "Serve part-time", href: "/involved/serve" }}
      />
    </PageTemplate>
  );
}
