import * as React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";

export interface ProjectHeroCta {
  label: string;
  href: string;
}

export interface ProjectHeroProps {
  title: string;
  /** Optional editorial line breaks for consistent project-title composition. */
  titleLines?: readonly string[];
  lede: string;
  image?: string;
  imagePosition?: string;
  /** Uses the slightly deeper orange/burgundy treatment from the Internship design. */
  deep?: boolean;
  /** Constrains title wrapping; defaults to the standard 19ch measure. */
  titleMaxWidth?: string;
  primaryCta: ProjectHeroCta;
  secondaryCta?: ProjectHeroCta;
}

/** Full-bleed photo header shared by the two project pages. */
export function ProjectHero({
  title,
  titleLines,
  lede,
  image,
  imagePosition = "50% 50%",
  deep = false,
  titleMaxWidth = "19ch",
  primaryCta,
  secondaryCta,
}: ProjectHeroProps) {
  return (
    <section
      className="relative min-h-[620px] overflow-hidden bg-terra-900 text-white sm:min-h-[708px]"
      style={{
        marginTop: "calc(var(--site-main-header-height) * -1)",
        background: deep
          ? "radial-gradient(120% 95% at 50% 118%, #F0A544 0%, #C85E22 54%, #3A170C 100%)"
          : "radial-gradient(120% 90% at 50% 118%, #F6A93F 0%, #D9691E 55%, #3A170C 100%)",
      }}
    >
      {image && (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: imagePosition }}
        />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: deep
            ? "linear-gradient(180deg, rgba(39,15,7,.84) 0%, rgba(61,22,7,.72) 30%, rgba(145,55,10,.58) 66%, rgba(207,88,11,.78) 100%)"
            : "linear-gradient(180deg, rgba(35,15,7,.83) 0%, rgba(58,23,8,.7) 32%, rgba(145,57,12,.57) 68%, rgba(201,88,15,.78) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(25,10,5,.3), transparent 28%, transparent 72%, rgba(25,10,5,.3))",
        }}
      />
      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-(--container-max) flex-col items-center justify-center px-5 pb-20 pt-32 text-center sm:min-h-[708px] sm:px-12 sm:pb-24 sm:pt-40">
        <h1
          className="wonk text-balance font-display text-[clamp(2.4rem,4.2vw,3.6rem)] font-semibold leading-[1.03] text-white"
          style={{ maxWidth: titleMaxWidth, textShadow: "0 2px 18px rgba(20,8,2,.4)" }}
        >
          {titleLines?.length
            ? titleLines.map((line) => (
                <span key={line} className="block sm:whitespace-nowrap">
                  {line}
                </span>
              ))
            : title}
        </h1>
        <p className="mt-7 max-w-[690px] font-body text-[clamp(1.15rem,1.7vw,1.4rem)] leading-relaxed text-white/90">
          {lede}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <Button
            href={primaryCta.href}
            variant="accent"
            size="lg"
            iconRight={<ChevronRight size={16} />}
            className="min-w-[230px] border-green-700 bg-green-700 text-white shadow-lg hover:bg-green-600"
          >
            {primaryCta.label}
          </Button>
          {secondaryCta && (
            <Button
              href={secondaryCta.href}
              size="lg"
              className="min-w-[255px] border-white/45 bg-white/5 text-white shadow-none hover:bg-white/15"
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
