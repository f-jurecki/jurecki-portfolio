// Run against a local Astro server: node scripts/check-solitaire-render.mjs http://127.0.0.1:4322
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';
import { validState } from '../src/lib/solitaire.mjs';

const tableau = [[{ id: 5, up: false }, { id: 11, up: true }, { id: 23, up: true }], [{ id: 25, up: true }], [{ id: 1, up: true }, { id: 13, up: true }], [], [], [], []];
const used = tableau.flat().map((card) => card.id);
const state = { version: 1, moves: 0, tableau, stock: Array.from({ length: 52 }, (_, id) => id).filter((id) => !used.includes(id)), waste: [], foundations: [[], [], [], []] };
assert.ok(validState(state));
const browser = await chromium.launch({ executablePath: process.env.BROWSER_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
try {
	for (const width of [390, 1440]) {
		const page = await browser.newPage({ viewport: { width, height: 900 } });
		const errors = [];
		page.on('pageerror', (error) => errors.push(error.message));
		await page.addInitScript((state) => {
			localStorage.setItem('fedor-jurecki-language', 'en');
			if (!localStorage.getItem('misprint-solitaire-v1')) localStorage.setItem('misprint-solitaire-v1', JSON.stringify({ state, history: [] }));
		}, state);
		await page.goto(`${process.argv[2] || 'http://127.0.0.1:4322'}/projects/personal/cards/solitaire/`);
		await page.waitForSelector('.playing-card');
		const initialHeight = await page.locator('.game-window').evaluate((el) => el.getBoundingClientRect().height);
		assert.equal(await page.locator('[data-status]').textContent(), '');
		assert.equal(await page.locator('.game-footer, .draw-mode, .status-bar').count(), 0);
		await page.evaluate(async () => {
			await Promise.all([...document.querySelectorAll('.playing-card img')].map((img) => img.decode()));
			window.originalCards = [...document.querySelectorAll('.playing-card')];
			window.removedCards = new Set();
			new MutationObserver((records) => {
				for (const record of records) for (const removed of record.removedNodes) {
					for (const card of window.originalCards) if (removed === card || removed.contains(card)) window.removedCards.add(card);
				}
			}).observe(document.querySelector('[data-table]'), { childList: true, subtree: true });
		});
		for (let i = 0; i < 3; i++) await page.locator('[data-hint]').click();
		await page.keyboard.press('Escape');
		await page.locator('.playing-card[data-zone="stock"]').click();
		await page.locator('[data-undo]').click();
		assert.equal(await page.locator('.game-window').evaluate((el) => el.getBoundingClientRect().height), initialHeight, 'Hints and undo do not change the window height');
		await page.setViewportSize({ width: width - 10, height: 900 });
		await page.waitForTimeout(200); // Resize rendering is debounced by 100 ms.
		const resizedHeight = await page.locator('.game-window').evaluate((el) => el.getBoundingClientRect().height);
		assert.ok(await page.evaluate(() => window.removedCards.size === 0 && window.originalCards.every((card) => card.isConnected && card.querySelector('img').complete)), 'Hints, drawing, undo and resizing keep all existing cards attached');
		await page.getByRole('button', { name: 'Ace, spades', exact: true }).click();
		await page.getByRole('button', { name: 'Queen, hearts', exact: true }).click({ position: { x: 5, y: 5 } });
		assert.equal(await page.locator('.pile[data-zone="foundations"][data-pile="1"] .playing-card').getAttribute('aria-label'), 'Ace, spades');
		assert.equal(await page.locator('.pile[data-zone="tableau"][data-pile="1"] .playing-card').count(), 3);
		assert.equal(await page.locator('.game-window').evaluate((el) => el.getBoundingClientRect().height), resizedHeight, 'Moving a stack and revealing a card do not change the window height');
		assert.ok(await page.evaluate(() => window.originalCards.filter((card) => ['King, spades', '2, hearts'].includes(card.getAttribute('aria-label'))).every((card) => card.isConnected && !window.removedCards.has(card))), 'Moving cards and revealing a hidden card leave unrelated cards attached');
		await page.locator('[data-undo]').click();
		await page.locator('[data-undo]').click();
		assert.ok(await page.evaluate(() => window.originalCards.every((card) => card.isConnected)), 'Undo reuses the original card and image nodes, including the hidden card');
		const queen = await page.getByRole('button', { name: 'Queen, hearts', exact: true }).boundingBox();
		const emptyColumn = page.locator('.pile[data-zone="tableau"][data-pile="3"]');
		const empty = await emptyColumn.boundingBox();
		await page.mouse.move(queen.x + 5, queen.y + 5);
		await page.mouse.down();
		await page.mouse.move(empty.x + empty.width / 2, empty.y + 20, { steps: 10 });
		await page.mouse.up();
		assert.equal(await emptyColumn.locator('.playing-card').count(), 2, 'Dragging a non-king sequence into an empty column works');
		assert.ok(await page.evaluate(() => JSON.parse(localStorage.getItem('misprint-solitaire-v1')).state.tableau[0][0].up), 'Moving the sequence reveals the hidden card');
		await page.locator('[data-undo]').click();
		await page.waitForTimeout(400); // The game suppresses the click following a drag.
		await page.getByRole('button', { name: 'Jack, spades', exact: true }).click();
		assert.equal(await emptyColumn.locator('.playing-card').getAttribute('aria-label'), 'Jack, spades', 'Clicking a non-king card finds an empty column');
		await page.locator('[data-undo]').click();
		await page.locator('.playing-card[data-zone="stock"]').click();
		const saved = await page.evaluate(() => localStorage.getItem('misprint-solitaire-v1'));
		for (const name of ['Minimize game and return to case', 'Close game and return to case']) {
			await page.getByRole('link', { name, exact: true }).click();
			await page.waitForURL('**/projects/personal/cards/');
			await page.getByRole('link', { name: 'Play solitaire' }).click();
			await page.waitForSelector('.playing-card');
			assert.equal(await page.evaluate(() => localStorage.getItem('misprint-solitaire-v1')), saved, 'Both window controls preserve the game through the case');
		}
		await page.locator('[data-new]').click();
		await page.locator('dialog button[value="cancel"]').click();
		assert.equal(await page.evaluate(() => localStorage.getItem('misprint-solitaire-v1')), saved, 'Canceling a new game preserves the save');
		assert.deepEqual(errors, []);
		await page.close();
		const sequence = Array.from({ length: 13 }, (_, i) => ({ id: (i % 2 ? 13 : 0) + 12 - i, up: true }));
		const remaining = Array.from({ length: 52 }, (_, id) => id).filter((id) => !sequence.some((card) => card.id === id));
		const longest = { ...state, stock: remaining.slice(6), tableau: [[...remaining.slice(0, 6).map((id) => ({ id, up: false })), ...sequence], [], [], [], [], [], []] };
		assert.ok(validState(longest));
		const longPage = await browser.newPage({ viewport: { width, height: 900 } });
		await longPage.addInitScript((state) => {
			localStorage.setItem('fedor-jurecki-language', 'en');
			if (!localStorage.getItem('misprint-solitaire-v1')) localStorage.setItem('misprint-solitaire-v1', JSON.stringify({ state, history: [] }));
		}, longest);
		await longPage.goto(`${process.argv[2] || 'http://127.0.0.1:4322'}/projects/personal/cards/solitaire/`);
		await longPage.waitForSelector('.playing-card');
		assert.equal(await longPage.locator('.game-window').evaluate((el) => el.getBoundingClientRect().height), initialHeight, 'The longest column fits the same window as a short deal');
		assert.ok(await longPage.evaluate(() => document.querySelector('.tableau .playing-card:last-child').getBoundingClientRect().bottom <= document.querySelector('.tableau').getBoundingClientRect().bottom), 'All 19 cards fit inside the reserved space');
		const almostWon = { version: 1, moves: 51, stock: [], waste: [], foundations: Array.from({ length: 4 }, (_, suit) => Array.from({ length: 13 }, (_, rank) => suit * 13 + rank)), tableau: [[{ id: 12, up: true }], [], [], [], [], [], []] };
		almostWon.foundations[0].pop();
		assert.ok(validState(almostWon));
		await longPage.evaluate((state) => localStorage.setItem('misprint-solitaire-v1', JSON.stringify({ state, history: [] })), almostWon);
		await longPage.reload();
		await longPage.getByRole('button', { name: 'King, hearts', exact: true }).click();
		await longPage.locator('[data-win]').waitFor({ state: 'visible' });
		await longPage.locator('[data-celebration]').waitFor({ state: 'visible' });
		assert.equal(await longPage.locator('[data-win] button').count(), 2);
		assert.equal(await longPage.locator('[data-win] p, [data-win] .win-kicker').count(), 0);
		await longPage.emulateMedia({ reducedMotion: 'reduce' });
		await longPage.locator('[data-replay]').click();
		await longPage.locator('[data-celebration]').waitFor({ state: 'hidden' });
		await longPage.close();
	}
	console.log('Solitaire rendering: stable cards on hints, draw, moves, reveal, undo and resize at mobile/desktop sizes');
} finally {
	await browser.close();
}
