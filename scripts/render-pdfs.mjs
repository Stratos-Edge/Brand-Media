#!/usr/bin/env node
/**
 * Render the HTML sources to PDFs using Playwright.
 * Run: npm run render
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const docs = [
  { source: 'brand-guide.html',    output: 'Stratos_Edge_Brand_Guide.pdf',    title: 'Brand Guide' },
  { source: 'document-guide.html', output: 'Stratos_Edge_Document_Guide.pdf', title: 'Document Guide' },
];

const browser = await chromium.launch();
const context = await browser.newContext();

try {
  for (const doc of docs) {
    const sourcePath = path.join(repoRoot, 'guides', 'pdf-sources', doc.source);
    const outputPath = path.join(repoRoot, 'guides', doc.output);
    const fileUrl = 'file://' + sourcePath;

    process.stdout.write(`▸ Rendering ${doc.title} … `);

    const page = await context.newPage();
    await page.goto(fileUrl, { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print' });
    // Wait an extra beat so the embedded Google Fonts settle.
    await page.waitForTimeout(500);

    await page.pdf({
      path: outputPath,
      format: 'Letter',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    });

    await page.close();
    console.log('✓');
  }
} finally {
  await browser.close();
}

console.log('\nDone.');
