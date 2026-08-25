"use client";

import * as React from "react";
import { Sprout, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { cn } from "@/lib/cn";

const AMOUNTS = [40, 80, 120, 250];

/** The donation panel: frequency toggle, amount grid, impact note, contact fields. */
export function GivingForm() {
  const [frequency, setFrequency] = React.useState<"monthly" | "once">("monthly");
  const [selectedPreset, setSelectedPreset] = React.useState<number | null>(120);
  const [customAmount, setCustomAmount] = React.useState("");
  const customInputRef = React.useRef<HTMLInputElement>(null);

  const isCustom = selectedPreset === null;
  const amount = isCustom ? Math.max(0, Number(customAmount) || 0) : selectedPreset;

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="rounded-lg border border-t-[3px] border-hair border-t-accent bg-card p-6 shadow-sm sm:p-8"
    >
      <div className="mb-6 flex w-fit rounded-md bg-sunk p-1">
        {(["monthly", "once"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFrequency(f)}
            className={cn(
              "rounded-sm px-6 py-2 font-ui text-sm font-semibold capitalize transition-colors",
              frequency === f ? "bg-primary text-on-primary" : "text-muted",
            )}
          >
            {f === "once" ? "One-time" : f}
          </button>
        ))}
      </div>

      <div className="mb-2.5 font-ui text-sm font-semibold text-body">Choose an amount</div>
      <div className="mb-4 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
        {AMOUNTS.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setSelectedPreset(a)}
            className={cn(
              "rounded-md border py-4 text-center font-ui text-xl font-semibold tabular-nums transition-colors",
              !isCustom && selectedPreset === a
                ? "border-primary bg-primary text-on-primary"
                : "border-hair bg-card text-body hover:bg-sunk",
            )}
          >
            ${a}
          </button>
        ))}
        {isCustom ? (
          <div className="relative col-span-2 sm:col-span-1">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center font-ui text-xl font-semibold text-primary">
              $
            </span>
            <input
              ref={customInputRef}
              type="number"
              inputMode="decimal"
              min={1}
              placeholder="0"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full rounded-md border border-primary bg-card py-4 pl-7 pr-2 text-center font-ui text-xl font-semibold tabular-nums text-body focus:outline-none"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              setSelectedPreset(null);
              requestAnimationFrame(() => customInputRef.current?.focus());
            }}
            className="col-span-2 rounded-md border border-hair bg-card py-4 text-center font-ui text-xl font-semibold text-body transition-colors hover:bg-sunk sm:col-span-1"
          >
            Custom
          </button>
        )}
      </div>

      {amount > 0 && (
        <div className="mb-5 flex items-center gap-2.5 rounded-md border border-green-200 bg-green-100 px-3.5 py-3">
          <Sprout size={20} className="flex-none text-green-700" />
          <span className="font-body text-sm text-green-700">
            ${amount}/{frequency === "monthly" ? "mo" : "gift"} supports about{" "}
            <b className="font-semibold">{Math.round(amount / 4)} hours</b> of translation and checking work.
          </span>
        </div>
      )}

      <div className="mb-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <FormField label="First name">
          <Input placeholder="First name" name="firstName" autoComplete="given-name" />
        </FormField>
        <FormField label="Last name">
          <Input placeholder="Last name" name="lastName" autoComplete="family-name" />
        </FormField>
        <div className="sm:col-span-2">
          <FormField label="Email">
            <Input type="email" placeholder="you@church.org" name="email" autoComplete="email" />
          </FormField>
        </div>
      </div>

      <Button
        variant="accent"
        size="lg"
        iconRight={<ArrowRight size={18} />}
        className="w-full justify-center"
        disabled={amount <= 0}
      >
        {amount > 0 ? `Give $${amount} ${frequency === "monthly" ? "monthly" : "once"}` : "Enter an amount"}
      </Button>
      <p className="mt-3 flex items-center justify-center gap-1.5 font-ui text-xs text-faint">
        <Lock size={13} /> Secure giving · receipt emailed
      </p>
    </form>
  );
}
