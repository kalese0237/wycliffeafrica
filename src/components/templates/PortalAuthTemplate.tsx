import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Wordmark } from "@/components/atoms/Wordmark";

export interface PortalAuthTemplateProps {
  children: React.ReactNode;
}

/** Full-screen portal authentication layout shared by login and password recovery pages. */
export function PortalAuthTemplate({ children }: PortalAuthTemplateProps) {
  return (
    <main className="grid min-h-svh bg-page lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden min-h-svh overflow-hidden bg-[radial-gradient(120%_95%_at_50%_118%,#FFE0A6_0%,#F0A544_24%,#C85E22_54%,#7C3417_100%)] px-12 py-12 text-white lg:flex lg:flex-col lg:justify-between xl:px-16 xl:py-14">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-36 -top-32 h-[420px] w-[420px] rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(circle, #FFF4D6 0%, #FFDE96 45%, rgba(255,222,150,0) 70%)",
          }}
        />
        <Link href="/" className="relative z-10 w-fit" aria-label="Wycliffe Africa home">
          <Wordmark height={52} onDark />
          <span className="mt-2 block font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#FFE9C4]">
            Field Portal
          </span>
        </Link>

        <div className="relative z-10 max-w-[470px]">
          <p className="mb-4 font-ui text-xs font-bold uppercase tracking-[0.24em] text-[#FFE9C4]">
            From the field
          </p>
          <h1 className="font-display text-[clamp(2.5rem,4.5vw,4rem)] font-semibold leading-[1.06] text-white [text-shadow:0_2px_18px_rgba(120,40,0,.25)]">
            Send word home from the field.
          </h1>
          <p className="mt-5 max-w-[42ch] font-body text-lg leading-relaxed text-[#FFF3E0]">
            Share your updates, stories, and prayer requests with the team and the partners standing
            with you.
          </p>
        </div>

        <blockquote className="relative z-10 max-w-[440px] border-l-[3px] border-white/50 pl-4 font-display text-md italic leading-relaxed text-[#FFE9C4]">
          “How beautiful are the feet of those who bring good news.”
          <cite className="mt-1 block font-ui text-sm not-italic text-white/75">Romans 10:15</cite>
        </blockquote>
      </section>

      <section className="flex min-h-svh items-center justify-center px-5 py-12 sm:px-10 lg:px-12">
        <div className="w-full max-w-[420px]">
          <Link href="/" className="mb-10 inline-block lg:hidden" aria-label="Wycliffe Africa home">
            <Wordmark height={46} />
            <span className="mt-1 block font-ui text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Field Portal
            </span>
          </Link>
          <Link
            href="/"
            className="mb-7 flex w-fit items-center gap-2 font-ui text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            <ArrowLeft size={16} />
            Back to main website
          </Link>
          {children}
        </div>
      </section>
    </main>
  );
}
