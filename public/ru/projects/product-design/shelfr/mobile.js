(() => {
	const flowSlides = [
		['Регистрация', '/portfolio/shelfr/shelfr-13.webp'],
		['Добавить книгу в «Читаю сейчас»', '/portfolio/shelfr/shelfr-flow-02.webp'],
		['Записать чтение и продолжить стрик', '/portfolio/shelfr/shelfr-flow-03.png'],
		['Начать челлендж', '/portfolio/shelfr/shelfr-flow-04.png'],
		['Добавить книгу в список', '/portfolio/shelfr/shelfr-flow-05.png'],
		['Категоризировать книги в «Хочу прочитать»', '/portfolio/shelfr/shelfr-flow-06.png'],
		['Перенести книгу в «Прочитано» или «Брошено»', '/portfolio/shelfr/shelfr-flow-07.png'],
		['Написать отзыв', '/portfolio/shelfr/shelfr-flow-08.png'],
		['Создать список', '/portfolio/shelfr/shelfr-flow-09.png'],
		['Выбрать следующую книгу', '/portfolio/shelfr/shelfr-flow-10.png'],
		['Читать отзывы', '/portfolio/shelfr/shelfr-flow-11.png'],
		['Использовать поиск', '/portfolio/shelfr/shelfr-flow-12.png'],
		['Действия с профилями других пользователей', '/portfolio/shelfr/shelfr-flow-13.png'],
		['Редактирование профиля и настройки приватности', '/portfolio/shelfr/shelfr-flow-14.png'],
		['Достижения и статистика', '/portfolio/shelfr/shelfr-flow-15.png'],
	];
	const main = document.querySelector('#main');
	if (!main || document.querySelector('.portfolio-project-navigation')) return;
	if (!matchMedia('(max-width: 1024px)').matches) {
		setupDesktopFlowCarousel();
		main.append(buildProjectNavigation());
		return;
	}

	const root = document.querySelector('[data-framer-root]');
	if (!root || document.querySelector('.shelfr-mobile-case')) return;

	const sectionData = [
		{
			id: 'competitor',
			title: 'Анализ конкурентов',
			copy: ['.framer-1qvig0t', '.framer-4c9kwj', '.framer-10zbl45'],
			gallery: true,
			galleryClass: 'shelfr-mobile-gallery--phones',
			captions: [
				'Storygraph — наиболее сильный продукт в выборке: быстрый поиск, добавление книги в одно действие, продуманные челленджи, статистика и точные рекомендации.',
				'Turn — более восьми действий, чтобы добавить книгу в список.',
				'Bookshelf — раздел Explore не персонализируется и выглядит одинаково для всех пользователей.',
				'Bookmory — низкий контраст, неочевидные поля ввода и перегруженные текстом экраны. Избыточный набор функций усложняет навигацию.',
				'Goodreads — устаревший интерфейс. Домашняя страница почти полностью посвящена активности друзей.',
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
			title: 'UX-опрос',
			copy: ['.framer-knywju', '.framer-197frqy', '.framer-1vn7qkh', '.framer-50kav6', '.framer-1mobc36', '.framer-1w57i5x'],
			surveyVisuals: true,
			closing: '.framer-1kygq3w',
		},
		{
			id: 'interview',
			title: 'Интервью с пользователями',
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
				['Книжный трекер', '20', '13', '15,38'],
				['Рекомендации', '20', '20', '10'],
				['Достижения', '8', '8', '10'],
				['Статистика', '8', '20', '4'],
			],
		},
		{
			id: 'cjm',
			title: 'Карта пути пользователя',
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
			title: 'Пользовательские сценарии',
			copy: ['.framer-i7jyd4'],
			flowCarousel: true,
		},
		{
			id: 'wireframes',
			title: 'Вайрфреймы',
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
				'В карточке книги убрал рейтинг, чтобы снизить визуальную нагрузку.',
				'Карточка списка была слишком похожа на карточку книги, что затрудняло навигацию.',
				'Модальное окно редактирования чужого списка было перегружено. Я упростил формулировки и иерархию.',
				'Запуск челленджа перенёс из модального окна на отдельную страницу и переработал иерархию. Стрелка намеренно сохраняет рукописный характер.',
				'В категоризации списка «Хочу прочитать» упростил формулировки, добавил пояснение принципа работы и отмену последнего действия.',
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
			title: 'Ключевая функция',
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
			title: 'Ретроспектива',
			copy: ['.framer-1rddoqj', '.framer-1icmfei', '.framer-mvroa8'],
			cards: [
				['Недостаточная глубина исследований', '.framer-1m7rqb8'],
				['Избыточное сопровождение', '.framer-exl0i5'],
				['Поздняя систематизация компонентов', '.framer-1ja42qh'],
				['Ранний переход к high-fidelity', '.framer-1k62u1w'],
			],
			closing: '.framer-1i7pbrk',
		},
	];

	const page = element('main', 'shelfr-mobile-case');
	page.id = 'shelfr-mobile-top';
	const hero = element('header', 'shelfr-mobile-hero');
	hero.append(
		textElement('h1', 'shelfr-mobile-title', 'Shelfr'),
		textElement('p', 'shelfr-mobile-subtitle', 'Концепция книжного трекера'),
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
	main.append(page, buildProjectNavigation());
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
		const carousel = element('div', 'shelfr-mobile-flow-carousel');
		carousel.tabIndex = 0;
		carousel.setAttribute('aria-label', 'Схемы пользовательских сценариев');
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
			active = (index + flowSlides.length) % flowSlides.length;
			const [label, src] = flowSlides[active];
			title.textContent = label;
			counter.textContent = `${active + 1}/${flowSlides.length}`;
			image.src = src;
			image.alt = `Пользовательский сценарий: ${label}`;
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

	function setupDesktopFlowCarousel() {
		const previous = document.querySelector('.framer-1naxqjp');
		const next = document.querySelector('.framer-1bhmvmb');
		const image = document.querySelector('.framer-1dmv734 img');
		const labels = document.querySelectorAll('.framer-rzkesz p');
		if (!previous || !next || !image || labels.length < 2) return;

		let active = 0;
		const show = (index) => {
			active = (index + flowSlides.length) % flowSlides.length;
			const [label, src] = flowSlides[active];
			labels[0].textContent = label;
			labels[1].textContent = `${active + 1}/${flowSlides.length}`;
			image.removeAttribute('srcset');
			image.removeAttribute('sizes');
			image.src = src;
			image.alt = `Пользовательский сценарий: ${label}`;
		};
		const bind = (control, step, label) => {
			control.setAttribute('role', 'button');
			control.setAttribute('aria-label', label);
			control.style.cursor = 'pointer';
			control.addEventListener('click', () => show(active + step));
			control.addEventListener('keydown', (event) => {
				if (event.key === 'Enter' || event.key === ' ') show(active + step);
			});
		};
		bind(previous, -1, 'Предыдущая схема');
		bind(next, 1, 'Следующая схема');
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
			textElement('h3', '', 'Категоризация книг в списке «Хочу прочитать»'),
		);
		const matrix = document.createElement('p');
		matrix.append('Это слегка изменённая ', textElement('strong', '', 'матрица Эйзенхауэра'), ' для сортировки книг.');
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
			textElement('p', '', '29,2% — Мне неинтересно отслеживать прочитанное'),
			textElement('p', '', '70,8% — Я ещё не нашёл подходящий трекер'),
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

	function buildTable(rows, headers = ['Функция', 'Ценность', 'Трудозатраты', 'Оценка'], className = '') {
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

	function buildProjectNavigation() {
		const wrapper = element('div', 'portfolio-project-navigation');
		wrapper.innerHTML = `
			<nav aria-label="Другие проекты">
				<a href="/projects/branding/"><span>← Предыдущий проект</span><strong>Упаковка и брендинг материалы</strong></a>
				<a href="/projects/personal/cards/"><span>Следующий проект →</span><strong>Колода карт Misprint</strong></a>
			</nav>
			<a class="portfolio-project-home" href="/"><strong>Вернуться на главную →</strong></a>
		`;
		const style = document.createElement('style');
		style.textContent = `
			.portfolio-project-navigation{box-sizing:border-box;width:min(calc(100% - 2rem),88rem);margin:clamp(4rem,7vw,7rem) auto 0;padding-bottom:clamp(3rem,6vw,6rem);color:#f5f5f5;font-family:Inter,Arial,sans-serif}
			.portfolio-project-navigation nav{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border-top:1px solid #2b2b2b;border-bottom:1px solid #2b2b2b}
			.portfolio-project-navigation nav a{box-sizing:border-box;min-width:0;min-height:clamp(7rem,11vw,10rem);padding:clamp(1.25rem,2.5vw,2.5rem);display:flex;flex-direction:column;justify-content:space-between;gap:1rem;color:inherit;text-decoration:none;transition:color .2s ease,background .2s ease}
			.portfolio-project-navigation nav a+a{align-items:flex-end;border-left:1px solid #2b2b2b;text-align:right}
			.portfolio-project-navigation nav span{color:#8d8d8d;font-size:.7rem;font-weight:800;line-height:1.2;letter-spacing:.08em;text-transform:uppercase}
			.portfolio-project-navigation nav strong{overflow-wrap:anywhere;font-size:clamp(1.8rem,3.3vw,3.5rem);line-height:.9;letter-spacing:-.055em}
			.portfolio-project-navigation nav a:hover{color:#050505;background:#f5f5f5}
			.portfolio-project-navigation nav a:hover span{color:#555}
			.portfolio-project-navigation a:focus-visible{outline:2px solid #fff;outline-offset:4px}
			.portfolio-project-home{min-height:clamp(8rem,12vw,12rem);padding-top:clamp(2rem,4vw,4rem);display:flex;align-items:center;justify-content:flex-end;color:inherit;text-decoration:none}
			.portfolio-project-home strong{font-size:clamp(1.8rem,3.3vw,3.5rem);line-height:.95;letter-spacing:-.05em}
			@media(max-width:620px){.portfolio-project-navigation{margin-top:4rem}.portfolio-project-navigation nav{grid-template-columns:minmax(0,1fr)}.portfolio-project-navigation nav a{min-height:7rem;padding:1.25rem}.portfolio-project-navigation nav a+a{border-top:1px solid #2b2b2b;border-left:0}.portfolio-project-navigation nav strong,.portfolio-project-home strong{font-size:2rem}}
			@media(prefers-reduced-motion:reduce){.portfolio-project-navigation nav a{transition-duration:.01ms}}
		`;
		document.head.append(style);
		return wrapper;
	}
})();
