"use client";

import { useId, useRef, useState } from "react";
import { ArrowRight, CircleAlert, CircleCheck, FileText, Phone, Upload, X } from "lucide-react";
import { site } from "@/data/site";
import {
  bidFieldOrder,
  emptyBidForm,
  todayLocalISO,
  validateBidForm,
  type BidFormErrors,
  type BidFormValues,
} from "@/lib/bid-form";
import { cn } from "@/lib/cn";
import { buttonClasses } from "@/lib/ui";

type Status = "idle" | "submitting" | "success" | "error";
type Field = keyof BidFormValues;

const LABELS: Record<Field, string> = {
  name: "Name",
  company: "Company / Organization",
  email: "Email",
  phone: "Phone",
  location: "Project location",
  projectType: "Project type",
  bidDueDate: "Bid due date",
  plansLink: "Plans / bid documents link",
  details: "Project details",
  preferredContact: "Preferred contact method",
};

const inputBase =
  "mt-2 block w-full rounded-[2px] border bg-white px-3.5 py-3 text-[0.9375rem] text-ink shadow-[inset_0_1px_2px_rgb(18_19_21/0.04)] outline-none transition-[border-color,box-shadow] placeholder:text-concrete focus:border-ink focus:shadow-[0_0_0_3px_rgb(191_74_22/0.18)]";

