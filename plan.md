# Spparow Films - One Page Website Build Plan

## Read this first
Use this file as the **single source of truth** for designing and building the website.
Build a **fully responsive, premium, clean, white-theme, one-page portfolio website** for **Spparow Films** using **HTML, CSS, and JavaScript only**.
Do **not** copy the reference websites exactly. Take inspiration from their structure and polish, but create a unique layout for Spparow Films.

The website should feel:
- premium
- cinematic
- industrial
- clean
- modern
- professional
- consistent

This is **not** a typical digital agency site.
This is a **video production portfolio website** focused on:
- industrial shoots
- factory / plant shoots
- corporate videos
- product / machinery videos
- event and launch coverage

---

## Project Summary
- **Brand Name:** Spparow Films
- **Site Type:** One-page portfolio + lead generation website
- **Tech Stack:** HTML, CSS, JavaScript
- **Goal:** Show work professionally and generate inquiries
- **Target Audience:** Manufacturing brands, industrial companies, factory owners, corporate teams, B2B businesses
- **Mandatory Theme:** White / off-white premium theme
- **Mandatory Hero Requirement:** Hero section must have a background loop video
- **Tone of Copy:** Confident, sharp, modern, trustworthy, concise

---

## Reference Direction
Take inspiration from these references only for direction:
- IndieVisual -> proof-led structure, portfolio-first thinking, service/category presentation
- ADKO -> bold typography, clean premium spacing, punchy headline style
- Starvave -> clear one-page flow with work, process, reviews, and contact

### Important
- Do not clone any reference.
- Do not use the same arrangement one-to-one.
- Final result should feel more minimal, more industrial, and more premium.
- Keep the layout cleaner than the references.

---

## Core Design Direction
The overall design should feel like:
- 85 percent white / off-white surface
- dark text
- subtle borders
- minimal shadows
- one controlled accent color
- real visuals only
- limited motion
- strong portfolio focus

### Overall Mood
Imagine a mix of:
- industrial precision
- cinematic storytelling
- premium presentation
- minimal editorial layout

---

## Typography
### Recommended Option
Use **Manrope** for the entire website for maximum consistency.

### Optional Pairing
- Headings: Sora or Manrope
- Body: Inter

### Final Recommendation
To keep the site consistent and easy to build, use:
- **Primary Font:** Manrope, sans-serif
- **Fallback:** Arial, Helvetica, sans-serif

### Typography Scale
- Hero Heading: 56px to 72px desktop
- Section Heading: 36px to 48px desktop
- Body Text: 16px to 18px
- Small Labels: 12px to 14px
- Button Text: 14px to 16px

### Typography Style Notes
- Headings should be bold and clean
- Avoid decorative fonts
- Maintain strong line height and spacing
- Keep text blocks short

---

## Color Palette
Use this exact style direction.

### Primary Colors
- Background: `#FAFAF8`
- White Surface: `#FFFFFF`
- Primary Text: `#111111`
- Secondary Text: `#5F5F5F`
- Border: `#E8E8E4`
- Soft Section Background: `#F3F3EF`

### Accent Color
Choose only **one** accent and use it sparingly.
Preferred accent:
- Steel Blue: `#1F4B99`

Optional alternative accent:
- Muted Copper: `#A56A43`

### Accent Usage
Accent color should be used only for:
- buttons
- small indicators
- hover highlights
- play button icon
- active filter / nav states

### Avoid
- neon colors
- too many gradients
- multicolor UI
- oversaturated brand colors

---

## Layout System
### Container
- Max width: `1280px`
- Content width: `1200px` ideal
- Horizontal padding: `24px`

### Grid
- Use a 12-column responsive grid on desktop
- Collapse cleanly for tablet and mobile

### Section Spacing
- Desktop: `96px` to `112px` top and bottom
- Tablet: `72px` to `88px`
- Mobile: `48px` to `64px`

### Radius
- Card radius: `20px` to `24px`

### Shadows
- Very soft only
- Prefer borders over heavy shadows

### Borders
- Light hairline borders are encouraged for premium feel

---

## Website Structure
Build the website in this exact order.

1. Header
2. Hero
3. Trust / Proof Strip
4. Services
5. Featured Work / Portfolio
6. Industries We Work With
7. Process
8. About / Why Spparow Films
9. Testimonials
10. Contact CTA
11. Footer

This sequence is important.
The website should first create impact, then trust, then show work, then explain value, then capture inquiry.

---

## 1) Header
### Goal
Create a clean sticky navigation that feels premium and simple.

### Layout
- Left: brand logo / text logo
- Right: nav links + CTA button

### Nav Items
- Home
- Work
- Services
- Process
- About
- Contact

### CTA Button
- Label: `Start a Project` or `Get a Quote`

