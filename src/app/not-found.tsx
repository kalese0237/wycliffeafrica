import * as React from "react";
import { PageTemplate } from "@/components/templates";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";

export const metadata = {
  title: "Page not found | Wycliffe Africa",
};

export default function NotFound() {
  return (
    <PageTemplate>
      <section className="mx-auto max-w-(--container-max) px-5 py-24 sm:px-12 sm:py-32">
        <p className="font-ui text-xs font-semibold uppercase tracking-caps text-primary-active">404</p>
        <Divider variant="accent" width={56} className="mb-7 mt-4" />
        <h1 className="max-w-[18ch] text-balance font-display text-2xl font-normal leading-tight text-strong sm:text-3xl">
          This page is not here.
        </h1>
        <p className="mt-5 max-w-[58ch] font-body text-md leading-relaxed text-body">
          The address may have changed, or the link that brought you here may be out of date. Nothing
          has gone wrong on your side.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" variant="primary">
            Back to the homepage
          </Button>
          <Button href="/contact" variant="secondary">
            Tell us what you were looking for
          </Button>
        </div>
      </section>
    </PageTemplate>
  );
}
