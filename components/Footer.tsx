import { ArrowUpRight, Phone } from "lucide-react";
import { site } from "@/data/site";
import { buttonClasses } from "@/lib/ui";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-surface="dark" className="relative isolate overflow-hidden bg-ink text-paper">
      <div className="shell pb-10 pt-20 sm:pt-24">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <a href="#top" aria-label={`${site.legalName} — back to top`} className="inline-block">
              <Wordmark size="xl" />
            </a>
            <p className="mt-8 max-w-md leading-relaxed text-concrete-300">{site.footer.summary}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={site.primaryCta.href} className={buttonClasses("primary")}>
                {site.primaryCta.label}
              </a>
              <a href={site.phone.href} className={buttonClasses("outline-dark")}>
                <Phone aria-hidden="true" className="size-4 text-rust-300" />
                {site.phone.display}
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
            <div>
              <h2 className="eyebrow text-concrete">Company</h2>
              <address className="mt-5 space-y-2 text-[0.9375rem] not-italic leading-relaxed text-concrete-200">
                <p className="text-paper">{site.legalName}</p>
                {site.location.streetAddress && <p>{site.location.streetAddress}</p>}
                <p>
                  {site.location.city}, {site.location.region} {site.location.postalCode ?? ""}
                </p>
                <p>
                  <a href={site.phone.href} className="hover:text-paper">
                    {site.phone.display}
                  </a>
                </p>
                {site.email && (
                  <p>
                    <a href={`mailto:${site.email}`} className="hover:text-paper">
                      {site.email}
                    </a>
                  </p>
                )}
                <p className="pt-2 font-mono text-xs uppercase tracking-[0.12em] text-concrete">Serving {site.serviceAreaShort}</p>
              </address>
            </div>
            <nav aria-label="Footer">
              <h2 className="eyebrow text-concrete">Sections</h2>
              <ul className="mt-5 space-y-2 text-[0.9375rem]">
                {[{ label: "Process", href: "#process" }, ...site.nav].map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="group inline-flex items-center gap-1.5 text-concrete-200 transition-colors hover:text-paper">
                      {item.label}
                      <ArrowUpRight aria-hidden="true" className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-xs text-concrete sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName} All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {site.credentials.show && <p>{site.credentials.statement}</p>}
            {site.privacyPolicyUrl && (
              <a href={site.privacyPolicyUrl} className="hover:text-paper">
                Privacy Policy
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