### Behavior
- Sticky header
- Transparent to slightly solid on load if hero is visible
- On scroll, add subtle blur + white background + bottom border

### Style Notes
- Keep height around 76px to 84px
- Minimal, elegant, not bulky

---

## 2) Hero Section
### Goal
Immediately communicate premium industrial video production with strong visual impact.

### Mandatory Requirement
Hero must include a **background looping video**.

### Layout
- Full width
- Minimum height: `92vh`
- Background: cinematic loop video
- Foreground: white or frosted content card placed left or center-left
- Optional proof chips / stats near bottom of hero

### Recommended Hero Content
#### Eyebrow Label
`Industrial • Corporate • Commercial Production`

#### Main Heading
`Industrial Films, Corporate Shoots & Visual Stories That Build Trust.`

#### Subheading
`Spparow Films creates cinematic industrial, factory, corporate and brand videos that make businesses look sharp, credible and professional.`

#### CTA Buttons
- Primary: `View Work`
- Secondary: `Discuss Project`

#### Proof Chips
- Industrial Shoots
- Corporate Films
- Pan-India Production
- Fast Turnaround

### Hero Visual Direction
The loop video should include slow premium shots such as:
- factory exterior drone shot
- machinery close-up
- welding sparks
- assembly line movement
- operators at work
- control panel / dashboard shot
- camera crew on site
- final polished product shot

### Hero Video Rules
- No audio playback
- Use muted autoplay loop
- Include poster image fallback
- Keep the video cinematic, not chaotic
- Avoid fast random cuts
- Use darker or controlled footage so foreground text remains readable
- Add a soft white overlay or gradient for readability

### Technical Rules
- Use `autoplay`, `muted`, `loop`, `playsinline`
- Use both `webm` and `mp4` if possible
- Include `poster` attribute
- Use reduced-motion fallback
- Only the hero video should load immediately
- Other media should lazy load

---

## 3) Trust / Proof Strip
### Goal
Add immediate credibility right after the hero.

### Layout
A slim section with one of these options:

#### Option A
- left: short trust statement
- right: client logos

#### Option B
- centered industry tags if logos are unavailable

### Suggested Trust Line
`Trusted for industrial, corporate and branded productions.`

### Suggested Industry Tags
- Manufacturing
- Engineering
- Infrastructure
- Warehousing
- Energy
- Pharma
- Corporate

### Style Notes
- Keep it slim and clean
- Avoid flashy marquees unless done very subtly
- Static or gently animated logos only

---

## 4) Services Section
### Goal
Clearly show what kinds of shoots and films the company does.

### Layout
- Section heading on left
- Short description on right
- Below: 6-card grid
- Desktop: 3 columns x 2 rows
- Mobile: 1 column

### Section Heading
`What We Shoot`

### Intro Text
`From factory floors to polished corporate films, we produce visuals that help brands communicate scale, quality and trust.`

### Service Cards
Use these exact six service categories:
1. Industrial Films
2. Factory / Plant Shoots
3. Corporate Videos
4. Product / Machinery Videos
5. Safety / Training Videos
6. Event & Launch Coverage

### Card Content Pattern
Each card should have:
- image or still frame
- service title
- one-line description
- subtle arrow or play indicator

### Service Copy Suggestions
#### Industrial Films
`Powerful visuals for plants, processes, machinery and scale.`

#### Factory / Plant Shoots
`Sharp on-site coverage designed for manufacturing and operations.`

#### Corporate Videos
`Professional brand and leadership videos with strong visual credibility.`

#### Product / Machinery Videos
`Detailed films that explain function, quality and performance.`

#### Safety / Training Videos
`Clear and structured content for internal communication and training.`

#### Event & Launch Coverage
`Clean event documentation for launches, inaugurations and business milestones.`

### Visual Notes
- Use real stills from video frames
- Keep thumbnails consistent
- Avoid stock vectors or generic illustrations

---

## 5) Featured Work / Portfolio
### Goal
This is the most important section of the entire website.
It should visually prove the quality of work.

### Critical Rule
Do **not** make the portfolio the website's weak area.
This section should be the strongest and most premium part of the page.

### Layout
- Section heading + intro
- Filter tabs at top
- Two large featured project cards
- Four smaller project cards below
- Total: 6 to 8 projects only

### Suggested Filters
- All
- Industrial
- Corporate
- Product
- Events

### Featured Card Content
Each project card should include:
- thumbnail / poster frame
- project title
- project category
- location or industry
- one-line project summary
- click action to open modal / lightbox with video embed

### Portfolio Section Heading
`Selected Work`

### Intro Text
`A focused look at industrial, corporate and commercial productions crafted to present brands with clarity and impact.`

### Sample Project Card Format
- Title: `Factory Profile Film`
- Category: `Industrial`
- Meta: `Manufacturing • Ahmedabad`
- Description: `A cinematic plant profile designed to communicate scale, process and operational quality.`

