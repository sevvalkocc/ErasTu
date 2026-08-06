import { MessageCircle, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface ContactSectionProps {
  locale: string;
}

export async function ContactSection({ locale }: ContactSectionProps) {
  const t = await getTranslations({ locale, namespace: "contact" });
  const tWa = await getTranslations({ locale, namespace: "whatsapp" });

  const whatsappHref = buildWhatsAppLink(tWa("prefilledMessage"));

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 sm:py-28 bg-deep-sea"
    >
      <Container size="narrow">
        <div className="flex flex-col items-center text-center gap-8">

          <ScrollReveal>
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              subtitle={t("subtitle")}
              align="center"
              id="contact-heading"
              className="[&_h2]:text-white [&_p]:text-white/60"
            />
          </ScrollReveal>

          {/* Location */}
          <ScrollReveal delay={0.15}>
            <div className="flex items-center gap-2.5 text-white/50">
              <MapPin className="h-4 w-4 text-lagoon shrink-0" aria-hidden="true" />
              <div className="text-left">
                <p className="font-mono text-[0.6rem] tracking-widest uppercase text-white/30 mb-0.5">
                  {t("locationLabel")}
                </p>
                <p className="font-body text-sm text-white/60">
                  {t("location")}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* WhatsApp CTA — the primary conversion element */}
          <ScrollReveal delay={0.25}>
            <Button
              href={whatsappHref}
              external
              variant="primary"
              size="lg"
              className="bg-lagoon hover:bg-lagoon/85 shadow-xl shadow-lagoon/20 gap-3"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {t("whatsappCta")}
            </Button>
          </ScrollReveal>

          {/* Subtle helper text */}
          <ScrollReveal delay={0.3}>
            <p className="font-mono text-xs tracking-wider text-white/25 uppercase">
              {locale === "tr"
                ? "Genellikle birkaç saat içinde yanıt veriyoruz"
                : "We typically reply within a few hours"}
            </p>
          </ScrollReveal>

        </div>
      </Container>
    </section>
  );
}
