import * as React from "react";
import { Divider } from "@/components/atoms/Divider";

export function Vision2025() {
  return (
    <section className="mx-auto max-w-[var(--container-max)] px-5 py-20 text-center sm:px-12">
      <Divider variant="accent" width={56} className="mx-auto" />
      <div className="mb-2 mt-5 font-ui text-xs font-bold uppercase tracking-[0.2em] text-green-700">Vision 2025</div>
      <h2 className="mx-auto mb-6 max-w-[22ch] font-display text-2xl font-semibold leading-[1.15] text-strong">
        Gathering momentum of the Bible translation movement
      </h2>
      <p className="mx-auto max-w-[62ch] font-display text-md italic leading-[1.55] text-muted">
        Motivated by the pressing need for all peoples to have access to the Word of God in a language that speaks
        to their hearts, and reaffirming our historic values and our trust in God to accomplish the impossible, we
        embrace the vision that by 2025 a Bible translation project will be in progress for every people group that
        needs it.
      </p>
    </section>
  );
}
