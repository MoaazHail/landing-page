import { BRAND_LOCKUP } from "@/lib/constants/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Plays the draw + corner-fold entrance from the reference. */
  animated?: boolean;
  size?: "md" | "sm";
  className?: string;
}

/** The WAJHA mark: an open frame with the accent corner folded in. */
export function Logo({ animated = false, size = "md", className }: LogoProps) {
  const isSmall = size === "sm";

  return (
    <span className={cn("flex items-center", isSmall ? "gap-3" : "gap-[13px]", className)}>
      <svg
        width={isSmall ? 34 : 40}
        height={isSmall ? 34 : 40}
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="flex-none"
      >
        <path
          d="M0 0 H58 L100 42 V100 H0 Z M14.5 14.5 H72.5 L85.5 27.5 V85.5 H14.5 Z"
          fill="currentColor"
          fillRule="evenodd"
          className={cn(animated && "animate-draw")}
        />
        <path
          d="M68 0 H100 V32 Z"
          className={cn("fill-accent", animated && "animate-fold origin-top-right [transform-box:fill-box]")}
        />
      </svg>
      <span className="grid gap-[3px] leading-none">
        <span
          className={cn(
            "font-mono font-medium",
            isSmall ? "text-[13px] tracking-[.34em] ps-[.34em]" : "text-sm tracking-[.38em] ps-[.38em]",
          )}
        >
          {BRAND_LOCKUP.latin}
        </span>
        <span
          className={cn(
            "font-display font-medium opacity-75",
            isSmall ? "text-[11px] tracking-[.3em] ps-[.3em]" : "text-xs tracking-[.34em] ps-[.34em]",
          )}
        >
          {BRAND_LOCKUP.arabic}
        </span>
      </span>
    </span>
  );
}
