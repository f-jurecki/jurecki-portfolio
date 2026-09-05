import assert from 'node:assert/strict';
import { readdir, readFile, access } from 'node:fs/promises';
import { join } from 'node:path';

let pages = 0;
for (const entry of await readdir('dist', { recursive: true, withFileTypes: true })) {
	if (!entry.isFile() || !/\.(html|css|js)$/.test(entry.name)) continue;
	const path = join(entry.parentPath, entry.name);
	const source = await readFile(path, 'utf8');
	assert.doesNotMatch(source, /events\.framer\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|framerusercontent\.com\/assets\/[^\s"')]+\.woff2/, `${path}: external analytics or fonts remain`);
	for (const match of source.matchAll(/url\(["']?(\/fonts\/[^\s"')]+)["']?\)/g)) await access(join('dist', match[1]));
	if (!path.endsWith('.html') || !source.includes('<main')) continue;
	const ru = /<html[^>]*lang="ru"/.test(source);
	assert.match(source, new RegExp(`<footer class="privacy-footer"><a href="${ru ? '/ru' : ''}/privacy/">`), `${path}: localized privacy footer missing`);
	pages++;
}
for (const locale of ['', 'ru/']) {
	const html = await readFile(`dist/${locale}privacy/index.html`, 'utf8');
	assert.match(html, /mailto:fedorjurecki@gmail\.com/);
	assert.match(html, /https:\/\/vercel\.com\/legal\/privacy-notice/);
}
for (const family of ['tiktoksans', 'dmsans', 'spacegrotesk']) {
	assert.match(await readFile(`public/fonts/${family}-LICENSE.txt`, 'utf8'), /SIL OPEN FONT LICENSE/);
}
assert.ok(pages >= 38);
console.log(`Privacy: ${pages} page footers, EN/RU notices, local font files and no Google Fonts / Framer analytics OK`);
