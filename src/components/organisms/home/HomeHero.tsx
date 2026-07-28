"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Languages, Hourglass, PenSquare, type LucideIcon } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/cn";

/** One line of the heading lockup; `em` is the green-gradient italic segment. */
interface SlideLine {
  pre?: string;
  em?: string;
  post?: string;
}

interface Slide {
  eyebrow: string;
  /** The heading is a designed two-line lockup — keep line two longer than line one. */
  line1: SlideLine;
  line2: SlideLine;
  body: string;
  ctaA: { label: string; href: string };
  ctaB: { label: string; href: string };
  image?: string;
  imagePosition?: string;
  photoCredit?: string;
  photoCreditHref?: string;
}

const SLIDES: Slide[] = [
  {
    eyebrow: "Wycliffe Africa",
    line1: { pre: "Raising missionaries" },
    line2: { em: "for Bible translation" },
    body: "Millions across Africa still wait to hear God speak their language. We raise up African missionaries for the translation work that will change that.",
    ctaA: { label: "Why Bible translation", href: "/about" },
    ctaB: { label: "What we believe", href: "/about" },
    image: "/Missionaries/wycliffe-africa-team.webp",
    imagePosition: "50% 45%",
  },
  {
    eyebrow: "Training & sending",
    line1: { pre: "Equipping ", em: "African" },
    line2: { em: "missionaries", post: " for the field" },
    body: "Translation teams need linguists, but also teachers, accountants and IT specialists. We train Africans and send them to the field, whether for a season or for a lifetime.",
    ctaA: { label: "Meet our missionaries", href: "/missionaries" },
    ctaB: { label: "Become a member", href: "/involved" },
    image: "/Internship/equipping-missionaries.webp",
    imagePosition: "50% 30%",
  },
  {
    eyebrow: "Church partnership",
    line1: { pre: "Mobilising" },
    line2: { em: "churches", post: " across Africa" },
    body: "We help congregations take a language community as their own: praying for it by name, funding its project, sending it people.",
    ctaA: { label: "Partner your church", href: "/involved/partnership" },
    ctaB: { label: "Give today", href: "/give" },
    image: "/photos/uganda-keliko-church.webp",
    imagePosition: "50% 48%",
    photoCredit: "Marc Ewell / Wycliffe Global Alliance",
    photoCreditHref: "https://www.wycliffe.net/",
  },
];

const SLIDE_DELAY_MS = 18000;

function HeadingLine({ line }: { line: SlideLine }) {
  return (
    <span className="block">
      {line.pre}
      {line.em && (
        <em className="bg-linear-to-r from-green-300 via-green-500 to-green-400 bg-clip-text font-bold italic text-transparent">
          {line.em}
        </em>
      )}
      {line.post}
    </span>
  );
}

interface HeroStat {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  label: string;
}

const HERO_STATS: HeroStat[] = [
  { icon: Languages, value: 7151, suffix: "+", label: "languages spoken worldwide" },
  { icon: Hourglass, value: 1, suffix: " in 5", label: "people still wait for Scripture" },
  { icon: PenSquare, value: 2617, label: "languages with translation underway" },
];

function useCountUp(target: number, durationMs = 1200) {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return value;
}

function HeroStatTile({ icon: StatIcon, value, suffix, label }: HeroStat) {
  const count = useCountUp(value);
  return (
    <div className="flex items-end gap-4 rounded-lg border border-white/8 bg-black/8 px-5 py-4 backdrop-blur-[2px]">
      <span className="inline-flex h-[46px] w-[46px] flex-none items-center justify-center rounded-[14px] border border-green-300/25 bg-green-500/15">
        <StatIcon size={22} className="text-green-300" />
      </span>
      <div>
        <div className="font-display text-xl font-semibold leading-none text-white">
          <span className="font-mono">{count.toLocaleString()}</span>
          {suffix && <span className="ml-1 text-md text-green-300">{suffix}</span>}
        </div>
        <div className="mt-1.5 font-ui text-sm text-white">{label}</div>
      </div>
    </div>
  );
}

