import * as React from "react";

export function ScriptureQuoteBand() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div className="relative mx-auto flex max-w-[var(--container-max)] flex-col items-center gap-5 px-5 py-20 text-center sm:px-12">
        <div className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-green-400">Matthew 28:19</div>
        <blockquote className="max-w-[24ch] font-display text-2xl italic leading-[1.4] text-white">
          &ldquo;Go and make disciples of all peoples, teaching them to obey everything I commanded you.&rdquo;
        </blockquote>
        <div className="h-[2px] w-14 bg-accent" />
      </div>
    </section>
  );
}
