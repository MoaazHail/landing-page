import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { localeDirection, routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants/site";
import { fontVariables } from "@/lib/fonts";
import { MotionProvider } from "@/shared/providers/motion-provider";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export const viewport: Viewport = {
  themeColor: "#0d56f2",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={localeDirection[locale]} className={fontVariables}>
      <body>
        {/* Only the error-page strings are needed client-side; other client components receive props. */}
        <NextIntlClientProvider messages={{ Errors: messages.Errors }}>
          <MotionProvider>{children}</MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
