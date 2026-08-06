# Eras Tu — Design System Reference

> Single source of truth for all visual decisions.  
> Updated once per phase. Read this before touching any component.

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `deep-sea` | `#0E3A45` | Header, hero bg, primary buttons, SVG fills |
| `lagoon` | `#2FA7A0` | CTAs (hover), links, eyebrow labels, focus ring |
| `sun` | `#D9A441` | Prices, badges, star icons, highlight accents |
| `stone` | `#E8E2D2` | Card surfaces, subtle section backgrounds |
| `seaglass` | `#EFF5F3` | Default page background |
| `ink` | `#10262B` | Body text, headings |

### How to use in Tailwind

```html
<!-- bg -->
<div class="bg-deep-sea">…</div>

<!-- text -->
<p class="text-lagoon">…</p>

<!-- border -->
<div class="border border-sun/30">…</div>

<!-- opacity modifier -->
<div class="bg-deep-sea/90">…</div>
```

---

## Typography

### Fonts

| Variable | Font | Role |
|---|---|---|
| `--font-display` | **Fraunces** | Section headings (h1, h2, h3) only |
| `--font-body` | **Work Sans** | All body copy, buttons, nav, labels |
| `--font-mono` | **IBM Plex Mono** | Data labels: duration, capacity, coordinates |

### Tailwind utilities

```html
<h2 class="font-display text-4xl font-semibold">…</h2>
<p  class="font-body text-base font-light leading-relaxed">…</p>
<span class="font-mono text-xs tracking-widest font-data">36°N 29°E</span>
```

### Scale in use

| Context | Size | Weight | Font |
|---|---|---|---|
| Hero h1 | `5xl–7xl` | `600` | Fraunces |
| Section h2 | `3xl–5xl` | `600` | Fraunces |
| Card h3 | `xl–2xl` | `600` | Fraunces |
| Body | `base` | `300–400` | Work Sans |
| CTA button | `base–lg` | `600` | Work Sans |
| Eyebrow | `xs` | `500` | IBM Plex Mono |
| Data label | `xs–sm` | `400–500` | IBM Plex Mono |

---

## Spacing

Sections use consistent vertical padding:

```html
<!-- Full sections -->
<section class="py-20 sm:py-28">…</section>

<!-- Compact sections (e.g. divider, map) -->
<section class="py-12 sm:py-16">…</section>
```

Horizontal padding is handled by `<Container>` — never add `px-*` to sections directly.

---

## Components

### `<Button>`

```tsx
// Primary — Deep Sea bg, white text, hover → Lagoon
<Button variant="primary" href="https://wa.me/..." external>
  Book on WhatsApp
</Button>

// Secondary — ghost outline
<Button variant="secondary" href="#tours">
  View Tours
</Button>

// Ghost — text-only, subtle
<Button variant="ghost" href="#contact">
  Get in touch →
</Button>

// Sizes: sm | md (default) | lg
<Button size="lg">Reserve Now</Button>
```

### `<Container>`

```tsx
// Default (max-w-6xl) — most sections
<Container>…</Container>

// Wide (max-w-7xl) — hero, gallery
<Container size="wide">…</Container>

// Narrow (max-w-3xl) — FAQ, text-only
<Container size="narrow">…</Container>
```

### `<SectionHeading>`

```tsx
<SectionHeading
  eyebrow="Our Fleet"          // optional — IBM Plex Mono, lagoon
  title="The Eras Tu Boat"     // Fraunces h2
  subtitle="12 guests, fully private, no shared tours."  // optional
  align="center"               // "left" (default) | "center"
/>
```

### `<ScrollReveal>`

```tsx
// Wrap any section content
<ScrollReveal>
  <SectionHeading … />
</ScrollReveal>

// Stagger siblings with delay
<ScrollReveal delay={0}>   <TourCard … /> </ScrollReveal>
<ScrollReveal delay={0.1}> <TourCard … /> </ScrollReveal>
<ScrollReveal delay={0.2}> <TourCard … /> </ScrollReveal>
```

### `<SunkenDivider>`

```tsx
// Between dark hero (Deep Sea) and light about (Seaglass)
<SunkenDivider fromColor="#0E3A45" toColor="#EFF5F3" />

// Between light section and dark — flip vertically
<SunkenDivider fromColor="#EFF5F3" toColor="#0E3A45" flip />
```

---

## Motion Principles

1. **Hero only** — orchestrated fade+rise on page load (one-time, not ambient)
2. **One reveal per section** — scroll-triggered via `<ScrollReveal>`, fires once
3. **No looping animations** — no floating, pulsing, or rotating elements
4. **Hover micro-interactions** — image scale (1.03), CTA underline slide, button color transition
5. **Duration** — reveals: `600ms`, hovers: `250ms`, all use `ease-out-expo`
6. **prefers-reduced-motion** — Framer Motion respects it natively; globals.css adds a CSS fallback

---

## Accessibility

- Every interactive element has a `focus-visible` ring in `lagoon`
- Color contrast: `ink` on `seaglass` → AA+ ✓, white on `deep-sea` → AAA ✓
- Images: meaningful `alt` text required; decorative images use `alt=""`
- `[id]` targets have `scroll-margin-top: 5rem` (sticky header offset)
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- ARIA labels on icon-only buttons (WhatsApp floating button, close menu)

---

## WhatsApp CTA Rules

- Every section that mentions reservations must include a `<Button external href={whatsappLink}>` CTA
- Pre-filled message via `buildWhatsAppLink(message)` from `@/lib/whatsapp`
- The sticky floating button (Phase 3) is always visible on mobile

---

*Last updated: Phase 2 — Design System*
