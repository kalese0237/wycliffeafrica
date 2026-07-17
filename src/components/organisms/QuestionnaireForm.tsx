"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";

const textareaClasses =
  "w-full rounded-md border border-hair bg-card px-[14px] py-[10px] font-body text-base text-body outline-none transition-[border-color,box-shadow] duration-[130ms] placeholder:text-faint focus:border-spark focus:shadow-[0_0_0_3px_var(--color-spark-tint)]";

/** Preliminary interest questionnaire for prospective staff. */
export function QuestionnaireForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="rounded-lg border border-t-[3px] border-hair border-t-accent bg-card p-6 shadow-sm sm:p-8"
    >
      <div className="mb-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <FormField label="First name" required>
          <Input placeholder="First name" name="firstName" autoComplete="given-name" required />
        </FormField>
        <FormField label="Last name" required>
          <Input placeholder="Last name" name="lastName" autoComplete="family-name" required />
        </FormField>
        <FormField label="Email" required>
          <Input type="email" placeholder="you@email.com" name="email" autoComplete="email" required />
        </FormField>
        <FormField label="Phone">
          <Input type="tel" placeholder="+254 ..." name="phone" autoComplete="tel" />
        </FormField>
        <div className="sm:col-span-2">
          <FormField label="Country of residence" required>
            <Input placeholder="Country" name="country" autoComplete="country-name" required />
          </FormField>
        </div>
      </div>
      <FormField label="Your church & denomination" className="mb-4">
        <Input placeholder="Church name, denomination" name="church" />
      </FormField>
      <FormField
        label="What skills or training would you bring to Bible translation?"
        helper="Linguistics, teaching, finance, IT, aviation, administration — every calling has a place."
        className="mb-4"
      >
        <textarea name="skills" rows={4} className={textareaClasses} />
      </FormField>
      <FormField label="Tell us briefly why you're interested in serving" className="mb-6">
        <textarea name="motivation" rows={4} className={textareaClasses} />
      </FormField>
      <Button variant="accent" size="lg" iconRight={<Send size={16} />}>
        Submit questionnaire
      </Button>
    </form>
  );
}
