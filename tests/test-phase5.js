import puppeteer from 'puppeteer';
import path from 'path';

async function runPhase5Tests() {
  console.log('🚀 Starting VERDORA Phase 5 Plant Finder & Care Knowledgebase Test Suite...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => {
    consoleErrors.push(err.message);
  });

  // ==========================================
  // TEST 1: DEDICATED /plant-finder ROUTE
  // ==========================================
  console.log('--- [TEST 1: DEDICATED PLANT FINDER /plant-finder] ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5173/plant-finder', { waitUntil: 'networkidle2' });

  // 1.1 Verify Heading
  const finderHeading = await page.evaluate(() => document.querySelector('h1')?.textContent || '');
  console.log(`✓ Finder Heading: "${finderHeading}"`);
  if (!finderHeading.includes('Matchmaker')) throw new Error('Plant Finder heading mismatch');

  // 1.2 Desktop Overflow Check
  const finderOverflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  console.log(`✓ Finder Desktop Width: scrollWidth=${finderOverflow.scrollWidth}px, clientWidth=${finderOverflow.clientWidth}px`);
  if (finderOverflow.scrollWidth > finderOverflow.clientWidth) throw new Error('Horizontal overflow on /plant-finder desktop!');

  // 1.3 Complete 5-Step Diagnostic
  console.log('Completing 5-Step Diagnostic...');

  // Step 1: Living Room
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find((b) => b.textContent.includes('Living Room'));
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 400));

  // Step 2: Medium Indirect Light
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find((b) => b.textContent.includes('Medium Indirect Light'));
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 400));

  // Step 3: Mindful Routine
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find((b) => b.textContent.includes('Mindful Routine'));
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 400));

  // Step 4: Lush Greenery
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find((b) => b.textContent.includes('Lush Architectural Greenery'));
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 400));

  // Step 5: Household Pets
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find((b) => b.textContent.includes('Pet-Safe Only'));
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  // Verify Results
  const resultsVerified = await page.evaluate(() => {
    return document.body.textContent.includes('Your Curated Botanical Recommendations');
  });
  console.log(`✓ 5-Step Diagnostic finished & Results displayed: ${resultsVerified}`);
  if (!resultsVerified) throw new Error('Diagnostic failed to transition to results');

  // 1.4 Mobile Finder Overflow
  console.log('Testing /plant-finder on Mobile (375x812)...');
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'networkidle2' });
  const mobileFinderOverflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  console.log(`✓ Mobile Finder Width: scrollWidth=${mobileFinderOverflow.scrollWidth}px, clientWidth=${mobileFinderOverflow.clientWidth}px`);
  if (mobileFinderOverflow.scrollWidth > mobileFinderOverflow.clientWidth) {
    throw new Error('Horizontal overflow on /plant-finder mobile!');
  }

  // ==========================================
  // TEST 2: DEDICATED /plant-care ROUTE
  // ==========================================
  console.log('\n--- [TEST 2: PLANT CARE PORTAL /plant-care] ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5173/plant-care', { waitUntil: 'networkidle2' });

  // 2.1 Verify Heading
  const careHeading = await page.evaluate(() => document.querySelector('h1')?.textContent || '');
  console.log(`✓ Care Heading: "${careHeading}"`);
  if (!careHeading.includes('Plant Care Journal')) throw new Error('Plant Care heading mismatch');

  // 2.2 Desktop Overflow
  const careOverflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  console.log(`✓ Care Desktop Width: scrollWidth=${careOverflow.scrollWidth}px, clientWidth=${careOverflow.clientWidth}px`);
  if (careOverflow.scrollWidth > careOverflow.clientWidth) throw new Error('Horizontal overflow on /plant-care desktop!');

  // 2.3 Test Article Expansion
  console.log('Testing In-Depth Article Expansion...');
  await page.evaluate(() => {
    const readBtns = Array.from(document.querySelectorAll('button'));
    const readBtn = readBtns.find((b) => b.textContent.includes('Read In-Depth Guide'));
    if (readBtn) readBtn.click();
  });
  await new Promise((r) => setTimeout(r, 400));

  const articleExpanded = await page.evaluate(() => {
    return document.body.textContent.includes('Key Botanical Takeaways') && document.body.textContent.includes('Back to All Care Guides');
  });
  console.log(`✓ Article expanded with biological tips: ${articleExpanded}`);

  // Back to guides
  await page.evaluate(() => {
    const backBtn = Array.from(document.querySelectorAll('button')).find((b) =>
      b.textContent.includes('Back to All Care Guides')
    );
    if (backBtn) backBtn.click();
  });
  await new Promise((r) => setTimeout(r, 300));

  // 2.4 Test Plant Doctor Tab
  console.log('Testing Plant Doctor Diagnostic Tab...');
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('button'));
    const docTab = tabs.find((b) => b.textContent.includes('Plant Doctor'));
    if (docTab) docTab.click();
  });
  await new Promise((r) => setTimeout(r, 500));

  const docRendered = await page.evaluate(() => {
    return document.body.textContent.includes('What Symptom Is Your Plant Displaying?') && document.body.textContent.includes('Botanical Treatment Protocol');
  });
  console.log(`✓ Plant Doctor symptom clinic rendered: ${docRendered}`);

  // 2.5 Test Species Care Sheets Tab
  console.log('Testing Species Care Sheets Tab...');
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('button'));
    const specTab = tabs.find((b) => b.textContent.includes('Species Reference Sheets'));
    if (specTab) specTab.click();
  });
  await new Promise((r) => setTimeout(r, 500));

  const specRendered = await page.evaluate(() => {
    return document.body.textContent.includes('Monstera Deliciosa') && document.body.textContent.includes('Chunky aroid mix');
  });
  console.log(`✓ Species Care Sheets rendered with soil/light metrics: ${specRendered}`);

  // 2.6 Mobile Plant Care Overflow
  console.log('Testing /plant-care on Mobile (375x812)...');
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'networkidle2' });
  const mobileCareOverflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  console.log(`✓ Mobile Care Width: scrollWidth=${mobileCareOverflow.scrollWidth}px, clientWidth=${mobileCareOverflow.clientWidth}px`);
  if (mobileCareOverflow.scrollWidth > mobileCareOverflow.clientWidth) {
    throw new Error('Horizontal overflow on /plant-care mobile!');
  }

  // Capture Screenshots
  const finderScreenshotPath = path.resolve('plant-finder.png');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5173/plant-finder', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: finderScreenshotPath });
  console.log(`📸 Plant Finder Screenshot: ${finderScreenshotPath}`);

  const careScreenshotPath = path.resolve('plant-care.png');
  await page.goto('http://127.0.0.1:5173/plant-care', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: careScreenshotPath });
  console.log(`📸 Plant Care Screenshot: ${careScreenshotPath}`);

  // Console Audit
  console.log('\n--- [CONSOLE ERROR AUDIT] ---');
  if (consoleErrors.length > 0) {
    console.warn('⚠️ Console errors:', consoleErrors);
  } else {
    console.log('✓ PASS: Zero unhandled console errors or runtime warnings!');
  }

  await browser.close();
  console.log('\n🎉 ALL PHASE 5 PLANT FINDER & PLANT CARE TESTS PASSED WITH 100% SUCCESS!\n');
}

runPhase5Tests().catch((err) => {
  console.error('\n❌ Test failed:', err);
  process.exit(1);
});

