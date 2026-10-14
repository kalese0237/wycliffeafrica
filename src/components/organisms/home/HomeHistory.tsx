import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";

/** Condensed from docs/content/history-of-wycliffe-africa.md; the full rail lives on /about/leadership. */
const MILESTONES = [
  {
    year: "Late 1990s",
    body: "Edwyn Kiptinness and John Bendor-Samuel talk about raising Africans as missionaries for Bible translation in Africa.",
  },
  {
    year: "2004",
    body: "Wycliffe Africa is registered in Nairobi, Kenya, and meets its first goal of 55 missionaries within about two years.",
  },
  {
    year: "Today",
    body: "31 missionaries serve across Africa and beyond, from translation consultancy to language technology.",
  },
];

/** Brief founding story under the home hero, linking to the full history rail. */
export function HomeHistory() {
  return (
    <section className="border-b border-hair bg-paper-1">
      <div className="mx-auto max-w-(--container-max) px-5 py-16 sm:px-12 sm:py-20">
        <div className="reveal-group grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <div className="font-ui text-xs font-bold uppercase tracking-caps-loose text-accent-hover">
              Our story
            </div>
            <Divider variant="accent" width={56} className="mb-6 mt-4" />
            <h2 className="max-w-[16ch] font-display text-2xl font-semibold leading-[1.08] text-strong">
              It began with a conversation
            </h2>
          </div>

          <div className="lg:pt-10">
            <p className="max-w-[60ch] font-body text-md leading-[1.5] text-strong sm:text-lg">
              Fewer Western missionaries were serving in Bible translation, and African churches wanted their own
              people in the work. Wycliffe Africa grew out of that moment, with one mandate: to recruit, train, send
              and support African missionaries for Bible translation.
            </p>
            <Button
              href="/about/leadership#history"
              variant="secondary"
              iconRight={<ArrowRight size={16} />}
              className="mt-6"
            >
              Read our history
            </Button>
          </div>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-y-0">
          {MILESTONES.map(({ year, body }) => (
            <li key={year} className="relative border-t-2 border-primary pr-8 pt-7">
              <span aria-hidden className="absolute -top-[7px] left-0 h-3 w-3 rounded-full bg-primary" />
              <p className="mb-2.5 font-ui text-sm font-semibold tracking-wide text-primary-hover">{year}</p>
              <p className="max-w-[40ch] font-body text-base leading-relaxed text-body">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
