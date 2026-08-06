# Eras Tu — Website Implementation Plan (Final)

## 1. Project Summary

**Eras Tu** is a private family-run boat operating tours in the Kekova / Üçağız region (Demre, Antalya, Turkey), 12-guest capacity. The website's sole conversion goal is WhatsApp reservations — no online booking, no payments, no blog, no user accounts. It is a bilingual (Turkish + English), single-page, SEO-driven, performance-first site.

**Confirmed decisions:**
- Languages: Turkish (default) + English
- Imagery: phone-shot photos available (will need careful compression/treatment, not studio-grade)
- Starting point: domain and accounts already secured — beginning at Phase 1 (Project Setup)

## 2. Tech Stack & Method Choices

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | Best-in-class for SEO (SSR/SSG), image optimization, and i18n routing |
| Language | TypeScript | Type safety, fewer runtime bugs, easier long-term maintenance |
| Styling | Tailwind CSS 4 | Fast iteration, small production CSS footprint, native Next.js 15 integration |
| i18n | `next-intl` with `app/[locale]/...` routing | Produces separate indexable `/tr/` and `/en/` URLs (best practice for local SEO in two languages), integrates cleanly with App Router and metadata API |
| Icons | Lucide | Lightweight, tree-shakeable, consistent visual language |
| Motion | Framer Motion | Used sparingly — scroll reveals and micro-interactions only, per design principle of restraint |
| Images | `next/image` | Automatic format conversion (AVIF/WebP), responsive sizing — essential given phone-shot source images |
| Maps | Google Maps Embed (iframe) | No API key/cost needed for a simple embed |
| Analytics | Google Analytics 4 + WhatsApp click event tracking | Click-to-WhatsApp is the actual conversion — must be tracked as an event, not just pageviews |
| Hosting | Vercel | Native Next.js support, edge caching, zero-config SSL |
| Consent | Lightweight custom cookie banner (no heavy CMP library) | Minimal JS footprint; GA is the only tracker, so a full consent-management platform is overkill |

## 3. Site Architecture

Single page per locale, structured as sections rendered in this order:

```
Hero → About → Tours → Gallery → Social Proof (reviews) → Why Choose Us → FAQ → Contact → Map → Footer
```

Sticky WhatsApp CTA button persists across the entire scroll.

## 4. Project Structure

```
app/
  [locale]/
    layout.tsx        (locale-aware layout, metadata, hreflang)
    page.tsx           (assembles sections)
  sitemap.ts
  robots.ts
components/
  ui/                  (Button, Container, SectionHeading — Phase 2)
  sections/            (Hero, About, Tours, Gallery, Reviews, WhyUs, FAQ, Contact, MapEmbed — Phase 4)
  layout/              (Header, Footer, WhatsAppButton, CookieBanner)
hooks/
lib/                   (whatsapp link builder, schema.org generators)
constants/             (tours data, site config, nav links)
types/
messages/
  tr.json
  en.json
public/images/
styles/
  globals.css
```

## 5. SEO Approach

- **Keywords:** Kekova Boat Tour, Kekova Private Boat Tour, Üçağız Boat Tour, Kekova Tekne Turu, Üçağız Tekne Turu (mirrored per locale)
- **Structured data:** `LocalBusiness` / `TouristTrip` schema with consistent NAP (Name, Address, Phone) across site and Google Business Profile
- **hreflang:** `tr`/`en` alternates declared in metadata for every page
- **Technical:** `sitemap.xml`, `robots.txt`, Open Graph + Twitter Card metadata, semantic HTML5 landmarks

## 6. Performance Approach

- Server-rendered static page (no client-side data fetching needed)
- `next/image` with explicit sizes, lazy loading below the fold
- Minimal client JavaScript — Framer Motion components loaded only where used
- Target: Lighthouse 90+ across Performance, Accessibility, Best Practices, SEO

## 7. Phased Delivery

### Phase 1 — Project Setup *(starting now)*
Next.js 15 + TypeScript scaffold, Tailwind config, `next-intl` i18n routing (`tr`/`en`), base folder structure, base layout with metadata/hreflang skeleton, `package.json` with correct dependencies.

*Note on environment:* code generation happens in a sandbox without internet access, so `npm install` cannot be run here. All files are handed over ready to install and run locally or on Vercel.

### Phase 2 — Design System *(finalized)*
A visual identity grounded in what actually makes Kekova distinctive — the submerged Lycian ruins visible through the water — rather than generic "boat/sea" decoration.

- **Palette:** Deep Sea `#0E3A45`, Lagoon `#2FA7A0`, Sun `#D9A441`, Stone `#E8E2D2`, Seaglass `#EFF5F3`, Ink `#10262B`
- **Type:** Fraunces (display, used sparingly for headings), Work Sans (body), IBM Plex Mono (data labels — duration, capacity, coordinates)
- **Signature element:** "Sunken Line" — a custom SVG section divider where faint ancient column silhouettes rise beneath a horizon-line wave as it scrolls into view, directly referencing Kekova's Sunken City
- **Motion principles:** one orchestrated fade+rise on page load (hero only), single scroll-triggered reveal per section (no looping/ambient animation), restrained hover micro-interactions (image scale, CTA underline slide), full `prefers-reduced-motion` support
- **Base components:** `Button`, `Container`, `SectionHeading`, `ScrollReveal` wrapper, `SunkenDivider`
- Full token reference kept in `DESIGN.md` at the project root for consistency through Phase 4

### Phase 3 — Header / Navigation / Footer
Sticky header with locale switcher, mobile menu, sticky WhatsApp button with pre-filled message, footer with NAP info consistent with schema data.

### Phase 4 — Homepage Sections
Hero, About, Tours (with per-tour WhatsApp CTA), Gallery, Social Proof/Reviews, Why Choose Us, FAQ, Contact, Map — built with real content and the phone-shot images, treated through `next/image` optimization.

### Phase 5 — SEO & Local Visibility
Metadata, Open Graph, structured data (schema.org), `robots.txt`, `sitemap.xml`, hreflang, Google Business Profile setup (NAP alignment with site), cookie consent banner.

### Phase 6 — Optimization
Lighthouse audit and fixes, image optimization pass, accessibility audit (contrast, alt text, keyboard nav, focus states, reduced-motion), Core Web Vitals verification.

### Phase 7 — Deployment
GitHub repository, Vercel project, domain connection, SSL verification.

### Phase 8 — Google Services
Search Console verification + sitemap submission, GA4 setup with WhatsApp click-through as a tracked conversion event.

### Phase 9 — Marketing
Google Ads (local search campaigns), review-collection strategy (post-trip WhatsApp follow-up), optional social media embed (Instagram feed).

## 8. Working Rule

For every phase: explain the approach and architecture first → implement only that phase → do not proceed to the next phase automatically → wait for approval. This rule stays in effect from Phase 1 onward.