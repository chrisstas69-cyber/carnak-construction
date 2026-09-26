import { site } from "@/data/site";
import { marketIcons } from "./Icons";
import { SectionHeading } from "./SectionHeading";

export function Markets() {
  const { markets } = site;
  return (
    <section id="markets" aria-labelledby="markets-heading" className="relative bg-bone py-24 sm:py-32">
      <div className="shell">
        <SectionHeading id="markets-heading" index="03" eyebrow={markets.eyebrow} heading={markets.heading} intro={markets.intro} />

        <ul className="mt-16 grid gap-5 sm:mt-20 md:grid-cols-2 xl:grid-cols-4">
          {markets.items.map((market, i) => {
            const Icon = marketIcons[market.icon];
            return (
              <li
                key={market.id}
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                className="group relative flex flex-col border border-ink/10 bg-chalk p-7 shadow-[0_1px_0_rgb(18_19_21/0.04)] transition-[border-color,box-shadow] duration-300 hover:border-ink/25 hover:shadow-[0_18px_40px_-28px_rgb(18_19_21/0.45)] sm:p-8"
              >
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-ink transition-colors duration-300 group-hover:bg-rust" />
                <div className="flex items-center justify-between">
                  <Icon aria-hidden="true" className="size-7 text-steel" strokeWidth={1.25} />
                  <span className="font-mono text-xs text-graphite">M-{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="display mt-10 text-[1.75rem]">{market.title}</h3>
                <p className="mb-7 mt-4 text-[0.9375rem] leading-relaxed text-graphite">{market.description}</p>
                <ul className="mt-auto space-y-2 border-t border-ink/10 pt-5" aria-label={`${market.title} priorities`}>
                  {market.focus.map((f) => (
                    <li key={f} className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink/80">
                      <span aria-hidden="true" className="h-px w-3 bg-steel" />
                      {f}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
