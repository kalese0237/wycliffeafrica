import * as React from "react";
import { FileText, PlayCircle, BookOpen, BarChart3, Headphones, ArrowDownToLine, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export type ResourceType = "pdf" | "video" | "guide" | "report" | "audio";

const TYPE: Record<ResourceType, { icon: LucideIcon; label: string }> = {
  pdf: { icon: FileText, label: "PDF" },
  video: { icon: PlayCircle, label: "Video" },
  guide: { icon: BookOpen, label: "Guide" },
  report: { icon: BarChart3, label: "Report" },
  audio: { icon: Headphones, label: "Audio" },
};

export interface ResourceCardProps {
  type?: ResourceType;
  title: string;
  meta?: string;
  action?: string;
  onAction?: () => void;
  className?: string;
}

/** A downloadable/media resource row-card. Icon by type, title, meta, trailing action. */
export function ResourceCard({ type = "pdf", title, meta = "", action = "Download", onAction, className }: ResourceCardProps) {
  const t = TYPE[type];
  const TypeIcon = t.icon;
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-md border border-hair bg-card p-4 shadow-sm transition-shadow duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-md",
        className,
      )}
    >
      <span className="inline-flex h-[46px] w-[46px] flex-none items-center justify-center rounded-md bg-primary-tint text-primary">
        <TypeIcon width={22} height={22} strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="font-display text-md font-semibold leading-tight text-strong">{title}</div>
        <div className="mt-[5px] font-ui text-xs uppercase tracking-caps text-faint">
          {[t.label, meta].filter(Boolean).join(" · ")}
        </div>
      </div>
      <button
        type="button"
        onClick={onAction}
        className="inline-flex items-center gap-1.5 whitespace-nowrap font-ui text-sm font-semibold text-primary"
      >
        {action} <ArrowDownToLine width={15} height={15} />
      </button>
    </div>
  );
}
