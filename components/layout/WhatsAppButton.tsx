"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";

/* ─────────────────────────────────────────────────────────────────
   WHATSAPP STICKY BUTTON
   Always-visible floating action button — the primary conversion
   element on the site. Lives outside the normal page flow (fixed
   positioning) so it persists through every section.

   Design decisions:
   - WhatsApp green (#25D366) is universally recognised — we keep
     it rather than using our palette, so users instantly know what
     it does.
   - Desktop: pill shape with icon + label text.
   - Mobile: circle icon only (label hidden) to save screen space.
   - Entrance: delayed fade+slide from bottom-right after 1.5 s,
     so it doesn't compete with the hero reveal on first load.
   - Hover: subtle scale + shadow lift.
   ───────────────────────────────────────────────────────────────── */

export function WhatsAppButton() {
  const t = useTranslations("whatsapp");
  const href = buildWhatsAppLink(t("prefilledMessage"));

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("cta")}
      onClick={() => trackWhatsAppClick("Sticky Floating WhatsApp Button")}
      className={[
        // Position
        "fixed bottom-6 right-5 z-50",
        "sm:bottom-8 sm:right-8",
        // Shape — pill on md+, circle on mobile
        "flex items-center gap-2.5",
        "h-14 w-14 rounded-full",
        "sm:w-auto sm:rounded-full sm:px-5",
        // Color — WhatsApp green (intentional brand exception)
        "bg-[#25D366] text-white",
        // Shadow
        "shadow-lg hover:shadow-xl",
        // Transition
        "transition-all duration-[250ms] ease-[var(--ease-out-expo)]",
        "hover:scale-105 active:scale-95",
        // Focus
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]",
      ].join(" ")}
      // Entrance animation — delayed so hero reveal plays first
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <MessageCircle
        className="h-6 w-6 shrink-0"
        strokeWidth={2}
        aria-hidden="true"
      />
      {/* Label — hidden on mobile, visible on sm+ */}
      <span className="hidden sm:inline font-body font-semibold text-sm whitespace-nowrap">
        {t("cta")}
      </span>
    </motion.a>
  );
}
