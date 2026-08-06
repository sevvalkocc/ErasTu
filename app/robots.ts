import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Disallow internal Next.js paths — nothing to index here
        disallow: ["/_next/", "/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    // Explicit host declaration helps some crawlers resolve canonical domain
    host: siteConfig.url,
  };
}
