#!/usr/bin/env node
// Builds everything in brand-assets/ except show-page/ and README.md:
//   mark/      the S and its states, bare and on the canvas, light and dark, plus the animation
//   icon/      favicons, app icons and avatars at every size, light and dark, favicon.svg that follows the system theme
//   wordmark/  STRATOS · EDGE with the three dots as the divider, as real outlines (SVG) and PNG
//   lockup/    the mark beside the wordmark, the fullest form, SVG and PNG
//   usage.html / usage.png   one page showing which file goes where
// Run: npm run build   (needs ffmpeg on the PATH for the .mp4 and .gif, and uv for the letter outlines and favicon.ico)
import { mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "brand-assets");
const FONT = path.join(root, "scripts", "fonts", "WorkSans-VariableFont_wght.ttf");
const D = Object.fromEntries(["mark/element", "mark/states", "mark/canvas", "mark/animation", "icon", "wordmark", "lockup"].map((d) => [d, path.join(out, d)]));
for (const d of Object.values(D)) { await rm(d, { recursive: true, force: true }); await mkdir(d, { recursive: true }); }

// ---- the mark -------------------------------------------------------------------------------------------
// Drawn in a 512 box. Every piece is 76 tall with fully round ends: [x, y, width]. A dot is 76 wide.
// Top to bottom the colours are coral (people), steel (productivity), ink (automation).
const INK = "#04242D", STEEL = "#527D98", CORAL = "#FF6B4A", WHITE = "#FFFFFF", H = 76;
const STATES = {
  s: [[196, 118, 170], [218, 218, 76], [146, 318, 170]],              // the S: pill to the right, dot, pill to the left
  "dots-stacked": [[218, 118, 76], [218, 218, 76], [218, 318, 76]],
  "dots-triangle": [[218, 140, 76], [300, 282, 76], [136, 282, 76]],
  "dots-row": [[118, 218, 76], [218, 218, 76], [318, 218, 76]],
};
const WAYS = { colour: [CORAL, STEEL, INK], reversed: [CORAL, STEEL, WHITE], ink: [INK, INK, INK], white: [WHITE, WHITE, WHITE] };
const n = (v) => +v.toFixed(2);
const pieces = (st, cols, extra = () => "") => st.map(([x, y, w], i) => `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${H}" rx="${H / 2}" fill="${cols[i]}">${extra(i)}</rect>`).join("");
const wrap = (inner, title, box = "0 0 512 512") => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box}" role="img"><title>${title}</title>${inner}</svg>\n`;
const TIGHT = "70 42 372 428"; // the bare mark with exactly one dot of clear space

// ---- the canvas -----------------------------------------------------------------------------------------
// A rounded tile with a fine paper grain and a hairline edge. Light: blank off-white. Dark: deep teal-navy.
// bleed = fill the whole square with no rounded corners (for places that crop the icon themselves).
const CANVAS = {
  light: { fill: "#FDFCFA", grain: 0.11, blend: "multiply", edge: INK, cols: WAYS.colour },
  dark: { fill: "#0B3441", grain: 0.07, blend: "screen", edge: "#FEFDFB", cols: WAYS.reversed },
};
const SCALE = 1.08; // the mark is drawn slightly larger on the canvas than in the bare 512 box
const canvas = (inner = "", { bleed = false, id = "c", theme = "light", auto = false } = {}) => {
  const c = CANVAS[theme];
  const R = bleed ? `x="0" y="0" width="512" height="512"` : `x="16" y="16" width="480" height="480"`, rx = bleed ? 0 : 112;
  // auto = carry both themes and let the viewer's colour scheme pick (for favicon.svg)
  const style = auto ? `<style>.bg{fill:${CANVAS.light.fill}}.gr{opacity:${CANVAS.light.grain};mix-blend-mode:multiply}.ed{stroke:${INK}}.last{fill:${INK}}
    @media(prefers-color-scheme:dark){.bg{fill:${CANVAS.dark.fill}}.gr{opacity:${CANVAS.dark.grain};mix-blend-mode:screen}.ed{stroke:#FEFDFB}.last{fill:${WHITE}}}</style>` : "";
  return `${style}<defs>
    <clipPath id="${id}-clip"><rect ${R} rx="${rx}"/></clipPath>
    <filter id="${id}-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="7"/><feColorMatrix type="saturate" values="0"/></filter></defs>
  <g clip-path="url(#${id}-clip)"><rect class="bg" ${R} fill="${c.fill}"/><rect class="gr" ${R} filter="url(#${id}-grain)" opacity="${c.grain}" style="mix-blend-mode:${c.blend}"/></g>
  ${bleed ? "" : `<rect class="ed" ${R} rx="${rx}" fill="none" stroke="${c.edge}" stroke-opacity="0.14" stroke-width="2"/>`}
  ${inner ? `<g transform="translate(256 256) scale(${SCALE}) translate(-256 -256)">${inner}</g>` : ""}`;
};

