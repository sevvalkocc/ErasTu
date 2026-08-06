"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   FAQ ACCORDION — Client Component
   Accessible accordion using aria-expanded / aria-controls.
   Only one item open at a time (single-open pattern).
   AnimatePresence handles smooth height animation on open/close.

   Note: This is the only client component among the section content
   components — needed purely for the interactive accordion state.
   ───────────────────────────────────────────────────────────────── */

type FaqItem = { q: string; a: string };

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <ul className="flex flex-col divide-y divide-ink/10">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const id = `faq-answer-${i}`;
        const btnId = `faq-btn-${i}`;

        return (
          <li key={i}>
            <button
              id={btnId}
              aria-expanded={isOpen}
              aria-controls={id}
              onClick={() => toggle(i)}
              className={cn(
                "flex w-full items-center justify-between gap-4",
                "py-5 text-left",
                "font-body text-base font-medium text-ink",
                "hover:text-lagoon transition-colors duration-200",
                isOpen && "text-lagoon"
              )}
            >
              <span>{item.q}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="shrink-0"
              >
                <ChevronDown className="h-5 w-5" aria-hidden="true" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={id}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="font-body text-sm font-light leading-relaxed text-ink/60 pb-5 pr-8">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FAQ SECTION WRAPPER — also client (uses FaqAccordion + translations)
   ───────────────────────────────────────────────────────────────── */

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FaqSection() {
  const t = useTranslations("faq");
  type FaqRaw = { q: string; a: string };
  const items = t.raw("items") as FaqRaw[];

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 sm:py-28 bg-stone"
    >
      <Container size="narrow">

        <ScrollReveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            align="center"
            id="faq-heading"
            className="mb-12"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <FaqAccordion items={items} />
        </ScrollReveal>

      </Container>
    </section>
  );
}
