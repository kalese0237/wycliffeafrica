import * as React from "react";
import { BookOpen, LogIn } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { PrayerRequestCard } from "@/components/molecules/PrayerRequestCard";
import { getMissionaries, getPrayerRequests } from "@/lib/content";

export const metadata = {
  title: "Prayer Requests — Wycliffe Africa",
};

/** Re-check Directus for newly published requests every 5 minutes. */
export const revalidate = 300;

export default async function PrayerPage() {
  const [requests, missionaries] = await Promise.all([getPrayerRequests(), getMissionaries()]);
  const byId = new Map(missionaries.map((m) => [m.id, m]));

  return (
    <PageTemplate heroTitle="Prayer Requests">
      <section className="mx-auto max-w-[var(--container-max)] px-5 py-16 sm:px-12">
        <div className="mx-auto mb-12 max-w-[720px] text-center">
          <Divider variant="accent" width={56} className="mx-auto mb-5" />
          <h2 className="mb-4 font-display text-2xl font-semibold leading-tight text-strong">
            Prayer carries the work
          </h2>
          <p className="font-body text-md leading-relaxed text-muted">
            Before a verse is drafted, someone prays. These are the current requests from our
            missionaries across Africa — some shared anonymously to protect workers in
            security-restricted areas. Take one with you this week.
          </p>
        </div>

        {requests.length === 0 ? (
          <p className="mx-auto max-w-[52ch] rounded-lg border border-hair bg-sunk p-6 text-center font-body text-md leading-relaxed text-muted">
            No prayer requests are published right now. New requests from the field appear here as
            soon as the office reviews them.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {requests.map((r) => (
              <PrayerRequestCard key={r.id} request={r} missionary={byId.get(r.missionaryId)} />
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-hair bg-sunk">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-col items-start justify-between gap-6 px-5 py-14 sm:px-12 lg:flex-row lg:items-center">
          <div>
            <h2 className="mb-2 font-display text-xl font-semibold text-strong">
              Pray with us every two weeks
            </h2>
            <p className="max-w-[58ch] font-body text-[15px] leading-relaxed text-muted">
              The prayer guide gathers requests from every field into one rhythm of prayer for
              Bible translation across Africa — free to download, updated every two weeks.
            </p>
          </div>
          <div className="flex flex-none flex-wrap gap-2.5">
            <Button href="/prayer-guide.pdf" variant="primary" iconLeft={<BookOpen size={16} />}>
              Get the prayer guide
            </Button>
            <Button href="/portal/login" variant="ghost" iconLeft={<LogIn size={15} />}>
              Missionary? Share a request
            </Button>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
}
