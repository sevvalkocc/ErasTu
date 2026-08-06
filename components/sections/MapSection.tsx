import { ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/* ─────────────────────────────────────────────────────────────────
   MAP SECTION — Server Component
   Google Maps embed (API key gerektirmez).
   Üçağız Limanı, Demre, Antalya — 36.1856°N, 29.8607°E

   maps.google.com/maps?q=...&output=embed formatı API key
   gerektirmez ve tüm tarayıcılarda çalışır.
   ───────────────────────────────────────────────────────────────── */

interface MapSectionProps {
  locale: string;
}

export async function MapSection({ locale }: MapSectionProps) {
  const t = await getTranslations({ locale, namespace: "map" });

  // API key gerektirmeyen, her zaman çalışan embed URL formatı
  const mapSrc =
    "https://maps.google.com/maps?q=%C3%9C%C3%A7a%C4%9F%C4%B1z+K%C3%B6y%C3%BC%2C+Demre%2C+Antalya%2C+Turkey&z=15&output=embed&hl=" +
    locale;

  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=U%C3%A7a%C4%9F%C4%B1z+Liman%C4%B1%2C+Demre%2C+Antalya%2C+Turkey";

  return (
    <section
      id="map"
      aria-labelledby="map-heading"
      className="bg-seaglass"
    >
      <Container size="wide" className="pt-20 sm:pt-28 pb-20 sm:pb-28">

        {/* Başlık + Yol Tarifi */}
        <ScrollReveal className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-medium tracking-widest uppercase text-lagoon mb-2">
              {locale === "tr" ? "Kekova Üçağız Köyü · Demre / Antalya" : "Kekova Ucagiz Village · Demre / Antalya"}
            </p>
            <h2
              id="map-heading"
              className="font-display text-3xl font-semibold text-ink sm:text-4xl"
            >
              {t("title")}
            </h2>
            <p className="font-body text-sm font-light text-ink/60 mt-2">
              {t("subtitle")}
            </p>
          </div>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "inline-flex items-center gap-2 shrink-0",
              "font-body text-sm font-medium text-lagoon",
              "hover:text-deep-sea transition-colors",
              "underline-offset-4 hover:underline",
            ].join(" ")}
          >
            {t("directionsLabel")}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </ScrollReveal>

        {/* Harita */}
        <ScrollReveal delay={0.1}>
          <div
            className="relative w-full overflow-hidden rounded-lg shadow-xl bg-stone"
            style={{ paddingBottom: "45%" }}
          >
            <iframe
              src={mapSrc}
              title={
                locale === "tr"
                  ? "Eras Tu — Üçağız Limanı konumu"
                  : "Eras Tu — Üçağız Harbour location"
              }
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label={
                locale === "tr"
                  ? "Üçağız Limanı'nı gösteren Google Haritalar"
                  : "Google Maps showing Üçağız Harbour"
              }
            />
          </div>
        </ScrollReveal>

      </Container>
    </section>
  );
}
