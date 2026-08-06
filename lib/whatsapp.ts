import { siteConfig } from "@/constants/site-config";
declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}
/**
 * Builds a wa.me deep link with an optional pre-filled message.
 * Centralized so every CTA across the site (Hero, Tours, sticky button,
 * Contact) produces a consistent, trackable link.
 */
export function buildWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Tracks a lead generation conversion event in Google Analytics 4 when a visitor
 * clicks a WhatsApp call-to-action button.
 */
export function trackWhatsAppClick(label: string): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "generate_lead", {
      event_category: "Lead Generation",
      event_label: label,
      value: 1,
      currency: "TRY",
    });
  }
}
