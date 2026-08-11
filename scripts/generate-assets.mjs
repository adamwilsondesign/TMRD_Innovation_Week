/**
 * Renders every procedural artwork defined in scripts/assets/generator.html
 * through headless Chromium and writes JPEGs into public/images/.
 *
 * Usage: node scripts/generate-assets.mjs [artworkName ...]
 */
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'images');
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium',
});
const page = await browser.newPage();
page.on('pageerror', (e) => console.error('[pageerror]', e.message));
await page.goto('file://' + path.join(root, 'scripts', 'assets', 'generator.html'));

const requested = process.argv.slice(2);
const names = requested.length
  ? requested
  : await page.evaluate(() => window.artworkNames);

for (const name of names) {
  const dataUrl = await page.evaluate((n) => window.renderArtwork(n), name);
  const b64 = dataUrl.split(',')[1];
  const file = path.join(outDir, `${name}.jpg`);
  await writeFile(file, Buffer.from(b64, 'base64'));
  console.log('wrote', path.relative(root, file));
}

await browser.close();
