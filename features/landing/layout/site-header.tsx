import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { NAV_LINKS, SECTION_IDS } from "@/lib/constants/site";
import { cn } from "@/lib/utils";
import { CtaLink } from "@/shared/components/cta-link";
import { Logo } from "@/shared/ui/logo";
import { MobileNav } from "./mobile-nav";

interface SiteHeaderProps {
  whatsappUrl: string;
}

/** Transparent header laid over the blue hero, as in the reference. */
export async function SiteHeader({ whatsappUrl }: SiteHeaderProps) {
  const [t, tBrand, locale] = await Promise.all([getTranslations("Nav"), getTranslations("Brand"), getLocale()]);
  const otherLocale = locale === "ar" ? "en" : "ar";

  const links = NAV_LINKS.map(({ id, key }) => ({ href: `#${id}`, label: t(key) }));

  return (
    <header className="section-x absolute inset-x-0 top-0 z-20 text-white">
      <div className="mx-auto flex h-header w-full max-w-content items-center justify-between gap-7">
        <a href={`#${SECTION_IDS.top}`} aria-label={tBrand("name")} className="flex-none text-white hover:text-white">
          <Logo animated />
        </a>

        <nav aria-label={t("label")} className="hidden items-center gap-[clamp(18px,2.2vw,34px)] text-[15px] font-medium min-[1121px]:flex">
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "border-b-2 pb-1.5 transition-colors duration-150 hover:text-white",
                index === 0 ? "border-accent text-white" : "border-transparent text-white/82",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-none items-center gap-4">
          <Link
            href="/"
            locale={otherLocale}
            hrefLang={otherLocale}
            aria-label={t("switchLocaleLabel")}
            className="hidden text-[15px] font-medium text-white/82 transition-colors hover:text-white sm:inline"
          >
            {t("switchLocale")}
          </Link>
          <CtaLink href={whatsappUrl} variant="outline" size="sm" className="hidden sm:inline-flex">
            {t("contact")}
          </CtaLink>
          <MobileNav
            links={links}
            contact={{ href: whatsappUrl, label: t("contact") }}
            localeSwitch={{ locale: otherLocale, label: t("switchLocale"), ariaLabel: t("switchLocaleLabel") }}
            labels={{ open: t("openMenu"), close: t("closeMenu"), nav: t("label") }}
          />
        </div>
      </div>
    </header>
  );
}
