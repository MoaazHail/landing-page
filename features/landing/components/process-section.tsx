import { SECTION_IDS } from "@/lib/constants/site";
import type { Section as SectionContent } from "@/lib/types/content";
import { RevealGroup, RevealItem } from "@/shared/components/reveal";
import { SectionHeading } from "@/shared/components/section-heading";
import { Section } from "@/shared/layout/section";
import { Icon } from "@/shared/ui/icons";

export function ProcessSection({ section }: { section: SectionContent }) {
  return (
    <Section id={SECTION_IDS.process} tone="white" aria-labelledby="process-title" className="py-section">
      <SectionHeading id="process-title" eyebrow={section.eyebrow} title={section.title} subtitle={section.subtitle} />

      <div className="relative mt-[clamp(30px,3.6vw,52px)]">
        {/* Dotted connector running through the step circles. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[clamp(42px,3.6vw,52px)] h-px bg-[repeating-linear-gradient(to_right,var(--color-line)_0_5px,transparent_5px_11px)] max-[900px]:hidden"
        />

        <RevealGroup
          as="ol"
          className="relative grid grid-cols-1 gap-x-[clamp(14px,2vw,28px)] gap-y-[clamp(30px,4vw,44px)] min-[641px]:grid-cols-2 min-[901px]:grid-cols-4"
        >
          {section.items.map((step, index) => (
            <RevealItem as="li" key={step.title} className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="flex size-[clamp(84px,7.2vw,104px)] items-center justify-center rounded-full border border-line bg-white text-primary shadow-step">
                  <Icon name={step.icon ?? "brief"} size={34} />
                </div>
                <span
                  aria-hidden="true"
                  className="absolute -end-2.5 -top-1 flex size-10 items-center justify-center rounded-full border-[3px] border-white bg-primary font-mono text-sm font-medium text-white"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-[22px] text-[clamp(16px,1.4vw,20px)] font-semibold">{step.title}</h3>
              {step.description && (
                <p className="mt-[9px] max-w-[23ch] text-sm leading-[1.75] text-subtle">{step.description}</p>
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