// ---- write the vector files -----------------------------------------------------------------------------
const files = {}; // name -> svg text, also used below for the PNGs and the usage sheet
const put = async (dir, name, svg) => { files[name] = svg; await writeFile(path.join(D[dir], `${name}.svg`), svg); };
for (const [way, cols] of Object.entries(WAYS)) await put("mark/element", `mark-s-${way}`, wrap(pieces(STATES.s, cols), "Stratos Edge"));
for (const [st, geo] of Object.entries(STATES)) for (const way of ["colour", "reversed"]) await put("mark/states", `${st}-${way}`, wrap(pieces(geo, WAYS[way]), "Stratos Edge"));
for (const theme of ["light", "dark"]) {
  const sfx = theme === "dark" ? "-dark" : "";
  await put("mark/canvas", `canvas${sfx}`, wrap(canvas("", { theme }), "Stratos Edge canvas"));
  await put("mark/canvas", `canvas${sfx}-full-bleed`, wrap(canvas("", { theme, bleed: true }), "Stratos Edge canvas"));
  await put("icon", `icon-s${sfx}`, wrap(canvas(pieces(STATES.s, CANVAS[theme].cols), { theme }), "Stratos Edge"));
  await put("icon", `icon-s${sfx}-full-bleed`, wrap(canvas(pieces(STATES.s, CANVAS[theme].cols), { theme, bleed: true }), "Stratos Edge"));
  await put("icon", `icon-dots${sfx}`, wrap(canvas(pieces(STATES["dots-stacked"], CANVAS[theme].cols), { theme }), "Stratos Edge"));
}
// favicon.svg: the light icon, switching to the dark one when the browser is in dark mode
const autoPieces = STATES.s.map(([x, y, w], i) => `<rect ${i === 2 ? 'class="last" ' : ""}x="${x}" y="${y}" width="${w}" height="${H}" rx="${H / 2}" fill="${WAYS.colour[i]}"/>`).join("");
await put("icon", "favicon", wrap(canvas(autoPieces, { auto: true }), "Stratos Edge"));

// ---- animation: self-contained SVGs (work in every current browser, also as an <img>) --------------------
const EASE = ".65 0 .35 1", from = STATES["dots-stacked"], to = STATES.s;
const once = (i) => ["x", "width"].map((a, k) => from[i][k * 2] === to[i][k * 2] ? "" : `<animate attributeName="${a}" from="${from[i][k * 2]}" to="${to[i][k * 2]}" begin="0.6s" dur="0.5s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="${EASE}"/>`).join("");
const loop = (i) => ["x", "width"].map((a, k) => { const A = from[i][k * 2], B = to[i][k * 2]; return A === B ? "" : `<animate attributeName="${a}" values="${A};${A};${B};${B};${A}" keyTimes="0;0.2;0.36;0.84;1" dur="3.2s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1;${EASE};0 0 1 1;${EASE}"/>`; }).join("");
const anim = (name, svg) => writeFile(path.join(D["mark/animation"], name), svg);
await anim("mark-dots-to-s.svg", wrap(pieces(from, WAYS.colour, once), "Stratos Edge"));
await anim("mark-dots-to-s-reversed.svg", wrap(pieces(from, WAYS.reversed, once), "Stratos Edge"));
await anim("mark-loop.svg", wrap(pieces(from, WAYS.colour, loop), "Stratos Edge"));
await anim("icon-dots-to-s.svg", wrap(canvas(pieces(from, WAYS.colour, once)), "Stratos Edge"));
await anim("icon-dots-to-s-dark.svg", wrap(canvas(pieces(from, WAYS.reversed, once), { theme: "dark" }), "Stratos Edge"));
await anim("icon-loop.svg", wrap(canvas(pieces(from, WAYS.colour, loop)), "Stratos Edge"));

