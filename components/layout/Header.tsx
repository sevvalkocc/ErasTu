"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useScrolled } from "@/hooks/useScrolled";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   HEADER
   Sticky, scroll-aware navigation bar.

   Behaviour:
   - At the very top of the page: transparent bg with white text
     (sits over the dark Hero section without visual clash).
   - After scrolling 60 px: Deep Sea solid bg + subtle shadow.
   - Desktop: logo | nav links | locale switcher | WhatsApp CTA
   - Mobile: logo | hamburger → MobileMenu overlay

   The logo uses Fraunces italic — the same display font as headings
   — to give the brand a consistent, premium typographic identity.
   ───────────────────────────────────────────────────────────────── */

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(60);
  const t = useTranslations("nav");
  const tWa = useTranslations("whatsapp");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { label: t("about"),   href: "#about"   },
    { label: t("tours"),   href: "#tours"   },
    { label: t("gallery"), href: "#gallery" },
    { label: t("contact"), href: "#contact" },
  ];

  const whatsappHref = buildWhatsAppLink(tWa("prefilledMessage"));

  function switchLocale() {
    const next = locale === "tr" ? "en" : "tr";
    router.replace(pathname, { locale: next });
  }

  return (
    <>
      <header
        className={cn(
          // Layout
          "fixed inset-x-0 top-0 z-30",
          "transition-all duration-500 ease-[var(--ease-out-expo)]",
          // Transparent → Light Seaglass on scroll
          scrolled
            ? "bg-seaglass/92 backdrop-blur-md shadow-sm border-b border-ink/5"
            : "bg-transparent"
        )}
      >
        <Container size="wide">
          <div className="flex h-14 items-center justify-between sm:h-16 pt-2">

            {/* ── Logo ── */}
            <a
              href="#"
              aria-label="Eras Tu — Ana Sayfa"
              className="group flex flex-col leading-none"
            >
              <span
                className={cn(
                  "font-display text-2xl font-semibold italic",
                  "transition-colors duration-300",
                  scrolled
                    ? "text-ink group-hover:text-lagoon"
                    : "text-white group-hover:text-lagoon"
                )}
              >
                Eras Tu
              </span>
              <span
                className={cn(
                  "font-mono text-[0.6rem] tracking-widest uppercase",
                  "transition-colors duration-300",
                  scrolled ? "text-ink/40" : "text-white/50",
                  "group-hover:text-lagoon/70"
                )}
              >
                Private Boat · Kekova
              </span>
            </a>

            {/* ── Desktop Nav ── */}
            <nav
              aria-label="Main navigation"
              className="hidden lg:flex items-center gap-7"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-body text-sm font-medium transition-colors duration-200",
                    scrolled
                      ? "text-ink/80 hover:text-ink"
                      : "text-white/80 hover:text-white",
                    "relative after:absolute after:bottom-[-3px] after:left-0",
                    "after:h-px after:w-0 after:bg-lagoon",
                    "after:transition-[width] after:duration-300",
                    "hover:after:w-full"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* ── Desktop Right: Locale switcher + CTA ── */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Locale toggle */}
              <button
                onClick={switchLocale}
                aria-label={locale === "tr" ? "Switch to English" : "Türkçeye geç"}
                className={cn(
                  "font-mono text-xs font-medium tracking-widest uppercase",
                  "transition-colors duration-200",
                  "border rounded px-2.5 py-1",
                  scrolled
                    ? "text-ink/65 border-ink/15 hover:border-ink/40"
                    : "text-white/50 border-white/20 hover:border-white/50"
                )}
              >
                {locale === "tr" ? "EN" : "TR"}
              </button>

              {/* WhatsApp CTA */}
              <Button
                href={whatsappHref}
                external
                variant="primary"
                size="sm"
                className="bg-lagoon hover:bg-lagoon/85"
              >
                {tWa("cta")}
              </Button>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              className={cn(
                "lg:hidden p-2 transition-colors",
                scrolled ? "text-ink/85 hover:text-ink" : "text-white/80 hover:text-white"
              )}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>

          </div>
        </Container>
      </header>

      {/* Mobile menu (rendered in a portal-like fashion via fixed positioning) */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
