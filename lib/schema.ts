import { siteConfig } from "@/constants/site-config";

/* ─────────────────────────────────────────────────────────────────
   SCHEMA.ORG STRUCTURED DATA GENERATORS
   Used by layout.tsx (injected as JSON-LD <script> tags).

   Two schemas:
   1. LocalBusiness — tells Google who and where we are.
      Consistent with Google Business Profile NAP (Name, Address,
      Phone) as required by local SEO plan (section 12).
   2. TouristTrip — tells Google what product we sell.
      Increases eligibility for rich results in travel searches.
   ───────────────────────────────────────────────────────────────── */

export function buildLocalBusinessSchema(locale: string) {
  const isTr = locale === "tr";

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    description: isTr
      ? "Kaptan Ahmet ve eşinin işlettiği 12 kişilik aile teknemiz Eras Tu ile Kekova Üçağız bölgesinin eşsiz koylarında günlük ve saatlik özel turlar."
      : "Private daily and hourly boat tours in Kekova and Üçağız on a 12-guest family boat run by Captain Ahmet and his wife.",
    url: siteConfig.url,
    telephone: siteConfig.whatsappNumber
      ? `+${siteConfig.whatsappNumber}`
      : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line,
      addressLocality: siteConfig.address.district,
      addressRegion: siteConfig.address.region,
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 36.1856,
      longitude: 29.8607,
    },
    hasMap: "https://maps.google.com/?q=Üçağız+Limanı,Demre,Antalya",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",
      ],
      opens: "07:00",
      closes: "20:00",
    },
    currenciesAccepted: "TRY, EUR, USD",
    paymentAccepted: "Cash, Bank Transfer",
    priceRange: "$$",
    image: `${siteConfig.url}/images/boat-1.jpg`,
    sameAs: [
      siteConfig.socials.instagram
        ? `https://instagram.com/${siteConfig.socials.instagram}`
        : null,
    ].filter(Boolean),
    areaServed: {
      "@type": "Place",
      name: "Kekova, Antalya, Turkey",
    },
    knowsLanguage: ["tr", "en"],
  };
}

export function buildTouristTripSchema(locale: string) {
  const isTr = locale === "tr";

  const tours = [
    {
      name: isTr ? "Günübirlik Kekova Turu" : "Daily Kekova Boat Tour",
      description: isTr
        ? "Kaptan Ahmet ve eşinin işlettiği, öğle yemeği ve ikramlar dahil 10:00 - 17:00 saatleri arası Akvaryum, Tersane, Gökkaya, Kocakarı, Esmeralda, Kaleköy ve Batıkşehir rotalı özel tekne turu."
        : "7-hour private boat tour run by Captain Ahmet and his wife, from 10:00 AM to 5:00 PM, including lunch, visiting Aquarium, Tersane, Gökkaya, Kocakarı, Esmeralda, Kaleköy, and the Sunken City.",
      duration: "PT7H",
    },
    {
      name: isTr ? "Saatlik Kısa Turlar" : "Hourly Custom Boat Tours",
      description: isTr
        ? "İstediğiniz rotada, dilediğiniz koyda vakit geçirebileceğiniz esnek saatlik tekne kiralama seçeneği."
        : "Hourly private boat rental option with a flexible route and custom duration.",
      duration: "PT1H",
    },
  ];

  return tours.map((tour) => ({
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description: tour.description,
    touristType: ["Family", "Couple", "Group"],
    provider: {
      "@type": "LocalBusiness",
      "@id": `${siteConfig.url}/#localbusiness`,
      name: siteConfig.name,
    },
    itinerary: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Place",
            name: "Üçağız Harbour",
            geo: { "@type": "GeoCoordinates", latitude: 36.1856, longitude: 29.8607 },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Place",
            name: isTr ? "Batık Şehir (Kekova)" : "Sunken City (Kekova)",
            geo: { "@type": "GeoCoordinates", latitude: 36.1747, longitude: 29.8933 },
          },
        },
      ],
    },
    duration: tour.duration,
    availableLanguage: ["tr", "en"],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}${locale === "en" ? "/en" : ""}#contact`,
    },
  }));
}
