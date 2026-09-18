import { SECTION_IDS } from "@/lib/constants/site";
import type { Section as SectionContent } from "@/lib/types/content";
import { RevealGroup, RevealItem } from "@/shared/components/reveal";
import { Section } from "@/shared/layout/section";
import { Icon } from "@/shared/ui/icons";

export function WhySection({ section }: { section: SectionContent }) {
  return (
    <Section id={SECTION_IDS.why} tone="surface" aria-labelledby="why-title" className="py-section">
      <h2 id="why-title" className="text-center text-h2 font-bold">
        {section.title}
      </h2>

      <RevealGroup
        as="ul"
        className="mt-stack grid grid-cols-1 gap-y-[26px] min-[641px]:grid-cols-2 min-[961px]:grid-cols-4 min-[961px]:gap-y-0"
      >
        {section.items.map((item) => (
          <RevealItem
            as="li"
            key={item.title}
            className="flex items-start gap-[13px] px-[clamp(12px,1.6vw,26px)] min-[961px]:border-e min-[961px]:border-line min-[961px]:last:border-e-0"
          >
            <Icon name={item.icon ?? "layout"} size={30} className="flex-none text-faint" />
            <div className="min-w-0">
              <h3 className="font-display text-[clamp(15px,1.15vw,18px)] font-semibold leading-normal">{item.title}</h3>
              {item.description && <p className="mt-[5px] text-sm leading-[1.7] text-muted">{item.description}</p>}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
