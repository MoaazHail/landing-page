"use client";

import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.2, 0.8, 0.2, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const group: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "li";
}

const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

/** Fades content up once as it enters the viewport. */
export function Reveal({ children, className, as = "div" }: RevealProps) {
  const Comp = m[as];
  return (
    <Comp className={className} variants={item} initial="hidden" whileInView="visible" viewport={viewport}>
      {children}
    </Comp>
  );
}

/** Staggers its `RevealItem` children as the group enters the viewport. */
export function RevealGroup({ children, className, as = "div" }: RevealProps) {
  const Comp = m[as];
  return (
    <Comp className={className} variants={group} initial="hidden" whileInView="visible" viewport={viewport}>
      {children}
    </Comp>
  );
}

export function RevealItem({ children, className, as = "div" }: RevealProps) {
  const Comp = m[as];
  return (
    <Comp className={className} variants={item}>
      {children}
    </Comp>
  );
}
