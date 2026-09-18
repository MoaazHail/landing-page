import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { SECTION_IDS } from "@/lib/constants/site";
import type { Section as SectionContent, Service } from "@/lib/types/content";
import { formatPrice, resolveCtaHref } from "@/lib/utils/content";
import { CtaLink } from "@/shared/components/cta-link";
import { RevealGroup, RevealItem } from "@/shared/components/reveal";
import { Section } from "@/shared/layout/section";
import { Icon } from "@/shared/ui/icons";

interface ServicesSectionProps {
  section: SectionContent;
  services: Service[];
  whatsappUrl: string;
}

/** "Or order a single service" — continues the pricing band on the same surface. */
export async function ServicesSection({ section, services, whatsappUrl }: ServicesSectionProps) {
  const t = await getTranslations("Pricing");

  return (
    <Section id={SECTION_IDS.services} tone="surface" aria-labelledby="services-title" className="pb-section">
      <div className="flex items-center gap-4 pt-[clamp(30px,3.4vw,50px)]">
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
        <h2 id="services-title" className="whitespace-nowrap font-display text-[15px] font-semibold tracking-normal text-muted">
          {section.title}
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>

      <RevealGroup className="mt-[clamp(22px,2.6vw,34px)] grid gap-[clamp(16px,2vw,26px)] min-[1151px]:grid-cols-2">
        {services.map((service) => (
          <RevealItem key={service.id}>
            <article className="relative h-full overflow-hidden rounded-card border border-line bg-white p-[clamp(20px,2.2vw,30px)] shadow-card">
              <span
                aria-hidden="true"
                className="absolute end-[clamp(20px,2.2vw,30px)] top-[clamp(20px,2.2vw,30px)] flex size-11 items-center justify-center rounded-icon bg-primary text-white"
              >
                <Icon name={service.icon ?? "monitor"} size={21} />
              </span>

              <div className="grid items-center gap-[clamp(14px,1.8vw,24px)] min-[761px]:grid-cols-[1fr_.82fr]">
                <div className="min-w-0 max-[760px]:pt-14 min-[761px]:pe-[clamp(52px,4.4vw,62px)]">
                  <h3 className="text-h3 font-bold">{service.title}</h3>
                  <p className="mt-[11px] text-[14.5px] leading-[1.85] text-muted">{service.description}</p>

                  {service.features.length > 0 && (
                    <ul className="mt-[clamp(16px,1.8vw,22px)] grid gap-3 border-y border-line py-[clamp(16px,1.8vw,22px)] text-[14.5px]">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2.5">
                          <Icon name="checkCircle" size={17} className="flex-none text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-[clamp(16px,1.8vw,22px)] flex flex-wrap items-center justify-between gap-3.5">
                    {service.price != null && (
                      <p className="flex items-baseline gap-1.5 whitespace-nowrap font-display text-primary">
                        <span className="text-[clamp(24px,2.2vw,32px)] font-bold leading-none">{formatPrice(service.price)}</span>
                        <span className="text-[14.5px] font-semibold">{t("currency")}</span>
                      </p>
                    )}
                    <CtaLink href={resolveCtaHref(service.cta, whatsappUrl)} className="rounded-[7px]">
                      {service.cta.label}
                      <Icon name="chevron" size={13} className="rtl:-scale-x-100" />
                    </CtaLink>
                  </div>
                </div>

                {service.image && (
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    width={service.image.width ?? 1448}
                    height={service.image.height ?? 1086}
                    sizes="(max-width: 760px) 340px, (max-width: 1150px) 40vw, 260px"
                    className="h-auto w-full object-contain max-[760px]:order-first max-[760px]:mx-auto max-[760px]:max-w-[340px]"
                  />
                )}
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
