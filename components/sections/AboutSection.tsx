import Image from "next/image";
import { Users, MapPin, Anchor } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/* ─────────────────────────────────────────────────────────────────
   ABOUT SECTION — Server Component
   Two-column layout: photo left, copy + stats right.
   Stats use IBM Plex Mono as data labels per design system.
   ───────────────────────────────────────────────────────────────── */

interface AboutSectionProps {
  locale: string;
}

export async function AboutSection({ locale }: AboutSectionProps) {
  const t = await getTranslations({ locale, namespace: "about" });

  const stats = [
    { value: t("capacity"), label: t("capacityLabel"), icon: Users },
    { value: t("area"),     label: t("areaLabel"),     icon: MapPin },
    { value: t("type"),     label: t("typeLabel"),      icon: Anchor },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 sm:py-28 bg-seaglass"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">

          {/* ── Photo ── */}
          <ScrollReveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/images/boat-1.jpg"
                alt="Eras Tu private boat anchored in Kekova waters"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-[1.03] transition-transform duration-700 ease-out"
                priority={false}
              />
              {/* Corner badge */}
              <div className="absolute bottom-4 left-4 bg-deep-sea/90 backdrop-blur-sm text-white rounded-md px-3 py-2">
                <p className="font-mono text-[0.6rem] tracking-widest uppercase text-lagoon">
                  {locale === "tr" ? "Kekova Üçağız Köyü" : "Kekova Ucagiz Village"}
                </p>
                <p className="font-mono text-xs font-medium text-white/80">
                  Demre / Antalya
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Copy ── */}
          <div className="flex flex-col gap-8">
            <ScrollReveal delay={0.1}>
              <SectionHeading
                eyebrow={t("eyebrow")}
                title={t("title")}
                subtitle={t("subtitle")}
                id="about-heading"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="font-body text-base font-light leading-relaxed text-ink/70">
                {t("description")}
              </p>
            </ScrollReveal>

            {/* Stats row */}
            <ScrollReveal delay={0.3}>
              <div className="grid grid-cols-3 gap-4 border-t border-ink/10 pt-8">
                {stats.map(({ value, label, icon: Icon }) => (
                  <div key={label} className="flex flex-col gap-1.5">
                    <Icon className="h-5 w-5 text-lagoon" aria-hidden="true" />
                    <p className="font-mono text-base font-medium text-ink">
                      {value}
                    </p>
                    <p className="font-mono text-[0.6rem] tracking-widest uppercase text-ink/40">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

        </div>
      </Container>
    </section>
  );
}
