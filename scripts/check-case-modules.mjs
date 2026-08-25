import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const pages = {
	home: await readFile('dist/index.html', 'utf8'),
	iofs: await readFile('dist/projects/publications/iofs/index.html', 'utf8'),
	unesco: await readFile('dist/projects/publications/unesco/index.html', 'utf8'),
	kipd: await readFile('dist/projects/publications/kipd/index.html', 'utf8'),
	infographics: await readFile('dist/projects/infographics/index.html', 'utf8'),
	adobeScripts: await readFile('dist/projects/vibecoding/adobe-scripts/index.html', 'utf8'),
	republica: await readFile('dist/projects/personal/republica/index.html', 'utf8'),
	shelfr: await readFile('dist/projects/product-design/shelfr/index.html', 'utf8'),
};
const shelfrMobile = await readFile('dist/projects/product-design/shelfr/mobile.css', 'utf8');
const shelfrMobileScript = await readFile('dist/projects/product-design/shelfr/mobile.js', 'utf8');

assert.doesNotMatch(pages.kipd, /class="case-facts"/, 'kipd: facts module should be removed');
assert.match(pages.kipd, /class="case-results"/, 'kipd: results module is missing');
assert.doesNotMatch(pages.kipd, /class="project-cta"/, 'kipd: project CTA should be removed');
assert.match(pages.kipd, />ГАЛЕРЕЯ<\/h2>/, 'kipd: simplified gallery heading is missing');
assert.match(pages.kipd, /В рамках трёх исследовательских проектов KIPD/, 'kipd: project introduction is missing');
assert.match(pages.kipd, /Все версии я подготовил к публикации/, 'kipd: result should be written in first person');

for (const [name, html] of Object.entries(pages).filter(([name]) => ['iofs', 'unesco', 'kipd'].includes(name))) {
	assert.doesNotMatch(html, /class="case-index"/, `${name}: case index should be removed`);
}

for (const [name, html] of Object.entries(pages).filter(([name]) => ['iofs'].includes(name))) {
	assert.doesNotMatch(html, /class="case-facts"/, `${name}: facts module should be removed`);
	assert.match(html, /class="case-results"/, `${name}: common results module is missing`);
	assert.doesNotMatch(html, /class="project-cta"/, `${name}: project CTA should be removed`);
	assert.match(html, />ГАЛЕРЕЯ<\/h2>/, `${name}: simplified gallery heading is missing`);
	assert.match(html, /Основной язык вёрстки — английский/, `${name}: English layout language is missing`);
	assert.match(html, /В работе над печатными материалами ИОПБ я выступаю ведущим дизайнером/, `${name}: project introduction is missing`);
}

assert.doesNotMatch(pages.unesco, /class="case-facts"|class="case-results"|class="project-cta"/, 'unesco: secondary summary modules should be removed');
assert.match(pages.unesco, />ГАЛЕРЕЯ<\/h2>/, 'unesco: simplified gallery heading is missing');
assert.match(pages.unesco, /Над серией крупных аналитических докладов ЮНЕСКО/, 'unesco: project introduction is missing');
assert.match(pages.unesco, /Основной доклад и четыре приложения объединяют большой объём данных/, 'unesco: task paragraph is missing');
assert.doesNotMatch(pages.unesco, /Данные задают|Четыре приложения\. Общие правила|Карты и диаграммы объясняют/, 'unesco: removed explanatory sections are still present');

for (const [name, html] of Object.entries(pages).filter(([name]) => ['home', 'iofs', 'unesco', 'kipd'].includes(name))) {
	assert.doesNotMatch(html, /печатн(?:ый|ого) тираж|производств(?:о|а) тиража|произвел\S* тираж|типографическ\S* услуг/i, `${name}: print-production service wording is still present`);
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
assert.equal((pages.adobeScripts.match(/\bdata-full-src=/g) ?? []).length, 13, 'Adobe Scripts: expected 13 source screenshots');
assert.equal((pages.adobeScripts.match(/\bsrcset=/g) ?? []).length, 13, 'Adobe Scripts: every screenshot needs a responsive srcset');

assert.match(pages.shelfr, /name="viewport" content="width=device-width, initial-scale=1"/, 'Shelfr: responsive viewport is missing');

assert.match(pages.republica, /<h1\b[^>]*id="republica-title"[^>]*>Шрифт Republica<\/h1>/, 'Republica: page title is missing');
assert.equal((pages.republica.match(/class="letter-button"/g) ?? []).length, 26, 'Republica: expected all 26 PNG glyphs');
assert.equal((pages.republica.match(/<video\b/g) ?? []).length, 3, 'Republica: expected three source-to-glyph videos');
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
assert.equal((shelfrMobileScript.match(/shelfr-flow-\d{2}\.(?:webp|png)/g) ?? []).length, 14, 'Shelfr: expected all 15 User Flow slides including the existing first slide');
assert.match(shelfrMobileScript, /buildSurveyVisuals/, 'Shelfr: survey messages and audience chart are missing');
assert.match(shelfrMobileScript, /buildColorGallery/, 'Shelfr: color exploration gallery is missing');
assert.match(shelfrMobileScript, /buildIterationSliders/, 'Shelfr: iteration triplets are missing');
assert.match(shelfrMobileScript, /Скетч на бумаге.*Вайрфрейм.*Готовый экран/, 'Shelfr: iteration stages are incomplete');
assert.match(shelfrMobileScript, /buildKillerCopy/, 'Shelfr: Killer Feature copy is missing');
assert.doesNotMatch(shelfrMobileScript, /copy: \['\.framer-ed2mu'/, 'Shelfr: old Killer Feature copy is still used on mobile');
assert.match(shelfrMobileScript, /shelfr-mobile-gallery--masonry/, 'Shelfr: independent Wireframes columns are missing');
assert.match(shelfrMobileScript, /Протестировать оставшиеся сценарии/, 'Shelfr: User Testing recommendations are not translated');
assert.match(shelfrMobile, /shelfr-mobile-recommendations/, 'Shelfr: User Testing recommendations are not separated');
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
