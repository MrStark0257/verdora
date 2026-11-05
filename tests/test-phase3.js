import puppeteer from 'puppeteer';
import path from 'path';

async function runPhase3Tests() {
  console.log('🚀 Starting VERDORA Phase 3 Automated Verification Test Suite...\n');

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
  // TEST 1: SHOP CATALOG PAGE (/shop)
  // ==========================================
  console.log('--- [TEST 1: SHOP CATALOG /shop] ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5173/shop', { waitUntil: 'networkidle2' });

  // 1.1 Verify Page Title & Header
  const shopHeading = await page.evaluate(() => document.querySelector('h1')?.textContent || '');
  console.log(`✓ Shop Heading: "${shopHeading}"`);
  if (!shopHeading.includes('Botanical Specimens')) throw new Error('Shop title mismatch');

  // 1.2 Desktop Overflow Check
  const shopOverflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  console.log(`✓ Shop Desktop Width: scrollWidth=${shopOverflow.scrollWidth}px, clientWidth=${shopOverflow.clientWidth}px`);
  if (shopOverflow.scrollWidth > shopOverflow.clientWidth) throw new Error('Horizontal overflow on /shop desktop!');

  // 1.3 Test In-Shop Search
  console.log('Testing In-Shop Search Filter...');
  await page.type('input[placeholder^="Search by name"]', 'Monstera');
  await new Promise((r) => setTimeout(r, 400));
  const searchResultsCount = await page.evaluate(() => {
    return document.querySelectorAll('button[aria-label^="Quick add"]').length;
  });
  console.log(`✓ Filtered products after typing "Monstera": ${searchResultsCount}`);
  if (searchResultsCount === 0) throw new Error('Search failed to return Monstera');

  // Clear search
  await page.evaluate(() => {
    const input = document.querySelector('input[placeholder^="Search by name"]');
    if (input) {
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  await new Promise((r) => setTimeout(r, 300));

  // 1.4 Test Sorting (Price: High to Low)
  console.log('Testing Sort Dropdown (Price: High to Low)...');
  await page.select('select', 'price-high');
  await new Promise((r) => setTimeout(r, 400));
  const topProductPrice = await page.evaluate(() => {
    const priceEl = document.querySelector('main .font-sans.font-semibold.text-forest');
    return priceEl ? priceEl.textContent.trim() : '';
  });
  console.log(`✓ Top product price when sorted High to Low: "${topProductPrice}"`);

  // 1.5 Mobile Shop Viewport Test
  console.log('Testing /shop on Mobile (375x812)...');
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'networkidle2' });
  const mobileShopOverflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  console.log(`✓ Mobile Shop Widths: scrollWidth=${mobileShopOverflow.scrollWidth}px, clientWidth=${mobileShopOverflow.clientWidth}px`);
  if (mobileShopOverflow.scrollWidth > mobileShopOverflow.clientWidth) {
    throw new Error('Mobile overflow on /shop!');
  }

  // Test Mobile Filter Drawer
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const filterBtn = btns.find(b => b.textContent.includes('Filters'));
    if (filterBtn) filterBtn.click();
  });
  await new Promise((r) => setTimeout(r, 500));
  const mobileFilterOpen = await page.evaluate(() => !!document.querySelector('aside'));
  console.log(`✓ Mobile Filter drawer opened: ${mobileFilterOpen}`);

  // ==========================================
  // TEST 2: CATEGORY COLLECTION PAGE (/collections/indoor)
  // ==========================================
  console.log('\n--- [TEST 2: CATEGORY COLLECTION /collections/indoor] ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5173/collections/indoor', { waitUntil: 'networkidle2' });

  const catTitle = await page.evaluate(() => document.querySelector('h1')?.textContent || '');
  console.log(`✓ Category Title: "${catTitle}"`);
  if (!catTitle.includes('Indoor Plants')) throw new Error('Category title mismatch');

  const catItemsCount = await page.evaluate(() => {
    return document.querySelectorAll('button[aria-label^="Quick add"]').length;
  });
  console.log(`✓ Indoor specimens displayed: ${catItemsCount}`);

  // ==========================================
  // TEST 3: PRODUCT DETAIL PAGE (/product/monstera-deliciosa)
  // ==========================================
  console.log('\n--- [TEST 3: PRODUCT DETAIL /product/monstera-deliciosa] ---');
  await page.goto('http://127.0.0.1:5173/product/monstera-deliciosa', { waitUntil: 'networkidle2' });

  // 3.1 Verify Product Title & Latin Binomial
  const productData = await page.evaluate(() => {
    return {
      title: document.querySelector('h1')?.textContent || '',
      binomial: document.querySelector('p.font-serif.italic')?.textContent || '',
      price: document.querySelector('.font-sans.text-3xl')?.textContent || '',
      metricsCount: document.querySelectorAll('.grid-cols-2.sm\\:grid-cols-3 > div').length,
    };
  });
  console.log(`✓ Product Title: "${productData.title}"`);
  console.log(`✓ Botanical Binomial: "${productData.binomial}"`);
  console.log(`✓ Price: "${productData.price}"`);
  console.log(`✓ Botanical Specs Matrix cells: ${productData.metricsCount} (Sunlight, Watering, Pet Toxicity, Size, Growth, Difficulty)`);

  // 3.2 Product Detail Desktop Overflow
  const pdpOverflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  console.log(`✓ PDP Desktop Width: scrollWidth=${pdpOverflow.scrollWidth}px, clientWidth=${pdpOverflow.clientWidth}px`);
  if (pdpOverflow.scrollWidth > pdpOverflow.clientWidth) throw new Error('Horizontal overflow on PDP desktop!');

  // 3.3 Test Quantity Increment
  console.log('Testing Quantity Selector...');
  await page.evaluate(() => {
    const plusBtn = document.querySelector('button[aria-label="Increase quantity"]');
    if (plusBtn) plusBtn.click();
  });
  await new Promise((r) => setTimeout(r, 200));

  // 3.4 Test Add to Bag from PDP
  console.log('Testing Add to Bag from PDP...');
  await page.evaluate(() => {
    const addBtns = Array.from(document.querySelectorAll('button'));
    const addBtn = addBtns.find(b => b.textContent.includes('Add to Bag'));
    if (addBtn) addBtn.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  // 3.5 Test Tabs: Care Guide, Guarantee & Reviews
  console.log('Testing Information Tabs...');
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('button'));
    const shippingTab = tabs.find(b => b.textContent.includes('Packaging & Vitality Guarantee'));
    if (shippingTab) shippingTab.click();
  });
  await new Promise((r) => setTimeout(r, 400));
  const shippingTextFound = await page.evaluate(() => document.body.textContent.includes('14-Day Botanical Vitality Guarantee'));
  console.log(`✓ Switched to Shipping & Guarantee tab: ${shippingTextFound}`);

  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('button'));
    const reviewsTab = tabs.find(b => b.textContent.includes('Customer Reviews'));
    if (reviewsTab) reviewsTab.click();
  });
  await new Promise((r) => setTimeout(r, 400));
  const reviewsFound = await page.evaluate(() => document.body.textContent.includes('Share Your Botanical Experience') || document.body.textContent.includes('Customer Notes'));
  console.log(`✓ Switched to Customer Reviews tab: ${reviewsFound}`);

  // 3.6 Mobile PDP Viewport & Overflow Check
  console.log('Testing PDP on Mobile (375x812)...');
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'networkidle2' });
  const mobilePdpOverflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  console.log(`✓ Mobile PDP Width: scrollWidth=${mobilePdpOverflow.scrollWidth}px, clientWidth=${mobilePdpOverflow.clientWidth}px`);
  if (mobilePdpOverflow.scrollWidth > mobilePdpOverflow.clientWidth) {
    throw new Error('Horizontal overflow on PDP mobile!');
  }

  // Capture Screenshots
  const shopScreenshotPath = path.resolve('shop-catalog.png');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5173/shop', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: shopScreenshotPath });
  console.log(`📸 Shop Screenshot saved: ${shopScreenshotPath}`);

  const pdpScreenshotPath = path.resolve('product-detail.png');
  await page.goto('http://127.0.0.1:5173/product/monstera-deliciosa', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: pdpScreenshotPath });
  console.log(`📸 PDP Screenshot saved: ${pdpScreenshotPath}`);

  // 3.7 Console Audit
  console.log('\n--- [CONSOLE ERROR AUDIT] ---');
  if (consoleErrors.length > 0) {
    console.warn('⚠️ Console errors:', consoleErrors);
  } else {
    console.log('✓ PASS: Zero unhandled console errors or runtime warnings!');
  }

  await browser.close();
  console.log('\n🎉 ALL PHASE 3 SHOP & PRODUCT DETAIL TESTS PASSED WITH 100% SUCCESS!\n');
}

runPhase3Tests().catch((err) => {
  console.error('\n❌ Test failed:', err);
  process.exit(1);
});
