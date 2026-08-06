import { Clock, Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { SunkenDivider } from "@/components/ui/SunkenDivider";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { Tour } from "@/types/tour";

interface ToursSectionProps {
  locale: string;
}

export async function ToursSection({ locale }: ToursSectionProps) {
  const t = await getTranslations({ locale, namespace: "tours" });
  const tWa = await getTranslations({ locale, namespace: "whatsapp" });

  const tours = t.raw("items") as Tour[];

  return (
    <>
      <SunkenDivider fromColor="#EFF5F3" toColor="#0E3A45" flip />

      <section
        id="tours"
        aria-labelledby="tours-heading"
        className="py-20 sm:py-28 bg-deep-sea"
      >
        <Container>

          {/* Heading */}
          <ScrollReveal>
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              subtitle={t("subtitle")}
              align="center"
              id="tours-heading"
              className="[&_h2]:text-white [&_p]:text-white/60"
            />
          </ScrollReveal>

          {/* Tour cards */}
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {tours.map((tour, i) => {
              const waMessage = tWa("prefilledMessage") + ` (${tour.title})`;
              const waHref = buildWhatsAppLink(waMessage);

              return (
                <ScrollReveal key={tour.id} delay={i * 0.1}>
                  <article
                    className={[
                      "flex flex-col h-full",
                      "rounded-lg border border-white/10",
                      "bg-white/5 backdrop-blur-sm",
                      "p-7",
                      "hover:border-lagoon/40 hover:bg-white/10",
                      "transition-colors duration-300",
                    ].join(" ")}
                    aria-label={tour.title}
                  >
                    {/* Duration badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="h-4 w-4 text-lagoon shrink-0" aria-hidden="true" />
                      <span className="font-mono text-xs font-medium tracking-wider text-lagoon">
                        {tour.duration}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl font-semibold text-white mb-3">
                      {tour.title}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-sm font-light text-white/60 leading-relaxed mb-5 flex-1">
                      {tour.description}
                    </p>

                    {/* Includes */}
                    <ul className="flex flex-col gap-1.5 mb-7">
                      {tour.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-lagoon shrink-0" aria-hidden="true" />
                          <span className="font-body text-xs text-white/50">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button
                      href={waHref}
                      external
                      variant="secondary"
                      size="sm"
                      className="border-lagoon/40 text-lagoon hover:border-lagoon hover:bg-lagoon/10 hover:text-lagoon w-full justify-center"
                    >
                      {t("bookCta")}
                    </Button>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      <SunkenDivider fromColor="#0E3A45" toColor="#EFF5F3" />
    </>
  );
}