export function BidForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [values, setValues] = useState<BidFormValues>(emptyBidForm);
  const [errors, setErrors] = useState<BidFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [delivered, setDelivered] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const fid = (f: string) => `${uid}-${f}`;
  const validate = (v: BidFormValues) => validateBidForm(v, { projectTypes: site.contact.projectTypes, today: todayLocalISO() });

  const update = (field: Field, value: string) => {
    const next = { ...values, [field]: value } as BidFormValues;
    setValues(next);
    // Re-validate live once a field has been visited, so errors clear as soon as they're fixed.
    if (touched[field] || (field === "preferredContact" && touched.phone)) setErrors(validate(next));
  };

  const blur = (field: Field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const shownError = (field: Field) => (touched[field] ? errors[field] : undefined);

  const addFiles = (list: FileList | null) => {
    if (!list?.length) return;
    setFiles((prev) => {
      const names = new Set(prev.map((f) => f.name + f.size));
      return [...prev, ...Array.from(list).filter((f) => !names.has(f.name + f.size))];
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched(Object.fromEntries(bidFieldOrder.map((f) => [f, true])));

    const firstInvalid = bidFieldOrder.find((f) => nextErrors[f]);
    if (firstInvalid) {
      setShowSummary(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setShowSummary(false);

    const honeypot = (form.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";

    setStatus("submitting");
    try {
      const res = await fetch("/api/bid-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot, attachmentNames: files.map((f) => f.name) }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; delivered?: boolean; errors?: BidFormErrors } | null;
      if (res.status === 422 && data?.errors) {
        setErrors(data.errors);
        setShowSummary(true);
        setStatus("idle");
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }
      if (!res.ok || !data?.ok) throw new Error("Request failed");
      setDelivered(Boolean(data.delivered));
      setStatus("success");
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(emptyBidForm);
    setErrors({});
    setTouched({});
    setFiles([]);
    setStatus("idle");
    setShowSummary(false);
  };

  if (status === "success") {
    const outcome = delivered ? site.contact.success : site.contact.preview;
    return (
      <div className="border border-ink/10 bg-chalk p-7 sm:p-10" role="status">
        {delivered ? (
          <CircleCheck aria-hidden="true" className="size-10 text-steel" strokeWidth={1.25} />
        ) : (
          <CircleAlert aria-hidden="true" className="size-10 text-rust" strokeWidth={1.25} />
        )}
        <h3 ref={successRef} tabIndex={-1} className="display mt-6 text-[2.5rem] outline-none">
          {outcome.heading}
        </h3>
        <p className="mt-4 max-w-lg leading-relaxed text-graphite">{outcome.body}</p>

        <dl className="mt-8 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-3">
          {[
            ["Location", values.location],
            ["Project type", values.projectType],
            ["Bid due", values.bidDueDate ? formatDate(values.bidDueDate) : "Not specified"],
          ].map(([k, v]) => (
            <div key={k} className="bg-chalk p-4">
              <dt className="eyebrow text-graphite">{k}</dt>
              <dd className="mt-1.5 text-sm font-medium text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={site.phone.href} className={buttonClasses("outline-light")}>
            <Phone aria-hidden="true" className="size-4 text-rust" />
            Call {site.phone.display}
          </a>
          <button type="button" onClick={reset} className={buttonClasses("outline-light")}>
            Submit another project
          </button>
        </div>
      </div>
    );
  }

  const errorList = bidFieldOrder.filter((f) => errors[f]);

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby={fid("required-note")} className="relative border border-ink/10 bg-chalk p-6 shadow-[0_30px_60px_-45px_rgb(18_19_21/0.5)] sm:p-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ink/10 pb-5">
        <p className="eyebrow text-ink">Project intake</p>
        <p id={fid("required-note")} className="text-xs text-graphite">
          Fields marked <span aria-hidden="true" className="text-rust">*</span>
          <span className="sr-only">with an asterisk</span> are required.
        </p>
      </div>

      {showSummary && errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mt-6 border-l-2 border-error bg-error/[0.05] px-4 py-4 outline-none">
          <p className="flex items-center gap-2 text-sm font-semibold text-error">
            <CircleAlert aria-hidden="true" className="size-4" />
            Please review {errorList.length === 1 ? "1 field" : `${errorList.length} fields`}
          </p>
          <ul className="mt-2 space-y-1 pl-6 text-sm">
            {errorList.map((f) => (
              <li key={f}>
                <a
                  href={`#${fid(f)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    focusField(fid(f));
                  }}
                  className="text-ink underline underline-offset-2 hover:text-error"
                >
                  {LABELS[f]}: {errors[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Honeypot: hidden from people and assistive tech, catches naive bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 grid gap-x-5 gap-y-6 sm:grid-cols-2">
        <TextField id={fid("name")} label={LABELS.name} required autoComplete="name" value={values.name} error={shownError("name")} onChange={(v) => update("name", v)} onBlur={() => blur("name")} />
        <TextField id={fid("company")} label={LABELS.company} required autoComplete="organization" value={values.company} error={shownError("company")} onChange={(v) => update("company", v)} onBlur={() => blur("company")} />
        <TextField id={fid("email")} label={LABELS.email} type="email" required autoComplete="email" inputMode="email" value={values.email} error={shownError("email")} onChange={(v) => update("email", v)} onBlur={() => blur("email")} />
        <TextField
          id={fid("phone")}
          label={LABELS.phone}
          type="tel"
          required={values.preferredContact === "phone"}
          autoComplete="tel"
          inputMode="tel"
          hint={values.preferredContact === "phone" ? undefined : "Optional"}
          value={values.phone}
          error={shownError("phone")}
          onChange={(v) => update("phone", v)}
          onBlur={() => blur("phone")}
        />
        <TextField
          id={fid("location")}
          label={LABELS.location}
          required
          placeholder="Address, neighborhood, or town"
          value={values.location}
          error={shownError("location")}
          onChange={(v) => update("location", v)}
          onBlur={() => blur("location")}
        />

        <div>
          <FieldLabel htmlFor={fid("projectType")} required>
            {LABELS.projectType}
          </FieldLabel>
          <div className="relative">
            <select
              id={fid("projectType")}
              value={values.projectType}
              onChange={(e) => update("projectType", e.target.value)}
              onBlur={() => blur("projectType")}
              aria-required="true"
              aria-invalid={Boolean(shownError("projectType"))}
              aria-describedby={shownError("projectType") ? `${fid("projectType")}-error` : undefined}
              className={cn(inputBase, "appearance-none pr-10", !values.projectType && "text-concrete", borderFor(shownError("projectType")))}
            >
              <option value="" disabled>
                Select a type
              </option>
              {site.contact.projectTypes.map((t) => (
                <option key={t} value={t} className="text-ink">
                  {t}
                </option>
              ))}
            </select>
            <svg aria-hidden="true" viewBox="0 0 12 8" className="pointer-events-none absolute right-4 top-1/2 mt-1 h-2 w-3 -translate-y-1/2 text-ink">
              <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <FieldError id={`${fid("projectType")}-error`} message={shownError("projectType")} />
        </div>

        <TextField
          id={fid("bidDueDate")}
          label={LABELS.bidDueDate}
          type="date"
          min={todayLocalISO()}
          hint="Optional"
          value={values.bidDueDate}
          error={shownError("bidDueDate")}
          onChange={(v) => update("bidDueDate", v)}
          onBlur={() => blur("bidDueDate")}
        />
        <TextField
          id={fid("plansLink")}
          label={LABELS.plansLink}
          type="url"
          inputMode="url"
          hint="Optional"
          placeholder="https:// Dropbox, Box, FTP, bid portal…"
          value={values.plansLink}
          error={shownError("plansLink")}
          onChange={(v) => update("plansLink", v)}
          onBlur={() => blur("plansLink")}
        />

        <div className="sm:col-span-2">
          <FieldLabel htmlFor={fid("details")} required>
            {LABELS.details}
          </FieldLabel>
          <textarea
            id={fid("details")}
            rows={6}
            value={values.details}
            onChange={(e) => update("details", e.target.value)}
            onBlur={() => blur("details")}
            aria-required="true"
            aria-invalid={Boolean(shownError("details"))}
            aria-describedby={cn(`${fid("details")}-hint`, shownError("details") && `${fid("details")}-error`) || undefined}
            placeholder="Scope or trade package, building type, schedule, pre-bid or walkthrough dates, and anything else useful for review."
            className={cn(inputBase, "resize-y leading-relaxed", borderFor(shownError("details")))}
          />
          <div className="mt-1.5 flex justify-between gap-4">
            <FieldError id={`${fid("details")}-error`} message={shownError("details")} />
            <p id={`${fid("details")}-hint`} className="ml-auto shrink-0 font-mono text-[0.6875rem] text-graphite">
              {values.details.length.toLocaleString()} / 5,000
            </p>
          </div>
        </div>

        {/* File upload — UI only. See README "Form delivery" to wire uploads to storage. */}
        <div className="sm:col-span-2">
          <p className="text-sm font-medium text-ink" id={fid("files-label")}>
            Drawings & specifications <span className="font-normal text-graphite">(optional)</span>
          </p>
          <label
            htmlFor={fid("files")}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              addFiles(e.dataTransfer.files);
            }}
            className={cn(
              "mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed px-6 py-8 text-center transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-rust",
              dragging ? "border-rust bg-rust/[0.04]" : "border-ink/25 bg-white hover:border-ink/50",
            )}
          >
            <Upload aria-hidden="true" className="size-5 text-steel" strokeWidth={1.5} />
            <span className="text-sm font-medium text-ink">
              Drop files here or <span className="text-rust underline underline-offset-2">browse</span>
            </span>
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-graphite">PDF · DWG · ZIP · Images</span>
            <input
              ref={fileInputRef}
              id={fid("files")}
              type="file"
              multiple
              accept=".pdf,.dwg,.dxf,.zip,.jpg,.jpeg,.png,.xlsx,.xls,.doc,.docx"
              aria-describedby={`${fid("files")}-note`}
              className="sr-only"
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </label>
          <p id={`${fid("files")}-note`} className="mt-2 text-xs leading-relaxed text-graphite">
            {site.contact.uploadNote}
          </p>
          {files.length > 0 && (
            <ul className="mt-3 divide-y divide-ink/10 border border-ink/10 bg-white" aria-label="Selected files">
              {files.map((f) => (
                <li key={f.name + f.size} className="flex items-center gap-3 px-3 py-2 text-sm">
                  <FileText aria-hidden="true" className="size-4 shrink-0 text-steel" />
                  <span className="min-w-0 flex-1 truncate">{f.name}</span>
                  <span className="shrink-0 font-mono text-[0.6875rem] text-graphite">{formatSize(f.size)}</span>
                  <button
                    type="button"
                    onClick={() => setFiles((prev) => prev.filter((p) => p !== f))}
                    className="grid size-7 place-items-center rounded-[2px] text-graphite hover:bg-ink/5 hover:text-ink"
                    aria-label={`Remove ${f.name}`}
                  >
                    <X aria-hidden="true" className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <fieldset className="sm:col-span-2" aria-describedby={shownError("preferredContact") ? `${fid("preferredContact")}-error` : undefined}>
          <legend className="text-sm font-medium text-ink">
            {LABELS.preferredContact} <span aria-hidden="true" className="text-rust">*</span>
          </legend>
          <div className="mt-2 grid grid-cols-2 gap-3" id={fid("preferredContact")}>
            {(["email", "phone"] as const).map((opt) => (
              <label
                key={opt}
                className={cn(
                  "flex cursor-pointer items-center gap-3 border bg-white px-4 py-3 text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-rust",
                  values.preferredContact === opt ? "border-ink text-ink" : "border-ink/20 text-graphite hover:border-ink/45",
                )}
              >
                <input
                  type="radio"
                  name={fid("contact")}
                  value={opt}
                  checked={values.preferredContact === opt}
                  onChange={() => update("preferredContact", opt)}
                  className="size-4 accent-[var(--color-rust)]"
                />
                {opt === "email" ? "Email" : "Phone"}
              </label>
            ))}
          </div>
          <FieldError id={`${fid("preferredContact")}-error`} message={shownError("preferredContact")} />
        </fieldset>
      </div>

      {status === "error" && (
        <div role="alert" className="mt-8 flex gap-3 border-l-2 border-error bg-error/[0.05] px-4 py-3 text-sm text-ink">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-error" />
          <p>
            The form could not be sent. Please try again, or call{" "}
            <a href={site.phone.href} className="font-semibold underline underline-offset-2">
              {site.phone.display}
            </a>
            .
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 border-t border-ink/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-graphite sm:max-w-xs">
          Prefer to talk it through? Call{" "}
          <a href={site.phone.href} className="font-semibold text-ink underline underline-offset-2">
            {site.phone.display}
          </a>
          .
        </p>
        <button type="submit" disabled={status === "submitting"} aria-busy={status === "submitting"} className={buttonClasses("primary", "lg", "w-full sm:w-auto")}>
          {status === "submitting" ? (
            <>
              <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Sending…
            </>
          ) : (
            <>
              {site.primaryCta.label}
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function focusField(id: string) {
  const el = document.getElementById(id);
  const target = el?.matches("input, select, textarea") ? el : el?.querySelector<HTMLElement>("input, select, textarea");
  target?.focus();
  target?.scrollIntoView({ block: "center", behavior: "smooth" });
}

function borderFor(error?: string) {
  return error ? "border-error focus:border-error" : "border-ink/20 hover:border-ink/40";
}

function FieldLabel({ htmlFor, required, hint, children }: { htmlFor: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="flex items-baseline justify-between gap-3 text-sm font-medium text-ink">
      <span>
        {children}
        {required && (
          <>
            {" "}
            <span aria-hidden="true" className="text-rust">
              *
            </span>
          </>
        )}
      </span>
      {hint && <span className="text-xs font-normal text-graphite">{hint}</span>}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-[0.8125rem] leading-snug text-error">
      <CircleAlert aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
      {message}
    </p>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  hint?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
  min?: string;
};

function TextField({ id, label, value, onChange, onBlur, error, hint, required, type = "text", autoComplete, inputMode, placeholder, min }: TextFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={id} required={required} hint={hint}>
        {label}
      </FieldLabel>
      <input
        id={id}
        type={type}
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-required={required || undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputBase, borderFor(error))}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
