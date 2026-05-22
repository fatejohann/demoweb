# Design

## Theme

Light. Warm ivory ground with a deep terracota primary — clinic waiting room under warm afternoon light, calm and confident.

## Color

Strategy: Committed. Terracota carries 35–50% of the hero and key surfaces.

```css
--c-bg:            oklch(0.97 0.012 75);   /* marfil cálido */
--c-bg-alt:        oklch(0.93 0.018 72);   /* crema profunda */
--c-primary:       oklch(0.44 0.10 36);    /* terracota oscura */
--c-primary-dark:  oklch(0.35 0.09 34);
--c-primary-light: oklch(0.91 0.038 55);   /* melocotón suave */
--c-accent:        oklch(0.60 0.09 55);    /* cobre/ámbar */
--c-text:          oklch(0.20 0.025 45);   /* casi-negro cálido */
--c-text-muted:    oklch(0.50 0.022 50);
--c-border:        oklch(0.87 0.015 72);
--c-white:         oklch(0.99 0.004 90);
--c-footer-bg:     oklch(0.17 0.020 45);   /* carbón cálido */
```

## Typography

Libre Baskerville (headings) + Karla (body). Brand voice: arcilla, bisturí, tinto.

```css
--f-heading: 'Libre Baskerville', Georgia, serif;
--f-body:    'Karla', system-ui, -apple-system, sans-serif;
```

Google Fonts: `Libre+Baskerville:ital,wght@0,400;0,700;1,400` and `Karla:wght@300;400;500;600;700`

Scale:
- Hero h1: `clamp(2.5rem, 5vw, 4.25rem)`
- Section h2: `clamp(1.875rem, 3.5vw, 2.75rem)`
- Section tags: `0.75rem` uppercase, `letter-spacing: 0.14em`

## Spacing

- Section padding: `clamp(80px, 10vw, 120px)`
- Container: `1200px` max, `clamp(20px, 4vw, 40px)` side padding
- Radii: `--r-sm: 6px`, `--r: 14px`, `--r-lg: 24px`
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` — ease-out-quart
- Duration: `0.28s`

## Components

### Buttons
Two variants: `btn--primary` (terracota fill) and `btn--ghost` (terracota outline). Sizes: default (13px/28px pad) and `--lg` (16px/36px pad). Full-width via `--full`.

### Service rows
Numbered list. `grid-template-columns: 3rem 1fr auto`. Featured row uses `--c-primary-light` background. Standard rows have subtle hover tint. No emoji icons — numbers only.

### Testimonials
Pull-quote layout: `grid-template-columns: 3fr 2fr`. Primary testimonial has large `::before` quote mark in terracota. Two secondary testimonials stacked in a flex column.

### About figure
`position: relative; overflow: hidden`. Figcaption positioned at bottom with terracota gradient (`linear-gradient(to top, oklch(0.44 0.10 36 / 0.96), transparent)`). "15 años" in Libre Baskerville at 3.25rem.

### Proof bar
Full-width terracota band. Flex row with 1px rgba dividers. On mobile: 2×2 CSS grid.

### Reveal animation
`.reveal` class: `opacity: 0; transform: translateY(22px)`. Added `.is-visible` via IntersectionObserver at `threshold: 0.08`. Stagger via `--delay` CSS custom property. Respects `prefers-reduced-motion`.

## Breakpoints

- `≤1024px`: tablet — 2-col testimonials and footer
- `≤768px`: mobile — single column hero (image hidden), stacked sections, hamburger nav
- `≤480px`: small mobile — stacked CTA buttons, single-column footer
