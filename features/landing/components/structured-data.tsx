import type { Locale } from "@/i18n/routing";
import { getFaqs, getPricingPackages, getServices, getSettings } from "@/lib/apis/content";
import { SITE_URL } from "@/lib/constants/site";

interface StructuredDataProps {
  locale: Locale;
  name: string;
  description: string;
  url: string;
}

/** schema.org JSON-LD built only from CMS data — nothing is asserted that the CMS doesn't hold. */
export async function StructuredData({ locale, name, description, url }: StructuredDataProps) {
  const [settings, faqs, packages, services] = await Promise.all([
    getSettings(locale),
    getFaqs(locale),
    getPricingPackages(locale),
    getServices(locale),
  ]);

  const offers = [
    ...(packages ?? []).map((pkg) => ({ name: pkg.title, description: pkg.description, price: pkg.price, currency: pkg.currency })),
    ...(services ?? [])
      .filter((service) => service.price != null)
      .map((service) => ({ name: service.title, description: service.description, price: service.price, currency: service.currency })),
  ];

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url,
      name,
      inLanguage: locale,
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#organization`,
      name,
      description,
      url,
      logo: `${SITE_URL}/icon.svg`,
      ...(settings?.email && { email: settings.email }),
      ...(settings?.phone && { telephone: settings.phone }),
      ...(settings?.address && { address: settings.address }),
      sameAs: settings?.socials.filter((social) => social.url).map((social) => social.url) ?? [],
      ...(offers.length > 0 && {
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name,
          itemListElement: offers.map((offer) => ({
            "@type": "Offer",
            price: offer.price,
            priceCurrency: offer.currency,
            itemOffered: { "@type": "Service", name: offer.name, description: offer.description },
          })),
        },
      }),
    },
  ];

  if (faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
