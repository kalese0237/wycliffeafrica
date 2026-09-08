import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { AboutPhotoHero, AboutCTA, ArticleList } from "@/components/organisms/about";

export const metadata = {
  title: "Serve | Wycliffe Africa",
  description:
    "Bible translation needs a broad, skilled team: translation advisors, literacy workers, teachers, IT and finance professionals, administrators. Serve full-time, part-time, as an individual or a group.",
};

/** The disciplines a translation programme runs on, from the supplied text. */
const SKILLS = [
  "Translation team advisors",
  "Literacy workers",
  "Teachers",
  "IT professionals",
  "Administrators",
  "Finance professionals",
];

/** What part-time service actually looks like — the supplied possibilities, written out. */
const POSSIBILITIES = [
  "Construction work for language projects. Translation programmes need buildings before they need linguists: offices, training centres, somewhere for a team to live while it works.",
  "Expertise, advice and consulting. Whatever you do professionally, there is a version of it that a translation programme is currently doing badly for want of someone who knows how.",
  "Training personnel. Passing on what you know to the people who will do this work for the next thirty years is among the highest-leverage things anyone gives us.",
  "Teaching the children of language workers. Families stay on the field when their children are being taught well, and leave when they are not.",
  "Creative help putting Scripture to use. A finished translation still has to be recorded, broadcast, illustrated, set to music and taught before it changes anything.",
  "Helping the IT department — and a good deal more besides. The list here is not the limit; it is only what has come up most often.",
];

export default function ServePage() {
  return (
    <PageTemplate>
      <AboutPhotoHero
        title="Serve with"
        titleAccent="what you have"
        standfirst="Bible translation is not carried by linguists alone. It runs on a broad, skilled team — and a good deal of that team is made up of people who kept their profession and gave it to this work."
        image="/photos/pexels-oudneypatsika-2769437.jpg"
        imageAlt="A woman working at a laptop"
        focalPoint="55% 50%"
      />

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-10 px-5 pt-16 sm:px-12 sm:pt-20 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
        <div>
          <h2 className="font-display text-2xl font-normal leading-snug text-strong">
            We need a variety of <em className="italic text-primary-active">skills</em>.
          </h2>
        </div>
        <div>
          <p className="mb-4.5 font-body text-md leading-relaxed text-body sm:text-[18.5px]">
            How do the Scriptures become available in the languages where they are still needed? Only
            through the work of a broad and skilled team — and most of the work on that team is not
            translation.
          </p>
          <p className="font-body text-md leading-relaxed text-body sm:text-[18.5px]">
            These positions can be filled by full-time or part-time volunteers, or by staff members who
            have raised their own financial support. Perhaps we could use someone like you.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-x-8 border-t border-hair sm:grid-cols-2">
            {SKILLS.map((skill) => (
              <li
                key={skill}
                className="border-b border-hair py-3 font-ui text-xs font-semibold uppercase tracking-caps-loose text-muted"
              >
                {skill}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: "Staff positions needed", href: "/resources" },
              { label: "More about support", href: "/give" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="group inline-flex w-fit items-center gap-2 font-ui text-xs font-bold uppercase tracking-caps text-primary transition-colors duration-150 hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-400"
              >
                {label}
                <ArrowRight size={14} className="transition-transform duration-150 ease-out group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ArticleList
        eyebrow="Serve part-time"
        title="You do not have to move"
        rubric="As an individual, or as a group"
        items={POSSIBILITIES}
        coda="Opportunities change constantly and your skills are specific, so the only sensible next step is to tell us what they are. Fill in the preliminary questionnaire and we will work out together where they would count for most."
      />

      <AboutCTA
        title="Tell us what you can do."
        body="The preliminary questionnaire is short. It is how we match a real skill to a real need instead of guessing, and it commits you to nothing."
        primary={{ label: "Preliminary questionnaire", href: "/questionnaire" }}
        secondary={{ label: "Become a member", href: "/involved/become-a-member" }}
        flat
      />
    </PageTemplate>
  );
}
