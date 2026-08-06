/**
 * Single source of truth for business identity data.
 * Used across metadata, schema.org structured data, footer, and the
 * WhatsApp link builder — keeping NAP (Name, Address, Phone) consistent
 * everywhere is a direct local-SEO requirement (Phase 5).
 */
export const siteConfig = {
  name: "Eras Tu",
  url: "https://erastuboat.com",
  whatsappNumber: "905327670073",
  address: {
    line: "Üçağız Limanı",
    district: "Demre",
    region: "Antalya",
    country: "Turkey",
  },
  capacityGuests: 12,
  socials: {
    instagram: "kekovaahmetkaptan",
  },
} as const;
