(() => {
	const isRu = location.pathname === '/ru' || location.pathname.startsWith('/ru/');
	const choiceKey = 'fedor-jurecki-language';
	const scrollKey = 'fedor-jurecki-language-scroll';
	const cleanPath = location.pathname.replace(/^\/ru(?=\/|$)/, '') || '/';
	const pathFor = (locale) => locale === 'ru' ? `/ru${cleanPath === '/' ? '/' : cleanPath}` : cleanPath;
	const alternateLocale = isRu ? 'en' : 'ru';
	const saveScrollPosition = (href) => {
		const maxScroll = document.documentElement.scrollHeight - innerHeight;
		if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
		try { sessionStorage.setItem(scrollKey, JSON.stringify({ path: new URL(href, location.href).pathname, progress: maxScroll > 0 ? scrollY / maxScroll : 0 })); } catch {}
	};
	const restoreScrollPosition = () => {
		let saved = null;
		try { saved = JSON.parse(sessionStorage.getItem(scrollKey) || 'null'); } catch {}
		if (saved?.path !== location.pathname || !Number.isFinite(saved.progress)) {
			try { sessionStorage.removeItem(scrollKey); } catch {}
			return;
		}
		const apply = () => {
			const previousBehavior = document.documentElement.style.scrollBehavior;
			document.documentElement.style.scrollBehavior = 'auto';
			scrollTo(0, saved.progress * Math.max(0, document.documentElement.scrollHeight - innerHeight));
			document.documentElement.style.scrollBehavior = previousBehavior;
		};
		apply();
		setTimeout(apply, 250);
		setTimeout(() => {
			apply();
			try { sessionStorage.removeItem(scrollKey); } catch {}
			if ('scrollRestoration' in history) history.scrollRestoration = 'auto';
		}, 1000);
	};
	addEventListener('load', restoreScrollPosition, { once: true });
	addEventListener('load', () => {
		if (innerWidth <= 1024) return;
		const root = document.querySelector('[data-framer-root]');
		const content = root?.querySelector('.framer-rfg7ud');
		if (root && content) root.style.height = `${content.offsetTop + content.offsetHeight}px`;
	}, { once: true });

	if (!isRu) {
		document.documentElement.lang = 'en';
		document.title = 'Shelfr — Product Design — Fedor Jurecki';
		const description = 'Shelfr is a book-tracking product concept with challenges, achievements, community features, and a system for prioritizing books.';
		document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]').forEach((meta) => meta.setAttribute('content', description));
		document.querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]').forEach((meta) => meta.setAttribute('content', document.title));

		const text = new Map(Object.entries({
			'Федор Юрецкий': 'Fedor Jurecki',
			'Почта': 'Email',
			'Контакты': 'Contacts',
			'Ни один из книжных трекеров, которыми я пользовался, не отвечал моим требованиям.': 'None of the book trackers I had used met my needs.',
			'Поэтому я спроектировал собственный продукт.': 'So I designed my own product.',
			'— книжный трекер с челленджами, достижениями, сообществом и системой категоризации': 'is a book tracker with challenges, achievements, community features, and a system for categorizing and prioritizing books',
			'Приложение не предназначено для чтения книг.': 'The app is not intended for reading books.',
			'Время создания': 'Project duration',
			'Март 2024 — ноябрь 2024': 'March 2024 — November 2024',
			'Роли': 'Roles',
			'Я': 'Me',
			'— продуктовый дизайнер и UX-исследователь; самостоятельно вёл проект от исследований до финального интерфейса': '— Product Designer and UX Researcher; independently led the project from research through final UI',
			'— ментор': '— Mentor',
			'Оглавление': 'Contents',
			'I. Исследование': 'I. Research',
			'II. Проектирование': 'II. Design',
			'Анализ конкурентов': 'Competitive analysis',
			'UX-опрос': 'UX survey',
			'Интервью с пользователями': 'User interviews',
			'Приоритизация': 'Prioritization',
			'Карта пути пользователя': 'Customer journey map',
			'Информационная архитектура': 'Information architecture',
			'Пользовательские сценарии': 'User flows',
			'Вайрфреймы': 'Wireframes',
			'Пользовательское тестирование': 'Usability testing',
			'Итерации': 'Iterations',
			'Финальный вид': 'Final design',
			'Ключевая функция': 'Key feature',
			'Дизайн-система': 'Design system',
			'Ретроспектива': 'Retrospective',
			'Концепция книжного трекера': 'Book tracker concept',
			'Рынок книжных трекеров насыщен, но качество ключевых сценариев заметно различается.': 'The book-tracking market is crowded, but the quality of core user flows varies significantly.',
			'По результатам анализа': 'The analysis showed that',
			'выделяется на фоне конкурентов и служит основным бенчмарком проекта.': 'stood out from the competition and became the main benchmark for the project.',
			'Ещё два продукта закрывают основные сценарии, но имеют заметные ограничения.': 'Two other products cover the main use cases but have noticeable limitations.',
			'Повторяющиеся проблемы в большинстве приложений:': 'Recurring issues across most apps:',
			'Перегруженный интерфейс': 'Overloaded interfaces',
			'Ограниченный функционал': 'Limited functionality',
			'Устаревший интерфейс': 'Outdated interfaces',
			'Неочевидные пользовательские сценарии': 'Unclear user flows',
			'Проблемы с производительностью': 'Performance issues',
			'Базовые функции категории, включённые в концепцию Shelfr:': 'Core category features included in the Shelfr concept:',
			'Трекер чтения': 'Reading tracker',
			'Статистика': 'Statistics',
			'Коллекции / списки': 'Collections / lists',
			'Достижения': 'Achievements',
			'Рекомендации': 'Recommendations',
			'Наиболее сильный продукт в выборке': 'Strongest product in the sample',
			'Быстрый поиск, добавление книги в одно действие, продуманные челленджи, статистика и точные рекомендации.': 'Fast search, one-action book addition, well-designed challenges, useful statistics, and accurate recommendations.',
			'Более восьми действий, чтобы добавить книгу в список': 'More than eight actions are required to add a book to a list',
			'Раздел Explore не персонализируется и выглядит одинаково для всех пользователей': 'The Explore section is not personalized and looks the same for every user',
			'Низкий контраст, неочевидные поля ввода и перегруженные текстом экраны. Избыточный набор функций усложняет навигацию.': 'Low contrast, unclear input fields, and text-heavy screens. An excessive feature set makes navigation more difficult.',
			'Устаревший интерфейс. Домашняя страница почти полностью посвящена активности друзей.': 'Outdated interface. The home screen is almost entirely focused on friends’ activity.',
			'Аудитория': 'Audience', 'Рейтинг': 'Rating', 'Рекоменд…': 'Recommendations', 'Коллекции': 'Collections', 'Сообщество': 'Community',
			'Хорошо': 'Good', 'Средне': 'Average', 'Плохо': 'Poor',
			'Подробный анализ конкурентов в Notion': 'Detailed competitive analysis in Notion',
			'Аудитория и рейтинг': 'Audience and rating',
			'Функции': 'Features',
			'Среди англоязычной аудитории лидирует Goodreads, тогда как русскоязычная аудитория чаще использует собственные системы учёта; второе место занимает LiveLib.': 'Goodreads was the leading tracker among English-speaking respondents, while Russian-speaking respondents more often used their own tracking systems; LiveLib ranked second.',
			'В опросе приняли участие около': 'Around',
			'350 человек,': '350 people',
			'считающих себя регулярными читателями.': 'who considered themselves regular readers took part in the survey.',
			'Обе аудитории выделили схожий набор приоритетов:': 'Shared priorities across both audiences:',
			'Отслеживание прочитанных книг': 'Tracking books they have read',
			'Сортировка по спискам': 'Sorting books into lists',
			'Заметки и цитаты': 'Notes and quotes',
			'Персональные рекомендации': 'Personalized recommendations',
			'Статистика чтения': 'Reading statistics',
			'Календарь чтения': 'Reading calendar',
			'Челленджи и достижения': 'Challenges and achievements',
			'Плохой дизайн': 'Poor design',
			'Недостаточно книг': 'Too few books in the database',
			'Недостаточно или слишком много функций': 'Too few or too many features',
			'Используемые функции': 'Features used',
			'Основные проблемы существующих приложений': 'Main problems with existing apps',
			'Потенциальная аудитория': 'Potential audience',
			'Потенциальные функции': 'Potential features',
			'Почему вы не используете трекеры?': 'Why do you not use book trackers?',
			'Читаете ли вы книги (в любом формате)?': 'Do you read books in any format?',
			'Используете ли вы какие-либо сервисы для отслеживания прочитанных книг, времени чтения или количества прочитанных страниц?': 'Do you use any services to track books you have read, reading time, or pages read?',
			'Уточните, пожалуйста, какие трекеры вы используете.': 'Which trackers do you use?',
			'Какие функции в таких сервисах для вас наиболее важны?': 'Which features are most important to you in services like these?',
			'Есть ли функция трекера книг, которая вам нужна, но вы ещё нигде её не видели? Если да, то какая?': 'Is there a book-tracking feature you need but have not found anywhere yet? If so, what is it?',
			'Почему доступные на рынке сервисы вам не подходят?': 'Why do the services currently available not work for you?',
			'Мне неинтересно отслеживать прочитанное': 'I am not interested in tracking what I read',
			'Я ещё не нашёл подходящий трекер': 'I have not found the right tracker yet',
			'Вопросы': 'Survey questions',
			'*Опрос нелинейный': '*The survey was non-linear.',
			'🇬🇧 50% англоязычной аудитории используют трекеры': '🇬🇧 50% of English-speaking respondents use trackers',
			'🇷🇺 25% русскоязычной аудитории используют трекеры': '🇷🇺 25% of Russian-speaking respondents use trackers',
			'Подробные результаты UX-опроса в Notion': 'Detailed UX survey results in Notion',
			'4 респондента': '4 respondents',
			'участвовали в интервью.': 'took part in the interviews.',
			'Общие паттерны:': 'Common patterns:',
			'Стараются читать ежедневно': 'Try to read every day',
			'Рекомендуют книги друзьям и подписчикам': 'Recommend books to friends and followers',
			'Следуют рекомендациям от друзей и проверенных источников': 'Follow recommendations from friends and trusted sources',
			'Делают заметки и сохраняют цитаты': 'Take notes and save quotes',
			'Пишут отзывы': 'Write reviews',
			'Отслеживают чтение косвенно (через читалку или физическую книжную полку)': 'Track reading indirectly, through an e-reader or a physical bookshelf',
			'Частные наблюдения': 'Individual observations',
			'(отмечены 1–2 респондентами):': 'mentioned by 1–2 respondents:',
			'Привычки респондентов:': 'Respondent habits:',
			'Эти данные подтверждают необходимость рекомендации на основе сообщества': 'These findings support the need for community-based recommendations',
			'Интервью также подтвердили значимость раздела «Сообщество», отзывов и напоминаний о чтении.': 'The interviews also supported the importance of community features, reviews, and reading reminders.',
			'Раздражает, когда на обложке книги есть спойлеры или важные детали сюжета': 'It is frustrating when a book cover contains spoilers or important plot details.',
			'Мне нравится писать обзоры и саммари': 'I enjoy writing reviews and summaries.',
			'Не люблю читать только одну книгу за раз': 'I do not like reading only one book at a time.',
			'Не нравится, когда приходится смотреть в телефон — это отвлекает': 'I dislike having to look at my phone because it is distracting.',
			'Мне всё равно на список прочитанных книг': 'I do not care about keeping a list of books I have read.',
			'Два ключевых вывода:': 'Two key findings:',
			'Респонденты': 'Respondents',
			'любят рекомендовать книги другим': 'enjoy recommending books to others',
			'через отзывы, саммари, заметки': 'through reviews, summaries, and notes',
			'вероятнее всего прочитают книгу': 'are most likely to read a book',
			'по рекомендации друга или доверенного источника': 'when it is recommended by a friend or trusted source',
			'Подробные результаты интервью в Notion': 'Detailed interview results in Notion',
			'Цитаты респондентов:': 'Selected respondent quotes:',
			'Если мне понравится книга, я напишу отзыв, не только для других, но и для собственного удовольствия': 'If I like a book, I’ll write a review — not only for other people, but because I enjoy doing it.',
			'Иногда мне нужно дать лекцию о книге или сдать по ней экзамен, так что да, я веду заметки': 'Sometimes I have to give a lecture on a book or take an exam on it, so yes, I take notes.',
			'Раньше я записывал цитаты, но перестал — надоело': 'I used to write down quotes, but I stopped. I got tired of it.',
			'Я пробовал записывать заметки на бумаге, но я не понимаю собственный почерк.': 'I tried taking notes on paper, but I can’t read my own handwriting.',
			'Покупаю книгу, она мне нравится, я что-то о ней слышу — добавляю в очередь. А читаю в итоге только года через два': 'I buy a book, like the idea of it, hear something about it, and add it to the queue. Then I end up reading it two years later.',
			'Стараюсь игнорировать все отзывы. Если кто-то что-то советует — прошу описать по минимуму': 'I try to avoid reviews. If someone recommends something, I ask them to tell me as little as possible.',
			'Нахожу книги спонтанно. Например, листаю YouTube, выскакивает видео про Луция Аннея Сенеку, продолжаю смотреть — и бац, оказывается, он философ, и почему бы не почитать.': 'I find books spontaneously. I might be scrolling YouTube, see a video about Lucius Annaeus Seneca, keep watching, realize he was a philosopher, and think: why not read him?',
			'Иногда натыкаюсь на информацию в интернете, иногда случайно нахожу книги. Например, наткнулся на Демиана Германа Гессе — его порекомендовали в Токийском гуле.': 'Sometimes I come across information online; sometimes I discover books by accident. I found Hermann Hesse’s Demian because it was mentioned in Tokyo Ghoul.',
			'Недавно стал читать историческую литературу.': 'I recently started reading more history.',
			'У меня постоянно огромный бэклог, который только растёт. То кто-то посоветует, то вдруг начинаю интересоваться какой-то темой — психологией, физикой, чем угодно — и ищу по ним книги.': 'I always have a huge backlog that keeps growing. Someone recommends something, or I suddenly get interested in a topic — psychology, physics, anything — and start looking for books about it.',
			'Если человек скажет: “Прочитай это” — мне уже достаточно. Думаю: “Окей, вроде нормальная книга.” Я не формирую мнение заранее, просто смотрю общее количество отзывов. Мне нужен небольшой толчок, чтобы начать читать.': 'If someone simply tells me, “Read this,” that can be enough. I think, okay, it’s probably a decent book. I don’t form an opinion in advance; I just look at the overall amount of feedback. I only need a small push to start reading.',
			'Я читаю книги ежедневно.': 'I read every day.',
			'Иногда пишу обзор в свой блог, стараюсь постить в свои каналы о книгах, когда мне хочется. Не всегда, но стараюсь.': 'Sometimes I write a review for my blog and post about books in my channels when I feel like it. Not every time, but I try.',
			'Если натыкаюсь на интересную цитату, записываю её, а потом публикую в блоге.': 'If I come across an interesting quote, I save it and later post it on my blog.',
			'Я не веду список всех прочитанных книг.': 'I don’t keep a list of every book I’ve read.',
			'Нашёл список книг по философии на сайте университета.': 'I found a philosophy reading list on a university website.',
			'Каждый вечер перед сном читаю около часа.': 'I read for about an hour every night before bed.',
			'В читалке я могу выделять и сохранять цитаты. Я потом делюсь ими с друзьями.': 'My e-reader lets me highlight and save quotes. I later share them with friends.',
			'Я могу посмотреть, что уже прочитал, в своей читалке.': 'I can see what I’ve already read in my e-reader.',
			'Обычно не читаю отзывы — для меня чтение — это личный опыт.': 'I usually don’t read reviews. Reading is a personal experience for me.',
			'Стараюсь читать только бумажные книги, но мангу читаю на телефоне.': 'I try to read paper books only, although I read manga on my phone.',
			'Рекомендую книги только друзьям.': 'I recommend books only to friends.',
			'В каком-то смысле я пишу отзывы — просто обрабатываю прочитанное у себя в голове и стараюсь выделить главное.': 'In a way, I write reviews in my head: I process what I’ve read and try to identify the main points.',
			'Почти никогда не обращаю внимания на отзывы. Скорее прочитаю аннотацию на задней обложке.': 'I almost never pay attention to reviews. I’m more likely to read the blurb on the back cover.',
			'Я делаю заметки во время чтения, помогает лучше запомнить.': 'I take notes while reading. It helps me remember things better.',
			'Я в целом люблю читать художественную литературу и, конечно, философию, так как она напрямую связана с моей профессией и жизнью.': 'I generally enjoy fiction and, of course, philosophy, because it is directly connected to my work and my life.',
			'Читаю во всех форматах, но больше люблю бумажные книги.': 'I read in every format, but I prefer paper books.',
			'Люблю книжные барахолки.': 'I love second-hand book markets.',
			'Я уважаю и бумажные и электронные книги.': 'I respect both paper and digital books.',
			'Писать отзывы — увлекательное занятие, которое приносит мне удовольствие.': 'Writing reviews is an engaging activity that I genuinely enjoy.',
			'Какой смысл сохранять цитаты, если ими не с кем поделиться?': 'What is the point of saving quotes if there is no one to share them with?',
			'Я больше привык к бумаге — глаза меньше устают, и приятно держать что-то физическое в руках.': 'I’m more used to paper: my eyes get less tired, and I like holding something physical.',
			'Так проще запоминать, и я могу просто поделиться своим мнением. Приятно, когда тебя слышат.': 'It is easier to remember things this way, and I can simply share my opinion. It feels good to be heard.',
			'Notion очень удобный, тетрадка очень удобная, а ещё мне нравится писать ручкой.': 'Notion is very convenient, a notebook is very convenient, and I also like writing with a pen.',
			'Ты приходишь в класс, и учитель говорит: "Какая трагическая у него была судьба!". А зачем мне об этом сказали? Мне испортили все впечатления, которые я мог бы получить от книги. Украли мой читательский опыт — я ненавижу это.': 'You come into class and the teacher says, “What a tragic life he had!” Why did I need to know that? It ruins everything I could have experienced from the book. It takes away the reading experience — I hate that.',
			'Я не держу список прочитанных книг. Мне это не нужно. Мне неинтересна цифра, сколько книг я прочел.': 'I don’t keep a list of books I’ve read. I don’t need one. I’m not interested in the number of books I’ve finished.',
			'Функция': 'Function', 'Ценность': 'Value', 'Трудозатраты': 'Effort', 'Оценка': 'Score', 'Поиск': 'Search', 'Книжный трекер': 'Book tracker',
			'*Для полноценной приоритизации нужна продуктовая команда; представленная оценка является рабочей гипотезой.': '*A full prioritization exercise would require a product team; the scores shown here are a working hypothesis.',
			'На основе исследований я сформировал гипотетическую CJM: пользовательский путь, ключевые сценарии и потенциальные точки контакта.': 'Based on the research, I created a hypothetical customer journey map covering the user path, key scenarios, and potential touchpoints.',
			'Карта охватывает путь от первого знакомства с продуктом до прекращения использования.': 'The map covers the journey from first contact with the product through churn.',
			'На странице показан сокращённый фрагмент CJM.': 'The page shows a shortened fragment of the CJM.',
			'Карта пути пользователя (гипотетическая)': 'Customer journey map — hypothesis',
			'Событие': 'Event', 'Действие': 'Action', 'Эмоциональн. привязанн.': 'Emotional attachment', 'Негативная эмоция': 'Negative emotion',
			'Охватывает действия, цели и ожидания, тачпоинты, вопросы, барьеры, болевые точки, положительные аспекты, эмоции, вовлечённость, агентов влияния, KPI.': 'The map covers actions, goals and expectations, touchpoints, questions, barriers, pain points, positive moments, emotions, engagement, influencing agents, and KPIs.',
			'Персона': 'Persona',
			'Человек, который регулярно читает и стремится сохранять ежедневную привычку.': 'A person who reads regularly and tries to maintain a daily reading habit.',
			'Любит получать книжные рекомендации от друзей, сам любит советовать и обсуждать прочитанное, отдавая предпочтение определённым жанрам.': 'Enjoys receiving book recommendations from friends and recommending and discussing books in return, with clear preferences for particular genres.',
			'Ведёт большой список книг «на потом».': 'Keeps a large “read later” backlog.',
			'Не переносит спойлеры и легко отвлекается на телефон. Пишет отзывы, только когда действительно есть что сказать.': 'Strongly dislikes spoilers and is easily distracted by the phone. Writes reviews only when there is genuinely something to say.',
			'Возраст: 20–25 лет, учится и/или работает.': 'Age: 20–25; studies and/or works.',
			'Цель': 'Goal', 'Содержание': 'Content',
			'Полная карта пути пользователя в Miro': 'Full customer journey map in Miro',
			'Информационная архитектура основана на данных, собранных с помощью': 'The information architecture is based on data from',
			'анализа конкурентов, опросов, интервью,': 'competitive analysis, surveys, and interviews,',
			'а также на продуктовых гипотезах.': 'as well as product hypotheses.',
			'На странице показана сокращённая версия.': 'The page shows a shortened version.',
			'Полная схема на английском языке': 'The full diagram is in English',
			'включает легенду': 'and includes a legend',
			'и подробное описание': 'and detailed descriptions',
			'каждого раздела. ↓': 'of each section. ↓',
			'Полная информационная архитектура в FigJam': 'Full information architecture in FigJam',
			'Легенда': 'Legend',
			'Регистрация': 'Registration',
			'Полный набор вайрфреймов в Figma': 'Full set of wireframes in Figma',
			'Вайрфреймы основаны на': 'The wireframes are based on',
			'информационной архитектуре и пользовательских сценариях.': 'the information architecture and user flows.',
			'Они детализируют ключевые состояния и взаимодействия,': 'They detail the key states and interactions',
			'формируя основу для проверки сценариев': 'and provide a foundation for validating the flows',
			'до этапа визуального дизайна.': 'before visual design.',
			'Главная страница': 'Home', 'Запись чтения': 'Reading log', 'Челленджи': 'Challenges', 'Библиотека': 'Library', 'Список прочитанного': 'Read list', 'Уведомления': 'Notifications', 'Написание отзыва': 'Write a review', 'Хочу прочитать': 'Want to Read', 'Категоризация': 'Categorization', 'Чужой список': 'Another user’s list', 'Страница книги': 'Book page',
			'Я собрал интерактивный прототип и провёл тестирование с 4 респондентами.': 'I built an interactive prototype and tested it with 4 respondents.',
			'Респонденты выполнили большинство задач без затруднений.': 'Respondents completed most tasks without difficulty.',
			'Респонденты выполнили 5 сценариев:': 'Five tested scenarios:',
			'Полные материалы пользовательского тестирования в Notion': 'Full usability-testing materials in Notion',
			'Регистрация и начальные действия': 'Registration and initial actions',
			'Пройти анбординг': 'Complete onboarding',
			'Зарегистрироваться': 'Create an account',
			'Добавить книгу в «Читаю сейчас»': 'Add a book to “Currently Reading”',
			'Записать сессию чтения и продолжить стрик': 'Log a reading session and continue the streak',
			'Отметить книгу как «Прочитано»': 'Mark the book as “Read”',
			'Написать отзыв': 'Write a review',
			'Подписаться на друга': 'Follow a friend',
			'Открыть поиск': 'Open search',
			'Ввести имя пользователя': 'Enter a username',
			'Открыть профиль или подписаться прямо из поиска': 'Open the profile or follow directly from search',
			'Категоризировать книги в «Хочу прочитать»': 'Categorize books in “Want to Read”',
			'Открыть библиотеку и список': 'Open the library and the list',
			'Включить категоризацию': 'Open categorization',
			'Распределить книги': 'Arrange books',
			'Добавить теги': 'Add tags',
			'Начать челлендж и получить достижение': 'Start a challenge and earn an achievement',
			'Выбрать сложность челленджа': 'Choose a challenge difficulty',
			'Запустить челлендж': 'Start it',
			'Получить достижение': 'Receive an achievement',
			'Добавить и редактировать чужой список': 'Add and edit another user’s list',
			'Найти список через поиск': 'Search for the list',
			'Открыть его и добавить в аккаунт': 'Open it and add it to your account',
			'Добавить книгу в список': 'Add a book to the list',
			'Рекомендации по итогам тестирования:': 'Recommendations after testing:',
			'Создать мини-онбординг': 'Add a short onboarding flow',
			'для категоризации': 'for categorization',
			'Сделать списки визуально отличными': 'Make list cards visually distinct',
			'от отдельных книг': 'from individual book cards',
			'Протестировать оставшиеся сценарии': 'Test the remaining scenarios',
			'Разработать визуальный язык и UI': 'Develop the visual language and UI',
			'Изменения на основе': 'Changes based on',
			'выявленных проблем:': 'the issues found:',
			'Убрал рейтинг из карточек книг, чтобы снизить визуальную нагрузку.': 'Removed the rating from book cards to reduce visual load.',
			'Карточки списков выглядели слишком похоже на карточки книг, что усложняло навигацию.': 'List cards looked too similar to book cards, which made navigation harder.',
			'Текст в поп-апе при попытке редактировать чужой список был слишком плотным, поэтому я его упростил.': 'The copy in the pop-up shown when users tried to edit another person’s list was too dense, so I simplified it.',
			'Запуск челленджа перенёс из модального окна на отдельную страницу и переработал иерархию.': 'Moved challenge setup from a modal to a separate page and rebuilt the hierarchy.',
			'Упростил текст категоризации «Хочу прочитать» и добавил объяснение работы функции.': 'Simplified the copy for “Want to Read” categorization and added an explanation of how the feature works.',
			'Добавил кнопку отмены последнего действия. Стрелка намеренно сохраняет рисованный характер.': 'Added an undo button for the most recent action. The arrow intentionally retains a hand-drawn character.',
			'Целью был простой и функциональный интерфейс.': 'The goal was a simple, functional interface.',
			'Основные принципы: высокий контраст, читабельная типографика, ясная иерархия и визуальная самостоятельность относительно конкурентов.': 'Core principles: high contrast, readable typography, clear hierarchy, and a visual identity distinct from competitors.',
			'Интерфейс должен оставаться выразительным и удобным в ежедневном использовании.': 'The interface needed to remain expressive while being comfortable for everyday use.',
			'Ниже показан путь от бумажных скетчей до финальных экранов.': 'Below is the progression from paper sketches to final screens.',
			'Страница челленджа': 'Challenge page', 'Поиск цветов': 'Color exploration',
			'Во время прототипирования экран статистики был значительно длиннее. В финальной версии информация перераспределена по более компактной структуре.': 'During prototyping, the statistics screen was considerably longer. In the final version, the information was redistributed into a more compact structure.',
			'В процессе работы ключевой метрикой стало среднее количество прочитанных книг в месяц — оно нагляднее показывает динамику во времени.': 'As the work progressed, the average number of books read per month became the key metric, providing a clearer view of change over time.',
			'Тёмная тема ❌': 'Dark theme ❌', 'Создавала нежелательные визуальные ассоциации.': 'Created unwanted visual associations.',
			'Главный цвет: Зелёный ❌': 'Primary color: Green ❌', 'Вызывал ассоциации с растениями и ЗОЖ, а не с чтением.': 'Suggested plants and wellness rather than reading.',
			'Главный цвет: Оранжевый ❌': 'Primary color: Orange ❌', 'Не поддерживал тему чтения.': 'Did not support the reading theme.',
			'Главный цвет: Красный ❌': 'Primary color: Red ❌', 'Воспринимался слишком агрессивно.': 'Felt too aggressive.',
			'Главный цвет: Синий ✅': 'Primary color: Blue ✅', 'Нейтральный вариант без лишних тематических ассоциаций.': 'A neutral option without unnecessary thematic associations.',
			'Профиль': 'Profile', 'Настройки': 'Settings', 'Старт челленджа': 'Start challenge',
			'Категоризация книг': 'Book categorization',
			'Категоризация внутри списка «Хочу прочитать» помогает пользователям приоритизировать книги в длинном бэклоге и выбрать, что читать дальше.': 'Categorization within the “Want to Read” list helps users prioritize books in a long backlog and choose what to read next.',
			'Функция помогает приоритизировать книги': 'The feature helps users prioritize books',
			'в длинном списке и выбрать следующую для чтения.': 'in a long backlog and choose what to read next.',
			'Это слегка изменённая': 'It is a modified', 'матрица Эйзенхауэра': 'Eisenhower Matrix', 'для сортировки книг.': 'adapted for sorting books.',
			'Книги распределяются по четырём категориям, чтобы упростить выбор следующей книги.': 'Books are placed into four categories to make the next reading choice easier.',
			'Уведомления могут напоминать о важных книгах или предлагать пересортировать список.': 'Notifications can remind users about important books or prompt them to re-sort the list.',
			'Эффективность гипотезы необходимо проверять на реальной пользовательской базе.': 'The effectiveness of the hypothesis would need to be validated with a real user base.',
			'Концепция стала ключевой отличительной функцией продукта.': 'The concept became the product’s key differentiating feature.',
			'Исходная матрица Эйзенхауэра': 'Original Eisenhower Matrix',
			'Срочно / Важно': 'Urgent / Important', 'Не срочно / Важно': 'Not urgent / Important', 'Не срочно / Не важно': 'Not urgent / Not important', 'Срочно / Не важно': 'Urgent / Not important',
			'Шрифт — Inter': 'Primary typeface — Inter', 'Цвета': 'Colors',
			'Основной цвет': 'Main color', 'Фон': 'Background', 'Белый': 'White', 'Чёрный': 'Black',
			'Брошенные книги': 'Abandoned Books',
			'Shelfr стал моим первым полным продуктовым кейсом и был создан как учебный проект для портфолио.': 'Shelfr was my first complete product-design case study and was created as a portfolio learning project.',
			'Ретроспектива помогла выявить сильные стороны решения,': 'The retrospective helped identify the strengths of the solution,',
			'ошибки процесса': 'process mistakes', 'и направления дальнейшего развития.': 'and directions for further development.',
			'Ниже — основные выводы,': 'The main conclusions', 'сформулированные после завершения проекта.': 'after completing the project:',
			'Недостаточная глубина исследований': 'Insufficient research depth',
			'Ранний переход к high-fidelity': 'Early move to high fidelity',
			'Избыточное сопровождение': 'Too much guidance',
			'Поздняя систематизация компонентов': 'Late component systematization',
			'Выборка из 4 респондентов недостаточна. Интервью необходимо продолжать, пока новые ответы не перестанут дополнять результаты исследования.': 'A sample of four interview participants is too small; interviews should continue until new answers stop adding meaningful new insights.',
			'Я слишком рано перешёл к высокодетализированным прототипам, что увеличило объём лишних итераций.': 'I moved to high-fidelity prototypes too early, which created unnecessary iteration work.',
			'Во время пользовательского тестирования я избыточно направлял респондентов. Более нейтральная модерация помогла бы получить больше самостоятельных реакций.': 'During usability testing, I guided participants too much. More neutral moderation would have produced more independent reactions.',
			'Компоненты и стили следовало сформировать в начале работы — это ускорило бы дальнейшие итерации.': 'Components and styles should have been established earlier in the process; doing so would have made later iterations faster.',
			'Спасибо за просмотр!': 'Thanks for viewing!',
			'оглавление': 'contents',
			'← Предыдущий проект': '← Previous project',
			'Следующий проект →': 'Next project →',
			'Упаковка и брендинг материалы': 'Packaging & Brand Materials',
			'Колода карт Misprint': 'Misprint Playing Card Deck',
			'Прилож…': 'App…', 'Трекер чте…': 'Reading tra…',
			'Почему вы не используете': 'Why do you not use', 'трекеры?': 'trackers?',
			'Есть ли какая-то функция книжного трекера,': 'Is there a book-tracking feature', 'которая вам нужна, но вы нигде её не нашли?': 'you need but have not found anywhere?',
			'Мне неинтересно': 'I am not interested in', 'отслеживать прочитанное': 'tracking what I read',
			'Я ещё не нашёл': 'I have not found', 'подходящий трекер': 'the right tracker yet',
			'Эти данные подтверждают необходимость': 'These findings support the need for', 'рекомендации на основе сообщества': 'community-based recommendations',
			'Интервью также подтвердили значимость раздела': 'The interviews also supported the importance of', '«Сообщество», отзывов и напоминаний о чтении.': 'community features, reviews, and reading reminders.',
			'Если мне понравится книга, я напишу отзыв, не только для других,': 'If I like a book, I’ll write a review — not only for other people,', 'но и для собственного удовольствия': 'but because I enjoy doing it.',
			'Я пробовал записывать заметки на бумаге,': 'I tried taking notes on paper,', 'но я не понимаю собственный почерк.': 'but I can’t read my own handwriting.',
			'Иногда натыкаюсь на информацию в интернете, иногда случайно нахожу книги. Например, наткнулся на Демиана Германа Гессе — его порекомендовали в Токийском гуле.': 'Sometimes I come across information online; sometimes I discover books by accident. I found Hermann Hesse’s Demian because it was mentioned in Tokyo Ghoul.',
			'Если человек скажет: “Прочитай это” — мне уже достаточно. Думаю: “Окей, вроде нормальная книга.”': 'If someone simply tells me, “Read this,” that can be enough. I think, okay, it’s probably a decent book.',
			'Я не формирую мнение заранее, просто смотрю общее количество отзывов. Мне нужен небольшой толчок, чтобы начать читать.': 'I don’t form an opinion in advance; I just look at the overall amount of feedback. I only need a small push to start reading.',
			'Стараюсь читать только бумажные книги,': 'I try to read paper books only,', 'но мангу читаю': 'although I read manga', 'на телефоне.': 'on my phone.',
			'В каком-то смысле я пишу отзывы — просто обрабатываю прочитанное у себя': 'In a way, I write reviews in my head: I process what I’ve read', 'в голове и стараюсь выделить главное.': 'and try to identify the main points.',
			'Почти никогда': 'I almost never', 'не обращаю внимания': 'pay attention', 'на отзывы. Скорее прочитаю аннотацию': 'to reviews. I’m more likely to read the blurb', 'на задней обложке.': 'on the back cover.',
			'Я в целом люблю читать художественную литературу и, конечно, философию, так как она напрямую связана': 'I generally enjoy fiction and, of course, philosophy, because it is directly connected', 'с моей профессией': 'to my work', 'и жизнью.': 'and my life.',
			'Регистрация и начальные': 'Registration and initial', 'действия': 'actions',
			'Добавить книгу': 'Add a book', 'в "Читаю сейчас"': 'to “Currently Reading”', 'Записать чтение,': 'Log a reading session and', 'продолжить стрик': 'continue the streak', 'Отметить книгу как': 'Mark the book as', '"Прочитано"': '“Read”', 'на книгу': 'for the book',
			'Изменить редактирование чужих списков,': 'Revise the editing flow for other users’ lists', 'чтобы уменьшить умственную нагрузку': 'to reduce cognitive load',
			'Использовать отдельный экран': 'Use a dedicated screen', 'для выбора челленджа': 'for choosing a challenge',
			'Ввести ник': 'Enter a username', 'Открыть профиль': 'Open the profile', 'или подписаться': 'or follow', 'из поиска': 'from search', 'Подписаться': 'Follow',
			'Категоризировать книги': 'Categorize books', 'в "Хочу прочитать"': 'in “Want to Read”', 'Перейти в библиотеку,': 'Open the library and', 'открыть список': 'open the list', 'Расставить книги': 'Arrange books', 'Добавить теги к книгам': 'Add tags to books',
			'Начать челлендж': 'Start a challenge', 'и получить достижение': 'and earn an achievement', 'Выбрать сложность челленджа и начать': 'Choose a challenge difficulty and start it', 'Записать чтение': 'Log reading',
			'Добавить и редактировать': 'Add and edit', 'чужой список': 'another user’s list', 'Ввести название списка': 'Enter the list name', 'Открыть список': 'Open the list', 'и добавить себе': 'and add it to your account',
			'В карточке книги убрал рейтинг,': 'Removed the rating from book cards', 'чтобы снизить визуальную нагрузку.': 'to reduce visual load.',
			'Карточка списка была слишком похожа': 'List cards looked too similar', 'на карточку книги, что затрудняло навигацию.': 'to book cards, which made navigation harder.',
			'Поп-ап, который появляется, когда пользователь пытается редактировать чужой список': 'The pop-up shown when users tried to edit another person’s list', 'Формулировки были перегружены, поэтому я их упростил.': 'was too dense, so I simplified the copy.',
			'Запуск челленджа перенёс из модального окна': 'Moved challenge setup from a modal', 'на отдельную страницу и': 'to a separate page and', 'переработал иерархию.': 'rebuilt the hierarchy.',
			'Категоризация в "Хочу прочитать"': 'Categorization in “Want to Read”', 'Упростил формулировки и добавил пояснение принципа работы функции.': 'Simplified the copy and added an explanation of how the feature works.',
			'Добавил кнопку отмены последнего действия': 'Added an undo button for the most recent action', 'Стрелка намеренно сохраняет рукописный характер.': 'The arrow intentionally retains a hand-drawn character.',
			'На этапе прототипирования экран был значительно длиннее': 'During prototyping, the screen was considerably longer', 'в прототипе.': 'in the prototype.', 'В финальной версии статистика': 'In the final version, the statistics', 'перераспределена по более компактной структуре.': 'were redistributed into a more compact structure.',
			'В процессе работы ключевой метрикой стало среднее количество прочитанных книг за месяц — более наглядный показатель динамики.': 'As the work progressed, the average number of books read per month became the key metric, providing a clearer view of change over time.',
			'Список прочит.': 'Read list', 'Категоризация книг в списке «Хочу прочитать»': 'Book categorization within “Want to Read”',
			'Книги распределяются': 'Books are placed', 'по четырём категориям, чтобы упростить выбор,': 'into four categories to make it easier to choose', 'что читать дальше.': 'what to read next.',
			'Уведомления напомнят о важных книгах или о пересортировке.': 'Notifications can remind users about important books or prompt them to re-sort the list.',
			'Оригинальная': 'Original', '<— размер': '<— size', 'шрифта': 'typeface', 'главного': 'main', 'трекера': 'tracker',
			'Выборка из 4 респондентов недостаточна.': 'A sample of four interview participants is too small.', 'Интервью необходимо продолжать,': 'Interviews should continue', 'пока новые ответы не перестанут дополнять результаты исследования.': 'until new answers stop adding meaningful new insights.',
			'Вернуться на главную →': 'Return home →',
			'Среди англоязычной аудитории лидирует Goodreads': 'Goodreads was the leading tracker among English-speaking respondents',
			'тогда как русскоязычная аудитория чаще использует собственные системы учёта; второе место занимает LiveLib.': 'while Russian-speaking respondents more often used their own tracking systems; LiveLib ranked second.',
			'трекеры книг?': 'book trackers?',
			'Иногда натыкаюсь на информацию в интернете, иногда случайно нахожу книги.': 'Sometimes I come across information online; sometimes I discover books by accident.',
			'Например, наткнулся на Демиана Германа Гессе — его порекомендовали в Токийском гуле.': 'I found Hermann Hesse’s Demian because it was mentioned in Tokyo Ghoul.',
			'Среди англоязычной аудитории лидирует': 'Among English-speaking respondents, the leading tracker was',
			', тогда как русскоязычная аудитория чаще использует': ', while Russian-speaking respondents more often use',
			'собственные системы учёта': 'their own tracking systems',
			'; второе место занимает LiveLib.': '; LiveLib ranks second.',
			'Например, наткнулся на': 'For example, I found', 'Демиана': 'Demian',
			'Германа Гессе — его порекомендовали в': 'by Hermann Hesse because it was mentioned in', 'Токийском гуле': 'Tokyo Ghoul',
			'Контакты Федора Юрецкого': 'Fedor Jurecki contacts',
			'Федор Юрецкий — на главную': 'Fedor Jurecki — home',
			'Предыдущая схема': 'Previous diagram', 'Следующая схема': 'Next diagram', 'Другие проекты': 'Other projects',
		}));
		const replacements = [...text].filter(([source]) => source.length >= 8).sort(([a], [b]) => b.length - a.length);

		const translateBody = () => {
			const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
			while (walker.nextNode()) {
				const node = walker.currentNode;
				const trimmed = node.nodeValue?.trim();
				if (!trimmed) continue;
				if (text.has(trimmed)) {
					node.nodeValue = node.nodeValue.replace(trimmed, text.get(trimmed));
					continue;
				}
				let value = node.nodeValue;
				for (const [source, target] of replacements) value = value.replaceAll(source, target);
				node.nodeValue = value;
			}
		};
		const translateAttributes = () => document.querySelectorAll('[aria-label],[title],[alt],[data-caption]').forEach((element) => {
			for (const attribute of ['aria-label', 'title', 'alt', 'data-caption']) {
				const original = element.getAttribute(attribute);
				if (!original) continue;
				let value = text.get(original) ?? original;
				for (const [source, target] of replacements) value = value.replaceAll(source, target);
				element.setAttribute(attribute, value);
			}
		});
		translateBody();
		translateAttributes();
		addEventListener('DOMContentLoaded', () => { translateBody(); translateAttributes(); }, { once: true });
	}

	const recommendations = isRu ? [
		'Создать мини-онбординг для категоризации',
		'Сделать списки визуально отличными от отдельных книг',
		'Изменить редактирование чужих списков, чтобы уменьшить умственную нагрузку',
		'Использовать отдельный экран для выбора челленджа',
		'Протестировать оставшиеся сценарии',
		'Разработать визуальный язык и UI',
	] : [
		'Add a short onboarding flow for categorization',
		'Make list cards visually distinct from individual book cards',
		'Revise the editing flow for other users’ lists to reduce cognitive load',
		'Use a dedicated screen for choosing a challenge',
		'Test the remaining scenarios',
		'Develop the visual language and UI',
	];
	const recommendationList = document.querySelector('.framer-spmwy3');
	if (recommendationList) recommendationList.replaceChildren(...recommendations.map((item) => Object.assign(document.createElement('p'), { textContent: item })));

	const localizeLinks = () => document.querySelectorAll('a[href^="/"]').forEach((link) => {
		if (link.dataset.locale) return;
		const href = link.getAttribute('href');
		if (!href) return;
		link.setAttribute('href', isRu ? (href.startsWith('/ru/') ? href : `/ru${href}`) : href.replace(/^\/ru(?=\/|$)/, '') || '/');
	});
	localizeLinks();
	addEventListener('DOMContentLoaded', localizeLinks, { once: true });

	const bubbleCopy = [
		['.framer-15zgoqi', 'Я бы хотел простое приложение, чтобы фиксировать чтение и видеть статистику и календарь', 'I’d like a simple app to track my reading and see statistics and a calendar.'],
		['.framer-jgnhpw', 'Алгоритм как у Нетфликс', 'A Netflix-style algorithm'],
		['.framer-1lv2gui', 'Дискуссии, быстрые обзоры', 'Discussions and quick reviews'],
		['.framer-1g28eg1', 'Мотивировать меня больше читать', 'Motivate me to read more'],
		['.framer-1s7hz7j', 'Было бы здорово интегрировать приложение с библиотекой, чтобы можно было брать там книги', 'It would be great to integrate the app with a library, so I could borrow books through it.'],
		['.framer-1o4bq3', 'Считыватель штрихкода, но вроде я такое уже видел', 'A barcode scanner, though I think I’ve seen that somewhere already.'],
	];
	const renderBubbles = () => bubbleCopy.forEach(([selector, ru, en]) => {
		const bubble = document.querySelector(selector);
		if (!bubble) return;
		const copy = document.createElement('p');
		copy.textContent = isRu ? ru : en;
		bubble.replaceChildren(copy);
		bubble.classList.add('shelfr-live-bubble');
		bubble.style.removeProperty('color');
		bubble.style.removeProperty('fill');
		bubble.removeAttribute('aria-hidden');
	});
	renderBubbles();
	addEventListener('DOMContentLoaded', renderBubbles, { once: true });

	const createSwitcher = () => {
		const switcher = document.createElement('a');
		switcher.className = 'shelfr-language-switch';
		switcher.href = pathFor(alternateLocale);
		switcher.dataset.locale = alternateLocale;
		switcher.setAttribute('aria-label', isRu ? 'Перейти на английскую версию' : 'Switch to Russian');
		switcher.textContent = alternateLocale.toUpperCase();
		switcher.addEventListener('click', () => {
			localStorage.setItem(choiceKey, alternateLocale);
			saveScrollPosition(switcher.href);
		});
		return switcher;
	};
	document.querySelector('.portfolio-site-links')?.prepend(createSwitcher());
	document.querySelector('.portfolio-mobile-nav')?.prepend(createSwitcher());

	const style = document.createElement('style');
	style.textContent = `.shelfr-language-switch{padding:.3rem .38rem;color:#fff!important;border:1px solid #ffffff38;font:750 .68rem/1 Inter,Arial,sans-serif;text-decoration:none}.portfolio-mobile-nav{gap:.45rem}.framer-1g108xz,.framer-1g108xz p{min-width:0;overflow:hidden;white-space:nowrap!important;text-overflow:ellipsis}.shelfr-language-gate{width:fit-content;max-width:calc(100vw - 2rem);padding:.5rem;color:#fff;background:#111;border:1px solid #ffffff38;border-radius:12px}.shelfr-language-gate::backdrop{background:#000c}.shelfr-language-gate p{margin:.25rem .3rem .65rem;color:#999;font:400 13px/1.3 Arial,sans-serif}.shelfr-language-gate nav{display:flex;gap:.5rem}.shelfr-language-gate a{padding:.85rem 1.1rem;color:#fff;text-align:center;text-decoration:none;border:1px solid #ffffff55;border-radius:8px;font:700 13px/1 Arial,sans-serif}@media(min-width:1025px){.framer-1tlw89e,.framer-19h28up{left:622px!important;transform:none!important}.framer-h3sPI .shelfr-live-bubble{display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;overflow:visible;padding:8px 14px;color:#fff!important;background:#245eff;border-radius:16px;font:400 15px/1.12 Inter,Arial,sans-serif;text-align:left}.framer-h3sPI .shelfr-live-bubble p{margin:0;color:#fff!important;font:inherit}.framer-h3sPI .shelfr-live-bubble::after{content:"";position:absolute;bottom:-5px;left:12px;width:14px;height:11px;background:inherit;clip-path:polygon(0 0,100% 0,0 100%)}}@media(max-width:1024px){.shelfr-language-switch{display:inline-flex;align-items:center;justify-content:center;min-height:2.75rem;padding:.72rem .85rem;color:#f5f5f5!important;background:#0d0d0d;border:1px solid #2b2b2b;font:750 .78rem/1 Inter,Arial,sans-serif}}`;
	document.head.append(style);

	if (!localStorage.getItem(choiceKey)) {
		const dialog = document.createElement('dialog');
		dialog.className = 'shelfr-language-gate';
		dialog.setAttribute('aria-label', 'Choose language / Выберите язык');
		dialog.innerHTML = `<p>Language / Язык</p><nav><a href="${pathFor('en')}" data-locale="en">English</a><a href="${pathFor('ru')}" data-locale="ru">Русский</a></nav>`;
		dialog.addEventListener('cancel', (event) => event.preventDefault());
		dialog.addEventListener('click', (event) => {
			const link = event.target.closest?.('[data-locale]');
			if (!link) return;
			localStorage.setItem(choiceKey, link.dataset.locale);
			saveScrollPosition(link.href);
		});
		document.body.append(dialog);
		dialog.showModal();
	}

})();
