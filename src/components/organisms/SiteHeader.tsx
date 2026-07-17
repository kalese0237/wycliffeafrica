"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Search, Heart, X } from "lucide-react";
import { Wordmark } from "@/components/atoms/Wordmark";
import { Button } from "@/components/atoms/Button";
import { TopBar } from "@/components/organisms/TopBar";
import { cn } from "@/lib/cn";

interface NavItem {
  label: string;
  href: string;
  menu?: [string, string][];
}

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    menu: [
      ["Why Bible Translation", "/about"],
      ["What We Believe", "/about"],
      ["Our Core Values", "/about"],
      ["Leadership", "/about"],
    ],
  },
  {
    label: "Our Missionaries",
    href: "/missionaries",
    menu: [
      ["Our Missionaries", "/missionaries"],
      ["Support Your Missionary", "/missionaries"],
    ],
  },
  {
    label: "Get Involved",
    href: "/involved",
    menu: [
      ["Become a Member", "/involved"],
      ["Serve Part-Time", "/involved"],
      ["Support a Missionary", "/missionaries"],
      ["Church Partnership", "/involved/partnership"],
      ["Motivate your Church", "/involved/motivate-your-church"],
      ["Pray with Us", "/involved"],
      ["Give", "/give"],
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    menu: [
      ["Where to get Training", "/resources"],
      ["Staff Positions Needed", "/resources"],
      ["Application Process", "/resources"],
      ["Preliminary Questionnaire", "/questionnaire"],
      ["Downloads", "/resources"],
    ],
  },
  { label: "FAQs", href: "/faqs" },
  { label: "Media", href: "/stories" },
  { label: "Updates", href: "/updates" },
  { label: "Contact", href: "/contact" },
];

const TOP_BAR_HEIGHT = 42;
const MAIN_HEADER_HEIGHT = 74;
const COMPACT_MAIN_HEADER_HEIGHT = 48;

function HamburgerIcon({ compact = false }: { compact?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn("flex flex-col justify-between", compact ? "h-[13px] w-[20px]" : "h-[16px] w-[24px]")}
    >
      <span className="h-[2px] w-full rounded-pill bg-current" />
      <span className="h-[2px] w-full rounded-pill bg-current" />
      <span className="h-[2px] w-full rounded-pill bg-current" />
    </span>
  );
}

export interface SiteHeaderProps {
  /** Renders transparent-over-photo (white type) until the page scrolls, for hero pages. */
  transparent?: boolean;
}

