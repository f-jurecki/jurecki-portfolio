import { deal, validState, rank, suit, movable, canMove, move, autoMove, draw, won, canFinish, foundationMove, hints } from '../lib/solitaire.mjs';

const root = document.querySelector('[data-solitaire]');
const table = root.querySelector('[data-table]');
const status = root.querySelector('[data-status]');
const undo = root.querySelector('[data-undo]');
const finish = root.querySelector('[data-finish]');
const hintButton = root.querySelector('[data-hint]');
const win = root.querySelector('[data-win]');
const canvas = root.querySelector('[data-celebration]');
const dialog = root.querySelector('[data-new-dialog]');
const images = JSON.parse(root.dataset.images);
const ru = root.dataset.locale === 'ru';
const t = (russian, english) => ru ? russian : english;
const symbols = ['♥', '♠', '♣', '♦'];
const suitNames = ru ? ['черви', 'пики', 'трефы', 'бубны'] : ['hearts', 'spades', 'clubs', 'diamonds'];
const ranks = ru ? ['Туз', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Валет', 'Дама', 'Король'] : ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
const key = 'misprint-solitaire-v1';
let state = deal();
let history = [];
let selected = null;
let storageOK = true;
let initialMessage = '';
let animation = 0;
let celebrationRun = 0;
let finishing = false;
let finishTimer = 0;
let drag = null;
let suppressClickUntil = 0;
let hintState = null;
let hintIndex = 0;

function readSave(raw) {
	const saved = JSON.parse(raw);
	if (!validState(saved?.state)) throw new Error('Invalid saved game');
	return { state: saved.state, history: Array.isArray(saved.history) ? saved.history.slice(-100).filter(validState) : [] };
}

try {
	const raw = localStorage.getItem(key);
	if (raw) {
		try { ({ state, history } = readSave(raw)); }
		catch {
			localStorage.setItem(`${key}-recovery`, raw);
			initialMessage = t('Сохранение повреждено. Его копия сохранена; начата новая партия.', 'The save was damaged. A backup was kept; a new game has started.');
		}
	}
} catch { storageOK = false; }

function save() {
	try { localStorage.setItem(key, JSON.stringify({ state, history })); storageOK = true; }
	catch { storageOK = false; }
}

const sourceOf = (element) => ({ zone: element.dataset.zone, pile: Number(element.dataset.pile), index: Number(element.dataset.index) });
const cardName = (id) => `${ranks[rank(id) - 1]}, ${suitNames[suit(id)]}`;
const samePile = (a, b) => a?.zone === b?.zone && a?.pile === b?.pile;

const cardNodes = new Map();
const pileNodes = new Map();

function card(id, up, from, offset = 0) {
	const key = `${id}:${up}`;
	const button = cardNodes.get(key) ?? document.createElement('button');
	button.type = 'button';
	button.className = `playing-card${up ? '' : ' face-down'}`;
	Object.assign(button.dataset, from);
	button.style.top = `${offset}px`;
	button.setAttribute('aria-label', up ? cardName(id) : t('Закрытая карта', 'Face-down card'));
	button.disabled = !up;
	if (!cardNodes.has(key)) {
		const img = document.createElement('img');
		img.src = images[up ? id : 52];
		img.srcset = `${img.src} 373w`;
		img.sizes = '(max-width: 600px) 13vw, 130px';
		img.width = 373;
		img.height = 521;
		img.alt = '';
		img.draggable = false;
		button.append(img);
		if (up) {
			const label = document.createElement('span');
			label.className = `card-index${[0, 3].includes(suit(id)) ? ' red' : ''}`;
			label.textContent = `${['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'][rank(id) - 1]}${symbols[suit(id)]}`;
			label.setAttribute('aria-hidden', 'true');
			button.append(label);
		}
		cardNodes.set(key, button);
	}
	if (up) {
		button.setAttribute('aria-pressed', String(samePile(selected, from) && from.index >= selected.index));
		if (samePile(selected, from) && from.index >= selected.index) button.classList.add('selected');
	}
	return button;
}

function pile(zone, index, label, symbol = '') {
	const key = `${zone}:${index}`;
	const div = pileNodes.get(key) ?? document.createElement('div');
	div.className = 'pile';
	Object.assign(div.dataset, { zone, pile: index });
	const slot = div.firstElementChild ?? document.createElement('button');
	slot.type = 'button';
	slot.className = 'pile-slot';
	slot.textContent = symbol;
	slot.setAttribute('aria-label', label);
	Object.assign(slot.dataset, { zone, pile: index, index: -1 });
	if (!slot.parentElement) div.append(slot);
	pileNodes.set(key, div);
	if (selected && canMove(state, selected, { zone, pile: index })) div.classList.add('valid-target');
	return div;
}

function renderCards(container, cards) {
	for (const child of container.querySelectorAll('.playing-card')) {
		if (!cards.includes(child)) child.remove();
	}
	cards.forEach((card, index) => {
		const current = container.children[index + 1];
		if (current !== card) container.insertBefore(card, current ?? null);
	});
}

function render(message = '') {
	const focus = document.activeElement?.dataset;
	const focusSource = focus?.zone ? sourceOf(document.activeElement) : null;
	const top = table.querySelector('.top-piles') ?? document.createElement('div');
	top.className = 'top-piles';
	const stock = pile('stock', 0, state.stock.length ? t('Открыть карту из колоды', 'Draw a card') : t('Перелистать колоду', 'Recycle stock'), state.waste.length ? '↻' : '—');
	if (state.stock.length) {
		const back = card(52, false, { zone: 'stock', pile: 0, index: 0 });
		back.disabled = false;
		back.setAttribute('aria-label', t(`Колода: ${state.stock.length}. Открыть карту`, `Stock: ${state.stock.length}. Draw a card`));
		renderCards(stock, [back]);
	} else renderCards(stock, []);
	const waste = pile('waste', 0, t('Сброс', 'Waste'));
	renderCards(waste, state.waste.length ? [card(state.waste.at(-1), true, { zone: 'waste', pile: 0, index: state.waste.length - 1 })] : []);
	if (!top.children.length) top.append(stock, waste, document.createElement('div'));
	state.foundations.forEach((cards, index) => {
		const foundation = pile('foundations', index, t(`Дом: ${suitNames[index]}`, `Foundation: ${suitNames[index]}`), symbols[index]);
		renderCards(foundation, cards.length ? [card(cards.at(-1), true, { zone: 'foundations', pile: index, index: cards.length - 1 })] : []);
		if (!foundation.parentElement) top.append(foundation);
	});
	if (!top.parentElement) table.append(top);
	const columns = table.querySelector('.tableau') ?? document.createElement('div');
	columns.className = 'tableau';
	const cardWidth = stock.getBoundingClientRect().width;
	const openStep = Math.max(22, Math.min(37, cardWidth * .28));
	const closedStep = Math.max(10, openStep * .4);
	// A column can hold six face-down cards followed by a full king-to-ace sequence.
	columns.style.minHeight = `${Math.ceil(cardWidth * 521 / 373 + 6 * closedStep + 12 * openStep)}px`;
	state.tableau.forEach((cards, index) => {
		const column = pile('tableau', index, t(`Столбец ${index + 1}`, `Column ${index + 1}`), '');
		let offset = 0;
		renderCards(column, cards.map(({ id, up }, i) => {
			const node = card(id, up, { zone: 'tableau', pile: index, index: i }, offset);
			if (i < cards.length - 1) offset += up ? openStep : closedStep;
			return node;
		}));
		column.style.marginBottom = `${offset}px`;
		if (!column.parentElement) columns.append(column);
	});
	if (!columns.parentElement) table.append(columns);
	undo.disabled = !history.length || finishing;
	finish.hidden = !canFinish(state);
	finish.disabled = finishing;
	hintButton.disabled = finishing || won(state);
	root.querySelector('[data-moves]').textContent = t(`Ходов: ${state.moves}`, `Moves: ${state.moves}`);
	status.textContent = storageOK ? message : t('Браузер не разрешает сохранение. Не закрывай эту страницу.', 'Browser storage is unavailable. Keep this page open.');
	win.hidden = !won(state);
	if (focusSource) table.querySelector(`button[data-zone="${focusSource.zone}"][data-pile="${focusSource.pile}"][data-index="${focusSource.index}"]`)?.focus({ preventScroll: true });
}

function commit(next) {
	if (!next) return false;
	// ponytail: keep the last 100 undo steps to bound localStorage; use IndexedDB only for unlimited history.
	history = [...history.slice(-99), state];
	state = next;
	selected = null;
	save();
	render();
	if (won(state)) {
		root.querySelector('[data-win-new]').focus({ preventScroll: true });
		celebrate();
	}
	return true;
}

function stopAnimation() {
	celebrationRun++;
	cancelAnimationFrame(animation);
	animation = 0;
	canvas.hidden = true;
}

function undoMove() {
	if (!history.length || finishing) return;
	stopAnimation();
	state = history.pop();
	selected = null;
	save();
	render(t('Ход отменён', 'Move undone'));
}

function select(from) {
	selected = movable(state, from).length ? from : null;
	render(selected ? t('Выбери место для карты. Пунктиром отмечены доступные стопки.', 'Choose a destination. Dashed outlines show legal moves.') : '');
}

table.addEventListener('click', (event) => {
	if (performance.now() < suppressClickUntil || finishing || won(state)) return;
	const target = event.target.closest('button');
	if (!target) { selected = null; render(); return; }
	const from = sourceOf(target);
	if (from.zone === 'stock') { commit(draw(state)); return; }
	if (event.detail > 1) return;
	if (selected && commit(move(state, selected, from))) return;
	if (commit(autoMove(state, from))) return;
	if (selected && samePile(selected, from) && selected.index === from.index) { selected = null; render(); return; }
	if (selected && !movable(state, from).length) { render(t('Сюда нельзя переместить выбранные карты.', 'The selected cards cannot move here.')); return; }
	select(from);
	if (selected) render(t('Для этой карты пока нет подходящего места.', 'There is no legal move for this card yet.'));
});

function clearDrag() { drag?.ghost?.remove(); drag = null; }
table.addEventListener('pointerdown', (event) => {
	if (event.button !== 0 || finishing || won(state)) return;
	const target = event.target.closest('.playing-card:not(.face-down)');
	if (!target) return;
	const from = sourceOf(target);
	if (!movable(state, from).length) return;
	const rect = target.getBoundingClientRect();
	drag = { from, x: event.clientX, y: event.clientY, dx: event.clientX - rect.left, dy: event.clientY - rect.top, width: rect.width, pointer: event.pointerId, target, ghost: null };
});
window.addEventListener('pointermove', (event) => {
	if (!drag || event.pointerId !== drag.pointer) return;
	if (!drag.ghost && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 7) return;
	if (!drag.ghost) {
		const ghost = document.createElement('div');
		ghost.className = 'drag-ghost';
		ghost.style.width = `${drag.width}px`;
		const origin = parseFloat(drag.target.style.top);
		[...drag.target.parentElement.querySelectorAll('.playing-card')].filter((el) => Number(el.dataset.index) >= drag.from.index).forEach((el) => {
			const clone = el.cloneNode(true);
			clone.style.top = `${parseFloat(el.style.top) - origin}px`;
			clone.removeAttribute('id');
			clone.tabIndex = -1;
			ghost.append(clone);
		});
		ghost.setAttribute('aria-hidden', 'true');
		root.append(ghost);
		drag.ghost = ghost;
	}
	drag.ghost.style.left = `${event.clientX - drag.dx}px`;
	drag.ghost.style.top = `${event.clientY - drag.dy}px`;
});
window.addEventListener('pointerup', (event) => {
	if (!drag || event.pointerId !== drag.pointer) return;
	if (drag.ghost) {
		suppressClickUntil = performance.now() + 400;
		const destination = document.elementFromPoint(event.clientX, event.clientY)?.closest('.pile');
		const from = drag.from;
		clearDrag();
		if (!destination || !commit(move(state, from, sourceOf(destination)))) select(from);
	} else clearDrag();
});
window.addEventListener('pointercancel', clearDrag);
window.addEventListener('blur', clearDrag);
window.addEventListener('keydown', (event) => {
	if (dialog.open) return;
	if (event.key === 'Escape') { clearDrag(); selected = null; stopAnimation(); render(); }
	if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') { event.preventDefault(); undoMove(); }
});
undo.addEventListener('click', undoMove);
hintButton.addEventListener('click', () => {
	if (finishing || won(state)) return;
	if (hintState !== state) { hintState = state; hintIndex = 0; }
	const options = hints(state);
	const hint = options[hintIndex++ % options.length];
	selected = hint?.from ?? null;
	if (!hint) { render(t('Подсказок больше нет. Попробуй другой ход вручную или отмени предыдущий.', 'No more hints. Try another move manually or undo the previous move.')); return; }
	if (hint.draw) {
		render(state.stock.length ? t('Открой следующую карту из колоды.', 'Draw the next card from the stock.') : t('Перелистай колоду, чтобы снова открыть карты.', 'Recycle the stock to go through the cards again.'));
		table.querySelector('.pile[data-zone="stock"]').classList.add('hint-target');
		return;
	}
	const [id] = movable(state, hint.from);
	const destination = hint.to.zone === 'foundations' ? t(`дом: ${suitNames[hint.to.pile]}`, `foundation: ${suitNames[hint.to.pile]}`) : t(`столбец ${hint.to.pile + 1}`, `column ${hint.to.pile + 1}`);
	render(`${cardName(id)} → ${destination}. ${t('Ещё нажатие — другая подсказка.', 'Press again for another hint.')}`);
	table.querySelector(`.pile[data-zone="${hint.to.zone}"][data-pile="${hint.to.pile}"]`).classList.add('hint-target');
});
root.querySelector('[data-new]').addEventListener('click', () => dialog.showModal());
root.querySelector('[data-win-new]').addEventListener('click', newGame);
root.querySelector('[data-replay]').addEventListener('click', celebrate);
dialog.addEventListener('close', () => { if (dialog.returnValue === 'new') newGame(); });

function newGame() {
	clearTimeout(finishTimer);
	finishing = false;
	stopAnimation();
	clearDrag();
	state = deal();
	history = [];
	selected = null;
	save();
	render();
	root.querySelector('[data-new]').focus({ preventScroll: true });
}

finish.addEventListener('click', () => {
	if (finishing || !canFinish(state)) return;
	finishing = true;
	const step = () => {
		const action = foundationMove(state);
		if (!action || won(state)) { finishing = false; render(); return; }
		commit(move(state, action.from, action.to));
		finishTimer = setTimeout(step, 90);
	};
	step();
});

async function celebrate() {
	stopAnimation();
	const run = celebrationRun;
	if (!won(state) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	const context = canvas.getContext('2d');
	if (!context) return;
	const bitmaps = images.slice(0, 52).map((src) => { const img = new Image(); img.src = src; return img; });
	await Promise.all(bitmaps.map((img) => img.decode().catch(() => {})));
	if (!won(state) || run !== celebrationRun) return;
	const width = innerWidth, height = innerHeight;
	const scale = Math.min(devicePixelRatio || 1, 2);
	canvas.width = width * scale;
	canvas.height = height * scale;
	context.scale(scale, scale);
	canvas.hidden = false;
	const origins = [...table.querySelectorAll('.top-piles .pile[data-zone="foundations"]')].map((el) => el.getBoundingClientRect());
	const particles = [];
	let emitted = 0, previous = 0, elapsed = 0, lastStamp = 0;
	const frame = (time) => {
		const dt = previous ? Math.min((time - previous) / 1000, .04) : 0;
		previous = time;
		elapsed += dt;
		while (emitted < 52 && elapsed >= emitted * .16) {
			const s = emitted % 4, r = 12 - Math.floor(emitted / 4), rect = origins[s];
			particles.push({ id: s * 13 + r, x: rect.left, y: rect.top, vx: (Math.random() < .5 ? -1 : 1) * (110 + Math.random() * 180), vy: -90 - Math.random() * 140, w: rect.width, h: rect.height });
			emitted++;
		}
		for (const p of particles) {
			p.vy += 850 * dt;
			p.x += p.vx * dt;
			p.y += p.vy * dt;
			if (p.y + p.h >= height && p.vy > 0) { p.y = height - p.h; p.vy *= -.73; }
		}
		// Leave each frame on the canvas: the original Windows victory trail, without accumulating DOM nodes.
		if (elapsed - lastStamp >= 1 / 45) {
			for (const p of particles) if (p.x + p.w > 0 && p.x < width && bitmaps[p.id].naturalWidth) context.drawImage(bitmaps[p.id], p.x, p.y, p.w, p.h);
			lastStamp = elapsed;
		}
		if (elapsed < 18) animation = requestAnimationFrame(frame);
		else stopAnimation();
	};
	animation = requestAnimationFrame(frame);
}

let resizeTimer;
window.addEventListener('resize', () => { stopAnimation(); clearTimeout(resizeTimer); resizeTimer = setTimeout(() => render(), 100); });
window.addEventListener('storage', (event) => {
	if (event.key !== key || !event.newValue) return;
	try {
		const saved = readSave(event.newValue);
		clearTimeout(finishTimer);
		finishing = false;
		stopAnimation();
		clearDrag();
		({ state, history } = saved);
		selected = null;
		render(t('Партия обновлена из другой вкладки', 'Game updated from another tab'));
	} catch { /* Keep the current valid game if another tab writes a damaged save. */ }
});
window.addEventListener('pagehide', () => { clearTimeout(finishTimer); finishing = false; stopAnimation(); });
window.addEventListener('pageshow', () => { render(); });
save();
render(initialMessage);
