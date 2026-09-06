import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const WAYS: { title: string; href: string; body: string; cta: string }[] = [
  {
    title: "Serve from home",
    href: "/involved",
    body:
      "You don't have to move to the field. Individuals, churches and groups give hours to a translation project from wherever they already are.",
    cta: "See part-time roles",
  },
  {
    title: "Serve on the field",
    href: "/involved",
    body:
      "Assignments run from a few months to a career, and not only for linguists. Teachers, technicians and administrators are needed just as badly.",
    cta: "See field assignments",
  },
  {
    title: "Give",
    href: "/give",
    body:
      "Missionaries raise their own support before they can go. A monthly gift gets someone to the field and is what keeps them there.",
    cta: "Support a missionary",
  },
];

export function ServeGiveCards() {
  return (
    <section className="border-y border-hair bg-sunk">
      <div className="mx-auto max-w-(--container-max) px-5 py-16 sm:px-12 sm:py-20">
        <h2 className="font-display text-2xl font-semibold leading-[1.1] text-strong">
          Three ways in
        </h2>
        <div className="mt-5 h-[2px] w-full bg-ink-0" />

        <div className="grid grid-cols-1 md:grid-cols-3">
          {WAYS.map(({ title, href, body, cta }) => (
            <div
              key={title}
              className="flex flex-col border-b border-hair py-8 last:border-b-0 md:border-b-0 md:border-l md:py-10 md:pl-8 md:first:border-l-0 md:first:pl-0 md:not-first:ml-8 md:last:pr-0"
            >
              <h3 className="font-display text-lg font-semibold leading-[1.2] text-strong">{title}</h3>
              <p className="mt-3 max-w-[46ch] flex-1 font-body text-base leading-[1.6] text-body">{body}</p>
              <Link
                href={href}
                className="group mt-6 inline-flex w-fit items-center gap-2 font-ui text-xs font-bold uppercase tracking-caps text-primary transition-colors duration-150 hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-400"
              >
                {cta}
                <ArrowRight
                  size={14}
                  className="transition-transform duration-150 ease-out group-hover:translate-x-1"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
