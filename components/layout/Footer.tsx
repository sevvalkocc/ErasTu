import { MapPin, Phone, Instagram } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/constants/site-config";
import { buildWhatsAppLink } from "@/lib/whatsapp";

/* ─────────────────────────────────────────────────────────────────
   FOOTER — Server Component
   NAP data (Name, Address, Phone) mirrors the schema.org structured
   data and Google Business Profile — consistency here is a direct
   local-SEO requirement (plan section 12: Local SEO).

   Three-column layout on desktop:
     Brand + tagline | Navigation | Contact (NAP + socials)
   Single column (stacked) on mobile.
   ───────────────────────────────────────────────────────────────── */

interface FooterProps {
  locale: string;
}

export async function Footer({ locale }: FooterProps) {
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tWa = await getTranslations({ locale, namespace: "whatsapp" });

  const whatsappHref = buildWhatsAppLink(tWa("prefilledMessage"));

  const navLinks = [
    { label: tNav("about"),   href: "#about"   },
    { label: tNav("tours"),   href: "#tours"   },
    { label: tNav("gallery"), href: "#gallery" },
    { label: tNav("faq"),     href: "#faq"     },
    { label: tNav("contact"), href: "#contact" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-ink text-white/70"
      aria-label="Site footer"
    >
      <Container size="wide">

        {/* ── Main footer grid ── */}
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-3">

          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
            <a href="#" aria-label="Eras Tu — Ana Sayfa" className="w-fit">
              <span className="font-display text-3xl font-semibold italic text-white">
                Eras Tu
              </span>
            </a>
            <p className="font-mono text-xs tracking-widest uppercase text-lagoon">
              Private Boat · Kekova
            </p>
            <p className="font-body text-sm leading-relaxed text-white/50 max-w-xs">
              {locale === "tr"
                ? "Üçağız'dan kalkan özel tekne turlarıyla Kekova'nın eşsiz güzelliklerini keşfedin."
                : "Discover the hidden beauty of Kekova on a private boat tour departing from Üçağız."}
            </p>

            {/* Instagram */}
            {siteConfig.socials.instagram && (
              <a
                href={`https://instagram.com/${siteConfig.socials.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="mt-2 flex items-center gap-2 text-white/40 hover:text-lagoon transition-colors w-fit"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
                <span className="font-body text-sm">@{siteConfig.socials.instagram}</span>
              </a>
            )}
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-xs font-medium tracking-widest uppercase text-white/40">
              {locale === "tr" ? "Sayfalar" : "Navigation"}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/60 hover:text-lagoon transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact / NAP */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-xs font-medium tracking-widest uppercase text-white/40">
              {locale === "tr" ? "İletişim" : "Contact"}
            </h3>

            {/* Address */}
            <address className="not-italic flex flex-col gap-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-lagoon" aria-hidden="true" />
                <span className="font-body text-sm text-white/60 leading-snug">
                  {siteConfig.address.line},<br />
                  {siteConfig.address.district} / {siteConfig.address.region},<br />
                  {siteConfig.address.country}
                </span>
              </div>

              {/* WhatsApp */}
              {siteConfig.whatsappNumber && (
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-lagoon" aria-hidden="true" />
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-white/60 hover:text-lagoon transition-colors"
                  >
                    +{siteConfig.whatsappNumber}
                  </a>
                </div>
              )}
            </address>

            {/* WhatsApp CTA */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "mt-2 inline-flex items-center gap-2",
                "rounded-md bg-lagoon/10 border border-lagoon/30",
                "px-4 py-2.5 w-fit",
                "font-body text-sm font-medium text-lagoon",
                "hover:bg-lagoon/20 hover:border-lagoon/60",
                "transition-colors duration-200",
              ].join(" ")}
            >
              {tWa("cta")}
            </a>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/30">
            © {currentYear} Eras Tu. {locale === "tr" ? "Tüm hakları saklıdır." : "All rights reserved."}
          </p>
          <p className="font-mono text-xs text-white/20 tracking-wider">
            36°N 29°E — Kekova, Antalya
          </p>
        </div>

      </Container>
    </footer>
  );
}
