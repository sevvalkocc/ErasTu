# Eras Tu Website — Phase 1 Scaffold

## What's in this phase

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS 4
- `next-intl` bilingual routing: Turkish at `/`, English at `/en`
- Base folder structure for all upcoming phases
- SEO skeleton: `sitemap.ts`, `robots.ts`, hreflang metadata
- `siteConfig` as the single source of truth for business identity (NAP)
- `buildWhatsAppLink()` helper, ready for Phase 3's sticky button

Nothing here is final content or design — Phase 2 defines the visual
system, Phase 4 fills in real sections and copy.

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` (Turkish) and `http://localhost:3000/en`
(English).

## Before Phase 2 starts

Fill in `constants/site-config.ts`:
- `whatsappNumber` (digits only, country code, no leading `+` or `0`)
- `socials.instagram` (optional)

## Deployment

This is a standard Next.js app — connect the repo to Vercel and it will
deploy with zero extra configuration.
