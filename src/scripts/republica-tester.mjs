const input = document.querySelector('#republica-input');
const sanitize = (text) => text.replace(/[^A-Za-z0-9 \n.,!?…:;'"“”‘’()\-—–/]/g, '').slice(0, 280);
let state = { text: '', variants: [] };
let beforeSelection = { anchor: 0, focus: 0 };
const undo = [];
const redo = [];

function selection() {
	const current = window.getSelection();
	if (!current || !input.contains(current.anchorNode) || !input.contains(current.focusNode)) return { anchor: 0, focus: 0 };
	const offset = (node, position) => {
		const range = document.createRange();
		range.selectNodeContents(input);
		range.setEnd(node, position);
		return range.toString().length;
	};
	return { anchor: offset(current.anchorNode, current.anchorOffset), focus: offset(current.focusNode, current.focusOffset) };
}

function render(caret) {
	const fragment = document.createDocumentFragment();
	let index = 0;
	for (const part of state.text.match(/\s+|\S+/g) ?? []) {
		if (/^\s/.test(part)) { fragment.append(part); index += part.length; continue; }
		const word = document.createElement('span');
		word.className = 'type-word';
		let plain = '';
		for (const letter of part) {
			if (!state.variants[index++]) { plain += letter; continue; }
			word.append(document.createTextNode(plain));
			plain = '';
			const glyph = document.createElement('span');
			glyph.className = 'republica-glyph';
			glyph.textContent = letter;
			word.append(glyph);
		}
		word.append(document.createTextNode(plain));
		fragment.append(word);
	}
	fragment.append(document.createTextNode(''));
	input.replaceChildren(fragment);
	if (!caret) return;
	const position = (offset) => {
		const walker = document.createTreeWalker(input, NodeFilter.SHOW_TEXT);
		let node = walker.nextNode();
		while (offset > node.length) {
			offset -= node.length;
			const next = walker.nextNode();
			if (!next) return [node, node.length];
			node = next;
		}
		return [node, offset];
	};
	window.getSelection().setBaseAndExtent(...position(caret.anchor), ...position(caret.focus));
}

function update(raw, caret, remember = true) {
	const text = sanitize(raw);
	const nextCaret = caret && { anchor: sanitize(raw.slice(0, caret.anchor)).length, focus: sanitize(raw.slice(0, caret.focus)).length };
	if (text !== state.text) {
		if (remember) {
			// ponytail: retain 100 edits in this small tester; no persistent document history is needed.
			undo.push({ ...state, caret: beforeSelection });
			if (undo.length > 100) undo.shift();
			redo.length = 0;
		}
		let prefix = 0;
		while (prefix < Math.min(state.text.length, text.length) && state.text[prefix] === text[prefix]) prefix++;
		let suffix = 0;
		while (suffix < Math.min(state.text.length, text.length) - prefix && state.text.at(-suffix - 1) === text.at(-suffix - 1)) suffix++;
		state = { text, variants: [
			...state.variants.slice(0, prefix),
			...Array.from(text.slice(prefix, text.length - suffix), (letter) => /[A-Za-z]/.test(letter) && Math.random() < .25),
			...state.variants.slice(state.text.length - suffix),
		] };
		let plainLetters = 0;
		for (let i = 0; i < state.variants.length; i++) {
			if (!/[A-Za-z]/.test(text[i])) continue;
			state.variants[i] = !state.variants[i - 1] && (state.variants[i] || plainLetters === 5);
			plainLetters = state.variants[i] ? 0 : plainLetters + 1;
		}
	}
	render(nextCaret);
}

function insert(text) {
	beforeSelection = selection();
	const start = Math.min(beforeSelection.anchor, beforeSelection.focus);
	const end = Math.max(beforeSelection.anchor, beforeSelection.focus);
	const added = sanitize(text).slice(0, 280 - state.text.length + end - start);
	// Rejected characters must not erase selected text.
	if (!added && text) return;
	update(state.text.slice(0, start) + added + state.text.slice(end), { anchor: start + added.length, focus: start + added.length });
}

function restore(source, destination) {
	if (!source.length) return;
	destination.push({ ...state, caret: selection() });
	state = source.pop();
	render(state.caret);
}

input.addEventListener('beforeinput', (event) => {
	beforeSelection = selection();
	if (event.isComposing) return;
	if (['historyUndo', 'historyRedo'].includes(event.inputType)) {
		event.preventDefault();
		if (event.inputType === 'historyUndo') restore(undo, redo); else restore(redo, undo);
	} else if (['insertParagraph', 'insertLineBreak'].includes(event.inputType)) {
		event.preventDefault();
		insert('\n');
	} else if (event.inputType === 'insertText' && event.data !== null) {
		event.preventDefault();
		insert(event.data);
	}
});
input.addEventListener('input', (event) => { if (!event.isComposing) update(input.textContent, selection()); });
input.addEventListener('compositionend', () => update(input.textContent, selection()));
input.addEventListener('paste', (event) => { event.preventDefault(); insert(event.clipboardData.getData('text/plain')); });
input.addEventListener('keydown', (event) => {
	if (!(event.ctrlKey || event.metaKey) || event.altKey) return;
	if (event.key.toLowerCase() === 'z') {
		event.preventDefault();
		if (event.shiftKey) restore(redo, undo); else restore(undo, redo);
	} else if (event.key.toLowerCase() === 'y') {
		event.preventDefault();
		restore(redo, undo);
	}
});
update(input.textContent, null, false);
