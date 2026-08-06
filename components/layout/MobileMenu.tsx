"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";

/* ─────────────────────────────────────────────────────────────────
   MOBILE MENU
   Full-screen overlay that slides down from the top on mobile.
   Rendered via AnimatePresence so the exit animation plays before
   unmount.

   Traps focus while open (via the overlay close button) and
   restores body scroll on close.
   ───────────────────────────────────────────────────────────────── */

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
}

export function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  const t = useTranslations("whatsapp");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const whatsappHref = buildWhatsAppLink(t("prefilledMessage"));

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function switchLocale() {
    const nextLocale = locale === "tr" ? "en" : "tr";
    router.replace(pathname, { locale: nextLocale });
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.nav
            className={[
              "fixed inset-x-0 top-0 z-50",
              "flex flex-col",
              "bg-deep-sea text-white",
              "min-h-[60dvh] max-h-[100dvh] overflow-y-auto",
              "px-6 pb-10 pt-6",
            ].join(" ")}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Mobile navigation"
          >
            {/* Top row: logo + close */}
            <div className="flex items-center justify-between mb-10">
              <span className="font-display text-2xl font-semibold italic">
                Eras Tu
              </span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 rounded-md text-white/70 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Nav links */}
            <ul className="flex flex-col gap-1 flex-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    onClick={onClose}
                    className={[
                      "block py-3.5 border-b border-white/10",
                      "font-body text-xl font-medium text-white/90",
                      "hover:text-lagoon transition-colors",
                    ].join(" ")}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Bottom actions */}
            <div className="mt-8 flex flex-col gap-3">
              <Button
                href={whatsappHref}
                external
                variant="primary"
                size="lg"
                className="w-full bg-lagoon hover:bg-lagoon/90 justify-center"
                onClick={onClose}
              >
                {t("cta")}
              </Button>

              {/* Locale switcher */}
              <button
                onClick={switchLocale}
                className={[
                  "w-full py-3 rounded-md border border-white/20",
                  "font-mono text-sm font-medium tracking-widest uppercase",
                  "text-white/60 hover:text-white hover:border-white/50",
                  "transition-colors",
                ].join(" ")}
              >
                {locale === "tr" ? "🇬🇧 English" : "🇹🇷 Türkçe"}
              </button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
