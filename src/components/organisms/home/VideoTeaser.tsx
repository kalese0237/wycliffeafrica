import * as React from "react";
import { Play } from "lucide-react";

export function VideoTeaser() {
  return (
    <section className="relative overflow-hidden bg-navy-800">
      <div className="relative mx-auto flex max-w-[var(--container-max)] flex-col items-center gap-6 px-5 py-24 text-center sm:px-12">
        <button
          type="button"
          aria-label="Play video"
          className="inline-flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-white/15 bg-linear-to-br from-green-400 to-green-600 shadow-[0_10px_40px_rgba(51,176,15,0.45)]"
        >
          <Play size={28} className="ml-1 text-white" fill="currentColor" />
        </button>
        <div className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-green-400">Vision 2025</div>
        <h2 className="max-w-[22ch] font-display text-2xl font-medium leading-tight text-white">
          Gathering momentum of the Bible translation movement
        </h2>
      </div>
    </section>
  );
}
