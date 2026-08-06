import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  // TR is served without a prefix (/), EN gets a prefix (/en)
  // so the primary local-search market keeps clean URLs.
  localePrefix: {
    mode: "as-needed",
    prefixes: {
      en: "/en",
    },
  },
});
