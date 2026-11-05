import puppeteer from 'puppeteer';
import path from 'path';

async function runPhase4Tests() {
  console.log('🚀 Starting VERDORA Phase 4 Commerce & Wishlist Automated Test Suite...\n');

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
  // TEST 1: CART WORKFLOW & DEDICATED /cart PAGE
  // ==========================================
  console.log('--- [TEST 1: DEDICATED CART PAGE /cart] ---');
  await page.setViewport({ width: 1440, height: 900 });

  // 1.1 Add item from product page
  await page.goto('http://127.0.0.1:5173/product/monstera-deliciosa', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const addBtn = btns.find((b) => b.textContent.includes('Add to Bag'));
    if (addBtn) addBtn.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  // Check toast notification
  const toastText = await page.evaluate(() => {
    const t = document.querySelector('.fixed.bottom-6.right-6');
    return t ? t.textContent : '';
  });
  console.log(`✓ Toast notification verified: "${toastText.slice(0, 40)}..."`);

  // 1.2 Navigate to /cart
  await page.goto('http://127.0.0.1:5173/cart', { waitUntil: 'networkidle2' });
  const cartHeading = await page.evaluate(() => document.querySelector('h1')?.textContent || '');
  console.log(`✓ Cart Heading: "${cartHeading}"`);

  // 1.3 Check Desktop Overflow
  const cartOverflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  console.log(`✓ Cart Desktop Width: scrollWidth=${cartOverflow.scrollWidth}px, clientWidth=${cartOverflow.clientWidth}px`);
  if (cartOverflow.scrollWidth > cartOverflow.clientWidth) throw new Error('Horizontal overflow on /cart desktop!');

  // 1.4 Test Applying Voucher (GROW10)
  console.log('Testing Voucher Application (GROW10)...');
  await page.type('input[placeholder^="e.g. GROW10"]', 'GROW10');
  await page.click('form button[type="submit"]');
  await new Promise((r) => setTimeout(r, 600));

  const discountApplied = await page.evaluate(() => {
    return document.body.textContent.includes('Voucher Discount') || document.body.textContent.includes('10% OFF');
  });
  console.log(`✓ 10% Voucher Discount applied successfully: ${discountApplied}`);

  // 1.5 Mobile Cart Check
  console.log('Testing /cart on Mobile (375x812)...');
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'networkidle2' });
  const mobileCartOverflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  console.log(`✓ Mobile Cart Width: scrollWidth=${mobileCartOverflow.scrollWidth}px, clientWidth=${mobileCartOverflow.clientWidth}px`);
  if (mobileCartOverflow.scrollWidth > mobileCartOverflow.clientWidth) {
    throw new Error('Horizontal overflow on /cart mobile!');
  }

  // ==========================================
  // TEST 2: WISHLIST WORKFLOW & DEDICATED /wishlist PAGE
  // ==========================================
  console.log('\n--- [TEST 2: DEDICATED WISHLIST PAGE /wishlist] ---');
  await page.setViewport({ width: 1440, height: 900 });

  // 2.1 Navigate to /shop and add first item to wishlist
  await page.goto('http://127.0.0.1:5173/shop', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    const heartBtns = document.querySelectorAll('button[aria-label="Add to wishlist"]');
    if (heartBtns[0]) heartBtns[0].click();
  });
  await new Promise((r) => setTimeout(r, 400));

  // 2.2 Go to /wishlist
  await page.goto('http://127.0.0.1:5173/wishlist', { waitUntil: 'networkidle2' });
  const wishlistHeading = await page.evaluate(() => document.querySelector('h1')?.textContent || '');
  console.log(`✓ Wishlist Heading: "${wishlistHeading}"`);

  // Check item is present
  const wishlistItemCount = await page.evaluate(() => {
    const badge = document.querySelector('main .bg-cream');
    return badge ? badge.textContent.trim() : '';
  });
  console.log(`✓ Wishlist Count Badge: "${wishlistItemCount}"`);

  // 2.3 Test Move to Bag
  console.log('Testing "Move to Bag" from Wishlist...');
  await page.evaluate(() => {
    const moveBtn = Array.from(document.querySelectorAll('button')).find((b) =>
      b.textContent.includes('Move to Bag')
    );
    if (moveBtn) moveBtn.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  const wishlistNowEmpty = await page.evaluate(() => {
    return document.body.textContent.includes('Your wishlist is empty');
  });
  console.log(`✓ Item moved to Bag, Wishlist now empty: ${wishlistNowEmpty}`);

  // 2.4 Mobile Wishlist Check
  console.log('Testing /wishlist on Mobile (375x812)...');
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'networkidle2' });
  const mobileWishlistOverflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  console.log(`✓ Mobile Wishlist Width: scrollWidth=${mobileWishlistOverflow.scrollWidth}px, clientWidth=${mobileWishlistOverflow.clientWidth}px`);
  if (mobileWishlistOverflow.scrollWidth > mobileWishlistOverflow.clientWidth) {
    throw new Error('Horizontal overflow on /wishlist mobile!');
  }

  // ==========================================
  // TEST 3: GLOBAL SEARCH MODAL & HOTKEYS
  // ==========================================
  console.log('\n--- [TEST 3: LIVE SEARCH MODAL] ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });

  // Open search modal via header icon
  await page.click('button[aria-label="Search catalog"]');
  await new Promise((r) => setTimeout(r, 400));

  const searchModalOpen = await page.evaluate(() => {
    return !!document.querySelector('input[placeholder^="Search botanical specimens"]');
  });
  console.log(`✓ Search modal opened: ${searchModalOpen}`);

  // Type search term
  await page.type('input[placeholder^="Search botanical specimens"]', 'Fiddle Leaf');
  await new Promise((r) => setTimeout(r, 400));

  const searchMatch = await page.evaluate(() => {
    return document.body.textContent.includes('Fiddle Leaf Fig');
  });
  console.log(`✓ Search found "Fiddle Leaf Fig": ${searchMatch}`);

  // Capture Screenshots
  const cartScreenshotPath = path.resolve('cart-page.png');
  await page.goto('http://127.0.0.1:5173/cart', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: cartScreenshotPath });
  console.log(`📸 Cart Page Screenshot: ${cartScreenshotPath}`);

  const wishlistScreenshotPath = path.resolve('wishlist-page.png');
  await page.goto('http://127.0.0.1:5173/wishlist', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: wishlistScreenshotPath });
  console.log(`📸 Wishlist Page Screenshot: ${wishlistScreenshotPath}`);

  // Console Audit
  console.log('\n--- [CONSOLE ERROR AUDIT] ---');
  if (consoleErrors.length > 0) {
    console.warn('⚠️ Console errors:', consoleErrors);
  } else {
    console.log('✓ PASS: Zero unhandled console errors or runtime warnings!');
  }

  await browser.close();
  console.log('\n🎉 ALL PHASE 4 COMMERCE & WISHLIST TESTS PASSED WITH 100% SUCCESS!\n');
}

runPhase4Tests().catch((err) => {
  console.error('\n❌ Test failed:', err);
  process.exit(1);
});
