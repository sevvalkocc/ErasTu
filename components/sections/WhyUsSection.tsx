import { Shield, Heart, Compass, Map } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface WhyUsSectionProps {
  locale: string;
}

type WhyItem = {
  title: string;
  description: string;
};

const icons = [Shield, Heart, Compass, Map];

export async function WhyUsSection({ locale }: WhyUsSectionProps) {
  const t = await getTranslations({ locale, namespace: "whyus" });
  const items = t.raw("items") as WhyItem[];

  return (
    <section
      id="whyus"
      aria-labelledby="whyus-heading"
      className="py-20 sm:py-28 bg-seaglass"
    >
      <Container>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">

          {/* Left: heading + description */}
          <div>
            <ScrollReveal>
              <SectionHeading
                eyebrow={t("eyebrow")}
                title={t("title")}
                id="whyus-heading"
              />
            </ScrollReveal>

            {/* Large accent number */}
            <ScrollReveal delay={0.15}>
              <div className="mt-10 flex items-end gap-4 border-l-2 border-lagoon pl-6">
                <p className="font-display text-7xl font-semibold text-lagoon/20 leading-none select-none">
                  12
                </p>
                <div>
                  <p className="font-mono text-sm font-medium text-ink">
                    {locale === "tr" ? "Kişiye kadar" : "Guests max"}
                  </p>
                  <p className="font-mono text-xs tracking-widest uppercase text-ink/40">
                    {locale === "tr" ? "Tamamen özel" : "Always private"}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: 4 reason cards (2×2 grid) */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {items.map((item, i) => {
              const Icon = icons[i] ?? Shield;
              return (
                <ScrollReveal key={item.title} delay={i * 0.1}>
                  <div
                    className={[
                      "flex flex-col gap-3",
                      "p-6 rounded-lg",
                      "bg-white border border-ink/5",
                      "shadow-sm hover:shadow-md hover:border-lagoon/20",
                      "transition-all duration-300",
                    ].join(" ")}
                  >
                    <div className="h-10 w-10 rounded-md bg-lagoon/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-lagoon" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm font-light text-ink/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>

      </Container>
    </section>
  );
}
