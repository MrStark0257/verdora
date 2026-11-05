import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\Asus\\.gemini\\antigravity\\brain\\c66bebe3-0374-4eff-b15c-5b54f9963f05';
const BASE_URL = 'http://127.0.0.1:5173';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  console.log('--- STARTING VERDORA PHASE 7, 8 & 9 MASTER VERIFICATION SUITE ---');

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
    consoleErrors.push(err.toString());
  });

  try {
    // -------------------------------------------------------------
    // 1. PRE-SEED CART & TEST CHECKOUT FLOW
    // -------------------------------------------------------------
    console.log('\n[1/6] Testing Dedicated Checkout (/checkout)...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });

    // Seed cart items in localStorage
    await page.evaluate(() => {
      const demoCart = [
        {
          id: 'monstera-deliciosa',
          name: 'Monstera Deliciosa',
          botanicalName: 'Monstera deliciosa',
          slug: 'monstera-deliciosa',
          price: 1899,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
          category: 'indoor',
        },
        {
          id: 'fiddle-leaf-fig',
          name: 'Fiddle Leaf Fig',
          botanicalName: 'Ficus lyrata',
          slug: 'fiddle-leaf-fig',
          price: 1999,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
          category: 'indoor',
        },
      ];
      localStorage.setItem('verdora_cart', JSON.stringify(demoCart));
    });

    await page.goto(`${BASE_URL}/checkout`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('h1', { timeout: 5000 });

    const checkoutTitle = await page.$eval('h1', (el) => el.textContent);
    console.log(`- Checkout title: "${checkoutTitle}"`);

    // Verify order items summary is present
    const itemCount = await page.$$eval('.font-serif.text-sm.text-forest', (els) => els.length);
    console.log(`- Items detected in checkout summary: ${itemCount}`);

    // Click "Proceed to Pay" button to open Razorpay Interactive Modal
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const proceed = btns.find((b) => b.textContent.includes('Proceed to Pay'));
      if (proceed) proceed.click();
    });
    await sleep(600);

    // Verify modal appears and screenshot it
    const modalVisible = await page.evaluate(() => {
      return document.body.textContent.includes('Razorpay Checkout');
    });
    console.log(`- Razorpay modal opened: ${modalVisible}`);

    const razorpayPath = path.join(ARTIFACT_DIR, 'checkout-razorpay.png');
    await page.screenshot({ path: razorpayPath });
    console.log(`- Saved screenshot: ${razorpayPath}`);

    // Click "Pay ₹... Securely" inside Razorpay modal
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const payBtn = btns.find((b) => b.textContent.includes('Securely'));
      if (payBtn) payBtn.click();
    });
    console.log('- Authorizing payment gateway simulation...');
    await sleep(2600);

    // Check order receipt confirmed
    const orderConfirmed = await page.evaluate(() => {
      const h2 = document.querySelector('h2');
      return h2 ? h2.textContent : '';
    });
    console.log(`- Order confirmation state: "${orderConfirmed}"`);

    // Verify localStorage has order
    const savedOrders = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('verdora_orders') || '[]');
    });
    console.log(`- Orders in localStorage: ${savedOrders.length} (Latest ID: ${savedOrders[0]?.orderId})`);

    // -------------------------------------------------------------
    // 2. TEST ORDER TRACKING (/track-order)
    // -------------------------------------------------------------
    console.log('\n[2/6] Testing Botanical Order Tracking (/track-order)...');
    const orderIdToTrack = savedOrders[0]?.orderId || 'VRD-8421-IN';
    await page.goto(`${BASE_URL}/track-order?id=${orderIdToTrack}`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('h1', { timeout: 5000 });

    const trackHeading = await page.$eval('h1', (el) => el.textContent);
    console.log(`- Tracking page title: "${trackHeading}" for ${orderIdToTrack}`);

    // Verify milestone events are visible
    const milestones = await page.$$eval('.space-y-6.relative.pl-6 > div', (els) => els.length);
    console.log(`- Dispatch milestones rendered: ${milestones}`);

    const trackScreenshot = path.join(ARTIFACT_DIR, 'order-tracking.png');
    await page.screenshot({ path: trackScreenshot, fullPage: true });
    console.log(`- Saved screenshot: ${trackScreenshot}`);

    // -------------------------------------------------------------
    // 3. TEST PROTECTED ADMIN DASHBOARD (/admin)
    // -------------------------------------------------------------
    console.log('\n[3/6] Testing Protected Admin Dashboard (/admin)...');
    // Clear auth first to verify guard screen
    await page.evaluate(() => localStorage.removeItem('verdora_auth_user'));
    await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('h1', { timeout: 5000 });

    const guardHeading = await page.$eval('h1', (el) => el.textContent);
    console.log(`- Admin Guard screen triggered: "${guardHeading}"`);

    // Click 1-Click Sign In as Head Botanist
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const adminLogin = btns.find((b) => b.textContent.includes('Sign In as Head Botanist'));
      if (adminLogin) adminLogin.click();
    });
    await sleep(800);

    // Now in dashboard!
    const dashboardTitle = await page.$eval('h1', (el) => el.textContent);
    console.log(`- Authenticated Admin Title: "${dashboardTitle}"`);

    // Switch to "Orders & Logistics" tab
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const ordersBtn = btns.find((b) => b.textContent.includes('Orders & Logistics'));
      if (ordersBtn) ordersBtn.click();
    });
    await sleep(400);

    // Verify order select dropdown exists and change status
    const selectCount = await page.$$eval('select', (els) => els.length);
    console.log(`- Order fulfillment dropdowns active: ${selectCount}`);

    await page.evaluate(() => {
      const sel = document.querySelector('select');
      if (sel) {
        sel.value = 'Delivered';
        sel.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    await sleep(400);

    // Switch to "Plant Catalog" tab
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const catBtn = btns.find((b) => b.textContent.includes('Plant Catalog'));
      if (catBtn) catBtn.click();
    });
    await sleep(400);

    // Increment stock of first plant
    await page.evaluate(() => {
      const plusSvg = document.querySelector('button svg.lucide-plus');
      if (plusSvg && plusSvg.parentElement) plusSvg.parentElement.click();
    });
    console.log('- Tested inventory stock increment and product badges');
    await sleep(300);

    // Switch to "Customers" tab
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const custBtn = btns.find((b) => b.textContent.includes('Customers'));
      if (custBtn) custBtn.click();
    });
    await sleep(300);
    const customersCount = await page.$$eval('tbody tr', (els) => els.length);
    console.log(`- Customer directory rows loaded: ${customersCount}`);

    // Switch back to "Overview" tab and capture admin screenshot
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const overBtn = btns.find((b) => b.textContent.includes('Overview'));
      if (overBtn) overBtn.click();
    });
    await sleep(400);

    const adminScreenshot = path.join(ARTIFACT_DIR, 'admin-dashboard.png');
    await page.screenshot({ path: adminScreenshot, fullPage: true });
    console.log(`- Saved screenshot: ${adminScreenshot}`);

    // -------------------------------------------------------------
    // 4. TEST ABOUT PAGE (/about)
    // -------------------------------------------------------------
    console.log('\n[4/6] Testing About Page (/about)...');
    await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('h1', { timeout: 5000 });

    const aboutHeading = await page.$eval('h1', (el) => el.textContent);
    console.log(`- About Page Headline: "${aboutHeading}"`);

    const aboutScreenshot = path.join(ARTIFACT_DIR, 'about-page.png');
    await page.screenshot({ path: aboutScreenshot, fullPage: true });
    console.log(`- Saved screenshot: ${aboutScreenshot}`);

    // -------------------------------------------------------------
    // 5. TEST CONTACT PAGE (/contact)
    // -------------------------------------------------------------
    console.log('\n[5/6] Testing Contact Page & Concierge Form (/contact)...');
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('h1', { timeout: 5000 });

    const contactHeading = await page.$eval('h1', (el) => el.textContent);
    console.log(`- Contact Page Headline: "${contactHeading}"`);

    // Fill out form
    await page.type('input[placeholder="e.g. Priya Iyer"]', 'Dr. Alistair Finch');
    await page.type('input[placeholder="priya@example.com"]', 'finch.botany@oxford.edu');
    await page.type('input[placeholder="+91 98200 00000"]', '+91 98201 99887');
    await page.type(
      'textarea',
      'Inquiry regarding acclimating mature Monstera Albo Borsigiana to Mumbai coastal humidity conditions.'
    );

    // Submit form
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const submitBtn = btns.find((b) => b.textContent.includes('Transmit Inquiry'));
      if (submitBtn) submitBtn.click();
    });
    await sleep(1200);

    // Verify submission confirmation card
    const contactTicketConfirmed = await page.evaluate(() => {
      return document.body.textContent.includes('Thank You') && document.body.textContent.includes('TKT-');
    });
    console.log(`- Contact concierge ticket generated: ${contactTicketConfirmed}`);

    const contactScreenshot = path.join(ARTIFACT_DIR, 'contact-page.png');
    await page.screenshot({ path: contactScreenshot, fullPage: true });
    console.log(`- Saved screenshot: ${contactScreenshot}`);

    // -------------------------------------------------------------
    // 6. RESPONSIVE MOBILE VERIFICATION & OVERFLOW AUDIT
    // -------------------------------------------------------------
    console.log('\n[6/6] Verifying Mobile Responsiveness (375x812 iPhone X/12)...');
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });

    const routesToCheck = [
      '/',
      '/shop',
      '/collections/indoor',
      '/plant-finder',
      '/plant-care',
      '/about',
      '/contact',
      '/track-order',
      '/cart',
      '/admin',
    ];

    let overflowFailures = 0;
    for (const route of routesToCheck) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle2' });
      await sleep(400);

      const overflow = await page.evaluate(() => {
        const root = document.documentElement;
        return {
          scrollWidth: root.scrollWidth,
          clientWidth: root.clientWidth,
          hasOverflow: root.scrollWidth > root.clientWidth,
        };
      });

      if (overflow.hasOverflow) overflowFailures++;

      console.log(
        `- Route ${route.padEnd(20)}: clientWidth=${overflow.clientWidth}px, scrollWidth=${overflow.scrollWidth}px -> Overflow: ${
          overflow.hasOverflow ? 'FAIL' : 'PASS'
        }`
      );
    }

    // Capture mobile screenshots
    await page.goto(`${BASE_URL}/track-order`, { waitUntil: 'networkidle2' });
    const mobileTrackPath = path.join(ARTIFACT_DIR, 'mobile-track-order.png');
    await page.screenshot({ path: mobileTrackPath });
    console.log(`- Saved screenshot: ${mobileTrackPath}`);

    await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle2' });
    const mobileAdminPath = path.join(ARTIFACT_DIR, 'mobile-admin.png');
    await page.screenshot({ path: mobileAdminPath });
    console.log(`- Saved screenshot: ${mobileAdminPath}`);

    console.log('\n--- VERIFICATION SUMMARY ---');
    console.log(`Console Errors: ${consoleErrors.length}`);
    console.log(`Overflow Failures: ${overflowFailures}`);
    if (consoleErrors.length > 0) {
      console.log('Errors:', consoleErrors);
    }
  } catch (err) {
    console.error('Test script encountered an error:', err);
  } finally {
    await browser.close();
    console.log('--- TEST SUITE COMPLETE ---');
  }
}

run();