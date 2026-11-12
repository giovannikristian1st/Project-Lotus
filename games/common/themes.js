/**
 * themes.js: Pengelola Tema Visual LotusWall
 * Mendukung Tema: 'white' (Putih Bersih) & 'magical' (Magical World - Ungu & Serbuk Ajaib)
 */
const THEMES = [
  { id: 'white', name: 'Putih Bersih', icon: '⚪', desc: 'Tema putih bersih teks hitam tajam', spritesheet: 'spritesheet.svg' },
  { id: 'magical', name: 'Magical World', icon: '🔮', desc: 'Ungu terang kristal & serbuk peri ajaib', spritesheet: 'spritesheet-magical.svg' }
];

let activeThemeId = 'white';
let hasThemeOverride = false;

function applyTheme(themeId, force = false) {
  if (!document.body) return;
  if (force) {
    hasThemeOverride = true;
  }
  const urlTheme = detectThemeFromURL();
  let chosen;
  if (force) {
    chosen = (themeId === 'magical') ? 'magical' : 'white';
  } else if (hasThemeOverride) {
    chosen = activeThemeId;
  } else {
    chosen = urlTheme || (themeId === 'magical' ? 'magical' : 'white');
  }
  const targetTheme = (chosen === 'magical') ? 'magical' : 'white';
  activeThemeId = targetTheme;

  document.body.classList.remove('theme-white', 'theme-magical', 'theme-cyberpunk', 'theme-darksoul', 'theme-unicorn', 'theme-harrypotter');
  
  if (targetTheme === 'magical') {
    document.body.classList.add('theme-magical');
    if (document.documentElement && document.documentElement.style) {
      document.documentElement.style.setProperty('--spritesheet-url', "url('common/spritesheet-magical.svg')");
    }
  } else {
    document.body.classList.add('theme-white');
    if (document.documentElement && document.documentElement.style) {
      document.documentElement.style.setProperty('--spritesheet-url', "url('common/spritesheet.svg')");
    }
  }

  // Notifikasi jika ada canvas game yang membutuhkan pergantian image sprite
  if (window.onLotusThemeChanged && typeof window.onLotusThemeChanged === 'function') {
    window.onLotusThemeChanged(targetTheme);
  }
}

// Deteksi theme dari parameter URL ?theme=magical
function detectThemeFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const t = urlParams.get('theme');
  if (t === 'magical' || t === 'white') {
    return t;
  }
  return null;
}

// Listen postMessage dari parent (Dashboard Guru atau Next.js Player)
window.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'THEME_CHANGE') {
    applyTheme(e.data.theme, true);
  }
});

// Auto-apply pada saat dokumen selesai dimuat
(function initThemeOnLoad() {
  const initialTheme = detectThemeFromURL() || 'white';
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyTheme(initialTheme));
  } else {
    applyTheme(initialTheme);
  }
})();

window.LotusThemes = {
  list: THEMES,
  apply: applyTheme,
  getActive: () => activeThemeId
};
