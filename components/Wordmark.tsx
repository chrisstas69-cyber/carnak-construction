import { site } from "@/data/site";
import { cn } from "@/lib/cn";

export function Wordmark({ className, size = "md" }: { className?: string; size?: "md" | "xl" }) {
  return (
    <span className={cn("flex items-center", size === "xl" ? "gap-5" : "gap-3", className)}>
      <span
        className={cn(
          "font-display font-bold uppercase leading-none tracking-[0.16em]",
          size === "xl" ? "text-[clamp(2.75rem,9vw,8rem)] tracking-[0.12em]" : "text-[1.75rem]",
        )}
      >
        {site.wordmark}
      </span>
      <span aria-hidden="true" className={cn("w-px bg-current opacity-30", size === "xl" ? "h-12 sm:h-24" : "h-7")} />
      <span
        className={cn(
          "font-mono uppercase leading-[1.2] tracking-[0.18em] opacity-75",
          size === "xl" ? "text-[0.625rem] sm:text-sm" : "text-[0.625rem]",
        )}
      >
        {site.wordmarkSub.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </span>
    </span>
  );
}
