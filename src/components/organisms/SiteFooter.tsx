import * as React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Globe, Clock, ChevronRight, type LucideIcon } from "lucide-react";
import { Wordmark } from "@/components/atoms/Wordmark";
import { NewsletterSignup } from "@/components/molecules/NewsletterSignup";

const involvedLinks: [string, string][] = [
  ["Pray with us", "/involved"],
  ["Become a member", "/involved"],
  ["Serve part-time", "/involved"],
  ["Support a missionary", "/missionaries"],
  ["Church partnership", "/involved/partnership"],
  ["Give now", "/give"],
];

const contactRows: { icon: LucideIcon; text: string }[] = [
  { icon: MapPin, text: "Masaba Road, Nairobi – Kenya" },
  { icon: Mail, text: "info@wycliffeafrica.org" },
  { icon: Phone, text: "+254 722 703 131 / +254 722 209606" },
  { icon: Globe, text: "www.wycliffeafrica.org" },
  { icon: Clock, text: "Mon to Fri – 8:00am to 5:00pm" },
];

/** Deep navy footer — wordmark, link columns, newsletter signup, fine print. */
export function SiteFooter() {
  return (
    <footer className="border-t-[3px] border-accent bg-navy-900 text-on-primary">
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 gap-10 px-5 py-16 sm:grid-cols-2 sm:px-12 lg:grid-cols-4">
        <div>
          <Wordmark height={42} onDark />
          <p className="mt-5 max-w-[34ch] font-body text-sm leading-relaxed text-white/72">
            The goal of Bible translation is for people everywhere, speakers of every language, to gain access to
            Scriptures in the language they know best.
          </p>
        </div>
        <div>
          <div className="mb-3 font-ui text-xs font-bold uppercase tracking-caps text-green-300">Get involved</div>
          <div className="flex flex-col">
            {involvedLinks.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-1.5 py-1.5 font-ui text-sm text-white/72 hover:text-white"
              >
                <ChevronRight size={14} className="flex-none text-green-300" /> {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-3 font-ui text-xs font-bold uppercase tracking-caps text-green-300">Get in touch</div>
          <div className="flex flex-col">
            {contactRows.map(({ icon: RowIcon, text }) => (
              <div key={text} className="flex items-start gap-2.5 py-1.5 font-ui text-sm text-white/72">
                <RowIcon size={15} className="mt-0.5 flex-none text-green-300" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-3 font-ui text-xs font-bold uppercase tracking-caps text-green-300">Stay updated</div>
          <p className="mb-4 font-body text-sm text-white/72">
            Field updates and prayer requests, straight to your inbox.
          </p>
          <NewsletterSignup compact stacked variant="accent" cta="Subscribe" />
        </div>
      </div>
      <div className="border-t border-white/12">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-wrap items-center justify-between gap-3 px-5 py-4 font-ui text-xs text-white/60 sm:px-12">
          <span>Copyright © 2026 Wycliffe Africa. All rights reserved.</span>
          <span className="flex items-center gap-5">
            <Link href="/faqs">Privacy</Link>
            <Link href="/faqs">Statement of Faith</Link>
            <Link href="/faqs">Financial accountability</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
