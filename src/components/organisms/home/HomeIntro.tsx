import * as React from "react";
import { PhotoPlaceholder } from "@/components/molecules/PhotoPlaceholder";

export function HomeIntro() {
  return (
    <section className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 gap-10 px-5 py-20 sm:px-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="font-ui text-xs font-bold uppercase tracking-caps text-green-700">Wycliffe Africa</div>
        <h2 className="mb-5 mt-3 font-display text-2xl font-semibold leading-[1.1] text-strong">
          Changing lives through Bible translation in Africa
        </h2>
        <div className="space-y-4 font-body text-base leading-relaxed text-muted">
          <p>
            Church planters can&apos;t effectively share the gospel and faithfully disciple new believers without
            God&apos;s written word. Christian radio can&apos;t beam Scripture into remote areas unless it has been
            translated.
          </p>
          <p>
            Evangelism, teaching and worship are all hampered when people don&apos;t have a Bible in a language
            they understand well. Hundreds of African language groups still have no Scripture at all — millions
            of people, cut off from God&apos;s Word.
          </p>
          <p>
            How do Scriptures become available where they are still needed? Only through a broad, skilled team:
            linguists, translators, literacy teachers, ethnomusicologists, computer specialists, administrators.
          </p>
          <p>
            Perhaps someone like you. If this is work you could see yourself in, contact us — the ways to get
            involved are below.
          </p>
        </div>
      </div>
      <div className="relative pb-8">
        <PhotoPlaceholder caption="A woman in prayer" aspect="4/3" className="relative z-0" />
        <PhotoPlaceholder
          caption="Reading Scripture in a heart language"
          aspect="4/3"
          className="relative z-10 -mt-16 ml-12"
        />
      </div>
    </section>
  );
}
