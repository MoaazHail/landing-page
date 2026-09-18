import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import {
  getFaqs,
  getPortfolio,
  getPricingPackages,
  getSection,
  getServices,
  getSettings,
  getTestimonials,
} from "@/lib/apis/content";
import { SECTION_IDS } from "@/lib/constants/site";
import { CtaSection } from "../components/cta-section";
import { FaqSection } from "../components/faq-section";
import { HeroSection } from "../components/hero-section";
import { PortfolioSection } from "../components/portfolio-section";
import { PricingSection } from "../components/pricing-section";
import { ProcessSection } from "../components/process-section";
import { ServicesSection } from "../components/services-section";
import { TestimonialsSection } from "../components/testimonials-section";
import { WhySection } from "../components/why-section";
import { BackToTop } from "../layout/back-to-top";
import { SiteFooter } from "../layout/site-footer";
import { SiteHeader } from "../layout/site-header";

interface BlockProps {
  locale: Locale;
  whatsappUrl: string;
}

/*
 * Each block fetches its own content and renders nothing when the CMS has no
 * data or fails, so one broken section never takes the page down. There are no
 * per-section Suspense boundaries on purpose: the page is statically generated
 * (ISR), so they would never show and would only move content out of document
 * order in the prerendered HTML.
 */

async function WhyBlock({ locale }: BlockProps) {
  const section = await getSection("why", locale);
  return section?.items.length ? <WhySection section={section} /> : null;
}

async function PricingBlock({ locale, whatsappUrl }: BlockProps) {
  const [section, packages, servicesSection, services] = await Promise.all([
    getSection("pricing", locale),
    getPricingPackages(locale),
    getSection("services", locale),
    getServices(locale),
  ]);

  return (
    <>
      {section && packages?.length ? (
        <PricingSection section={section} packages={packages} whatsappUrl={whatsappUrl} />
      ) : null}
      {servicesSection && services?.length ? (
        <ServicesSection section={servicesSection} services={services} whatsappUrl={whatsappUrl} />
      ) : null}
    </>
  );
}

async function ProcessBlock({ locale }: BlockProps) {
  const section = await getSection("process", locale);
  return section?.items.length ? <ProcessSection section={section} /> : null;
}

async function FaqBlock({ locale, whatsappUrl }: BlockProps) {
  const [section, faqs] = await Promise.all([getSection("faq", locale), getFaqs(locale)]);
  return section && faqs?.length ? <FaqSection section={section} faqs={faqs} whatsappUrl={whatsappUrl} /> : null;
}

async function PortfolioBlock({ locale }: BlockProps) {
  const [section, items] = await Promise.all([getSection("portfolio", locale), getPortfolio(locale)]);
  return section && items?.length ? <PortfolioSection section={section} items={items} /> : null;
}

async function TestimonialsBlock({ locale }: BlockProps) {
  const [section, testimonials] = await Promise.all([getSection("testimonials", locale), getTestimonials(locale)]);
  return section && testimonials?.length ? <TestimonialsSection section={section} testimonials={testimonials} /> : null;
}

async function CtaBlock({ locale, whatsappUrl }: BlockProps) {
  const section = await getSection("cta", locale);
  return section ? <CtaSection section={section} whatsappUrl={whatsappUrl} /> : null;
}

export async function LandingPage({ locale }: { locale: Locale }) {
  const [hero, settings, t] = await Promise.all([
    getSection("hero", locale),
    getSettings(locale),
    getTranslations("Nav"),
  ]);
  // Without settings, contact CTAs fall back to the on-page contact band.
  const whatsappUrl = settings?.whatsappUrl || `#${SECTION_IDS.contact}`;
  const block = { locale, whatsappUrl };

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-btn bg-white px-4 py-2 font-medium text-primary focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {t("skipToContent")}
      </a>
      <SiteHeader whatsappUrl={whatsappUrl} />

      <main id="main" className="overflow-x-clip">
        <HeroSection hero={hero} whatsappUrl={whatsappUrl} />
        <WhyBlock {...block} />
        <PricingBlock {...block} />
        <ProcessBlock {...block} />
        <FaqBlock {...block} />
        <PortfolioBlock {...block} />
        <TestimonialsBlock {...block} />
        <CtaBlock {...block} />
      </main>

      <SiteFooter settings={settings} />
      <BackToTop />
    </>
  );
}
