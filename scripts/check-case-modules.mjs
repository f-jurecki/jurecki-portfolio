import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const pages = {
	iofs: await readFile('dist/projects/publications/iofs/index.html', 'utf8'),
	unesco: await readFile('dist/projects/publications/unesco/index.html', 'utf8'),
	kipd: await readFile('dist/projects/publications/kipd/index.html', 'utf8'),
	infographics: await readFile('dist/projects/infographics/index.html', 'utf8'),
	adobeScripts: await readFile('dist/projects/vibecoding/adobe-scripts/index.html', 'utf8'),
	shelfr: await readFile('dist/projects/product-design/shelfr/index.html', 'utf8'),
};
const shelfrMobile = await readFile('dist/projects/product-design/shelfr/mobile.css', 'utf8');
const shelfrMobileScript = await readFile('dist/projects/product-design/shelfr/mobile.js', 'utf8');

for (const [name, html] of Object.entries(pages).filter(([name]) => ['iofs', 'unesco', 'kipd'].includes(name))) {
	assert.match(html, /class="case-facts"/, `${name}: common facts module is missing`);
	assert.match(html, /class="case-results"/, `${name}: common results module is missing`);
}

assert.match(pages.iofs, /case-gallery-spread/);
assert.match(pages.unesco, /case-gallery-spread/);
assert.match(pages.kipd, /case-gallery-pages/);
assert.match(pages.infographics, /case-gallery-numbered/);
assert.match(pages.iofs, /data-case-lightbox="spread"/);
assert.match(pages.kipd, /data-case-lightbox="single"/);
assert.match(pages.infographics, /data-case-lightbox="single"/);

for (const id of ['contents', 'gridster', 'colorproofer', 'framesplitter', 'book-styles']) {
	assert.match(pages.adobeScripts, new RegExp(`id="${id}"`), `Adobe Scripts: ${id} section is missing`);
}
assert.equal((pages.adobeScripts.match(/\bdata-full-src=/g) ?? []).length, 12, 'Adobe Scripts: expected 12 source screenshots');
assert.equal((pages.adobeScripts.match(/\bsrcset=/g) ?? []).length, 12, 'Adobe Scripts: every screenshot needs a responsive srcset');

assert.match(pages.shelfr, /name="viewport" content="width=device-width, initial-scale=1"/, 'Shelfr: responsive viewport is missing');
assert.match(pages.shelfr, /href="\/projects\/product-design\/shelfr\/mobile\.css"/, 'Shelfr: mobile stylesheet is missing');
assert.match(pages.shelfr, /src="\/projects\/product-design\/shelfr\/mobile\.js"/, 'Shelfr: mobile script is missing');
assert.match(shelfrMobile, /@media \(max-width: 1024px\)/, 'Shelfr: mobile breakpoint is missing');
assert.match(shelfrMobile, /#main > \[data-framer-root\]/, 'Shelfr: fixed Framer canvas is not hidden on mobile');
assert.equal((shelfrMobileScript.match(/id: '[^']+'/g) ?? []).length, 14, 'Shelfr: expected 14 mobile sections');
assert.match(shelfrMobileScript, /shelfr-mobile-table/, 'Shelfr: prioritization table is missing');
assert.match(shelfrMobileScript, /tableHeaders: \['Приложение'/, 'Shelfr: competitor comparison is missing');
assert.match(shelfrMobileScript, /\.framer-1mobc36/, 'Shelfr: survey questions are missing');
assert.match(shelfrMobileScript, /buildAllQuoteCards/, 'Shelfr: full interview quotes are missing');
assert.match(shelfrMobileScript, /\.framer-ohkkmy/, 'Shelfr: testing scenarios are missing');
assert.match(shelfrMobile, /#mobile-ia h2/, 'Shelfr: long IA heading needs a narrow-screen size');

for (const [name, html] of Object.entries(pages).filter(([name]) => ['iofs', 'unesco', 'kipd', 'infographics'].includes(name))) {
	const gallery = html.match(/<section id="case-gallery"[\s\S]*?<\/section>/)?.[0] ?? '';
	const images = gallery.match(/<img\b[^>]*>/g) ?? [];
	assert.ok(images.length > 0, `${name}: gallery images are missing`);
	images.forEach((image) => {
		assert.match(image, /\bwidth="\d+"/, `${name}: gallery image width is missing`);
		assert.match(image, /\bheight="\d+"/, `${name}: gallery image height is missing`);
	});
}

console.log('Case modules: OK');
