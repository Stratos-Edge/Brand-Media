# Stratos Edge — Brand

Visual identity, voice, and document standards for Stratos Edge — an AI strategy and technology advisory for mid-market organizations in regulated industries.

This is the canonical brand reference. It supersedes any older brand guide.

---

## What's here

### Reference docs (Markdown)

- **[BRAND.md](./BRAND.md)** — colors, typography, marks, the coral period device, signature elements
- **[DOCUMENTATION.md](./DOCUMENTATION.md)** — voice, the five voice rules, vocabulary do/don't, two doc profiles (Stratos Simple + Stratos Playbook), reusable components

### Shareable PDFs

Self-contained, repo-agnostic, safe to email or hand off.

- **[Stratos_Edge_Brand_Guide.pdf](./Stratos_Edge_Brand_Guide.pdf)** — visual identity, 7 pages
- **[Stratos_Edge_Documentation_Guide.pdf](./Stratos_Edge_Documentation_Guide.pdf)** — voice + doc profiles, 7 pages

### Logo & lettermark assets

The four core marks live in [assets/](./assets/):

| Mark | On light | On dark |
|---|---|---|
| Logo (`STRATOS | EDGE`) | [`stratos-logo-black.png`](./assets/stratos-logo-black.png) | [`stratos-logo-white.png`](./assets/stratos-logo-white.png) |
| Lettermark (compact) | [`stratos-lettermark-black.png`](./assets/stratos-lettermark-black.png) | [`stratos-lettermark-white.png`](./assets/stratos-lettermark-white.png) |

The same files are served live by the website at:

- `https://stratosedge.ai/brand-assets/stratos-logo-black.png`
- `https://stratosedge.ai/brand-assets/stratos-logo-white.png`
- `https://stratosedge.ai/brand-assets/stratos-lettermark-black.png`
- `https://stratosedge.ai/brand-assets/stratos-lettermark-white.png`

---

## Source of truth

If anything in this repo conflicts with what the live homepage at [stratosedge.ai](https://stratosedge.ai) actually does, the homepage wins. This guide is updated to match the site, not the other way around.

The previous PDF brand guide (dated early 2026) is superseded by what's here. Colors, type scale, the coral period device, and voice samples have all been resyncronized against the current website implementation.

---

## Regenerating the PDFs

The PDFs are rendered from HTML sources under [pdf-sources/](./pdf-sources/). To regenerate after editing:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=Stratos_Edge_Brand_Guide.pdf \
  "file://$(pwd)/pdf-sources/Stratos_Edge_Brand_Guide.html"

"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=Stratos_Edge_Documentation_Guide.pdf \
  "file://$(pwd)/pdf-sources/Stratos_Edge_Documentation_Guide.html"
```

The HTML sources reference [assets/](./assets/) for the inline mark previews; Chrome bakes the images into the rendered PDF, so the resulting PDFs are fully portable.

---

## Repo structure

```
.
├─ README.md                              ← this file
├─ BRAND.md                               ← visual identity
├─ DOCUMENTATION.md                       ← voice + doc profiles
├─ Stratos_Edge_Brand_Guide.pdf
├─ Stratos_Edge_Documentation_Guide.pdf
├─ pdf-sources/
│  ├─ Stratos_Edge_Brand_Guide.html
│  └─ Stratos_Edge_Documentation_Guide.html
└─ assets/
   ├─ stratos-logo-black.png
   ├─ stratos-logo-white.png
   ├─ stratos-lettermark-black.png
   └─ stratos-lettermark-white.png
```

---

© 2026 Stratos Edge LLC
