import puppeteer from 'puppeteer';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\Asus\\.gemini\\antigravity\\brain\\c66bebe3-0374-4eff-b15c-5b54f9963f05';
const BASE_URL = 'http://127.0.0.1:5173';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  console.log('--- TESTING PORTFOLIO CASE STUDY PAGE & BADGE ---');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(err.toString()));

  try {
    // 1. Desktop Test (1440x900)
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/portfolio`, { waitUntil: 'networkidle2' });
    await sleep(500);

    const title = await page.$eval('h1', (el) => el.textContent);
    console.log(`- Portfolio Page H1: "${title}"`);

    // Check metadata table rows
    const tableRows = await page.$$eval('tbody tr', (els) =>
      els.map((tr) => ({
        key: tr.querySelector('td:first-child')?.textContent.trim(),
        val: tr.querySelector('td:last-child')?.textContent.trim(),
      }))
    );
    console.log(`- Loaded Metadata Table (${tableRows.length} rows):`);
    tableRows.forEach((r) => console.log(`   * ${r.key}: ${r.val}`));

    // Check screenshot grid count
    const screenCount = await page.$$eval('.grid.grid-cols-1.sm\\:grid-cols-2 > div', (els) => els.length);
    console.log(`- Screenshot Showcase Cards Rendered: ${screenCount}`);

    // Check desktop overflow
    const desktopOverflow = await page.evaluate(() => {
      const root = document.documentElement;
      return {
        scrollWidth: root.scrollWidth,
        clientWidth: root.clientWidth,
        hasOverflow: root.scrollWidth > root.clientWidth,
      };
    });
    console.log(`- Desktop Viewport Check: clientWidth=${desktopOverflow.clientWidth}px, scrollWidth=${desktopOverflow.scrollWidth}px -> Overflow: ${desktopOverflow.hasOverflow ? 'FAIL' : 'PASS'}`);

    // Screenshot Desktop Case Study
    const desktopPath = path.join(ARTIFACT_DIR, 'portfolio-case-study.png');
    await page.screenshot({ path: desktopPath, fullPage: true });
    console.log(`- Saved screenshot: ${desktopPath}`);

    // 2. Mobile Test (375x812)
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await page.goto(`${BASE_URL}/portfolio`, { waitUntil: 'networkidle2' });
    await sleep(400);

    const mobileOverflow = await page.evaluate(() => {
      const root = document.documentElement;
      return {
        scrollWidth: root.scrollWidth,
        clientWidth: root.clientWidth,
        hasOverflow: root.scrollWidth > root.clientWidth,
      };
    });
    console.log(`- Mobile Viewport Check: clientWidth=${mobileOverflow.clientWidth}px, scrollWidth=${mobileOverflow.scrollWidth}px -> Overflow: ${mobileOverflow.hasOverflow ? 'FAIL' : 'PASS'}`);

    const mobilePath = path.join(ARTIFACT_DIR, 'mobile-portfolio-case-study.png');
    await page.screenshot({ path: mobilePath });
    console.log(`- Saved screenshot: ${mobilePath}`);

    // 3. Test Portfolio Floating Badge on Homepage
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
    await sleep(400);

    const badgeVisible = await page.evaluate(() => {
      return document.body.textContent.includes('Developer Portfolio Project');
    });
    console.log(`- Floating Portfolio Badge visible on storefront: ${badgeVisible}`);

    console.log('\n--- VERIFICATION SUMMARY ---');
    console.log(`Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) console.log('Errors:', consoleErrors);
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    await browser.close();
    console.log('--- TEST FINISHED ---');
  }
}

run();
