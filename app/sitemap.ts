import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants/site";
import { languageAlternates, localizedPath } from "@/lib/services/seo";

const absolute = (path: string) => new URL(path, SITE_URL).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    Object.entries(languageAlternates()).map(([lang, path]) => [lang, absolute(path)]),
  );

  return routing.locales.map((locale) => ({
    url: absolute(localizedPath(locale)),
    changeFrequency: "weekly",
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: { languages },
  }));
}
