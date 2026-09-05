// Run against a local Astro server: node scripts/check-shelfr-navigation.mjs http://127.0.0.1:4322
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';

const browser = await chromium.launch({
	executablePath: process.env.BROWSER_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
	headless: true,
});
try {
	for (const width of [320, 390, 768, 1024, 1280]) {
		const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
		await page.addInitScript(() => localStorage.setItem('fedor-jurecki-language', 'en'));
		const response = await page.goto(`${process.argv[2] || 'http://127.0.0.1:4322'}/projects/product-design/shelfr/index.html`);
		assert.ok(response.ok(), `Shelfr returned HTTP ${response.status()}`);
		await page.waitForSelector('.portfolio-project-navigation');
		const button = page.locator('.shelfr-mobile-scroll-top');
		if (width <= 1024) {
			const captions = await page.locator('.shelfr-mobile-case figcaption').allTextContents();
			assert.ok(captions.includes('Paper sketch') && captions.includes('Wireframe') && captions.includes('Final screen'));
			assert.ok(captions.every((caption) => !/[А-Яа-яЁё]/.test(caption)), 'English mobile captions contain no Russian text');
			assert.equal(await button.isVisible(), false);
			await page.evaluate(() => scrollTo({ top: innerHeight * 2, behavior: 'instant' }));
			await button.waitFor({ state: 'visible' });
			assert.equal(await button.getAttribute('aria-label'), 'Back to top');
			const rect = await button.boundingBox();
			assert.ok(rect.x >= 0 && rect.x + rect.width <= width && rect.y + rect.height <= 900);
			await button.click();
			await page.waitForFunction(() => scrollY === 0);
			await button.waitFor({ state: 'hidden' });
		} else assert.equal(await button.count(), 0);
		await page.close();
	}
	console.log('Shelfr: back-to-top visibility, position and click OK at 320–1024px; desktop unchanged');
} finally {
	await browser.close();
}
