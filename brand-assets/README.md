# Stratos Edge brand assets

One mark in three forms. Use the fullest form that fits the space: the **lockup** (mark and wordmark), then the **wordmark** (`STRATOS ⋮ EDGE`), then the **S** alone.

`usage.png` shows all of this on one page. The live specimen, with the hover animation, is https://stratos-mark.vercel.app (unlisted; its source is in `show-page/`).

**Status (10 November 2026):** adopted. The website and the social accounts still carry the October 2026 lettermark and the line-divided wordmark until they are updated; those files are in `../legacy/`.

## Which file to use

| You need | Use | Notes |
|---|---|---|
| The fullest form, on light | `lockup/lockup-ink.svg` (or `.png`) | Mark + wordmark |
| The fullest form, on ink | `lockup/lockup-white.svg` (or `.png`) | Letters and bottom piece white |
| The wordmark, on light / on ink | `wordmark/wordmark-ink.svg`, `wordmark/wordmark-white.svg` | Also `.png`, 2400 wide |
| Favicon | `icon/favicon.svg` | Light icon; switches to the dark one when the browser is in dark mode |
| Favicon, PNG fallbacks | `icon/favicon-32.png`, `icon/favicon-16.png`, `icon/favicon.ico` | `favicon-dark-*.png` for dark surfaces |
| iPhone home-screen icon | `icon/apple-touch-icon-180.png` | Square to the edges; the phone rounds the corners |
| Profile picture (LinkedIn, YouTube, Slack) | `icon/avatar-1024.png` | Square to the edges; the platform crops to a circle. `avatar-dark-1024.png` for dark |
| App icon, shortcut, any tile | `icon/icon-s.svg` or `icon-s-<size>.png` | Sizes 16 to 1024; `icon-s-dark*` for dark |
| The mark on our own light pages | `mark/element/mark-s-colour.svg` | No canvas |
| The mark on ink | `mark/element/mark-s-reversed.svg` | The ink piece turns white |
| One colour, for print or stamps | `mark/element/mark-s-ink.svg`, `mark/element/mark-s-white.svg` | |
| The canvas alone | `mark/canvas/canvas.svg`, `canvas-dark.svg` | `-full-bleed` has square corners; PNGs at 1024 |
| The dots | `mark/states/dots-stacked-colour.svg` | Also `dots-triangle` and `dots-row`, each with a `-reversed` version |
| The mark moving on a web page | `mark/animation/mark.css` | See "Animation" below |
| The mark moving in a deck, email or video | `mark/animation/icon-dots-to-s.mp4` or `.gif` | |

Every `mark/element` SVG also has a 1024 px PNG beside it.

## Colours

| Piece | Colour | Hex | Stands for |
|---|---|---|---|
| Top | Coral | `#FF6B4A` | People |
| Middle | Steel | `#527D98` | Productivity |
| Bottom | Ink | `#04242D` | Automation |

The order never changes. On an ink background the bottom piece is white. The same three dots, in the same order, divide the wordmark.

The light canvas is a blank off-white (`#FDFCFA`) with a fine paper grain and a hairline ink edge. The dark canvas is `#0B3441` with the same grain and a light edge.

## Rules

- **The fullest form that fits.** Lockup, then wordmark, then the S.
- **The S is the icon.** Wherever one fixed square image stands for us. Show the dots only where the mark moves.
- **Canvas or no canvas.** On the canvas when it is an icon or sits on a surface that is not ours. Without the canvas on our own light or ink pages.
- **Clear space.** Round the wordmark and the lockup, the height of the capitals. Round the bare mark, one dot; the mark files already include it.
- **Smallest size.** 16 px on the canvas; 20 px tall bare; a 14 px cap height for the wordmark.
- **Don't** outline the pieces, change or reorder the colours, rotate or stretch anything, put the bare mark on a photo or a mid-tone, set the wordmark in another typeface, or bring back the line between the words.

## The wordmark

Work Sans. `STRATOS` at weight 500 with 0.18em letter-spacing; `EDGE` at weight 300 with 0.14em letter-spacing at 85% opacity. Between them the three dots, as tall as the capitals, with 0.42em of space either side. In the lockup the S is 1.06em tall and sits 0.52em before `STRATOS`.

The SVGs carry the letters as outlines, so they need no font. On a web page the wordmark is live text: `show-page/index.html` has the markup and the CSS (`.wm`), and the dots are a 16 by 66 SVG.

## Animation

The S at rest; while the pointer is over it, the two pills draw in to dots, and they stretch back out when the pointer leaves. 0.7 s, `cubic-bezier(.22, 1, .36, 1)`. It should always end on the S.

**On a web page**, link `mark/animation/mark.css` and add:

```html
<span class="se-mark" role="img" aria-label="Stratos Edge"><i></i><i></i><i></i></span>
```

Set its size with `font-size`. Add `se-mark--reversed` on ink. It also opens when a link that contains it is hovered, and it does not move for people who have asked their device to reduce motion. Open `mark/animation/mark-hover.html` to try it.

**As a single file** (these play in any current browser, including inside an `<img>`): `mark-dots-to-s.svg` (dots, then the S, then holds), `-reversed` for ink, `mark-loop.svg` (repeating), `icon-dots-to-s.svg` / `-dark` (on the canvas), `icon-loop.svg`, and `icon-dots-to-s.mp4` / `.gif` (on the canvas, on white, for decks, email and video).

## The drawing, in numbers

In a 512 by 512 box, every piece is 76 tall with fully round ends.

| Piece | Left edge | Top edge | Width |
|---|---|---|---|
| Top pill | 196 | 118 | 170 |
| Dot | 218 | 218 | 76 |
| Bottom pill | 146 | 318 | 170 |

Stacked dots sit at left edge 218 and top edges 118, 218 and 318. On the canvas the mark is drawn 8% larger about the centre. The bare SVGs use the full 512 box, which leaves one dot of clear space round the mark.

## Rebuilding

Everything here except this README and `show-page/` is produced by one script:

```
npm install
npm run build
```

It needs `ffmpeg` on the PATH (video and GIF) and `uv` (it runs fontTools for the letter outlines and Pillow for `favicon.ico`, without installing either). The letters come from `../scripts/fonts/WorkSans-VariableFont_wght.ttf`.

## Not done yet

- Replacing the favicon, sharing image and profile pictures on the website and the social accounts.
- Updating the website header to the new wordmark or lockup.
