"use client";

import * as React from "react";
import Link from "next/link";
import { useActionState } from "react";
import { ArrowLeft, CheckCircle2, KeyRound, Mail } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import {
  requestPasswordResetAction,
  resetPasswordAction,
  type ActionState,
} from "@/lib/portal/actions";

function StatusMessage({ state }: { state: ActionState }) {
  if (state.error) return <p className="rounded-md bg-[#f7dcd9] p-3 font-body text-sm text-danger">{state.error}</p>;
  if (state.success) {
    return (
      <p className="flex items-start gap-2 rounded-md bg-green-100 p-3 font-body text-sm text-green-700">
        <CheckCircle2 size={17} className="mt-0.5 flex-none" /> {state.success}
      </p>
    );
  }
  return null;
}

export function RequestPasswordResetForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(requestPasswordResetAction, {});
  return (
    <form action={action} className="rounded-lg border border-hair bg-card p-6 shadow-sm sm:p-8">
      <h2 className="font-display text-lg font-semibold text-strong">Reset your password</h2>
      <p className="mb-6 mt-2 font-body text-sm leading-relaxed text-muted">
        Enter the email address connected to your missionary profile.
      </p>
      <FormField label="Email" required className="mb-5">
        <Input name="email" type="email" autoComplete="email" iconLeft={<Mail size={16} />} required />
      </FormField>
      <StatusMessage state={state} />
      <Button type="submit" className="mt-4 w-full" disabled={pending} iconLeft={<KeyRound size={16} />}>
        {pending ? "Sending…" : "Send reset link"}
      </Button>
      <Link href="/portal/login" className="mt-5 flex items-center justify-center gap-1.5 font-ui text-sm text-link">
        <ArrowLeft size={14} /> Back to sign in
      </Link>
    </form>
  );
}

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(resetPasswordAction, {});
  return (
    <form action={action} className="rounded-lg border border-hair bg-card p-6 shadow-sm sm:p-8">
      <input type="hidden" name="token" value={token} />
      <h2 className="font-display text-lg font-semibold text-strong">Choose a new password</h2>
      <p className="mb-6 mt-2 font-body text-sm leading-relaxed text-muted">
        Use at least 12 characters and avoid a password used on another site.
      </p>
      <FormField label="New password" required className="mb-4">
        <Input name="password" type="password" minLength={12} autoComplete="new-password" required />
      </FormField>
      <FormField label="Confirm password" required className="mb-5">
        <Input name="confirmation" type="password" minLength={12} autoComplete="new-password" required />
      </FormField>
      <StatusMessage state={state} />
      {state.success ? (
        <Button href="/portal/login" className="mt-4 w-full">Sign in</Button>
      ) : (
        <Button type="submit" className="mt-4 w-full" disabled={pending} iconLeft={<KeyRound size={16} />}>
          {pending ? "Updating…" : "Update password"}
        </Button>
      )}
    </form>
  );
}
