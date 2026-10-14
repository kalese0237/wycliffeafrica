"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Check, Loader2, Send, TriangleAlert } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { TurnstileWidget, type TurnstileHandle } from "@/components/molecules/TurnstileWidget";
import { submitContactMessage, type SubmitResult } from "@/app/actions/submit";
import { positionEnquiryMessage } from "@/lib/staff-positions";

/**
 * Contact form — name/email/message, posting to the `contact_messages` collection in Directus.
 *
 * Three states, all of them honest: the button says "Sending" while the request is in flight and is
 * disabled so the message cannot be sent twice; success replaces the form with an acknowledgement,
 * because leaving a filled-in form on screen invites a second send; failure keeps everything typed
 * and offers the office email, since the work of writing the message should never be lost.
 */
export function ContactForm() {
  const pathname = usePathname();
  const [pending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<SubmitResult | null>(null);
  const turnstile = React.useRef<TurnstileHandle>(null);
  const messageRef = React.useRef<HTMLTextAreaElement>(null);

  // Reached from a position on /careers: open the message by naming it. Read in an effect rather
  // than through useSearchParams so the contact page stays statically rendered.
  React.useEffect(() => {
    const opening = positionEnquiryMessage(new URLSearchParams(window.location.search).get("position"));
    const field = messageRef.current;
    if (opening && field && !field.value) field.value = opening;
  }, []);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("sourcePath", pathname);
    setResult(null);
    startTransition(async () => {
      const outcome = await submitContactMessage(formData);
      setResult(outcome);
      if (!outcome.ok) turnstile.current?.reset();
    });
  }

  if (result?.ok) {
    return (
      <div
        role="status"
        className="reveal rounded-lg border border-hair bg-card p-6 shadow-sm sm:p-8"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent-tint text-green-700">
          <Check size={20} />
        </span>
        <h2 className="mb-2 mt-4 font-display text-lg font-semibold text-strong">Message sent</h2>
        <p className="max-w-[52ch] font-body text-base leading-relaxed text-body">
          Thank you — it has reached the office in Nairobi. Someone will read it and reply to the
          address you gave us, usually within a few working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-hair bg-card p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 font-display text-lg font-semibold text-strong">Send us a message</h2>
      <div className="mb-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <FormField label="Name" required>
          <Input placeholder="Your name" name="name" autoComplete="name" required disabled={pending} />
        </FormField>
        <FormField label="Email" required>
          <Input
            type="email"
            placeholder="you@email.com"
            name="email"
            autoComplete="email"
            required
            disabled={pending}
          />
        </FormField>
      </div>
      <FormField label="Message" required className="mb-5">
        <textarea
          ref={messageRef}
          name="message"
          rows={6}
          required
          disabled={pending}
          placeholder="How can we help?"
          className="w-full rounded-md border border-hair bg-card px-[14px] py-[10px] font-body text-base text-body outline-none transition-[border-color,box-shadow] duration-130 placeholder:text-faint focus:border-spark focus:shadow-[0_0_0_3px_var(--color-spark-tint)] disabled:opacity-55"
        />
      </FormField>

      <TurnstileWidget ref={turnstile} className="mb-5" />
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
        {pending ? "Sending" : "Send message"}
      </Button>
    </form>
  );
}
