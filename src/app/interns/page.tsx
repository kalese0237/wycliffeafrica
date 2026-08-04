import * as React from "react";
import { ArrowRight } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { Button } from "@/components/atoms/Button";
import { InternsHero } from "@/components/organisms/InternsHero";
import { InternDirectory } from "@/components/organisms/InternDirectory";
import { getInterns } from "@/lib/content";

export const metadata = {
  title: "Our Interns | Wycliffe Africa",
};

/** Re-check content for profile changes every 5 minutes. */
export const revalidate = 300;

export default async function InternsPage() {
  const interns = await getInterns();
  const countries = new Set(interns.map((i) => i.place.split(",").pop()?.trim()));

  return (
    <PageTemplate>
      <InternsHero internCount={interns.length} countryCount={countries.size} />

      <section className="mx-auto max-w-(--container-max) px-5 pb-20 sm:px-12">
        <InternDirectory interns={interns} />
      </section>

      <section className="border-t border-hair bg-sunk">
        <div className="mx-auto flex max-w-(--container-max) flex-col items-start justify-between gap-6 px-5 py-14 sm:px-12 lg:flex-row lg:items-center">
          <div>
            <h2 className="mb-2 font-display text-xl font-semibold text-strong">
              How the Internship Program works
            </h2>
            <p className="max-w-[58ch] font-body text-base leading-relaxed text-body">
              Each intern is recruited by their home church, placed beside a working missionary, and
              mentored for a year before deciding whether God is calling them into translation ministry
              for good.
            </p>
          </div>
          <Button
            href="/projects/internship-program"
            variant="secondary"
            iconRight={<ArrowRight size={16} />}
            className="flex-none"
          >
            See the full program
          </Button>
        </div>
      </section>
    </PageTemplate>
  );
}
