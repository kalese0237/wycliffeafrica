"use client";

import * as React from "react";
import { Check, Loader2, Send, TriangleAlert } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { TurnstileWidget } from "@/components/molecules/TurnstileWidget";
import { submitQuestionnaire, type SubmitResult } from "@/app/actions/submit";

const textareaClasses =
  "w-full rounded-md border border-hair bg-card px-[14px] py-[10px] font-body text-base text-body outline-none transition-[border-color,box-shadow] duration-130 placeholder:text-faint focus:border-spark focus:shadow-[0_0_0_3px_var(--color-spark-tint)]";

/** Preliminary interest questionnaire for prospective staff. */
export function QuestionnaireForm() {
  const [pending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<SubmitResult | null>(null);
  const turnstile = React.useRef<{ reset: () => void }>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setResult(null);
    startTransition(async () => {
      const outcome = await submitQuestionnaire(formData);
      setResult(outcome);
      if (!outcome.ok) turnstile.current?.reset();
    });
  }

  if (result?.ok) {
    return (
      <div role="status" className="reveal rounded-lg border border-hair bg-card p-6 shadow-sm sm:p-8">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent-tint text-green-700">
          <Check size={20} />
        </span>
        <h2 className="mb-2 mt-4 font-display text-lg font-semibold text-strong">Questionnaire received</h2>
        <p className="max-w-[52ch] font-body text-base leading-relaxed text-body">
          Thank you. Our membership team will read your answers and reply to the address you gave us.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg border border-t-[3px] border-hair border-t-accent bg-card p-6 shadow-sm sm:p-8"
    >
      <div className="mb-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <FormField label="First name" required>
          <Input placeholder="First name" name="firstName" autoComplete="given-name" required disabled={pending} />
        </FormField>
        <FormField label="Last name" required>
          <Input placeholder="Last name" name="lastName" autoComplete="family-name" required disabled={pending} />
        </FormField>
        <FormField label="Email" required>
          <Input type="email" placeholder="you@email.com" name="email" autoComplete="email" required disabled={pending} />
        </FormField>
        <FormField label="Phone">
          <Input type="tel" placeholder="+254 ..." name="phone" autoComplete="tel" disabled={pending} />
        </FormField>
        <div className="sm:col-span-2">
          <FormField label="Country of residence" required>
            <Input placeholder="Country" name="country" autoComplete="country-name" required disabled={pending} />
          </FormField>
        </div>
      </div>
      <FormField label="Your church & denomination" className="mb-4">
        <Input placeholder="Church name, denomination" name="church" disabled={pending} />
      </FormField>
      <FormField
        label="What skills or training would you bring to Bible translation?"
        helper="Linguistics, teaching, finance, IT, aviation, administration. The work needs them all."
        className="mb-4"
      >
        <textarea name="skills" rows={4} disabled={pending} className={textareaClasses} />
      </FormField>
      <FormField label="Tell us briefly why you're interested in serving" className="mb-6">
        <textarea name="motivation" rows={4} disabled={pending} className={textareaClasses} />
      </FormField>
      <TurnstileWidget ref={turnstile} />
      {result && !result.ok && (
        <p
          role="alert"
          className="mb-5 flex items-start gap-2.5 rounded-md border border-danger/30 bg-danger/5 px-4 py-3 font-body text-base leading-relaxed text-danger"
        >
          <TriangleAlert size={17} className="mt-0.5 flex-none" />
          {result.error}
        </p>
      )}
      <Button
        type="submit"
        variant="accent"
        size="lg"
        disabled={pending}
        iconRight={
          pending ? <Loader2 size={16} className="animate-spin motion-reduce:animate-none" /> : <Send size={16} />
        }
      >
        {pending ? "Sending" : "Submit questionnaire"}
      </Button>
    </form>
  );
}
