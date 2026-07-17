import * as React from "react";
import { Globe2, HandHeart, LogIn, Users } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { MissionaryDirectory } from "@/components/organisms/MissionaryDirectory";
import { getMissionaries } from "@/lib/content";

export const metadata = {
  title: "Our Missionaries — Wycliffe Africa",
};

/** Re-check Directus for profile changes every 5 minutes. */
export const revalidate = 300;

export default async function MissionariesPage() {
  const missionaries = await getMissionaries();
  const countries = new Set(missionaries.map((m) => m.place.split(",").pop()?.trim()));

  return (
    <PageTemplate heroTitle="Our Missionaries">
      <section className="mx-auto max-w-[var(--container-max)] px-5 pb-4 pt-16 sm:px-12">
        <div className="mx-auto mb-12 max-w-[720px] text-center">
          <Divider variant="accent" width={56} className="mx-auto mb-5" />
          <h2 className="mb-4 font-display text-2xl font-semibold leading-tight text-strong">
            The people behind the work
          </h2>
          <p className="font-body text-md leading-relaxed text-muted">
            Every translation project is carried by people — translators, literacy teachers,
            surveyors, administrators. Each missionary here serves through the prayers and monthly
            support of partners like you.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            <div className="flex items-center gap-2.5 font-ui text-sm font-semibold text-body">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-tint text-primary">
                <Users size={17} />
              </span>
              {missionaries.length} serving missionaries
            </div>
            <div className="flex items-center gap-2.5 font-ui text-sm font-semibold text-body">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-tint text-primary">
                <Globe2 size={17} />
              </span>
              {countries.size} countries across Africa
            </div>
            <div className="flex items-center gap-2.5 font-ui text-sm font-semibold text-body">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-tint text-primary">
                <HandHeart size={17} />
              </span>
              100% partner supported
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--container-max)] px-5 pb-16 sm:px-12">
        <MissionaryDirectory missionaries={missionaries} />
      </section>

      <section className="border-t border-hair bg-sunk">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-col items-start justify-between gap-6 px-5 py-14 sm:px-12 lg:flex-row lg:items-center">
          <div>
            <h2 className="mb-2 font-display text-xl font-semibold text-strong">
              Serving with Wycliffe Africa?
            </h2>
            <p className="max-w-[58ch] font-body text-[15px] leading-relaxed text-muted">
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
