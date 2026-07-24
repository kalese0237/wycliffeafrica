import * as React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";

export interface ProjectHeroCta {
  label: string;
  href: string;
}

export interface ProjectHeroProps {
  eyebrow: string;
  title: string;
  lede: string;
  image: string;
  imagePosition?: string;
  primaryCta: ProjectHeroCta;
  secondaryCta?: ProjectHeroCta;
}

/** Full-bleed photo hero with a centred lockup — used to open the Projects sub-pages. */
export function ProjectHero({
  eyebrow,
  title,
  lede,
  image,
  imagePosition = "50% 50%",
  primaryCta,
  secondaryCta,
}: ProjectHeroProps) {
  return (
    <section
      className="relative min-h-[68vh] overflow-hidden bg-terra-900"
      style={{
        marginTop: "calc(var(--site-main-header-height) * -1)",
        paddingTop: "var(--site-main-header-height)",
      }}
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: imagePosition }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 118%, rgba(255,224,166,.4) 0%, rgba(246,169,63,.5) 26%, rgba(217,105,30,.68) 55%, rgba(31,15,8,.88) 100%)",
        }}
      />
      <div className="relative z-10 mx-auto flex min-h-[68vh] max-w-(--container-max) flex-col items-center justify-center px-5 py-24 text-center sm:px-12">
        <div className="mb-5 font-ui text-xs font-bold uppercase tracking-[0.24em] text-amber-200">{eyebrow}</div>
        <h1 className="max-w-[20ch] text-balance font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.08] text-white">
          {title}
        </h1>
        <p className="mt-6 max-w-[60ch] font-body text-md leading-relaxed text-white/85 sm:text-lg">{lede}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <Button href={primaryCta.href} variant="accent" size="lg" iconRight={<ChevronRight size={16} />}>
            {primaryCta.label}
          </Button>
          {secondaryCta && (
            <Button
              href={secondaryCta.href}
              size="lg"
              className="border-white/35 bg-white/10 text-white hover:bg-white/20"
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
