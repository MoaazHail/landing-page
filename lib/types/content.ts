import type { IconName } from "@/shared/ui/icons";

/**
 * Content contracts returned by the CMS API when a `locale` is requested:
 * every bilingual `{ ar, en }` field arrives already resolved to a string.
 */

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/** An empty `href` means the CTA opens the WhatsApp chat from site settings. */
export interface CallToAction {
  label: string;
  href?: string;
}

export interface SectionItem {
  title: string;
  description?: string;
  icon?: IconName;
}

export interface TrustBadge {
  title: string;
  note?: string;
  avatars: string[];
}

export type SectionKey =
  | "hero"
  | "why"
  | "pricing"
  | "services"
  | "process"
  | "faq"
  | "portfolio"
  | "testimonials"
  | "cta";

export interface Section {
  key: SectionKey;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: SectionItem[];
  primaryCta?: CallToAction;
  secondaryCta?: CallToAction;
  badge?: TrustBadge;
  image?: ImageAsset;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  price?: number;
  currency: string;
  icon?: IconName;
  image?: ImageAsset;
  cta: CallToAction;
}

export interface PricingPackage {
  id: string;
  badge?: string;
  title: string;
  description: string;
  features: string[];
  price: number;
  originalPrice?: number;
  currency: string;
  image?: ImageAsset;
  cta: CallToAction;
  isFeatured: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category?: string;
  url?: string;
  image?: ImageAsset;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  quote: string;
  avatar?: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export type SocialPlatform = "youtube" | "linkedin" | "x" | "instagram";

export interface SiteSettings {
  whatsappUrl: string;
  phone?: string;
  email?: string;
  address?: string;
  tagline?: string;
  socials: { platform: SocialPlatform; url: string }[];
}

export interface PageSeo {
  page: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  noIndex: boolean;
}
