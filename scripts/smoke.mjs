/**
 * Browser smoke test + screenshot harness.
 *
 * Usage:
 *   node scripts/smoke.mjs [--url http://localhost:5173] [--shots-only]
 *
 * Runs interaction checks (tabs, mobile menu, modal, newsletter validation,
 * keyboard focus, reduced motion) and captures full-page screenshots into
 * artifacts/.
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const url = args.includes('--url') ? args[args.indexOf('--url') + 1] : 'http://localhost:5173';
const shotsOnly = args.includes('--shots-only');

await mkdir(path.join(root, 'artifacts'), { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium',
});

let failures = 0;
const check = (name, cond) => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}`);
  if (!cond) failures++;
};

async function settle(page, ms = 600) {
  await page.waitForTimeout(ms);
}

/* ---------- console error collection (desktop) ---------- */
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const consoleErrors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto(url, { waitUntil: 'networkidle' });
await settle(page, 2500);

if (!shotsOnly) {
  /* ---- structure ---- */
  check('exactly one h1', (await page.locator('h1').count()) === 1);
  check('header landmark', (await page.locator('header').count()) >= 1);
  check('footer landmark', (await page.locator('footer').count()) === 1);
  check('main landmark', (await page.locator('main').count()) === 1);

  /* ---- keyboard focus: skip link is the first tab stop ---- */
  await page.keyboard.press('Tab');
  check(
    'skip link is first tab stop',
    await page.evaluate(
      () => document.activeElement?.classList.contains('skip-link') ?? false,
    ),
  );

  /* ---- schedule tabs ---- */
  const tabs = page.locator('[role="tab"]');
  check('five day tabs', (await tabs.count()) === 5);
  await tabs.nth(3).scrollIntoViewIfNeeded();
  await tabs.nth(3).click();
  await settle(page, 800);
  check(
    'tab 4 selected after click',
    (await tabs.nth(3).getAttribute('aria-selected')) === 'true',
  );
  check(
    'thursday event shows',
    (await page.getByText('Founders & Investors Forum').count()) >= 1,
  );
  await tabs.nth(3).press('ArrowRight');
  await settle(page, 700);
  check(
    'arrow key advances to friday',
    (await tabs.nth(4).getAttribute('aria-selected')) === 'true',
  );
  check(
    'friday event shows',
    (await page.getByText('Tampa Together Finale').count()) >= 1,
  );

  /* ---- district hover sync ---- */
  const items = page.locator('.district__item');
  await items.nth(2).scrollIntoViewIfNeeded();
  await items.nth(2).hover();
  await settle(page, 400);
  check(
    'district item 3 activates node 3',
    (await page.locator('.district__node--active .district__node-num').textContent()) === '3',
  );

  /* ---- pass selection state ---- */
  // Reveal-hidden content only becomes visible once scrolled to.
  await page.locator('#tickets').scrollIntoViewIfNeeded();
  await settle(page, 1400);
  await page.getByRole('button', { name: 'Select All Access Pass' }).click();
  await settle(page, 400);
  check(
    'pass selection updates button',
    (await page.getByRole('button', { name: 'All Access Pass Selected' }).count()) === 1,
  );
  check(
    'selection confirmation shown',
    (await page
      .locator('.passes__footnote', { hasText: 'All Access Pass selected' })
      .count()) === 1,
  );
  check(
    'selected card highlighted',
    (await page.locator('.pass--selected').count()) === 1,
  );

  /* ---- media debug mode ---- */
  check('no media debug labels by default', (await page.locator('.media-frame__debug').count()) === 0);
  const mediaHealth = await page.evaluate(() => {
    const frames = [...document.querySelectorAll('.media-frame')];
    return {
      broken: frames.filter((f) => {
        const img = f.querySelector('img');
        return img && (!img.complete || img.naturalWidth === 0);
      }).length,
      real: frames.filter((f) => f.querySelector('img')).length,
      fallback: frames.filter((f) => f.querySelector('.media-frame__fallback')).length,
    };
  });
  check('no broken media images', mediaHealth.broken === 0);
  check('installed artwork renders as real images', mediaHealth.real >= 10);
  check('missing slots keep intentional fallbacks', mediaHealth.fallback >= 5);

  /* ---- newsletter validation ---- */
  const emailInput = page.locator('#newsletter-email');
  await emailInput.scrollIntoViewIfNeeded();
  await emailInput.fill('not-an-email');
  await page.getByRole('button', { name: 'Subscribe' }).click();
  await settle(page, 300);
  check('newsletter rejects bad email', (await page.locator('.footer__error').count()) === 1);
  await emailInput.fill('demo@tampabay.org');
  await page.getByRole('button', { name: 'Subscribe' }).click();
  await settle(page, 300);
  check('newsletter success state', (await page.locator('.footer__success').count()) === 1);

}

