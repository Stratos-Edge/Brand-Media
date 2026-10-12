# Brand-Media

Brand identity and media assets for Stratos Edge. The company's Claude tools read `guides/Brand-Guide.md` live from this repo, and the website takes its favicon and sharing image from `brand-assets/`.

## What is current

```
.
├─ guides/
│  └─ Brand-Guide.md                    the brand: colors, type, the sky, marks, devices. Reconciled with the website 12 Oct 2026.
├─ brand-assets/                        ready to use
│  ├─ core/
│  │  ├─ stratos-logo-black.png / stratos-logo-white.png     the wordmark
│  │  └─ stratos-favicon.png            512, the lettermark on the sky; also -180, -32, -16
│  └─ social/
│     ├─ sharing-image.png              2400x1260, the link-preview image on every website page
│     ├─ stratos-profile.png            400x400, profile photo for every platform
│     ├─ youtube-banner.png             2560x1440, safe area 1546x423
│     ├─ x-header.png                   1500x500 (no X account yet)
│     └─ linkedin/                      four covers with the website, and a README with upload steps
├─ scripts/
│  ├─ brand-media.mjs                   renders every asset above (Playwright)
│  ├─ brand-media/index.html            the one template, on the site's sky wash
│  └─ brand-media/src/                  the sky photo, the wordmark, its cut letters
└─ legacy/                              kept for reference, not for use (below)
```

## Rendering the media

Everything in `brand-assets/social/` and the favicon comes from one template with the website's fonts, colors and sky, so a change to a line or a size is an edit to `scripts/brand-media/index.html` and a re-render.

```
npm install
npm run media                                # review/: every board, every lettermark option, a contact sheet, LinkedIn mockups
LETTERMARK=wordmark npm run media -- --final # brand-assets/: the chosen set with clean names
```

The chosen lettermark is `wordmark`, the S cut from the wordmark itself. The other drawings (`serif`, `monogram`, `sans`) still render on the review sheet.

## Where the assets are used

| Asset | Used by |
|---|---|
| `social/sharing-image.png` | Website `public/social-sharing-image.png` (every page's og:image and twitter:image). |
| `core/stratos-favicon*.png` | Website `public/favicon.png`, `favicon-32.png`, `favicon-16.png`, `apple-touch-icon.png`. |
| `social/stratos-profile.png` | LinkedIn company page, YouTube, Google Business Profile, directory listings. |
| `social/linkedin/personal-*.png` | Personal LinkedIn profiles. See `social/linkedin/README.md`. |
| `social/linkedin/company-*.png` | The LinkedIn company page. |
| `social/youtube-banner.png` | youtube.com/@stratosedgeai. |

## Legacy

`legacy/` holds what the October 2026 refresh replaced, kept so nothing is lost:

- `legacy/guides/`: the August 2026 PDF guides, their HTML sources and render script, and the Document Guide (two document profiles, written for the Lora era; the Brand Guide's typography section is current).
- `legacy/lettermark/`: the serif lettermark on a transparent ground, black and white.
- `legacy/linkedin/`: the cover without the website.

Older founder-specific and employee banners were removed in the same refresh; they are in git history before commit fc50070.
