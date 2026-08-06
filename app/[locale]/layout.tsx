import type { Metadata } from "next";
import { Fraunces, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/constants/site-config";
import { buildLocalBusinessSchema, buildTouristTripSchema } from "@/lib/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CookieBanner } from "@/components/layout/CookieBanner";
import "@/styles/globals.css";

/* ─────────────────────────────────────────────────────────────────
   FONTS
   next/font/google loads fonts at build time (zero network round-
   trip at runtime), injects a CSS variable on <html>, and generates
   a subset-optimised font file — all without FOUC.

   Fraunces  → display / headings only (italic optical size axis)
   Work Sans → body text (optimised for digital reading)
   IBM Plex Mono → data labels (duration, capacity, coordinates)
   ───────────────────────────────────────────────────────────────── */

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  weight: ["400", "500"],
});

/* ─────────────────────────────────────────────────────────────────
   STATIC PARAMS
   ───────────────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/* ─────────────────────────────────────────────────────────────────
   METADATA — Enhanced for Phase 5 SEO
   • Full Open Graph with image
   • Twitter Cards
   • hreflang alternates
   • Keywords (local SEO)
   • Canonical URL
   ───────────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const canonicalUrl = locale === "tr" ? siteConfig.url : `${siteConfig.url}/en`;

  const keywords =
    locale === "tr"
      ? [
          "Kekova tekne turu",
          "Üçağız tekne turu",
          "Kekova özel tekne",
          "Kekova özel tur",
          "Batık Şehir turu",
          "Kaleköy tekne",
          "Demre tekne turu",
          "Kekova aile turu",
          "özel tekne Antalya",
        ]
      : [
          "Kekova boat tour",
          "Kekova private boat",
          "Üçağız boat tour",
          "private boat tour Kekova",
          "Kekova Sunken City tour",
          "Kaleköy boat tour",
          "Demre boat tour",
          "private boat Turkey",
          "Kekova family boat trip",
        ];

  return {
    metadataBase: new URL(siteConfig.url),
    title: t("title"),
    description: t("description"),
    keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,

    // Canonical + hreflang
    alternates: {
      canonical: canonicalUrl,
      languages: {
        tr: siteConfig.url,
        en: `${siteConfig.url}/en`,
      },
    },

    // Open Graph
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: locale === "tr" ? ["en_US"] : ["tr_TR"],
      type: "website",
      images: [
        {
          url: `${siteConfig.url}/images/kekova-1.jpg`,
          width: 1200,
          height: 630,
          alt:
            locale === "tr"
              ? "Kekova'da Eras Tu özel tekne turu"
              : "Eras Tu private boat tour in Kekova",
        },
      ],
    },

    // Twitter / X Cards
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${siteConfig.url}/images/kekova-1.jpg`],
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/* ─────────────────────────────────────────────────────────────────
   LAYOUT
   ───────────────────────────────────────────────────────────────── */

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Build JSON-LD schemas
  const localBusinessSchema = buildLocalBusinessSchema(locale);
  const touristTripSchemas = buildTouristTripSchema(locale);

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${workSans.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        {/* ── JSON-LD Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        {touristTripSchemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        {/* ── Google Analytics (GA4) with consent management ── */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              id="ga-consent-default"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  
                  // Initialize consent settings
                  var consentState = {
                    'analytics_storage': 'denied'
                  };
                  
                  try {
                    var storedConsent = localStorage.getItem('erastu-consent');
                    if (storedConsent === 'granted') {
                      consentState.analytics_storage = 'granted';
                    }
                  } catch (e) {}
                  
                  gtag('consent', 'default', consentState);
                `,
              }}
            />
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        <NextIntlClientProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-lagoon focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
          >
            {locale === "tr" ? "İçeriğe atla" : "Skip to content"}
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer locale={locale} />
          <WhatsAppButton />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
