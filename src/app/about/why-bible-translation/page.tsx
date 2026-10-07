import * as React from "react";
import Image from "next/image";
import { PageTemplate } from "@/components/templates";
import { AboutPhotoHero, AboutCTA } from "@/components/organisms";

export const metadata = {
  title: "Why We Do Bible Translation | Wycliffe Africa",
  description:
    "Translation transfers the meaning of a message from one language to another without the message changing. Why Wycliffe Africa works for Scripture in the language people know best.",
};

/** The three things the translation task holds together, drawn from the supplied text. */
const PRINCIPLES = [
  {
    numeral: "I",
    title: "Fidelity to the original",
    body: "Because we are dealing with the Bible, which is inspired and holy, nothing may be lost in the crossing from one language to the next.",
  },
  {
    numeral: "II",
    title: "Sounding natural",
    body: "Because we are dealing with human beings, and we want them to understand the message, it has to arrive sounding like their own tongue.",
  },
  {
    numeral: "III",
    title: "Drawn to God",
    body: "We hope individuals will be drawn to God, and that churches will be nourished and strengthened through this priceless resource.",
  },
];

export default function WhyBibleTranslationPage() {
  return (
    <PageTemplate>
      <AboutPhotoHero
        title="Why we do"
        titleAccent="Bible translation"
        standfirst="So that people everywhere, speakers of every language, gain access to Scripture in the language they know best."
        image="/photos/pexels-speakmediauganda-37826398.jpg"
        imageAlt="A congregation worshipping with hands raised"
      />

      {/* No heading: the statement opens the section in the display face, and Luther's line answers it
          at headline size across the full content width. */}
      <section className="mx-auto max-w-(--container-max) px-5 pt-16 pb-8 sm:px-12 sm:pt-24 sm:pb-12 lg:pb-16">
        <p className="font-display text-lg font-normal leading-snug text-strong sm:text-xl">
          The Bible is not merely a book to be read; it is God&rsquo;s living Word that speaks to us,
          reaches us, and transforms our lives. Bible translation makes it possible for people to
          encounter that living Word in the language that speaks most deeply to their hearts.
        </p>
        <blockquote className="mt-12 border-l-2 border-primary pl-6 sm:mt-16 sm:pl-8 lg:mt-20">
          <p className="font-display text-2xl font-normal leading-tight tracking-tight text-balance text-primary-active sm:text-3xl">
            &ldquo;The Bible is alive, it speaks to me, it has feet, it runs after me, it has hands, it
            lays hold of me.&rdquo;
          </p>
          <cite className="mt-5 block font-ui text-xs font-semibold not-italic uppercase tracking-caps text-muted">
            Martin Luther
          </cite>
        </blockquote>
      </section>

      {/* The two-hands image: the metaphor the supplied copy turns on, given a full band of its own. */}
      <section className="relative mt-16 flex min-h-[280px] items-center overflow-hidden bg-terra-900 sm:mt-20 sm:min-h-[400px]">
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
          <blockquote className="max-w-[30ch] font-display text-lg font-normal leading-snug text-white sm:text-xl lg:text-[31px]">
            Translation is like the clasping of two hands: on one hand, translators need to understand
            the meaning of the source text; on the other, they need to grasp the target language. When
            the two are put together, the meaning of the source is beautifully expressed in the target.
          </blockquote>
        </div>
      </section>

      <section className="mx-auto max-w-(--container-max) px-5 pt-16 sm:px-12 sm:pt-20">
        <div className="max-w-[62ch]">
          <h2 className="mb-4 font-display text-2xl font-normal leading-tight text-strong sm:text-[48px]">
            Scripture in the language they know best
          </h2>
          <p className="font-body text-base text-muted sm:text-md">
            The goal of Bible translation is for people everywhere, speakers of every language, to gain
            access to Scriptures in the language they know best.
          </p>
        </div>

        <ul className="mt-11 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PRINCIPLES.map(({ numeral, title, body }) => (
            <li key={title} className="rounded-md border border-hair bg-card p-7 shadow-sm">
              <p aria-hidden className="mb-4 font-display text-sm font-semibold tracking-wide text-primary">
                {numeral}
              </p>
              <h3 className="mb-3 font-display text-lg font-semibold leading-snug text-strong">{title}</h3>
              <p className="font-body text-base leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <AboutCTA
        title="This is the task we exist for."
        body="Thousands of languages across Africa still wait. Find out what we believe, or help send someone."
        primary={{ label: "Support the work", href: "/give" }}
        secondary={{ label: "Read what we believe", href: "/about/what-we-believe" }}
      />
    </PageTemplate>
  );
}
