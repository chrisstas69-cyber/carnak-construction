import { site } from "@/data/site";
import { ProjectImage } from "./ProjectImage";
import { SectionHeading } from "./SectionHeading";

export function About() {
  const { about } = site;
  return (
    <section id="about" data-surface="dark" aria-labelledby="about-heading" className="relative isolate overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div aria-hidden="true" className="drafting-grid absolute inset-0 -z-10" />
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Cornerstone: stone placeholder (site.images.about) with an engraved date plate */}
        <div data-reveal className="relative lg:col-span-5">
          <ProjectImage
            image={site.images.about}
            uid="about"
            figure="05"
            sizes="(min-width: 1024px) 40vw, 100vw"
            captionPosition="top-left"
            className="aspect-[4/5] border border-white/10"
          />
          <div className="absolute inset-x-6 bottom-6 border border-black/15 bg-[#c7bfae] px-6 py-7 text-center shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_24px_50px_-20px_rgb(0_0_0/0.7)] sm:inset-x-10 sm:bottom-10">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.32em] text-[#4d463b] [text-shadow:0_1px_0_rgb(255_255_255/0.4)]">
              {site.legalName}
            </p>
            {site.established && (
              <>
                <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.3em] text-[#5f574a]">Established</p>
                <p className="font-display text-[clamp(4.5rem,9vw,7rem)] font-bold leading-[0.9] tracking-[0.04em] text-[#4d463b] [text-shadow:0_1px_0_rgb(255_255_255/0.45),0_-1px_0_rgb(0_0_0/0.15)]">
                  {site.established}
                </p>
              </>
            )}
            <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.3em] text-[#5f574a]">
              {site.location.city} · {site.location.regionName}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center lg:col-span-7 lg:pl-8">
          <SectionHeading id="about-heading" tone="dark" index="05" eyebrow={about.eyebrow} heading={about.heading} className="lg:[&>div]:col-span-12" />

          <div data-reveal className="mt-8 max-w-2xl space-y-5 text-[1.0625rem] leading-relaxed text-concrete-200">
            {about.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <dl data-reveal className="mt-12 border-t border-white/10">
            {about.facts.map((fact) => (
              <div key={fact.label} className="grid gap-1 border-b border-white/10 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="eyebrow pt-0.5 text-concrete">{fact.label}</dt>
                <dd className="text-paper">{fact.value}</dd>
              </div>
            ))}
            {site.credentials.show && (
              <div className="grid gap-1 border-b border-white/10 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="eyebrow pt-0.5 text-concrete">Credentials</dt>
                <dd className="text-paper">{site.credentials.statement}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </section>
  );
}
