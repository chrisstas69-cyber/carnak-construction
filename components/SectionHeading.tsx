import { cn } from "@/lib/cn";

type Props = {
  id: string;
  index: string;
  eyebrow: string;
  heading: string;
  intro?: string;
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({ id, index, eyebrow, heading, intro, tone = "light", className }: Props) {
  const dark = tone === "dark";
  return (
    <div className={cn("grid gap-8 lg:grid-cols-12 lg:gap-8", className)}>
      <div className="lg:col-span-7" data-reveal>
        <p className={cn("eyebrow flex items-center gap-3", dark ? "text-concrete-300" : "text-graphite")}>
          <span className={dark ? "text-rust-300" : "text-rust"}>{index}</span>
          <span aria-hidden="true" className={cn("h-px w-8", dark ? "bg-white/25" : "bg-ink/25")} />
          {eyebrow}
        </p>
        <h2 id={id} className={cn("display mt-5 text-[clamp(2.4rem,5vw,4.5rem)]", dark ? "text-paper" : "text-ink")}>
          {heading}
        </h2>
      </div>
      {intro && (
        <p
          data-reveal
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          className={cn(
            "self-end text-[1.0625rem] leading-relaxed lg:col-span-5 lg:pb-2",
            dark ? "text-concrete-200" : "text-graphite",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
