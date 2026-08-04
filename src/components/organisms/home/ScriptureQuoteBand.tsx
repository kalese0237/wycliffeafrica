import * as React from "react";

export function ScriptureQuoteBand() {
  return (
    <section className="relative overflow-hidden bg-terra-900">
      <div
        aria-hidden
        className="absolute inset-0 bg-fixed bg-cover bg-center bg-[url('/Sunrise-africa/african-sunrise.webp')]"
      />
      <div aria-hidden className="absolute inset-0 bg-terra-900/80" />
      <div className="relative mx-auto flex max-w-(--container-max) flex-col items-center gap-6 px-5 py-24 text-center sm:px-12">
        <div className="font-ui text-xs font-bold uppercase tracking-caps-loose text-green-400">
          Matthew 28:19-20
        </div>
        <blockquote className="max-w-[42ch] font-scripture text-2xl italic leading-[1.4] text-white sm:text-3xl lg:text-4xl">
          &ldquo;Therefore go and make disciples of all nations, baptizing them in the name of the Father and of
          the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you.&rdquo;
        </blockquote>
        <div className="h-[2px] w-14 bg-accent" />
      </div>
    </section>
  );
}
