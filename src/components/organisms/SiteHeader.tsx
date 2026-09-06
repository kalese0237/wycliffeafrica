"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Search, Heart, Menu, User, X } from "lucide-react";
import { Wordmark } from "@/components/atoms/Wordmark";
import { Button } from "@/components/atoms/Button";
import { TopBar } from "@/components/organisms/TopBar";
import { cn } from "@/lib/cn";

interface NavItem {
  label: string;
  href: string;
  menu?: [label: string, href: string, nested?: boolean][];
}

interface NavGroup {
  label: string;
  links: [string, string][];
}

const PRIMARY_NAV: NavItem[] = [
  {
    label: "About Us",
    href: "/about",
    menu: [
      ["Why Bible Translation", "/about/why-bible-translation"],
      ["What We Believe", "/about/what-we-believe"],
      ["Our Core Values", "/about/what-we-believe#core-values", true],
      ["Leadership", "/about/leadership"],
    ],
  },
  {
    label: "Missionaries",
    href: "/missionaries",
  },
  {
    label: "Get Involved",
    href: "/involved",
    menu: [
      ["Pray With Us", "/prayer"],
      ["Prayer Requests", "/prayer/requests", true],
      ["Become a Member", "/involved"],
      ["Serve Part-Time", "/involved"],
      ["Support a Missionary", "/missionaries"],
      ["Church Partnership", "/involved/partnership"],
      ["Motivate your Church", "/involved/motivate-your-church"],
    ],
  },
  {
    label: "Projects",
    href: "/projects",
    menu: [
      ["Internship Program", "/projects/internship-program"],
      ["Meet our Interns", "/interns"],
      ["SunRise Africa Centre", "/projects/sunrise-africa-centre"],
    ],
  },
  {
    label: "News",
    href: "/news",
  },
  {
    label: "Resources",
    href: "/resources",
    menu: [
      ["Where to get Training", "/resources/training"],
      ["Staff Positions Needed", "/resources"],
      ["Application Process", "/resources"],
      ["Preliminary Questionnaire", "/questionnaire"],
      ["Downloads", "/resources"],
    ],
  },
];

const SECONDARY_NAV: NavGroup[] = [
  {
    label: "More",
    links: [
      ["FAQs", "/faqs"],
      ["Contact", "/contact"],
    ],
  },
  {
    label: "Account",
    links: [["Missionary Portal", "/portal/login"]],
  },
];

const TOP_BAR_HEIGHT = 42;
const MAIN_HEADER_HEIGHT = 74;
const COMPACT_MAIN_HEADER_HEIGHT = 60;

