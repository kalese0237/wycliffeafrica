import * as React from "react";
import Image from "next/image";
import { Clock, Compass, Gift, ArrowRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/atoms/Button";

const CARDS: { icon: LucideIcon; title: string; href: string; body: string; image: string; imagePosition?: string }[] = [
  {
    icon: Clock,
    title: "Serve part-time",
    href: "/involved",
    body: "You don't have to move to the field. Individuals and groups serve from home, on their own schedule.",
    image: "/photos/pexels-oudneypatsika-2769437.jpg",
    imagePosition: "60% 55%",
  },
  {
    icon: Compass,
    title: "Serve",
    href: "/involved",
    body: "Field assignments run from a few months to a career, and not only for linguists.",
    image: "/photos/pexels-b-aristotle-guweh-jr-1643208950-35610368.jpg",
    imagePosition: "50% 40%",
  },
  {
    icon: Gift,
    title: "Give",
    href: "/give",
    body: "Missionaries raise their own support before they can go. Monthly gifts get them to the field and keep them there.",
    image: "/photos/pexels-zeal-creative-studios-58866141-31283604.jpg",
    imagePosition: "50% 50%",
  },
];

export function ServeGiveCards() {
  return (
    <section className="border-y border-hair bg-sunk">
      <div className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-6 px-5 py-16 sm:px-12 md:grid-cols-3">
        {CARDS.map(({ icon: CardIcon, title, href, body, image, imagePosition }) => (
          <div key={title} className="flex flex-col overflow-hidden rounded-lg border border-hair bg-card shadow-sm">
            <div className="relative aspect-video">
              <Image
                src={image}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
                style={{ objectPosition: imagePosition }}
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="mt-[-46px] inline-flex h-[46px] w-[46px] items-center justify-center rounded-[10px] border-[3px] border-card bg-primary-tint text-green-700 shadow-sm">
                <CardIcon size={22} />
              </span>
              <h3 className="mb-2 mt-3.5 font-display text-lg font-semibold text-strong">{title}</h3>
              <p className="mb-4 flex-1 font-body text-base leading-[1.55] text-body">{body}</p>
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
