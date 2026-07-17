import * as React from "react";
import { ArrowRight } from "lucide-react";
import { PhotoPlaceholder } from "@/components/molecules/PhotoPlaceholder";
import { Button } from "@/components/atoms/Button";

export function MissionsMovementFeature() {
  return (
    <section className="bg-paper-1">
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 items-center gap-10 px-5 py-20 sm:px-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <PhotoPlaceholder caption="A child reading the Bible" aspect="4/5" />
        <div>
          <div className="font-ui text-xs font-bold uppercase tracking-caps text-green-700">Get involved</div>
          <h2 className="mb-5 mt-3 font-display text-2xl font-semibold leading-[1.08] text-strong">
            Join the missions movement
          </h2>
          <div className="space-y-4 font-body text-base leading-relaxed text-muted">
            <p>
              Africa is the second-largest and second-most-populous continent in the world, with an estimated
              population of over 1.3 billion people. It is home to the highest linguistic diversity in the world,
              with well over 1,500 living languages — a diversity shaped by the continent&apos;s long, deep history.
            </p>
            <p>
              Christianity in Africa began shortly after the founding of the Church and was well established in
              North Africa within its first centuries. By the sixth century, missionaries had carried the faith
              into the heart of the continent, shaped by early African voices including Tertullian, Perpetua,
              Clement of Alexandria, Origen, and Augustine of Hippo.
            </p>
          </div>
          <Button href="/contact" variant="accent" iconRight={<ArrowRight size={16} />} className="mt-6">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
