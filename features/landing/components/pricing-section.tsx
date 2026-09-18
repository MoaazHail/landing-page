import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { SECTION_IDS } from "@/lib/constants/site";
import type { PricingPackage, Section as SectionContent } from "@/lib/types/content";
import { formatPrice, resolveCtaHref } from "@/lib/utils/content";
import { CtaArrow, CtaLink } from "@/shared/components/cta-link";
import { Reveal } from "@/shared/components/reveal";
import { SectionHeading } from "@/shared/components/section-heading";
import { Section } from "@/shared/layout/section";
import { Icon } from "@/shared/ui/icons";

interface PricingSectionProps {
  section: SectionContent;
  packages: PricingPackage[];
  whatsappUrl: string;
}

export function PricingSection({ section, packages, whatsappUrl }: PricingSectionProps) {
  return (
    <Section id={SECTION_IDS.pricing} tone="surface" aria-labelledby="pricing-title" className="py-section">
      <SectionHeading
        id="pricing-title"
        eyebrow={section.eyebrow}
        title={section.title}
        subtitle={section.subtitle}
        className="[&_h2]:text-[clamp(24px,2.7vw,36px)]"
      />
      <div className="mt-stack grid gap-[clamp(16px,2vw,26px)]">
        {packages.map((pkg) => (
          <Reveal key={pkg.id}>
            <PackageCard pkg={pkg} whatsappUrl={whatsappUrl} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

async function PackageCard({ pkg, whatsappUrl }: { pkg: PricingPackage; whatsappUrl: string }) {
  const t = await getTranslations("Pricing");

  return (
    <article className="grid overflow-hidden rounded-card border border-line bg-white min-[901px]:grid-cols-[1.06fr_.94fr]">
      <div className="p-[clamp(26px,3vw,46px)]">
        {pkg.badge && (
          <div className="flex items-center gap-3">
            <span className="rounded-[4px] bg-accent px-[13px] py-1.5 font-display text-[12.5px] font-semibold tracking-[.02em] text-white">
              {pkg.badge}
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </div>
        )}

        <h3 className="mt-[18px] text-[clamp(19px,1.8vw,25px)] font-bold leading-[1.45]">{pkg.title}</h3>
        <p className="mt-3 max-w-[52ch] text-lead leading-[1.95] text-muted">{pkg.description}</p>

        {pkg.features.length > 0 && (
          <>
            <p className="mt-[clamp(20px,2.2vw,28px)] font-mono text-xs font-medium tracking-[.2em] text-subtle">
              {t("includes")}
            </p>
            <ul className="mt-3.5 grid gap-x-[clamp(16px,2vw,30px)] gap-y-[13px] text-[14.5px] leading-[1.7] min-[901px]:grid-cols-2">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Icon name="check" size={15} className="mt-1.5 flex-none text-accent" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-[clamp(24px,2.6vw,34px)] flex flex-wrap items-center justify-between gap-5 border-t border-line pt-[clamp(20px,2.2vw,26px)]">
          <div>
            {pkg.originalPrice != null && (
              <p className="whitespace-nowrap text-[13.5px] text-subtle">
                <span className="sr-only">{t("previousPrice")}: </span>
                <s className="decoration-[1.5px]">
                  {formatPrice(pkg.originalPrice)} {t("currency")}
                </s>
              </p>
            )}
            <p className="mt-1 flex items-baseline gap-2 whitespace-nowrap">
              <span className="font-display text-[clamp(30px,3.1vw,44px)] font-bold leading-none text-primary">
                {formatPrice(pkg.price)}
              </span>
              <span className="font-display text-[clamp(15px,1.3vw,18px)] font-semibold text-primary">{t("currency")}</span>
              <span className="text-sm text-subtle">{t("only")}</span>
            </p>
          </div>
          <CtaLink href={resolveCtaHref(pkg.cta, whatsappUrl)} className="px-7 py-[15px] text-lead">
            {pkg.cta.label}
            <CtaArrow />
          </CtaLink>
        </div>
      </div>

      {pkg.image && (
        <div className="relative flex items-center justify-center overflow-hidden bg-primary px-[clamp(18px,2.4vw,34px)] py-[clamp(26px,3vw,44px)] max-[900px]:order-first">
          {/* Accent fold — mirrors the logo mark, so it stays top-right in both directions. */}
          <span aria-hidden="true" className="absolute right-0 top-0 size-16 bg-accent [clip-path:polygon(0_0,100%_0,100%_100%)]" />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_46%,rgb(255_255_255/.16),transparent_70%)]"
          />
          <Image
            src={pkg.image.src}
            alt={pkg.image.alt}
            width={pkg.image.width ?? 1672}
            height={pkg.image.height ?? 941}
            sizes="(max-width: 900px) 90vw, 520px"
            className="relative h-auto w-full max-w-[520px]"
          />
        </div>
      )}
    </article>
  );
}
