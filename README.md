# Brand-Media

Brand identity and media assets for Stratos Edge. The company's Claude tools read `guides/Brand-Guide.md` live from this repo.

**10 November 2026:** the brand has a new mark. Everything current is in `brand-assets/`; everything the mark replaced, and the media built on the old lettermark, is in `legacy/`.

## What is current

```
.
├─ guides/
│  └─ Brand-Guide.md        the brand: colours, type, the sky, the marks, devices
├─ brand-assets/            ready to use; its README says which file goes where
│  ├─ lockup/               the mark with the wordmark, the fullest form (SVG + PNG, ink and white)
│  ├─ wordmark/             STRATOS ⋮ EDGE with the three dots as the divider (SVG + PNG, ink and white)
│  ├─ mark/                 the S alone: element/, states/, canvas/, animation/
│  ├─ icon/                 favicon.svg (light, dark in dark mode), favicon.ico, PNGs 16–1024, apple-touch, avatars; light and dark
│  ├─ show-page/            the live specimen, https://stratos-mark.vercel.app (unlisted)
│  └─ usage.png             one page showing all of it
├─ scripts/
│  ├─ build-assets.mjs      builds brand-assets/ (npm run build)
│  ├─ build-social.mjs      renders brand-assets/social/ from sharing-image.html (npm run social)
│  ├─ glyphs.py             letter outlines for the wordmark SVGs, run by the build through uv + fontTools
│  └─ fonts/                Work Sans (variable), the wordmark's typeface, OFL
└─ legacy/                  kept for reference, not for use (below)
```

## Rebuilding

```
npm install
npm run build
```

Needs `ffmpeg` (the video and GIF) and `uv` (fontTools for the outlines, Pillow for the .ico; nothing is installed). `brand-assets/README.md` and `show-page/` are written by hand.

The show page deploys as the Vercel project `stratos-mark` (team stratos-edge) from `brand-assets/show-page/`.

## Where the assets are used

The website carries the new set on its `staging` branch (10 November 2026), pending promotion to live. LinkedIn, YouTube and the directory listings still carry the October 2026 set from `legacy/`; swapping them is the next job.

| Will be used by | Asset |
|---|---|
| Website favicon | `icon/favicon.svg`, `favicon-32.png`, `favicon-16.png`, `apple-touch-icon-180.png` |
| Website header | `wordmark/` or `lockup/`, or the live-text markup from `show-page/index.html` |
| LinkedIn, YouTube, Google Business Profile, directories | `icon/avatar-1024.png` |

## Legacy

`legacy/` holds everything that has been replaced, kept so nothing is lost:

- `legacy/core/`: the line-divided wordmark PNGs and the October 2026 favicon set (the S cut from the wordmark, on the sky).
- `legacy/social/`: the sharing image, profile picture, YouTube banner, X header and LinkedIn covers, all on the sky with the old wordmark. Still what is live on those accounts.
- `legacy/scripts/`: `brand-media.mjs` and its template, which rendered the set above. Not wired to `npm` any more; it expects to live at `scripts/`.
- `legacy/guides/`: the August 2026 PDF guides, their HTML sources and render script, and the Document Guide.
- `legacy/lettermark/`: the serif lettermark on a transparent ground.
- `legacy/linkedin/`: the cover without the website.

Older founder-specific and employee banners are in git history before commit fc50070. The sketch rounds that led to the mark are not in the repo; they are on Peat's machine in `../Brand-Media Legacy/`.
