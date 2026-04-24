# Design System: Spparow Films — Industrial Video Production Portfolio

## 1. Visual Theme & Atmosphere
A premium, white-surface portfolio with cinematic restraint and industrial precision. The atmosphere is gallery-airy with confident, structured layouts — like walking through a high-end production studio's showroom. Every section breathes with generous whitespace while maintaining editorial authority. The site conveys scale, credibility, and craftsmanship without visual noise.

- **Density:** 4 — Gallery Airy with purposeful content blocks
- **Variance:** 5 — Offset Asymmetric, editorial but structured
- **Motion:** 4 — Controlled CSS transitions, no choreography

The mood is: clinical white surfaces + industrial weight + cinematic confidence. Think premium architecture portfolio meets manufacturing catalog.

## 2. Color Palette & Roles
- **Warm Parchment** (#FAFAF8) — Primary background surface, the dominant canvas
- **Pure Surface** (#FFFFFF) — Card fills, content containers, modal backgrounds
- **Deep Charcoal** (#111111) — Primary text, headlines, navigation links
- **Weathered Steel** (#5F5F5F) — Secondary text, descriptions, metadata, subheadings
- **Whisper Border** (#E8E8E4) — Structural borders, card outlines, section dividers (1px hairlines)
- **Soft Linen** (#F3F3EF) — Alternating section backgrounds, subtle surface differentiation
- **Industrial Blue** (#1F4B99) — Single accent for CTAs, active nav states, hover highlights, play indicators. Saturation controlled. Used sparingly — buttons, small indicators, focus rings only.

### Color Rules
- The page is 85% warm parchment and pure white. Color enters only through accent touches.
- No gradients on backgrounds. No multicolor UI. No neon. No purple.
- Never use pure black (#000000) — always Deep Charcoal (#111111).
- Accent appears on: primary buttons, play icons, active filter tabs, hover underlines. Nowhere else.

## 3. Typography Rules
- **Display/Headlines:** Manrope — Bold weight (700-800), track-tight (-0.02em), controlled scale. Hero at clamp(2.5rem, 5vw, 4.5rem). Section headings at clamp(2rem, 3.5vw, 3rem). Hierarchy through weight and spatial position, not screaming size.
- **Body:** Manrope — Regular weight (400), relaxed leading (1.7), max 65 characters per line. 16px-18px range. Weathered Steel color for descriptions.
- **Labels/Small:** Manrope — Medium weight (500), 12px-14px, uppercase tracking (0.08em) for eyebrow labels and category tags.
- **Button Text:** Manrope — Semi-bold (600), 14px-16px.
- **Fallback Stack:** Arial, Helvetica, sans-serif

### Typography Anti-Patterns
- No decorative fonts. No serif fonts anywhere.
- No Inter (per skill directive).
- Keep text blocks short — no paragraph exceeds 3 lines on desktop.
- Headings are bold and clean, never thin or wispy.

## 4. Component Stylings

### Buttons
- **Primary:** Industrial Blue (#1F4B99) fill, white text, generously rounded corners (12px radius). Tactile -1px translateY on active press. Hover: darken 8%, subtle scale(1.02). No outer glow. No neon shadow.
- **Secondary:** Transparent fill, Deep Charcoal border (1px), dark text. Hover: fill with Soft Linen (#F3F3EF). Same radius as primary.
- **Ghost/Text:** No border, no fill. Accent color text with subtle arrow indicator. Hover: underline slide-in.
- Padding: 14px 28px for standard, 16px 32px for hero CTAs.

### Cards (Service & Portfolio)
- Pure Surface (#FFFFFF) fill with Whisper Border (#E8E8E4) 1px outline.
- Radius: 20px-24px (generous, premium feel).
- No heavy shadows — use extremely diffused box-shadow: 0 2px 16px rgba(0,0,0,0.04) maximum.
- Prefer border over shadow for elevation cues.
- Hover state on portfolio cards: subtle image zoom (scale 1.03), play icon reveal with fade-in opacity transition.
- Internal padding: 0 for image area, 24px for content area.

### Navigation
- Sticky header, 76px-84px height.
- Initial state: transparent background over hero video.
- Scroll state: Pure Surface (#FFFFFF) background + backdrop-blur(12px) + bottom Whisper Border (1px).
- Nav links: Deep Charcoal, Manrope 500 weight, 15px. Active state: Industrial Blue color.
- CTA button in header: Industrial Blue filled, compact size.

### Contact Form
- Label above input, Manrope 500, 14px, Weathered Steel color.
- Input fields: Pure Surface fill, Whisper Border outline, 12px radius, 48px height.
- Focus state: Industrial Blue border (2px), subtle blue ring glow (0 0 0 3px rgba(31,75,153,0.12)).
- Error text below in muted red. No floating labels.

### Portfolio Filter Tabs
- Horizontal pill tabs. Inactive: Soft Linen fill, Weathered Steel text.
- Active: Industrial Blue fill, white text. Smooth 300ms transition.
- Spacing: 8px gap between tabs.

### Video Modal/Lightbox
- Full-screen overlay with Deep Charcoal at 85% opacity.
- Centered video container, max-width 900px, 16:9 ratio.
- Clean close button (X) top-right, white, 44px tap target.
- Smooth fade-in on open, fade-out on close (300ms ease).

## 5. Layout Principles
- **Container:** Max-width 1280px, centered. Content width 1200px ideal.
- **Horizontal Padding:** 24px on all breakpoints, expanding to 48px on larger screens.
- **Section Spacing:** Desktop: 96px-112px vertical padding. Tablet: 72px-88px. Mobile: 48px-64px. Use clamp() for fluid scaling.
- **Grid:** CSS Grid, 12-column on desktop. Services: 3-column grid. Portfolio: 2 large + 4 small asymmetric grid. Process: 4-column.
- **No overlapping elements.** Every element occupies its own clear spatial zone.
- **Hero layout:** Full-width video background, content card positioned left or center-left with frosted/semi-transparent treatment.
- **Services layout:** Section heading left-aligned, description right-aligned on same row. Cards in 3x2 grid below.
- **About layout:** Two-column split — image left, copy block right.
- **Contact layout:** Two-column split — CTA copy left, form right.

### Responsive Collapse
- **Desktop (>1024px):** Full grid layouts, editorial spacing, side-by-side arrangements.
- **Tablet (768px-1024px):** Services to 2-column, portfolio to 2-column, process to 2x2 grid.
- **Mobile (<768px):** Single column everything. Hero simplified. Cards stack vertically. Form goes full-width below CTA copy. Minimum touch targets 44px.
- No horizontal scroll on any breakpoint — this is a critical failure.
- Typography scales via clamp(). Body text never below 1rem.

## 6. Motion & Interaction
- **Scroll Reveal:** Sections fade-in + translateY(20px) on viewport entry. Duration: 600ms, ease-out. Staggered by 100ms per element within a section.
- **Header Transition:** Background and border transition 300ms ease on scroll threshold.
- **Portfolio Hover:** Image scale(1.03) over 400ms ease. Play icon fades in. Cursor changes to pointer.
- **Button Hover:** Background darken + translateY(-1px) over 200ms ease.
- **Smooth Anchor Scroll:** CSS scroll-behavior: smooth. Active nav highlight tracks scroll position.
- **Modal:** Overlay fades in 300ms. Content slides up 200ms with ease-out.
- **Filter Tabs:** Background/color transition 300ms ease.

### Motion Constraints
- Animate ONLY transform and opacity. Never animate top, left, width, height.
- No heavy parallax. No continuous background animations. No flashy sliders.
- Only ONE autoplay video (hero). All other videos play on user interaction.
- Respect prefers-reduced-motion: disable all motion, show static fallbacks.

## 7. Anti-Patterns (Banned)
- No emojis anywhere on the site
- No Inter font
- No generic serif fonts
- No pure black (#000000)
- No neon or outer-glow shadows
- No oversaturated accent colors
- No gradient text on headers
- No custom mouse cursors
- No overlapping elements — clean spatial separation always
- No 3-column equal card layout for features (services uses 3-col but each card is unique content, not equal marketing feature blocks)
- No generic placeholder names ("John Doe", "Acme")
- No fake statistics or invented metrics — if real data unavailable, omit the section
- No AI copywriting clichés ("Elevate", "Seamless", "Unleash", "Next-Gen", "Cutting-edge")
- No "Scroll to explore" text, no bouncing scroll arrows
- No broken image links — use placeholder stills with descriptive alt text
- No dark theme — this is a white/off-white premium site
- No multiple accent colors — one accent only (Industrial Blue)
- No stock corporate imagery (handshakes, office smiles)
- No cluttered carousels as primary portfolio display
- No heavy parallax or continuous background motion
- No fake testimonials or fabricated reviews
- No more than two font families
