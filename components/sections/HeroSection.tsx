"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";

/* ─────────────────────────────────────────────────────────────────
   HERO SECTION

   Video tam 100dvh kaplar → her taraftan eşit kırpılır (object-cover
   center). Bar video'nun ÜSTÜNDEki absolute overlay'dir — video
   yüksekliğini hiç etkilemez.

   Layout:
   ┌─────────────────────────────────────────────────┐  ← üst kırp
   │                                                 │
   │          VİDEO — tam 100dvh, merkezli           │
   │                                                 │
   │                  ↓ scroll                       │
   ├─────────────────────────────────────────────────┤
   │  FROSTED BAR — absolute, video üstünde overlay  │
   └─────────────────────────────────────────────────┘  ← alt kırp
   ───────────────────────────────────────────────────────────────── */

export function HeroSection() {
  const t = useTranslations("hero");
  const tWa = useTranslations("whatsapp");
  const whatsappHref = buildWhatsAppLink(tWa("prefilledMessage"));

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative h-[100dvh] overflow-hidden"
    >
      {/* ── Video — tam 100dvh, üst/alttan eşit kırpılır ── */}
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/boat-5.jpg"
        className="absolute -top-[4%] left-0 h-[108%] w-full object-cover object-top"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.1 }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </motion.video>

      {/* ── Global dim — tüm ekranı homojen söndürür (sınırları yok eder) ── */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(16, 38, 43, 0.32)" }}
        aria-hidden="true"
      />

      {/* ── Alt yumuşak geçiş gradyanı — bir sonraki bölüme yumuşak geçiş için ── */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "25%",
          background:
            "linear-gradient(to top, rgba(14,58,69,0.50) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Scroll göstergesi ── */}
      <motion.a
        href="#about"
        aria-label="Aşağı kaydır"
        className="absolute right-8 bottom-32 text-white/40 hover:text-white transition-colors z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="h-7 w-7" aria-hidden="true" />
        </motion.div>
      </motion.a>

      {/* ── Yüzen Dikey Panel — dikey ortalanmış, daha dar ve kompakt ── */}
      <motion.div
        className="absolute left-5 right-5 sm:right-auto sm:left-10 top-1/2 w-auto sm:w-[310px] md:w-[340px] z-10 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col"
        style={{
          background: "rgba(10, 32, 38, 0.74)",
          backdropFilter: "blur(26px)",
          WebkitBackdropFilter: "blur(26px)",
        }}
        initial={{ opacity: 0, x: -24, y: "-50%" }}
        animate={{ opacity: 1, x: 0, y: "-50%" }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="p-5 sm:p-6 flex flex-col text-white gap-4">
          
          {/* Üst grup: Eyebrow + Location */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <span className="font-mono text-[0.65rem] font-semibold tracking-widest uppercase text-white">
              {t("eyebrow")}
            </span>
            <span className="font-mono text-[0.55rem] tracking-wider text-white/70">
              {t("location")}
            </span>
          </div>

          {/* Orta grup: Kompakt ve Belirgin Başlık + Açıklama */}
          <div className="flex flex-col gap-2">
            <h1
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold italic leading-[1.2] text-sunshine"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}
            >
              {t("headline")}
            </h1>
            <p className="font-body text-xs sm:text-sm font-semibold text-white leading-relaxed">
              {t("subheadline")}
            </p>
          </div>

          {/* Alt grup: Butonlar */}
          <div className="flex flex-col gap-2 pt-3 border-t border-white/10">
            <Button
              href={whatsappHref}
              external
              variant="primary"
              size="md"
              className="bg-lagoon hover:bg-lagoon/85 shadow-lg shadow-lagoon/20 w-full justify-center"
              onClick={() => trackWhatsAppClick("Hero CTA")}
            >
              {tWa("cta")}
            </Button>
            <Button
              href="#tours"
              variant="secondary"
              size="md"
              className="border-white/35 text-white hover:border-white hover:bg-white/10 w-full justify-center"
            >
              {t("exploreCta")}
            </Button>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