function isActivePath(pathname: string, href: string) {
  const targetPath = href.split(/[?#]/, 1)[0];
  if (!targetPath || targetPath === "/") return pathname === targetPath;
  return pathname === targetPath || pathname.startsWith(`${targetPath}/`);
}

export interface SiteHeaderProps {
  /** Renders transparent-over-photo (white type) until the page scrolls, for hero pages. */
  transparent?: boolean;
}

export function SiteHeader({ transparent = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const scrolledRef = React.useRef(false);

  React.useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        // Separate collapse/expand thresholds prevent chattering when the
        // changing header height affects scroll anchoring near the page top.
        const nextScrolled = scrolledRef.current ? window.scrollY > 8 : window.scrollY > 48;
        if (nextScrolled === scrolledRef.current) return;
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
      document.documentElement.style.removeProperty("--site-header-height");
      document.documentElement.style.removeProperty("--site-header-stack-height");
    };
  }, []);

  React.useEffect(() => {
    const topbarHeight = scrolled ? 0 : TOP_BAR_HEIGHT;
    const mainHeaderHeight = scrolled ? COMPACT_MAIN_HEADER_HEIGHT : MAIN_HEADER_HEIGHT;

    document.documentElement.style.setProperty("--site-header-height", `${mainHeaderHeight}px`);
    document.documentElement.style.setProperty(
      "--site-header-stack-height",
      `${topbarHeight + mainHeaderHeight}px`,
    );
  }, [scrolled]);

  React.useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  React.useEffect(() => {
    if (!drawerOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [drawerOpen]);

  const onPhoto = transparent && !scrolled;

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <div
          style={{
            height: scrolled ? 0 : TOP_BAR_HEIGHT,
          }}
          className="overflow-hidden transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        >
          <TopBar />
        </div>

        <header
          style={{
            height: scrolled ? COMPACT_MAIN_HEADER_HEIGHT : MAIN_HEADER_HEIGHT,
          }}
          className={cn(
            "relative flex items-center px-5 transition-[height,background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:px-12",
            scrolled && "shadow-sm",
            onPhoto ? "border-b border-white/15 bg-transparent" : "border-b border-hair bg-card/95 backdrop-blur",
          )}
        >
          {/* Align the wordmark with the responsive start edge used by page content. */}
          <Link
            href="/"
            aria-label="Wycliffe Africa home"
            className={cn(
              "absolute left-5 top-1/2 h-[50px] w-[132px] origin-left -translate-y-1/2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:left-[max(3rem,calc((100vw-var(--container-max))/2+3rem))]",
              scrolled && "scale-[0.82]",
            )}
          >
            <Wordmark
              height={50}
              className={cn(
                "absolute inset-0 transition-opacity duration-500 ease-out motion-reduce:transition-none",
                onPhoto ? "opacity-0" : "opacity-100",
              )}
            />
            <span aria-hidden className="absolute inset-0">
              <Wordmark
                height={50}
                onDark
                className={cn(
                  "absolute inset-0 transition-opacity duration-500 ease-out motion-reduce:transition-none",
                  onPhoto ? "opacity-100" : "opacity-0",
                )}
              />
            </span>
          </Link>

          {/* Sized so its left edge matches the body content edge (container minus its 3rem side paddings);
              the pl guard keeps the nav clear of the absolute logo until the container edge passes it (~1420px). */}
          <div
            className={cn(
              "mx-auto flex w-full max-w-[calc(var(--container-max)-6rem)] items-center transition-[gap,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:pl-[145px]",
              scrolled ? "gap-4" : "gap-6",
            )}
          >
            <div className="flex-1" />

            <nav className="-ml-3 hidden flex-none items-center gap-0.5 xl:flex">
              {PRIMARY_NAV.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <div key={item.label} className="group relative">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      aria-haspopup={item.menu ? "menu" : undefined}
                      className={cn(
                        "relative inline-flex items-center gap-1 whitespace-nowrap rounded-sm px-3 font-ui text-sm font-semibold transition-[padding,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                        scrolled ? "py-1.5" : "py-2.5",
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
                      <div className="invisible absolute left-0 top-full z-10 min-w-[240px] translate-y-1 rounded-md border border-hair bg-card py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                        {item.menu.map(([label, href, nested]) => (
                          <Link
                            key={label}
                            href={href}
                            className={cn(
                              "block py-2 font-ui text-sm text-body hover:bg-sunk hover:text-green-700",
                              nested ? "pl-8 pr-4 text-muted" : "px-4",
                            )}
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

          <div className="flex flex-none items-center gap-1 sm:gap-1.5">
            <Button
              href="/give"
              variant="accent"
              size="sm"
              iconLeft={<Heart size={14} />}
              className={cn(
                "hidden transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:inline-flex",
                scrolled ? "h-9" : "h-10",
              )}
            >
              Give now
            </Button>

            <button
              type="button"
              aria-label="Search"
              className={cn(
                "hidden flex-none items-center justify-center rounded-full transition-[height,width,color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:inline-flex",
                scrolled ? "h-9 w-9" : "h-10 w-10",
                onPhoto ? "text-white hover:bg-white/10" : "text-body hover:bg-sunk",
              )}
            >
              <Search size={18} className="-translate-x-px" />
            </button>

            <Link
              href="/portal/login"
              aria-label="Missionary portal sign in"
              className={cn(
                "hidden flex-none items-center justify-center rounded-full transition-[height,width,color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:inline-flex",
                scrolled ? "h-9 w-9" : "h-10 w-10",
                onPhoto ? "text-white hover:bg-white/10" : "text-body hover:bg-sunk",
              )}
            >
              <User size={18} />
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              aria-controls="site-menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
              className={cn(
                "inline-flex flex-none items-center justify-center rounded-full transition-[height,width,color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                scrolled ? "h-9 w-9" : "h-10 w-10",
                onPhoto ? "text-white hover:bg-white/10" : "text-body hover:bg-sunk",
              )}
            >
              <Menu size={20} strokeWidth={2.2} />
            </button>
          </div>
          </div>
        </header>
      </div>
      <div aria-hidden style={{ height: TOP_BAR_HEIGHT + MAIN_HEADER_HEIGHT }} />

      <div
        aria-hidden={!drawerOpen}
        onClick={() => setDrawerOpen(false)}
        className={cn(
          "fixed inset-0 z-70 bg-black/55 backdrop-blur-[5px] transition-opacity duration-300",
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <nav
        id="site-menu"
        aria-label="Site menu"
        aria-hidden={!drawerOpen}
        className={cn(
          "fixed inset-y-0 right-0 z-71 flex w-[min(720px,92vw)] flex-col overflow-y-auto bg-card shadow-lg transition-transform duration-420 ease-[cubic-bezier(0,0,0.2,1)]",
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
          {PRIMARY_NAV.map((item) => (
            <section key={item.label}>
              <Link
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                className={cn(
                  "block max-w-[12ch] font-display text-[34px] font-semibold leading-[1.15] text-body transition-colors hover:text-green-700",
                  item.menu && "mb-6",
                  isActivePath(pathname, item.href) && "text-green-700",
                )}
              >
                {item.label}
              </Link>
              {item.menu && (
                <ul className="space-y-5">
                  {item.menu.map(([label, href, nested]) => (
                    <li key={`${item.label}-${label}`}>
                      <Link
                        href={href}
                        onClick={() => setDrawerOpen(false)}
                        className={cn(
                          "block max-w-[16ch] font-ui leading-snug tracking-wide text-body transition-colors hover:text-green-700",
                          nested ? "pl-4 text-md text-muted" : "text-[22px]",
                          isActivePath(pathname, href) && "text-green-700",
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

          {SECONDARY_NAV.map((group) => (
            <section key={group.label} className="border-t border-hair pt-7">
              <h2 className="mb-5 font-ui text-xs font-bold uppercase tracking-caps text-muted">
                {group.label}
              </h2>
              <ul className="space-y-4">
                {group.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      onClick={() => setDrawerOpen(false)}
                      aria-current={isActivePath(pathname, href) ? "page" : undefined}
                      className={cn(
                        "block font-ui text-[20px] leading-snug tracking-wide text-body transition-colors hover:text-green-700",
                        isActivePath(pathname, href) && "text-green-700",
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </nav>
    </>
  );
}
