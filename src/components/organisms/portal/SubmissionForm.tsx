"use client";

import * as React from "react";
import { useActionState } from "react";
import { Newspaper, HandHeart, Send, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { cn } from "@/lib/cn";
import { submitEntryAction, type ActionState } from "@/lib/portal/actions";
import type { UpdateType } from "@/lib/directus/schema";
import { SUBMISSION_LIMITS } from "@/lib/portal/validation";

const TYPES: { value: UpdateType; label: string; icon: React.ReactNode }[] = [
  { value: "update", label: "Field update", icon: <Newspaper size={15} /> },
  { value: "prayer", label: "Prayer request", icon: <HandHeart size={15} /> },
];

/** Portal submission form — updates and prayer requests land as drafts for office review. */
export function SubmissionForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(submitEntryAction, {});
  const [type, setType] = React.useState<UpdateType>("update");
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="rounded-lg border border-hair bg-card p-6 shadow-sm sm:p-8">
      <h2 className="mb-1.5 font-display text-lg font-semibold text-strong">Share from the field</h2>
      <p className="mb-6 font-body text-sm leading-relaxed text-muted">
        Your submission is reviewed by the office before it appears on the website.
      </p>

      <FormField label="What are you sharing?" className="mb-4">
        <div className="flex gap-2" role="radiogroup" aria-label="Submission type">
          {TYPES.map((t) => (
            <label
              key={t.value}
              className={cn(
                "inline-flex cursor-pointer items-center gap-1.5 rounded-pill border px-4 py-2 font-ui text-sm font-semibold transition-colors duration-[130ms]",
                type === t.value
                  ? "border-primary bg-primary-tint text-primary"
                  : "border-hair bg-card text-muted hover:bg-sunk",
              )}
            >
              <input
                type="radio"
                name="type"
                value={t.value}
                checked={type === t.value}
                onChange={() => setType(t.value)}
                className="sr-only"
              />
              {t.icon}
              {t.label}
            </label>
          ))}
        </div>
      </FormField>

      <FormField label="Title" required className="mb-4">
        <Input
          name="title"
          placeholder={type === "prayer" ? "Pray for…" : "What has happened?"}
          required
          minLength={SUBMISSION_LIMITS.titleMin}
          maxLength={SUBMISSION_LIMITS.titleMax}
        />
      </FormField>

      <FormField label="Message" required className="mb-4">
        <textarea
          name="body"
          rows={6}
          required
          minLength={SUBMISSION_LIMITS.bodyMin}
          maxLength={SUBMISSION_LIMITS.bodyMax}
          placeholder={
            type === "prayer"
              ? "Share what supporters should pray for."
              : "Share the news from your field of service."
          }
          className="w-full rounded-md border border-hair bg-card px-[14px] py-[10px] font-body text-base text-body outline-none transition-[border-color,box-shadow] duration-[130ms] placeholder:text-faint focus:border-spark focus:shadow-[0_0_0_3px_var(--color-spark-tint)]"
        />
      </FormField>

      {type === "update" && (
        <FormField label="Photo" helper="Optional. JPG, PNG, or WebP; maximum 5 MB." className="mb-4">
          <input
            type="file"
            name="image"
            accept="image/jpeg,image/png,image/webp"
            className="rounded-md border border-hair bg-sunk p-3 font-ui text-sm text-muted file:mr-3 file:rounded-sm file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-white"
          />
        </FormField>
      )}

      {type === "prayer" && (
        <label className="mb-5 flex cursor-pointer items-start gap-3 rounded-md border border-hair bg-sunk p-4">
          <input type="checkbox" name="sensitive" className="mt-0.5 h-4 w-4 accent-[var(--color-primary)]" />
          <span className="font-body text-sm leading-relaxed text-muted">
            <span className="mb-0.5 flex items-center gap-1.5 font-ui text-sm font-semibold text-body">
              <ShieldAlert size={15} /> Security-sensitive
            </span>
            Publish this request without my name or exact location. Use this if you serve in a
            restricted or hostile area.
          </span>
        </label>
      )}

      {state.error && (
        <p className="mb-4 rounded-md border border-danger/30 bg-[#f7dcd9] px-4 py-3 font-body text-sm text-[#8f271f]">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="mb-4 flex items-start gap-2 rounded-md border border-green-500/30 bg-green-100 px-4 py-3 font-body text-sm text-green-700">
          <CheckCircle2 size={17} className="mt-0.5 flex-none" /> {state.success}
        </p>
      )}

      <Button type="submit" variant="accent" size="lg" disabled={pending} iconRight={<Send size={16} />}>
        {pending ? "Submitting…" : "Submit for review"}
      </Button>
    </form>
  );
}
