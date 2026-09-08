import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { StepContents } from "./StepContents";
import type { MembershipStep } from "@/content/membership";

export interface MembershipStepsProps {
  steps: MembershipStep[];
  /** Sits above the first stage — what this sequence is and what it is not. */
  standfirst: string;
  /** A captioned figure dropped into the stage with this id, in its own column beneath the prose. */
  figure?: { stepId: string; src: string; alt: string; caption: string; focalPoint?: string };
}

/**
 * The page's spine: seven stages set as the divisions of a printed prospectus, with a sticky contents
 * rail beside them.
 *
 * The stage number hangs in its own column so every stage title shares a left edge and the sequence
 * scans as one process rather than seven unrelated headings. Sub-conditions (the qualifications, the
 * ways to build prayer support) are ruled rows inside their stage, not bulleted lists: a reader
 * checking whether they qualify is reading a series of conditions, and rules are what tell them where
 * one condition ends and the next begins.
 */
export function MembershipSteps({ steps, standfirst, figure }: MembershipStepsProps) {
  return (
    <section className="mx-auto max-w-(--container-max) px-5 py-16 sm:px-12 sm:py-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[210px_1fr] lg:gap-20">
        <StepContents steps={steps.map(({ id, title }) => ({ id, title }))} />

        <div>
          <p className="max-w-[62ch] font-body text-md leading-relaxed text-body sm:text-lg">{standfirst}</p>

          {steps.map((step, index) => (
            <section key={step.id} id={step.id} className="reveal mt-14 max-w-[760px] scroll-mt-28 first:mt-12">
              <div className="flex flex-col gap-2 pb-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
                <h2 className="flex items-baseline gap-4 font-display text-2xl font-normal leading-snug text-strong sm:text-3xl">
                  <span aria-hidden className="font-display text-sm text-primary">
                    {index + 1}
                  </span>
                  {step.title}
                </h2>
                <span className="flex-none font-display text-base italic text-muted">{step.rubric}</span>
              </div>
              {/* The division rule is its own element so the scroll-driven draw clips the rule alone. */}
              <div aria-hidden className="rule-draw h-0.5 bg-terra-900" />

              <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-[52px_1fr]">
                <div aria-hidden className="hidden sm:block" />
                <div className="pt-6">
                  {step.body.map((paragraph) => (
                    <p key={paragraph} className="mb-4 max-w-[66ch] font-body text-base leading-relaxed text-body sm:text-md">
                      {paragraph}
                    </p>
                  ))}

                  {step.list && (
                    <div className="mt-7 max-w-[66ch]">
                      {step.listTitle && (
                        <p className="mb-1 font-ui text-xs font-semibold uppercase tracking-caps text-primary-active">
                          {step.listTitle}
                        </p>
                      )}
                      <ul className="border-t border-hair">
                        {step.list.map((item) => (
                          <li
                            key={item}
                            className="border-b border-hair py-3.5 font-body text-base leading-relaxed text-body last:border-b-0"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {figure?.stepId === step.id && (
                    <figure className="reveal mt-8 max-w-[540px]">
                      <div className="relative aspect-4/3 overflow-hidden rounded-lg border border-hair shadow-md">
                        <Image
                          src={figure.src}
                          alt={figure.alt}
                          fill
                          sizes="(min-width: 1024px) 40vw, 90vw"
                          className="object-cover"
                          style={{ objectPosition: figure.focalPoint ?? "50% 45%" }}
                        />
                      </div>
                      <figcaption className="mt-3 border-t border-hair pt-3 font-body text-base leading-relaxed text-muted">
                        {figure.caption}
                      </figcaption>
                    </figure>
                  )}

                  {step.link && (
                    <Link
                      href={step.link.href}
                      className="group mt-6 inline-flex w-fit items-center gap-2 font-ui text-xs font-bold uppercase tracking-caps text-primary transition-colors duration-150 hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-400"
                    >
                      {step.link.label}
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-150 ease-out group-hover:translate-x-1"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
