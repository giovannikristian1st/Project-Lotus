const fs = require('fs');
const vm = require('vm');

// 1. Setup mock DOM
const elements = {};
function getOrCreateEl(id) {
  if (!elements[id]) {
    elements[id] = {
      id: id,
      style: {},
      classList: {
        add: () => {},
        remove: () => {},
        contains: () => false
      },
      innerText: '',
      innerHTML: '',
      children: [],
      appendChild: (child) => { elements[id].children.push(child); },
      addEventListener: () => {}
    };
  }
  return elements[id];
}

// Pre-populate elements with initial HTML values from quiz.html
getOrCreateEl('score-val').innerText = '0';
getOrCreateEl('timer-label').innerText = 'Waktu';
getOrCreateEl('timer-val').innerText = '30';
getOrCreateEl('lives-container').innerText = '❤️❤️❤️';
getOrCreateEl('q-num').innerText = 'Pertanyaan';
getOrCreateEl('q-text').innerText = 'Menyiapkan kuis...';
getOrCreateEl('options-grid');
getOrCreateEl('game-over-screen');
getOrCreateEl('timer-bar');
getOrCreateEl('timer-badge');
getOrCreateEl('timer-bar-wrapper');
getOrCreateEl('q-img');
getOrCreateEl('q-audio-box');
getOrCreateEl('q-audio');
getOrCreateEl('multi-submit-box');

const messageListeners = [];

const windowMock = {
  addEventListener: (event, handler) => {
    if (event === 'message') messageListeners.push(handler);
  },
  removeEventListener: () => {},
  location: {
    search: '?id=proj-1&theme=cyberpunk'
  },
  localStorage: {
    data: {},
    getItem(k) { return this.data[k] || null; },
    setItem(k, v) { this.data[k] = String(v); },
    removeItem(k) { delete this.data[k]; }
  },
  URLSearchParams: class {
    constructor(s) {
      this.params = new URLSearchParams(s);
    }
    get(k) { return this.params.get(k); }
  },
  AudioContext: class {
    createOscillator() { return { connect: () => {}, start: () => {}, stop: () => {} }; }
    createGain() { return { connect: () => {}, gain: { value: 1, exponentialRampToValueAtTime: () => {} } }; }
  },
  document: {
    body: {
      classList: {
        add: () => {},
        remove: () => {}
      }
    },
    getElementById: (id) => getOrCreateEl(id),
    createElement: (tag) => ({
      tagName: tag,
      style: {},
      classList: { add: () => {}, remove: () => {} },
      appendChild: () => {},
      onclick: null
    })
  },
  setInterval: (fn, ms) => 123,
  clearInterval: (id) => {}
};
windowMock.window = windowMock;

// Setup context
const ctx = vm.createContext(windowMock);

// Read actual files
const sfxCode = fs.readFileSync('games/common/sfx.js', 'utf8');
const confettiCode = fs.readFileSync('games/common/confetti.js', 'utf8');
const themesCode = fs.readFileSync('games/common/themes.js', 'utf8');
const bridgeCode = fs.readFileSync('games/common/bridge.js', 'utf8');

const quizHtml = fs.readFileSync('games/quiz.html', 'utf8');
const inlineScriptMatch = quizHtml.match(/<script>([\s\S]*?)<\/script>/);
const quizScript = inlineScriptMatch[1];

// Load sample projects into mock localStorage
const dbLocalCode = fs.readFileSync('games/common/db-local.js', 'utf8');
const initialProjects = eval(dbLocalCode.match(/const INITIAL_PROJECTS = (\[[\s\S]*?\n\];)/)[1]);
const proj1 = initialProjects[0];

windowMock.localStorage.setItem('lotus_projects', JSON.stringify(initialProjects));
windowMock.localStorage.setItem('activity_' + proj1.id, JSON.stringify(proj1));
windowMock.localStorage.setItem('current_game_activity', JSON.stringify(proj1));

console.log('--- Step 1: Executing common scripts ---');
vm.runInContext(sfxCode, ctx);
vm.runInContext(confettiCode, ctx);
vm.runInContext(themesCode, ctx);
vm.runInContext(bridgeCode, ctx);

console.log('--- Step 2: Executing quiz inline script ---');
vm.runInContext(quizScript, ctx);

console.log('After initial run:');
console.log('q-num text:', elements['q-num'].innerText);
console.log('q-text text:', elements['q-text'].innerText);

console.log('--- Step 3: Simulating iframe onload postMessage ---');
messageListeners.forEach(h => {
  h({
    data: {
      type: 'INIT_ACTIVITY',
      activity: proj1,
      playerName: 'Budi Prasetyo, S.Pd.',
      playerClass: 'Kelas Demo'
    }
  });
});

console.log('After postMessage:');
console.log('q-num text:', elements['q-num'].innerText);
console.log('q-text text:', elements['q-text'].innerText);
