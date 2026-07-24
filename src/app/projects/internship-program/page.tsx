import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { ProjectHero, ImpactStats } from "@/components/organisms";
import { Button } from "@/components/atoms/Button";

const STEPS = [
  {
    title: "Recruit",
    body: "Drawn from Christian unions, theological colleges, churches, and partner organisations — by direct application or recommendation, each with a letter from their home church.",
  },
  {
    title: "Fundraise",
    body: "Interns learn to raise support, starting with 20% of their stipend and building toward half, from their church, friends, family, and former classmates.",
  },
  {
    title: "Place",
    body: "Each is posted alongside a working missionary in the field, matched to their interests, studies, and the skills that station needs.",
  },
  {
    title: "Mentor",
    body: "A year of guidance in their spiritual walk, their sense of calling, their relationships, and their stewardship of money.",
  },
  {
    title: "Retain",
    body: "Those who catch the vision are kept on for further training and, in time, placement in a Bible translation organisation.",
  },
];

const MENTOR_AREAS = [
  { title: "Spiritual life", body: "a closer daily walk with God." },
  { title: "Calling", body: "testing whether the Lord is drawing them into full-time translation ministry." },
  { title: "Relationships", body: "support through an age of big decisions about marriage and family." },
  { title: "Stewardship", body: "handling the resources they raise with care." },
];

const FUNNEL = [
  { value: "30", label: "interns trained over three years" },
  { value: "30", label: "churches engaged and commissioning" },
  { value: "300", label: "supporters giving over three years" },
  { value: "900", label: "people in contact with Wycliffe Africa" },
];

const OUTCOMES = [
  { title: "Ten trained alumni", body: "At least ten people finish the program mentored in ministry and grounded in Bible translation, whatever they go on to do." },
  { title: "Ten new churches", body: "Ten more congregations join the work by commissioning one of their own, widening the circle of prayer and giving." },
  { title: "USD 18,000 raised", body: "Interns raise at least USD 18,000, held to train those who choose to serve in translation organisations." },
  { title: "250 partners in prayer", body: "With 25 supporters each, ten interns bring around 250 people to pray for and give to Wycliffe Africa." },
  { title: "Three sent onward", body: "At least three alumni are retained for further training and placement in translation work across Africa." },
  { title: "A pipeline that lasts", body: "The program becomes self-sustaining — a steady way to nurture future missionaries year after year." },
];

export const metadata = {
  title: "Internship Program | Wycliffe Africa",
};

