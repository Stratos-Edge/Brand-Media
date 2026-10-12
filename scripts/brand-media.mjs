#!/usr/bin/env node
// Renders the brand media suite from scripts/brand-media/index.html with Playwright.
// Run: npm run media            -> review/ (every board, every lettermark option, a contact sheet; gitignored)
// Run: npm run media -- --final -> brand-assets/ (the chosen set, clean names)
import { mkdir, readFile, writeFile, copyFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "scripts", "brand-media");
const template = pathToFileURL(path.join(srcDir, "index.html")).href;
const final = process.argv.includes("--final");
const out = path.join(root, final ? "brand-assets" : "review");
await mkdir(out, { recursive: true });

// Masks cannot read file:// images, so the wordmark and its letters go in as data URIs.
const uri = async (name) => `url(data:image/png;base64,${(await readFile(path.join(srcDir, "src", name))).toString("base64")})`;
// Founders' photos for the review mockups only, read from the website repo when it is beside this one.
const site = path.resolve(root, "..", "Stratos-Edge-Website (GIT REPO)", "src", "assets", "people");
const photo = async (name) => { try { return `url(data:image/jpeg;base64,${(await readFile(path.join(site, name))).toString("base64")})`; } catch { return "none"; } };
const vars = `:root{--mark-url:${await uri("stratos-logo-black.png")};--s-url:${await uri("glyph-S.png")};--e-url:${await uri("glyph-E.png")};--pipe-url:${await uri("glyph-pipe.png")};--photo-micah:${await photo("micah-laughlin.jpg")};--photo-jeff:${await photo("jeff-hardman.jpg")}}`;

// The chosen lettermark; change here when the choice changes.
const LETTERMARK = process.env.LETTERMARK ?? "serif";

// id, CSS width, CSS height, device scale, final file name (relative to brand-assets/), note.
const BOARDS = [
  ["sharing-image", 1200, 630, 2, "social/sharing-image.png", "Sharing image for links, 2400x1260 (1.91:1), 100px clear margins"],
  ["linkedin-personal-1-confidence", 1584, 396, 1, null, "Confidence before technology. (review only; the chosen set carries the website)"],
  ["mock-personal-1-confidence", 1128, 695, 1, null, "Mockup"],
  ["linkedin-personal-2-confidence-website", 1584, 396, 1, "social/linkedin/personal-2-confidence-website.png", "Confidence before technology. stratosedge.ai"],
  ["mock-personal-2-confidence-website", 1128, 695, 1, null, "Mockup"],
  ["linkedin-personal-3-what-we-do-website", 1584, 396, 1, "social/linkedin/personal-3-what-we-do-website.png", "AI strategy consulting. stratosedge.ai"],
  ["mock-personal-3-what-we-do-website", 1128, 695, 1, null, "Mockup"],
  ["linkedin-company-1-what-we-do-website", 1128, 191, 1, "social/linkedin/company-1-what-we-do-website.png", "AI strategy consulting. stratosedge.ai"],
  ["mock-company-1-what-we-do-website", 1128, 432, 1, null, "Mockup"],
  ["linkedin-company-2-sentence-website", 1128, 191, 1, "social/linkedin/company-2-sentence-website.png", "AI strategy consulting. The sentence. stratosedge.ai"],
  ["mock-company-2-sentence-website", 1128, 432, 1, null, "Mockup"],
  ["x-header", 1500, 500, 1, "social/x-header.png", "X header, 1500x500"],
  ["youtube-banner", 2560, 1440, 1, "social/youtube-banner.png", "YouTube banner, 2560x1440, safe area 1546x423"],
  ...["serif", "wordmark", "monogram", "sans"].flatMap((k) => [
    [`avatar-${k}`, 400, 400, 1, k === LETTERMARK ? "social/stratos-profile.png" : null, `Profile avatar: lettermark ${k}`],
    [`favicon-${k}`, 512, 512, 1, k === LETTERMARK ? "core/stratos-favicon.png" : null, `Favicon: lettermark ${k}`],
  ]),
];
const FAVICON_SIZES = [180, 32, 16];
const boards = final ? BOARDS.filter((b) => b[4]) : BOARDS;

const browser = await chromium.launch();
try {
  for (const [id, w, h, scale, finalName] of boards) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
    await page.goto(`${template}?board=${id}&w=${w}&h=${h}`, { waitUntil: "load" });
    await page.addStyleTag({ content: vars });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; }))));
    });
    await page.waitForTimeout(150);
    const file = path.join(out, final ? finalName : `${id}.png`);
    await mkdir(path.dirname(file), { recursive: true });
    await page.screenshot({ path: file, omitBackground: id.startsWith("favicon") });
    if (id.startsWith("favicon")) {
      for (const size of FAVICON_SIZES) {
        const target = final ? file.replace(/\.png$/, `-${size}.png`) : path.join(out, `${id}-${size}.png`);
        execFileSync("sips", ["-z", String(size), String(size), file, "--out", target], { stdio: "ignore" });
      }
    }
    await page.close();
    console.log(`wrote ${path.relative(root, file)}`);
  }

  if (!final) {
    const cell = ([id, w, h, scale, , note]) => {
      if (id.startsWith("linkedin-")) return "";
      const fav = id.startsWith("favicon");
      const strip = fav ? `<div class="strip">${FAVICON_SIZES.map((s) => `<img src="${id}-${s}.png" width="${s}" height="${s}" alt="" /><span>${s}</span>`).join("")}</div>` : "";
      return `<figure><img src="${id}.png" style="width:${fav || id.startsWith("avatar") ? 180 : Math.min(760, w)}px;aspect-ratio:${w}/${h}" alt="" />${strip}<figcaption><strong>${id}</strong> · ${w * scale}×${h * scale}<br />${note}</figcaption></figure>`;
    };
    const sheet = `<!doctype html><meta charset="utf-8"><title>Stratos Edge brand media, review sheet</title>
    <style>body{margin:0;padding:48px;background:#e9e7e1;font-family:'Source Sans 3',-apple-system,sans-serif;color:#04242d}
    h1{font-family:'Work Sans',sans-serif;font-weight:300;font-size:34px;margin:0 0 8px}p{margin:0 0 36px;color:#4c6065}
    main{display:flex;flex-wrap:wrap;gap:36px 48px;align-items:flex-start}figure{margin:0}img{display:block;box-shadow:0 1px 2px rgba(4,36,45,.18)}
    .strip{display:flex;gap:18px;align-items:flex-end;margin-top:14px}.strip span{font-size:12px;color:#4c6065;margin-left:-14px}.strip img{box-shadow:none}
    figcaption{margin-top:10px;font-size:14px;line-height:1.4;max-width:760px}</style>
    <h1>Stratos Edge brand media, review sheet</h1><p>Rendered from scripts/brand-media/index.html on the site's sky wash. Review only.</p>
    <main>${boards.map(cell).join("")}</main>`;
    await writeFile(path.join(out, "00-contact-sheet.html"), sheet);
    const page = await browser.newPage({ viewport: { width: 1720, height: 1200 } });
    await page.goto(pathToFileURL(path.join(out, "00-contact-sheet.html")).href, { waitUntil: "load" });
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(out, "00-contact-sheet.png"), fullPage: true });
  }
} finally {
  await browser.close();
}
console.log(`done: ${out}`);