// ---- animation: the mark as three HTML elements, for hover on a web page ---------------------------------
// The S at rest; the three dots while the pointer is over it. (The show page uses exactly this.)
const pc = (v) => `${n((v / 512) * 100)}%`;
const EASE_CSS = "cubic-bezier(.22,1,.36,1)";
const css = `/* Stratos Edge mark. Three pieces: the S at rest, the three dots while hovered.
   <span class="se-mark" role="img" aria-label="Stratos Edge"><i></i><i></i><i></i></span>
   Size it with font-size: the mark is drawn in a 1em square with its own clear space.
   On a dark background add "se-mark--reversed". It also opens when a link that contains it is hovered. */
.se-mark{--se-1:${CORAL};--se-2:${STEEL};--se-3:${INK};position:relative;display:inline-block;width:1em;height:1em;font-size:64px;vertical-align:middle}
.se-mark--reversed{--se-3:#fff}
.se-mark i{position:absolute;height:${pc(H)};border-radius:999px;transition:left .7s ${EASE_CSS},width .7s ${EASE_CSS}}
.se-mark i:nth-child(1){top:${pc(to[0][1])};left:${pc(to[0][0])};width:${pc(to[0][2])};background:var(--se-1)}
.se-mark i:nth-child(2){top:${pc(to[1][1])};left:${pc(to[1][0])};width:${pc(to[1][2])};background:var(--se-2)}
.se-mark i:nth-child(3){top:${pc(to[2][1])};left:${pc(to[2][0])};width:${pc(to[2][2])};background:var(--se-3)}
.se-mark:hover i:nth-child(1),.se-mark:hover i:nth-child(3),a:hover .se-mark i:nth-child(1),a:hover .se-mark i:nth-child(3){left:${pc(from[0][0])};width:${pc(from[0][2])}}
@media (prefers-reduced-motion:reduce){.se-mark i{transition:none}}
`;
await anim("mark.css", css);
const tag = (cls, px) => `<span class="se-mark ${cls}" role="img" aria-label="Stratos Edge" style="font-size:${px}px"><i></i><i></i><i></i></span>`;
await anim("mark-hover.html", `<!doctype html><meta charset="utf-8"><title>Stratos Edge mark: hover</title><link rel="stylesheet" href="mark.css"><style>
  body{margin:0;min-height:100vh;display:grid;grid-template-columns:1fr 1fr;font:15px/1.5 system-ui;color:${INK}}
  section{display:grid;place-items:center;align-content:center;gap:18px;padding:40px} .dark{background:${INK};color:#fff} p{margin:0;opacity:.65;max-width:34ch;text-align:center}
</style><section style="background:#F8F8F8">${tag("", 220)}<p>Move the pointer over the mark. The S at rest, the three dots while hovered.</p></section>
<section class="dark">${tag("se-mark--reversed", 220)}<p>On ink, with <code>se-mark--reversed</code>.</p></section>`);

