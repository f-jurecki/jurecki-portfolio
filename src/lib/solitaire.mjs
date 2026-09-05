export const cardFiles = [
	[8, 4, 12, 16, 20, 24, 28, 32, 36, 40, 41, 43, 49],
	[7, 3, 11, 15, 19, 23, 27, 31, 35, 39, 42, 46, 50],
	[5, 1, 9, 13, 17, 21, 25, 29, 33, 37, 44, 47, 51],
	[6, 2, 10, 14, 18, 22, 26, 30, 34, 38, 45, 48, 52],
];
export const suit = (id) => Math.floor(id / 13);
export const rank = (id) => id % 13 + 1;
const red = (id) => [0, 3].includes(suit(id));
export const stacks = (lower, upper) => rank(lower) === rank(upper) + 1 && red(lower) !== red(upper);
export const won = (state) => state.foundations.every((pile) => pile.length === 13);

export function deal() {
	const deck = Array.from({ length: 52 }, (_, id) => id);
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
	const tableau = Array.from({ length: 7 }, (_, column) =>
		Array.from({ length: column + 1 }, (_, index) => ({ id: deck.pop(), up: index === column })));
	return { version: 1, stock: deck, waste: [], tableau, foundations: [[], [], [], []], moves: 0 };
}

export function validState(state) {
	if (!state || state.version !== 1 || !Number.isSafeInteger(state.moves) || state.moves < 0) return false;
	if (!Array.isArray(state.stock) || !Array.isArray(state.waste) || !Array.isArray(state.tableau) || state.tableau.length !== 7 || !Array.isArray(state.foundations) || state.foundations.length !== 4) return false;
	if (!state.tableau.every((pile) => Array.isArray(pile) && pile.every((card, i) =>
		card && typeof card.up === 'boolean' && (!i || !pile[i - 1].up || (card.up && stacks(pile[i - 1].id, card.id)))) && (!pile.length || pile.at(-1).up))) return false;
	if (!state.foundations.every((pile, s) => Array.isArray(pile) && pile.every((id, i) => suit(id) === s && rank(id) === i + 1))) return false;
	const cards = [...state.stock, ...state.waste, ...state.tableau.flat().map((card) => card.id), ...state.foundations.flat()];
	return cards.length === 52 && new Set(cards).size === 52 && cards.every((id) => Number.isInteger(id) && id >= 0 && id < 52);
}

export function movable(state, from) {
	if (!from || !Number.isInteger(from.pile) || !Number.isInteger(from.index)) return [];
	if (from.zone === 'tableau') {
		const pile = state.tableau[from.pile];
		if (!pile || from.index < 0 || !pile[from.index]?.up) return [];
		return pile.slice(from.index).map((card) => card.id);
	}
	const pile = from.zone === 'waste' && from.pile === 0 ? state.waste : from.zone === 'foundations' ? state.foundations[from.pile] : null;
	return pile?.length && from.index === pile.length - 1 ? [pile.at(-1)] : [];
}

export function canMove(state, from, to) {
	const cards = movable(state, from);
	if (!cards.length || !to || !Number.isInteger(to.pile) || (from.zone === to.zone && from.pile === to.pile)) return false;
	const id = cards[0];
	if (to.zone === 'foundations') return cards.length === 1 && suit(id) === to.pile && rank(id) === state.foundations[to.pile]?.length + 1;
	if (to.zone !== 'tableau' || !state.tableau[to.pile]) return false;
	const top = state.tableau[to.pile].at(-1);
	return top ? top.up && stacks(top.id, id) : true;
}

export function move(state, from, to) {
	if (!canMove(state, from, to)) return null;
	const next = structuredClone(state);
	const cards = movable(next, from);
	const source = from.zone === 'waste' ? next.waste : next[from.zone][from.pile];
	source.splice(from.index);
	if (from.zone === 'tableau' && source.length) source.at(-1).up = true;
	next[to.zone][to.pile].push(...(to.zone === 'tableau' ? cards.map((id) => ({ id, up: true })) : cards));
	next.moves++;
	return next;
}

export function autoMove(state, from) {
	const [id] = movable(state, from);
	const destinations = [{ zone: 'foundations', pile: suit(id) },
		...state.tableau.map((_, pile) => ({ zone: 'tableau', pile }))];
	const to = destinations.find((destination) => canMove(state, from, destination));
	return to ? move(state, from, to) : null;
}

export function draw(state) {
	if ((!state.stock.length && !state.waste.length) || won(state)) return null;
	const next = structuredClone(state);
	if (next.stock.length) next.waste.push(next.stock.pop());
	else next.stock = next.waste.splice(0).reverse();
	next.moves++;
	return next;
}

export function foundationMove(state) {
	const sources = [{ zone: 'waste', pile: 0, index: state.waste.length - 1 },
		...state.tableau.map((pile, i) => ({ zone: 'tableau', pile: i, index: pile.length - 1 }))];
	for (const from of sources) {
		const [id] = movable(state, from);
		const to = { zone: 'foundations', pile: suit(id) };
		if (canMove(state, from, to)) return { from, to };
	}
	return null;
}

export const canFinish = (state) => !state.stock.length && !state.waste.length && state.tableau.flat().every((card) => card.up) && !won(state);

export function hints(state) {
	if (won(state)) return [];
	const sources = [
		{ zone: 'waste', pile: 0, index: state.waste.length - 1 },
		...state.tableau.flatMap((cards, pile) => cards.flatMap((card, index) => card.up ? [{ zone: 'tableau', pile, index }] : [])),
	];
	const destinations = [
		...state.foundations.map((_, pile) => ({ zone: 'foundations', pile })),
		...state.tableau.map((_, pile) => ({ zone: 'tableau', pile })),
	];
	// ponytail: skip foundation withdrawals to avoid up/down loops; strategic withdrawals need a solver and remain manual.
	const moves = destinations.flatMap((to) => sources.filter((from) =>
		canMove(state, from, to) && !(from.zone === 'tableau' && from.index === 0 && to.zone === 'tableau' && !state.tableau[to.pile].length)
	).map((from) => ({ from, to })));
	if (state.stock.length || state.waste.length) moves.push({ draw: true });
	return moves;
}
