import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/* ─────────────────────────────────────────────────────────────────
   GALLERY SECTION — Server Component
   Masonry-inspired grid using CSS grid with defined row spans.
   Uses all 10 real photos (5 boat + 5 kekova).

   Layout (desktop):
   ┌───────┬───┬───┐
   │       │ 2 │ 3 │
   │  1    ├───┼───┤
   │ tall  │ 4 │ 5 │
   └───┬───┴───┴───┤
   │ 6 │ 7 │ 8     │
   └───┴───┴───────┘
   ───────────────────────────────────────────────────────────────── */

const photos = [
  { src: "/images/kekova-1.jpg", alt: "Kekova waters aerial view", span: "row-span-2" },
  { src: "/images/boat-2.jpg",   alt: "Eras Tu boat deck" },
  { src: "/images/kekova-2.jpg", alt: "Kekova Sunken City ruins" },
  { src: "/images/boat-3.jpg",   alt: "Swimming in Kekova bay" },
  { src: "/images/kekova-3.jpg", alt: "Kaleköy Castle from the sea" },
  { src: "/images/boat-4.jpg",   alt: "Boat guests enjoying the tour" },
  { src: "/images/kekova-4.jpg", alt: "Turquoise waters of Kekova" },
  { src: "/images/boat-5.jpg",   alt: "Eras Tu boat at anchor" },
  { src: "/images/kekova-5.jpg", alt: "Sunset over Kekova", span: "col-span-2" },
  { src: "/images/boat-1.jpg",   alt: "Eras Tu private boat" },
];

interface GallerySectionProps {
  locale: string;
}

export async function GallerySection({ locale }: GallerySectionProps) {
  const t = await getTranslations({ locale, namespace: "gallery" });

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="py-20 sm:py-28 bg-seaglass"
    >
      <Container size="wide">

        <ScrollReveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            align="center"
            id="gallery-heading"
            className="mb-12"
          />
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[220px]">
          {photos.map((photo, i) => (
            <ScrollReveal
              key={photo.src}
              delay={i * 0.05}
              className={photo.span ?? ""}
            >
              <div className="relative h-full w-full overflow-hidden rounded-lg group">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  loading={i < 4 ? "eager" : "lazy"}
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-deep-sea/0 group-hover:bg-deep-sea/20 transition-colors duration-500" />
              </div>
            </ScrollReveal>
          ))}
        </div>

      </Container>
    </section>
  );
}
