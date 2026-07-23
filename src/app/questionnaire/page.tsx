import * as React from "react";
import { PageTemplate } from "@/components/templates";
import { QuestionnaireForm } from "@/components/organisms/QuestionnaireForm";

export const metadata = {
  title: "Preliminary Questionnaire | Wycliffe Africa",
};

export default function QuestionnairePage() {
  return (
    <PageTemplate heroTitle="Preliminary Questionnaire">
      <section className="mx-auto max-w-[820px] px-5 py-16 sm:px-6">
        <p className="mb-8 font-body text-md leading-relaxed text-muted">
          Interested in serving with Wycliffe Africa? This short questionnaire takes about ten minutes and helps
          our membership team understand where your skills and calling might fit the work of Bible translation.
        </p>
        <QuestionnaireForm />
      </section>
    </PageTemplate>
  );
}
