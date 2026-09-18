import { SECTION_IDS } from "@/lib/constants/site";
import type { Faq, Section as SectionContent } from "@/lib/types/content";
import { resolveCtaHref } from "@/lib/utils/content";
import { CtaArrow, CtaLink } from "@/shared/components/cta-link";
import { Reveal } from "@/shared/components/reveal";
import { SectionHeading } from "@/shared/components/section-heading";
import { Section } from "@/shared/layout/section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";

interface FaqSectionProps {
  section: SectionContent;
  faqs: Faq[];
  whatsappUrl: string;
}

export function FaqSection({ section, faqs, whatsappUrl }: FaqSectionProps) {
  return (
    <Section
      id={SECTION_IDS.faq}
      tone="surface"
      aria-labelledby="faq-title"
      className="py-section"
      innerClassName="grid items-start gap-stack min-[1025px]:grid-cols-[.8fr_1.2fr]"
    >
      <div className="min-[1025px]:sticky min-[1025px]:top-10">
        <SectionHeading
          id="faq-title"
          align="start"
          eyebrow={section.eyebrow}
          title={section.title}
          subtitle={section.subtitle}
          className="max-[1024px]:text-center"
        />
        {section.primaryCta && (
          <CtaLink
            href={resolveCtaHref(section.primaryCta, whatsappUrl)}
            className="mt-7 px-7 text-lead max-[1024px]:hidden"
          >
            {section.primaryCta.label}
            <CtaArrow />
          </CtaLink>
        )}
      </div>

      <Reveal className="rounded-card border border-line bg-white px-[clamp(20px,2.4vw,34px)] shadow-card">
        <Accordion type="single" collapsible defaultValue={faqs[0]?.id}>
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}
