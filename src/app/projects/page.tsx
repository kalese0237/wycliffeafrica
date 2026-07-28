import * as React from "react";
import { GraduationCap, Landmark, ArrowRight, type LucideIcon } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { PageIntro } from "@/components/organisms";
import { Button } from "@/components/atoms/Button";

const PROJECTS: { icon: LucideIcon; title: string; body: string; href: string }[] = [
  {
    icon: GraduationCap,
    title: "Internship Program",
    body: "A one-year program that recruits young people into Bible translation and mentors them toward a lifetime of ministry.",
    href: "/projects/internship-program",
  },
  {
    icon: Landmark,
    title: "SunRise Africa Centre",
    body: "A USD 1.2 million capital campaign to build a permanent training and sending base near Nairobi.",
    href: "/projects/sunrise-africa-centre",
  },
];

export const metadata = {
  title: "Projects | Wycliffe Africa",
};

export default function ProjectsPage() {
  return (
    <PageTemplate>
      <PageIntro
        journey="serve"
        eyebrowLabel="Projects"
        title="Initiatives building the next generation of the movement"
        subtitle="Beyond day-to-day giving, these are the specific efforts Wycliffe Africa is raising partners around right now."
      />

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-6 px-5 pb-20 pt-4 sm:grid-cols-2 sm:px-12">
        {PROJECTS.map(({ icon: ProjectIcon, title, body, href }) => (
          <div key={title} className="flex flex-col rounded-lg border border-hair bg-card p-6 shadow-sm">
            <span className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-primary-tint text-primary">
              <ProjectIcon size={24} />
            </span>
            <h3 className="mb-2 mt-4 font-display text-lg font-semibold text-strong">{title}</h3>
            <p className="mb-5 flex-1 font-body text-base leading-relaxed text-body">{body}</p>
            <Button href={href} variant="secondary" size="sm" iconRight={<ArrowRight size={15} />} className="w-fit">
              Learn more
            </Button>
          </div>
        ))}
      </section>
    </PageTemplate>
  );
}
