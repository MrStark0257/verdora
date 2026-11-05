import puppeteer from 'puppeteer';
import path from 'path';

async function verifyPeaceLily() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Visit product detail page for peace lily
  await page.goto('http://127.0.0.1:5173/product/peace-lily-sensation', { waitUntil: 'networkidle2' });
  const title = await page.$eval('h1', (el) => el.textContent);
  console.log('Title on detail page:', title);
  const imgSrc = await page.$eval('.aspect-square img, .overflow-hidden img', (el) => el.src);
  console.log('Main image source:', imgSrc);

  // Take screenshot of product detail
  const detailPath = path.join(
    'C:\\Users\\Asus\\.gemini\\antigravity\\brain\\c66bebe3-0374-4eff-b15c-5b54f9963f05',
    'peace-lily-fixed.png'
  );
  await page.screenshot({ path: detailPath, fullPage: false });
  console.log('Saved detail screenshot to:', detailPath);

  // 2. Visit shop catalog to see Peace Lily in grid
  await page.goto('http://127.0.0.1:5173/shop', { waitUntil: 'networkidle2' });
  const cardImg = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('article, .group, .bg-white'));
    const peaceCard = cards.find((c) => c.textContent.includes('Peace Lily'));
    const img = peaceCard?.querySelector('img');
    return img ? img.src : null;
  });
  console.log('Peace lily image in shop grid:', cardImg);

  await browser.close();
  console.log('Verification finished successfully!');
}

verifyPeaceLily();

