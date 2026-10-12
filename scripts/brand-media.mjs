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
  ["linkedin-micah-1-confidence", 1584, 396, 1, "social/linkedin/micah-1-confidence.png", "Confidence before technology."],
  ["mock-micah-1-confidence", 1128, 695, 1, null, "Mockup"],
  ["linkedin-micah-2-cio-seat", 1584, 396, 1, "social/linkedin/micah-2-cio-seat.png", "26 years in the CIO's seat. Now on your side of the table."],
  ["mock-micah-2-cio-seat", 1128, 695, 1, null, "Mockup"],
  ["linkedin-micah-3-what-it-returns", 1584, 396, 1, "social/linkedin/micah-3-what-it-returns.png", "What the AI already in your building returns, and what to do next."],
  ["mock-micah-3-what-it-returns", 1128, 695, 1, null, "Mockup"],
  ["linkedin-micah-4-confidence-fact", 1584, 396, 1, "social/linkedin/micah-4-confidence-fact.png", "Confidence before technology, with the 26 years under it"],
  ["mock-micah-4-confidence-fact", 1128, 695, 1, null, "Mockup"],
  ["linkedin-micah-5-helping-leaders-right", 1584, 396, 1, "social/linkedin/micah-5-helping-leaders-right.png", "Helping leaders see what AI returns, and what to do next (right-aligned, with the website)"],
  ["mock-micah-5-helping-leaders-right", 1128, 695, 1, null, "Mockup"],
  ["linkedin-jeff-1-four-decades", 1584, 396, 1, "social/linkedin/jeff-1-four-decades.png", "Four decades connecting the mid-market to technology that fits."],
  ["mock-jeff-1-four-decades", 1128, 695, 1, null, "Mockup"],
  ["linkedin-jeff-2-thousand-deals", 1584, 396, 1, "social/linkedin/jeff-2-thousand-deals.png", "More than 1,000 deals. One question: what will it return?"],
  ["mock-jeff-2-thousand-deals", 1128, 695, 1, null, "Mockup"],
  ["linkedin-jeff-3-bring-the-problem", 1584, 396, 1, "social/linkedin/jeff-3-bring-the-problem.png", "Bring the problem. We'll bring the plan."],
  ["mock-jeff-3-bring-the-problem", 1128, 695, 1, null, "Mockup"],
  ["linkedin-jeff-4-what-we-do-fact", 1584, 396, 1, "social/linkedin/jeff-4-what-we-do-fact.png", "AI strategy consulting, with the four decades under it"],
  ["mock-jeff-4-what-we-do-fact", 1128, 695, 1, null, "Mockup"],
  ["linkedin-jeff-5-four-decades-right", 1584, 396, 1, "social/linkedin/jeff-5-four-decades-right.png", "Four decades connecting the mid-market to technology that fits (right-aligned, with the website)"],
  ["mock-jeff-5-four-decades-right", 1128, 695, 1, null, "Mockup"],
  ["linkedin-employee-1-what-we-do-website", 1584, 396, 1, "social/linkedin/employee-1-what-we-do-website.png", "AI strategy consulting, with the website"],
  ["mock-employee-1-what-we-do-website", 1128, 695, 1, null, "Mockup"],
  ["linkedin-employee-2-confidence", 1584, 396, 1, "social/linkedin/employee-2-confidence.png", "Confidence before technology."],
  ["mock-employee-2-confidence", 1128, 695, 1, null, "Mockup"],
  ["linkedin-employee-3-wordmark-what-we-do", 1584, 396, 1, "social/linkedin/employee-3-wordmark-what-we-do.png", "The wordmark, with AI strategy consulting"],
  ["mock-employee-3-wordmark-what-we-do", 1128, 695, 1, null, "Mockup"],
  ["linkedin-company-1-what-we-do-website", 1128, 191, 1, "social/linkedin/company-1-what-we-do-website.png", "AI strategy consulting, with the website"],
  ["mock-company-1-what-we-do-website", 1128, 433, 1, null, "Mockup"],
  ["linkedin-company-2-sentence-website", 1128, 191, 1, "social/linkedin/company-2-sentence-website.png", "AI strategy consulting, the full sentence and the website"],
  ["mock-company-2-sentence-website", 1128, 433, 1, null, "Mockup"],
  ["linkedin-company-3-confidence", 1128, 191, 1, "social/linkedin/company-3-confidence.png", "Confidence before technology."],
  ["mock-company-3-confidence", 1128, 433, 1, null, "Mockup"],
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
