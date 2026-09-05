import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

for (const file of (await readdir('dist', { recursive: true })).filter((file) => file.endsWith('.html'))) {
	const html = await readFile(`dist/${file}`, 'utf8');
	if (file.endsWith('projects/presentations/index.html')) {
		assert.match(html, /name="robots" content="noindex, noimageindex, follow"/, `${file}: direct-link page must not be indexed`);
		assert.equal((html.match(/class="case-gallery-item"/g) ?? []).length, 27, `${file}: direct-link gallery has 27 unique slides`);
		assert.doesNotMatch(html, /alt="(?:Образовательная презентация: слайд|Educational Presentation: slide) (?:15|16|17|18|19|20)"/, `${file}: duplicate education slides must stay excluded`);
		assert.match(html, /alt="(?:Образовательная презентация: слайд|Educational Presentation: slide) 21"/, `${file}: final unique slide must remain`);
	} else {
		assert.doesNotMatch(html, /href="[^"]*\/projects\/presentations(?:\/|"|\?)/, `${file}: public page links to presentations`);
		const text = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '').replace(/<[^>]*>/g, ' ');
		assert.doesNotMatch(text, /\bpresentations?\b|(?<!ре)презентаци/iu, `${file}: public copy mentions presentations`);
	}
}
assert.doesNotMatch(await readFile('dist/sitemap.xml', 'utf8'), /projects\/presentations/, 'Presentations must stay out of the sitemap');
for (const path of ['dist/index.html', 'dist/ru/index.html']) {
	const html = await readFile(path, 'utf8');
	assert.equal((html.match(/class="portfolio-index-item"/g) ?? []).length, 5, `${path}: homepage must have five sections`);
}

const pages = {
	home: await readFile('dist/index.html', 'utf8'),
	iofs: await readFile('dist/ru/projects/publications/iofs/index.html', 'utf8'),
	unesco: await readFile('dist/ru/projects/publications/unesco/index.html', 'utf8'),
	kipd: await readFile('dist/ru/projects/publications/kipd/index.html', 'utf8'),
	infographics: await readFile('dist/projects/infographics/index.html', 'utf8'),
	presentations: await readFile('dist/ru/projects/presentations/index.html', 'utf8'),
	adobeScripts: await readFile('dist/projects/vibecoding/adobe-scripts/index.html', 'utf8'),
	sequence: await readFile('dist/ru/projects/vibecoding/sequence/index.html', 'utf8'),
	republica: await readFile('dist/ru/projects/personal/republica/index.html', 'utf8'),
	shelfr: await readFile('dist/projects/product-design/shelfr/index.html', 'utf8'),
};
const shelfrMobile = await readFile('dist/projects/product-design/shelfr/mobile.css', 'utf8');
const shelfrMobileScript = await readFile('dist/projects/product-design/shelfr/mobile.js', 'utf8');
const shelfrLocale = await readFile('dist/projects/product-design/shelfr/locale.js', 'utf8');
const lightboxComponent = await readFile('src/components/CaseLightbox.astro', 'utf8');
const languageGateComponent = await readFile('src/components/LanguageGate.astro', 'utf8');
const infographicsPage = await readFile('src/pages/projects/infographics/index.astro', 'utf8');
assert.match(lightboxComponent, /sources\.length < 1 \|\| sources\.length > targets\.length/);
assert.match(lightboxComponent, /data-page-count="1"/);

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
assert.match(pages.unesco, /1 диагностический анализ[\s\S]*4 приложения[\s\S]*5 аналитических записок/, 'unesco: publication breakdown is missing');
assert.doesNotMatch(pages.unesco, /Данные задают|Четыре приложения\. Общие правила|Карты и диаграммы объясняют/, 'unesco: removed explanatory sections are still present');

for (const [name, html] of Object.entries(pages).filter(([name]) => ['home', 'iofs', 'unesco', 'kipd'].includes(name))) {
	assert.doesNotMatch(html, /печатн(?:ый|ого) тираж|производств(?:о|а) тиража|произвел\S* тираж|типографическ\S* услуг/i, `${name}: print-production service wording is still present`);
}

