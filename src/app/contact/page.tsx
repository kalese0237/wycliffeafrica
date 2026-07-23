import * as React from "react";
import { Mail, Phone, MapPin, Clock, type LucideIcon } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { ContactForm } from "@/components/organisms/ContactForm";

const DETAILS: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: MapPin, label: "Visit us", value: "Masaba Road, Nairobi – Kenya" },
  { icon: Mail, label: "Email", value: "info@wycliffeafrica.org" },
  { icon: Phone, label: "Call", value: "+254 722 703 131 / +254 722 209606" },
  { icon: Clock, label: "Hours", value: "Mon to Fri – 8:00am to 5:00pm" },
];

export const metadata = {
  title: "Contact | Wycliffe Africa",
};

export default function ContactPage() {
  return (
    <PageTemplate heroTitle="Contact us">
      <section className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 items-start gap-10 px-5 py-16 sm:px-12 lg:grid-cols-[1fr_0.8fr]">
        <ContactForm />
        <div className="flex flex-col gap-4">
          {DETAILS.map(({ icon: DetailIcon, label, value }) => (
            <div key={label} className="flex items-center gap-4 rounded-lg border border-hair bg-card p-5 shadow-sm">
              <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-green-100 text-green-700">
                <DetailIcon size={20} />
              </span>
              <div>
                <div className="font-ui text-xs font-bold uppercase tracking-caps text-faint">{label}</div>
                <div className="font-body text-base text-body">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageTemplate>
  );
}
