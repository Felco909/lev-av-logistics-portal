import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const OUT = 'C:\\Users\\Lenovo\\AppData\\Local\\Temp\\claude\\C--Users-Lenovo-Desktop-----\\45f67de0-789d-4141-b7a8-9c18032caa22\\scratchpad\\map-qa-d3';
mkdirSync(OUT, { recursive: true });
const URL = 'http://localhost:3000/#geography';

const consoleErrors = [];
const pageErrors = [];

async function run() {
  const browser = await chromium.launch();

  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      if (consoleErrors.length < 50) consoleErrors.push(msg.text());
      if (consoleErrors.length === 50) throw new Error('Console error flood detected (>50) — aborting to avoid OOM.');
    }
  });
  page.on('pageerror', (err) => pageErrors.push(err.message));

  await page.goto(URL, { waitUntil: 'networkidle' });
  const mapEl = page.locator('#interactive-logistics-map');
  await mapEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${OUT}/01-default-caucasus.png` });

  // Preset switches
  for (const preset of ['Весь мир', 'Евразия', 'Армения', 'Кавказ']) {
    const btn = page.locator(`button:has-text("${preset}")`).first();
    if (await btn.count()) {
      await btn.click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: `${OUT}/02-preset-${preset}.png` });
    } else {
      console.log('MISSING preset button:', preset);
    }
  }

  // Category filter: Иран
  const iranBtn = page.locator('button:has-text("Иран")').last();
  if (await iranBtn.count()) {
    await iranBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/03-filter-iran.png` });
  }
  const allBtn = page.locator('button:has-text("Все")').last();
  if (await allBtn.count()) {
    await allBtn.click();
    await page.waitForTimeout(400);
  }

  // Click a destination marker (via quick-jump chip, reliable regardless of SVG hit-testing)
  const chip = page.locator('button:has-text("Москва")').first();
  if (await chip.count()) {
    await chip.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/04-selected-moscow.png` });
  }

  // Hover a marker to trigger tooltip — approximate by hovering the svg center-ish area first,
  // then try hovering each destination marker circle.
  const svgBox = await page.getByRole('img', { name: /Интерактивная карта/ }).boundingBox();
  if (svgBox) {
    await page.mouse.move(svgBox.x + svgBox.width * 0.5, svgBox.y + svgBox.height * 0.4);
    await page.waitForTimeout(200);
  }

  // Pan gesture: drag inside the SVG
  if (svgBox) {
    const cx = svgBox.x + svgBox.width / 2;
    const cy = svgBox.y + svgBox.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx - 80, cy - 40, { steps: 10 });
    await page.mouse.up();
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/05-after-pan.png` });
  }

  // Zoom gesture: wheel
  if (svgBox) {
    const cx = svgBox.x + svgBox.width / 2;
    const cy = svgBox.y + svgBox.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.wheel(0, -300);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/06-after-zoom.png` });
  }

  await ctx.close();

  // Mobile pass
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mpage = await mctx.newPage();
  mpage.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push('[mobile] ' + msg.text());
  });
  mpage.on('pageerror', (err) => pageErrors.push('[mobile] ' + err.message));
  await mpage.goto(URL, { waitUntil: 'networkidle' });
  await mpage.locator('#interactive-logistics-map').scrollIntoViewIfNeeded();
  await mpage.waitForTimeout(800);
  await mpage.screenshot({ path: `${OUT}/07-mobile.png` });
  const openCardBtn = mpage.locator('button:has-text("Открыть карточку маршрута")').first();
  if (await openCardBtn.count()) {
    await openCardBtn.click();
    await mpage.waitForTimeout(400);
    await mpage.screenshot({ path: `${OUT}/08-mobile-card.png` });
  }
  await mctx.close();

  await browser.close();

  console.log('\n--- Console errors ---');
  console.log(consoleErrors.length ? consoleErrors.join('\n---\n') : '(none)');
  console.log('\n--- Page errors ---');
  console.log(pageErrors.length ? pageErrors.join('\n---\n') : '(none)');
}

run();
