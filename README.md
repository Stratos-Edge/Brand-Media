# Brand-Media

Brand identity, document standards, and media assets for Stratos Edge. The company's Claude tools read `guides/Brand-Guide.md` live from this repo.

## Structure

```
.
├─ guides/
│  ├─ Brand-Guide.md              current (reconciled with the website 12 Oct 2026)
│  ├─ Document-Guide.md
│  ├─ Stratos_Edge_Brand_Guide.pdf       August 2026, predates the October pass
│  ├─ Stratos_Edge_Document_Guide.pdf
│  └─ pdf-sources/
├─ brand-assets/
│  ├─ core/
│  │  ├─ stratos-logo-black.png / stratos-logo-white.png     the wordmark
│  │  ├─ stratos-lettermark-black.png / -white.png            lettermark, transparent ground
│  │  ├─ stratos-favicon.png                                  512, on the sky; also -180, -32, -16
│  └─ social/
│     ├─ sharing-image.png              2400x1260, the link-preview image (og:image)
│     ├─ stratos-profile.png            400x400, profile photo for every platform
│     ├─ youtube-banner.png             2560x1440, safe area 1546x423
│     ├─ x-header.png                   1500x500
│     └─ linkedin/
│        ├─ personal-*.png              1584x396, six lines to choose from
│        └─ company-*.png               1128x191, three lines to choose from
├─ scripts/
│  ├─ brand-media.mjs                   renders the suite (Playwright)
│  ├─ brand-media/index.html            the one template, on the site's sky wash
│  ├─ brand-media/src/                  the sky photo, the wordmark, its cut letters
│  └─ render-pdfs.mjs
└─ package.json
```

## Media

Everything in `brand-assets/social/` and the favicon is rendered from one template with the website's fonts, colors and sky, so a change to a line or a size is an edit to `scripts/brand-media/index.html` and a re-render.

```
npm install
npm run media                          # review/: every board, every lettermark option, a contact sheet
LETTERMARK=serif npm run media -- --final   # brand-assets/: the chosen set with clean names
```

Lettermark options: `serif`, `wordmark`, `monogram`, `sans` (see the guide).

## Guides

- **[guides/Brand-Guide.md](./guides/Brand-Guide.md)** — colors, typography, the sky, marks, signature devices, component specs.
- **[guides/Document-Guide.md](./guides/Document-Guide.md)** — the two document profiles (Stratos Simple, Stratos Playbook) and when to use which.
- The two PDFs are the August 2026 renderings; the Markdown is current.

## Where the assets are used

| Asset | Used by |
|---|---|
| `social/sharing-image.png` | Website `public/social-sharing-image.png` (every page's og:image and twitter:image). |
| `core/stratos-favicon.png` | Website `public/favicon.png`. |
| `social/stratos-profile.png` | LinkedIn, YouTube, Google Business Profile, directory listings. |
| `social/linkedin/personal-*.png` | Micah, Jeff and employee profiles. |
| `social/linkedin/company-*.png` | The LinkedIn company page. |
| `social/youtube-banner.png` | youtube.com/@stratosedgeai. |