// ---- raster files ---------------------------------------------------------------------------------------
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
const png = async (svg, size, file, bg = null) => {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<style>html,body{margin:0;background:${bg ?? "transparent"}}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`);
  await page.screenshot({ path: file, omitBackground: !bg });
};
const SIZES = [1024, 512, 192, 96, 64, 48, 32, 16];
for (const way of Object.keys(WAYS)) await png(files[`mark-s-${way}`], 1024, path.join(D["mark/element"], `mark-s-${way}-1024.png`));
for (const name of ["canvas", "canvas-full-bleed", "canvas-dark", "canvas-dark-full-bleed"]) await png(files[name], 1024, path.join(D["mark/canvas"], `${name}-1024.png`));
for (const sfx of ["", "-dark"]) {
  for (const size of SIZES) await png(files[`icon-s${sfx}`], size, path.join(D.icon, `icon-s${sfx}-${size}.png`));
  await png(files[`icon-dots${sfx}`], 1024, path.join(D.icon, `icon-dots${sfx}-1024.png`));
  await png(files[`icon-s${sfx}`], 32, path.join(D.icon, `favicon${sfx}-32.png`));
  await png(files[`icon-s${sfx}`], 16, path.join(D.icon, `favicon${sfx}-16.png`));
  await png(files[`icon-s${sfx}-full-bleed`], 1024, path.join(D.icon, `avatar${sfx}-1024.png`)); // square, for profiles that crop to a circle
}
await png(files["icon-s-full-bleed"], 180, path.join(D.icon, "apple-touch-icon-180.png"));
// favicon.ico from the light PNGs (Pillow through uv, nothing installed)
execFileSync("uv", ["run", "--quiet", "--with", "pillow", "python3", "-c",
  `from PIL import Image; im=Image.open(${JSON.stringify(path.join(D.icon, "icon-s-48.png"))}); im.save(${JSON.stringify(path.join(D.icon, "favicon.ico"))}, sizes=[(16,16),(32,32),(48,48)])`]);

// ---- animation: video and GIF of the icon (dots, the S, hold) -------------------------------------------
const tmp = path.join(os.tmpdir(), `se-mark-frames-${process.pid}`);
await mkdir(tmp, { recursive: true });
const easeIO = (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2), fps = 30;
const at = (t) => from.map((q, i) => q.map((v, j) => v + (to[i][j] - v) * t));
const timeline = [...Array(18).fill(0), ...Array.from({ length: 15 }, (_, i) => easeIO((i + 1) / 15)), ...Array(42).fill(1), ...Array.from({ length: 15 }, (_, i) => 1 - easeIO((i + 1) / 15))];
for (const [i, t] of timeline.entries()) await png(wrap(canvas(pieces(at(t), WAYS.colour)), "Stratos Edge"), 512, path.join(tmp, `f${String(i).padStart(3, "0")}.png`), "#FFFFFF");
const ff = (args) => execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...args]);
ff(["-framerate", String(fps), "-i", path.join(tmp, "f%03d.png"), "-pix_fmt", "yuv420p", "-crf", "16", path.join(D["mark/animation"], "icon-dots-to-s.mp4")]);
ff(["-framerate", String(fps), "-i", path.join(tmp, "f%03d.png"), "-vf", "fps=30,scale=360:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=64[p];[b][p]paletteuse=dither=none", "-loop", "0", path.join(D["mark/animation"], "icon-dots-to-s.gif")]);
await rm(tmp, { recursive: true });

// ---- the wordmark and the lockup, as outlines -----------------------------------------------------------
// The wordmark is set as the brand guide sets it (Work Sans; STRATOS 500 at .18em, EDGE 300 at .14em and 85%),
// with the thin line replaced by three dots as tall as the capitals. The lockup puts the S before it.
// The browser lays it out exactly as the show page does, we read every letter's position back, and set the
// letters' outlines (from the font file, through fontTools) at those positions. So the SVG is the page, as vectors.
const glyphs = JSON.parse(execFileSync("uv", ["run", "--quiet", "--with", "fonttools", path.join(root, "scripts", "glyphs.py"), "500:STRATOS", "300:EDGE"], { encoding: "utf8" }));
const UPM = glyphs.unitsPerEm, FS = 250, K = UPM / FS; // measure at 250px, scale to font units
const markSvg = (cls = "") => `<svg class="s${cls}" viewBox="146 118 220 276" aria-hidden="true"><rect x="196" y="118" width="170" height="76" rx="38" fill="${CORAL}"/><rect x="218" y="218" width="76" height="76" rx="38" fill="${STEEL}"/><rect class="last" x="146" y="318" width="170" height="76" rx="38" fill="${INK}"/></svg>`;
const dotsSvg = `<svg class="dots" viewBox="-2 -2 20 70" aria-hidden="true"><circle cx="8" cy="8" r="8" fill="${CORAL}"/><circle cx="8" cy="33" r="8" fill="${STEEL}"/><circle class="last" cx="8" cy="58" r="8" fill="${INK}"/></svg>`;
// Chromium will not load a font from file://, so the pages that need it are served from a made-up origin.
const fontBytes = await readFile(FONT), served = {};
await page.route("https://brand.local/**", (r) => { const u = r.request().url(); return u.endsWith(".ttf") ? r.fulfill({ body: fontBytes, contentType: "font/ttf" }) : r.fulfill({ body: served[u] ?? "", contentType: "text/html" }); });
const serve = async (p, html) => { served[`https://brand.local/${p}`] = html; await page.goto(`https://brand.local/${p}`); await page.evaluate(() => document.fonts.ready); };
const FACE = (rel) => `@font-face{font-family:"Work Sans";src:url("${rel}");font-weight:100 900}`;
const WM = `.wm{display:inline-flex;align-items:center;gap:.42em;font-family:"Work Sans";line-height:1;white-space:nowrap}
.wm b{font-weight:500;letter-spacing:.18em;margin-right:-.18em}.wm i{font-style:normal;font-weight:300;letter-spacing:.14em;margin-right:-.14em;opacity:.85}
.wm .dots{height:.7em;width:.2em;display:block;overflow:visible}.wm .s{height:1.06em;width:auto;display:block;margin-right:.1em}`;
await page.setViewportSize({ width: 4000, height: 800 });
await serve("wordmark", `<!doctype html><meta charset="utf-8"><style>html,body{margin:0}${FACE("font.ttf")}${WM}.wm{font-size:${FS}px;padding:40px}</style>
<span class="wm" id="wm">${markSvg()}<b>STRATOS</b>${dotsSvg}<i>EDGE</i></span>`);
const M = await page.evaluate(() => {
  const box = (el) => { const r = el.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; };
  const letters = (el) => { // each character's pen origin and the baseline, from a zero-size inline-block
    const t = el.firstChild, outArr = [];
    for (let i = 0; i < t.length; i++) { const r = document.createRange(); r.setStart(t, i); r.setEnd(t, i + 1); outArr.push({ ch: t.data[i], x: r.getBoundingClientRect().left }); }
    const probe = document.createElement("span"); probe.style.cssText = "display:inline-block;width:0;height:0"; el.appendChild(probe);
    const base = probe.getBoundingClientRect().bottom; probe.remove();
    return { letters: outArr, base };
  };
  const wm = document.getElementById("wm");
  return { s: box(wm.querySelector(".s")), b: letters(wm.querySelector("b")), dots: box(wm.querySelector(".dots")), i: letters(wm.querySelector("i")), all: box(wm) };
});
// Convert the measurement to font units with the origin at the left of STRATOS (wordmark) or the mark (lockup).
const u = (v) => n(v * K);
const letterPaths = (m, wght) => m.letters.map(({ ch, x }) => `<path transform="translate(${u(x)} ${u(m.base)})" d="${glyphs.glyphs[wght][ch].d}"/>`).join("");
const dots = (cols) => { const s = M.dots.h / 70; return [8, 33, 58].map((cy, i) => `<circle cx="${u(M.dots.x + 10 * s)}" cy="${u(M.dots.y + (cy + 2) * s)}" r="${u(8 * s)}" fill="${cols[i]}"/>`).join(""); };
const markAt = (cols) => { const s = M.s.h / 276; return STATES.s.map(([x, y, w], i) => `<rect x="${u(M.s.x + (x - 146) * s)}" y="${u(M.s.y + (y - 118) * s)}" width="${u(w * s)}" height="${u(H * s)}" rx="${u(H / 2 * s)}" fill="${cols[i]}"/>`).join(""); };
// The vertical extent of a glyph outline in font units (y grows downward, baseline 0): the round letters overshoot
// the cap line and the baseline, and the box has to include that or the S, O and G are cut flat.
const glyphY = (d) => { let y0 = Infinity, y1 = -Infinity, cmd = ""; const t = d.match(/[A-Za-z]|-?\d*\.?\d+/g) ?? []; let nums = [];
  const flush = () => { if (!nums.length) return; if (cmd === "V") nums.forEach((v) => { y0 = Math.min(y0, v); y1 = Math.max(y1, v); }); else if (cmd !== "H") nums.forEach((v, i) => { if (i % 2) { y0 = Math.min(y0, v); y1 = Math.max(y1, v); } }); nums = []; };
  for (const k of t) { if (/[A-Za-z]/.test(k)) { flush(); cmd = k.toUpperCase(); } else nums.push(Number(k)); } flush(); return [y0, y1]; };
const inkY = (m, wght) => { let top = Infinity, bottom = -Infinity; for (const { ch } of m.letters) { const [y0, y1] = glyphY(glyphs.glyphs[wght][ch].d); top = Math.min(top, u(m.base) + y0); bottom = Math.max(bottom, u(m.base) + y1); } return [top, bottom]; };
const bounds = (withMark) => { // tight to the ink: from the first letter (or the mark) to the last letter's right edge, and the letters' real top and bottom
  const left = withMark ? M.s.x : M.b.letters[0].x, last = M.i.letters.at(-1), right = last.x + (glyphs.glyphs["300"][last.ch].adv / K);
  const [bTop, bBottom] = inkY(M.b, "500"), [iTop, iBottom] = inkY(M.i, "300");
  const top = Math.min(bTop, iTop, withMark ? u(M.s.y) : Infinity), bottom = Math.max(bBottom, iBottom, withMark ? u(M.s.y + M.s.h) : -Infinity);
  return { x: u(left), y: top, w: u(right - left), h: bottom - top };
};
const wordmark = (col, cols, withMark) => { const B = bounds(withMark); return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${B.w} ${B.h}" role="img"><title>Stratos Edge</title><g transform="translate(${-B.x} ${-B.y})">
  ${withMark ? markAt(cols) : ""}<g fill="${col}">${letterPaths(M.b, "500")}</g>${dots(cols)}<g fill="${col}" fill-opacity=".85">${letterPaths(M.i, "300")}</g></g></svg>\n`; };
for (const [name, col, cols] of [["ink", INK, WAYS.colour], ["white", WHITE, WAYS.reversed]]) {
  await put("wordmark", `wordmark-${name}`, wordmark(col, cols, false));
  await put("lockup", `lockup-${name}`, wordmark(col, cols, true));
}
// PNGs: 2400 wide on a transparent ground, with clear space of one cap height all round
const wide = async (svg, file) => {
  const [, , vw, vh] = svg.match(/viewBox="([^"]+)"/)[1].split(" ").map(Number), pad = glyphs.capHeight, W = 2400, S = W / (vw + 2 * pad);
  await page.setViewportSize({ width: W, height: Math.round((vh + 2 * pad) * S) });
  await page.setContent(`<style>html,body{margin:0;background:transparent}svg{display:block;position:absolute;left:${pad * S}px;top:${pad * S}px;width:${vw * S}px;height:${vh * S}px}</style>${svg}`);
  await page.screenshot({ path: file, omitBackground: true });
};
for (const name of ["wordmark-ink", "wordmark-white"]) await wide(files[name], path.join(D.wordmark, `${name}.png`));
for (const name of ["lockup-ink", "lockup-white"]) await wide(files[name], path.join(D.lockup, `${name}.png`));

// ---- the usage sheet ------------------------------------------------------------------------------------
const uid = (svg, key) => svg.replace(/id="c-/g, `id="${key}-`).replace(/url\(#c-/g, `url(#${key}-`);
const inline = (name, px, style = "") => `<span class="g" style="width:${px}px;height:${px}px;${style}">${uid(files[name], `u${px}${name.length}`).replace(name.startsWith("mark-s") ? 'viewBox="0 0 512 512"' : "~", `viewBox="${TIGHT}"`)}</span>`;
const vec = (name, h) => `<span class="v" style="height:${h}px">${files[name]}</span>`;
const usage = `<!doctype html><meta charset="utf-8"><title>Stratos Edge: the mark, the wordmark and the lockup</title><style>
  ${FACE("../scripts/fonts/WorkSans-VariableFont_wght.ttf")}
  body{margin:0;padding:64px 72px 80px;width:1456px;background:#fff;color:${INK};font:17px/1.5 "Work Sans",system-ui,sans-serif}
  h1{font-weight:300;font-size:52px;letter-spacing:-.02em;margin:0 0 10px} h1 em{font-style:normal;color:${CORAL}}
  h2{font-weight:600;font-size:20px;margin:0 0 6px} p{margin:0;max-width:62ch} .lede{font-size:21px;max-width:58ch}
  section{border-top:1px solid rgba(4,36,45,.12);padding:40px 0 44px;display:grid;grid-template-columns:330px 1fr;gap:44px;align-items:start}
  .g{display:inline-block;vertical-align:bottom} .g svg{display:block;width:100%;height:100%} .v{display:inline-block} .v svg{display:block;height:100%;width:auto}
  .row{display:flex;gap:34px;align-items:flex-end;flex-wrap:wrap} .col{display:grid;gap:26px} figure{margin:0} figcaption{margin-top:10px;font-size:14px;opacity:.62;max-width:26ch}
  .ink{background:${INK};color:#fff;padding:26px 30px;border-radius:6px} .paper{background:#F8F8F8;padding:26px 30px;border-radius:6px}
  .tab{display:inline-flex;align-items:center;gap:9px;background:#F1F3F4;border-radius:10px 10px 0 0;padding:9px 46px 9px 13px;font:13px system-ui;color:#3c4043} .tab.dk{background:#202124;color:#e8eaed}
  .circle{border-radius:50%;overflow:hidden} .sw{width:120px} .sw b{display:block;height:64px;border-radius:6px;margin-bottom:8px} .sw span{display:block;font-size:14px;opacity:.7}
  .no{position:relative} .no:after{content:"";position:absolute;left:8%;right:8%;top:50%;height:2px;background:${CORAL};transform:rotate(-38deg)}
  ul{margin:0;padding-left:1.1em} li{margin-bottom:4px}
</style>
<h1>Stratos Edge<em>.</em></h1><p class="lede">One mark in three forms. Use the fullest form that fits the space: the lockup, then the wordmark, then the S on its own.</p>
<section style="margin-top:36px"><div><h2>Three forms</h2><p>The lockup is the mark beside the wordmark. The wordmark is STRATOS and EDGE with the three dots between them. The S is the mark alone, for tight spaces and icons.</p></div>
  <div class="col"><div class="paper">${vec("lockup-ink", 74)}</div><div class="paper">${vec("wordmark-ink", 46)}</div><div class="paper" style="width:min-content">${inline("mark-s-colour", 72)}</div></div></section>
<section><div><h2>On ink</h2><p>On a dark background the letters are white and the bottom piece of the mark turns white. Coral and steel stay as they are.</p></div>
  <div class="col ink"><div>${vec("lockup-white", 74)}</div><div>${vec("wordmark-white", 46)}</div><div>${inline("mark-s-reversed", 72)}</div></div></section>
<section><div><h2>The S as an icon</h2><p>Where one fixed square image stands for us (favicon, profile picture, app icon) the S sits on its canvas. The canvas is light or dark to match the surface. <code>favicon.svg</code> carries both and follows the system theme.</p></div>
  <div class="row">${inline("icon-s", 200)}${inline("icon-s-dark", 200)}<div class="row" style="gap:18px">${[96, 48, 32, 16].map((px) => inline("icon-s", px)).join("")}</div><div class="row" style="gap:18px">${[96, 48, 32, 16].map((px) => inline("icon-s-dark", px)).join("")}</div></div></section>
<section><div><h2>Where each file goes</h2><p>The icon on the canvas when the surface is not ours. The bare mark on our own pages, where the background is already ours.</p></div>
  <div class="row">
    <figure><span class="tab">${inline("icon-s", 16)}Stratos Edge</span><span class="tab dk">${inline("icon-s-dark", 16)}Stratos Edge</span><figcaption>Browser tab: favicon.svg, or favicon-32 and -16</figcaption></figure>
    <figure><span class="g circle" style="width:96px;height:96px">${uid(files["icon-s-full-bleed"], "av")}</span><figcaption>Profile picture: avatar-1024, cropped to a circle by the platform</figcaption></figure>
    <figure>${inline("icon-s", 96)}<figcaption>App icon and shortcuts: icon-s</figcaption></figure>
    <figure><div class="paper">${inline("mark-s-colour", 84)}</div><figcaption>On our light pages: mark-s-colour</figcaption></figure>
    <figure><div class="ink">${inline("mark-s-reversed", 84)}</div><figcaption>On ink: mark-s-reversed</figcaption></figure>
    <figure><div class="paper">${inline("mark-s-ink", 84)}</div><figcaption>One colour, for print and stamps: mark-s-ink or mark-s-white</figcaption></figure>
  </div></section>
<section><div><h2>The mark moves</h2><p>The S can rest as three stacked dots and become the S, or sit as the S and open into the dots while the pointer is over it. It should always end on the S.</p></div>
  <div class="row"><figure>${inline("icon-dots", 150)}<figcaption>The dots</figcaption></figure><figure>${inline("icon-s", 150)}<figcaption>The S</figcaption></figure><figure><div class="paper">${vec("dots-stacked-colour", 72).replace('viewBox="0 0 512 512"', `viewBox="${TIGHT}"`)}</div><figcaption>The bare dots, mark/states</figcaption></figure></div></section>
<section><div><h2>Colours</h2><p>Top to bottom, always in this order: coral for people, steel for productivity, ink for automation. The same three dots divide the wordmark.</p></div>
  <div class="row">${[["Coral", CORAL], ["Steel", STEEL], ["Ink", INK]].map(([a, b]) => `<div class="sw"><b style="background:${b}"></b>${a}<span>${b}</span></div>`).join("")}<div class="sw"><b style="background:${CANVAS.light.fill};outline:1px solid rgba(4,36,45,.1)"></b>Canvas<span>${CANVAS.light.fill} + grain</span></div><div class="sw"><b style="background:${CANVAS.dark.fill}"></b>Dark canvas<span>${CANVAS.dark.fill} + grain</span></div></div></section>
<section><div><h2>Space and size</h2><p>Round the wordmark and the lockup keep clear space equal to the height of the capitals. Round the bare mark keep one dot; the mark files already include it. On the canvas the S works down to 16 px; bare, keep it at least 20 px tall. The wordmark should not go below 14 px of cap height.</p></div>
  <div class="row"><figure><span class="g" style="width:170px;height:170px;outline:1px dashed rgba(4,36,45,.3)">${files["mark-s-colour"].replace('viewBox="0 0 512 512"', `viewBox="${TIGHT}"`)}</span><figcaption>The dashed line is the clear space: one dot from the mark</figcaption></figure></div></section>
<section><div><h2>Don't</h2><ul><li>Draw an outline round the pieces.</li><li>Change, swap or add colours.</li><li>Rotate, stretch or re-space the pieces or the letters.</li><li>Put the bare mark on a photo or a mid-tone. Use the canvas.</li><li>Set the wordmark in another typeface, or bring back the line between the words.</li></ul></div>
  <div class="row"><figure><span class="g no" style="width:110px;height:110px">${wrap(`<rect x="126" y="98" width="260" height="316" rx="60" fill="none" stroke="${INK}" stroke-width="6"/>` + pieces(STATES.s, WAYS.colour), "", TIGHT)}</span><figcaption>No outline</figcaption></figure>
    <figure><span class="g no" style="width:110px;height:110px">${wrap(pieces(STATES.s, [CORAL, INK, STEEL]), "", TIGHT)}</span><figcaption>No reordering</figcaption></figure>
    <figure><span class="g no" style="width:110px;height:110px">${wrap(`<g transform="rotate(-24 256 256)">${pieces(STATES.s, WAYS.colour)}</g>`, "", TIGHT)}</span><figcaption>No rotating</figcaption></figure>
    <figure><span class="g no" style="width:110px;height:110px;background:linear-gradient(120deg,#13ADD0,#64BAD3);border-radius:6px">${files["mark-s-colour"].replace('viewBox="0 0 512 512"', `viewBox="${TIGHT}"`)}</span><figcaption>Not bare on a colour or photo</figcaption></figure></div></section>`;
const usagePath = path.join(out, "usage.html");
await writeFile(usagePath, usage);
await page.setViewportSize({ width: 1600, height: 900 });
await serve("brand-assets/usage.html", usage);
await page.screenshot({ path: path.join(out, "usage.png"), fullPage: true });
await browser.close();
console.log("wrote", out);
