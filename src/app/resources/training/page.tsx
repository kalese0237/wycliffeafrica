import * as React from "react";
import { PageTemplate } from "@/components/templates";
import { AboutMasthead, AboutCTA } from "@/components/organisms/about";
import { TrainingIndex, TrainingNote } from "@/components/organisms/training";
import { SIL_TRAINING_INDEX, TRAINING_COUNTRIES, TRAINING_PROGRAMME_COUNT } from "@/content/training";

export const metadata = {
  title: "Where to get Training | Wycliffe Africa",
  description:
    "SIL partner schools in Africa that train people for Bible translation, linguistics and translation studies. Listed by country, with a link to each programme.",
};

export default function WhereToGetTrainingPage() {
  return (
    <PageTemplate>
      <AboutMasthead
        rubric="SIL Partner Schools in Africa"
        title="Where to get"
        titleAccent="training"
        standfirst="You do not have to leave Africa to train for this work. The schools below are SIL partners, spread across five countries, and most of them sit close to the language communities the work is for."
      />

      <TrainingIndex
        countries={TRAINING_COUNTRIES}
        standfirst={`${TRAINING_PROGRAMME_COUNT} programmes in ${TRAINING_COUNTRIES.length} countries. Each entry opens the school's own site. Ask them about intake dates, requirements and fees, since those change and we do not track them here.`}
        moreNote="This list stops at Africa. SIL keeps a wider index of translation and linguistics training, including programmes on other continents."
        moreLabel="More SIL training programmes"
        moreHref={SIL_TRAINING_INDEX}
      />

      <TrainingNote
        heading="Before you write"
        paragraphs={[
          "Every programme here is run by the institution that offers it, in partnership with SIL. Admissions, fees and qualifications are theirs, not ours. Write to the school directly.",
          "If you are still working out which one fits the work you think you are called to, fill in the preliminary questionnaire first. It is short, and it gives us enough to talk with you about training and about what happens after it.",
        ]}
      />

      <AboutCTA
        flush
        title="Training comes before sending."
        body="Fill in the preliminary questionnaire and tell us where you have got to. It is how most conversations about training start here."
        primary={{ label: "Preliminary questionnaire", href: "/questionnaire" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </PageTemplate>
  );
}
