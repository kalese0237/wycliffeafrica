import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { AboutPhotoHero, AboutCTA, ArticleList } from "@/components/organisms/about";

export const metadata = {
  title: "Church Partnership | Wycliffe Africa",
  description:
    "For pastors, church leaders and members: how a congregation partners with Wycliffe Africa — motivating your church, supporting a missionary, and adopting a translation project.",
};

/** The three routes a congregation can take, each already a page of its own. */
const ROUTES: { title: string; body: string; href: string; cta: string }[] = [
  {
    title: "Motivate your church",
    body: "Ideas, materials and a committee structure for making Bible translation something your congregation actually knows about and prays for.",
    href: "/involved/motivate-your-church",
    cta: "See the ideas",
  },
  {
    title: "Support a missionary",
    body: "Take on one of our missionaries as a congregation — their prayer, their pastoral care, and a share of the support that keeps them on the field.",
    href: "/missionaries",
    cta: "Meet the missionaries",
  },
  {
    title: "Adopt a project",
    body: "Make one language community, or one country, the standing missions focus of your church for as long as the work there takes.",
    href: "/projects",
    cta: "See current projects",
  },
];

/** What Wycliffe Africa undertakes to do for a partner church. */
const WHAT_WE_BRING = [
  "Ideas and material for spreading the vision of Bible translation inside your church, so it does not fall to one enthusiast to carry it alone.",
  "Ministry oversight for the people your church commissions to serve with Wycliffe Africa, and a line back to you about how they are doing.",
  "Guidance and direction for anyone in your congregation who is weighing full-time Christian missions work, whether or not they end up with us.",
];

/** What a partner church undertakes in return. */
const WHAT_YOUR_CHURCH_BRINGS = [
  "An active part in caring for your missionaries — not only sending them, but keeping them, and knowing how they are when they are far away.",
  "Awareness and enthusiasm in the congregation for the need itself: which languages are still waiting, and what it takes to reach them.",
  "Volunteers. There is a great deal of work here that does not need a linguist, and some of it can be done from home.",
  "Provision for the financial needs of missionaries, following the example of the early church, which funded the people it sent.",
];

export default function ChurchPartnershipPage() {
  return (
    <PageTemplate>
      <AboutPhotoHero
        title="Church"
        titleAccent="partnership"
        standfirst="Wycliffe Africa is made up of many Christian denominations. If you are a pastor, a church leader, or a member of a congregation wondering what your church could do, these pages are for you."
        image="/photos/pexels-speakmediauganda-37826398.jpg"
        imageAlt="A congregation worshipping together with hands raised"
        focalPoint="50% 38%"
      />

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-10 px-5 pt-16 sm:px-12 sm:pt-20 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
        <div>
          <h2 className="font-display text-2xl font-normal leading-snug text-strong">
            Widen its focus beyond <em className="italic text-primary-active">local</em> issues.
          </h2>
        </div>
        <div>
          <p className="mb-4.5 font-body text-md leading-relaxed text-body sm:text-[18.5px]">
            A church can spend its whole life on the street it stands in. The needs there are real and they
            never run out. But a congregation that lifts its eyes to the unreached peoples of Africa
            discovers something about itself, and about God, that it will not find any other way.
          </p>
          <p className="font-body text-md leading-relaxed text-body sm:text-[18.5px]">
            The African church is already answering the call to take the gospel across this continent. Bible
            translation is how that gospel stays after the preacher leaves — and it will only succeed here if
            it becomes the vision of ordinary Christians in ordinary congregations, in every African language.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-(--container-max) px-5 pt-16 sm:px-12 sm:pt-20">
        <h2 className="font-display text-2xl font-normal leading-tight text-strong">Three ways to begin</h2>
        <div className="mt-5 h-[2px] w-full bg-ink-0" />
        <div className="grid grid-cols-1 md:grid-cols-3">
          {ROUTES.map(({ title, body, href, cta }) => (
            <div
              key={title}
              className="flex flex-col border-b border-hair py-8 last:border-b-0 md:border-b-0 md:border-l md:py-10 md:pl-8 md:not-first:ml-8 md:first:border-l-0 md:first:pl-0"
            >
              <h3 className="font-display text-lg font-semibold leading-[1.2] text-strong">{title}</h3>
              <p className="mt-3 max-w-[46ch] flex-1 font-body text-base leading-[1.6] text-body">{body}</p>
              <Link
                href={href}
                className="group mt-6 inline-flex w-fit items-center gap-2 font-ui text-xs font-bold uppercase tracking-caps text-primary transition-colors duration-150 hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-400"
              >
                {cta}
                <ArrowRight size={14} className="transition-transform duration-150 ease-out group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* The claim the whole page rests on, given a band of its own rather than a line in a paragraph. */}
      <section className="relative mt-16 flex min-h-[280px] items-center overflow-hidden bg-terra-900 sm:mt-20 sm:min-h-[380px]">
        <Image
          src="/photos/uganda-keliko-church.webp"
          alt="Keliko believers gathered around Scripture in their own language, northern Uganda"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 45%" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(42,20,10,0.94)_0%,rgba(42,20,10,0.62)_52%,rgba(42,20,10,0.15)_100%)]"
        />
        <div className="relative z-10 mx-auto w-full max-w-(--container-max) px-5 py-12 sm:px-12">
          <blockquote className="max-w-[28ch] font-display text-lg font-normal leading-snug text-white sm:text-xl lg:text-[31px]">
            If Bible translation is to succeed in Africa, it has to become the vision of Christians across
            the continent — the Word of God in every African language.
          </blockquote>
        </div>
      </section>

      <ArticleList
        eyebrow="Ways we can partner with you"
        title="What we bring"
        rubric="What your church can ask of us"
        items={WHAT_WE_BRING}
      />

      <ArticleList
        eyebrow="Ways you can partner with us"
        title="What your church brings"
        rubric="None of it requires a missions budget to start"
        items={WHAT_YOUR_CHURCH_BRINGS}
      />

      <AboutCTA
        title="Start with a conversation."
        body="Tell us about your congregation and where it has got to. We will work out with you what a partnership could look like, whether that begins with prayer, a missionary, or a project of your own."
        primary={{ label: "Contact us", href: "/contact" }}
        secondary={{ label: "Motivate your church", href: "/involved/motivate-your-church" }}
      />
    </PageTemplate>
  );
}
