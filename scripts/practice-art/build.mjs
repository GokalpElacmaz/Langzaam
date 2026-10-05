/**
 * Build the hand-drawn vocabulary sheets for the later A2 practice lessons.
 *   node scripts/practice-art/build.mjs animals jobs …        writes public/images/practice/<name>.svg
 *   node scripts/practice-art/build.mjs --review <dir> animals  also renders a PNG of the sheet to look at
 * Each topic module default-exports twenty { word, alt, bg?, art } cells in reading order; art.js maps
 * the same order to the vocabulary entries.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sheet } from './lib.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const args = process.argv.slice(2);
const reviewAt = args.indexOf('--review');
const reviewDir = reviewAt >= 0 ? args.splice(reviewAt, 2)[1] : null;

for (const name of args) {
  const { default: cells } = await import(join(here, `${name}.mjs`));
  const out = join(root, 'public', 'images', 'practice', `${name}.svg`);
  writeFileSync(out, sheet(cells));
  console.log(out, cells.map((cell) => cell.word).join(' '));
  if (reviewDir) {
    const { chromium } = await import('@playwright/test');
    mkdirSync(reviewDir, { recursive: true });
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1600, height: 1500 } });
    await page.goto('file://' + out);
    await page.screenshot({ path: join(reviewDir, `${name}.png`) });
    // The lessons show a cell at roughly 220 px wide; check that size too.
    await page.goto('about:blank');
    await page.setViewportSize({ width: 880, height: 825 });
    await page.setContent(`<body style="margin:0"><img src="data:image/svg+xml;base64,${Buffer.from(readFileSync(out)).toString('base64')}" width="880" height="825"></body>`);
    await page.waitForTimeout(150);
    await page.screenshot({ path: join(reviewDir, `${name}-small.png`) });
    await browser.close();
  }
}
