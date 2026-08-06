import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Phone-shot source images benefit from aggressive modern-format conversion.
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