/* ---- desktop screenshot ---- */
await page.goto(url, { waitUntil: 'networkidle' });
// Walk the page so every scroll-triggered reveal has fired before capture.
await page.evaluate(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 40));
  }
  window.scrollTo(0, 0);
});
await settle(page, 2600);
await page.screenshot({
  path: path.join(root, 'artifacts', 'tmrd-layout-desktop.png'),
  fullPage: true,
});
console.log('saved artifacts/tmrd-layout-desktop.png');

if (!shotsOnly) {
  check('no console errors on desktop', consoleErrors.length === 0);
  if (consoleErrors.length) console.log('console errors:', consoleErrors.slice(0, 6));
}
await ctx.close();

/* ---------- mobile ---------- */
const mctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  // DPR 1: Chromium renders black beyond ~16k device px in full-page shots.
  deviceScaleFactor: 1,
});
const mpage = await mctx.newPage();
await mpage.goto(url, { waitUntil: 'networkidle' });
await settle(mpage, 2000);

if (!shotsOnly) {
  /* ---- mobile menu ---- */
  const toggle = mpage.locator('.header__toggle');
  check('mobile menu toggle visible', await toggle.isVisible());
  await toggle.click();
  await settle(mpage, 700);
  check(
    'mobile menu opens',
    await mpage.locator('.mobile-menu--open').isVisible(),
  );
  await mpage.locator('.mobile-menu a', { hasText: 'Tracks' }).click();
  await settle(mpage, 1600);
  check(
    'menu closes after nav',
    !(await mpage.locator('.mobile-menu--open').count()),
  );
  const tracksVisible = await mpage.evaluate(() => {
    const rect = document.getElementById('tracks')?.getBoundingClientRect();
    return !!rect && rect.top < window.innerHeight;
  });
  check('navigated to tracks section', tracksVisible);
  check(
    'no horizontal page overflow',
    await mpage.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    ),
  );
}

await mpage.goto(url, { waitUntil: 'networkidle' });
await mpage.evaluate(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 300) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 40));
  }
  window.scrollTo(0, 0);
});
await settle(mpage, 2400);
await mpage.screenshot({
  path: path.join(root, 'artifacts', 'tmrd-layout-mobile.png'),
  fullPage: true,
});
console.log('saved artifacts/tmrd-layout-mobile.png');
await mctx.close();

/* ---------- media debug mode on ---------- */
if (!shotsOnly) {
  const dctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const dpage = await dctx.newPage();
  await dpage.goto(url + '/?mediaDebug=1', { waitUntil: 'networkidle' });
  await settle(dpage, 1200);
  check(
    'mediaDebug overlays render',
    (await dpage.locator('.media-frame__debug').count()) > 5,
  );
  check(
    'partner debug slots render',
    (await dpage.locator('.partners__slot').count()) === 6,
  );
  await dctx.close();
}

/* ---------- reduced motion ---------- */
if (!shotsOnly) {
  const rctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    reducedMotion: 'reduce',
  });
  const rpage = await rctx.newPage();
  await rpage.goto(url, { waitUntil: 'networkidle' });
  await settle(rpage, 900);
  const heroVisible = await rpage.evaluate(() => {
    const el = document.querySelector('.hero__title');
    return !!el && getComputedStyle(el).opacity === '1';
  });
  check('reduced motion: hero content immediately visible', heroVisible);
  const revealVisible = await rpage.evaluate(() => {
    const el = document.querySelector('.pillar');
    return !!el && getComputedStyle(el).opacity === '1';
  });
  check('reduced motion: sections visible without scroll', revealVisible);
  check(
    'reduced motion: no cursor light',
    (await rpage.locator('.cursor-light').count()) === 0,
  );
  await rctx.close();
}

await browser.close();

if (failures) {
  console.error(`\n${failures} check(s) failed`);
  process.exit(1);
}
console.log('\nall checks passed');