export default function InternshipProgramPage() {
  return (
    <PageTemplate transparentHeader>
      <ProjectHero
        eyebrow="The Internship Program"
        title="Raising the next generation of African missionaries"
        lede="A one-year program that recruits young people into Bible translation, places them beside working missionaries, and mentors them toward a lifetime of ministry."
        image="/photos/pexels-mbaraga-bernard-2158456013-35388499.jpg"
        imagePosition="50% 38%"
        primaryCta={{ label: "Fund an intake", href: "/give" }}
        secondaryCta={{ label: "See the intern's year", href: "#journey" }}
      />

      <ImpactStats
        overlap
        stats={[
          { value: "30", label: "Interns over three years" },
          { value: "30", label: "Churches commissioning them" },
          { value: "900", label: "People brought into the work" },
          { value: "7", label: "Countries for field placement" },
        ]}
      />

      <section className="mx-auto max-w-(--container-max) px-5 py-16 sm:px-12">
        <div className="font-ui text-xs font-bold uppercase tracking-caps text-green-700">The need</div>
        <h2 className="mb-4 mt-3 font-display text-2xl font-semibold leading-tight text-strong">
          Twenty-one years in, the harvest still outruns the hands
        </h2>
        <p className="mb-3.5 font-body text-base leading-relaxed text-muted">
          Wycliffe Africa was formed in 2004 by John Bendor Samuel to recruit, train, and send missionaries from
          African countries that had no Wycliffe organisation of their own. Since then it has helped start Wycliffe
          Benin, Wycliffe Ethiopia, and Wycliffe Togo, and now has 27 members working in Madagascar, South Africa,
          Nigeria, Uganda, Kenya, Cameroon, and South Sudan.
        </p>
        <p className="font-body text-base leading-relaxed text-muted">
          Plenty of ground remains. Many African languages still have no Bible, and the way to close that gap is to
          bring more people into the work. The problem has been the front door: without a program to receive and
          prepare newcomers, recruitment is slow, and those who feel the call often drift away before they ever
          reach the field.
        </p>
      </section>

      <section className="border-t border-hair bg-sunk">
        <div className="mx-auto grid max-w-(--container-max) grid-cols-1 items-center gap-10 px-5 py-16 sm:px-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="font-ui text-xs font-bold uppercase tracking-caps text-green-700">Why an internship</div>
            <h2 className="mb-4 mt-3 font-display text-2xl font-semibold leading-tight text-strong">
              Good internships are how organisations renew themselves
            </h2>
            <p className="mb-3.5 font-body text-base leading-relaxed text-muted">
              Across every field, internship programs are the funnel that carries new people in and gives them room
              to test whether the work is really theirs. Wycliffe Africa has gone without one for years, and it
              shows in how hard recruitment has become. People who might have made fine missionaries settle into
              other careers before anyone can walk with them through the decision.
            </p>
            <p className="font-body text-base leading-relaxed text-muted">
              This program builds that missing door. It gives a young person a structured year to discover their
              calling, learn the craft of translation up close, and be supported by a mentor and a home church the
              whole way through.
            </p>
          </div>
          <div className="flex h-[80%] flex-col justify-center rounded-xl bg-green-700 p-6 text-white">
            <div className="font-ui text-sm font-bold uppercase tracking-caps text-green-200">The main objective</div>
            <p className="mt-3 font-display text-xl italic leading-normal">
              Recruit and train interns who are drawn to Bible translation, and walk with them until they know
              whether God is calling them into it for good.
            </p>
            <p className="mt-4 font-body text-md leading-relaxed text-white/75">
              Interns come from many denominations, many schools, and every country where Wycliffe Africa already
              serves. The result is a mixed, multicultural team learning together.
            </p>
          </div>
        </div>
      </section>

      <section id="journey" className="mx-auto max-w-(--container-max) px-5 py-16 sm:px-12">
        <div className="font-ui text-xs font-bold uppercase tracking-caps text-green-700">The intern&rsquo;s year</div>
        <h2 className="mb-4 mt-3 font-display text-2xl font-semibold leading-tight text-strong">
          Five steps from applicant to missionary
        </h2>
        <p className="mb-8 max-w-[68ch] font-body text-base leading-relaxed text-muted">
          Each intern moves through the same path over twelve months, backed by their church and a mentor at every
          stage.
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <div key={step.title} className="rounded-lg border border-hair bg-card p-5 shadow-sm">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary font-ui text-sm font-bold text-on-primary">
                {i + 1}
              </span>
              <h3 className="mb-1.5 mt-3 font-display text-lg font-semibold text-strong">{step.title}</h3>
              <p className="font-body text-base leading-relaxed text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-hair bg-sunk">
        <div className="mx-auto grid max-w-(--container-max) grid-cols-1 items-start gap-10 px-5 py-16 sm:px-12 lg:grid-cols-2 lg:gap-16">
          <div className="rounded-xl bg-terra-900 p-6 text-white">
            <div className="font-ui text-xs font-bold uppercase tracking-caps text-terra-300">Mentored in four areas</div>
            <div className="mt-4 flex flex-col gap-3">
              {MENTOR_AREAS.map((area) => (
                <div key={area.title} className="flex items-start gap-2.5">
                  <ChevronRight size={16} className="mt-1 flex-none text-green-400" />
                  <span className="font-body text-base leading-relaxed text-white/85">
                    <strong className="text-white">{area.title}</strong> — {area.body}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-ui text-xs font-bold uppercase tracking-caps text-green-700">Placement &amp; care</div>
            <h2 className="mb-4 mt-3 font-display text-2xl font-semibold leading-tight text-strong">
              Learning the work where the work is done
            </h2>
            <p className="mb-3.5 font-body text-base leading-relaxed text-muted">
              Interns are placed in the countries where Wycliffe Africa already has missionaries — Madagascar,
              Cameroon, Uganda, Nigeria, Kenya, South Sudan, and South Africa. They do not sit in a classroom
              imagining translation; they stand next to someone doing it.
            </p>
            <p className="font-body text-base leading-relaxed text-muted">
              The program is run from the Nairobi office under an Associate Director, who oversees recruitment,
              placement, fundraising, and the reporting that keeps partners in the loop. Support raised by interns
              is pooled and managed centrally, then held to train those who choose to go further.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-(--container-max) px-5 py-16 sm:px-12">
        <div className="font-ui text-xs font-bold uppercase tracking-caps text-green-700">The three-year model</div>
        <h2 className="mb-4 mt-3 font-display text-2xl font-semibold leading-tight text-strong">
          Ten interns a year, a widening circle behind each one
        </h2>
        <p className="mb-8 max-w-[68ch] font-body text-base leading-relaxed text-muted">
          Every intern arrives connected to a church and roughly thirty supporters who pray and give. Multiply that
          across three intakes and the program does more than train missionaries — it draws hundreds of new people
          into the Wycliffe Africa family.
        </p>
        <div className="mx-auto flex max-w-[520px] flex-col gap-3">
          {FUNNEL.map((rung) => (
            <div
              key={rung.label}
              className="flex items-center gap-4 rounded-md border border-hair bg-sunk px-5 py-3.5"
            >
              <span className="font-display text-xl font-semibold text-primary">{rung.value}</span>
              <span className="font-body text-sm text-body">{rung.label}</span>
            </div>
          ))}
          <div className="rounded-md bg-primary px-5 py-3.5 text-center font-ui text-sm font-semibold text-on-primary">
            A sustainable missionary pipeline
          </div>
        </div>
      </section>

      <section className="border-t border-hair bg-sunk">
        <div className="mx-auto max-w-(--container-max) px-5 py-16 sm:px-12">
          <div className="font-ui text-xs font-bold uppercase tracking-caps text-green-700">What one intake delivers</div>
          <h2 className="mb-8 mt-3 font-display text-2xl font-semibold text-strong">The outcomes we are aiming for</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OUTCOMES.map((o) => (
              <div key={o.title} className="rounded-lg border border-hair bg-card p-6 shadow-sm">
                <h3 className="mb-1.5 font-display text-lg font-semibold text-strong">{o.title}</h3>
                <p className="font-body text-sm leading-relaxed text-muted">{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-(--container-max) px-5 py-16 sm:px-12">
        <div className="font-ui text-xs font-bold uppercase tracking-caps text-green-700">Partner with us</div>
        <h2 className="mb-4 mt-3 font-display text-2xl font-semibold leading-tight text-strong">
          Seed one intake and start the pipeline
        </h2>
        <p className="mb-6 max-w-[68ch] font-body text-base leading-relaxed text-muted">
          Partner funding gets the first interns off the ground; from there their own fundraising and their
          churches carry more of the weight each year. Your support now decides how quickly the next generation of
          translators reaches the field.
        </p>
        <Button href="/give" variant="accent">
          Fund the Internship Program
        </Button>
        <p className="mt-6 font-ui text-sm text-muted">
          Talk with us — Joseph Namutala{" "}
          <a href="mailto:joseph_namutala@wycliffeafrica.org" className="font-semibold text-link hover:underline">
            joseph_namutala@wycliffeafrica.org
          </a>{" "}
          · Edwyn Kiptinness{" "}
          <a href="mailto:edwyn_kiptinness@wycliffeafrica.org" className="font-semibold text-link hover:underline">
            edwyn_kiptinness@wycliffeafrica.org
          </a>
          <br />
          Administered from the Nairobi office · July 2025 – June 2026
        </p>
        <p className="mt-8 border-t border-hair pt-6 font-ui text-sm text-muted">
          Read next:{" "}
          <Link href="/projects/sunrise-africa-centre" className="font-semibold text-link hover:underline">
            The SunRise Africa Centre →
          </Link>
        </p>
      </section>
    </PageTemplate>
  );
}
