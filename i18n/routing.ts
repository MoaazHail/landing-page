import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  // Arabic lives at `/`, English at `/en`.
  localePrefix: "as-needed",
  // The URL alone decides the language (Arabic-first, crawler-stable URLs).
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

export const localeDirection: Record<Locale, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr",
};
