import * as React from "react";
import { HISTORY_STORY, type HistoryStoryBlock } from "@/content/about";

function StoryBlock({ block }: { block: HistoryStoryBlock }) {
  switch (block.kind) {
    case "paragraph":
      return <p className="mt-5 max-w-[66ch] font-body text-base leading-relaxed text-body sm:text-md">{block.text}</p>;
    case "turn":
      return (
        <p className="my-10 max-w-[30ch] text-balance font-display text-lg font-normal leading-snug text-strong sm:text-xl">
          {block.text}
        </p>
      );
    case "list":
      return (
        <>
          <p className="mt-5 max-w-[66ch] font-body text-base leading-relaxed text-body sm:text-md">{block.intro}</p>
          <ul className="mt-6 mb-4 max-w-[66ch] border-t border-hair">
            {block.items.map((item) => (
              <li key={item} className="border-b border-hair py-3.5 font-display text-md leading-snug text-strong">
                {item}
              </li>
            ))}
          </ul>
        </>
      );
  }
}

/**
 * The full history narrative on the two-column document grid, under the dated rail.
 *
 * The text is verbatim. The source's own one-sentence paragraphs ("It was from this vision that
 * Wycliffe Africa was born.") are set in the display face as the story's turning points, and the
 * roles list takes the house form for a series: ruled rows, no bullets.
 */
export function HistoryStory() {
  return (
    <section
      id="story"
      className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-x-16 gap-y-8 px-5 pt-16 sm:px-12 sm:pt-20 lg:grid-cols-[minmax(220px,1fr)_1.9fr]"
    >
      <div className="lg:sticky lg:top-28 lg:self-start">
        <h2 className="text-balance font-display text-2xl font-normal leading-tight text-strong sm:text-[48px]">
          The story and growth of Wycliffe Africa
        </h2>
      </div>

      <div className="border-t-2 border-ink-0 pt-2">
        {HISTORY_STORY.map((block, i) => (
          <StoryBlock key={i} block={block} />
        ))}
      </div>
    </section>
  );
}
