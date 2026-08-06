"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLocale } from "next-intl";

/* ─────────────────────────────────────────────────────────────────
   COOKIE CONSENT BANNER
   Lightweight custom implementation — no heavy CMP library needed
   because Google Analytics 4 is the only tracker on this site
   (as stated in the Implementation Plan).

   Behaviour:
   - Appears after a 2s delay (doesn't compete with the hero reveal)
   - Slides up from the bottom on desktop, full-width bar on mobile
   - Accept → sets consent cookie, hides banner, enables GA
   - Decline → hides banner, GA remains disabled
   - "Learn more" → lightweight inline explanation
   - Banner state persisted in localStorage (key: "erastu-consent")
   ───────────────────────────────────────────────────────────────── */

const CONSENT_KEY = "erastu-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const locale = useLocale();
  const isTr = locale === "tr";

  useEffect(() => {
    // Only show if consent hasn't been given/refused yet
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 2200);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "granted");
    setVisible(false);
    // Signal GA4 consent (if GA is added in Phase 8)
    if (typeof window !== "undefined" && "gtag" in window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "denied");
    setVisible(false);
  }

  const copy = {
    message: isTr
      ? "Bu site, deneyiminizi iyileştirmek için Google Analytics kullanır. Kabul etmek ister misiniz?"
      : "This site uses Google Analytics to improve your experience. Do you accept?",
    accept: isTr ? "Kabul Et" : "Accept",
    decline: isTr ? "Reddet" : "Decline",
    close: isTr ? "Kapat" : "Close",
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label={isTr ? "Çerez bildirimi" : "Cookie notice"}
          aria-live="polite"
          className={[
            // Position — bottom bar
            "fixed bottom-0 inset-x-0 z-50",
            "sm:bottom-6 sm:inset-x-auto sm:left-6 sm:max-w-sm sm:rounded-lg",
            // Appearance
            "bg-ink text-white",
            "border-t border-white/10 sm:border sm:border-white/10",
            "p-5 shadow-2xl",
          ].join(" ")}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Close button */}
          <button
            onClick={decline}
            aria-label={copy.close}
            className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>

          {/* Message */}
          <p className="font-body text-sm text-white/70 leading-relaxed pr-6 mb-4">
            {copy.message}
          </p>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={accept}
              className={[
                "flex-1 rounded-md py-2 px-4",
                "bg-lagoon text-white text-sm font-semibold font-body",
                "hover:bg-lagoon/85 transition-colors",
              ].join(" ")}
            >
              {copy.accept}
            </button>
            <button
              onClick={decline}
              className={[
                "flex-1 rounded-md py-2 px-4",
                "border border-white/20 text-white/60 text-sm font-body",
                "hover:border-white/50 hover:text-white transition-colors",
              ].join(" ")}
            >
              {copy.decline}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
