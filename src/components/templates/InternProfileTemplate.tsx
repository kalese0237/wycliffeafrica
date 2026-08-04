import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, GraduationCap, Heart, Landmark, MapPin, Phone } from "lucide-react";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { PhotoPlaceholder } from "@/components/molecules/PhotoPlaceholder";
import type { InternRecord } from "@/lib/directus/schema";

export interface InternProfileTemplateProps {
  intern: InternRecord;
}

/**
 * Intern profile page — a lighter counterpart to MissionaryProfileTemplate.
 * Interns are still in their training year rather than commissioned and
 * supported as missionaries, so this page carries no field updates or
 * prayer requests (interns don't hold portal accounts) and surfaces each
 * intern's own giving channels directly, since they raise support
 * individually rather than through the shared missionary "Give" flow.
 */
export function InternProfileTemplate({ intern: i }: InternProfileTemplateProps) {
  const firstName = i.name.split(" ").filter((w) => !/^(Rev\.|Dr\.)$/.test(w))[0] ?? i.name;
  const bio = i.bio?.length ? i.bio : [i.intro];

  return (
    <PageTemplate>
      <section className="mx-auto max-w-(--container-max) px-5 py-16 sm:px-12">
        <Link
          href="/interns"
          className="mb-8 inline-flex items-center gap-1.5 font-ui text-sm font-semibold text-link"
        >
          <ArrowLeft size={15} /> All interns
        </Link>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
          {/* Portrait + support rail */}
          <div className="lg:sticky lg:top-[calc(var(--site-header-stack-height,116px)+24px)] lg:transition-[top] lg:duration-300">
            {i.image ? (
              <div className="relative aspect-4/5 overflow-hidden rounded-lg border border-hair bg-sunk shadow-md">
                <Image src={`/media/${i.image}`} alt={`${i.name} portrait`} fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" priority />
              </div>
            ) : (
              <PhotoPlaceholder caption={`${i.name} portrait`} person={i.name} aspect="4/5" />
            )}
            <div className="mt-5 rounded-lg border border-hair bg-sunk p-5">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-card px-2.5 py-1 font-ui text-xs font-bold uppercase tracking-wide text-faint shadow-sm">
                <GraduationCap size={13} /> Internship Program
              </div>
              <h2 className="mb-1.5 font-display text-md font-semibold text-strong">
                Partner with {firstName}
              </h2>
              <p className="mb-4 font-body text-sm leading-relaxed text-body">
                Wycliffe Africa is a self-supporting non-profit, so interns raise their own support for this
                training year.
                {i.monthlyGoal ? ` ${firstName}'s goal is ${i.monthlyGoal}.` : ""}
              </p>
              {i.giveDetails?.length ? (
                <div className="mb-4 space-y-1.5 rounded-md border border-hair bg-card p-3">
                  {i.giveDetails.map((detail) => (
                    <div key={detail} className="flex items-start gap-2 font-ui text-sm text-body">
                      <Landmark size={14} className="mt-0.5 flex-none text-primary" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              ) : null}
              {i.contact ? (
                <div className="mb-4 flex items-center gap-2 font-ui text-sm text-body">
                  <Phone size={14} className="flex-none text-primary" />
                  <span>{i.contact}</span>
                </div>
              ) : null}
              <div className="flex flex-col gap-2.5">
                <Button href="/give" variant="accent" iconLeft={<Heart size={16} />}>
                  Support {firstName}
                </Button>
              </div>
            </div>
          </div>

          {/* Story */}
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 font-ui text-sm font-bold uppercase tracking-wide text-green-700">
              <MapPin size={15} /> {i.place}
            </div>
            <h1 className="mb-2 font-display text-2xl font-semibold leading-tight text-strong sm:text-3xl">
              {i.name}
            </h1>
            <div className="mb-6 font-ui text-sm text-faint">{i.roles}</div>
            <Divider variant="accent" width={56} className="mb-6" />
            <div className="max-w-[62ch] space-y-5">
              {bio.map((paragraph, idx) => (
                <p key={idx} className="font-body text-md leading-relaxed text-body">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
}
