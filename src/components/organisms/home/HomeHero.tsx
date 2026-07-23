"use client";

import * as React from "react";
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
}

const SLIDES: Slide[] = [
  {
    eyebrow: "Wycliffe Africa",
    line1: { pre: "Raising missionaries" },
    line2: { em: "for Bible translation" },
    body: "Millions across Africa still wait to hear God speak their language. We raise up African missionaries for the translation work that will change that.",
    ctaA: { label: "Why Bible translation", href: "/about" },
    ctaB: { label: "What we believe", href: "/about" },
  },
  {
    eyebrow: "Training & sending",
    line1: { pre: "Equipping ", em: "African" },
    line2: { em: "missionaries", post: " for the field" },
    body: "Translation teams need linguists, but also teachers, accountants and IT specialists. We train Africans and send them to the field — for a season or for a lifetime.",
    ctaA: { label: "Meet our missionaries", href: "/missionaries" },
    ctaB: { label: "Become a member", href: "/involved" },
  },
  {
    eyebrow: "Church partnership",
    line1: { pre: "Mobilising" },
    line2: { em: "churches", post: " across Africa" },
    body: "We help congregations take a language community as their own: praying for it by name, funding its project, sending it people.",
    ctaA: { label: "Partner your church", href: "/involved/partnership" },
    ctaB: { label: "Give today", href: "/give" },
  },
];

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
    <div className="flex items-end gap-4 rounded-lg border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur-sm">
      <span className="inline-flex h-[46px] w-[46px] flex-none items-center justify-center rounded-[14px] border border-green-300/25 bg-green-500/15">
        <StatIcon size={22} className="text-green-300" />
      </span>
      <div>
        <div className="font-display text-xl font-semibold leading-none text-white">
          <span className="font-mono">{count.toLocaleString()}</span>
          {suffix && <span className="ml-1 text-md text-green-300">{suffix}</span>}
        </div>
        <div className="mt-1.5 font-ui text-sm text-white/62">{label}</div>
      </div>
    </div>
  );
}

/** Home's auto-rotating photo hero: slide copy + CTAs, dot/arrow controls, count-up stat tiles. */
export function HomeHero() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 12000);
    return () => clearInterval(id);
  }, []);

  const go = (dir: number) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);

  return (
    <section
      className="relative min-h-[88vh] overflow-hidden bg-navy-900"
      style={{
        marginTop: "calc(var(--site-main-header-height) * -1)",
        paddingTop: "var(--site-main-header-height)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 700px at 12% -10%, rgba(36,42,94,.55), transparent 55%), radial-gradient(900px 600px at 100% 110%, rgba(51,176,15,.28), transparent 55%), linear-gradient(160deg, rgba(16,18,51,.86), rgba(11,12,38,.92))",
        }}
      />
      <div className="relative mx-auto flex min-h-[88vh] max-w-[var(--container-max)] flex-col justify-center px-5 pb-40 pt-52 sm:px-12">
        {/* All slides share one grid cell so the hero always sizes to the tallest slide. */}
        <div className="grid">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.eyebrow}
              aria-hidden={i !== index}
              className={cn(
                "col-start-1 row-start-1 transition-opacity duration-[1200ms] ease-[cubic-bezier(0,0,0.2,1)]",
                i === index ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <div className="flex items-center gap-3.5 font-ui text-sm font-bold uppercase tracking-[0.24em] text-green-400">
                <span className="h-[2px] w-[34px] bg-green-500" />
                {slide.eyebrow}
              </div>
              <h1 className="mt-5 font-display text-[clamp(34px,4.5vw,58px)] font-normal leading-[1.04] text-white">
                <HeadingLine line={slide.line1} />
                <HeadingLine line={slide.line2} />
              </h1>
              <p className="mt-6 max-w-[52ch] font-body text-md leading-relaxed text-white/75">{slide.body}</p>
              <div className="mt-9 flex flex-wrap gap-3.5">
                <Button href={slide.ctaA.href} variant="accent" iconRight={<ChevronRight size={16} />}>
                  {slide.ctaA.label}
                </Button>
                <Button href={slide.ctaB.href} className="border-white/35 bg-white/10 text-white hover:bg-white/20">
                  {slide.ctaB.label}
                </Button>
              </div>
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
        <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 gap-3.5 sm:grid-cols-3">
          {HERO_STATS.map((s) => (
            <HeroStatTile key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
