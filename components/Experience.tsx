import { ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { ProjectImage } from "./ProjectImage";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  const { experience } = site;
  return (
    <section id="experience" data-surface="dark" aria-labelledby="experience-heading" className="relative isolate overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div aria-hidden="true" className="drafting-grid absolute inset-0 -z-10" />
      <div className="shell">
        <SectionHeading id="experience-heading" tone="dark" index="02" eyebrow={experience.eyebrow} heading={experience.heading} intro={experience.intro} />

        <div className="mt-16 space-y-6 sm:mt-20 lg:space-y-8">
          {experience.panels.map((panel, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={panel.id}
                aria-labelledby={`exp-${panel.id}`}
                data-reveal
                className="grid overflow-hidden border border-white/10 bg-ink-2 lg:grid-cols-12"
              >
                {/* Replace with real project photo: site.experience.panels[n].image.src */}
                <ProjectImage
                  image={panel.image}
                  uid={`exp-${panel.id}`}
                  figure={String(i + 2).padStart(2, "0")}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className={cn("aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[30rem]", flip && "lg:order-2")}
                />

                <div className={cn("flex flex-col p-7 sm:p-10 lg:col-span-5 lg:p-12", flip && "lg:order-1")}>
                  <div className="flex items-center gap-4">
                    <span className="display text-outline text-[4.5rem] leading-none">{panel.index}</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
                  </div>
                  <h3 id={`exp-${panel.id}`} className="display mt-6 text-[clamp(2rem,3vw,2.6rem)] text-paper">
                    {panel.title}
                  </h3>
                  <p className="mt-5 leading-relaxed text-concrete-200">{panel.description}</p>

                  <div className="mt-auto grid gap-8 pt-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div>
                      <h4 className="eyebrow text-concrete">Scope focus</h4>
                      <ul className="mt-4 space-y-2.5">
                        {panel.scope.map((s) => (
                          <li key={s} className="flex gap-3 text-sm leading-snug text-paper/90">
                            <span aria-hidden="true" className="mt-[0.45rem] size-1.5 shrink-0 bg-rust-300" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="eyebrow text-concrete">Site considerations</h4>
                      <ul className="mt-4 space-y-2.5">
                        {panel.considerations.map((s) => (
                          <li key={s} className="flex gap-3 text-sm leading-snug text-paper/90">
                            <span aria-hidden="true" className="mt-[0.45rem] size-1.5 shrink-0 border border-steel-300" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div data-reveal className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-concrete-300">{experience.disclosure}</p>
          <a href="#contact" className="group inline-flex items-center gap-2 text-sm font-semibold text-paper underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-rust-300">
            Request project details
            <ArrowRight aria-hidden="true" className="size-4 text-rust-300 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