assert.match(pages.iofs, /case-gallery-spread/);
assert.match(pages.unesco, /case-gallery-spread/);
assert.match(pages.kipd, /case-gallery-pages/);
assert.match(pages.infographics, /case-gallery-numbered/);
for (const locale of ['', 'ru/']) {
	const html = await readFile(`dist/${locale}projects/infographics/index.html`, 'utf8');
	assert.doesNotMatch(html, /graphic-10[2-9]/, 'Infographics: removed TOiR slides must not appear in the gallery or lightbox');
	assert.equal((html.match(/class="case-gallery-item"/g) ?? []).length, 89, 'Infographics: only the eight requested slides should be removed');
}
assert.match(pages.iofs, /data-case-lightbox="spread"/);
assert.match(pages.kipd, /data-case-lightbox="single"/);
assert.match(pages.infographics, /data-case-lightbox="single"/);
assert.match(lightboxComponent, /data-lightbox-step="-1"/, 'Lightbox: previous button is missing');
assert.match(lightboxComponent, /data-lightbox-step="1"/, 'Lightbox: next button is missing');
assert.match(lightboxComponent, /event\.key === 'ArrowLeft'/, 'Lightbox: keyboard navigation is missing');
assert.match(lightboxComponent, /trigger\.getClientRects\(\)\.length > 0/, 'Lightbox: navigation must ignore hidden gallery items');
assert.match(lightboxComponent, /dataset\.lightboxOrder/, 'Lightbox: visual gallery order is ignored');
assert.match(infographicsPage, /const updateReadingOrder = \(\) =>/, 'Infographics: masonry reading order is missing');

assert.match(pages.presentations, /<h1\b[^>]*>Презентации<\/h1>/, 'Presentations: simplified title is missing');
assert.match(pages.presentations, /понятную и выразительную инфографику/, 'Presentations: project introduction is missing');
assert.match(pages.presentations, /href="\/(?:ru\/)?projects\/infographics"/, 'Presentations: infographics link is missing');
assert.doesNotMatch(pages.presentations, /NDA|Конфиденциальн|Открытые примеры/, 'Presentations: removed NDA sections are still present');
assert.equal((pages.presentations.match(/class="case-gallery-item"/g) ?? []).length, 27, 'Presentations: expected 27 unique slides');
assert.match(pages.presentations, /case-gallery-numbered/);
assert.match(pages.presentations, /data-case-lightbox="single"/);

for (const id of ['contents', 'gridster', 'colorproofer', 'framesplitter', 'book-styles']) {
	assert.match(pages.adobeScripts, new RegExp(`id="${id}"`), `Adobe Scripts: ${id} section is missing`);
}
assert.equal((pages.adobeScripts.match(/\bdata-full-src=/g) ?? []).length, 13, 'Adobe Scripts: expected 13 source screenshots');
assert.equal((pages.adobeScripts.match(/\bsrcset=/g) ?? []).length, 13, 'Adobe Scripts: every screenshot needs a responsive srcset');

assert.match(pages.sequence, /<h1[^>]*>Sequence<\/h1>/, 'Sequence: page title is missing');
assert.match(pages.sequence, /Сиквенсы хранятся локально в браузере/, 'Sequence: project description is incomplete');
assert.equal((pages.sequence.match(/\bdata-full-src=/g) ?? []).length, 3, 'Sequence: expected three source screenshots');
assert.equal((pages.sequence.match(/\bsrcset=/g) ?? []).length, 3, 'Sequence: every screenshot needs a responsive srcset');

assert.match(pages.shelfr, /name="viewport" content="width=device-width, initial-scale=1"/, 'Shelfr: responsive viewport is missing');

