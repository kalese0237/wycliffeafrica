"use client";

import * as React from "react";
import { useActionState } from "react";
import { LogIn, Mail, Lock } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { loginAction, type ActionState } from "@/lib/portal/actions";
import { passwordResetMailto } from "@/lib/portal/contact";

/** Missionary portal sign-in — accounts are created by the office, no self-signup. */
export function LoginForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(loginAction, {});
  // Tracked only so the reset mailto can carry the address; the input itself
  // stays uncontrolled so React's post-action form reset keeps working.
  const [email, setEmail] = React.useState("");
  const [seenState, setSeenState] = React.useState(state);
  if (state !== seenState) {
    setSeenState(state);
    if (state.email !== undefined) setEmail(state.email);
  }

  return (
    <form action={formAction}>
      {/* The page's h1: the marketing panel that used to carry it is hidden
          below `lg`, which left tablet and mobile with no h1 at all. */}
      <h1 className="font-display text-2xl font-semibold leading-tight text-strong">Welcome back</h1>
      <p className="mt-2 font-body text-base leading-relaxed text-body">
        Sign in to post from your station.
      </p>

      {/* Form-level, not pinned to the password field: a rejected sign-in does
          not tell us which of the two credentials was wrong, and reporting it
          under "Password" asserts something the server never said. */}
      {state.error && (
        <p
          role="alert"
          className="mt-6 rounded-md border border-danger/30 bg-[#f7dcd9] px-4 py-3 font-body text-sm text-[#8f271f]"
        >
          {state.error}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-5">
        <FormField label="Email" htmlFor="portal-email" required>
          <Input
            id="portal-email"
            type="email"
            name="email"
            defaultValue={state.email ?? ""}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@wycliffeafrica.org"
            autoComplete="email"
            iconLeft={<Mail size={16} />}
            size="lg"
            wrapperClassName="rounded-md border-[1.5px]"
            invalid={Boolean(state.error)}
            required
          />
        </FormField>

        {/* Recovery belongs to the password, so it sits tight beneath it rather
            than floating in its own band midway to the submit button. */}
        <div>
          <FormField label="Password" htmlFor="portal-password" required>
            <Input
              id="portal-password"
              type="password"
              name="password"
              placeholder="Your password"
              autoComplete="current-password"
              iconLeft={<Lock size={16} />}
              size="lg"
              wrapperClassName="rounded-md border-[1.5px]"
              invalid={Boolean(state.error)}
              required
            />
          </FormField>
          {/* Opens the mail client rather than a reset page: the office resets
              portal passwords by hand, so the request goes straight to them
              carrying the account address already typed above. */}
          <a
            href={passwordResetMailto(email)}
            className="mt-2 inline-flex items-center gap-1.5 font-ui text-sm font-semibold text-primary hover:underline"
          >
            <Mail size={14} />
            Forgot your password? Email the office
          </a>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={pending}
        iconRight={<LogIn size={16} />}
        className="mt-8 w-full rounded-md"
      >
        {pending ? "Signing in…" : "Sign in"}
      </Button>

      {/* A hairline rule, not a dashed box: dashed borders read as a drop target
          or an empty slot, and this is a standing note. */}
      <p className="mt-6 border-t border-hair pt-4 font-body text-sm leading-relaxed text-muted">
        Accounts are created by the office. Contact your field coordinator if you need access.
      </p>
    </form>
  );
}
