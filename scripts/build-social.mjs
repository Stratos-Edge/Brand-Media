#!/usr/bin/env node
// Renders brand-assets/social/sharing-image.png (2400 by 1260, 1.91:1) from scripts/sharing-image.html. Run: npm run social
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "brand-assets", "social");
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(path.join(root, "scripts", "sharing-image.html")).href, { waitUntil: "networkidle" });
await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map((i) => i.complete || new Promise((r) => { i.onload = i.onerror = r; }))); });
await page.screenshot({ path: path.join(out, "sharing-image.png") });
await browser.close();
console.log("wrote brand-assets/social/sharing-image.png");
