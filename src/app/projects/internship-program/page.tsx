import * as React from "react";
import Link from "next/link";
import { ProjectPageTemplate } from "@/components/templates";
import { Button } from "@/components/atoms/Button";

const STEPS = [
  {
    title: "Recruit",
    body: "Drawn from Christian unions, theological colleges, churches, and partner organisations, by direct application or recommendation, each with a letter from their home church.",
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
  { title: "A pipeline that lasts", body: "The program becomes self-sustaining, a steady way to nurture future missionaries year after year." },
];

export const metadata = {
  title: "Internship Program | Wycliffe Africa",
};

export default function InternshipProgramPage() {
  return (
    <ProjectPageTemplate
      hero={{
        eyebrow: "The Internship Program",
        title: "Raising the next generation of African missionaries",
        titleLines: ["Raising the next generation of", "African missionaries"],
        titleMaxWidth: "32ch",
        lede: "A one-year program that recruits young people into Bible translation, places them beside working missionaries, and mentors them toward a lifetime of ministry.",
        image: "/Internship/internship-induction-sunday.webp",
        imagePosition: "50% 45%",
        deep: true,
        primaryCta: { label: "Fund an intake", href: "/give" },
        secondaryCta: { label: "See the intern's year", href: "#journey" },
      }}
      stats={[
        { value: "30", label: "Interns over three years" },
        { value: "30", label: "Churches commissioning them" },
        { value: "900", label: "People brought into the work" },
        { value: "7", label: "Countries for field placement" },
      ]}
    >

      <section id="story" className="mx-auto max-w-[1120px] px-5 py-[72px] sm:px-7">
        <div className="font-ui text-xs font-bold uppercase tracking-caps-loose text-[#C9761A]">The need</div>
        <h2 className="mb-4 mt-3 font-display text-2xl font-semibold leading-tight text-strong">
          Twenty-one years in, the harvest still outruns the hands
        </h2>
        <p className="mb-3.5 max-w-[68ch] font-body text-md leading-relaxed text-body">
          Wycliffe Africa was formed in 2004 by John Bendor Samuel to recruit, train, and send missionaries from
          African countries that had no Wycliffe organisation of their own. Since then it has helped start Wycliffe
          Benin, Wycliffe Ethiopia, and Wycliffe Togo, and now has 27 members working in Madagascar, South Africa,
          Nigeria, Uganda, Kenya, Cameroon, and South Sudan.
        </p>
        <p className="max-w-[68ch] font-body text-md leading-relaxed text-body">
          Plenty of ground remains. Many African languages still have no Bible, and the way to close that gap is to
          bring more people into the work. The problem has been the front door: without a program to receive and
          prepare newcomers, recruitment is slow, and those who feel the call often drift away before they ever
          reach the field.
        </p>
      </section>

      <section>
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-10 px-5 py-[72px] sm:px-7 lg:grid-cols-[1.1fr_0.9fr] lg:gap-[54px]">
          <div>
            <div className="font-ui text-xs font-bold uppercase tracking-caps-loose text-[#C9761A]">Why an internship</div>
            <h2 className="mb-4 mt-3 font-display text-2xl font-semibold leading-tight text-strong">
              Good internships are how organisations renew themselves
            </h2>
            <p className="mb-3.5 font-body text-base leading-relaxed text-body">
              Across every field, internship programs are the funnel that carries new people in and gives them room
              to test whether the work is really theirs. Wycliffe Africa has gone without one for years, and it
              shows in how hard recruitment has become. People who might have made fine missionaries settle into
              other careers before anyone can walk with them through the decision.
            </p>
            <p className="font-body text-base leading-relaxed text-body">
              This program builds that missing door. It gives a young person a structured year to discover their
              calling, learn the craft of translation up close, and be supported by a mentor and a home church the
              whole way through.
            </p>
          </div>
          <div className="flex flex-col justify-center rounded-xl bg-[linear-gradient(135deg,#2F6E63,#234F47)] p-8 text-white shadow-lg sm:p-12">
            <div className="font-ui text-xs font-bold uppercase tracking-caps-loose text-[#9FD8C8]">The main objective</div>
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

      <section id="journey" className="mx-auto max-w-[1120px] px-5 py-[72px] sm:px-7">
        <div className="font-ui text-xs font-bold uppercase tracking-caps-loose text-[#C9761A]">The intern&rsquo;s year</div>
        <h2 className="mb-4 mt-3 font-display text-2xl font-semibold leading-tight text-strong">
          Five steps from applicant to missionary
        </h2>
        <p className="mb-8 max-w-[68ch] font-body text-base leading-relaxed text-body">
          Each intern moves through the same path over twelve months, backed by their church and a mentor at every
          stage.
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <div key={step.title} className="rounded-lg border border-hair bg-card p-5 shadow-sm">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[radial-gradient(circle_at_40%_30%,#F6B94E,#B5471B)] font-ui text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mb-1.5 mt-3 font-display text-lg font-semibold text-primary">{step.title}</h3>
              <p className="font-body text-sm leading-relaxed text-body">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="mentor">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-10 px-5 py-[72px] sm:px-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-[54px]">
          <div className="rounded-xl bg-[linear-gradient(135deg,#B5471B,#8C3313)] p-8 text-white shadow-lg sm:p-12">
            <div className="font-ui text-xs font-bold uppercase tracking-caps-loose text-[#FFD79A]">Mentored in four areas</div>
            <div className="mt-4 flex flex-col gap-3">
              {MENTOR_AREAS.map((area) => (
                <div key={area.title} className="flex items-start gap-2.5">
                  <span className="mt-2.5 h-3 w-3 flex-none rounded-full bg-[radial-gradient(circle_at_40%_30%,#F6B94E,#B5471B)]" />
                  <span className="font-body text-base leading-relaxed text-white/85">
                    <strong className="text-white">{area.title}</strong>: {area.body}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-ui text-xs font-bold uppercase tracking-caps-loose text-[#C9761A]">Placement &amp; care</div>
            <h2 className="mb-4 mt-3 font-display text-2xl font-semibold leading-tight text-strong">
              Learning the work where the work is done
            </h2>
            <p className="mb-3.5 font-body text-base leading-relaxed text-body">
              Interns are placed in the countries where Wycliffe Africa already has missionaries: Madagascar,
              Cameroon, Uganda, Nigeria, Kenya, South Sudan, and South Africa. They do not sit in a classroom
              imagining translation; they stand next to someone doing it.
            </p>
            <p className="font-body text-base leading-relaxed text-body">
              The program is run from the Nairobi office under an Associate Director, who oversees recruitment,
              placement, fundraising, and the reporting that keeps partners in the loop. Support raised by interns
              is pooled and managed centrally, then held to train those who choose to go further.
            </p>
          </div>
        </div>
      </section>

      <section id="model" className="mx-auto max-w-[1120px] px-5 py-[72px] sm:px-7">
        <div className="rounded-xl bg-[linear-gradient(135deg,#2F6E63,#1F463F)] p-8 text-white shadow-lg sm:p-12">
          <div className="font-ui text-xs font-bold uppercase tracking-caps-loose text-[#9FD8C8]">The three-year model</div>
          <h2 className="mb-4 mt-3 font-display text-2xl font-semibold leading-tight text-white">
            Ten interns a year, a widening circle behind each one
          </h2>
          <p className="mb-8 max-w-[680px] font-body text-base leading-relaxed text-[#D5EAE3]">
            Every intern arrives connected to a church and roughly thirty supporters who pray and give. Multiply
            that across three intakes and the program does more than train missionaries. It draws hundreds of new
            people into the Wycliffe Africa family.
          </p>
          <div className="mx-auto flex max-w-[640px] flex-col items-center gap-2.5">
            {FUNNEL.map((rung, i) => (
              <div
                key={rung.label}
                className="rounded-md px-5 py-3 text-center font-ui text-white shadow-sm"
                style={{
                  width: `${[60, 74, 86, 96][i]}%`,
                  background: ["#166B5E", "#2F7D5A", "#6F8F2F", "#C9761A"][i],
                }}
              >
                <strong className="mr-2 text-xl">{rung.value}</strong>
                <span className="text-sm">{rung.label}</span>
              </div>
            ))}
            <div className="w-full rounded-md bg-primary px-5 py-4 text-center font-ui text-sm font-semibold text-white">
              A sustainable missionary pipeline
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1120px] px-5 py-[72px] sm:px-7">
          <div className="font-ui text-xs font-bold uppercase tracking-caps-loose text-[#C9761A]">What one intake delivers</div>
          <h2 className="mb-8 mt-3 font-display text-2xl font-semibold text-strong">The outcomes we are aiming for</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {OUTCOMES.map((o) => (
              <div key={o.title} className="rounded-lg border border-hair bg-card p-6 shadow-sm">
                <h3 className="mb-1.5 font-display text-lg font-semibold text-primary">{o.title}</h3>
                <p className="font-body text-base leading-relaxed text-body">{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="give" className="mx-auto max-w-[1120px] px-5 pb-[90px] pt-5 sm:px-7">
        <div className="rounded-2xl border border-[#F0CE93] bg-[radial-gradient(120%_120%_at_50%_0%,#FBE7C4_0%,#F7D69B_100%)] px-6 py-16 text-center">
          <div className="font-ui text-xs font-bold uppercase tracking-caps-loose text-[#C9761A]">Partner with us</div>
          <h2 className="mx-auto mb-4 mt-3 max-w-[660px] font-display text-2xl font-semibold leading-tight text-strong">
            Seed one intake and start the pipeline
          </h2>
          <p className="mx-auto mb-7 max-w-[580px] font-body text-base leading-relaxed text-[#6B4A24]">
            Partner funding gets the first interns off the ground; from there their own fundraising and their
            churches carry more of the weight each year. Your support now decides how quickly the next generation
            of translators reaches the field.
          </p>
          <Button href="/give" variant="primary" size="lg">
            Fund the Internship Program
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
            Administered from the Nairobi office · July 2025 – June 2026
          </p>
        </div>
        <p className="mt-8 border-t border-hair pt-6 font-ui text-sm text-muted">
          Meet the current interns:{" "}
          <Link href="/interns" className="font-semibold text-link hover:underline">
            Our Interns →
          </Link>
          {" "}· Read next:{" "}
          <Link href="/projects/sunrise-africa-centre" className="font-semibold text-link hover:underline">
            The SunRise Africa Centre →
          </Link>
        </p>
      </section>
    </ProjectPageTemplate>
  );
}
