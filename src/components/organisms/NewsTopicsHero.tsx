"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { NewsletterSignup } from "@/components/molecules/NewsletterSignup";
import { cn } from "@/lib/cn";
import type { NewsCategory } from "@/lib/directus/schema";

interface NewsTopic {
  value: "all" | NewsCategory | "prayer" | "guide";
  label: string;
  href: string;
  image: string;
  imagePosition?: string;
}

const TOPICS: NewsTopic[] = [
  {
    value: "all",
    label: "All news",
    href: "/news",
    image: "/photos/pexels-kureng-workx-2546437-7878646.jpg",
    imagePosition: "50% 42%",
  },
  {
    value: "story",
    label: "Stories & media",
    href: "/news?type=story",
    image: "/photos/pexels-speakmediauganda-37826398.jpg",
    imagePosition: "50% 35%",
  },
  {
    value: "update",
    label: "Missionary updates",
    href: "/news?type=update",
    image: "/photos/pexels-mbaraga-bernard-2158456013-35388499.jpg",
    imagePosition: "50% 38%",
  },
  {
    value: "project",
    label: "Projects",
    href: "/news?type=project",
    image: "/photos/pexels-kureng-workx-2546437-7878646.jpg",
    imagePosition: "78% 50%",
  },
  {
    value: "prayer",
    label: "Prayer requests",
    href: "/prayer",
    image: "/photos/pexels-mbaraga-bernard-2158456013-35388499.jpg",
    imagePosition: "22% 45%",
  },
  {
    value: "guide",
    label: "Prayer guide",
    href: "/prayer-guide.pdf",
    image: "/photos/pexels-speakmediauganda-37826398.jpg",
    imagePosition: "75% 42%",
  },
];

function selectedTopic(value: string | null): "all" | NewsCategory {
  return value === "story" || value === "update" || value === "project" ? value : "all";
}

/** Editorial topic navigation inspired by a magazine contents spread. */
export function NewsTopicsHero() {
  const searchParams = useSearchParams();
  const activeTopic = selectedTopic(searchParams.get("type"));

  return (
    <section className="border-b border-hair bg-sunk">
      <div className="mx-auto max-w-(--container-wide) px-5 pb-10 pt-10 sm:px-12 sm:pb-14 sm:pt-14">
        <div className="mb-7 grid items-end gap-6 lg:grid-cols-[1fr_360px] lg:gap-8">
          <div>
            <h1 className="font-display text-2xl font-semibold leading-tight text-strong sm:text-3xl">
              News
            </h1>
            <p className="mt-2 max-w-[62ch] font-body text-sm text-body">
              Bible translation-related stories from around the world.
            </p>
          </div>

          <div className="lg:pb-1">
            <p className="mb-1.5 font-ui text-[10px] font-bold uppercase tracking-caps text-muted">
              Stories and prayer news, straight to your inbox
            </p>
            <NewsletterSignup
              compact
              cta="Subscribe"
              variant="accent"
              size="sm"
              className="max-w-90"
            />
          </div>
        </div>

        <nav aria-label="News topics">
          <div className="-mx-5 flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 xl:grid-cols-6">
            {TOPICS.map((topic) => {
              const active = activeTopic === topic.value;
              return (
                <Link
                  key={topic.value}
                  href={topic.href}
                  scroll={false}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative aspect-4/5 w-[52vw] max-w-50 flex-none snap-start overflow-hidden bg-terra-900 shadow-sm outline-none transition-[transform,box-shadow] duration-220 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/25 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-4 sm:w-auto sm:max-w-none",
                    active
                      ? "ring-2 ring-green-500 ring-offset-4 ring-offset-sunk"
                      : "hover:ring-2 hover:ring-green-500/40 hover:ring-offset-4 hover:ring-offset-sunk",
                  )}
                >
                  <Image
                    src={topic.image}
                    alt=""
                    fill
                    sizes="(max-width: 639px) 52vw, (max-width: 1023px) 45vw, (max-width: 1279px) 30vw, 15vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    style={{ objectPosition: topic.imagePosition }}
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-0 bg-linear-to-t transition-colors",
                      active
                        ? "from-black via-black/65 to-black/15"
                        : "from-black/95 via-black/55 to-black/10 group-hover:from-black",
                    )}
                  />
                  {active && (
                    <span
                      aria-hidden
                      className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white shadow-sm"
                    >
                      <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
                        <path
                          d="M3.5 8.5l3 3 6-6.5"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                  <span
                    className={cn(
                      "absolute inset-x-3 bottom-4 text-center font-ui text-sm font-bold uppercase tracking-caps transition-[color,letter-spacing] duration-220 group-hover:tracking-caps-loose sm:text-base",
                      active ? "text-green-300" : "text-white",
                    )}
                  >
                    {topic.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </section>
  );
}
