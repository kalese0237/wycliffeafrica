"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";

/** Contact form — name/email/message. Submission handling comes with the backend pass. */
export function ContactForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="rounded-lg border border-hair bg-card p-6 shadow-sm sm:p-8"
    >
      <h2 className="mb-6 font-display text-lg font-semibold text-strong">Send us a message</h2>
      <div className="mb-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <FormField label="Name" required>
          <Input placeholder="Your name" name="name" autoComplete="name" required />
        </FormField>
        <FormField label="Email" required>
          <Input type="email" placeholder="you@email.com" name="email" autoComplete="email" required />
        </FormField>
      </div>
      <FormField label="Message" required className="mb-5">
        <textarea
          name="message"
          rows={6}
          required
          placeholder="How can we help?"
          className="w-full rounded-md border border-hair bg-card px-[14px] py-[10px] font-body text-base text-body outline-none transition-[border-color,box-shadow] duration-[130ms] placeholder:text-faint focus:border-spark focus:shadow-[0_0_0_3px_var(--color-spark-tint)]"
        />
      </FormField>
      <Button variant="accent" size="lg" iconRight={<Send size={16} />}>
        Send message
      </Button>
    </form>
  );
}
