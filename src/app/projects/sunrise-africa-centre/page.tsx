import * as React from "react";
import Link from "next/link";
import { Building2, Users, Sprout, type LucideIcon } from "lucide-react";
import { ProjectPageTemplate } from "@/components/templates";
import { Button } from "@/components/atoms/Button";

const FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Building2,
    title: "Offices & training rooms",
    body: "A base for the staff who run recruitment and a set of rooms built for teaching translation, literacy, and field skills.",
  },
  {
    icon: Users,
    title: "Conference & accommodation",
    body: "Space to gather partners and churches, and beds for missionaries in training, on furlough, or passing through between assignments.",
  },
  {
    icon: Sprout,
    title: "Land for farming",
    body: "Areas set aside for agriculture, so the Centre can feed its residents and earn income that does not depend on the next donation arriving.",
  },
];

const GOALS = [
  { title: "Operate the base", body: "Stand up SunRise Africa as a working training base for missionaries in Bible translation." },
  { title: "Strengthen training & care", body: "Deepen the programmes that prepare missionaries and look after them once they are in the field." },
  { title: "Build a reserve", body: "Create a sustainability fund that keeps missionary development going for the long haul." },
];

const WHERE_WE_SERVE = ["Madagascar, Tanzania & South Africa", "Uganda, Cameroon & Kenya", "Ghana, Nigeria & The Gambia"];

export const metadata = {
  title: "SunRise Africa Centre | Wycliffe Africa",
};

