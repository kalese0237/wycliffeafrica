import * as React from "react";
import { Clock, Compass, Gift, ArrowRight, type LucideIcon } from "lucide-react";
import { PhotoPlaceholder } from "@/components/molecules/PhotoPlaceholder";
import { Button } from "@/components/atoms/Button";

const CARDS: { icon: LucideIcon; title: string; href: string; body: string }[] = [
  {
    icon: Clock,
    title: "Serve part-time",
    href: "/involved",
    body: "There are many full-time and part-time possibilities in Wycliffe Africa as an individual or a group.",
  },
  {
    icon: Compass,
    title: "Serve",
    href: "/involved",
    body: "How can the Scriptures become available in the languages where they are still needed? Join the team.",
  },
  {
    icon: Gift,
    title: "Give",
    href: "/give",
    body: "One of the biggest challenges facing people who want to work for Wycliffe Africa is raising financial support.",
  },
];

export function ServeGiveCards() {
  return (
    <section className="border-y border-hair bg-sunk">
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 gap-6 px-5 py-16 sm:px-12 md:grid-cols-3">
        {CARDS.map(({ icon: CardIcon, title, href, body }) => (
          <div key={title} className="flex flex-col overflow-hidden rounded-lg border border-hair bg-card shadow-sm">
            <PhotoPlaceholder caption={title} aspect="16/9" className="rounded-none border-none shadow-none" />
            <div className="flex flex-1 flex-col p-5">
              <span className="-mt-[46px] inline-flex h-[46px] w-[46px] items-center justify-center rounded-[10px] border-[3px] border-card bg-primary-tint text-green-700 shadow-sm">
                <CardIcon size={22} />
              </span>
              <h3 className="mb-2 mt-3.5 font-display text-lg font-semibold text-strong">{title}</h3>
              <p className="mb-4 flex-1 font-body text-base leading-[1.55] text-muted">{body}</p>
              <Button href={href} variant="ghost" size="sm" iconRight={<ArrowRight size={14} />} className="w-fit px-0">
                Read more
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
