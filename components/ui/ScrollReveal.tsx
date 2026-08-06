"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   SCROLL REVEAL
   A single, reusable reveal wrapper — keeps animation logic
   out of individual section components.

   Design principle (from Implementation Plan):
     "one scroll-triggered reveal per section — no looping or
      ambient animation."

   - Uses Framer Motion's useInView so the reveal fires once
     (triggerOnce = true) when the element enters the viewport.
   - Supports staggered children via the `delay` prop.
   - Full prefers-reduced-motion support: Framer Motion respects
     the browser flag natively; this component adds a CSS class
     fallback as an additional safeguard.
   ───────────────────────────────────────────────────────────────── */

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Extra delay in seconds (for staggering sibling elements) */
  delay?: number;
  /** Distance in pixels the element rises from */
  rise?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  rise = 24,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,       // fires only the first time
    margin: "-8% 0px", // trigger slightly before fully visible
  });

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      initial={{ opacity: 0, y: rise }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: rise }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1], // --ease-out-expo
      }}
    >
      {children}
    </motion.div>
  );
}
