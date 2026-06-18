# Stratos Edge — Brand Guide

Visual identity. Colors, typography, marks, signature devices, asset library.

> Source of truth: the live homepage at [stratosedge.ai](https://stratosedge.ai) and the FlightPlan deliverables. If anything in this guide conflicts with what the homepage actually does, the homepage wins — this guide is updated to match.

For voice, tone, and how to format actual documents, see [DOCUMENTATION.md](./DOCUMENTATION.md).

---

## Color

The whole brand sits on a small palette. Use only these.

### Core

| Role | Hex | Where it lives |
|---|---|---|
| **INK** | `#04242D` | Deep teal-black. Headlines, body text, dark backgrounds, footer, wordmark on light. Replaces older `#0E0E11`. |
| **CORAL** | `#FF6B4A` | The accent. Periods at the ends of headlines, CTA buttons, eyebrows, single-element emphasis. |
| **CREAM** | `#F2F0E9` | Warm off-white. Editorial sections, document body backgrounds. |
| **OFFWHITE** | `#F8F8F8` | Cool light grey. Alternating section background, card surfaces. |
| **WHITE** | `#FFFFFF` | Page background. |

### Secondary / utility

| Role | Value | Use |
|---|---|---|
| MUTED text | `rgba(4, 36, 45, 0.55)` | Captions, sub-copy on light backgrounds. Always opacity-derived from INK, not a separate grey. |
| HAIRLINE | `rgba(4, 36, 45, 0.08)` | Card borders, section dividers, accordion separators. |
| Coral gradient | `linear-gradient(135deg, #FF6B4A 0%, #FF8A6B 100%)` | CTA buttons only. Never headlines, never large fills. |
| Coral tint | `#FFF8F5` | Faint warm background for highlighted callouts. |
| Coral text on dark | `#FF6B4A` | Eyebrows over dark teal sections — coral renders correctly on `#04242D`. |
| Status green (dot) | `#0F9D6E` | "Live / confidential" badge dot in document chrome. |

### Do not use

- The old `#0E0E11` "near-black" from the previous brand guide. Replaced by INK `#04242D`.
- Separate `#555` / `#999` greys for text. Use `rgba(4, 36, 45, 0.55)` and lower opacities instead.
- A blue. Stratos Edge is teal + coral, not teal + blue.
- More than one coral per visible area. Coral is precious — one mark per moment.

---

## Typography

Two fonts, both Google Fonts. The website loads them in `src/styles/fonts.css`.

### Work Sans — the brand voice

Used for every headline, every section title, every label, every UI element, every nav item that isn't the website itself, every wordmark, and the signature coral period device. Weights 100–600 available; the brand voice lives mostly at **400** for hero headlines and **200** for serene, light treatments (FlightPlan auth gate, document cover titles).

Fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Lora — the body and the editorial moment

Used for body paragraphs, long-read content, and FlightPlan deliverable hero titles where editorial weight matters. Weights 400–700 plus italic.

Fallback: `Georgia, 'Times New Roman', serif`

### The pairing rule

- Structure (headlines, labels, UI, buttons, data) → **Work Sans**
- Story (body paragraphs, narrative, editorial pull-quotes, FlightPlan hero titles) → **Lora**
- The site has one notable inversion: **website nav is Lora**, not Work Sans. This is intentional — it reads "publication" not "tech product." Document chrome generally follows the same pattern: nav-like running labels in Lora, structural headings in Work Sans.

### Type scale (anchor sizes)

Approximate sizes used across the site and deliverables. Tune with `clamp()` for responsive contexts.

| Element | Size | Weight | Notes |
|---|---|---|---|
| Hero headline (page) | `clamp(2.25rem, 5.5vw, 4.5rem)` | 400 | Work Sans. Letter-spacing `-0.015em` to `-0.02em`. Coral period. |
| Section headline | `clamp(2.75rem, 5vw, 4rem)` | 400 | Work Sans. `-0.02em`. Coral period. |
| Sub-heading | `clamp(1.25rem, 2vw, 1.5rem)` | 600 | Work Sans. |
| Editorial hero (Playbook/FlightPlan) | `clamp(2.25rem, 4.5vw, 3.25rem)` | 400 | **Lora**. `-0.02em`. On dark teal sections. |
| Body | `1.125rem` | 400 | Lora. Line-height `1.55`. Color INK `#04242D`. |
| Body small (captions) | `0.875rem` | 400 | Lora or Work Sans. Color MUTED. |
| Eyebrow / section label | `0.7rem` – `0.875rem` | 500 | Work Sans. UPPERCASE. Letter-spacing `0.1em` – `0.22em`. Color CORAL. |
| Wordmark small (corner) | `0.65rem` – `0.7rem` | 500 | Work Sans. UPPERCASE. Letter-spacing `0.25em`. Color INK or `rgba(255,255,255,0.5)` on dark. |
| Button label | `0.95rem` | 400 | Work Sans. |

---

## The coral period

The single most signature typographic move. Every brand headline ends with a coral period.

> What we help you do<span style="color:#FF6B4A">.</span>
> FlightPlan™ is how we do it<span style="color:#FF6B4A">.</span>
> Your documents are on the way<span style="color:#FF6B4A">.</span>

**Mechanics:** the headline is set in INK / white / on-background color; only the terminal `.` switches to CORAL. The period inherits the headline's font weight and size — it just changes color. In JSX/HTML:

```html
What we help you do<span style="color: #FF6B4A">.</span>
```

**Rules:**
- One per headline. Not per sentence in a paragraph.
- Always at the end. Never mid-headline, never as the first character.
- Question marks and exclamation marks follow the same rule: `Ready to see the full picture?` with the `?` in coral.
- The period inherits the headline's font weight and size automatically — don't restyle it.
- Don't use on body paragraphs. The coral period is a *headline* device.

---

## Marks

### Logo

`STRATOS | EDGE` wordmark. Two colorways for the two backgrounds.

| | Asset | Use |
|---|---|---|
| On light backgrounds | ![Logo black](assets/stratos-logo-black.png) | Default. Document title pages, light section headers, business material. |
| On dark backgrounds | ![Logo white](assets/stratos-logo-white.png) | Dark playbook covers, footers on dark teal, anywhere INK or near-INK is the background. |

**Construction:** Work Sans. `STRATOS` at weight 500, letter-spacing `0.18em`. Vertical pipe separator. `EDGE` at weight 300, letter-spacing `0.14em`, opacity 85%. Separator is a 1px × 13px bar at 25% (on dark) or 15% (on light) opacity.

**Clear space:** equal to the cap height of the letterforms on all sides. Never crop into that space.

**Don't:** distort proportions, recolor, add drop-shadows, replace fonts, embed in colored circles, or use the wordmark and the lettermark together in the same composition.

### Lettermark

A compact mark for tight contexts where the full wordmark won't fit (favicons, app icons, profile photos at small sizes, watermarks).

| | Asset | Use |
|---|---|---|
| On light | ![Lettermark black](assets/stratos-lettermark-black.png) | Light-background mark. |
| On dark | ![Lettermark white](assets/stratos-lettermark-white.png) | Dark-background mark. |

The lettermark is the abstracted layered-bands form (stratospheric layers) with an offset coral period — the same coral-period device translated into the mark.

---

## Signature devices

These visual moves recur across the site and FlightPlan deliverables. Use them consistently; they make material instantly recognizable as Stratos.

### Coral period

See above. The headline device. Use every time.

### Accent bar

A short coral gradient bar used as a section divider and as the underline beneath document titles.

```
Width: 44px
Height: 3px
Border-radius: 2px
Background: linear-gradient(135deg, #FF6B4A 0%, #FF8A6B 100%)
```

Used below page titles on document covers and as a horizontal rule between major sections on closing pages.

### Eyebrow label

Small, uppercase, tracked-out coral label that sits above a headline.

```
font-family: Work Sans
font-size: 0.7rem – 0.875rem
font-weight: 500
letter-spacing: 0.12em – 0.22em
text-transform: uppercase
color: #FF6B4A
```

Used above section headlines on dark teal hero bands ("BRAND GUIDELINES", "WHY WE'RE DIFFERENT"). One per section.

### Status dot

A small filled circle, 6×6px, paired with a small Work Sans label. Used in document headers to show state (`● Confidential`, `● Draft`, `● Live`).

- Confidential / live: `#0F9D6E`
- Admin preview / pre-publish: `#E6A61C`
- Generic muted: INK at 30% opacity

---

## Backgrounds and section rhythm

The brand uses a small set of section backgrounds, alternated to create visual rhythm without introducing new colors.

| Background | Hex | Used for |
|---|---|---|
| White | `#FFFFFF` | Default page background. Hero. |
| OFFWHITE | `#F8F8F8` | Alternating sections for rhythm. Stat blocks. |
| CREAM | `#F2F0E9` | Warm editorial moments. Long-read content. |
| Dark teal | `#04242D` | Hero bands, footers, FlightPlan section dividers, intentional drama. Always with white/coral text. |

A document or web page that rotates `WHITE → OFFWHITE → DARK_TEAL → WHITE` feels Stratos without any other styling work. Don't add a fifth background color.

---

## Hierarchy on dark teal

When working on `#04242D`:

- Primary text: `#FFFFFF` or `#F5F5F7`
- Body / secondary: `rgba(245, 245, 247, 0.65)`
- Muted: `rgba(245, 245, 247, 0.45)`
- Accent: CORAL (renders correctly on the deep teal)
- Footer text: `rgba(245, 245, 247, 0.25)`

Hierarchy on dark is opacity-driven, same principle as light pages. Don't introduce new greys.

---

## Image assets in this repo

All four marks live under [`assets/`](assets/) in this repo. The website also serves the same files at:

- `https://stratosedge.ai/brand-assets/stratos-logo-black.png`
- `https://stratosedge.ai/brand-assets/stratos-logo-white.png`
- `https://stratosedge.ai/brand-assets/stratos-lettermark-black.png`
- `https://stratosedge.ai/brand-assets/stratos-lettermark-white.png`

If you need a vector format (SVG / EPS) or higher-resolution source, the master files are kept outside this repo by the brand owner.

---

## CSS variables (already in the site)

For anyone working in the website codebase, these tokens are already wired up in `src/styles/fonts.css` and `src/styles/theme.css`:

```css
--font-headline: 'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-body: 'Lora', 'Georgia', 'Times New Roman', serif;
```

In TSX, the convention is to declare the palette as local constants at the top of each page or component:

```tsx
const INK = '#04242D';
const MUTED = 'rgba(4, 36, 45, 0.55)';
const CORAL = '#FF6B4A';
const DARK_TEAL = '#04242D';
const CREAM = '#F2F0E9';
const OFFWHITE = '#F8F8F8';
```

Use these names. Don't redefine the palette under different variable names.

---

## What this guide is not

This is **visual identity only**. For:

- How to write Stratos copy → [DOCUMENTATION.md → Voice](./DOCUMENTATION.md#voice)
- Which document format to use for which audience → [DOCUMENTATION.md → Document profiles](./DOCUMENTATION.md#document-profiles)
- Page layout, headers, footers, section components for actual documents → [DOCUMENTATION.md → Components](./DOCUMENTATION.md#components)
