import { SECTION_IDS } from "@/lib/constants/site";
import type { Section as SectionContent } from "@/lib/types/content";
import { resolveCtaHref } from "@/lib/utils/content";
import { CtaArrow, CtaLink } from "@/shared/components/cta-link";
import { Reveal } from "@/shared/components/reveal";
import { Section } from "@/shared/layout/section";

interface CtaSectionProps {
  section: SectionContent;
  whatsappUrl: string;
}

export function CtaSection({ section, whatsappUrl }: CtaSectionProps) {
  return (
    <Section
      id={SECTION_IDS.contact}
      tone="night"
      aria-labelledby="cta-title"
      className="pb-[clamp(40px,4.5vw,68px)]"
    >
      <Reveal className="flex items-center justify-between gap-6 rounded-card bg-primary px-[clamp(24px,3vw,46px)] py-[clamp(24px,2.8vw,42px)] max-[900px]:flex-col max-[900px]:items-start">
        <div>
          <h2 id="cta-title" className="text-[clamp(20px,2.1vw,28px)] font-bold">
            {section.title}
          </h2>
          {section.subtitle && <p className="mt-2.5 text-lead text-white/84">{section.subtitle}</p>}
        </div>
        {section.primaryCta && (
          <CtaLink href={resolveCtaHref(section.primaryCta, whatsappUrl)} variant="light" className="px-7 text-lead">
            {section.primaryCta.label}
            <CtaArrow />
          </CtaLink>
        )}
      </Reveal>
    </Section>
  );
}
