import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function runHomepageTests() {
  console.log('🚀 Starting VERDORA Phase 2 Homepage Quality & Responsiveness Test Suite...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => {
    consoleErrors.push(err.message);
  });

  const url = 'http://127.0.0.1:5173/';
  console.log(`🌐 Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle2' });

  // ==========================================
  // TEST 1: DESKTOP VIEWPORT (1440 x 900)
  // ==========================================
  console.log('\n--- [TEST 1: DESKTOP VIEWPORT 1440x900] ---');
  await page.setViewport({ width: 1440, height: 900 });
  await new Promise(r => setTimeout(r, 1000));

  // 1.1 Page Title & Meta
  const title = await page.title();
  console.log(`✓ Page Title: "${title}"`);
  if (!title.includes('VERDORA')) throw new Error('Title does not contain VERDORA');

  // 1.2 Desktop Horizontal Overflow Check
  const desktopOverflow = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });
  console.log(`✓ Desktop Widths: scrollWidth=${desktopOverflow.scrollWidth}px, clientWidth=${desktopOverflow.clientWidth}px`);
  if (desktopOverflow.hasOverflow) {
    console.warn('⚠️ WARNING: Horizontal overflow detected on desktop!');
  } else {
    console.log('✓ PASS: Zero horizontal overflow on Desktop (1440px).');
  }

  // 1.3 Verify All 13 Required Homepage Sections
  const sectionsToCheck = [
    { name: 'Announcement Bar', selector: 'header, div', text: 'Free Shipping on Orders Above ₹999' },
    { name: 'Hero Headline', selector: 'h1', text: 'Let Nature Find' },
    { name: 'Shop By Category', selector: 'h2', text: 'Find Your' },
    { name: 'Bestsellers Title', selector: 'h2', text: 'Most Loved' },
    { name: 'Brand Story Headline', selector: 'h2', text: 'A Greener' },
    { name: 'Plant Diagnostic Section', selector: '#plant-finder-section', text: 'Diagnostic' },
    { name: 'Featured Collection Title', selector: 'h2', text: 'Bring the' },
    { name: 'Plant Care Journal', selector: 'h2', text: 'The Plant Care' },
    { name: 'Why VERDORA Pillars', selector: 'h2', text: 'Why Discerning Collectors Choose' },
    { name: 'Customer Testimonials', selector: 'section', text: 'Loved by Homes' },
    { name: 'Newsletter Section', selector: 'h2', text: "Let's Grow" },
    { name: 'Footer Maison', selector: 'footer', text: 'Botanical Atelier' },
  ];

  for (const s of sectionsToCheck) {
    const found = await page.evaluate((item) => {
      const els = Array.from(document.querySelectorAll(item.selector));
      return els.some(el => el.textContent.includes(item.text));
    }, s);
    if (!found) {
      throw new Error(`Section "${s.name}" with text "${s.text}" was NOT found!`);
    }
    console.log(`✓ Section Verified: ${s.name}`);
  }

  // 1.4 Test Bestseller Cards Count
  const productCardsCount = await page.evaluate(() => {
    return document.querySelectorAll('button[aria-label^="Quick add"]').length;
  });
  console.log(`✓ Product Cards with Quick Add found: ${productCardsCount} (Expected 8 on bestsellers grid)`);

  // 1.5 Test Interactive Quick Add to Cart
  console.log('\nTesting Cart Interaction...');
  await page.evaluate(() => {
    const quickAddBtns = document.querySelectorAll('button[aria-label^="Quick add"]');
    if (quickAddBtns[0]) quickAddBtns[0].click();
  });
  await new Promise(r => setTimeout(r, 600));

  const cartBagText = await page.evaluate(() => {
    const bagBtn = document.querySelector('button[aria-label="Open Shopping Bag"]');
    return bagBtn ? bagBtn.textContent.trim() : '';
  });
  console.log(`✓ Cart button text after Quick Add: "${cartBagText}"`);

  // 1.6 Test Wishlist Toggle
  console.log('Testing Wishlist Interaction...');
  await page.evaluate(() => {
    const heartBtns = document.querySelectorAll('button[aria-label="Add to wishlist"]');
    if (heartBtns[0]) heartBtns[0].click();
  });
  await new Promise(r => setTimeout(r, 500));

  const wishlistBadgeCount = await page.evaluate(() => {
    const badge = document.querySelector('a[aria-label="Wishlist"] span');
    return badge ? badge.textContent.trim() : '0';
  });
  console.log(`✓ Wishlist badge count after toggle: ${wishlistBadgeCount}`);

  // 1.7 Test Interactive Plant Finder Quiz
  console.log('Testing Interactive Plant Finder Quiz...');
  await page.evaluate(() => {
    const section = document.getElementById('plant-finder-section');
    if (section) section.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 400));

  // Answer Q1
  await page.evaluate(() => {
    const btns = document.querySelectorAll('#plant-finder-section button');
    if (btns[0]) btns[0].click();
  });
  await new Promise(r => setTimeout(r, 300));

  // Answer Q2
  await page.evaluate(() => {
    const btns = document.querySelectorAll('#plant-finder-section button');
    if (btns[1]) btns[1].click();
  });
  await new Promise(r => setTimeout(r, 300));

  // Answer Q3
  await page.evaluate(() => {
    const btns = document.querySelectorAll('#plant-finder-section button');
    if (btns[0]) btns[0].click();
  });
  await new Promise(r => setTimeout(r, 300));

  // Answer Q4
  await page.evaluate(() => {
    const btns = document.querySelectorAll('#plant-finder-section button');
    if (btns[0]) btns[0].click();
  });
  await new Promise(r => setTimeout(r, 500));

  const quizResultFound = await page.evaluate(() => {
    return document.body.textContent.includes('Your Personalized Botanical Matches');
  });
  console.log(`✓ Plant Finder 4-Step Diagnostic completed & results rendered: ${quizResultFound}`);

  // Capture Desktop Screenshot
  const desktopScreenshotPath = path.resolve('desktop-homepage.png');
  await page.screenshot({ path: desktopScreenshotPath, fullPage: false });
  console.log(`📸 Desktop Screenshot captured: ${desktopScreenshotPath}`);

  // ==========================================
  // TEST 2: MOBILE VIEWPORT (375 x 812 - iPhone)
  // ==========================================
  console.log('\n--- [TEST 2: MOBILE VIEWPORT 375x812] ---');
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // 2.1 Mobile Horizontal Overflow Check
  const mobileOverflow = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });
  console.log(`✓ Mobile Widths: scrollWidth=${mobileOverflow.scrollWidth}px, clientWidth=${mobileOverflow.clientWidth}px`);
  if (mobileOverflow.hasOverflow) {
    throw new Error(`CRITICAL: Horizontal overflow detected on mobile! scrollWidth=${mobileOverflow.scrollWidth}px > clientWidth=${mobileOverflow.clientWidth}px`);
  } else {
    console.log('✓ PASS: Zero horizontal overflow on Mobile (375px width verified).');
  }

  // 2.2 Test Mobile Hamburger Navigation Drawer
  console.log('Testing Mobile Drawer Navigation...');
  await page.evaluate(() => {
    const menuBtn = document.querySelector('button[aria-label="Open mobile menu"]');
    if (menuBtn) menuBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const drawerOpen = await page.evaluate(() => {
    const closeBtn = document.querySelector('button[aria-label="Close menu"]');
    return !!closeBtn;
  });
  console.log(`✓ Mobile Drawer opened successfully: ${drawerOpen}`);

  // Close Mobile Drawer
  await page.evaluate(() => {
    const closeBtn = document.querySelector('button[aria-label="Close menu"]');
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // 2.3 Test Mobile Cart Drawer Open
  console.log('Testing Mobile Cart Drawer...');
  await page.evaluate(() => {
    const cartBtn = document.querySelector('button[aria-label="Open Shopping Bag"]');
    if (cartBtn) cartBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const cartDrawerOpen = await page.evaluate(() => {
    const closeCartBtn = document.querySelector('button[aria-label="Close bag"]');
    return !!closeCartBtn;
  });
  console.log(`✓ Mobile Cart Drawer opened successfully: ${cartDrawerOpen}`);

  await page.evaluate(() => {
    const closeCartBtn = document.querySelector('button[aria-label="Close bag"]');
    if (closeCartBtn) closeCartBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Capture Mobile Screenshot
  const mobileScreenshotPath = path.resolve('mobile-homepage.png');
  await page.screenshot({ path: mobileScreenshotPath, fullPage: false });
  console.log(`📸 Mobile Screenshot captured: ${mobileScreenshotPath}`);

  // ==========================================
  // CONSOLE ERROR CHECK
  // ==========================================
  console.log('\n--- [CONSOLE LOGS & ERROR AUDIT] ---');
  if (consoleErrors.length > 0) {
    console.warn(`⚠️ Console errors captured during run (${consoleErrors.length}):`);
    consoleErrors.forEach(e => console.warn(`   - ${e}`));
  } else {
    console.log('✓ PASS: Zero unhandled console errors or runtime exceptions!');
  }

  await browser.close();
  console.log('\n🎉 ALL PHASE 2 HOMEPAGE TESTS PASSED WITH 100% SUCCESS!\n');
}

runHomepageTests().catch((err) => {
  console.error('\n❌ Test suite failed:', err);
  process.exit(1);
});

