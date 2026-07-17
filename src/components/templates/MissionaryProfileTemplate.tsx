import * as React from "react";
import Link from "next/link";
import { ArrowLeft, HandHeart, Heart, Mail, MapPin } from "lucide-react";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { PhotoPlaceholder } from "@/components/molecules/PhotoPlaceholder";
import { UpdateCard } from "@/components/molecules/UpdateCard";
import type { FieldUpdateRecord, MissionaryRecord } from "@/lib/directus/schema";

export interface MissionaryProfileTemplateProps {
  missionary: MissionaryRecord;
  /** Published items only; the template splits them into updates and prayer requests. */
  updates: FieldUpdateRecord[];
}

/**
 * Missionary profile page — portrait + support rail on the left, story on the
 * right, followed by prayer requests and field updates. Composes PageTemplate.
 */
export function MissionaryProfileTemplate({ missionary: m, updates }: MissionaryProfileTemplateProps) {
  const firstName = m.name.split(" ")[0];
  const prayerRequests = updates.filter((u) => u.type === "prayer");
  const fieldUpdates = updates.filter((u) => u.type === "update");
  const bio = m.bio?.length ? m.bio : [m.intro];

  return (
    <PageTemplate>
      <section className="mx-auto max-w-[var(--container-max)] px-5 py-16 sm:px-12">
        <Link
          href="/missionaries"
          className="mb-8 inline-flex items-center gap-1.5 font-ui text-sm font-semibold text-link"
        >
          <ArrowLeft size={15} /> All missionaries
        </Link>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
          {/* Portrait + support rail */}
          <div className="lg:sticky lg:top-[calc(var(--site-header-stack-height,116px)+24px)]">
            <PhotoPlaceholder caption="Portrait" aspect="4/5" />
            <div className="mt-5 rounded-lg border border-hair bg-sunk p-5">
              <h2 className="mb-1.5 font-display text-md font-semibold text-strong">
                Partner with {firstName}
              </h2>
              <p className="mb-4 font-body text-sm leading-relaxed text-muted">
                Missionaries serve through the monthly support and prayers of partners. Your gift
                goes directly to this ministry.
              </p>
              <div className="flex flex-col gap-2.5">
                <Button href="/give" variant="accent" iconLeft={<Heart size={16} />}>
                  Support {firstName}
                </Button>
                <Button href="/contact" variant="secondary" iconLeft={<Mail size={16} />}>
                  Send a greeting
                </Button>
              </div>
            </div>
          </div>

          {/* Story */}
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 font-ui text-sm font-bold uppercase tracking-wide text-green-700">
              <MapPin size={15} /> {m.place}
            </div>
            <h1 className="mb-2 font-display text-2xl font-semibold leading-tight text-strong sm:text-3xl">
              {m.name}
            </h1>
            <div className="mb-6 font-ui text-sm text-faint">{m.roles}</div>
            <Divider variant="accent" width={56} className="mb-6" />
            <div className="max-w-[62ch] space-y-5">
              {bio.map((paragraph, i) => (
                <p key={i} className="font-body text-md leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {prayerRequests.length > 0 && (
        <section className="border-t border-hair bg-sunk">
          <div className="mx-auto max-w-[var(--container-max)] px-5 py-16 sm:px-12">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="mb-1.5 font-display text-2xl font-semibold text-strong">
                  Pray with {firstName}
                </h2>
                <p className="font-body text-[15px] text-muted">
                  Current prayer requests from the field.
                </p>
              </div>
              <Button href="/prayer" variant="ghost" size="sm" iconLeft={<HandHeart size={15} />}>
                All prayer requests
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {prayerRequests.map((u) => (
                <UpdateCard key={u.id} update={u} authorName={m.name} />
              ))}
            </div>
          </div>
        </section>
      )}

      {fieldUpdates.length > 0 && (
        <section className="border-t border-hair">
          <div className="mx-auto max-w-[var(--container-max)] px-5 py-16 sm:px-12">
            <h2 className="mb-8 font-display text-2xl font-semibold text-strong">
              Updates from the field
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {fieldUpdates.map((u) => (
                <UpdateCard key={u.id} update={u} authorName={m.name} />
              ))}
            </div>
          </div>
        </section>
      )}
    </PageTemplate>
  );
}
