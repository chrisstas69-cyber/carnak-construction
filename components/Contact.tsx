import { Check, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { BidForm } from "./BidForm";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  const { contact } = site;
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative bg-bone py-24 sm:py-32">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading id="contact-heading" index="06" eyebrow={contact.eyebrow} heading={contact.heading} className="lg:[&>div]:col-span-12" />
          <p data-reveal className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-graphite">
            {contact.intro}
          </p>

          <a
            href={site.phone.href}
            data-reveal
            className="group mt-10 flex items-center gap-5 border border-ink bg-ink p-6 text-paper transition-colors hover:bg-ink-3"
          >
            <span className="grid size-12 shrink-0 place-items-center bg-rust text-white">
              <Phone aria-hidden="true" className="size-5" />
            </span>
            <span>
              <span className="eyebrow block text-concrete-300">Call the office</span>
              <span className="mt-1 block font-display text-[2rem] font-semibold leading-none tracking-wide sm:text-[2.4rem]">
                {site.phone.display}
              </span>
            </span>
          </a>

          <div data-reveal className="mt-10">
            <h3 className="eyebrow text-ink">{contact.checklistTitle}</h3>
            <ul className="mt-4 space-y-3">
              {contact.checklist.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem] leading-snug text-graphite">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-rust" strokeWidth={2.25} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <address data-reveal className="mt-10 space-y-3 border-t border-ink/15 pt-6 text-[0.9375rem] not-italic text-graphite">
            <p className="flex items-center gap-3">
              <MapPin aria-hidden="true" className="size-4 text-steel" />
              {site.location.streetAddress ? `${site.location.streetAddress}, ` : ""}
              {site.location.city}, {site.location.region} {site.location.postalCode ?? ""}
            </p>
            {site.email && (
              <p className="flex items-center gap-3">
                <Mail aria-hidden="true" className="size-4 text-steel" />
                <a href={`mailto:${site.email}`} className="underline decoration-ink/30 underline-offset-4 hover:text-ink">
                  {site.email}
                </a>
              </p>
            )}
            <p className="font-mono text-xs uppercase tracking-[0.12em]">Serving {site.serviceArea.join(" & ")}</p>
          </address>
        </div>

        <div className="lg:col-span-7" data-reveal>
          <BidForm />
        </div>
      </div>
    </section>
  );
}
