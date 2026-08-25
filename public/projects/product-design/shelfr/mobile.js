(() => {
	const translations = new Map([
		['User Testing', 'Пользовательское тестирование'],
		['Test the remaining flows', 'Протестировать оставшиеся сценарии'],
		['Develop branding and UI', 'Разработать айдентику и интерфейс'],
		['Полный User Testing в Notion', 'Полное пользовательское тестирование в Notion'],
		['В списке "Хочу прочитать"', 'в списке "Хочу прочитать"'],
	]);
	const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
	while (textNodes.nextNode()) {
		const value = textNodes.currentNode.nodeValue;
		const text = value.trim();
		if (translations.has(text)) textNodes.currentNode.nodeValue = value.replace(text, translations.get(text));
	}
	const matrixCopy = document.querySelector('#killer .framer-1r3d4hn p');
	if (matrixCopy) matrixCopy.innerHTML = 'Это слегка измененная <strong>матрица Эйзенхауэра</strong> для сортировки книг.';

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
			captions: [
				'Storygraph — прекрасное приложение: быстрый поиск, добавление книги в одно действие, интересные челленджи, статистика и точные рекомендации.',
				'Turn — больше восьми шагов, чтобы добавить книгу в список.',
				'Bookshelf — вкладка Explore одинаковая для всех, без персонализации.',
				'Bookmory — плохой контраст, непонятные поля для ввода и стены текста. Слишком много функций: приложение-швейцарский нож.',
				'Goodreads — устаревший UI. Домашняя страница показывает действия друзей и больше ничего.',
			],
			tableHeaders: ['Приложение', 'Аудитория', 'Рейтинг', 'Трекер чтения', 'Рекомендации', 'Статистика', 'Коллекции', 'Сообщество'],
			table: [
				['Storygraph', '700', '4.5', 'Хорошо', 'Хорошо', 'Хорошо', 'N/A', 'Хорошо'],
				['Goodreads', '14000', '4.3', 'Средне', 'Хорошо', 'Плохо', 'Средне', 'Хорошо'],
				['Bookmory', '700', '4.8', 'Плохо', 'N/A', 'Хорошо', 'Средне', 'N/A'],
				['Bookshelf', '700', '4.8', 'Средне', 'Плохо', 'N/A', 'Хорошо', 'Средне'],
				['Turn', '500', '—', 'Плохо', 'N/A', 'Средне', 'Плохо', 'N/A'],
			],
			tableClass: 'shelfr-mobile-table--wide',
			tableAfterGallery: true,
		},
		{
			id: 'survey',
			title: 'UX Survey',
			copy: ['.framer-knywju', '.framer-197frqy', '.framer-1vn7qkh', '.framer-50kav6', '.framer-1mobc36', '.framer-1w57i5x'],
			surveyVisuals: true,
			closing: '.framer-1kygq3w',
		},
		{
			id: 'interview',
			title: 'User Interview',
			copy: ['.framer-magty6', '.framer-1an88ng', '.framer-1dwfo28', '.framer-5ksj25', '.framer-1jm3i', '.framer-1e3de96', '.framer-1wvzjgi', '.framer-1j6ys85'],
			allQuotes: true,
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
			flowCarousel: true,
		},
		{
			id: 'wireframes',
			title: 'Wireframes',
			copy: ['.framer-1tx37zh', '.framer-epdr6v', '.framer-otf1ve'],
			gallery: true,
			galleryClass: 'shelfr-mobile-gallery--phones shelfr-mobile-gallery--masonry',
			captions: ['Главная страница', 'Запись чтения', 'Челленджи', 'Библиотека', 'Список прочитанного', 'Достижения', 'Уведомления', 'Написание отзыва', 'Хочу прочитать', 'Категоризация', 'Чужой список', 'Страница книги', 'Поиск'],
		},
		{
			id: 'test',
			title: 'Пользовательское тестирование',
			introCopy: ['.framer-1jgaojy', '.framer-qkw911'],
			scenarioCards: [
				['Регистрация и начальные действия', '.framer-ohkkmy'],
				['Начать челлендж и получить достижение', '.framer-vlz9fd'],
				['Добавить и редактировать чужой список', '.framer-1rvpy6t'],
				['Подписаться на друга', '.framer-8xibkx'],
				['Категоризировать книги в «Хочу прочитать»', '.framer-11zq9so'],
			],
			copy: ['.framer-1ok1hqw', '.framer-1k1wjlp', '.framer-spmwy3', '.framer-118e75u', '.framer-3hswfr'],
			gallery: true,
			galleryClass: 'shelfr-mobile-gallery--phones shelfr-mobile-gallery--single',
			captions: [
				'Элемент книги: убрал рейтинг, чтобы разгрузить интерфейс.',
				'Элемент списка был слишком похож на элемент книги, что мешало ориентироваться.',
				'Поп-ап, который появляется, когда пользователь пытается редактировать чужой список. Он был слишком перегружен — я переписал формулировки. Он всё ещё загруженный и сложный, но меньше.',
				'Начать челлендж: из поп-апа вынес на отдельную страницу, переработал иерархию. Эта стрелочка специально уродливая. Она мне нравится.',
				'Категоризация в «Хочу прочитать»: переписал формулировки, добавил подсказку о том, что это вообще такое, и кнопку отмены последнего действия.',
			],
		},
		{
			id: 'iterations',
			title: 'Итерации',
			node: '.framer-6w3hbj',
			copy: ['.framer-1qkvzop'],
			iterationSliders: [
				['Список прочитанного', []],
				['Страница книги', []],
				['Страница челленджа', []],
				['Статистика', ['.framer-3935ut', '.framer-2oo2m9']],
				['Поиск', []],
			],
			colorGallery: [
				['.framer-kzbogl', '/portfolio/shelfr/shelfr-54.webp'],
				['.framer-nk58gh', '/portfolio/shelfr/shelfr-53.webp'],
				['.framer-1buj9vt', '/portfolio/shelfr/shelfr-52.webp'],
				['.framer-1yat9k0', '/portfolio/shelfr/shelfr-51.webp'],
				['.framer-il6gg', '/portfolio/shelfr/shelfr-50.webp'],
			],
		},
		{
			id: 'final',
			title: 'Финальный вид',
			gallery: true,
			galleryClass: 'shelfr-mobile-gallery--phones shelfr-mobile-gallery--masonry',
			captions: ['Главная страница', 'Запись чтения', 'Челленджи', 'Поиск', 'Уведомления', 'Профиль', 'Сообщество', 'Настройки', 'Библиотека', 'Список прочитанного', 'Написать отзыв', 'Чужой список', 'Достижения', 'Страница книги', 'Старт челленджа'],
		},
		{
			id: 'killer',
			title: 'Killer Feature',
			killerCopy: true,
			gallery: true,
		},
		{
			id: 'design-system',
			title: 'Дизайн-система',
			copy: ['.framer-6x2v5t'],
			gallery: true,
			captions: ['Основные цвета', 'Дополнительные цвета', 'UI Kit'],
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
	meta.append(metaItem('Время создания', root.querySelector('.framer-11tj4iv')), metaItem('Роли', root.querySelector('.framer-1yqfw9b')));
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
		appendCopies(section, source, data.introCopy || data.copy || []);
		if (data.scenarioCards) section.append(buildScenarioCards(source, data.scenarioCards));
		if (data.introCopy) appendCopies(section, source, data.copy || []);
		if (data.table && !data.tableAfterGallery) section.append(buildTable(data.table, data.tableHeaders, data.tableClass));
		if (data.surveyVisuals) section.append(buildSurveyVisuals(source));
		if (data.flowCarousel) section.append(buildFlowCarousel());
		if (data.iterationSliders) section.append(buildIterationSliders(source, data.iterationSliders));
		if (data.killerCopy) section.append(buildKillerCopy());
		if (data.gallery) appendGallery(section, source, data.galleryClass || '', data.captions || [], data.galleryCount);
		if (data.colorGallery) section.append(buildColorGallery(source, data.colorGallery));
		if (data.table && data.tableAfterGallery) section.append(buildTable(data.table, data.tableHeaders, data.tableClass));
		if (data.quotes) section.append(buildCards(source, data.quotes));
		if (data.allQuotes) section.append(buildAllQuoteCards(source));
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
			if (selector === '.framer-spmwy3') copy.classList.add('shelfr-mobile-recommendations');
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
		copy.querySelectorAll('p').forEach((paragraph) => {
			if (!paragraph.textContent.trim()) paragraph.remove();
		});
	}

	function appendGallery(target, source, extraClass = '', captions = [], count = Infinity) {
		if (!source) return;
		const images = [...source.querySelectorAll('img')].slice(0, count);
		if (!images.length) return;
		const gallery = element('div', `shelfr-mobile-gallery ${extraClass}`.trim());
		const columns = extraClass.includes('shelfr-mobile-gallery--masonry')
			? [element('div', 'shelfr-mobile-gallery-column'), element('div', 'shelfr-mobile-gallery-column')]
			: [];
		if (columns.length) gallery.append(...columns);
		images.forEach((image, index) => {
			const figure = element('figure', 'shelfr-mobile-figure');
			const clone = image.cloneNode(false);
			clone.removeAttribute('style');
			clone.loading = index < 2 ? 'eager' : 'lazy';
			clone.decoding = 'async';
			clone.sizes = extraClass.includes('phones') || extraClass.includes('compact') ? '(max-width: 1024px) 50vw, 0px' : '(max-width: 1024px) 100vw, 0px';
			figure.append(clone);
			if (captions[index]) figure.append(textElement('figcaption', '', captions[index]));
			(columns[index % 2] || gallery).append(figure);
		});
		target.append(gallery);
	}

	function buildFlowCarousel() {
		const slides = [
			['Sign-up', '/portfolio/shelfr/shelfr-13.webp'],
			['Add a book to "Reading now"', '/portfolio/shelfr/shelfr-flow-02.webp'],
			['Record a streak', '/portfolio/shelfr/shelfr-flow-03.png'],
			['Start a challenge', '/portfolio/shelfr/shelfr-flow-04.png'],
			['Add a book to any list', '/portfolio/shelfr/shelfr-flow-05.png'],
			['Categorize books in "Want to read"', '/portfolio/shelfr/shelfr-flow-06.png'],
			['Add a book to "Finished" or “Abandoned” list', '/portfolio/shelfr/shelfr-flow-07.png'],
			['Write a review', '/portfolio/shelfr/shelfr-flow-08.png'],
			['Create a list', '/portfolio/shelfr/shelfr-flow-09.png'],
			['Find what to read', '/portfolio/shelfr/shelfr-flow-10.png'],
			['Read reviews', '/portfolio/shelfr/shelfr-flow-11.png'],
			['Use search', '/portfolio/shelfr/shelfr-flow-12.png'],
			['Actions with others profiles', '/portfolio/shelfr/shelfr-flow-13.png'],
			['Filling, editing the profile, privacy settings', '/portfolio/shelfr/shelfr-flow-14.png'],
			['Achievements, stats', '/portfolio/shelfr/shelfr-flow-15.png'],
		];
		const carousel = element('div', 'shelfr-mobile-flow-carousel');
		carousel.tabIndex = 0;
		carousel.setAttribute('aria-label', 'Схемы User Flow');
		const title = textElement('h3', '', '');
		const counter = textElement('span', 'shelfr-mobile-flow-counter', '');
		const figure = element('figure', 'shelfr-mobile-figure');
		const image = document.createElement('img');
		image.decoding = 'async';
		figure.append(image);
		const previous = textElement('button', '', '←');
		const next = textElement('button', '', '→');
		previous.type = next.type = 'button';
		previous.setAttribute('aria-label', 'Предыдущая схема');
		next.setAttribute('aria-label', 'Следующая схема');
		const controls = element('div', 'shelfr-mobile-flow-controls');
		controls.append(previous, next);
		const head = element('div', 'shelfr-mobile-flow-head');
		head.append(title, counter);
		carousel.append(head, controls, figure);
		let active = 0;
		const show = (index) => {
			active = (index + slides.length) % slides.length;
			const [label, src] = slides[active];
			title.textContent = label;
			counter.textContent = `${active + 1}/${slides.length}`;
			image.src = src;
			image.alt = `User Flow: ${label}`;
		};
		previous.addEventListener('click', () => show(active - 1));
		next.addEventListener('click', () => show(active + 1));
		carousel.addEventListener('keydown', (event) => {
			if (event.key === 'ArrowLeft') show(active - 1);
			if (event.key === 'ArrowRight') show(active + 1);
		});
		show(0);
		return carousel;
	}

	function buildIterationSliders(source, groups) {
		const images = [...source.querySelectorAll('img')].slice(0, groups.length * 3);
		const stages = ['Скетч на бумаге', 'Вайрфрейм', 'Готовый экран'];
		const sliders = element('div', 'shelfr-mobile-iteration-sliders');
		groups.forEach(([title, notes], groupIndex) => {
			const item = element('article', 'shelfr-mobile-iteration');
			item.append(textElement('h3', '', title));
			appendCopies(item, source, notes);
			const track = element('div', 'shelfr-mobile-iteration-track');
			track.setAttribute('aria-label', `${title}: этапы дизайна`);
			images.slice(groupIndex * 3, groupIndex * 3 + 3).forEach((image, stageIndex) => {
				const figure = element('figure', 'shelfr-mobile-figure');
				const clone = image.cloneNode(false);
				clone.removeAttribute('style');
				clone.loading = groupIndex === 0 ? 'eager' : 'lazy';
				clone.decoding = 'async';
				clone.sizes = '(max-width: 1024px) 88vw, 0px';
				figure.append(clone, textElement('figcaption', '', stages[stageIndex]));
				track.append(figure);
			});
			item.append(track);
			sliders.append(item);
		});
		return sliders;
	}

	function buildKillerCopy() {
		const copy = element('div', 'shelfr-mobile-killer-copy');
		copy.append(
			textElement('h3', '', 'Категоризация книг в списке "Хочу прочитать"'),
		);
		const matrix = document.createElement('p');
		matrix.append('Это слегка измененная ', textElement('strong', '', 'матрица Эйзенхауэра'), ' для сортировки книг.');
		copy.append(
			matrix,
			textElement('p', '', 'Разделите книги на 4 категории, чтобы легче решить, что читать дальше.'),
			textElement('p', '', 'Уведомления напомнят о важных книгах или о пересортировке.'),
		);
		return copy;
	}

	function buildSurveyVisuals(source) {
		const visuals = element('div', 'shelfr-mobile-survey-visuals');
		const issues = element('section', 'shelfr-mobile-survey-block');
		issues.append(textElement('h3', '', 'Основные проблемы существующих приложений'));
		appendCopies(issues, source, ['.framer-4e386o']);

		const audience = element('section', 'shelfr-mobile-survey-block');
		audience.append(
			textElement('h3', '', 'Потенциальная аудитория'),
			textElement('p', 'shelfr-mobile-survey-question', 'Почему вы не используете трекеры?'),
		);
		const chart = element('div', 'shelfr-mobile-audience-chart');
		const pie = element('div', 'shelfr-mobile-audience-pie');
		pie.setAttribute('role', 'img');
		pie.setAttribute('aria-label', '29,2 процента неинтересно отслеживать прочитанное; 70,8 процента ещё не нашли подходящий трекер');
		const legend = element('div', 'shelfr-mobile-audience-legend');
		legend.append(
			textElement('p', '', '29.2% — Мне неинтересно отслеживать прочитанное'),
			textElement('p', '', '70.8% — Я ещё не нашел подходящий трекер'),
		);
		chart.append(pie, legend);
		audience.append(chart);

		const features = element('section', 'shelfr-mobile-survey-block');
		features.append(
			textElement('h3', '', 'Потенциальные функции'),
			textElement('p', 'shelfr-mobile-survey-question', 'Есть ли какая-то функция книжного трекера, которая вам нужна, но вы нигде её не нашли?'),
		);
		const messages = element('div', 'shelfr-mobile-messages');
		const group = source.querySelector('[data-framer-name="Group 75"]');
		[...(group?.children || [])].forEach((item) => {
			const message = element('figure', 'shelfr-mobile-message');
			const image = item.querySelector('img');
			if (image) {
				const clone = image.cloneNode(false);
				clone.removeAttribute('style');
				clone.loading = 'lazy';
				message.append(clone);
			} else {
				const svg = item.querySelector('svg')?.cloneNode(true);
				if (svg) {
					svg.removeAttribute('style');
					svg.removeAttribute('width');
					svg.removeAttribute('height');
					message.append(svg);
				}
			}
			if (message.children.length) messages.append(message);
		});
		features.append(messages);
		visuals.append(issues, audience, features);
		return visuals;
	}

	function buildColorGallery(source, items) {
		const section = element('div', 'shelfr-mobile-color-section');
		section.append(textElement('h3', '', 'Поиск цветов'));
		const gallery = element('div', 'shelfr-mobile-color-gallery');
		items.forEach(([selector, src]) => {
			const original = source.querySelector(selector);
			if (!original) return;
			const paragraphs = [...original.querySelectorAll('p')];
			const card = element('article', 'shelfr-mobile-color-card');
			card.append(textElement('h4', '', paragraphs[0]?.textContent.trim() || ''));
			const figure = element('figure', 'shelfr-mobile-figure');
			const image = document.createElement('img');
			image.src = src;
			image.alt = paragraphs[0]?.textContent.trim() || 'Вариант цветового решения';
			image.loading = 'lazy';
			image.decoding = 'async';
			figure.append(image);
			card.append(figure);
			const description = paragraphs.slice(1).map((paragraph) => paragraph.textContent.trim()).filter(Boolean).join(' ');
			if (description) card.append(textElement('p', '', description));
			gallery.append(card);
		});
		section.append(gallery);
		return section;
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

	function buildAllQuoteCards(source) {
		const cards = element('div', 'shelfr-mobile-quotes');
		const seen = new Set();
		[...source.querySelectorAll('[data-framer-component-type="RichTextContainer"]')].forEach((original) => {
			const quote = original.textContent.replace(/\s+/g, ' ').trim();
			if (!/^["“]/.test(quote) || quote.length < 20 || seen.has(quote)) return;
			seen.add(quote);
			const card = element('article', 'shelfr-mobile-card');
			const copy = element('div', 'shelfr-mobile-copy');
			copy.innerHTML = original.innerHTML;
			cleanCopy(copy);
			card.append(copy);
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

	function buildScenarioCards(source, items) {
		const cards = buildNamedCards(source, items);
		cards.querySelectorAll('.shelfr-mobile-card').forEach((card) => {
			card.classList.add('shelfr-mobile-card--scenario');
			const title = card.querySelector('h3').textContent.replace(/\s+/g, '').toLowerCase();
			const paragraphs = [...card.querySelectorAll('.shelfr-mobile-copy p')];
			let prefix = '';
			for (const paragraph of paragraphs) {
				if (prefix.length >= title.length || !title.startsWith(prefix)) break;
				prefix += paragraph.textContent.replace(/\s+/g, '').toLowerCase();
				if (!title.startsWith(prefix)) break;
				paragraph.remove();
				if (prefix === title) break;
			}
			card.querySelectorAll('br').forEach((lineBreak) => lineBreak.remove());
		});
		return cards;
	}

	function buildTable(rows, headers = ['Feature', 'Value', 'Effort', 'Score'], className = '') {
		const wrap = element('div', 'shelfr-mobile-table-wrap');
		const table = element('table', `shelfr-mobile-table ${className}`.trim());
		const head = document.createElement('thead');
		const headRow = document.createElement('tr');
		headers.forEach((value) => headRow.append(textElement('th', '', value)));
		head.append(headRow);
		const body = document.createElement('tbody');
		rows.forEach((row) => {
			const tr = document.createElement('tr');
			row.forEach((value, index) => {
				const cell = textElement('td', '', value);
				cell.dataset.label = headers[index];
				tr.append(cell);
			});
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

	function metaItem(label, source) {
		const item = element('div', 'shelfr-mobile-meta-item');
		const value = element('span');
		if (source) {
			value.innerHTML = source.innerHTML;
			cleanCopy(value);
		}
		item.append(textElement('span', 'shelfr-mobile-meta-label', label), value);
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
