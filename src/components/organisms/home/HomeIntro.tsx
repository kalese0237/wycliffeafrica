import * as React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";

const ROLES = [
  "Linguists",
  "Translators",
  "Literacy teachers",
  "Ethnomusicologists",
  "Computer specialists",
  "Administrators",
];

export function HomeIntro() {
  return (
    <section className="mx-auto max-w-(--container-max) px-5 py-20 sm:px-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:self-start">
          <div className="font-ui text-xs font-bold uppercase tracking-caps-loose text-accent-hover">
            Why translation
          </div>
          <Divider variant="accent" width={56} className="mb-6 mt-4" />
          <h2 className="max-w-[16ch] font-display text-2xl font-semibold leading-[1.08] text-strong">
            Changing lives through Bible translation in Africa
          </h2>

          <div className="relative mt-8 aspect-4/3 overflow-hidden rounded-lg border border-hair shadow-md">
            <Image
              src="/photos/pexels-olukoya-isreal-ayomikun-2057424626-34221789.jpg"
              alt="A woman reading Scripture in her own language"
              fill
              sizes="(min-width: 1024px) 38vw, 90vw"
              className="object-cover"
              style={{ objectPosition: "50% 40%" }}
            />
          </div>
        </div>

        <div>
          <p className="font-body text-md leading-[1.5] text-strong sm:text-lg">
            A church planter can only preach what people can read. A radio station can only broadcast Scripture
            that has been translated. Everything the church does downstream depends on the Word arriving first.
          </p>

          <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-body">
            <p>
              Where it has not arrived, worship, teaching and evangelism all run at half strength. Hundreds of
              African language groups still have no Scripture in the language they think and pray in. Millions of
              people are waiting on a book that has never been written in their words.
            </p>
            <p>
              That work is never done by one person. A single translation project takes years and a whole team
              standing behind it &mdash; and the team needs far more than translators.
            </p>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-x-6 border-t border-hair sm:grid-cols-3">
            {ROLES.map((role) => (
              <li
                key={role}
                className="border-b border-hair py-3 font-ui text-xs font-semibold uppercase tracking-caps-loose text-muted"
              >
                {role}
              </li>
            ))}
          </ul>

          <p className="mt-8 font-body text-base leading-relaxed text-body">
            Perhaps someone like you. If this is work you could see yourself in, we would like to hear from you.
          </p>

          <Button href="/contact" variant="accent" iconRight={<ArrowRight size={16} />} className="mt-6">
            Get involved
          </Button>
        </div>
      </div>
    </section>
  );
}
