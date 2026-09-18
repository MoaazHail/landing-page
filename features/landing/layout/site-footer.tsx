import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { NAV_LINKS, SECTION_IDS } from "@/lib/constants/site";
import type { SiteSettings } from "@/lib/types/content";
import { Icon } from "@/shared/ui/icons";
import { Logo } from "@/shared/ui/logo";

const SERVICE_LINKS = [
  { key: "websites", href: `#${SECTION_IDS.pricing}` },
  { key: "profiles", href: `#${SECTION_IDS.pricing}` },
  { key: "identity", href: `#${SECTION_IDS.pricing}` },
  { key: "support", href: `#${SECTION_IDS.why}` },
] as const;

const linkClass = "text-white/72 transition-colors duration-150 hover:text-white";

export async function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  const [t, tNav, tBrand] = await Promise.all([
    getTranslations("Footer"),
    getTranslations("Nav"),
    getTranslations("Brand"),
  ]);

  const socials = settings?.socials.filter((social) => social.url) ?? [];

  return (
    <footer className="section-x bg-night pb-[clamp(18px,2vw,28px)] text-white">
      <div className="mx-auto w-full max-w-content">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-[clamp(24px,3vw,44px)] pb-[clamp(28px,3.2vw,46px)]">
          <div>
            <Logo size="sm" />
            <p className="mt-4 max-w-[22ch] text-[14.5px] leading-[1.85] text-white/72">
              {settings?.tagline ?? tBrand("tagline")}
            </p>
          </div>

          <FooterColumn title={t("quickLinks")}>
            {NAV_LINKS.map(({ id, key }) => (
              <a key={id} href={`#${id}`} className={linkClass}>
                {tNav(key)}
              </a>
            ))}
          </FooterColumn>

          <FooterColumn title={t("contact")}>
            {settings?.phone && (
              <a href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`} dir="ltr" className={`${linkClass} text-start font-mono tracking-[.02em]`}>
                {settings.phone}
              </a>
            )}
            {settings?.email && (
              <a href={`mailto:${settings.email}`} dir="ltr" className={`${linkClass} text-start font-mono`}>
                {settings.email}
              </a>
            )}
            {settings?.address && <address className="not-italic text-white/72">{settings.address}</address>}
            {socials.length > 0 && (
              <ul className="mt-2 flex gap-2.5">
                {socials.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t(`social.${social.platform}`)}
                      className="flex size-8 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:bg-white/12 hover:text-white"
                    >
                      <Icon name={social.platform} size={15} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </FooterColumn>

          <FooterColumn title={t("services")}>
            {SERVICE_LINKS.map(({ key, href }) => (
              <a key={key} href={href} className={linkClass}>
                {t(`serviceLinks.${key}`)}
              </a>
            ))}
          </FooterColumn>
        </div>

        <p className="border-t border-white/12 pt-[clamp(14px,1.6vw,22px)] text-center text-[13.5px] text-white/60">
          {t("rights", { year: new Date().getFullYear(), brand: tBrand("name") })}
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-base font-semibold tracking-normal">{title}</h2>
      <div className="mt-3.5 grid justify-items-start gap-2.5 text-[14.5px]">{children}</div>
    </div>
  );
}
