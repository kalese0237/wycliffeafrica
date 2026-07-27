import * as React from "react";
import Link from "next/link";
import { HandHeart, LogOut, MapPin, Newspaper } from "lucide-react";
import { Badge, type BadgeTone } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import {
  DraftEditor,
  PortalNavigation,
  SubmissionForm,
} from "@/components/organisms/portal";
import { logoutAction } from "@/lib/portal/actions";
import type { MissionaryRecord, PublishStatus, UpdateType } from "@/lib/directus/schema";
import type { MySubmission } from "@/lib/portal/auth";

const STATUS_BADGE: Record<PublishStatus, { label: string; tone: BadgeTone }> = {
  draft: { label: "In review", tone: "warning" },
  published: { label: "Published", tone: "success" },
  archived: { label: "Archived", tone: "neutral" },
  rejected: { label: "Changes requested", tone: "danger" },
};

const QUICK_ACTIONS = [
  {
    type: "update" as const,
    title: "Field update",
    body: "Share news and progress from the work.",
    icon: Newspaper,
  },
  {
    type: "prayer" as const,
    title: "Prayer request",
    body: "Invite partners to pray with you.",
    icon: HandHeart,
  },
];

export interface PortalDashboardTemplateProps {
  missionary: MissionaryRecord | null;
  displayName: string;
  submissions: MySubmission[];
  initialType: UpdateType;
  richFieldsSupported: boolean;
}

/** Authenticated portal page composition. Data loading remains in the route page. */
export function PortalDashboardTemplate({
  missionary,
  displayName,
  submissions,
  initialType,
  richFieldsSupported,
}: PortalDashboardTemplateProps) {
  const firstName = displayName.split(" ")[0];
  const updateCount = submissions.filter((submission) => submission.type === "update").length;
  const prayerCount = submissions.filter((submission) => submission.type === "prayer").length;

  return (
    <main className="min-h-svh bg-page lg:grid lg:grid-cols-[250px_1fr]">
      <PortalNavigation name={displayName} place={missionary?.place} />
      <div>
        <PortalNavigation name={displayName} place={missionary?.place} compact />

        <div id="dashboard" className="w-full px-5 py-10 sm:px-10 lg:px-11 lg:py-9 xl:px-14">
          <header className="mb-8 flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="mb-2 font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#C9761A]">
                Dashboard
              </p>
              <h1 className="font-display text-2xl font-semibold leading-tight text-strong">
                Good to see you, {firstName}.
              </h1>
              {missionary && (
                <p className="mt-2 flex items-center gap-1.5 font-ui text-sm text-body">
                  <MapPin size={14} className="text-primary" />
                  {missionary.place}
                </p>
              )}
            </div>
            <form action={logoutAction} className="lg:hidden">
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                iconLeft={<LogOut size={14} />}
              >
                Sign out
              </Button>
            </form>
          </header>

          {missionary ? (
            <>
              <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Submission totals">
                {[
                  { value: submissions.length, label: "Total submissions" },
                  { value: updateCount, label: "Field updates" },
                  { value: prayerCount, label: "Prayer requests" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-md border border-hair bg-card px-6 py-5 shadow-sm">
                    <div className="font-ui text-2xl font-bold leading-none text-primary">{stat.value}</div>
                    <div className="mt-2 font-ui text-sm text-body">{stat.label}</div>
                  </div>
                ))}
              </section>

              <p className="mb-4 font-ui text-xs font-bold uppercase tracking-[0.16em] text-[#C9761A]">
                Post something new
              </p>
              <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {QUICK_ACTIONS.map(({ type, title, body, icon: QuickIcon }) => (
                  <Link
                    key={type}
                    href={`/portal?type=${type}#new-submission`}
                    className="group rounded-md border border-hair bg-card p-5 shadow-sm transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[linear-gradient(140deg,#FCE3B8,#F3AD52)] text-primary">
                      <QuickIcon size={21} />
                    </span>
                    <h2 className="mt-3 font-display text-lg font-semibold text-primary">{title}</h2>
                    <p className="mt-1 font-ui text-sm text-body">{body}</p>
                  </Link>
                ))}
              </section>

              <div className="grid grid-cols-1 items-start gap-9 xl:grid-cols-[1.12fr_0.88fr]">
                <section id="new-submission">
                  <SubmissionForm
                    key={initialType}
                    initialType={initialType}
                    richFieldsSupported={richFieldsSupported}
                  />
                </section>

                <section id="submissions">
                  <div className="mb-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="mb-1 font-ui text-xs font-bold uppercase tracking-[0.16em] text-[#C9761A]">
                        History
                      </p>
                      <h2 className="font-display text-xl font-semibold text-strong">Your submissions</h2>
                    </div>
                    <Badge tone="neutral">{submissions.length}</Badge>
                  </div>

                  {submissions.length === 0 ? (
                    <p className="rounded-md border border-dashed border-hair bg-sunk p-8 text-center font-ui text-sm leading-relaxed text-body">
                      Nothing submitted yet. Your updates and prayer requests will appear here with their review
                      status.
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {submissions.map((submission) => {
                        const badge = STATUS_BADGE[submission.status] ?? STATUS_BADGE.draft;
                        const isPrayer = submission.type === "prayer";
                        return (
                          <li key={submission.id} className="rounded-md border border-hair bg-card p-5 shadow-sm">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <Badge tone={isPrayer ? "primary" : "accent"}>
                                {isPrayer ? "Prayer request" : "Field update"}
                              </Badge>
                              <Badge tone={badge.tone}>{badge.label}</Badge>
                            </div>
                            <h3 className="font-display text-md font-semibold leading-snug text-strong">
                              {submission.title}
                            </h3>
                            <div className="mt-1 font-ui text-xs text-body">{submission.date}</div>
                            <p className="mt-2 line-clamp-3 font-body text-sm leading-relaxed text-body">
                              {submission.body}
                            </p>
                            {submission.reviewNotes && (
                              <div className="mt-3 rounded-md border border-hair bg-sunk p-3">
                                <div className="font-ui text-xs font-bold uppercase tracking-wide text-body">
                                  Office feedback
                                </div>
                                <p className="mt-1 font-body text-sm leading-relaxed text-body">
                                  {submission.reviewNotes}
                                </p>
                              </div>
                            )}
                            {(submission.status === "draft" || submission.status === "rejected") && (
                              <DraftEditor
                                submission={submission}
                                richFieldsSupported={richFieldsSupported}
                              />
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </section>
              </div>
            </>
          ) : (
            <p className="max-w-[62ch] rounded-md border border-hair bg-sunk p-6 font-body text-md leading-relaxed text-body">
              Your account is not linked to a missionary profile yet. Please contact the office so we can connect
              your profile. Then you can submit updates and prayer requests here.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
