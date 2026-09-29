/**
 * Render illustrations to PNG so they can be looked at (any platform; uses Playwright's Chromium).
 *   node scripts/render-svg.mjs <out-dir> public/images/a.svg [more.svg …]
 * Each picture is drawn at 800×600 and also placed at the 220×165 thumbnail size the lessons use,
 * side by side, so both the detail and the small-size readability can be judged.
 */
import { chromium } from '@playwright/test';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';

const [outDir, ...files] = process.argv.slice(2);
if (!outDir || !files.length) throw new Error('usage: node scripts/render-svg.mjs <out-dir> <file.svg> …');
mkdirSync(outDir, { recursive: true });
// A preinstalled Chromium (CHROMIUM_PATH, or the one in cloud containers) is used when Playwright's own is absent.
const preinstalled = [process.env.CHROMIUM_PATH, '/opt/pw-browsers/chromium'].find((path) => path && existsSync(path));
const browser = await chromium.launch(preinstalled ? { executablePath: preinstalled } : {});
const page = await browser.newPage({ viewport: { width: 1060, height: 620 } });
for (const file of files) {
  const svg = readFileSync(resolve(file), 'utf8');
  const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  await page.setContent(`<body style="margin:10px;background:#fff;display:flex;gap:16px;align-items:flex-start"><img src="${src}" width="800" height="600"><img src="${src}" width="220" height="165"></body>`);
  await page.waitForTimeout(100);
  const out = join(outDir, basename(file).replace(/\.svg$/u, '.png'));
  await page.screenshot({ path: out });
  console.log(out);
}
await browser.close();
