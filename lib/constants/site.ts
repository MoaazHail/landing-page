/**
 * Public origin used for canonical URLs, the sitemap and Open Graph.
 * Tolerates an empty variable or a bare host (`wajha.sa`), and falls back to
 * the production domain Vercel exposes, then to localhost.
 */
function resolveSiteUrl() {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];

  for (const raw of candidates) {
    const value = raw?.trim();
    if (!value) continue;
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    if (URL.canParse(withProtocol)) return new URL(withProtocol).origin;
  }

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

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
