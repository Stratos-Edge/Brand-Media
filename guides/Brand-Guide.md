# Brand Guide

Visual identity for Stratos Edge — colors, typography, marks, and the signature devices that make a document instantly recognizable.

For the August 2026 PDF (now out of date on the marks), see `legacy/guides/Stratos_Edge_Brand_Guide.pdf`.

For voice and document profiles, see `legacy/guides/Document-Guide.md`.

> **Source of truth:** the live homepage at [stratosedge.ai](https://stratosedge.ai) and the FlightPlan deliverables. If anything here conflicts with what the homepage actually does, the homepage wins — this guide is updated to match. Last reconciled with the site: 12 October 2026 (typography, the sky, the media suite). The marks section was rewritten 10 November 2026 for the new mark, which is ahead of the site: the website still shows the old lettermark and wordmark until it is updated. The PDF guides predate both passes.

---

## Color

The whole brand sits on a small palette. Use only these.

### Core

| Role | Hex | Where it lives |
|---|---|---|
| **INK** | `#04242D` | Deep teal-black. Headlines, body text, dark backgrounds, footer, wordmark on light. Replaces the older `#0E0E11`. |
| **CORAL** | `#FF6B4A` | The accent. Periods at the ends of headlines, CTA buttons, eyebrows, single-element emphasis. In the mark: people. |
| **STEEL** | `#527D98` | The mark's middle piece (productivity) and the middle dot of the wordmark. Added 10 November 2026 with the mark; not yet used anywhere else. |
| **WHITE** | `#FFFFFF` | Default page background. |
| **OFFWHITE** | `#F8F8F8` | Alternating section background, card surfaces. |
| **CREAM** | `#F2F0E9` | Warm editorial sections, document body backgrounds. |

### Secondary / utility

| Role | Value | Use |
|---|---|---|
| Muted text | `rgba(4, 36, 45, 0.55)` | Sub-copy, captions, footers on light. Opacity-derived from INK — not a separate grey. |
| Hairline | `rgba(4, 36, 45, 0.08)` | Card borders, section dividers, accordion separators. |
| Coral gradient | `linear-gradient(135deg, #FF6B4A 0%, #FF8A6B 100%)` | CTA buttons only. Never headlines, never large fills. |
| Coral tint | `#FFF8F5` | Faint warm background for highlighted callouts. |
| **TEAL** | `#1D6772` | The working teal (added 2026-08-10) — INK's own hue at mid-tone. Second data series next to coral, diagram fills, icon strokes, the de-emphasized column in a comparison. Light-surface color only: passes AA for text on white/offwhite/cream; never a background, never text on INK. |
| Status — live | `#0F9D6E` | "Live / Confidential" dot. |
| Status — preview | `#E6A61C` | "Admin preview / Draft" dot. |

### Hierarchy on dark teal

When working on `#04242D`:

| Layer | Value |
|---|---|
| Primary text | `#FFFFFF` or `#F5F5F7` |
| Body / secondary | `rgba(245, 245, 247, 0.65)` |
| Muted | `rgba(245, 245, 247, 0.45)` |
| Footer | `rgba(245, 245, 247, 0.25)` |
| Accent | CORAL (renders correctly on the deep teal) |

Hierarchy on dark is opacity-driven, same principle as light pages. Don't introduce new greys.

### Do not use

- The old `#0E0E11` "near-black" — replaced by INK `#04242D`.
- Separate `#555` / `#999` greys for text. Use opacity on INK instead.
- A blue other than STEEL, and STEEL only where the mark puts it. Stratos Edge is teal + coral, not teal + blue.
- More than one coral per visible area. Coral is precious — one mark per moment.

---

## Typography

Three fonts, all Google Fonts. (Until October 2026 this guide named Lora as the body face; the website moved to Source Sans 3 and Source Serif 4, and the site is the source of truth.)

### Work Sans — the brand voice

Used for every headline, every section title, every label, every UI element, every wordmark, and the signature coral period device. Brand voice lives at **300** for hero and cover headlines (the About page's "AI adoption intelligence.", the sharing image, the banners) and **400–600** for sub-headings and labels.

Fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Source Sans 3 — the reading voice

Body copy, leads, summaries, captions, navigation. Weights 300–600.

Fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Source Serif 4 — the document voice

Long-form research prose (the research issues), formal documents, the About letter. Optical size 8–60, weights 400–500.

Fallback: `Georgia, 'Times New Roman', serif`

### Pairing rule

- Structure (headlines, labels, UI, buttons, data) → **Work Sans**
- Reading (body, leads, summaries) → **Source Sans 3**
- Documents and research prose → **Source Serif 4**
- Differentiation comes through weight, not new colors.

### Type scale

| Element | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Hero headline | Work Sans | 40–96pt | 300 | `-0.02em`. Coral period. |
| Section headline | Work Sans | 32–56pt | 300–600 | Coral period. |
| Sub-heading | Work Sans | 16–22pt | 600 | |
| Lead / summary | Source Sans 3 | 18–22pt | 400 | Muted ink. |
| Body | Source Sans 3 | 16–18pt | 400 | Line-height 1.5–1.6. INK. |
| Research prose | Source Serif 4 | 17–19pt | 400 | Line-height 1.6. |
| Caption | Source Sans 3 | 13–14pt | 400 | MUTED. |
| Eyebrow / label | Work Sans | 9–13pt | 500–600 | UPPERCASE. `0.12–0.22em`. CORAL. |
| Button label | Work Sans | 14pt | 500 | |

---

## The coral period

The single most signature typographic move. Every brand headline ends with a coral period.

> What we help you do<span style="color:#FF6B4A">.</span>
> FlightPlan™ is how we do it<span style="color:#FF6B4A">.</span>
> Your documents are on the way<span style="color:#FF6B4A">.</span>
> Ready to see the full picture<span style="color:#FF6B4A">?</span>

**Mechanics.** The headline is set in INK / white / on-background color; only the terminal `.` switches to CORAL. The period inherits the headline's font weight and size — it just changes color.

```html
What we help you do<span style="color: #FF6B4A">.</span>
```

**Rules:**
- One per headline. Not per sentence in a paragraph.
- Always at the end. Never mid-headline.
- Question marks and exclamation marks follow the same rule — the terminal punctuation switches color.
- The period inherits the headline's font weight and size automatically — don't restyle it.
- Don't use on body paragraphs. The coral period is a *headline* device.
- Don't use more than once per visible page section. It loses meaning if repeated.

---

## The sky

The one photographic surface in the brand: a pale sky with cirrus, used for the website heroes (home, About, FAQ, answer pages) and, until they are redone, for the October 2026 brand media (sharing image, banners, the old avatar and favicon). The new mark does not use the sky; whether the sky stays in the brand media is undecided.

**Construction.** The photo `scripts/brand-media/src/sky-clouds.jpg` as shot, no brightening or desaturation, under a light wash that keeps the clouds and lets navy type sit on it:

```css
--sky-wash: linear-gradient(180deg, rgba(248,249,249,.82) 0%, rgba(246,247,247,.78) 55%, rgba(253,239,233,.82) 100%);
```

Type on the sky is INK (navy); the eyebrow and the period are CORAL. No white type on the sky, no vignette, no darker "rich blue" variant. The "no blue" rule below is about palette colors; the sky is a photograph and is the exception.

The website defines the wash once in `src/app/pages/home/home-intro.css` and the media template copies the value; change both together.

---

## Marks

One mark in three forms, adopted 10 November 2026. Use the fullest form that fits the space: the lockup, then the wordmark, then the S alone. Every file is in `brand-assets/`; see its README for which file goes where. The live specimen is https://stratos-mark.vercel.app (unlisted).

### The mark — the S

Three rounded pieces in our three colours, read top to bottom in the order of our three areas:

| Piece | Colour | Stands for |
|---|---|---|
| Top pill | CORAL `#FF6B4A` | People |
| Middle dot | STEEL `#527D98` | Productivity |
| Bottom pill | INK `#04242D` | Automation |

Together they form an S: a pill to the right, a dot, a pill to the left. The three pieces can also rest as three stacked dots; that is the mark's other state, used only where it moves (it becomes the S on hover or when a page loads, and always ends on the S). On INK the bottom piece turns white; coral and steel stay as they are.

As an icon (favicon, profile picture, app icon) the S sits on its **canvas**: a rounded, almost-white tile (`#FDFCFA`) with a fine paper grain and a hairline edge. There is a dark canvas (`#0B3441`) for dark surfaces, and `favicon.svg` carries both and follows the system theme. The sky is no longer used behind the mark.

Files: `brand-assets/mark/` (bare, in every colourway, plus the animation) and `brand-assets/icon/` (on the canvas, every size, light and dark).

### Wordmark — `STRATOS ⋮ EDGE`

![Wordmark](../brand-assets/wordmark/wordmark-ink.svg)

**Construction.** Work Sans. `STRATOS` at weight 500, letter-spacing `0.18em`. `EDGE` at weight 300, letter-spacing `0.14em`, opacity 85%. Between them, where the thin line used to be, the three dots in the mark's colours and order (coral, steel, ink), stacked to the height of the capitals, each dot 0.16em across, 0.42em of space either side. The line divider is retired.

Two colourways: `wordmark-ink` on light backgrounds, `wordmark-white` on dark (the ink dot turns white). SVG with the letters as outlines, and PNG. In HTML the same wordmark is live text: see `brand-assets/show-page/index.html` for the markup and CSS.

### Lockup — the mark with the wordmark

![Lockup](../brand-assets/lockup/lockup-ink.svg)

The fullest form: the S, 1.06em tall, 0.52em before `STRATOS`, then the wordmark. Where there is room, this is how we appear. `lockup-ink` and `lockup-white`, SVG and PNG, in `brand-assets/lockup/`.

### Rules

- **Clear space.** Round the wordmark and the lockup, the height of the capitals on all sides. Round the bare mark, one dot (the mark files already include it).
- **Smallest size.** The S on its canvas works down to 16px; bare, keep it at least 20px tall. The wordmark should not go below a 14px cap height.
- **Don't** outline the pieces, change or reorder the colours, rotate or stretch anything, put the bare mark on a photo or a mid-tone (use the canvas), set the wordmark in another typeface, or bring back the line between the words.

### Retired

The October 2026 lettermark (the S cut from the wordmark on the sky) and the line-divided wordmark are in `legacy/`. They are still what the website and the social accounts show until those are updated.

---

## Signature devices

### Accent bar

Short coral gradient bar — section divider, or underline beneath a document title.

```
44pt wide · 3pt tall · 2pt radius · linear-gradient(135deg, #FF6B4A 0%, #FF8A6B 100%)
```

### Eyebrow label

Small uppercase tracked-out coral label sitting above a headline. One per section.

```
Work Sans · 9–13pt · weight 500–600 · UPPERCASE · letter-spacing 0.12–0.22em · CORAL
```

### Status dot

Small filled circle (6×6px) paired with a small Work Sans uppercase label. Used in document headers to indicate state.

- Live / confidential: `#0F9D6E`
- Admin preview / draft: `#E6A61C`
- Muted: `rgba(4, 36, 45, 0.3)`

---

## Backgrounds and section rhythm

| Background | Hex | Used for |
|---|---|---|
| WHITE | `#FFFFFF` | Default page background. Hero. |
| OFFWHITE | `#F8F8F8` | Alternating sections for rhythm. Stat blocks. |
| CREAM | `#F2F0E9` | Warm editorial moments. Long-read content. |
| DARK TEAL | `#04242D` | Hero bands, footers, FlightPlan section dividers, intentional drama. Always with white / coral text. |

A document that rotates `WHITE → OFFWHITE → DARK TEAL → WHITE` feels Stratos without any other styling work. Don't add a fifth background.

### Carousel surfaces (LinkedIn document posts — added 2026-08-10)

Carousels apply the section-rhythm rule slide by slide, on three surfaces:

| Surface | Role |
|---|---|
| **CORAL** `#FF6B4A` | The cover, by default — the billboard slide that competes in the feed. This is the one sanctioned large coral fill in the brand, capped at **one slide per deck** (as the cover, or as a mid-deck punch when the cover is ink or a photograph). Solid coral only, never the gradient. On this surface the terminal-period device and eyebrow switch to INK, and text is white. |
| **CREAM** `#F2F0E9` | The interior — every reading slide. INK text with opacity-driven hierarchy, coral accents as on any light page. |
| **INK** `#04242D` | The close (dark, like the site's footer), the mid-deck beat change, and the scrim over a photograph cover. |

Everything else holds on every surface: the terminal period, one coral lead element per slide (eyebrow or accent bar), the wordmark footer, Work Sans / Lora. The "more than one coral per visible area" rule is unchanged — a coral *surface* is the area, not a mark on it.

---

## Components and patterns

| Component | One-line | Specs |
|---|---|---|
| **Pull quote** | Short bold statement that interrupts body flow | 4pt CORAL left border · CREAM or OFFWHITE bg · Lora 400 italic ~12pt · 28pt vertical margin |
| **Emphasis line** | Two-line statement where the second carries the punch | Work Sans 300 throughout · punch phrase in CORAL at weight 500 · 26pt vertical margin |
| **Stat strip** | Row of 2–4 large numbers anchoring an argument | Numbers: Work Sans 200 · CORAL · Labels: Work Sans 500 · 7pt UPPERCASE · 0.08em · MUTED |
| **Numbered insight** | Numbered argument with big low-opacity number mark | Number: Work Sans 700 · CORAL at 25–30% opacity · Title: Work Sans 600 |
| **CTA button** | Action button | Coral gradient bg (135°) · Work Sans 9–10pt / 500 · white text · 6pt radius · one per page max |
| **Accent bar** | Coral gradient divider | 44pt × 3pt · 2pt radius · `linear-gradient(135deg, #FF6B4A, #FF8A6B)` |

---

## CSS variables (wired up in the website)

```css
--font-headline: 'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-body: 'Lora', 'Georgia', 'Times New Roman', serif;
```

In TSX, the convention is to declare palette as local constants per page or component:

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

This is **visual identity only**. For document profiles (Stratos Simple vs Stratos Playbook) and how to format actual documents, see `legacy/guides/Document-Guide.md`.
