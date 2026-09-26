import { cn } from "./cn";

type ButtonVariant = "primary" | "outline-dark" | "outline-light";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-[2px] font-sans text-[0.9375rem] font-semibold tracking-[-0.005em] transition-[background-color,border-color,color,box-shadow] duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-rust text-white shadow-[inset_0_-2px_0_rgb(0_0_0/0.18)] hover:bg-rust-600",
  "outline-dark": "border border-white/25 text-paper hover:border-white/60 hover:bg-white/5",
  "outline-light": "border border-ink/20 text-ink hover:border-ink/60 hover:bg-ink/[0.03]",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: "md" | "lg" = "lg", extra?: string) {
  return cn(base, variants[variant], size === "lg" ? "h-13 px-6" : "h-10 px-4 text-sm", extra);
}
