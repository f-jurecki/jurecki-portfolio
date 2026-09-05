// Run against a local Astro server: node scripts/check-republica-tester.mjs http://127.0.0.1:4322
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';

const browser = await chromium.launch({ executablePath: process.env.BROWSER_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
try {
	for (const [width, locale] of [[390, 'ru/'], [1440, '']]) {
		const page = await browser.newPage({ viewport: { width, height: 1000 } });
		const errors = [];
		page.on('pageerror', (error) => errors.push(error.message));
		await page.addInitScript(() => {
			localStorage.setItem('fedor-jurecki-language', 'en');
			let random = 0;
			Math.random = () => (random++ % 4) / 4;
		});
		await page.goto(`${process.argv[2] || 'http://127.0.0.1:4322'}/${locale}projects/personal/republica/`);
		const input = page.locator('#republica-input');
		const preview = input;
		assert.equal(await page.locator('textarea, [data-type-preview]').count(), 0, 'Only the directly editable specimen remains');
		assert.equal(await page.locator('.alphabet-stage').evaluate((el) => el.nextElementSibling.id), 'republica-tester');
		await input.fill('');
		await input.fill('ABCD efgh 123!');
		assert.equal(await preview.textContent(), 'ABCD efgh 123!');
		assert.equal(await preview.locator('.republica-glyph').count(), 2, 'About one in four letters uses Republica');
		const original = await preview.innerHTML();
		await input.press('End');
		await input.pressSequentially(' More');
		assert.ok((await preview.innerHTML()).startsWith(original), 'Typing does not reshuffle existing letters');
		await input.fill('Hello Привет 世界🙂 123!?');
		assert.equal(await input.textContent(), 'Hello   123!?');
		assert.equal(await preview.textContent(), 'Hello   123!?');
		await input.fill('abcd');
		for (let i = 0; i < 3; i++) await input.press('ArrowLeft');
		await page.keyboard.insertText('ЖZ');
		assert.equal(await input.textContent(), 'aZbcd');
		assert.equal(await input.evaluate((el) => { const range = document.createRange(); range.selectNodeContents(el); range.setEnd(getSelection().focusNode, getSelection().focusOffset); return range.toString().length; }), 2, 'Filtering preserves the caret while editing in the middle');
		await input.press('ControlOrMeta+z');
		assert.equal(await input.textContent(), 'abcd', 'Undo restores the edit');
		await input.press('ControlOrMeta+Shift+z');
		assert.equal(await input.textContent(), 'aZbcd', 'Redo restores text and variants');
		await input.fill('One');
		await input.press('Enter');
		await input.pressSequentially('Two');
		assert.equal(await input.textContent(), 'One\nTwo', 'Multiline typing stays in the same editor');
		await input.fill('a'.repeat(280));
		await input.press('ArrowLeft');
		await input.pressSequentially('Z');
		assert.equal(await input.textContent(), 'a'.repeat(280), 'The length limit does not erase the suffix');
		await page.evaluate(() => { Math.random = () => 0; });
		const glyphMask = () => input.evaluate((el) => {
			const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
			const mask = [];
			while (walker.nextNode()) mask.push(...Array.from(walker.currentNode.textContent, () => !!walker.currentNode.parentElement.closest('.republica-glyph')));
			return mask;
		});
		const checkNeighbors = async () => {
			const mask = await glyphMask();
			assert.ok(mask.every((glyph, i) => !glyph || !mask[i - 1]), 'Republica glyphs must never be adjacent');
			const text = await input.textContent();
			let plainLetters = 0;
			for (let i = 0; i < text.length; i++) {
				if (!/[A-Za-z]/.test(text[i])) { assert.equal(mask[i], false); continue; }
				plainLetters = mask[i] ? 0 : plainLetters + 1;
				assert.ok(plainLetters < 6, 'Every six letters must include Republica, ignoring spaces and punctuation');
			}
		};
		await input.fill('');
		await input.fill('abcdefgh');
		assert.deepEqual(await glyphMask(), [true, false, true, false, true, false, true, false], 'Even when every random choice selects Republica, letters alternate');
		for (let i = 0; i < 6; i++) await input.press('ArrowLeft');
		await input.press('Backspace');
		assert.equal(await input.textContent(), 'acdefgh');
		await checkNeighbors();
		await input.pressSequentially('Z');
		await checkNeighbors();
		for (let i = 0; i < 2; i++) await input.press('ArrowLeft');
		await input.pressSequentially('Q');
		await checkNeighbors();
		await input.press('ControlOrMeta+z');
		await checkNeighbors();
		await input.press('ControlOrMeta+Shift+z');
		await checkNeighbors();
		await page.evaluate(() => { Math.random = () => 1; });
		await input.fill('');
		await input.fill('abcdef 123! ghijkl\nmnopqr');
		await checkNeighbors();
		assert.equal(await input.locator('.republica-glyph').count(), 3, 'Every sixth letter is forced when randomness never selects Republica');
		const length = (await input.textContent()).length;
		for (let i = 0; i < length - 6; i++) await input.press('ArrowLeft');
		await input.press('Backspace');
		await checkNeighbors();
		await input.pressSequentially('UVWXYZ');
		await checkNeighbors();
		await input.press('ControlOrMeta+z');
		await checkNeighbors();
		await input.press('ControlOrMeta+Shift+z');
		await checkNeighbors();
		await input.fill('Letters from the streets of Astana.');
		await page.evaluate(() => Promise.all([document.fonts.load('400 64px Republica', 'Aa'), document.fonts.load('600 64px "TikTok Sans"', 'Aa')]));
		assert.ok(await page.evaluate(() => document.fonts.check('400 64px Republica', 'Aa')));
		assert.ok((await preview.evaluate((el) => getComputedStyle(el).fontFamily)).includes('TikTok Sans'));
		assert.equal(await input.evaluate((el) => getComputedStyle(el).color), 'rgb(245, 245, 245)');
		assert.equal(await input.locator('.republica-glyph').first().evaluate((el) => getComputedStyle(el).filter), 'brightness(0) invert(1)');
		assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No horizontal overflow');
		await page.locator('[data-republica-tester]').screenshot({ path: `/private/tmp/republica-tester-${width}.png` });
		assert.deepEqual(errors, []);
		await page.close();
	}
	console.log('Republica tester: Latin-only input, stable random glyphs, caret, local fonts and responsive layout OK');
} finally {
	await browser.close();
}
