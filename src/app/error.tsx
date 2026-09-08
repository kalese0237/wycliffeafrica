"use client";

import * as React from "react";
import { RotateCcw } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";

/**
 * The route error boundary. Most of what can fail here is the content API — a page whose text lives
 * in Directus, reached over a connection that is not always good. So the copy says that plainly and
 * offers the retry first: the usual fix really is to ask again.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageTemplate>
      <section className="mx-auto max-w-(--container-max) px-5 py-24 sm:px-12 sm:py-32">
        <p className="font-ui text-xs font-semibold uppercase tracking-caps text-primary-active">
          Something went wrong
        </p>
        <Divider variant="accent" width={56} className="mb-7 mt-4" />
        <h1 className="max-w-[20ch] text-balance font-display text-2xl font-normal leading-tight text-strong sm:text-3xl">
          We could not load this page.
        </h1>
        <p className="mt-5 max-w-[58ch] font-body text-md leading-relaxed text-body">
          This is usually the content service being slow or briefly unavailable rather than anything
          you did. Try again, and if it keeps happening, tell us and we will look into it.
        </p>
        {error.digest && (
          <p className="mt-4 font-mono text-sm text-faint">Reference: {error.digest}</p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={reset} variant="primary" iconLeft={<RotateCcw size={16} />}>
            Try again
          </Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </section>
    </PageTemplate>
  );
}