### Interaction Notes
- Hover = slight image zoom + play icon reveal
- Click = open clean modal or lightbox
- Use smooth transitions only

### Important Rules
- Do not use a cluttered carousel as the main portfolio
- Do not show 20 projects on one page
- Maintain consistent aspect ratio
- Make thumbnails visually strong
- Keep captions concise

---

## 6) Industries We Work With
### Goal
Position Spparow Films as specialized, not generic.

### Layout
- Left: heading + small paragraph
- Right: industry pills or compact cards
- Optional stats row below

### Section Heading
`Industries We Work With`

### Intro Text
`We create films for teams that need their business to look precise, capable and trustworthy on screen.`

### Industries
- Manufacturing
- Heavy Engineering
- Infrastructure
- Automotive
- Warehousing
- Industrial Equipment
- Pharma / Labs
- Corporate Offices

### Optional Stats
Only use real data.
If real numbers are not available, do not invent them.
Possible stat placeholders:
- Projects Delivered
- Industries Served
- Cities Covered

---

## 7) Process Section
### Goal
Show that the team works in a professional and structured way.

### Layout
- Section heading centered or left aligned
- 4-step horizontal timeline on desktop
- stacked cards on mobile

### Section Heading
`How We Work`

### Four Steps
1. Understand
2. Plan
3. Shoot
4. Edit & Deliver

### Step Details
#### 1. Understand
`We understand the brief, objective, audience and the environment before production begins.`

#### 2. Plan
`We prepare scripts, shot lists, production flow and execution details for a smoother shoot.`

#### 3. Shoot
`Our crew handles on-site filming with attention to framing, movement, safety and consistency.`

#### 4. Edit & Deliver
`We refine the visuals through editing, color, sound and revisions before final delivery.`

### Visual Notes
- Use minimal line icons
- Use subtle connecting line or numbered layout
- Keep cards white with soft borders

---

## 8) About / Why Spparow Films
### Goal
Briefly explain the brand's approach and differentiators.
Do not make this section too long.

### Layout
- Left: behind-the-scenes image or on-set still
- Right: copy block + 3 value points

### Section Heading
`Built to Make Industrial Brands Look Modern, Credible and Memorable.`

### Body Copy
`Spparow Films combines planning, visual execution and polished post-production to create films that do more than document work — they elevate how a business is perceived.`

### Three Value Points
- Story-led industrial filmmaking
- Professional on-ground execution
- Fast and polished delivery

### Optional Extra Line
`From factory floors to boardrooms, we build visuals that help businesses present themselves with confidence.`

---

## 9) Testimonials
### Goal
Add social proof in a controlled premium way.

### Layout
- 2 or 3 quote cards
- clean white cards with soft border

### Important Rule
Use only real testimonials.
If no testimonials are available, replace this section with:
- client logo strip
- or a short credibility statement

### Example Card Structure
- quote
- person name
- role
- company

### Style Notes
- Keep quote length short
- Avoid fake stars and fake ratings

---

## 10) Contact CTA Section
### Goal
Convert interest into inquiry.
This section should feel clear, direct and premium.

### Layout
- Left: strong CTA heading and short copy
- Right: compact contact form
- On mobile: stacked

### Section Heading
`Let's Create a Film That Shows the True Scale of Your Brand.`

### Supporting Copy
`Tell us about your project, shoot requirement or brand film brief, and we will get back with the right production approach.`

### Suggested Form Fields
- Name
- Company
- Phone
- Project Type
- Message

### Additional Contact Info
- email
- phone
- location
- WhatsApp CTA

### Design Notes
- Keep the section bright and minimal
- Optional: use slightly darker background block inside a white section
- Do not make it visually louder than the portfolio

---

## 11) Footer
### Layout
- Left: logo / brand name
- Center or right: nav links
- Bottom: copyright line

### Suggested Content
- Brand name
- small nav repeat
- social links if available
- email / phone if needed

### Footer Style
- simple
- minimal
- small text
- clean top border

---

## Motion and Interaction Rules
The website should feel alive but controlled.

### Allowed Motion
- header state change on scroll
- smooth anchor scrolling
- subtle reveal animation on section entry
- portfolio hover animation
- button hover movement or fill
- modal open / close animation

### Not Allowed
- heavy parallax
- crazy text effects
- noisy continuous animations
- excessive background motion
- multiple autoplay videos at once
- flashy sliders everywhere

---

## Visual Asset Plan
Gather or prepare these assets.

### Hero
- 1 loop montage video, 12 to 18 seconds
- 1 fallback poster image

### Portfolio
- 6 to 8 strong thumbnails
- 2 featured projects with premium thumbnails
- embedded video links for modal playback

