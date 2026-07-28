import * as React from "react";
import Image from "next/image";

export function HomeIntro() {
  return (
    <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-10 px-5 py-20 sm:px-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="font-ui text-xs font-bold uppercase tracking-caps text-green-700">Wycliffe Africa</div>
        <h2 className="mb-5 mt-3 font-display text-2xl font-semibold leading-[1.1] text-strong">
          Changing lives through Bible translation in Africa
        </h2>
        <div className="space-y-4 font-body text-base leading-relaxed text-body">
          <p>
            Church planters can&apos;t effectively share the gospel and faithfully disciple new believers without
            God&apos;s written word. Christian radio can&apos;t beam Scripture into remote areas unless it has been
            translated.
          </p>
          <p>
            Evangelism, teaching and worship are all hampered when people don&apos;t have a Bible in a language
            they understand well. Hundreds of African language groups still have no Scripture at all. Millions
            of people remain cut off from God&apos;s Word.
          </p>
          <p>
            How do Scriptures become available where they are still needed? Only through a broad, skilled team:
            linguists, translators, literacy teachers, ethnomusicologists, computer specialists, administrators.
          </p>
          <p>
            Perhaps someone like you. If this is work you could see yourself in, contact us. The ways to get
            involved are below.
          </p>
        </div>
      </div>
      <div className="relative pb-8">
        <div className="relative z-0 aspect-4/3 overflow-hidden rounded-lg border border-hair shadow-md">
          <Image
            src="/photos/pexels-tima-miroshnichenko-6860497.jpg"
            alt="A woman in prayer"
            fill
            sizes="(min-width: 1024px) 25vw, 45vw"
            className="object-cover"
            style={{ objectPosition: "50% 35%" }}
          />
        </div>
        <div className="relative z-10 -mt-16 ml-12 aspect-4/3 overflow-hidden rounded-lg border border-hair shadow-md">
          <Image
            src="/photos/pexels-olukoya-isreal-ayomikun-2057424626-34221789.jpg"
            alt="Reading Scripture in a heart language"
            fill
            sizes="(min-width: 1024px) 25vw, 45vw"
            className="object-cover"
            style={{ objectPosition: "50% 40%" }}
          />
        </div>
      </div>
    </section>
  );
}
