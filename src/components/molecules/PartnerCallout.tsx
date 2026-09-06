import * as React from "react";
import { Heart, Mail } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/cn";

export interface PartnerCalloutProps {
  firstName: string;
  /** Direct contact address, where the missionary has a linked portal account. */
  email?: string | null;
  className?: string;
}

/** The support ask, restated beside the story rather than only at the page's close. */
export function PartnerCallout({ firstName, email, className }: PartnerCalloutProps) {
  return (
    <aside className={cn("w-full rounded-lg border border-hair bg-card p-6 shadow-sm", className)}>
      <h3 className="font-display text-lg font-semibold text-strong">Partner with {firstName}</h3>
      <p className="mt-2 font-body text-sm leading-relaxed text-muted">
        Missionaries serve through the monthly support and prayers of partners. Your gift goes directly to
        this ministry.
      </p>
      <div className="mt-5 flex flex-col gap-3">
        <Button href="/give" variant="accent" iconLeft={<Heart size={16} />} className="w-full">
          Support {firstName}
        </Button>
        <Button
          href={email ? `mailto:${email}` : "/contact"}
          variant="secondary"
          iconLeft={<Mail size={16} />}
          className="w-full"
        >
          Send a greeting
        </Button>
      </div>
    </aside>
  );
}
