import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { AboutPhotoHero, AboutCTA, ArticleList } from "@/components/organisms/about";

export const metadata = {
  title: "Pray With Us | Wycliffe Africa",
  description:
    "Prayer launched the work of Bible translation and it is what keeps it moving. What to pray for, and how to build prayer for translation into the life of your church or small group.",
};

/** What the supplied copy says prayer does for the work — three statements, read once. */
const WHAT_PRAYER_DOES = [
  "It enables us to do the work. Translation is slow, technical and often lonely, and the people doing it are ordinary people. Prayer is how the strength for it arrives.",
  "It carries us through the hard stretches. Funding falls through, visas are refused, health fails, a checked draft comes back needing another year. Teams persevere because someone was praying they would.",
  "It keeps the work God-centred. The temptation in any mission is to start measuring ourselves by output. Prayer keeps returning the work to the One whose word it is.",
];

/** The three things to hold before God, expanded from the supplied prayer prompts. */
const WHAT_TO_PRAY_FOR = [
  "Pray for people who have no Bible. Hundreds of language communities across Africa have not one verse in the language they think, argue and pray in. Ask that the wait would end in their lifetime, and that the church among them would grow hungry for the Word.",
  "Pray for translation projects already under way. Every project needs consultants, funding, electricity, working equipment and years of patience. Ask for accurate, natural drafts, and for the checking work that turns a draft into Scripture a community will trust.",
  "Pray for missionaries and their families. Most serve far from home on support raised gift by gift. Ask for health, for marriages and children that flourish rather than merely survive, and for local churches around them that become real community.",
];

/** Ways a church or a group can build prayer for translation into what it already does. */
const WAYS_TO_FACILITATE = [
  "Start a small group around one language community that is still waiting for Scripture. Learn its name, where it is, who lives there, and pray for it by name until something changes.",
  "Give an existing group a standing slot. Ask a group that already meets to pray for one project regularly, keep up with news from it, and get to know the people working on it.",
  "Ask your church leadership to adopt a project or a country as the congregation's main missions focus, so the commitment outlasts any one enthusiast.",
  "Hold a day of prayer. Gather the congregation, show film from the field, teach why mother-tongue Scripture matters, and give people long enough to actually pray.",
  "Put translation into the Sunday service. A named request in the pastoral prayer each week teaches a congregation more than an annual missions Sunday does.",
  "Run a Bible study on mission and translation. Prayer follows conviction, and conviction follows Scripture on why every people group needs the Word in its own tongue.",
];

export default function PrayWithUsPage() {
  return (
    <PageTemplate>
      <AboutPhotoHero
        title="Prayer cannot be"
        titleAccent="overestimated"
        standfirst="It launched the work of Bible translation, and it is what keeps moving it forward. Wycliffe Africa runs on the prayers of people who may never see the villages they are praying for."
        image="/photos/pexels-tima-miroshnichenko-6860497.jpg"
        imageAlt="A woman in prayer"
        focalPoint="50% 35%"
      />

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-10 px-5 pt-16 sm:px-12 sm:pt-20 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
        <div>
          <h2 className="font-display text-2xl font-normal leading-snug text-strong">
            The work is not finally done by <em className="italic text-primary-active">translators</em>.
          </h2>
        </div>
        <div>
          <p className="mb-4.5 font-body text-md leading-relaxed text-body sm:text-[18.5px]">
            Behind every completed New Testament there is a linguist at a desk, and behind the linguist
            there are people who prayed for years without ever meeting them. That is not a courtesy we
            extend to supporters. It is how the work has always actually moved.
          </p>
          <p className="font-body text-md leading-relaxed text-body sm:text-[18.5px]">
            So we ask plainly: pray with us. Not once, and not vaguely, but for particular people doing
            particular work in particular places, for as long as it takes.
          </p>

          <Link
            href="/prayer/requests"
            className="group mt-8 flex items-baseline justify-between gap-6 border-t-2 border-ink-0 pt-4 transition-colors duration-150 hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-400"
          >
            <span className="font-display text-lg font-normal leading-snug text-strong group-hover:text-primary">
              Read the requests coming in from the field now
            </span>
            <span className="flex flex-none items-center gap-2 font-ui text-xs font-bold uppercase tracking-caps text-primary">
              Requests
              <ArrowRight size={14} className="transition-transform duration-150 ease-out group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      <ArticleList
        eyebrow="What your prayers do"
        title="Three things prayer carries"
        rubric="Said by the people receiving it"
        items={WHAT_PRAYER_DOES}
      />

      <section className="relative mt-16 overflow-hidden bg-terra-900 sm:mt-20">
        <div className="mx-auto flex max-w-(--container-max) flex-col items-center gap-5 px-5 py-16 text-center sm:px-12 sm:py-20">
          <div className="font-ui text-xs font-bold uppercase tracking-caps-loose text-green-400">
            2 Thessalonians 3:1
          </div>
          <blockquote className="max-w-[34ch] font-scripture text-2xl italic leading-[1.35] text-white sm:text-3xl">
            &ldquo;Pray for us, that the word of the Lord may spread rapidly and be honoured, just as it
            was with you.&rdquo;
          </blockquote>
          <div className="h-[2px] w-14 bg-accent" />
        </div>
      </section>

      <ArticleList
        eyebrow="What to pray for"
        title="Three things to hold before God"
        items={WHAT_TO_PRAY_FOR}
      />

      <ArticleList
        eyebrow="In your church"
        title="Ways to facilitate prayer"
        rubric="For groups, not only individuals"
        items={WAYS_TO_FACILITATE}
        coda="None of these require a budget or a committee. They require someone deciding that a language community they will probably never visit is worth remembering out loud, week after week."
      />

      <AboutCTA
        title="Take one request with you this week."
        body="Current requests from missionaries across Africa are published as the office reviews them, and the prayer guide gathers them into one rhythm every two weeks."
        primary={{ label: "Read current requests", href: "/prayer/requests" }}
        secondary={{ label: "Get the prayer guide", href: "/prayer-guide.pdf" }}
        flat
      />
    </PageTemplate>
  );
}
