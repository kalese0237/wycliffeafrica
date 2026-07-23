import * as React from "react";
import { BookOpen, Users, Heart, Globe, ArrowRight, type LucideIcon } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { PageIntro, DonationCTA } from "@/components/organisms";
import { PhotoPlaceholder } from "@/components/molecules/PhotoPlaceholder";
import { Button } from "@/components/atoms/Button";

const VALUES: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: BookOpen, title: "The Bible", body: "God's inspired Word, for every people in their heart language." },
  { icon: Users, title: "The Church", body: "Mobilising African believers and congregations for the task." },
  { icon: Heart, title: "Integrity", body: "Careful stewardship of every gift, and honest reporting of the work." },
  { icon: Globe, title: "The Unreached", body: "Languages with no Scripture at all come first." },
];

export const metadata = {
  title: "About Us | Wycliffe Africa",
};

export default function AboutPage() {
  return (
    <PageTemplate>
      <PageIntro
        journey="serve"
        eyebrowLabel="About Us"
        title="Why Bible translation, and who we are"
        subtitle="Wycliffe Africa is an African-led movement raising missionaries for Bible translation across the continent."
      />

      <section className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 items-center gap-10 px-5 py-14 sm:px-12 lg:grid-cols-2 lg:gap-16">
        <PhotoPlaceholder caption="Our story" aspect="4/3" />
        <div>
          <div className="font-ui text-xs font-bold uppercase tracking-caps text-green-700">Why Bible translation</div>
          <h2 className="mb-3.5 mt-3 font-display text-2xl font-semibold leading-tight text-strong">
            A borrowed language keeps the gospel at arm&apos;s length.
          </h2>
          <p className="mb-3.5 font-body text-base leading-relaxed text-muted sm:text-md">
            People can learn in a second language, but few ever pray in one. When Scripture arrives in the mother
            tongue, churches preach from it, schools teach reading with it, and it stays for generations.
          </p>
          <p className="font-body text-base leading-relaxed text-muted sm:text-md">
            Yet thousands of languages across Africa still wait. That is the task we exist for.
          </p>
        </div>
      </section>

      <section className="border-y border-hair bg-sunk">
        <div className="mx-auto max-w-[var(--container-max)] px-5 py-16 sm:px-12">
          <div className="font-ui text-xs font-bold uppercase tracking-caps text-green-700">
            What we believe · Our core values
          </div>
          <h2 className="mb-8 mt-3 font-display text-2xl font-semibold text-strong">
            The convictions that shape our work
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {VALUES.map(({ icon: ValueIcon, title, body }) => (
              <div key={title} className="flex gap-4 rounded-lg border border-hair bg-card p-5 shadow-sm">
                <span className="inline-flex h-[44px] w-[44px] flex-none items-center justify-center rounded-[10px] bg-navy-050 text-primary">
                  <ValueIcon size={22} />
                </span>
                <div>
                  <h3 className="mb-1 font-display text-md font-semibold text-strong">{title}</h3>
                  <p className="font-body text-base leading-relaxed text-muted">{body}</p>
                </div>
              </div>
            ))}
          </div>
          <Button href="/faqs" variant="secondary" iconRight={<ArrowRight size={16} />} className="mt-8">
            Read our statement of faith
          </Button>
        </div>
      </section>

      <DonationCTA />
    </PageTemplate>
  );
}
