import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { SECTION_IDS } from "@/lib/constants/site";
import type { PortfolioItem, Section as SectionContent } from "@/lib/types/content";
import { SectionHeading } from "@/shared/components/section-heading";
import { Section } from "@/shared/layout/section";
import { Icon } from "@/shared/ui/icons";
import { PortfolioRail } from "./portfolio-rail";

interface PortfolioSectionProps {
  section: SectionContent;
  items: PortfolioItem[];
}

export async function PortfolioSection({ section, items }: PortfolioSectionProps) {
  const t = await getTranslations("Portfolio");

  return (
    <Section
      id={SECTION_IDS.work}
      tone="night"
      aria-labelledby="work-title"
      className="pb-[clamp(30px,3.4vw,52px)] pt-section"
    >
      <SectionHeading id="work-title" tone="dark" eyebrow={section.eyebrow} title={section.title} subtitle={section.subtitle} />

      <PortfolioRail labels={{ next: t("next"), previous: t("previous"), region: section.title }}>
        {items.map((item) => (
          <figure key={item.id} className="m-0 flex-[0_0_clamp(200px,23%,260px)] snap-start">
            <PortfolioTile item={item} visitLabel={t("visit")} />
            <figcaption className="mt-3 text-center text-[14.5px] font-medium text-white/86">{item.title}</figcaption>
          </figure>
        ))}
      </PortfolioRail>
    </Section>
  );
}

function PortfolioTile({ item, visitLabel }: { item: PortfolioItem; visitLabel: string }) {
  const tile = (
    <div className="group relative aspect-4/3 overflow-hidden rounded-tile border border-white/9 bg-ink">
      {item.image ? (
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="260px"
          className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-[1.04]"
        />
      ) : (
        // Placeholder until a project screenshot is uploaded through the CMS.
        <div className="flex size-full flex-col items-center justify-center gap-2 p-4 text-center text-white/45">
          <Icon name="image" size={26} />
          {item.category && <span className="text-[13px] leading-relaxed">{item.category}</span>}
        </div>
      )}
    </div>
  );

  if (!item.url) return tile;

  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`${visitLabel}: ${item.title}`} className="block">
      {tile}
    </a>
  );
}
