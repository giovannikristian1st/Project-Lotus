const fs = require('fs');
const vm = require('vm');

const games = fs.readdirSync('games').filter(f => f.endsWith('.html'));

const sfxCode = fs.readFileSync('games/common/sfx.js', 'utf8');
const confettiCode = fs.readFileSync('games/common/confetti.js', 'utf8');
const themesCode = fs.readFileSync('games/common/themes.js', 'utf8');
const bridgeCode = fs.readFileSync('games/common/bridge.js', 'utf8');

const dbLocalCode = fs.readFileSync('games/common/db-local.js', 'utf8');
const initialProjects = eval(dbLocalCode.match(/const INITIAL_PROJECTS = (\[[\s\S]*?\n\];)/)[1]);
const proj1 = initialProjects[0];

console.log('Testing all 12 games:');

games.forEach(gameFile => {
  const elements = {};
  function getEl(id) {
    if (!elements[id]) {
      elements[id] = {
        id,
        style: {},
        classList: { add: () => {}, remove: () => {} },
        innerText: '',
        innerHTML: '',
        appendChild: () => {},
        addEventListener: () => {},
        getContext: () => ({
          clearRect: () => {},
          beginPath: () => {},
          arc: () => {},
          fill: () => {},
          stroke: () => {},
          save: () => {},
          restore: () => {},
          translate: () => {},
          rotate: () => {},
          fillText: () => {},
          measureText: () => ({ width: 50 })
        })
      };
    }
    return elements[id];
  }

  const windowMock = {
    addEventListener: () => {},
    removeEventListener: () => {},
    location: { search: '?id=proj-1&theme=cyberpunk' },
    localStorage: {
      data: {
        'lotus_projects': JSON.stringify(initialProjects),
        'activity_proj-1': JSON.stringify(proj1),
        'current_game_activity': JSON.stringify(proj1)
      },
      getItem(k) { return this.data[k] || null; },
      setItem(k, v) { this.data[k] = String(v); }
    },
    URLSearchParams: class {
      constructor(s) { this.params = new URLSearchParams(s); }
      get(k) { return this.params.get(k); }
    },
    AudioContext: class {
      createOscillator() { return { connect: () => {}, start: () => {}, stop: () => {} }; }
      createGain() { return { connect: () => {}, gain: { value: 1, exponentialRampToValueAtTime: () => {} } }; }
    },
    document: {
      body: { classList: { add: () => {}, remove: () => {} } },
      getElementById: (id) => getEl(id),
      createElement: () => ({ style: {}, classList: { add: () => {} }, appendChild: () => {}, dataset: {}, setAttribute: () => {}, addEventListener: () => {} }),
      querySelectorAll: () => []
    },
    setInterval: () => 1,
    clearInterval: () => {},
    setTimeout: (cb) => { if (typeof cb === 'function') cb(); return 1; },
    clearTimeout: () => {},
    requestAnimationFrame: (cb) => 1
  };
  windowMock.window = windowMock;

  const ctx = vm.createContext(windowMock);

  try {
    vm.runInContext(sfxCode, ctx);
    vm.runInContext(confettiCode, ctx);
    vm.runInContext(themesCode, ctx);
    vm.runInContext(bridgeCode, ctx);

    const html = fs.readFileSync('games/' + gameFile, 'utf8');
    const inlineMatch = html.match(/<script>([\s\S]*?)<\/script>/);
    if (inlineMatch) {
      vm.runInContext(inlineMatch[1], ctx);
      console.log('✓', gameFile.padEnd(20), 'LOADED OK');
    } else {
      console.log('?', gameFile.padEnd(20), 'No inline script found');
    }
  } catch (e) {
    console.error('✗', gameFile.padEnd(20), 'FAILED:', e.message);
  }
});
