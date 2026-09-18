import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getPageSeo } from "@/lib/apis/content";

const OG_LOCALES: Record<Locale, string> = { ar: "ar_SA", en: "en_US" };
const DEFAULT_OG_IMAGE = "/images/package-bundle.png";

export function localizedPath(locale: Locale, href = "/") {
  return getPathname({ locale, href });
}

/** hreflang map for a path, including x-default pointing at the Arabic default. */
export function languageAlternates(href = "/") {
  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((locale) => [locale, localizedPath(locale, href)]),
  );
  languages["x-default"] = localizedPath(routing.defaultLocale, href);
  return languages;
}

/** Page metadata from the CMS SEO entry, falling back to bundled copy. */
export async function buildPageMetadata(page: string, locale: Locale): Promise<Metadata> {
  const [seo, t] = await Promise.all([getPageSeo(page, locale), getTranslations({ locale, namespace: "Metadata" })]);

  const title = seo?.title ?? t("title");
  const description = seo?.description ?? t("description");
  const image = seo?.ogImage || DEFAULT_OG_IMAGE;
  const canonical = localizedPath(locale);

  return {
    title: { absolute: title },
    description,
    keywords: seo?.keywords,
    alternates: { canonical, languages: languageAlternates() },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "WAJHA",
      locale: OG_LOCALES[locale],
      alternateLocale: routing.locales.filter((other) => other !== locale).map((other) => OG_LOCALES[other]),
      images: [{ url: image }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    robots: seo?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
