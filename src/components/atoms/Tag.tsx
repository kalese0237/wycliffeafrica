import * as React from "react";
import { cn } from "@/lib/cn";

export type Journey = "give" | "serve" | "churches" | "pray" | "stories" | "resources";

const journeys: Record<Journey, { text: string; tint: string; dot: string; label: string }> = {
  give: { text: "text-tag-give", tint: "bg-tag-give-tint", dot: "bg-tag-give", label: "Give" },
  serve: { text: "text-tag-serve", tint: "bg-tag-serve-tint", dot: "bg-tag-serve", label: "Serve" },
  churches: { text: "text-tag-churches", tint: "bg-tag-churches-tint", dot: "bg-tag-churches", label: "Churches" },
  pray: { text: "text-tag-pray", tint: "bg-tag-pray-tint", dot: "bg-tag-pray", label: "Pray" },
  stories: { text: "text-tag-stories", tint: "bg-tag-stories-tint", dot: "bg-tag-stories", label: "Stories" },
  resources: { text: "text-tag-resources", tint: "bg-tag-resources-tint", dot: "bg-tag-resources", label: "Resources" },
};

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Which visitor journey this tag colour-codes. */
  journey?: Journey;
  /** Show the leading colour dot. */
  dot?: boolean;
}

/** Journey / audience tag — colour-codes the six visitor journeys. */
export function Tag({ journey = "give", dot = true, children, className, ...rest }: TagProps) {
  const j = journeys[journey];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[7px] rounded-pill px-[13px] py-[5px] font-ui text-xs font-bold uppercase tracking-[0.06em]",
        j.tint,
        j.text,
        className,
      )}
      {...rest}
    >
      {dot && <span className={cn("h-[6px] w-[6px] rounded-full", j.dot)} />}
      {children ?? j.label}
    </span>
  );
}
