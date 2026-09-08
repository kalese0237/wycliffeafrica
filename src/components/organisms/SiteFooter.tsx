import * as React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Globe, Clock, ChevronRight, type LucideIcon } from "lucide-react";
import { Wordmark } from "@/components/atoms/Wordmark";
import { NewsletterSignup } from "@/components/molecules/NewsletterSignup";

const involvedLinks: [string, string][] = [
  ["Pray with us", "/prayer"],
  ["Prayer requests", "/prayer/requests"],
  ["Become a member", "/involved/become-a-member"],
  ["Serve", "/involved/serve"],
  ["Support a missionary", "/missionaries"],
  ["Church partnership", "/involved/partnership"],
  ["Projects", "/projects"],
  ["Give now", "/give"],
  ["Missionary portal", "/portal/login"],
];

const LEGAL_LINKS: [string, string][] = [
  ["Privacy", "/faqs"],
  ["Statement of Faith", "/faqs"],
  ["Financial accountability", "/faqs"],
];

const contactRows: { icon: LucideIcon; text: string }[] = [
  { icon: MapPin, text: "Masaba Road, Nairobi – Kenya" },
  { icon: Mail, text: "info@wycliffeafrica.org" },
  { icon: Phone, text: "+254 701 345769 / +254 753 522370" },
  { icon: Globe, text: "www.wycliffeafrica.org" },
  { icon: Clock, text: "Mon to Fri – 8:00am to 5:00pm" },
];

/** Deep terra footer — wordmark, link columns, newsletter signup, fine print. */
export function SiteFooter() {
  return (
    <footer className="bg-green-900 text-on-primary">
      <div className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-10 px-5 py-16 sm:grid-cols-2 sm:px-12 lg:grid-cols-4">
        <div>
          <Wordmark height={42} onDark />
          <p className="mt-5 max-w-[34ch] font-ui text-base leading-relaxed text-white/72">
            We work so that speakers of every language can read Scripture in the language they know best.
          </p>
        </div>
        <div>
          <div className="mb-3 font-ui text-xs font-bold uppercase tracking-caps text-green-300">Get involved</div>
          <div className="flex flex-col">
            {involvedLinks.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="group flex items-center gap-1.5 py-1.5 font-ui text-base text-white/72 transition-colors duration-130 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-white"
              >
                <ChevronRight
                  size={14}
                  className="flex-none text-green-300 transition-transform duration-130 ease-out group-hover:translate-x-0.5"
                />{" "}
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-3 font-ui text-xs font-bold uppercase tracking-caps text-green-300">Get in touch</div>
          <div className="flex flex-col">
            {contactRows.map(({ icon: RowIcon, text }) => (
              <div key={text} className="flex items-start gap-2.5 py-1.5 font-ui text-base text-white/72">
                <RowIcon size={15} className="mt-0.5 flex-none text-green-300" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-3 font-ui text-xs font-bold uppercase tracking-caps text-green-300">Stay updated</div>
          <p className="mb-4 font-ui text-base text-white/72">
            Field updates and prayer requests, straight to your inbox.
          </p>
          <NewsletterSignup compact stacked variant="accent" cta="Subscribe" />
        </div>
      </div>
      <div className="border-t border-white/12">
        <div className="mx-auto flex max-w-(--container-max) flex-wrap items-center justify-between gap-3 px-5 py-4 font-ui text-xs text-white/60 sm:px-12">
          <span>Copyright © 2026 Wycliffe Africa. All rights reserved.</span>
          <span className="flex items-center gap-5">
            {LEGAL_LINKS.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="transition-colors duration-130 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-white"
              >
                {label}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