/** Home's auto-rotating photo hero: slide copy + CTAs, dot/arrow controls, count-up stat tiles. */
export function HomeHero() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [index]);

  const go = (dir: number) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);

  return (
    <section
      className="relative min-h-[760px] overflow-hidden bg-terra-900 sm:h-[calc(100svh-42px)] sm:min-h-[680px]"
      style={{
        marginTop: "calc(var(--site-main-header-height) * -1)",
      }}
    >
      {SLIDES.map(
        (slide, i) =>
          slide.image && (
            <div
              key={slide.eyebrow}
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0 will-change-[opacity,transform] transition-[opacity,transform] duration-[2000ms] ease-in-out motion-reduce:scale-100 motion-reduce:transition-none",
                i === index ? "scale-100 opacity-100" : "scale-[1.012] opacity-0",
              )}
            >
              <Image
                src={slide.image}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: slide.imagePosition ?? "50% 50%" }}
              />
            </div>
          ),
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 680px at 8% -10%, rgba(58,18,8,.42), transparent 58%), radial-gradient(900px 600px at 100% 110%, rgba(18,62,13,.2), transparent 58%), linear-gradient(160deg, rgba(24,12,8,.82), rgba(12,9,7,.88))",
        }}
      />
      <div className="relative mx-auto flex h-full min-h-[760px] max-w-(--container-max) flex-col justify-center px-5 pb-40 pt-52 sm:min-h-0 sm:px-12">
        {/* All slides share one grid cell so the hero always sizes to the tallest slide. */}
        <div className="grid">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.eyebrow}
              aria-hidden={i !== index}
              className={cn(
                "col-start-1 row-start-1 will-change-[opacity,transform] transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:transition-none",
                i === index
                  ? "translate-y-0 opacity-100 delay-300"
                  : "pointer-events-none translate-y-2 opacity-0 delay-0",
              )}
            >
              <div className="flex items-center gap-3.5 font-ui text-sm font-bold uppercase tracking-[0.24em] text-green-400">
                <span className="h-[2px] w-[34px] bg-green-500" />
                {slide.eyebrow}
              </div>
              <h1 className="mt-5 font-display text-[clamp(40px,5.2vw,72px)] font-normal leading-[1.02] text-white">
                <HeadingLine line={slide.line1} />
                <HeadingLine line={slide.line2} />
              </h1>
              <p className="mt-6 max-w-[52ch] font-body text-md leading-relaxed text-white">{slide.body}</p>
              <div className="mt-9 flex flex-wrap gap-3.5">
                <Button href={slide.ctaA.href} variant="accent" iconRight={<ChevronRight size={16} />}>
                  {slide.ctaA.label}
                </Button>
                <Button href={slide.ctaB.href} className="border-white/35 bg-white/10 text-white hover:bg-white/20">
                  {slide.ctaB.label}
                </Button>
              </div>
              {slide.photoCredit && slide.photoCreditHref && (
                <p className="mt-5 font-ui text-xs text-white/85">
                  Photo:{" "}
                  <a
                    href={slide.photoCreditHref}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-white/35 underline-offset-2 hover:text-white"
                  >
                    {slide.photoCredit}
                  </a>{" "}
                  ·{" "}
                  <a
                    href="https://creativecommons.org/licenses/by/4.0/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-white/35 underline-offset-2 hover:text-white"
                  >
                    CC BY 4.0
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn("h-2 rounded-pill transition-all", i === index ? "w-7 bg-green-400" : "w-2 bg-white/35")}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white hover:bg-white/10 sm:flex"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white hover:bg-white/10 sm:flex"
      >
        <ChevronRight size={22} />
      </button>

      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-11 sm:px-12">
        <div className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-3.5 sm:grid-cols-3">
          {HERO_STATS.map((s) => (
            <HeroStatTile key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
