"use client";

import { Accordion as AccordionPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { Icon } from "./icons";

function Accordion(props: ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-line last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 py-5 text-start font-display text-base font-semibold leading-relaxed text-ink transition-colors hover:text-primary sm:text-[17px]",
          className,
        )}
        {...props}
      >
        {children}
        <span className="flex size-8 flex-none items-center justify-center rounded-full border border-line text-primary transition-[transform,background-color,border-color,color] duration-200 group-hover:border-primary group-data-[state=open]:rotate-45 group-data-[state=open]:border-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-white">
          <Icon name="plus" size={15} />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    // Force-mounted so every answer is in the server HTML (SEO); closed panels are hidden with CSS.
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      forceMount
      className="overflow-hidden data-[state=closed]:hidden data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-5 pe-12 text-[15px] leading-[1.9] text-muted", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
