const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3459/brand-identity-pdf.html', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.check('900 32px Inter'));
  await page.waitForTimeout(1000);

  await page.pdf({
    path: 'C:/Dev/Aegisnetwork/brand/aegis-network-brand-manual.pdf',
    format: 'A4',
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    printBackground: true,
    displayHeaderFooter: false
  });

  console.log('PDF generated successfully');
  await browser.close();
})();
