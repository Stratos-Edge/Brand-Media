# Document Guide

How to make Stratos Edge documents. Two profiles. Pick by intent.

For the polished, shareable version with rendered examples, see [Stratos_Edge_Document_Guide.pdf](./Stratos_Edge_Document_Guide.pdf).

For visual identity (colors, fonts, marks), see [Brand-Guide.md](./Brand-Guide.md).

---

## Two profiles

Stratos Edge documents come in two flavors. Pick by intent — not by audience, not by sensitivity.

- **Stratos Simple** — the default. Clean, light, Stratos-identified. Most documents.
- **Stratos Playbook** — the intentional moment. Full marketing treatment. Used sparingly.

### How to choose

| If the document is... | Use |
|---|---|
| Delivering information or confirming an action | **Simple** |
| Making an argument, persuading, or selling | **Playbook** |
| An intro letter, summary, memo, or working note | **Simple** |
| A lead magnet, sales playbook, methodology overview | **Playbook** |
| Short (1–4 pages) | **Simple** |
| Long (6+ pages) and meant to be printed or shared as an artifact | **Playbook** |
| You're unsure | **Simple** |

**Default to Simple.** Playbook is the exception, not the rule. If most of your documents look like Playbooks, your Playbooks stop reading as special. Save it for moments that actually deserve it.

### What's *not* a profile decision

Whether a document is internal, external, confidential, or public is a **footer wording** decision — not a styling decision. Both profiles handle internal-vs-external the same way: only the footer copy changes.

---

## Stratos Simple

The default. Clean, light, Stratos-identified, professionally formatted. Open straight to the content — no hero cover.

### Visual recipe

- **Background:** `#FFFFFF` (default) or `#F2F0E9` (warm editorial)
- **Header:** small `STRATOS | EDGE` wordmark, top-left of the first page
- **Body:** Lora 16–18pt, line-height 1.55–1.7, color INK `#04242D`
- **Section headings:** Work Sans 400, INK, with the coral period
- **Footer:** single line of small Lora at MUTED — date, page number, contextual identifier
- **Margins:** 0.85in horizontal (generous, reads editorial)

### Don't include

- Hero cover page
- Accent bar (Playbook-only)
- Stat strips, pull quotes, numbered insight blocks
- Dark teal sections
- Coral-gradient buttons

If a CTA is needed, use a single line of coral-period text (e.g., "Reply to confirm." or "Book a call at stratosedge.ai/contact.").

### Footer wording (the only variable)

Styling is identical across all three. The footer copy is the only thing that changes.

| Audience | Footer line |
|---|---|
| Internal-facing | `Stratos Edge · Internal · {date}` |
| Client / recipient | `Stratos Edge · {date}` or `Stratos Edge · stratosedge.ai` |
| Public-facing | `© 2026 Stratos Edge LLC · stratosedge.ai` |

---

## Stratos Playbook

The intentional moment. Full marketing treatment. Borrows the FlightPlan deliverable design language — colorized, sectioned, editorial, dramatic.

> **Use sparingly.** Playbook is the equivalent of a Stratos hero band — high impact when used, exhausting if every document looks like this.

### Visual recipe

- **Cover page** — full-bleed dark teal `#04242D`. Small coral eyebrow at top. Large Lora 400 hero title, white, letter-spacing `-0.02em`. Subtitle in Lora at `rgba(245,245,247,0.65)`. Wordmark white at bottom corner. Accent bar under the title.
- **Section dividers** — full-bleed dark teal bands between major sections (mirrors FlightPlan). Coral eyebrow + large Lora title in white. 2–4 per doc, not on every section.
- **Body sections** — alternate `#FFFFFF` and `#F8F8F8`, occasionally `#F2F0E9` for editorial. Work Sans 400 headings with coral period. Lora body.
- **CTA** — end with a single coral-gradient button and a one-line action statement.
- **Margins:** 0.7in horizontal.

### Components available

Use 1–2 of these per doc — not all of them:

- Accent bar under cover title
- Eyebrow labels above section headings
- Stat strips
- Pull quotes
- Numbered insight blocks
- Emphasis lines
- One coral-gradient CTA at the end

For specs on each, see [Brand-Guide.md → Components and patterns](./Brand-Guide.md#components-and-patterns).

### When to choose Playbook over Simple

- The reader is supposed to feel something (interest, urgency, conviction) by the end.
- The doc is going to be printed, screenshotted, or shared as a marketing artifact.
- The doc is making an argument, not delivering information.

Everything else is Simple.

### Footer wording

Same options as Simple. The footer line on body pages is small Work Sans — `Stratos Edge · stratosedge.ai · page N` for public docs, or `Stratos Edge · Internal · page N` for internal-only playbooks. Don't add "Confidential" unless the document genuinely warrants it.

---

## Choosing a profile (quick reference)

| Document | Profile |
|---|---|
| Email confirmation page | Simple |
| Intro letter to a prospect | Simple |
| Summary of a discovery conversation | Simple |
| Working memo to the team | Simple (internal) |
| Short explainer for a recipient | Simple |
| Brand guide / docs (like this file) | Simple |
| Agent program overview PDF | Playbook |
| Sales Playbook | Playbook |
| Lead magnet PDF | Playbook |
| LinkedIn Playbook | Playbook |
| FlightPlan deliverable | Its own thing — Playbook patterns at max intensity |

---

## Page geometry

| | Stratos Simple | Stratos Playbook |
|---|---|---|
| Page size | 8.5 × 11 in (US Letter) | 8.5 × 11 in (US Letter) |
| Horizontal margin | 0.85in | 0.7in |
| Top padding (first page) | 0.85in | 0 (cover bleeds) |
| Footer position | Bottom, 1pt hairline rule above | Bottom, no rule on dark sections |
| Cover page | None — open to content | Full-bleed dark teal hero |
| Section background | White or Cream (one) | Rotates: White → Off-white → Dark teal |

### On screen (HTML rendering)

- `max-width: 760px` for body-text sections
- `max-width: 1280px` for hero sections and content with photos / grids
- Horizontal padding: `px-6 md:px-12 lg:px-16 xl:px-24` (Tailwind)
- Section padding: `clamp(5rem, 10vh, 7rem)` Simple · `clamp(6rem, 12vh, 8rem)` Playbook hero