export default function SunriseAfricaCentrePage() {
  return (
    <ProjectPageTemplate
      hero={{
        eyebrow: "SunRise Africa Centre",
        title: "A permanent home for Africa's Bible translation movement",
        titleLines: ["A permanent home for Africa's", "Bible translation movement"],
        titleMaxWidth: "32ch",
        lede: "Wycliffe Africa is raising USD 1.2 million to build a training and sending base that will carry Scripture to communities still waiting to read it in their own language.",
        image: "/Sunrise-africa/african-sunrise.webp",
        imagePosition: "50% 48%",
        primaryCta: { label: "Become a partner", href: "/give" },
        secondaryCta: { label: "See what we're building", href: "#centre" },
      }}
      stats={[
        { value: "33", label: "Missionaries serving today" },
        { value: "100", label: "Members within five years" },
        { value: "8+", label: "Countries with our people" },
        { value: "3", label: "National organisations launched" },
      ]}
    >

      <section id="vision" className="mx-auto max-w-[1120px] px-5 py-[72px] sm:px-7">
        <div className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#C9761A]">The vision</div>
        <h2 className="mb-4 mt-3 font-display text-2xl font-semibold leading-tight text-strong">
          One place to recruit, train, and send the next generation
        </h2>
        <p className="mb-3.5 font-body text-md leading-relaxed text-body">
          For more than twenty years, Wycliffe Africa has sent missionaries into Bible translation across the
          continent, and helped Wycliffe Togo, Wycliffe Benin, and Wycliffe Ethiopia get off the ground. That work
          has outgrown the borrowed rooms and short-term arrangements it has always run on.
        </p>
        <p className="font-body text-md leading-relaxed text-body">
          SunRise Africa is our answer: a single site near Nairobi built to hold the whole journey of a missionary,
          from the first application to the day they leave for the field. It gathers what is now scattered into one
          home the movement can call its own.
        </p>
      </section>

      <section id="centre">
        <div className="mx-auto max-w-[1120px] px-5 py-[72px] sm:px-7">
          <div className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#C9761A]">The centre</div>
          <h2 className="mb-4 mt-3 font-display text-2xl font-semibold leading-tight text-strong">
            What SunRise Africa will hold
          </h2>
          <p className="mb-8 font-body text-base leading-relaxed text-muted">
            The Centre is planned as a working campus, not a monument. Alongside offices and training rooms it will
            house the people it trains and grow some of the food that feeds them.
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {FEATURES.map(({ icon: FeatureIcon, title, body }) => (
              <div key={title} className="rounded-lg border border-hair bg-card p-6 shadow-sm">
                <span className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_40%_30%,#FFE0A6,#E8912A)] text-primary shadow-sm">
                  <FeatureIcon size={24} />
                </span>
                <h3 className="mb-1.5 mt-4 font-display text-lg font-semibold text-primary">{title}</h3>
                <p className="font-body text-base leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-10 px-5 py-[72px] sm:px-7 lg:grid-cols-[1.1fr_0.9fr] lg:gap-[54px]">
        <div>
          <div className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#C9761A]">Why now</div>
          <h2 className="mb-4 mt-3 font-display text-2xl font-semibold leading-tight text-strong">
            The work has grown faster than its foundations
          </h2>
          <p className="mb-3.5 font-body text-base leading-relaxed text-muted">
            Our mission operations have expanded, but recruitment keeps hitting the same wall: there is no
            permanent base to bring people into, and much of the budget still rides on donations that arrive
            unpredictably. When funding dips, training and care are the first things to stall.
          </p>
          <p className="font-body text-base leading-relaxed text-muted">
            A Centre we own changes that arithmetic. It gives missionaries a stable place to be formed and cared
            for, and it lets hospitality and farming carry part of the running costs, so the work is steadier from
            one year to the next.
          </p>
        </div>
        <div className="rounded-xl bg-[linear-gradient(135deg,#2F6E63,#234F47)] p-8 text-white shadow-lg sm:p-12">
          <div className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#9FD8C8]">Built to sustain itself</div>
          <p className="mt-3 font-display text-lg italic leading-snug">
            SunRise Africa is meant to be more than a headquarters. The farm and guest facilities are designed to
            generate income, building a reserve that funds missionary development long after the buildings go up.
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-white/75">
            That is the difference between a project that needs rescuing every year and one that pays part of its
            own way.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 py-[72px] sm:px-7">
        <div className="rounded-xl bg-[linear-gradient(135deg,#2F6E63,#234F47)] p-8 text-white shadow-lg sm:p-12">
          <div className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#9FD8C8]">The goal</div>
          <h2 className="mb-8 mt-3 font-display text-2xl font-semibold">
            Establish SunRise Africa as the hub of the movement
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {GOALS.map((goal) => (
              <div key={goal.title}>
                <h3 className="mb-1.5 font-display text-md font-semibold text-[#9FD8C8]">{goal.title}</h3>
                <p className="font-body text-base leading-relaxed text-[#D5EAE3]">{goal.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-10 px-5 py-[72px] sm:px-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-[54px]">
        <div className="rounded-xl bg-[linear-gradient(135deg,#B5471B,#8C3313)] p-8 text-white shadow-lg sm:p-12">
          <div className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#FFD79A]">Where our people serve</div>
          <p className="mt-3 font-body text-base text-white/85">
            Wycliffe Africa missionaries work in more than eight countries, inside Africa and beyond it.
          </p>
          <div className="mt-4 flex flex-col gap-2.5">
            {WHERE_WE_SERVE.map((place) => (
              <div key={place} className="flex items-start gap-2.5">
                <span className="mt-2.5 h-3 w-3 flex-none rounded-full bg-[radial-gradient(circle_at_40%_30%,#F6B94E,#B5471B)]" />
                <span className="font-body text-base text-white/85">{place}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#C9761A]">The bigger picture</div>
          <h2 className="mb-4 mt-3 font-display text-2xl font-semibold leading-tight text-strong">
            The church of the Global South is stepping into missions
          </h2>
          <p className="mb-3.5 font-body text-base leading-relaxed text-muted">
            Across Africa, more believers are being sent than at any point in Wycliffe Africa&rsquo;s history. Local
            churches raise support, commission their members, and pray them into the field. What has been missing
            is the capacity to receive and equip everyone who is ready to go.
          </p>
          <p className="font-body text-base leading-relaxed text-muted">
            SunRise Africa is how Wycliffe Africa keeps pace with that momentum, turning willing people into
            prepared ones and sending them to communities still waiting for Scripture in their heart language.
          </p>
        </div>
      </section>

      <section id="give" className="mx-auto max-w-[1120px] px-5 pb-[90px] pt-5 sm:px-7">
        <div className="rounded-2xl border border-[#F0CE93] bg-[radial-gradient(120%_120%_at_50%_0%,#FBE7C4_0%,#F7D69B_100%)] px-6 py-16 text-center">
          <div className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#C9761A]">Partner with us</div>
          <h2 className="mx-auto mb-4 mt-3 max-w-[660px] font-display text-2xl font-semibold leading-tight text-strong">
            Help us reach USD 1.2 million and lay the foundation
          </h2>
          <p className="mx-auto mb-7 max-w-[580px] font-body text-base leading-relaxed text-[#6B4A24]">
            Every gift toward SunRise Africa builds something that outlasts it: a base that trains, houses, and
            sends African missionaries for decades to come. Partners, churches, and individuals all have a place in
            this.
          </p>
          <Button href="/give" variant="primary" size="lg">
            Give toward the Centre
          </Button>
          <p className="mt-6 font-ui text-sm text-[#7A5522]">
            Talk with us: Joseph Namutala{" "}
            <a href="mailto:joseph_namutala@wycliffeafrica.org" className="font-semibold text-primary hover:underline">
              joseph_namutala@wycliffeafrica.org
            </a>{" "}
            · Edwyn Kiptinness{" "}
            <a href="mailto:edwyn_kiptinness@wycliffeafrica.org" className="font-semibold text-primary hover:underline">
              edwyn_kiptinness@wycliffeafrica.org
            </a>
            <br />
            Headquartered in Nairobi, Kenya
          </p>
        </div>
        <p className="mt-8 border-t border-hair pt-6 font-ui text-sm text-muted">
            Read next:{" "}
            <Link href="/projects/internship-program" className="font-semibold text-link hover:underline">
              The Internship Program →
            </Link>
        </p>
      </section>
    </ProjectPageTemplate>
  );
}
