import type { CallToAction } from "@/lib/types/content";

/** CMS CTAs without an explicit href open the WhatsApp chat. */
export function resolveCtaHref(cta: CallToAction | undefined, whatsappUrl: string) {
  return cta?.href?.trim() || whatsappUrl;
}

export function isExternalHref(href: string) {
  return /^(https?:)?\/\//.test(href);
}

/** Prices keep Latin digits in both locales, as in the reference design. */
const priceFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export function formatPrice(value: number) {
  return priceFormatter.format(value);
}

/** Splits text into plain and numeric runs so numbers can use the mono face. */
export function splitDigits(text: string) {
  return text.split(/(\d[\d,.+%]*)/).filter(Boolean).map((part) => ({
    text: part,
    isNumber: /^\d/.test(part),
  }));
}
