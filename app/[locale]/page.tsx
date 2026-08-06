import { setRequestLocale } from "next-intl/server";
import { HeroSection }    from "@/components/sections/HeroSection";
import { AboutSection }   from "@/components/sections/AboutSection";
import { ToursSection }   from "@/components/sections/ToursSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { MapSection }     from "@/components/sections/MapSection";

/* Reviews ve FAQ şimdilik gizlendi:
   - Reviews: gerçek müşteri yorumu henüz yok
   - FAQ: içerik hazır olduğunda geri eklenecek          */

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <AboutSection   locale={locale} />
      <ToursSection   locale={locale} />
      <GallerySection locale={locale} />
      <ContactSection locale={locale} />
      <MapSection     locale={locale} />
    </>
  );
}
