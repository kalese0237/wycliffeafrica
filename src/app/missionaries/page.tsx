import * as React from "react";
import { Globe2, HandHeart, LogIn, Users } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
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
    <PageTemplate heroTitle="Our Missionaries">
      <section className="mx-auto max-w-[var(--container-max)] px-5 pb-10 pt-14 sm:px-12 sm:pt-16">
        <div className="mx-auto max-w-[760px] text-center">
          <Divider variant="accent" width={56} className="mx-auto mb-5" />
          <h2 className="mb-4 font-display text-xl font-semibold leading-tight text-strong sm:text-2xl">
            The people behind the work
          </h2>
          <p className="mx-auto max-w-[65ch] font-body text-base leading-relaxed text-muted sm:text-md">
            Every translation project is carried by people — translators, literacy teachers,
            surveyors, administrators. None of them draw a salary; each serves on the prayers and
            monthly gifts of their supporters.
          </p>
          <div className="mt-9 grid overflow-hidden rounded-lg border border-hair bg-sunk text-left sm:grid-cols-3">
            <div className="flex items-center gap-3 border-b border-hair px-5 py-4 font-ui text-sm font-semibold text-body sm:border-b-0 sm:border-r">
              <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-card text-primary shadow-sm">
                <Users size={17} />
              </span>
              <span><strong className="block text-base text-strong">{missionaries.length}</strong> serving missionaries</span>
            </div>
            <div className="flex items-center gap-3 border-b border-hair px-5 py-4 font-ui text-sm font-semibold text-body sm:border-b-0 sm:border-r">
              <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-card text-primary shadow-sm">
                <Globe2 size={17} />
              </span>
              <span><strong className="block text-base text-strong">{countries.size}</strong> countries across Africa</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-4 font-ui text-sm font-semibold text-body">
              <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-card text-primary shadow-sm">
                <HandHeart size={17} />
              </span>
              <span><strong className="block text-base text-strong">100%</strong> partner supported</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--container-max)] px-5 pb-20 sm:px-12">
        <MissionaryDirectory missionaries={missionaries} />
      </section>

      <section className="border-t border-hair bg-sunk">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-col items-start justify-between gap-6 px-5 py-14 sm:px-12 lg:flex-row lg:items-center">
          <div>
            <h2 className="mb-2 font-display text-xl font-semibold text-strong">
              Serving with Wycliffe Africa?
            </h2>
            <p className="max-w-[58ch] font-body text-base leading-relaxed text-muted">
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
