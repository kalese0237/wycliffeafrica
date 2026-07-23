import * as React from "react";
import { Smartphone } from "lucide-react";

const STEPS: [string, string?][] = [
  ["Enter Business Number", "400200"],
  ["Enter Account Number", "01128164144900"],
  ["Enter the amount you want to deposit"],
  ["Enter your M-Pesa PIN and confirm the transaction"],
  ["You will receive a confirmation SMS from M-Pesa"],
  ["You will receive deposit details from Co-operative Bank"],
];

/** Give-via-M-Pesa Paybill instructions. */
export function MpesaPanel() {
  return (
    <div className="rounded-lg border border-t-[3px] border-hair border-t-accent bg-card p-6 sm:p-8">
      <div className="mb-5 flex items-center gap-2.5">
        <Smartphone size={22} className="text-green-700" />
        <h3 className="font-display text-lg font-semibold text-strong">Give via M-Pesa Paybill</h3>
      </div>
      <p className="mb-3.5 font-body text-sm text-muted">Go to Lipa na M-Pesa, Paybill option:</p>
      <div className="flex flex-col gap-2.5">
        {STEPS.map(([label, value], i) => (
          <div key={label} className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full bg-green-100 font-ui text-sm font-bold text-green-700">
              {i + 1}
            </span>
            <span className="font-body text-base leading-relaxed text-body">
              {label}
              {value && (
                <>
                  : <b className="font-mono font-semibold">{value}</b>
                </>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
