import * as React from "react";
import { Mail, Phone, Facebook, Twitter, Youtube } from "lucide-react";

/**
 * TopBar — slim navy utility bar above the site header: email on a green
 * chip, social links and phone numbers right. Scrolls away with the page
 * (only the main header sticks).
 */
export function TopBar() {
  return (
    <div className="flex h-[42px] items-center justify-between bg-navy-900 font-ui text-sm text-white">
      <a
        href="mailto:info@wycliffeafrica.org"
        className="flex h-full items-center gap-2 bg-green-600 px-5 hover:bg-green-700 sm:px-7"
      >
        <Mail size={14} />
        info@wycliffeafrica.org
      </a>
      <div className="flex h-full items-center gap-5 px-5 sm:px-7">
        <span className="hidden items-center gap-4 sm:flex">
          <a href="#" aria-label="Facebook" className="text-white/80 hover:text-white">
            <Facebook size={15} />
          </a>
          <a href="#" aria-label="Twitter/X" className="text-white/80 hover:text-white">
            <Twitter size={15} />
          </a>
          <a href="#" aria-label="YouTube" className="text-white/80 hover:text-white">
            <Youtube size={16} />
          </a>
        </span>
        <span className="hidden h-4 w-px bg-white/20 sm:block" />
        <span className="flex items-center gap-2">
          <Phone size={14} className="text-green-300" />
          +254 722 703 131 / +254 722 209606
        </span>
      </div>
    </div>
  );
}
