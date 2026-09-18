import "server-only";

import type { Locale } from "@/i18n/routing";
import type {
  Faq,
  PageSeo,
  PortfolioItem,
  PricingPackage,
  Section,
  SectionKey,
  Service,
  SiteSettings,
  Testimonial,
} from "@/lib/types/content";
import { apiGet, orNull } from "./client";

export const getSection = (key: SectionKey, locale: Locale) =>
  orNull(apiGet<Section>(`sections/${key}`, locale, ["sections", `section:${key}`]));

export const getServices = (locale: Locale) =>
  orNull(apiGet<Service[]>("services", locale, ["services"]));

export const getPricingPackages = (locale: Locale) =>
  orNull(apiGet<PricingPackage[]>("pricing", locale, ["pricing"]));

export const getPortfolio = (locale: Locale) =>
  orNull(apiGet<PortfolioItem[]>("portfolio", locale, ["portfolio"]));

export const getTestimonials = (locale: Locale) =>
  orNull(apiGet<Testimonial[]>("testimonials", locale, ["testimonials"]));

export const getFaqs = (locale: Locale) => orNull(apiGet<Faq[]>("faq", locale, ["faq"]));

export const getSettings = (locale: Locale) =>
  orNull(apiGet<SiteSettings>("settings", locale, ["settings"]));

export const getPageSeo = (page: string, locale: Locale) =>
  orNull(apiGet<PageSeo>(`seo/${page}`, locale, ["seo", `seo:${page}`]));
