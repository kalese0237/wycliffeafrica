"use client";

import * as React from "react";
import { useActionState } from "react";
import {
  Newspaper,
  HandHeart,
  Send,
  ShieldAlert,
  CheckCircle2,
  ImagePlus,
  Plus,
  Minus,
  X,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { cn } from "@/lib/cn";
import { submitEntryAction, type ActionState } from "@/lib/portal/actions";
import type { UpdateType } from "@/lib/directus/schema";
import { SUBMISSION_LIMITS } from "@/lib/portal/validation";

const TYPES: { value: UpdateType; label: string; icon: React.ReactNode }[] = [
  { value: "update", label: "Field update", icon: <Newspaper size={15} /> },
  { value: "prayer", label: "Prayer request", icon: <HandHeart size={15} /> },
];

const INPUT_CLASS = "rounded-md border-[1.5px]";

function formatBytes(bytes: number) {
  return bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/**
 * Length readout for the two required fields. The limits are enforced by the
 * server and by `minLength`/`maxLength`, but without this the writer only
 * discovers them by being rejected — which, on a field connection, costs a
 * round trip.
 */
function Counter({ value, min, max }: { value: number; min?: number; max: number }) {
  const short = min !== undefined && value > 0 && value < min;
  const near = value > max * 0.9;
  return (
    <span
      className={cn(
        "font-ui text-xs tabular-nums",
        short || value > max ? "text-danger" : near ? "text-warning" : "text-faint",
      )}
    >
      {short ? `${min - value} more character${min - value === 1 ? "" : "s"} needed` : `${value} / ${max}`}
    </span>
  );
}

interface PickedFile {
  name: string;
  size: number;
  previewUrl: string;
}

/**
 * File input that answers the three questions the bare control cannot: did the
 * file attach, which one, and is it going to be rejected. Checking type and
 * size here means an oversized phone photo fails instantly instead of after a
 * full upload.
 */
function PhotoPicker({
  id,
  name,
  label,
  helper,
  onValidityChange,
}: {
  id: string;
  name: string;
  label: string;
  helper: string;
  onValidityChange: (name: string, ok: boolean) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [picked, setPicked] = React.useState<PickedFile | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // Revoke the object URL whenever the preview is replaced or torn down.
  React.useEffect(() => {
    return () => {
      if (picked) URL.revokeObjectURL(picked.previewUrl);
    };
  }, [picked]);

  const clear = React.useCallback(() => {
    if (inputRef.current) inputRef.current.value = "";
    setPicked(null);
    setError(null);
    onValidityChange(name, true);
  }, [name, onValidityChange]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return clear();

    if (!SUBMISSION_LIMITS.imageTypes.includes(file.type as (typeof SUBMISSION_LIMITS.imageTypes)[number])) {
      setPicked(null);
      setError("That file is not a JPG, PNG, or WebP. Choose a different photo.");
      onValidityChange(name, false);
      return;
    }
    if (file.size > SUBMISSION_LIMITS.imageMaxBytes) {
      setPicked(null);
      setError(
        `That photo is ${formatBytes(file.size)}. The limit is ${formatBytes(SUBMISSION_LIMITS.imageMaxBytes)} — try a smaller copy.`,
      );
      onValidityChange(name, false);
      return;
    }
    setError(null);
    setPicked({ name: file.name, size: file.size, previewUrl: URL.createObjectURL(file) });
    onValidityChange(name, true);
  }

  return (
    <FormField label={label} htmlFor={id} error={error ?? undefined} helper={helper} helperClassName="text-body">
      <div
        className={cn(
          "rounded-md border-[1.5px] border-dashed bg-sunk p-3 transition-colors duration-130",
          error ? "border-danger" : picked ? "border-primary/45" : "border-hair",
        )}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          name={name}
          accept={SUBMISSION_LIMITS.imageTypes.join(",")}
          onChange={handleChange}
          className={cn(
            "w-full font-ui text-sm text-body",
            "file:mr-3 file:inline-flex file:cursor-pointer file:rounded-md file:border file:border-primary file:bg-card file:px-4 file:py-2 file:font-semibold file:text-primary hover:file:bg-primary-tint",
            picked && "sr-only",
          )}
        />
        {picked && (
          <div className="flex items-center gap-3">
            {/* Local object URL, so next/image would add nothing here. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={picked.previewUrl}
              alt=""
              className="h-14 w-14 flex-none rounded-sm border border-hair object-cover"
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate font-ui text-sm font-semibold text-strong">{picked.name}</span>
              <span className="font-ui text-xs tabular-nums text-faint">{formatBytes(picked.size)} · ready</span>
            </span>
            <button
              type="button"
              onClick={clear}
              className="inline-flex flex-none items-center gap-1 rounded-sm px-2 py-1 font-ui text-xs font-semibold text-body transition-colors hover:bg-card hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)"
            >
              <X size={13} /> Remove
            </button>
          </div>
        )}
      </div>
    </FormField>
  );
}

/** Portal submission form — updates and prayer requests land as drafts for office review. */
export function SubmissionForm({
  initialType = "update",
  richFieldsSupported = false,
}: {
  initialType?: UpdateType;
  richFieldsSupported?: boolean;
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(submitEntryAction, {});
  const [type, setType] = React.useState<UpdateType>(initialType);
  const [titleLength, setTitleLength] = React.useState(0);
  const [bodyLength, setBodyLength] = React.useState(0);
  // Open by default: the extras are discoverable rather than hidden behind a
  // click, and the toggle stays so the panel can be folded away once ignored.
  const [extrasOpen, setExtrasOpen] = React.useState(true);
  const [extrasFilled, setExtrasFilled] = React.useState(false);
  const [badFiles, setBadFiles] = React.useState<string[]>([]);
  const [resetKey, setResetKey] = React.useState(0);
  const [seenState, setSeenState] = React.useState(state);
  const formRef = React.useRef<HTMLFormElement>(null);
  const statusRef = React.useRef<HTMLDivElement>(null);

  const onValidityChange = React.useCallback((fieldName: string, ok: boolean) => {
    setBadFiles((prev) => (ok ? prev.filter((f) => f !== fieldName) : [...new Set([...prev, fieldName])]));
  }, []);

  // Clearing on success is a render-phase adjustment, not an effect: each action
  // result is a fresh object, so identity is a reliable "this is new" signal even
  // when two submissions return the same message. Bumping resetKey remounts the
  // photo pickers, which discards their previews without a reset handshake.
  if (state !== seenState) {
    setSeenState(state);
    if (state.success) {
      setTitleLength(0);
      setBodyLength(0);
      setExtrasOpen(true);
      setExtrasFilled(false);
      setBadFiles([]);
      setResetKey((k) => k + 1);
    }
  }

  React.useEffect(() => {
    if (state.success) formRef.current?.reset();
    // A rejected submission on a long form can land off-screen; bring it into view.
    if (state.error || state.success) {
      statusRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [state]);

  const showExtras = type === "update" && richFieldsSupported;
  const blocked = pending || badFiles.length > 0;

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-md border border-hair bg-card p-6 shadow-[0_18px_50px_-24px_rgba(60,35,10,.45)] sm:p-8"
    >
      <h2 className="mb-1.5 font-display text-xl font-semibold text-strong">Share from the field</h2>
      <p className="mb-6 font-body text-sm leading-relaxed text-body">
        Your submission is reviewed by the office before it appears on the website.
      </p>

      <FormField label="What are you sharing?" className="mb-5">
        <div
          className="inline-flex w-fit flex-wrap gap-1 rounded-md border border-hair bg-sunk p-1"
          role="radiogroup"
          aria-label="Submission type"
        >
          {TYPES.map((t) => (
            <label
              key={t.value}
              className={cn(
                "inline-flex cursor-pointer items-center gap-1.5 rounded-sm px-4 py-2 font-ui text-sm font-semibold transition-colors duration-130",
                type === t.value
                  ? "bg-primary text-white shadow-sm"
                  : "text-body hover:bg-card hover:text-strong",
              )}
            >
              <input
                type="radio"
                name="type"
                value={t.value}
                checked={type === t.value}
                onChange={() => setType(t.value)}
                className="sr-only"
              />
              {t.icon}
              {t.label}
            </label>
          ))}
        </div>
      </FormField>

      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor="submission-title" className="font-ui text-sm font-semibold text-body">
          Title <span className="text-primary">*</span>
        </label>
        <Counter value={titleLength} min={SUBMISSION_LIMITS.titleMin} max={SUBMISSION_LIMITS.titleMax} />
      </div>
      <Input
        id="submission-title"
        name="title"
        placeholder={type === "prayer" ? "Pray for…" : "What has happened?"}
        required
        minLength={SUBMISSION_LIMITS.titleMin}
        maxLength={SUBMISSION_LIMITS.titleMax}
        onChange={(e) => setTitleLength(e.target.value.length)}
        wrapperClassName={cn(INPUT_CLASS, "mb-5")}
      />

      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor="submission-body" className="font-ui text-sm font-semibold text-body">
          Message <span className="text-primary">*</span>
        </label>
        <Counter value={bodyLength} min={SUBMISSION_LIMITS.bodyMin} max={SUBMISSION_LIMITS.bodyMax} />
      </div>
      <textarea
        id="submission-body"
        name="body"
        rows={6}
        required
        minLength={SUBMISSION_LIMITS.bodyMin}
        maxLength={SUBMISSION_LIMITS.bodyMax}
        onChange={(e) => setBodyLength(e.target.value.length)}
        placeholder={
          type === "prayer"
            ? "Share what supporters should pray for."
            : "Share the news from your field of service."
        }
        className="mb-5 w-full rounded-md border-[1.5px] border-hair bg-card px-[14px] py-[10px] font-body text-base text-body outline-none transition-[border-color,box-shadow] duration-130 placeholder:text-faint focus:border-primary focus:shadow-[0_0_0_3px_var(--color-primary-tint)]"
      />

      {/* A photo alone is common; the editorial extras are rarer. Folding them
          away keeps the form at two visible fields for the usual submission,
          while the panel stays mounted so nothing typed is ever discarded. */}
      {type === "update" && (
        <div className="mb-5 rounded-md border border-hair bg-sunk/60">
          <button
            type="button"
            onClick={() => setExtrasOpen((o) => !o)}
            aria-expanded={extrasOpen}
            aria-controls="submission-extras"
            className="flex w-full items-center gap-2.5 rounded-md px-4 py-3 text-left font-ui text-sm font-semibold text-body transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)"
          >
            <ImagePlus size={16} className="flex-none text-primary" />
            <span className="flex-1">
              {showExtras ? "Add a photo and story extras" : "Add a photo"}
              <span className="ml-2 font-normal text-faint">optional</span>
            </span>
            {extrasFilled && !extrasOpen && (
              <span className="rounded-pill bg-primary-tint px-2 py-0.5 font-ui text-xs font-bold text-primary">
                added
              </span>
            )}
            {extrasOpen ? (
              <Minus size={16} className="flex-none text-faint" />
            ) : (
              <Plus size={16} className="flex-none text-faint" />
            )}
          </button>

          <div
            id="submission-extras"
            hidden={!extrasOpen}
            onChange={() => setExtrasFilled(true)}
            className="flex flex-col gap-4 border-t border-hair px-4 py-4"
          >
            <PhotoPicker
              key={`image-${resetKey}`}
              id="submission-image"
              name="image"
              label="Photo"
              helper="JPG, PNG, or WebP, up to 5 MB. Shown at the top of your story."
              onValidityChange={onValidityChange}
            />

            {showExtras && (
              <>
                <FormField
                  label="Pull quote"
                  htmlFor="submission-pull-quote"
                  helper="One short line from your update, shown large between paragraphs."
                  helperClassName="text-body"
                >
                  <Input
                    id="submission-pull-quote"
                    name="pullQuote"
                    placeholder="&ldquo;I waited fifty years to read.&rdquo;"
                    maxLength={SUBMISSION_LIMITS.pullQuoteMax}
                    wrapperClassName={INPUT_CLASS}
                  />
                </FormField>

                <PhotoPicker
                  key={`inline-${resetKey}`}
                  id="submission-inline-image"
                  name="inlineImage"
                  label="Second photo"
                  helper="Appears inside the article body, below the pull quote."
                  onValidityChange={onValidityChange}
                />

                <FormField
                  label="Second photo caption"
                  htmlFor="submission-inline-caption"
                  helper="One line describing the second photo."
                  helperClassName="text-body"
                >
                  <Input
                    id="submission-inline-caption"
                    name="inlineImageCaption"
                    placeholder="Practising with printed Scripture portions."
                    maxLength={SUBMISSION_LIMITS.captionMax}
                    wrapperClassName={INPUT_CLASS}
                  />
                </FormField>
              </>
            )}
          </div>
        </div>
      )}

      {type === "prayer" && (
        <label className="mb-5 flex cursor-pointer items-start gap-3 rounded-md border border-hair bg-sunk p-4">
          <input type="checkbox" name="sensitive" className="mt-0.5 h-4 w-4 accent-(--color-primary)" />
          <span className="font-body text-sm leading-relaxed text-body">
            <span className="mb-0.5 flex items-center gap-1.5 font-ui text-sm font-semibold text-body">
              <ShieldAlert size={15} /> Security-sensitive
            </span>
            Publish this request without my name or exact location. Use this if you serve in a
            restricted or hostile area.
          </span>
        </label>
      )}

      <div ref={statusRef}>
        {state.error && (
          <p
            role="alert"
            className="mb-4 rounded-md border border-danger/30 bg-[#f7dcd9] px-4 py-3 font-body text-sm text-[#8f271f]"
          >
            {state.error}
          </p>
        )}
        {state.success && (
          <p
            role="status"
            className="mb-4 flex items-start gap-2 rounded-md border border-green-500/30 bg-green-100 px-4 py-3 font-body text-sm text-green-700"
          >
            <CheckCircle2 size={17} className="mt-0.5 flex-none" /> {state.success}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={blocked}
          iconRight={<Send size={16} />}
          className="rounded-md"
        >
          {pending ? "Submitting…" : "Submit for review"}
        </Button>
        {badFiles.length > 0 && (
          <span className="font-body text-sm text-danger">Fix the photo above before submitting.</span>
        )}
      </div>
    </form>
  );
}