export function SiteHeader({ transparent = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    const setHeaderVars = (isScrolled: boolean) => {
      const topbarHeight = isScrolled ? 0 : TOP_BAR_HEIGHT;
      const mainHeaderHeight = isScrolled ? COMPACT_MAIN_HEADER_HEIGHT : MAIN_HEADER_HEIGHT;

      document.documentElement.style.setProperty("--site-topbar-height", `${topbarHeight}px`);
      document.documentElement.style.setProperty("--site-main-header-height", `${mainHeaderHeight}px`);
      document.documentElement.style.setProperty("--site-header-height", `${mainHeaderHeight}px`);
      document.documentElement.style.setProperty(
        "--site-header-stack-height",
        `${topbarHeight + mainHeaderHeight}px`,
      );
    };
    const onScroll = () => {
      const isScrolled = window.scrollY > 4;
      setScrolled(isScrolled);
      setHeaderVars(isScrolled);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.documentElement.style.removeProperty("--site-topbar-height");
      document.documentElement.style.removeProperty("--site-main-header-height");
      document.documentElement.style.removeProperty("--site-header-height");
      document.documentElement.style.removeProperty("--site-header-stack-height");
    };
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const onPhoto = transparent && !scrolled;

  return (
    <>
      <div className="sticky top-0 z-50">
        <div
          style={{
            height: "var(--site-topbar-height)",
            minHeight: "var(--site-topbar-height)",
            maxHeight: "var(--site-topbar-height)",
          }}
          className="overflow-hidden transition-[height,min-height,max-height] duration-[300ms]"
        >
          <TopBar />
        </div>

        <header
          style={{
            height: "var(--site-main-header-height)",
            minHeight: "var(--site-main-header-height)",
            maxHeight: "var(--site-main-header-height)",
          }}
          className={cn(
            "relative flex items-center px-5 transition-[height,min-height,max-height,background-color,border-color,box-shadow] duration-[300ms] sm:px-12",
            scrolled && "shadow-sm",
            onPhoto ? "border-b border-white/15 bg-transparent" : "border-b border-hair bg-card/95 backdrop-blur",
          )}
        >
          {/* The logo stays anchored to the viewport edge, outside the centered container. */}
          <Link href="/" className="absolute left-5 top-1/2 -translate-y-1/2 sm:left-12">
            <Wordmark height={scrolled ? 24 : 40} onDark={onPhoto} />
          </Link>

          {/* Sized so its left edge matches the body content edge (container minus its 3rem side paddings);
              the pl guard keeps the nav clear of the absolute logo until the container edge passes it (~1420px). */}
          <div
            className={cn(
              "mx-auto flex w-full max-w-[calc(var(--container-max)_-_6rem)] items-center transition-[gap,padding] duration-[300ms] lg:max-[1419px]:pl-[118px]",
              scrolled ? "gap-3" : "gap-6",
            )}
          >
            <nav className="-ml-3 hidden flex-none items-center gap-0.5 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <div key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "relative inline-flex items-center gap-1 whitespace-nowrap rounded-sm px-3 font-ui font-semibold transition-[padding,font-size,color] duration-[300ms]",
                      scrolled ? "py-1 text-sm" : "py-2.5 text-[15px]",
                      onPhoto ? "text-white/90 hover:text-white" : "text-body hover:text-green-700",
                      active && (onPhoto ? "text-white" : "text-green-700"),
                    )}
                  >
                    {item.label}
                    {item.menu && <ChevronDown size={15} />}
                    <span
                      className={cn(
                        "absolute inset-x-3 bottom-1 h-[2px] origin-left scale-x-0 bg-green-500 transition-transform duration-300 group-hover:scale-x-100",
                        active && "scale-x-100",
                      )}
                    />
                  </Link>
                  {item.menu && (
                    <div className="invisible absolute left-0 top-full z-10 min-w-[240px] translate-y-1 rounded-md border border-hair bg-card py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {item.menu.map(([label, href]) => (
                        <Link
                          key={label}
                          href={href}
                          className="block px-4 py-2 font-ui text-sm text-body hover:bg-sunk hover:text-green-700"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex-1" />

          <button
            type="button"
            aria-label="Search"
            className={cn(
              "hidden flex-none items-center justify-center rounded-full border transition-[height,width,color,background-color,border-color] duration-[300ms] sm:inline-flex",
              scrolled ? "h-8 w-8" : "h-10 w-10",
              onPhoto ? "border-white/35 text-white" : "border-hair text-body hover:bg-sunk",
            )}
          >
            <Search size={scrolled ? 16 : 18} />
          </button>

          <Button
            href="/give"
            variant="accent"
            size={scrolled ? "sm" : "md"}
            iconLeft={<Heart size={16} />}
            className="hidden sm:inline-flex"
          >
            Give now
          </Button>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            className={cn(
              "inline-flex flex-none items-center justify-center rounded-sm border transition-[height,width,color,background-color,border-color] duration-[300ms]",
              scrolled ? "h-8 w-8" : "h-10 w-10",
              onPhoto ? "border-white/35 bg-white/90 text-body hover:bg-white" : "border-paper-2 bg-paper-2 text-body hover:bg-paper-3",
            )}
          >
            <HamburgerIcon compact={scrolled} />
          </button>
          </div>
        </header>
      </div>

      <div
        aria-hidden={!drawerOpen}
        onClick={() => setDrawerOpen(false)}
        className={cn(
          "fixed inset-0 z-[70] bg-black/55 backdrop-blur-[5px] transition-opacity duration-300",
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <nav
        aria-label="Site menu"
        className={cn(
          "fixed inset-y-0 right-0 z-[71] flex w-[min(720px,92vw)] flex-col overflow-y-auto bg-card shadow-lg transition-transform duration-[420ms] ease-[cubic-bezier(0,0,0.2,1)]",
          drawerOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 14%, transparent 0 54px, var(--color-ink-1) 55px 56px, transparent 57px), radial-gradient(circle at 66% 22%, transparent 0 80px, var(--color-ink-1) 81px 82px, transparent 83px), radial-gradient(circle at 80% 72%, transparent 0 96px, var(--color-ink-1) 97px 98px, transparent 99px), linear-gradient(135deg, transparent 47%, var(--color-ink-1) 48%, transparent 49%)",
            backgroundSize: "260px 220px, 340px 300px, 420px 360px, 120px 120px",
          }}
        />
        <div className="relative flex justify-end px-5 pt-5 sm:px-8 sm:pt-6">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-body transition-colors hover:bg-sunk"
          >
            <X size={30} strokeWidth={2.2} />
          </button>
        </div>

        <div className="relative grid gap-10 px-8 pb-14 pt-6 sm:px-16 sm:pt-5 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-12 lg:px-16">
          {NAV.map((item) => (
            <section key={item.label}>
              <Link
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                className={cn(
                  "mb-6 block max-w-[12ch] font-display text-[34px] font-semibold leading-[1.15] text-body transition-colors hover:text-green-700",
                  pathname === item.href && "text-green-700",
                )}
              >
                {item.label}
              </Link>
              {item.menu && (
                <ul className="space-y-5">
                  {item.menu.map(([label, href]) => (
                    <li key={`${item.label}-${label}`}>
                      <Link
                        href={href}
                        onClick={() => setDrawerOpen(false)}
                        className={cn(
                          "block max-w-[16ch] font-ui text-[22px] leading-snug tracking-wide text-body transition-colors hover:text-green-700",
                          pathname === href && "text-green-700",
                        )}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </nav>
    </>
  );
}
