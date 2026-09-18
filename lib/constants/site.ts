export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const CONTENT_REVALIDATE_SECONDS = 300;
export const API_TIMEOUT_MS = 8000;

/** Anchor ids shared by the navbar, footer and the sections they point to. */
export const SECTION_IDS = {
  top: "top",
  why: "why",
  pricing: "pricing",
  services: "services",
  process: "process",
  faq: "faq",
  work: "work",
  contact: "contact",
} as const;

export const NAV_LINKS = [
  { id: SECTION_IDS.top, key: "home" },
  { id: SECTION_IDS.why, key: "why" },
  { id: SECTION_IDS.work, key: "work" },
  { id: SECTION_IDS.pricing, key: "pricing" },
  { id: SECTION_IDS.faq, key: "faq" },
] as const;

/** The logo lockup is identical in every locale. */
export const BRAND_LOCKUP = { latin: "WAJHA", arabic: "وجهة" } as const;
