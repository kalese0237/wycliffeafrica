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
            Evangelism, teaching, worship and typically all ministries are severely hampered unless people receive a
            Bible in a language they can adequately understand. Across Africa, some hundreds of language groups
            don&apos;t have Scriptures in their own language. Millions of people are still cut off from the
            life-changing power of God&apos;s inspired Word.
          </p>
          <p>
            How can Scriptures become available in the languages where they are still needed? This vital ministry
            can only happen through the work of a broad and skilled team — linguists, translators, literacy
            teachers, ethnomusicologists, computer specialists, administrators and more.
          </p>
          <p>
            Perhaps someone like you. Are you passionately interested in reaching the unreached through Bible
            translation? Contact us — below are ways you can get involved in this ministry.
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
