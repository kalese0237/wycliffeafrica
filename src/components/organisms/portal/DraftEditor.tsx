"use client";

import * as React from "react";
import { useActionState } from "react";
import { CheckCircle2, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { deleteEntryAction, updateEntryAction, type ActionState } from "@/lib/portal/actions";
import { SUBMISSION_LIMITS } from "@/lib/portal/validation";
import type { MySubmission } from "@/lib/portal/auth";

const TYPE_LABEL = { update: "Field update", prayer: "Prayer request" } as const;

export function DraftEditor({ submission }: { submission: MySubmission }) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(updateEntryAction, {});
  const type = submission.type;

  return (
    <details className="mt-3 border-t border-hair pt-3">
      <summary className="cursor-pointer font-ui text-sm font-semibold text-link">
        {submission.status === "rejected" ? "Revise and resubmit" : "Edit draft"}
      </summary>
      <form action={formAction} className="mt-4 space-y-4">
        <input type="hidden" name="id" value={submission.id} />
        <input type="hidden" name="type" value={type} />
        <FormField label="Type">
          <p className="font-body text-base text-muted">{TYPE_LABEL[type]}</p>
        </FormField>
        {type === "update" && (
          <FormField label="Replace photo" helper="Optional. JPG, PNG, or WebP; maximum 5 MB.">
            <input type="file" name="image" accept="image/jpeg,image/png,image/webp" className="w-full font-ui text-sm text-muted" />
          </FormField>
        )}
        <FormField label="Title" required>
          <Input
            name="title"
            defaultValue={submission.title}
            minLength={SUBMISSION_LIMITS.titleMin}
            maxLength={SUBMISSION_LIMITS.titleMax}
            required
          />
        </FormField>
        <FormField label="Message" required>
          <textarea
            name="body"
            defaultValue={submission.body}
            rows={6}
            minLength={SUBMISSION_LIMITS.bodyMin}
            maxLength={SUBMISSION_LIMITS.bodyMax}
            required
            className="w-full rounded-md border border-hair bg-card px-3 py-2 font-body text-base text-body outline-none focus:border-spark"
          />
        </FormField>
        {type === "prayer" && (
          <label className="flex items-center gap-2 font-body text-sm text-muted">
            <input
              type="checkbox"
              name="sensitive"
              defaultChecked={Boolean(submission.sensitive)}
            />
            Publish anonymously if this is a security-sensitive prayer request
          </label>
        )}
        {state.error && <p className="font-body text-sm text-danger">{state.error}</p>}
        {state.success && (
          <p className="flex items-center gap-1.5 font-body text-sm text-green-700">
            <CheckCircle2 size={15} /> {state.success}
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          <Button type="submit" size="sm" variant="primary" disabled={pending} iconLeft={<Save size={14} />}>
            {pending ? "Saving…" : submission.status === "rejected" ? "Resubmit for review" : "Save draft"}
          </Button>
          <Button
            type="submit"
            size="sm"
            variant="ghost"
            formAction={deleteEntryAction}
            iconLeft={<Trash2 size={14} />}
            onClick={(event) => {
              if (!window.confirm("Delete this draft permanently?")) event.preventDefault();
            }}
          >
            Delete draft
          </Button>
        </div>
      </form>
    </details>
  );
}
