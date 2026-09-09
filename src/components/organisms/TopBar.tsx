import * as React from "react";
import { Mail, Phone, Facebook, Twitter, Youtube } from "lucide-react";

/**
 * TopBar — slim terra utility bar above the site header: email on a green
 * chip, social links and phone numbers right. Scrolls away with the page
 * (only the main header sticks).
 */
/** Shared by the three social links: a colour fade and a half-step lift on hover. */
const socialClassName =
  "text-white/80 transition-[color,transform] duration-130 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-px hover:text-white";

export function TopBar() {
  return (
    <div className="flex h-[42px] items-center justify-between bg-terra-900 font-ui text-sm text-white">
      <a
        href="mailto:info@wycliffeafrica.org"
        className="flex h-full items-center gap-2 bg-green-600 px-5 transition-colors duration-130 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-green-700 sm:px-7"
      >
        <Mail size={14} />
        info@wycliffeafrica.org
      </a>
      <div className="flex h-full items-center gap-5 px-5 sm:px-7">
        <span className="hidden items-center gap-4 sm:flex">
          <a href="#" aria-label="Facebook" className={socialClassName}>
            <Facebook size={15} />
          </a>
          <a href="#" aria-label="Twitter/X" className={socialClassName}>
            <Twitter size={15} />
          </a>
          <a href="#" aria-label="YouTube" className={socialClassName}>
            <Youtube size={16} />
          </a>
        </span>
        <span className="hidden h-4 w-px bg-white/20 sm:block" />
        <span className="flex items-center gap-2">
          <Phone size={14} className="text-green-300" />
          +254 701 345769 / +254 753 522370
        </span>
      </div>
    </div>
  );
}
