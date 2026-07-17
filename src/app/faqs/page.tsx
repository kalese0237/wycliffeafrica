import * as React from "react";
import { Plus } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { getFaqs } from "@/lib/content";

export const metadata = {
  title: "FAQs — Wycliffe Africa",
};

export default async function FaqsPage() {
  const faqs = await getFaqs();

  return (
    <PageTemplate heroTitle="Frequently Asked Questions">
      <section className="mx-auto max-w-[var(--container-prose)] px-5 py-16 sm:px-12">
        <div className="flex flex-col divide-y divide-hair border-y border-hair">
          {faqs.map((faq) => (
            <details key={faq.id} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-md font-semibold text-strong">
                {faq.question}
                <Plus size={20} className="flex-none text-green-700 transition-transform group-open:rotate-45" />
              </summary>
              <p className="mt-3 font-body text-base leading-relaxed text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </PageTemplate>
  );
}
