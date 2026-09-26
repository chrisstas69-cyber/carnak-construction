import { site } from "@/data/site";

/** GeneralContractor schema built only from confirmed fields; null fields are omitted. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    url: site.url,
    telephone: site.phone.e164,
    ...(site.email ? { email: site.email } : {}),
    ...(site.established ? { foundingDate: String(site.established) } : {}),
    description: site.seo.description,
    image: `${site.url}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      ...(site.location.streetAddress ? { streetAddress: site.location.streetAddress } : {}),
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      ...(site.location.postalCode ? { postalCode: site.location.postalCode } : {}),
      addressCountry: site.location.country,
    },
    areaServed: site.serviceArea.map((name) => ({ "@type": "Place", name })),
    knowsAbout: site.services.items.map((s) => s.title),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
