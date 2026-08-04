"use client";

import * as React from "react";
import Link from "next/link";
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
    <form action={formAction}>
      <p className="mb-2 font-ui text-xs font-bold uppercase tracking-caps-loose text-[#C9761A]">
        Missionary sign-in
      </p>
      <h2 className="font-display text-2xl font-semibold leading-tight text-strong">Welcome back</h2>
      <p className="mb-8 mt-2 font-body text-base leading-relaxed text-body">
        Sign in to post from your station.
      </p>
      <FormField label="Email" required className="mb-4">
        <Input
          type="email"
          name="email"
          placeholder="you@wycliffeafrica.org"
          autoComplete="email"
          iconLeft={<Mail size={16} />}
          size="lg"
          wrapperClassName="rounded-md border-[1.5px]"
          required
        />
      </FormField>
      <FormField label="Password" required className="mb-3" error={state.error}>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          autoComplete="current-password"
          iconLeft={<Lock size={16} />}
          size="lg"
          wrapperClassName="rounded-md border-[1.5px]"
          required
        />
      </FormField>
      <div className="mb-6 flex justify-end">
        <Link href="/portal/forgot-password" className="font-ui text-sm font-semibold text-primary hover:underline">
          Forgot your password?
        </Link>
      </div>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={pending}
        iconRight={<LogIn size={16} />}
        className="w-full rounded-md"
      >
        {pending ? "Signing in…" : "Sign in"}
      </Button>
      <p className="mt-6 rounded-md border border-dashed border-hair bg-sunk px-4 py-3 font-ui text-sm leading-relaxed text-body">
        Accounts are created by the office. Contact your field coordinator if you need access.
      </p>
    </form>
  );
}
