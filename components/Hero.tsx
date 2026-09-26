import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/data/site";
import { buttonClasses } from "@/lib/ui";
import { CredibilityStrip } from "./CredibilityStrip";
import { ProjectImage } from "./ProjectImage";

export function Hero() {
  const { hero, images } = site;
  const hasEmphasis = hero.headline.endsWith(hero.headlineEmphasis);
  const lead = hasEmphasis ? hero.headline.slice(0, -hero.headlineEmphasis.length).trim() : hero.headline;

  return (
    <section id="top" data-surface="dark" aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-ink text-paper">
      <div aria-hidden="true" className="drafting-grid absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute inset-y-0 left-[58%] -z-10 hidden w-px bg-white/[0.06] lg:block" />

      <div className="shell grid gap-14 pb-16 pt-32 sm:pt-36 lg:min-h-[min(100svh,62rem)] lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-40">
        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="eyebrow flex items-center gap-3 text-concrete-300">
            <span aria-hidden="true" className="h-px w-10 bg-rust-300" />
            {hero.eyebrow}
          </p>

          <h1 id="hero-heading" className="display mt-7 text-[clamp(2.9rem,6.6vw,6.9rem)] text-paper">
            {lead}
            {hasEmphasis && <span className="block text-concrete">{hero.headlineEmphasis}</span>}
          </h1>

          <p className="mt-8 max-w-[38rem] text-[1.0625rem] leading-relaxed text-concrete-200 sm:text-lg">{hero.subheadline}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={site.primaryCta.href} className={buttonClasses("primary")}>
              {site.primaryCta.label}
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a href={site.phone.href} className={buttonClasses("outline-dark")}>
              <Phone aria-hidden="true" className="size-4 text-rust-300" />
              Call {site.phone.display}
            </a>
          </div>

          <ul className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-6 font-mono text-xs uppercase tracking-[0.12em] text-concrete-300">
            {hero.trustLine.map((item, i) => (
              <li key={item} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden="true" className="size-1 bg-rust-300" />}
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Hero composition — replace images via site.images.hero / heroDetail */}
        <div className="relative min-h-[24rem] sm:min-h-[34rem] lg:col-span-5 lg:-mr-12 lg:min-h-0">
          <div aria-hidden="true" className="absolute -top-8 left-10 right-0 hidden items-center gap-3 sm:flex lg:left-14">
            <span className="h-3 w-px rotate-45 bg-concrete" />
            <span className="h-px flex-1 bg-white/20" />
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-concrete">Elevation · Masonry</span>
            <span className="h-px flex-1 bg-white/20" />
            <span className="h-3 w-px rotate-45 bg-concrete" />
          </div>

          <ProjectImage
            image={images.hero}
            uid="hero-main"
            figure="01"
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            captionPosition="top-left"
            className="absolute bottom-14 left-10 right-0 top-0 border border-white/10 sm:left-14"
          />
          <div aria-hidden="true" className="pointer-events-none absolute bottom-14 left-10 right-0 top-1/2 bg-gradient-to-t from-ink/70 to-transparent sm:left-14" />

          <div className="absolute bottom-0 left-0 w-[52%] max-w-[18rem] bg-ink p-2 sm:w-[44%]">
            <ProjectImage image={images.heroDetail} uid="hero-detail" hideCaption sizes="(min-width: 1024px) 18rem, 50vw" className="aspect-[4/3]" />
            <p className="mt-2 hidden items-center justify-between font-mono sm:flex text-[0.625rem] uppercase tracking-[0.16em] text-concrete">
              <span>Detail 02</span>
              <span>Concrete · Div. 03</span>
            </p>
          </div>

          <span aria-hidden="true" className="absolute bottom-14 right-0 size-3 translate-y-1/2 bg-rust" />
        </div>
      </div>

      <CredibilityStrip />
    </section>
  );
}
