import * as React from "react";
import { redirect } from "next/navigation";
import { HandHeart, LogOut, MapPin, Newspaper } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { Badge, type BadgeTone } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { DraftEditor, SubmissionForm } from "@/components/organisms/portal";
import { logoutAction } from "@/lib/portal/actions";
import { getMySubmissions, getPortalUser } from "@/lib/portal/auth";
import type { PublishStatus } from "@/lib/directus/schema";

export const metadata = {
  title: "Missionary Portal — Wycliffe Africa",
};

const STATUS_BADGE: Record<PublishStatus, { label: string; tone: BadgeTone }> = {
  draft: { label: "In review", tone: "warning" },
  published: { label: "Published", tone: "success" },
  archived: { label: "Archived", tone: "neutral" },
  rejected: { label: "Changes requested", tone: "danger" },
};

export default async function PortalDashboardPage() {
  const user = await getPortalUser();
  if (!user) redirect("/portal/login");

  const missionary = user.missionary;
  const submissions = missionary ? await getMySubmissions(missionary.id) : [];

  return (
    <PageTemplate heroTitle="Missionary Portal">
      <section className="mx-auto max-w-[var(--container-max)] px-5 py-16 sm:px-12">
        <div className="mb-10 flex flex-wrap items-start justify-between gap-4 border-b border-hair pb-8">
          <div>
            <h2 className="mb-1 font-display text-2xl font-semibold text-strong">
              Welcome, {missionary ? missionary.name : user.firstName}
            </h2>
            {missionary && (
              <div className="flex items-center gap-1.5 font-ui text-sm font-bold uppercase tracking-wide text-green-700">
                <MapPin size={14} /> {missionary.place}
              </div>
            )}
          </div>
          <form action={logoutAction}>
            <Button type="submit" variant="secondary" size="sm" iconLeft={<LogOut size={14} />}>
              Sign out
            </Button>
          </form>
        </div>

        {missionary ? (
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
            <SubmissionForm />
            <div>
              <h3 className="mb-4 font-display text-lg font-semibold text-strong">Your submissions</h3>
              {submissions.length === 0 ? (
                <p className="rounded-lg border border-hair bg-sunk p-5 font-body text-sm leading-relaxed text-muted">
                  Nothing submitted yet. Your updates and prayer requests will appear here with their
                  review status.
                </p>
              ) : (
                <ul className="space-y-3">
                  {submissions.map((s) => {
                    const badge = STATUS_BADGE[s.status] ?? STATUS_BADGE.draft;
                    const isPrayer = s.type === "prayer";
                    return (
                      <li
                        key={s.id}
                        className="flex items-start gap-3.5 rounded-lg border border-hair bg-card p-4 shadow-sm"
                      >
                        <span
                          className={
                            "mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full " +
                            (isPrayer ? "bg-tag-pray-tint text-tag-pray" : "bg-tag-give-tint text-tag-give")
                          }
                        >
                          {isPrayer ? <HandHeart size={15} /> : <Newspaper size={15} />}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="mb-0.5 flex flex-wrap items-center gap-2">
                            <span className="font-ui text-sm font-semibold text-body">{s.title}</span>
                            <Badge tone={badge.tone}>{badge.label}</Badge>
                          </div>
                          <div className="font-ui text-xs text-faint">{s.date}</div>
                          <p className="mt-2 line-clamp-2 font-body text-sm leading-relaxed text-muted">{s.body}</p>
                          {s.reviewNotes && (
                            <div className="mt-3 rounded-md border border-hair bg-sunk p-3">
                              <div className="font-ui text-xs font-bold uppercase tracking-wide text-body">Office feedback</div>
                              <p className="mt-1 font-body text-sm leading-relaxed text-muted">{s.reviewNotes}</p>
                            </div>
                          )}
                          {(s.status === "draft" || s.status === "rejected") && <DraftEditor submission={s} />}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <p className="max-w-[62ch] rounded-lg border border-hair bg-sunk p-6 font-body text-md leading-relaxed text-muted">
            Your account is not linked to a missionary profile yet. Please contact the office so we
            can connect your profile — then you can submit updates and prayer requests here.
          </p>
        )}
      </section>
    </PageTemplate>
  );
}
