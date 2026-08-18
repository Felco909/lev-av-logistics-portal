import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
page.on('console', (msg) => console.log('CONSOLE:', msg.type(), msg.text()));
page.on('pageerror', (err) => console.log('PAGEERROR:', err.message));
await page.goto('http://localhost:3001/', { waitUntil: 'load', timeout: 30000 });
await page.waitForTimeout(2000);
console.log('BODY HTML LENGTH:', (await page.content()).length);
const map = await page.$('#interactive-logistics-map');
console.log('MAP FOUND:', !!map);
if (map) {
  await map.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2500);
  await map.screenshot({ path: process.argv[2] || 'map.png' });
} else {
  await page.screenshot({ path: process.argv[2] || 'map.png', fullPage: true });
}
await browser.close();
