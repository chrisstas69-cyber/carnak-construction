import { Fragment } from "react";
import { site } from "@/data/site";
import { serviceIcons } from "./Icons";
import { MaterialSwatch } from "./MaterialSwatch";
import { SectionHeading } from "./SectionHeading";

export function Services() {
  const { services } = site;
  return (
    <section id="services" aria-labelledby="services-heading" className="relative bg-paper py-24 sm:py-32">
      <div className="shell">
        <SectionHeading id="services-heading" index="01" eyebrow={services.eyebrow} heading={services.heading} intro={services.intro} />

        <ul data-reveal className="mt-16 grid gap-px border border-ink/10 bg-ink/10 sm:mt-20 md:grid-cols-2 xl:grid-cols-3">
          {services.items.map((service, i) => {
            const Icon = serviceIcons[service.icon];
            return (
              <li
                key={service.id}
                className="group relative flex flex-col bg-paper transition-colors duration-300 hover:bg-chalk"
              >
                <div className="relative h-24 overflow-hidden border-b border-ink/10 sm:h-28">
                  <MaterialSwatch kind={service.material} uid={`svc-${service.id}`} />
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-rust transition-transform duration-500 ease-[var(--ease-build)] group-hover:scale-x-100" />
                  <span className="absolute bottom-3 right-3 bg-paper/90 px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink">
                    {service.division}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center border border-ink/15 bg-chalk text-ink">
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                    </span>
                    <span className="font-mono text-xs text-graphite">{String(i + 1).padStart(2, "0")} / {String(services.items.length).padStart(2, "0")}</span>
                  </div>

                  <h3 className="display mt-7 text-[2rem]">{service.title}</h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-graphite">{service.description}</p>

                  <div className="mt-auto pt-7">
                    <p className="border-t border-ink/10 pt-5 font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.1em] text-ink/80">
                      <span className="sr-only">Capabilities: </span>
                      {service.capabilities.map((c, k) => (
                        <Fragment key={c}>
                          {k > 0 && " "}
                          <span className="whitespace-nowrap">
                            {k > 0 && <span aria-hidden="true" className="pr-1.5 text-rust">/</span>}
                            {c}
                            {k < service.capabilities.length - 1 && <span className="sr-only">,</span>}
                          </span>
                        </Fragment>
                      ))}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-graphite">
          Division references follow CSI MasterFormat for estimating convenience.
        </p>
      </div>
    </section>
  );
}
