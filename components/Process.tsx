import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { SectionHeading } from "./SectionHeading";

export function Process() {
  const { process } = site;
  return (
    <section id="process" aria-labelledby="process-heading" className="relative isolate bg-paper py-24 sm:py-32">
      <div aria-hidden="true" className="drafting-grid-light absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)]" />
      <div className="shell">
        <SectionHeading id="process-heading" index="04" eyebrow={process.eyebrow} heading={process.heading} intro={process.intro} />

        <ol className="mt-16 grid gap-y-12 sm:mt-24 md:grid-cols-2 md:gap-x-10 xl:grid-cols-4 xl:gap-x-0">
          {process.steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
              className="relative pt-12 xl:pr-10"
            >
              {/* Dimension string: line with 45° ticks at each step boundary */}
              <span aria-hidden="true" className="absolute left-0 right-0 top-0 h-px bg-ink/30" />
              <span aria-hidden="true" className="absolute -top-2 left-0 h-4 w-px rotate-45 bg-ink" />
              <span
                aria-hidden="true"
                className={cn("absolute -top-2 right-0 h-4 w-px rotate-45 bg-ink", i < process.steps.length - 1 && "xl:hidden")}
              />
              <span aria-hidden="true" className="absolute -top-7 left-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-graphite">
                Phase {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex items-baseline gap-4">
                <span className="font-display text-[3.5rem] font-semibold leading-none text-rust">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display text-[2.25rem]">{step.title}</h3>
              </div>
              <p className="mt-5 max-w-sm leading-relaxed text-graphite">{step.description}</p>
              <p className="mt-6 inline-flex border border-ink/15 bg-chalk px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink/80">
                {step.deliverable}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
