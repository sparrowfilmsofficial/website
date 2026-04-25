# Design System: Sparrow Films — Brutalist Gen-Z Aesthetic

## 1. Visual Theme & Atmosphere
A premium, brutalist, and highly kinetic portfolio tailored for internet culture and Gen-Z aesthetics. The atmosphere is unapologetically bold, using stark contrast, massive typography, and raw industrial elements. It feels less like a corporate gallery and more like a high-end streetwear drop or a hyped tech launch.

- **Density:** 5 — Tight, overlapping, and immersive blocks
- **Variance:** 5 — Asymmetric grids, bento layouts, and unpredictable scaling
- **Motion:** 5 — High-impact CSS transitions, hover sweeps, kinetic text

The mood is: dark mode default + neon accents + unapologetic scale + naked typography.

## 2. Color Palette & Roles
- **Deep Void** (#111111) — Primary background surface, the dominant canvas. It's an off-black that absorbs light without looking washed out.
- **Electric Yellow** (#FACC15) — Primary accent. Used for text strokes, hover reveals, badges, and the main CTA. Acts as a highlighter.
- **Pure Surface** (#FFFFFF) — Primary text, headlines.
- **Weathered Steel** (#5F5F5F) — Secondary text, metadata, descriptions, subheadings.
- **Parchment / Soft White** (#FCFCFA / #FAFAF8) — Alternating section backgrounds (like the Testimonials section) to create sudden, high-contrast breaks in the dark theme.

### Color Rules
- The page is heavily anchored in Deep Void (#111111) with stark white text.
- Electric Yellow (#FACC15) is the *only* accent color. It is used aggressively but strategically.
- High contrast is mandatory.

## 3. Typography Rules
- **Display/Headlines:** Naked, massive typography. Often uppercase, heavily tracked (-0.05em to tighter), and scaled via viewport units (e.g., `text-[12vw]`). Use text-strokes for hollow, transparent text effects.
- **Body:** Clean, legible sans-serif. Relaxed leading, generally 16px-22px range depending on viewport.
- **Labels/Small:** Bold, uppercase, generously tracked (0.2em) for eyebrows, metadata, and tags (e.g., `tracking-[0.2em] text-[10px]`).

### Typography Anti-Patterns
- No generic serif fonts.
- No thin or wispy display text. If it's a headline, it's bold/black.
- Never use emojis.

## 4. Component Stylings

### Buttons & CTAs
- **Primary:** High-impact. Electric Yellow fill, Deep Void text, rounded pill shapes. Bold uppercase text. Include directional arrows that translate on hover.
- **Interactive Links:** Use text-strokes, or underline slide-ins. Hover effects often involve color inversion or adding a text stroke while making the fill transparent.

### Cards (Bento Grids & Process Pillars)
- Use Bento Box layouts with rounded corners (24px to 48px radius depending on screen size).
- Cards often have `bg-[#111111]` or `bg-[#1A1A1A]`.
- Hover states are dramatic: elements scale up (`scale-110`), grayscale images turn to color, or yellow sweeps (`translate-y-0`) fill the background.
- Gradients are used as overlays on images (`bg-gradient-to-t from-black/80 to-transparent`) to ensure text legibility.

### Navigation
- Sticky header, ultra-minimal.
- Transparent background initially, gaining a dark semi-transparent blur (`backdrop-blur-md`) when scrolled.
- Links are subdued (`text-white/60`) and turn solid white when active, with a pill-shaped background highlight.
- Mobile menu occupies the full screen with massive text.

### Contact Form
- **Natural Language "Madlibs" Style:** The form is a massive sentence with inline inputs (`border-b-2`, transparent backgrounds).
- Placeholder text is bold and blends into the sentence.
- Dropdowns use native styling but are heavily customized to fit the raw aesthetic.

## 5. Layout Principles
- **Grid:** Heavily relies on asymmetric CSS grids (Bento layouts) and flex-grow pillars.
- **Horizontal Scroll:** Uses native CSS snap-scrolling (`snap-x snap-mandatory`) for the mobile portfolio to mimic social media interactions (TikTok/Reels format).
- **Scale:** Elements are oversized. Quotes, names, and section headers dominate the viewport.

### Responsive Collapse
- **Desktop (>1024px):** Complex Bento grids, hover-expansion pillars, full-bleed kinetic typography.
- **Tablet (768px-1024px):** Grids simplify to 2-columns.
- **Mobile (<768px):** Single column. Hero simplifies. Process pillars become stacked cards. Horizontal carousels use native touch scrolling. Text strokes and massive fonts scale down via viewport units or clamp.

## 6. Motion & Interaction
- **Scroll Reveal:** Elements fade and slide up (`translateY(40px)`) smoothly as they enter the viewport using IntersectionObserver.
- **Hover Sweeps:** Absolute positioned divs that slide in to fill a card on hover.
- **Image Interactions:** Grayscale to color, subtle zoom (`scale-105`), and opacity reveals.
- **Footer Kinetic Text:** A massive "SPARROW" text block that changes from solid to text-stroke with a background image clip on hover.
- **Reduced Motion:** Fully respected via media queries, disabling heavy transitions for accessibility.

## 7. Anti-Patterns (Banned)
- No emojis anywhere on the site.
- No generic placeholder names ("John Doe", "Acme") or fake statistics.
- No AI copywriting clichés ("Elevate", "Seamless", "Unleash", "Next-Gen", "Cutting-edge").
- No "Scroll to explore" or "Swipe to explore" filler text.
- No broken image links — use `picsum.photos` or verified Unsplash URLs.
- No corporate stock photography (handshakes, office smiles).
- No multiple accent colors — stick strictly to Electric Yellow.
- No cluttered carousels with visible scrollbars — hide the scrollbars for a clean look.