assert.match(pages.republica, /<h1\b[^>]*id="republica-title"[^>]*>Шрифт Republica<\/h1>/, 'Republica: page title is missing');
assert.equal((pages.republica.match(/class="letter-button"/g) ?? []).length, 26, 'Republica: expected all 26 PNG glyphs');
assert.equal((pages.republica.match(/<video\b/g) ?? []).length, 3, 'Republica: expected three source-to-glyph videos');
assert.match(pages.shelfr, /href="\/projects\/product-design\/shelfr\/mobile\.css"/, 'Shelfr: mobile stylesheet is missing');
assert.match(pages.shelfr, /src="\/projects\/product-design\/shelfr\/mobile\.js"/, 'Shelfr: mobile script is missing');
assert.match(shelfrMobile, /@media \(max-width: 1024px\)/, 'Shelfr: mobile breakpoint is missing');
assert.match(shelfrMobile, /@media \(min-width: 1025px\)/, 'Shelfr: desktop repair breakpoint is missing');
assert.match(shelfrMobile, /\.framer-h3sPI \.framer-1mfnjks\s*\{\s*height: 1743px !important;/, 'Shelfr: desktop table of contents still overlaps the next section');
assert.match(shelfrMobile, /\.framer-h3sPI \.framer-wtimuh,[\s\S]*?top: 600px !important;/, 'Shelfr: competitor cards still run into each other');
assert.match(shelfrMobile, /gap: 24px 40px !important;/, 'Shelfr: retrospective spacing is overridden by Framer');
assert.match(shelfrMobile, /\.framer-1icmfei > p,[\s\S]*?display: inline !important;/, 'Shelfr: retrospective copy still has forced line breaks');
const shelfrBubbleCopy = shelfrLocale.match(/const bubbleCopy = \[([\s\S]*?)\n\t\];/)?.[1] ?? '';
assert.equal((shelfrBubbleCopy.match(/\['\.framer-/g) ?? []).length, 6, 'Shelfr: expected six live survey bubbles');
assert.match(shelfrBubbleCopy, /A Netflix-style algorithm/, 'Shelfr: English survey bubble translations are missing');
assert.match(shelfrLocale, /bubble\.replaceChildren\(copy\)/, 'Shelfr: survey SVGs are not replaced with live text');
assert.match(shelfrLocale, /\.shelfr-live-bubble p\{margin:0;color:#fff!important/, 'Shelfr: live survey bubble text is not forced to white');
assert.match(shelfrMobileScript, /const liveText = item\.textContent\.trim\(\)/, 'Shelfr: mobile survey bubbles do not use live text');
assert.match(shelfrMobile, /\.shelfr-mobile-message p\s*\{/, 'Shelfr: mobile live survey bubbles are not styled');
assert.doesNotMatch(shelfrMobile, /content: "Алгоритм как у Нетфликс/, 'Shelfr: old CSS-only survey bubble is still present');
assert.match(shelfrMobile, /#main > \[data-framer-root\]/, 'Shelfr: fixed Framer canvas is not hidden on mobile');
assert.match(shelfrLocale, /\.portfolio-site-links'\)\?\.prepend\(createSwitcher\(\)\)/, 'Shelfr: desktop language switch is outside the site header');
assert.match(shelfrLocale, /\.portfolio-mobile-nav'\)\?\.prepend\(createSwitcher\(\)\)/, 'Shelfr: mobile language switch is outside the site header');
assert.match(shelfrLocale, /saveScrollPosition\(switcher\.href\)/, 'Shelfr: language switch does not preserve the scroll position');
assert.match(languageGateComponent, /saveScrollPosition\(link\.href\)/, 'Site language switch does not preserve the scroll position');
assert.match(shelfrLocale, /if \(link\.dataset\.locale\) return;/, 'Shelfr: language switch must not be rewritten as a regular internal link');
assert.doesNotMatch(shelfrLocale, /position:fixed;z-index:100001;top:1rem;left:50%/, 'Shelfr: old floating language switch is still present');
assert.match(shelfrLocale, /\.framer-1g108xz,.framer-1g108xz p\{[^}]*white-space:nowrap!important;[^}]*text-overflow:ellipsis/, 'Shelfr: Recommendations heading is not truncated');
assert.match(shelfrLocale, /\.framer-1tlw89e,.framer-19h28up\{left:622px!important;transform:none!important\}/, 'Shelfr: Recommendations values are not left-aligned');
assert.equal((shelfrMobileScript.match(/id: '[^']+'/g) ?? []).length, 14, 'Shelfr: expected 14 mobile sections');
assert.match(shelfrMobileScript, /shelfr-mobile-table/, 'Shelfr: prioritization table is missing');
assert.match(shelfrMobileScript, /tableHeaders: \['Приложение'/, 'Shelfr: competitor comparison is missing');
assert.match(shelfrMobileScript, /\.framer-1mobc36/, 'Shelfr: survey questions are missing');
assert.match(shelfrMobileScript, /buildAllQuoteCards/, 'Shelfr: full interview quotes are missing');
assert.match(shelfrMobileScript, /\.framer-ohkkmy/, 'Shelfr: testing scenarios are missing');
assert.equal((shelfrMobileScript.match(/shelfr-flow-\d{2}\.(?:webp|png)/g) ?? []).length, 14, 'Shelfr: expected all 15 User Flow slides including the existing first slide');
assert.match(shelfrMobileScript, /\.map\(\(\[ru, en, src\]\) => \[isRu \? ru : en, src\]\)/, 'Shelfr: User Flow titles are not localized at their source');
assert.match(shelfrMobileScript, /Достижения и статистика', 'Achievements and statistics'/, 'Shelfr: not all User Flow titles have English translations');
assert.match(shelfrMobileScript, /previous: 'Previous flow', next: 'Next flow', alt: 'User flow'/, 'Shelfr: User Flow controls are not localized');
assert.match(shelfrMobileScript, /buildSurveyVisuals/, 'Shelfr: survey messages and audience chart are missing');
assert.match(shelfrMobileScript, /setupDesktopFlowCarousel/, 'Shelfr: desktop User Flow controls are missing');
assert.match(shelfrMobileScript, /buildColorGallery/, 'Shelfr: color exploration gallery is missing');
assert.match(shelfrMobileScript, /buildIterationSliders/, 'Shelfr: iteration triplets are missing');
assert.match(shelfrMobileScript, /Скетч на бумаге.*Вайрфрейм.*Готовый экран/, 'Shelfr: iteration stages are incomplete');
assert.match(shelfrMobileScript, /buildKillerCopy/, 'Shelfr: Killer Feature copy is missing');
assert.doesNotMatch(shelfrMobileScript, /copy: \['\.framer-ed2mu'/, 'Shelfr: old Killer Feature copy is still used on mobile');
assert.match(shelfrMobileScript, /shelfr-mobile-gallery--masonry/, 'Shelfr: independent Wireframes columns are missing');
assert.match(pages.shelfr, /Протестировать оставшиеся сценарии/, 'Shelfr: User Testing recommendations are not translated');
assert.match(shelfrMobile, /shelfr-mobile-recommendations/, 'Shelfr: User Testing recommendations are not separated');
assert.match(shelfrMobile, /#mobile-ia h2/, 'Shelfr: long IA heading needs a narrow-screen size');

for (const [name, html] of Object.entries(pages).filter(([name]) => ['iofs', 'unesco', 'kipd', 'infographics', 'presentations'].includes(name))) {
	const gallery = html.match(/<section id="case-gallery"[\s\S]*?<\/section>/)?.[0] ?? '';
	const images = gallery.match(/<img\b[^>]*>/g) ?? [];
	assert.ok(images.length > 0, `${name}: gallery images are missing`);
	images.forEach((image) => {
		assert.match(image, /\bwidth="\d+"/, `${name}: gallery image width is missing`);
		assert.match(image, /\bheight="\d+"/, `${name}: gallery image height is missing`);
	});
}

console.log('Case modules: OK');