### About
- 1 behind-the-scenes image
- 1 on-set team still if available

### Trust
- 6 to 10 client logos or industry labels

### Testimonials
- 2 to 3 real quotes if available

### Icons
- minimal line icons for process and minor UI only

### Important
Use **real production visuals**.
Do not rely on generic stock photos like:
- handshake images
- random office people smiling
- fake studio shots

---

## Copy Style Rules
### The copy should be
- short
- sharp
- premium
- confident
- business-friendly
- non-gimmicky

### Avoid
- slang-heavy text
- over-creative agency buzzwords
- too much jargon
- long paragraphs
- exaggerated fake claims

### Good Direction
Write like a production studio that understands both visuals and business credibility.

---

## Responsive Behavior
### Desktop
- portfolio grid should feel editorial and premium
- hero content can sit left on a content card
- services in 3 columns
- process in 4 columns

### Tablet
- reduce hero heading size
- portfolio can shift to 2-column layout
- services in 2 columns

### Mobile
- hero becomes simpler and more readable
- CTA buttons stack cleanly
- all cards become one-column
- avoid oversized spacing
- maintain readability over visual drama

### Mobile Priority
The site must still feel premium on mobile.
Do not treat mobile as a broken reduced version.

---

## Accessibility and Performance Rules
### Accessibility
- proper heading hierarchy
- strong color contrast
- keyboard-friendly buttons and modal
- visible focus states
- alt text for images
- reduced-motion fallback

### Performance
- compress images properly
- optimize hero video
- lazy load non-critical media
- do not use huge JS libraries
- avoid render-blocking assets where possible

### Hero Video Guidance
- keep video size controlled
- use poster before playback
- use efficient formats
- no audio needed

---

## HTML Structure Suggestion
Use semantic HTML similar to this:

```html
<header class="site-header"></header>

<main>
  <section id="hero"></section>
  <section id="proof"></section>
  <section id="services"></section>
  <section id="work"></section>
  <section id="industries"></section>
  <section id="process"></section>
  <section id="about"></section>
  <section id="testimonials"></section>
  <section id="contact"></section>
</main>

<footer class="site-footer"></footer>
```

---

## Suggested File Structure
```text
/project-root
  index.html
  /assets
    /images
    /videos
    /icons
  /css
    style.css
    responsive.css
  /js
    main.js
```

### JavaScript Responsibilities
- sticky header scroll state
- smooth nav scroll
- active nav section highlight
- portfolio filter tabs
- video modal open / close
- optional reveal-on-scroll animation

---

## UI Style Details
### Buttons
- rounded but not pill-heavy
- primary button in accent color
- secondary button outlined or subtle filled
- smooth hover transition

### Cards
- white cards
- subtle border
- clean padding
- minimal shadow if any

### Images
- use clean crop ratios
- keep thumbnails sharp
- avoid mixed random aspect ratios

### Icons
- thin line icons preferred
- consistent stroke width

---

## Things To Avoid
Do not do any of the following:
1. Do not make the website dark themed overall
2. Do not use multiple accent colors
3. Do not use more than two font families
4. Do not overload the hero with too much text
5. Do not place text directly on a busy video without overlay support
6. Do not turn the portfolio into a cluttered slider
7. Do not add fake reviews or fake stats
8. Do not add too many animations
9. Do not use stock-looking corporate visuals
10. Do not make each section feel like a different template

---

## Final Visual Summary
The final site should feel like this:
- premium white-theme portfolio
- cinematic but clean
- industrial but polished
- bold typography
- high-quality real visual storytelling
- strong portfolio presentation
- simple trust signals
- structured process
- clean conversion-focused contact section

---

## Acceptance Checklist
Before the project is considered complete, confirm all of these are true:

- [ ] One-page website structure is followed
- [ ] White / off-white theme is maintained
- [ ] Hero has background loop video
- [ ] Typography is clean and consistent
- [ ] Accent color is controlled and minimal
- [ ] Portfolio is the strongest section visually
- [ ] Services are clearly shown in a 6-card system
- [ ] Industries section is included
- [ ] Process section is included
- [ ] About / Why section is concise and premium
- [ ] Contact CTA is clean and conversion-friendly
- [ ] Site is fully responsive
- [ ] Motion is subtle and controlled
- [ ] Performance is optimized
- [ ] Design feels cohesive from top to bottom

---

## Short Instruction To The AI Builder
Build a polished one-page website for **Spparow Films** in **vanilla HTML, CSS, and JavaScript**.
Follow this plan exactly.
Use a white premium visual system, bold clean typography, a hero background loop video, a strong featured portfolio section, and subtle interactions.
Do not create a generic agency template.
Do not copy the references exactly.
Create a unique, modern, industrial-focused production portfolio that looks premium and ready for client presentation.
