import * as React from "react";
import { ArrowRight } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { Button } from "@/components/atoms/Button";
import { PhotoPlaceholder } from "@/components/molecules/PhotoPlaceholder";

export const metadata = {
  title: "Church Partnership | Wycliffe Africa",
};

export default function ChurchPartnershipPage() {
  return (
    <PageTemplate heroTitle="Church Partnership">
      <section className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 items-center gap-10 px-5 py-16 sm:px-12 lg:grid-cols-2 lg:gap-16">
        <PhotoPlaceholder caption="A church congregation in worship" aspect="4/3" />
        <div>
          <div className="font-ui text-xs font-bold uppercase tracking-caps text-green-700">Get involved</div>
          <h2 className="mb-4 mt-3 font-display text-2xl font-semibold text-strong">
            Mobilise your congregation for Bible translation
          </h2>
          <p className="mb-3.5 font-body text-base leading-relaxed text-muted">
            In a church partnership, your congregation takes on one language community and stays with it —
            praying for the team by name, funding the project, sometimes sending your own people. It is a
            commitment measured in years, not events.
          </p>
          <p className="mb-6 font-body text-base leading-relaxed text-muted">
            If that sounds like your church, write to us. The partnerships team will help you work out where to
            begin.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact" variant="accent" iconRight={<ArrowRight size={16} />}>
              Contact us
            </Button>
            <Button href="/involved/motivate-your-church" variant="secondary">
              Motivate your church
            </Button>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
}
