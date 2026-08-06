import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site-config";

/* ─────────────────────────────────────────────────────────────────
   SITEMAP
   Generates /sitemap.xml consumed by Google Search Console.
   Each URL includes hreflang alternates (tr/en) which helps Google
   correctly associate the two language versions — a direct local
   SEO requirement from the implementation plan.

   Priority notes:
   - 1.0: homepage (highest crawl priority)
   - changefreq "monthly": content won't change often
   ───────────────────────────────────────────────────────────────── */

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // Turkish (default, no prefix)
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: {
        languages: {
          tr: siteConfig.url,
          en: `${siteConfig.url}/en`,
        },
      },
    },
    // English
    {
      url: `${siteConfig.url}/en`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: {
        languages: {
          tr: siteConfig.url,
          en: `${siteConfig.url}/en`,
        },
      },
    },
  ];
}
