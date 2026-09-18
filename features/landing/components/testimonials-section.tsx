import Image from "next/image";

import type { Section as SectionContent, Testimonial } from "@/lib/types/content";
import { RevealGroup, RevealItem } from "@/shared/components/reveal";
import { SectionHeading } from "@/shared/components/section-heading";
import { Section } from "@/shared/layout/section";
import { Icon } from "@/shared/ui/icons";

interface TestimonialsSectionProps {
  section: SectionContent;
  testimonials: Testimonial[];
}

/** Rendered only when real testimonials exist in the CMS. */
export function TestimonialsSection({ section, testimonials }: TestimonialsSectionProps) {
  return (
    <Section tone="night" aria-labelledby="testimonials-title" className="pb-section pt-[clamp(20px,2.4vw,36px)]">
      <SectionHeading
        id="testimonials-title"
        tone="dark"
        eyebrow={section.eyebrow}
        title={section.title}
        subtitle={section.subtitle}
      />

      <RevealGroup as="ul" className="mt-stack grid gap-[clamp(14px,1.8vw,24px)] min-[641px]:grid-cols-2 min-[1025px]:grid-cols-3">
        {testimonials.map((item) => (
          <RevealItem as="li" key={item.id} className="h-full">
            <figure className="flex h-full flex-col rounded-panel border border-white/8 bg-glass p-[clamp(20px,2.2vw,28px)]">
              <Icon name="quote" size={26} className="text-sky" />
              <blockquote className="mt-4 flex-1 text-[15px] leading-[1.9] text-white/86">{item.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                {item.avatar && (
                  <Image
                    src={item.avatar}
                    alt=""
                    width={44}
                    height={44}
                    className="size-11 rounded-full border-2 border-white/80 object-cover"
                  />
                )}
                <span className="grid leading-snug">
                  <span className="font-display text-[15px] font-semibold">{item.name}</span>
                  {(item.role || item.company) && (
                    <span className="text-[13px] text-white/60">
                      {[item.role, item.company].filter(Boolean).join(" · ")}
                    </span>
                  )}
                </span>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
