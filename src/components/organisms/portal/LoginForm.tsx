"use client";

import * as React from "react";
import { useActionState } from "react";
import { LogIn, Mail, Lock } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { loginAction, type ActionState } from "@/lib/portal/actions";

/** Missionary portal sign-in — accounts are created by the office, no self-signup. */
export function LoginForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(loginAction, {});

  return (
    <form action={formAction} className="rounded-lg border border-hair bg-card p-6 shadow-sm sm:p-8">
      <h2 className="mb-1.5 font-display text-lg font-semibold text-strong">Sign in</h2>
      <p className="mb-6 font-body text-sm leading-relaxed text-muted">
        For serving missionaries. Accounts are created by the office — if you need one, contact your
        field coordinator.
      </p>
      <FormField label="Email" required className="mb-4">
        <Input
          type="email"
          name="email"
          placeholder="you@wycliffeafrica.org"
          autoComplete="email"
          iconLeft={<Mail size={16} />}
          required
        />
      </FormField>
      <FormField label="Password" required className="mb-5" error={state.error}>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          autoComplete="current-password"
          iconLeft={<Lock size={16} />}
          required
        />
      </FormField>
      <Button type="submit" variant="primary" size="lg" disabled={pending} iconRight={<LogIn size={16} />} className="w-full">
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
