"use client";

import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Icon } from "@/shared/ui/icons";

interface PortfolioRailProps {
  children: ReactNode;
  labels: { next: string; previous: string; region: string };
}

const MAX_STEP_PX = 320;
const STEP_RATIO = 0.75;

/** Horizontally scrolling, snap-aligned rail with direction-aware prev/next controls. */
export function PortfolioRail({ children, labels }: PortfolioRailProps) {
  const railRef = useRef<HTMLDivElement>(null);

  const nudge = (towardEnd: boolean) => {
    const rail = railRef.current;
    if (!rail) return;
    const step = Math.min(MAX_STEP_PX, Math.round(rail.clientWidth * STEP_RATIO));
    // In RTL, moving toward the inline-end means a negative scrollLeft delta.
    const isRtl = getComputedStyle(rail).direction === "rtl";
    rail.scrollBy({ left: (towardEnd !== isRtl ? 1 : -1) * step, behavior: "smooth" });
  };

  const buttonClass =
    "absolute top-1/2 flex size-[34px] -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-float transition-colors hover:bg-primary-hover max-[640px]:hidden";

  return (
    <div className="relative mt-stack">
      <div className="rounded-panel border border-white/8 bg-glass p-[clamp(18px,2.2vw,30px)]">
        <div
          ref={railRef}
          tabIndex={0}
          role="region"
          aria-label={labels.region}
          aria-roledescription="carousel"
          className="scrollbar-none flex snap-x snap-mandatory gap-[clamp(14px,1.8vw,24px)] overflow-x-auto pb-0.5"
        >
          {children}
        </div>
      </div>

      <button
        type="button"
        onClick={() => nudge(false)}
        aria-label={labels.previous}
        className={cn(buttonClass, "-start-[clamp(6px,1.4vw,20px)]")}
      >
        <Icon name="chevron" size={15} className="ltr:-scale-x-100" />
      </button>
      <button
        type="button"
        onClick={() => nudge(true)}
        aria-label={labels.next}
        className={cn(buttonClass, "-end-[clamp(6px,1.4vw,20px)]")}
      >
        <Icon name="chevron" size={15} className="rtl:-scale-x-100" />
      </button>
    </div>
  );
}
