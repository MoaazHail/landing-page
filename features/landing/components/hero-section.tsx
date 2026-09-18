import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { SECTION_IDS } from "@/lib/constants/site";
import type { Section, TrustBadge } from "@/lib/types/content";
import { resolveCtaHref, splitDigits } from "@/lib/utils/content";
import { CtaArrow, CtaLink } from "@/shared/components/cta-link";
import heroArt from "@/public/images/hero-art.png";

interface HeroSectionProps {
  /** `null` when the CMS is unreachable — the hero then falls back to bundled copy. */
  hero: Section | null;
  whatsappUrl: string;
}

export async function HeroSection({ hero, whatsappUrl }: HeroSectionProps) {
  const t = await getTranslations("Hero");

  const eyebrow = hero?.eyebrow ?? t("eyebrow");
  const title = hero?.title ?? t("title");
  const subtitle = hero?.subtitle ?? t("subtitle");
  const primaryLabel = hero?.primaryCta?.label ?? t("primaryCta");
  const secondaryLabel = hero?.secondaryCta?.label ?? t("secondaryCta");
  const secondaryHref = hero?.secondaryCta?.href || `#${SECTION_IDS.work}`;

  return (
    <section
      id={SECTION_IDS.top}
      aria-labelledby="hero-title"
      className="section-x relative flex flex-col overflow-hidden bg-primary pt-header text-white min-[901px]:min-h-[min(92vh,900px)]"
    >
      {/* The art is anchored to the inline-end edge and fades toward the copy. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 end-0 w-[64%] max-[900px]:hidden rtl:[mask-image:linear-gradient(to_right,#000_72%,transparent)] ltr:[mask-image:linear-gradient(to_left,#000_72%,transparent)]"
      >
        <Image
          src={hero?.image?.src ?? heroArt}
          alt=""
          loading="eager"
          fetchPriority="high"
          fill
          sizes="(max-width: 900px) 0px, 64vw"
          className="object-cover brightness-[1.07] saturate-[.97] rtl:object-left ltr:object-right"
        />
      </div>

      <div className="relative z-[2] mx-auto flex w-full max-w-content flex-1 items-center py-[clamp(48px,7vw,96px)]">
        <div className="max-w-[min(600px,100%)] animate-rise">
          <p className="font-display text-sm font-medium tracking-[.06em] text-white/78">{eyebrow}</p>
          <h1 id="hero-title" className="mt-5 whitespace-pre-line text-display font-bold text-balance">
            {title}
          </h1>
          <p className="mt-6 text-base leading-[1.85] text-white/86 min-[761px]:text-[clamp(12px,1.02vw,15px)] min-[761px]:leading-[1.7]">
            {subtitle}
          </p>

          <div className="mt-[38px] flex flex-wrap gap-3.5">
            <CtaLink href={resolveCtaHref(hero?.primaryCta, whatsappUrl)} variant="corner" size="lg" className="gap-2.5">
              {primaryLabel}
              <CtaArrow className="text-sm" />
            </CtaLink>
            <CtaLink href={secondaryHref} variant="outline" size="lg" className="border-white/50 px-[30px]">
              {secondaryLabel}
            </CtaLink>
          </div>

          {hero?.badge && <HeroTrustBadge badge={hero.badge} />}
        </div>
      </div>
    </section>
  );
}

function HeroTrustBadge({ badge }: { badge: TrustBadge }) {
  return (
    <div className="relative mt-[clamp(30px,3.2vw,44px)] max-w-[430px] overflow-hidden rounded-[18px] bg-linear-[115deg] from-primary via-primary-hover to-primary-light shadow-badge">
      <BadgeDecoration />

      <div className="relative flex flex-wrap items-center gap-3 px-[clamp(18px,2vw,24px)] py-[clamp(16px,1.8vw,22px)]">
        <div className="min-w-[min(170px,100%)] flex-[1_1_200px]">
          <p className="whitespace-pre-line font-display text-[clamp(13.5px,1.05vw,15.5px)] font-bold leading-[1.55] tracking-[-0.01em]">
            {splitDigits(badge.title).map((part, index) =>
              part.isNumber ? (
                <span key={index} className="font-mono font-medium tracking-[.02em]">
                  {part.text}
                </span>
              ) : (
                part.text
              ),
            )}
          </p>
          {badge.note && (
            <div className="mt-[11px] flex gap-[9px]">
              <i aria-hidden="true" className="w-0.5 flex-none rounded-sm bg-sky" />
              <p className="text-[clamp(12.5px,.95vw,13px)] leading-[1.6] text-white/75">{badge.note}</p>
            </div>
          )}
        </div>

        <span
          aria-hidden="true"
          className="flex size-[26px] flex-none items-center justify-center rounded-full border border-white/35 bg-primary-hover"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2.6l7 2.6v6.1c0 4.3-2.9 8-7 9.1-4.1-1.1-7-4.8-7-9.1V5.2l7-2.6z" className="fill-white/90" />
            <path
              d="M8.6 12.1l2.3 2.3 4.5-4.6"
              className="stroke-primary-hover"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        {badge.avatars.length > 0 && (
          <div className="flex flex-none items-center" dir="ltr">
            {badge.avatars.map((src, index) => (
              <div
                key={src}
                className="relative size-11 overflow-hidden rounded-full border-2 border-white bg-primary-light shadow-avatar [&:not(:first-child)]:-ml-3"
                style={{ zIndex: badge.avatars.length - index }}
              >
                <Image src={src} alt="" fill sizes="44px" className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Glow, dot grid, swoosh and sparkle behind the trust badge. */
function BadgeDecoration() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 430 150"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 size-full"
    >
      <defs>
        <radialGradient id="badge-glow" cx="16%" cy="112%" r="62%">
          <stop offset="0" stopColor="var(--color-sky)" stopOpacity=".7" />
          <stop offset="1" stopColor="var(--color-sky)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="badge-swoosh" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--color-white)" stopOpacity="0" />
          <stop offset=".55" stopColor="var(--color-white)" stopOpacity=".6" />
          <stop offset="1" stopColor="var(--color-white)" stopOpacity="0" />
        </linearGradient>
        <pattern id="badge-dots" width="11" height="11" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="var(--color-sky)" fillOpacity=".5" />
        </pattern>
      </defs>
      <rect width="430" height="150" fill="url(#badge-glow)" />
      <rect x="10" y="20" width="40" height="66" fill="url(#badge-dots)" />
      <path d="M0 78 C 70 100, 130 122, 205 150" fill="none" stroke="url(#badge-swoosh)" strokeWidth="2" />
      <path d="M0 108 C 55 120, 105 136, 150 150" fill="none" stroke="url(#badge-swoosh)" strokeWidth="1.2" strokeOpacity=".7" />
      <path d="M96 116l1.7 6L104 124l-6.3 1.7L96 132l-1.7-6.3L88 124l6.3-1.7L96 116z" fill="var(--color-white)" fillOpacity=".85" />
    </svg>
  );
}
