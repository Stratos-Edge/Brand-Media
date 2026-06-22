# Brand-Media

Brand identity, document standards, and media assets for Stratos Edge.

## Structure

```
.
├─ guides/
│  ├─ Brand-Guide.md
│  ├─ Document-Guide.md
│  ├─ Stratos_Edge_Brand_Guide.pdf
│  ├─ Stratos_Edge_Document_Guide.pdf
│  └─ pdf-sources/
│     ├─ brand-guide.html
│     └─ document-guide.html
├─ brand-assets/
│  ├─ core/
│  │  ├─ stratos-logo-black.png
│  │  ├─ stratos-logo-white.png
│  │  ├─ stratos-lettermark-black.png
│  │  ├─ stratos-lettermark-white.png
│  │  └─ stratos-favicon.png
│  └─ social/
│     ├─ stratos-profile.png
│     └─ linkedin/
│        ├─ linkedin-banner-stratos.png
│        ├─ linkedin-banner-jeff.png
│        └─ linkedin-banner-micah.png
├─ scripts/
│  └─ render-pdfs.mjs
└─ package.json
```

## Guides

- **[guides/Brand-Guide.md](./guides/Brand-Guide.md)** — colors, typography, marks, signature devices, component specs.
- **[guides/Document-Guide.md](./guides/Document-Guide.md)** — the two document profiles (Stratos Simple, Stratos Playbook) and when to use which.
- **[guides/Stratos_Edge_Brand_Guide.pdf](./guides/Stratos_Edge_Brand_Guide.pdf)** — Brand Guide as a shareable PDF (8 pages).
- **[guides/Stratos_Edge_Document_Guide.pdf](./guides/Stratos_Edge_Document_Guide.pdf)** — Document Guide as a shareable PDF (6 pages).

## Brand assets

### `brand-assets/core/`

The full wordmark and the compact lettermark, black and white variants.

| File | Notes |
|---|---|
| `stratos-logo-black.png` | Wordmark on light backgrounds. |
| `stratos-logo-white.png` | Wordmark on dark backgrounds. |
| `stratos-lettermark-black.png` | Compact mark on light. Use where the full wordmark won't fit. |
| `stratos-lettermark-white.png` | Compact mark on dark. |
| `stratos-favicon.png` | Lettermark in a rounded-square frame on off-white. Used as the website favicon. 500×500. |

### `brand-assets/social/`

| File | Notes |
|---|---|
| `stratos-profile.png` | Cross-channel profile-photo mark. Square crop, works on any platform's profile slot. |
| `linkedin/linkedin-banner-stratos.png` | LinkedIn banner — Stratos Edge company page. 1584 × 396 px. |
| `linkedin/linkedin-banner-jeff.png` | LinkedIn banner — Jeff Hardman. 1584 × 396 px. |
| `linkedin/linkedin-banner-micah.png` | LinkedIn banner — Micah Laughlin. 1584 × 396 px. |

Channel-specific assets live in named subfolders (e.g. `linkedin/`). Cross-channel assets live at the top of `social/`.

## Regenerating the PDFs

The PDFs are rendered from HTML sources by a Playwright script.

```bash
npm install         # first time only — installs Playwright + Chromium
npm run render      # writes both PDFs into guides/
```

Script: [scripts/render-pdfs.mjs](./scripts/render-pdfs.mjs). HTML sources reference `brand-assets/core/` for inline mark previews; Playwright bakes images into the rendered PDFs.
