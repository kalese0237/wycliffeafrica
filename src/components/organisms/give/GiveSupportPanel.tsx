import * as React from "react";
import { Languages, GraduationCap, BookOpen, type LucideIcon } from "lucide-react";

const ALLOCATIONS: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Languages, title: "Bible translation", body: "Drafting, checking & consultant review" },
  { icon: GraduationCap, title: "Training", body: "Equipping African translators & staff" },
  { icon: BookOpen, title: "Scripture engagement", body: "Getting the Word used in communities" },
];

/** "Where your gift goes" breakdown + a testimony quote — sits beside the giving form. */
export function GiveSupportPanel() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-hair bg-card p-5 shadow-sm">
        <div className="mb-1 font-ui text-xs font-bold uppercase tracking-caps text-green-700">
          Where your gift goes
        </div>
        {ALLOCATIONS.map(({ icon: AllocIcon, title, body }, i) => (
          <div
            key={title}
            className={i === 0 ? "flex items-center gap-3 py-3" : "flex items-center gap-3 border-t border-hair py-3"}
          >
            <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-green-100 text-green-700">
              <AllocIcon size={18} />
            </span>
            <div>
              <div className="font-display text-md font-semibold text-strong">{title}</div>
              <div className="font-ui text-sm text-faint">{body}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-lg bg-navy-900 p-5 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(400px 260px at 100% 0%, rgba(51,176,15,.25), transparent 60%)" }}
        />
        <blockquote className="relative font-display text-lg italic leading-snug">
          &ldquo;I have prayed in a borrowed language all my life. Now God speaks mine.&rdquo;
        </blockquote>
        <div className="relative mt-3.5 font-ui text-xs uppercase tracking-caps text-green-300">
          A grandmother · at a New Testament dedication
        </div>
      </div>
    </div>
  );
}
