import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** The four button treatments used by the reference design. */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-[9px] whitespace-nowrap transition-[transform,background-color,border-color,color] duration-150 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        /** Blue, solid — package and service CTAs. */
        primary:
          "rounded-btn bg-primary font-display font-semibold text-white hover:-translate-y-0.5 hover:bg-primary-hover",
        /** White on blue — CTA band. */
        light: "rounded-btn bg-white font-display font-semibold text-primary hover:-translate-y-0.5",
        /** White with the folded corner — hero primary CTA. */
        corner: "clip-corner bg-white font-display font-semibold text-primary hover:-translate-y-0.5",
        /** Hairline white outline on blue. */
        outline: "border border-white/55 font-medium text-white hover:border-white hover:bg-white/10",
      },
      size: {
        sm: "px-[26px] py-[11px] text-[15px]",
        md: "px-6 py-3.5 text-[15px]",
        lg: "px-[34px] py-4 text-[17px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
