import * as React from "react";
import { ArrowRight } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { PageIntro } from "@/components/organisms";
import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { GivingForm, GiveSupportPanel, MpesaPanel } from "@/components/organisms/give";

export const metadata = {
  title: "Give | Wycliffe Africa",
};

export default function GivePage() {
  return (
    <PageTemplate>
      <PageIntro
        title="Every gift moves a translation forward."
        subtitle="Give once or monthly, toward a missionary's support, a specific project, or wherever the need is greatest."
      />

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 items-start gap-7 px-5 pb-16 sm:px-12 lg:grid-cols-[1.1fr_0.9fr]">
        <GivingForm />
        <GiveSupportPanel />
      </section>

      <section className="border-t border-hair bg-sunk">
        <div className="mx-auto grid max-w-(--container-max) grid-cols-1 items-center gap-10 px-5 py-16 sm:px-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="mb-4 font-display text-2xl font-semibold leading-tight text-strong">
              Your giving directly helps people receive God&rsquo;s Word in their own language.
            </h2>
            <p className="mb-3.5 font-body text-base leading-relaxed text-body">
              Bible translation is not a profit-making venture, so there is no income from which to pay salaries.
              Our staff meet their needs through churches and individuals who support them regularly. Each member
              has a team of donors and prayer partners, and each month receives what that team sends in. The
              donations collectively make up the member&rsquo;s monthly income.
            </p>
            <p className="mb-6 font-body text-base leading-relaxed text-body">
              Missionaries from your church depend on a monthly amount sent from your church, a two-way
              relationship in which your church is blessed as it helps provide the Bible for a people group that
              needs it. The rewards are eternal.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact" variant="accent" iconRight={<ArrowRight size={16} />}>
                Contact us to give
              </Button>
              <Button href="/missionaries" variant="secondary">
                Support a missionary
              </Button>
            </div>
          </div>
          <MpesaPanel />
        </div>
      </section>

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 items-center gap-10 px-5 py-16 sm:px-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-4/3 overflow-hidden rounded-lg border border-hair shadow-md">
          <Image
            src="/photos/pexels-speakmediauganda-37826398.jpg"
            alt="A congregation in prayer during a worship gathering"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: "50% 35%" }}
          />
        </div>
        <div>
          <h2 className="mb-4 font-display text-2xl font-semibold text-strong">
            Stand behind a translation project
          </h2>
          <p className="mb-3 font-body text-base leading-relaxed text-body">
            Translation projects across the continent need prayer and encouragement, funding, short-term workers,
            and advocates. Projects thrive when people stand behind them, and can sputter without that support.
          </p>
          <p className="mb-5 font-body text-base leading-relaxed text-body">
            When a church focuses its energy on a specific project, both benefit: churches feel more connected,
            form relationships with the missionaries, and see the results of their work. If your church would like
            to adopt a Bible translation project, please contact us.
          </p>
          <Button href="/involved/partnership" variant="secondary" iconRight={<ArrowRight size={16} />}>
            Church partnership
          </Button>
        </div>
      </section>
    </PageTemplate>
  );
}
