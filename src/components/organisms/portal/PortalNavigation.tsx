import * as React from "react";
import Link from "next/link";
import { House, LayoutDashboard, LogOut } from "lucide-react";
import { Wordmark } from "@/components/atoms/Wordmark";
import { logoutAction } from "@/lib/portal/actions";

export interface PortalNavigationProps {
  name: string;
  place?: string;
  compact?: boolean;
}

/** Desktop sidebar and compact mobile navigation for the authenticated portal. */
export function PortalNavigation({ name, place, compact = false }: PortalNavigationProps) {
  if (compact) {
    return (
      <div className="sticky top-0 z-30 flex items-center justify-between bg-[#2A2018] px-5 py-3 text-[#F3D9B4] lg:hidden">
        <Link href="/" aria-label="Wycliffe Africa home">
          <Wordmark height={34} onDark />
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 font-ui text-xs font-bold uppercase tracking-caps text-[#F3B963] transition-colors hover:text-white"
        >
          <House size={14} />
          Main website
        </Link>
      </div>
    );
  }

  const links = [{ href: "#dashboard", label: "Dashboard", icon: LayoutDashboard }];

  return (
    <aside className="sticky top-0 hidden h-svh w-[250px] flex-col bg-[#2A2018] px-5 py-7 text-[#CDBBA6] lg:flex">
      <Link href="/" className="mb-8 px-2" aria-label="Wycliffe Africa home">
        <Wordmark height={44} onDark />
        <span className="mt-2 block font-ui text-xs font-bold uppercase tracking-caps text-[#F3B963]">
          Field Portal
        </span>
      </Link>

      <nav className="space-y-2" aria-label="Portal navigation">
        {links.map(({ href, label, icon: NavIcon }, index) => (
          <a
            key={href}
            href={href}
            className={[
              "flex items-center gap-3 rounded-md px-3.5 py-3 font-ui text-sm font-semibold transition-colors",
              index === 0 ? "bg-primary text-white" : "text-[#CDBBA6] hover:bg-white/6 hover:text-white",
            ].join(" ")}
          >
            <NavIcon size={19} />
            {label}
          </a>
        ))}
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md px-3.5 py-3 font-ui text-sm font-semibold text-[#CDBBA6] transition-colors hover:bg-white/6 hover:text-white"
        >
          <House size={19} />
          Back to main website
        </Link>
      </nav>

      <div className="mt-auto rounded-md border border-white/10 bg-white/5 p-4">
        <p className="font-ui text-xs text-[#F3B963]">Signed in as</p>
        <p className="mt-1 font-ui text-sm font-semibold text-white">{name}</p>
        {place && <p className="mt-0.5 font-ui text-xs text-[#CDBBA6]">{place}</p>}
        <form action={logoutAction} className="mt-3">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-md border border-white/15 px-3.5 py-2 font-ui text-sm font-semibold text-[#F3D9B4] transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
