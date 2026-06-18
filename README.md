# Stratos Edge — Brand & Media

The canonical home for Stratos Edge's brand identity, document standards, and media assets. Public so designers, partners, agents, and contractors can self-serve without needing access to the website source.

---

## What's here

```
.
├─ guides/
│  ├─ Brand-Guide.md                       ← visual identity reference
│  ├─ Document-Guide.md                    ← doc profiles reference
│  ├─ Stratos_Edge_Brand_Guide.pdf         ← shareable PDF
│  ├─ Stratos_Edge_Document_Guide.pdf      ← shareable PDF
│  └─ pdf-sources/                         ← HTML sources for the PDFs
├─ brand-assets/
│  ├─ core/                                ← logos, lettermarks, profile
│  └─ social/
│     └─ linkedin/                         ← LinkedIn banners
└─ scripts/
   └─ render-pdfs.mjs                      ← Playwright PDF renderer
```

---

## Reference docs

### Guides

- **[guides/Brand-Guide.md](./guides/Brand-Guide.md)** — colors, typography, marks, the coral period device, signature elements, component specs
- **[guides/Document-Guide.md](./guides/Document-Guide.md)** — the two document profiles (Stratos Simple + Stratos Playbook) and when to use which

### Shareable PDFs

Self-contained, repo-agnostic, safe to email or hand off:

- **[Stratos_Edge_Brand_Guide.pdf](./guides/Stratos_Edge_Brand_Guide.pdf)** — visual identity, 8 pages
- **[Stratos_Edge_Document_Guide.pdf](./guides/Stratos_Edge_Document_Guide.pdf)** — doc profiles, 5 pages

---

## Brand assets

### Core marks ([brand-assets/core/](./brand-assets/core/))

| Asset | Use |
|---|---|
| [`stratos-logo-black.png`](./brand-assets/core/stratos-logo-black.png) | Full wordmark on light backgrounds |
| [`stratos-logo-white.png`](./brand-assets/core/stratos-logo-white.png) | Full wordmark on dark backgrounds |
| [`stratos-lettermark-black.png`](./brand-assets/core/stratos-lettermark-black.png) | Compact mark on light (favicon, app icon, profile photo) |
| [`stratos-lettermark-white.png`](./brand-assets/core/stratos-lettermark-white.png) | Compact mark on dark |
| [`stratos-profile.png`](./brand-assets/core/stratos-profile.png) | Pre-cropped profile photo treatment |

The first four are also served live by the website at:

- `https://stratosedge.ai/brand-assets/stratos-logo-black.png`
- `https://stratosedge.ai/brand-assets/stratos-logo-white.png`
- `https://stratosedge.ai/brand-assets/stratos-lettermark-black.png`
- `https://stratosedge.ai/brand-assets/stratos-lettermark-white.png`

### Social ([brand-assets/social/](./brand-assets/social/))

| Channel | Assets |
|---|---|
| **LinkedIn** | [`linkedin-banner-stratos.png`](./brand-assets/social/linkedin/linkedin-banner-stratos.png), [`linkedin-banner-jeff.png`](./brand-assets/social/linkedin/linkedin-banner-jeff.png), [`linkedin-banner-micah.png`](./brand-assets/social/linkedin/linkedin-banner-micah.png) |

Banners are 1584 × 396 px (LinkedIn standard). Personal banners follow the brand pattern: deep teal background, declarative line in Work Sans with the coral period, small wordmark.

---

## Source of truth

The live homepage at [stratosedge.ai](https://stratosedge.ai) and the FlightPlan deliverables are the source of truth. If anything in this repo conflicts with what the website actually does, the homepage wins — this repo is updated to match.

The older PDF brand guide (early 2026) is superseded by what's here. Colors, type scale, the coral period device, and document profiles have all been resynchronized against the current implementation.

---

## Regenerating the PDFs

The PDFs are rendered from HTML sources via Playwright. To regenerate after editing:

```bash
npm install         # first time only — installs Playwright + Chromium
npm run render      # produces both PDFs into guides/
```

The script lives at [scripts/render-pdfs.mjs](./scripts/render-pdfs.mjs). HTML sources reference [brand-assets/core/](./brand-assets/core/) for inline mark previews; Playwright bakes images into the rendered PDFs so they stay self-contained.

---

© 2026 Stratos Edge LLC
