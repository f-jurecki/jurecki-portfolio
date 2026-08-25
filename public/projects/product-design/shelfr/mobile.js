(() => {
	if (!matchMedia('(max-width: 1024px)').matches) return;

	const root = document.querySelector('[data-framer-root]');
	const main = document.querySelector('#main');
	if (!root || !main || document.querySelector('.shelfr-mobile-case')) return;

	const sectionData = [
		{
			id: 'competitor',
			title: 'Анализ конкурентов',
			copy: ['.framer-1qvig0t', '.framer-4c9kwj', '.framer-10zbl45'],
			gallery: true,
			galleryClass: 'shelfr-mobile-gallery--phones',
			captions: ['Storygraph', 'Turn', 'Bookshelf', 'Bookmory', 'Goodreads'],
		},
		{
			id: 'survey',
			title: 'UX Survey',
			copy: ['.framer-knywju', '.framer-197frqy', '.framer-1vn7qkh', '.framer-4e386o', '.framer-1w57i5x', '.framer-1kygq3w'],
			gallery: true,
		},
		{
			id: 'interview',
			title: 'User Interview',
			copy: ['.framer-magty6', '.framer-1an88ng', '.framer-1dwfo28', '.framer-5ksj25', '.framer-1jm3i', '.framer-1e3de96', '.framer-1wvzjgi', '.framer-1j6ys85'],
			quotes: ['.framer-1cgflk', '.framer-168hom6', '.framer-yaxl4', '.framer-49le4p', '.framer-14t43jt', '.framer-1agbbjf'],
		},
		{
			id: 'prioritization',
			title: 'Приоритизация',
			copy: ['.framer-17rpuh2'],
			table: [
				['Поиск', '13', '8', '16,25'],
				['Коллекции', '13', '8', '16,25'],
				['Книжный трекер', '20', '13', '15.38'],
				['Рекомендации', '20', '20', '10'],
				['Достижения', '8', '8', '10'],
				['Статистика', '8', '20', '4'],
			],
		},
		{
			id: 'cjm',
			title: 'Customer Journey Map',
			copy: ['.framer-czneqo', '.framer-3h6zjj', '.framer-16xbd2u', '.framer-1565t2t', '.framer-1myply3'],
			gallery: true,
		},
		{
			id: 'ia',
			title: 'Информационная архитектура',
			copy: ['.framer-auxkgb', '.framer-1a67tk5', '.framer-1pp37sc'],
		},
		{
			id: 'flows',
			title: 'User Flow',
			copy: ['.framer-i7jyd4'],
			gallery: true,
		},
		{
			id: 'wireframes',
			title: 'Wireframes',
			copy: ['.framer-1tx37zh', '.framer-epdr6v', '.framer-otf1ve'],
			gallery: true,
			galleryClass: 'shelfr-mobile-gallery--phones',
			captions: ['Главная страница', 'Запись чтения', 'Челленджи', 'Библиотека', 'Список прочитанного', 'Достижения', 'Уведомления', 'Написание отзыва', 'Хочу прочитать', 'Категоризация', 'Чужой список', 'Страница книги', 'Поиск'],
		},
		{
			id: 'test',
			title: 'User Testing',
			copy: ['.framer-1jgaojy', '.framer-1ok1hqw', '.framer-qkw911', '.framer-1k1wjlp', '.framer-spmwy3', '.framer-118e75u', '.framer-3hswfr'],
			gallery: true,
			galleryClass: 'shelfr-mobile-gallery--phones',
		},
		{
			id: 'iterations',
			title: 'Итерации',
			node: '.framer-6w3hbj',
			copy: ['.framer-1qkvzop', '.framer-3935ut', '.framer-2oo2m9', '.framer-kzbogl', '.framer-nk58gh', '.framer-1buj9vt', '.framer-1yat9k0', '.framer-il6gg'],
			gallery: true,
			galleryClass: 'shelfr-mobile-gallery--phones',
		},
		{
			id: 'final',
			title: 'Финальный вид',
			copy: ['.framer-6ybkqo', '.framer-1cab1g'],
			gallery: true,
			galleryClass: 'shelfr-mobile-gallery--phones',
			captions: ['Главная страница', 'Запись чтения', 'Челленджи', 'Поиск', 'Уведомления', 'Профиль', 'Сообщество', 'Настройки', 'Библиотека', 'Список прочитанного', 'Написать отзыв', 'Чужой список', 'Достижения', 'Страница книги', 'Старт челленджа'],
		},
		{
			id: 'killer',
			title: 'Killer Feature',
			copy: ['.framer-ed2mu', '.framer-j6ibeh', '.framer-1wgvns6', '.framer-1r3d4hn', '.framer-1ixfoml', '.framer-1abaucq', '.framer-ns8qf9'],
			gallery: true,
		},
		{
			id: 'design-system',
			title: 'Дизайн-система',
			copy: ['.framer-1oq9m2g'],
			gallery: true,
		},
		{
			id: 'mort',
			title: 'Post Mortem',
			copy: ['.framer-1rddoqj', '.framer-1icmfei', '.framer-mvroa8'],
			cards: [
				['I. Мало исследований', '.framer-1m7rqb8'],
				['II. Много контроля', '.framer-exl0i5'],
				['III. Компоненты и стили!!!', '.framer-1ja42qh'],
				['IV. High Fidelity', '.framer-1k62u1w'],
			],
			closing: '.framer-1i7pbrk',
		},
	];

	const page = element('main', 'shelfr-mobile-case');
	page.id = 'shelfr-mobile-top';
	const hero = element('header', 'shelfr-mobile-hero');
	hero.append(
		textElement('h1', 'shelfr-mobile-title', 'Shelfr'),
		textElement('p', 'shelfr-mobile-subtitle', 'Трекер книг моей мечты'),
	);
	appendCopies(hero, root, ['.framer-1k1k0so']);

	const meta = element('div', 'shelfr-mobile-meta');
	meta.append(
		metaItem('Время создания', root.querySelector('.framer-11tj4iv')?.textContent.trim()),
		metaItem('Роли', root.querySelector('.framer-1yqfw9b')?.textContent.replace(/\s+/g, ' ').trim()),
	);
	hero.append(meta);
	appendGallery(hero, root.querySelector('.framer-1mfnjks'), 'shelfr-mobile-gallery--compact');
	hero.append(buildToc(sectionData));
	page.append(hero);

	const sections = element('div', 'shelfr-mobile-sections');
	sectionData.forEach((data, index) => sections.append(buildSection(data, index)));
	page.append(sections);
	main.append(page);
	addLightbox(page);

	function buildSection(data, index) {
		const source = root.querySelector(data.node || `#${data.id}`);
		const section = element('section', 'shelfr-mobile-section');
		section.id = `mobile-${data.id}`;
		const heading = element('div', 'shelfr-mobile-section-heading');
		heading.append(
			textElement('span', 'shelfr-mobile-section-number', String(index + 1).padStart(2, '0')),
			textElement('h2', '', data.title),
		);
		section.append(heading);
		if (!source) return section;
		appendCopies(section, source, data.copy || []);
		if (data.table) section.append(buildTable(data.table));
		if (data.gallery) appendGallery(section, source, data.galleryClass || '', data.captions || []);
		if (data.quotes) section.append(buildCards(source, data.quotes));
		if (data.cards) section.append(buildNamedCards(source, data.cards));
		if (data.closing) appendCopies(section, source, [data.closing]);
		const back = textElement('a', 'shelfr-mobile-back-top', '↑ Наверх');
		back.href = '#shelfr-mobile-top';
		section.append(back);
		return section;
	}

	function buildToc(data) {
		const toc = element('nav', 'shelfr-mobile-toc');
		toc.setAttribute('aria-label', 'Оглавление Shelfr');
		toc.append(textElement('h2', '', 'Оглавление'));
		data.forEach((item, index) => {
			const link = element('a');
			link.href = `#mobile-${item.id}`;
			link.append(
				textElement('span', 'shelfr-mobile-toc-number', String(index + 1).padStart(2, '0')),
				textElement('span', '', item.title),
				textElement('span', 'shelfr-mobile-toc-arrow', '↓'),
			);
			toc.append(link);
		});
		return toc;
	}

	function appendCopies(target, source, selectors) {
		selectors.forEach((selector, index) => {
			const original = source.querySelector(selector);
			if (!original) return;
			const copy = element('div', `shelfr-mobile-copy${index === 0 ? ' shelfr-mobile-lead' : ''}`);
			copy.innerHTML = original.innerHTML;
			cleanCopy(copy);
			target.append(copy);
		});
	}

	function cleanCopy(copy) {
		copy.querySelectorAll('*').forEach((node) => {
			const keep = node.tagName === 'A' ? ['href', 'target', 'rel'] : [];
			[...node.attributes].forEach((attribute) => {
				if (!keep.includes(attribute.name)) node.removeAttribute(attribute.name);
			});
		});
	}

	function appendGallery(target, source, extraClass = '', captions = []) {
		if (!source) return;
		const images = [...source.querySelectorAll('img')];
		if (!images.length) return;
		const gallery = element('div', `shelfr-mobile-gallery ${extraClass}`.trim());
		images.forEach((image, index) => {
			const figure = element('figure', 'shelfr-mobile-figure');
			const clone = image.cloneNode(false);
			clone.removeAttribute('style');
			clone.loading = index < 2 ? 'eager' : 'lazy';
			clone.decoding = 'async';
			clone.sizes = extraClass.includes('phones') || extraClass.includes('compact') ? '(max-width: 1024px) 50vw, 0px' : '(max-width: 1024px) 100vw, 0px';
			figure.append(clone);
			if (captions[index]) figure.append(textElement('figcaption', '', captions[index]));
			gallery.append(figure);
		});
		target.append(gallery);
	}

	function buildCards(source, selectors) {
		const cards = element('div', 'shelfr-mobile-quotes');
		selectors.forEach((selector) => {
			if (!source.querySelector(selector)) return;
			const card = element('article', 'shelfr-mobile-card');
			appendCopies(card, source, [selector]);
			cards.append(card);
		});
		return cards;
	}

	function buildNamedCards(source, items) {
		const cards = element('div', 'shelfr-mobile-cards');
		items.forEach(([title, selector]) => {
			const card = element('article', 'shelfr-mobile-card');
			card.append(textElement('h3', '', title));
			appendCopies(card, source, [selector]);
			cards.append(card);
		});
		return cards;
	}

	function buildTable(rows) {
		const wrap = element('div', 'shelfr-mobile-table-wrap');
		const table = element('table', 'shelfr-mobile-table');
		const head = document.createElement('thead');
		const headRow = document.createElement('tr');
		['Feature', 'Value', 'Effort', 'Score'].forEach((value) => headRow.append(textElement('th', '', value)));
		head.append(headRow);
		const body = document.createElement('tbody');
		rows.forEach((row) => {
			const tr = document.createElement('tr');
			row.forEach((value) => tr.append(textElement('td', '', value)));
			body.append(tr);
		});
		table.append(head, body);
		wrap.append(table);
		return wrap;
	}

	function addLightbox(container) {
		const lightbox = element('div', 'shelfr-mobile-lightbox');
		lightbox.hidden = true;
		lightbox.tabIndex = -1;
		lightbox.setAttribute('role', 'dialog');
		lightbox.setAttribute('aria-label', 'Увеличенное изображение');
		document.body.append(lightbox);
		const close = () => {
			lightbox.hidden = true;
			lightbox.replaceChildren();
			document.body.style.overflow = '';
		};
		container.addEventListener('click', (event) => {
			const image = event.target.closest('.shelfr-mobile-figure img');
			if (!image) return;
			const enlarged = image.cloneNode(false);
			enlarged.removeAttribute('srcset');
			enlarged.removeAttribute('sizes');
			enlarged.src = image.currentSrc || image.src;
			lightbox.replaceChildren(enlarged);
			lightbox.hidden = false;
			document.body.style.overflow = 'hidden';
			lightbox.focus();
		});
		lightbox.addEventListener('click', close);
		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape' && !lightbox.hidden) close();
		});
	}

	function metaItem(label, value = '') {
		const item = element('div', 'shelfr-mobile-meta-item');
		item.append(textElement('span', 'shelfr-mobile-meta-label', label), textElement('span', '', value));
		return item;
	}

	function element(tag, className = '') {
		const node = document.createElement(tag);
		if (className) node.className = className;
		return node;
	}

	function textElement(tag, className, text) {
		const node = element(tag, className);
		node.textContent = text;
		return node;
	}
})();
