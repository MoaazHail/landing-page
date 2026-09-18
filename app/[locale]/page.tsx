import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants/site";
import { buildPageMetadata, localizedPath } from "@/lib/services/seo";
import { StructuredData } from "@/features/landing/components/structured-data";
import { LandingPage } from "@/features/landing/routes/landing-page";

export const revalidate = 300;

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata("home", locale as Locale);
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale: param } = await params;
  const locale = param as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("Metadata");

  return (
    <>
      <StructuredData
        locale={locale}
        name="WAJHA"
        description={t("description")}
        url={new URL(localizedPath(locale), SITE_URL).toString()}
      />
      <LandingPage locale={locale} />
    </>
  );
}
