import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const tones = {
  white: "bg-white text-ink",
  surface: "bg-surface text-ink",
  night: "bg-night text-white",
} as const;

interface SectionProps extends ComponentProps<"section"> {
  tone?: keyof typeof tones;
  innerClassName?: string;
}

/** Full-bleed band with the shared gutter and a centred 1240px content column. */
export function Section({ tone = "white", className, innerClassName, children, ...props }: SectionProps) {
  return (
    <section className={cn("section-x", tones[tone], className)} {...props}>
      <div className={cn("mx-auto w-full max-w-content", innerClassName)}>{children}</div>
    </section>
  );
}
