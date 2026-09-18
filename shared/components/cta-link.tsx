import type { ComponentProps, ReactNode } from "react";

import { isExternalHref } from "@/lib/utils/content";
import { Button } from "@/shared/ui/button";

type CtaLinkProps = Omit<ComponentProps<typeof Button>, "asChild"> & {
  href: string;
  children: ReactNode;
};

/** A button-styled anchor; external targets (e.g. WhatsApp) open in a new tab. */
export function CtaLink({ href, children, ...buttonProps }: CtaLinkProps) {
  const external = isExternalHref(href);

  return (
    <Button asChild {...buttonProps}>
      <a href={href} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
        {children}
      </a>
    </Button>
  );
}

/** The ↗ glyph the reference pairs with primary CTAs. */
export function CtaArrow({ className = "text-[13px]" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`font-mono ${className}`}>
      ↗
    </span>
  );
}
