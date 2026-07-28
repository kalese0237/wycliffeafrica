import * as React from "react";
import { LogIn } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { Button } from "@/components/atoms/Button";
import { MissionariesHero } from "@/components/organisms/MissionariesHero";
import { MissionaryDirectory } from "@/components/organisms/MissionaryDirectory";
import { getMissionaries } from "@/lib/content";

export const metadata = {
  title: "Our Missionaries | Wycliffe Africa",
};

/** Re-check Directus for profile changes every 5 minutes. */
export const revalidate = 300;

export default async function MissionariesPage() {
  const missionaries = await getMissionaries();
  const countries = new Set(missionaries.map((m) => m.place.split(",").pop()?.trim()));

  return (
    <PageTemplate>
      <MissionariesHero missionaryCount={missionaries.length} countryCount={countries.size} />

      <section className="mx-auto max-w-(--container-max) px-5 pb-20 sm:px-12">
        <MissionaryDirectory missionaries={missionaries} />
      </section>

      <section className="border-t border-hair bg-sunk">
        <div className="mx-auto flex max-w-(--container-max) flex-col items-start justify-between gap-6 px-5 py-14 sm:px-12 lg:flex-row lg:items-center">
          <div>
            <h2 className="mb-2 font-display text-xl font-semibold text-strong">
              Serving with Wycliffe Africa?
            </h2>
            <p className="max-w-[58ch] font-body text-base leading-relaxed text-body">
              Sign in to the missionary portal to share field updates and prayer requests with your
              supporters. Submissions are reviewed by the office before publishing.
            </p>
          </div>
          <Button href="/portal/login" variant="primary" iconLeft={<LogIn size={16} />} className="flex-none">
            Missionary portal
          </Button>
        </div>
      </section>
    </PageTemplate>
  );
}
