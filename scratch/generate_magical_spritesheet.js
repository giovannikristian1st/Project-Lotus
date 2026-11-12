// scratch/generate_magical_spritesheet.js
// Generates the 'Magical World' Theme Spritesheet (1024x1024)
// Bright Purple Hue (#c084fc, #9333ea, #a855f7) with White Fairy Dust & Sparkles.

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function buildMagicalSVG() {
  const width = 1024;
  const height = 1024;

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <!-- Filter Shadows & Glows -->
    <filter id="magical-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#c084fc" flood-opacity="0.75"/>
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#581c87" flood-opacity="0.3"/>
    </filter>
    <filter id="stardust-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#ffffff" flood-opacity="0.9"/>
      <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#e879f9" flood-opacity="0.8"/>
    </filter>
    <filter id="void-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="7" flood-color="#a855f7" flood-opacity="0.85"/>
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.6"/>
    </filter>

    <!-- Gradients -->
    <linearGradient id="grad-amethyst" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f5d0fe"/>
      <stop offset="50%" stop-color="#c084fc"/>
      <stop offset="100%" stop-color="#9333ea"/>
    </linearGradient>
    <linearGradient id="grad-royal-purple" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="50%" stop-color="#7e22ce"/>
      <stop offset="100%" stop-color="#581c87"/>
    </linearGradient>
    <linearGradient id="grad-stardust-card" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="#faf5ff"/>
      <stop offset="100%" stop-color="#f3e8ff"/>
    </linearGradient>
    <linearGradient id="grad-crystal-emerald" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#a7f3d0"/>
      <stop offset="50%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <linearGradient id="grad-crystal-rose" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fbcfe8"/>
      <stop offset="50%" stop-color="#f43f5e"/>
      <stop offset="100%" stop-color="#be123c"/>
    </linearGradient>
    <linearGradient id="grad-crystal-gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#facc15"/>
      <stop offset="100%" stop-color="#ca8a04"/>
    </linearGradient>
    <linearGradient id="grad-cosmic-void" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2e1065"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#3b0764"/>
    </linearGradient>
  </defs>

  <!-- Reusable Sparkle / Fairy Dust Macro -->
  <!-- ✦ Sparkle Shape -->

  <!-- ========================================================================
       ROW 0 (y=0): Universal UI & HUD Essentials (Magical Theme)
       ======================================================================== -->
  <!-- [0, 0]: stat-badge-pill -->
  <g id="magical-stat-badge-pill" transform="translate(0, 0)">
    <rect x="8" y="34" width="112" height="60" rx="30" fill="url(#grad-stardust-card)" stroke="#c084fc" stroke-width="3.5" filter="url(#magical-glow)"/>
    <circle cx="36" cy="64" r="14" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/>
    <polygon points="36,54 39,61 46,64 39,67 36,74 33,67 26,64 33,61" fill="#9333ea"/>
    <!-- Fairy dust sparkles -->
    <circle cx="96" cy="48" r="2.5" fill="#ffffff" filter="url(#stardust-glow)"/>
    <circle cx="84" cy="78" r="2" fill="#c084fc"/>
    <rect x="56" y="58" width="48" height="12" rx="6" fill="#e9d5ff"/>
  </g>

  <!-- [1, 0]: heart-life (Kristal Hati Ajaib Bersinar) -->
  <g id="magical-heart-life" transform="translate(128, 0)">
    <path d="M 64 96 C 24 64, 18 36, 38 24 C 52 15, 60 24, 64 32 C 68 24, 76 15, 90 24 C 110 36, 104 64, 64 96 Z"
          fill="url(#grad-crystal-rose)" stroke="#f472b6" stroke-width="3.5" filter="url(#magical-glow)"/>
    <!-- Crystal facet highlight -->
    <polygon points="64,36 44,48 64,86 84,48" fill="#ffffff" opacity="0.35"/>
    <polygon points="38,26 48,38 34,48" fill="#ffffff" opacity="0.5"/>
    <!-- Stardust sparkles -->
    <polygon points="26,20 28,24 32,26 28,28 26,32 24,28 20,26 24,24" fill="#ffffff" filter="url(#stardust-glow)"/>
    <polygon points="102,68 104,71 107,72 104,73 102,76 100,73 97,72 100,71" fill="#ffffff"/>
  </g>

  <!-- [2, 0]: star-score (Bintang Grand Sorcerer 8 Sudut) -->
  <g id="magical-star-score" transform="translate(256, 0)">
    <!-- Outer aura -->
    <circle cx="64" cy="64" r="44" fill="#fae8ff" opacity="0.4"/>
    <polygon points="64,12 75,44 107,37 84,60 114,78 80,82 78,114 64,88 50,114 48,82 14,78 44,60 21,37 53,44"
             fill="url(#grad-amethyst)" stroke="#ffffff" stroke-width="3" filter="url(#magical-glow)"/>
    <!-- Inner star core -->
    <polygon points="64,28 72,52 96,56 78,72 84,96 64,82 44,96 50,72 32,56 56,52" fill="url(#grad-crystal-gold)"/>
    <circle cx="64" cy="64" r="8" fill="#ffffff" filter="url(#stardust-glow)"/>
  </g>

  <!-- [3, 0]: clock-timer (Time Crystal Pendulum & Serbuk Waktu) -->
  <g id="magical-clock-timer" transform="translate(384, 0)">
    <circle cx="64" cy="64" r="46" fill="url(#grad-stardust-card)" stroke="#c084fc" stroke-width="4" filter="url(#magical-glow)"/>
    <!-- Arcane ring -->
    <circle cx="64" cy="64" r="38" fill="none" stroke="#e9d5ff" stroke-width="2" stroke-dasharray="4,4"/>
    <!-- Hourglass shape inside -->
    <path d="M 44 38 L 84 38 L 68 64 L 84 90 L 44 90 L 60 64 Z" fill="#f3e8ff" stroke="#a855f7" stroke-width="2.5"/>
    <path d="M 48 84 L 80 84 L 64 68 Z" fill="#9333ea"/>
    <!-- Stardust stream -->
    <circle cx="64" cy="60" r="2" fill="#ffffff" filter="url(#stardust-glow)"/>
    <circle cx="64" cy="68" r="2.5" fill="#fbcfe8"/>
    <polygon points="98,28 100,32 104,33 100,34 98,38 96,34 92,33 96,32" fill="#ffffff"/>
  </g>

  <!-- [4, 0]: badge-correct (Segel Sihir Zamrud-Amethyst) -->
  <g id="magical-badge-correct" transform="translate(512, 0)">
    <circle cx="64" cy="64" r="44" fill="url(#grad-crystal-emerald)" stroke="#ffffff" stroke-width="4" filter="url(#stardust-glow)"/>
    <circle cx="64" cy="64" r="38" fill="none" stroke="#a7f3d0" stroke-width="2" stroke-dasharray="6,4"/>
    <path d="M 40 64 L 56 80 L 88 46" fill="none" stroke="#ffffff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="92" cy="30" r="3" fill="#ffffff"/>
  </g>

  <!-- [5, 0]: badge-wrong (Segel Kutukan Ruby-Amethyst) -->
  <g id="magical-badge-wrong" transform="translate(640, 0)">
    <circle cx="64" cy="64" r="44" fill="url(#grad-crystal-rose)" stroke="#ffffff" stroke-width="4" filter="url(#stardust-glow)"/>
    <circle cx="64" cy="64" r="38" fill="none" stroke="#fbcfe8" stroke-width="2" stroke-dasharray="6,4"/>
    <line x1="44" y1="44" x2="84" y2="84" stroke="#ffffff" stroke-width="9" stroke-linecap="round"/>
    <line x1="84" y1="44" x2="44" y2="84" stroke="#ffffff" stroke-width="9" stroke-linecap="round"/>
    <circle cx="34" cy="28" r="3" fill="#ffffff"/>
  </g>

  <!-- [6, 0]: powerup-5050 (Kitab Petir Sihir) -->
  <g id="magical-powerup-5050" transform="translate(768, 0)">
    <circle cx="64" cy="64" r="44" fill="url(#grad-royal-purple)" stroke="#e879f9" stroke-width="4" filter="url(#magical-glow)"/>
    <polygon points="70,24 42,62 60,62 50,100 86,54 68,54" fill="#fef08a" stroke="#ffffff" stroke-width="2" filter="url(#stardust-glow)"/>
    <rect x="34" y="90" width="60" height="20" rx="10" fill="#fdf4ff" stroke="#c084fc" stroke-width="1.5"/>
    <text x="64" y="104" font-family="'Poppins', sans-serif" font-weight="900" font-size="11" fill="#7e22ce" text-anchor="middle">50:50</text>
  </g>

  <!-- [7, 0]: powerup-freeze (Kristal Es Beku Violet) -->
  <g id="magical-powerup-freeze" transform="translate(896, 0)">
    <circle cx="64" cy="64" r="44" fill="url(#grad-amethyst)" stroke="#ffffff" stroke-width="4" filter="url(#stardust-glow)"/>
    <!-- Snowflake with purple facets -->
    <line x1="64" y1="28" x2="64" y2="100" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
    <line x1="28" y1="64" x2="100" y2="64" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
    <line x1="38" y1="38" x2="90" y2="90" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="90" y1="38" x2="38" y2="90" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
    <polygon points="64,54 74,64 64,74 54,64" fill="#fdf4ff"/>
  </g>


  <!-- ========================================================================
       ROW 1 (y=128): Kuis & Benar-Salah (Magical Grimoire & Crystal Boxes)
       ======================================================================== -->
  <!-- [0, 1]: quiz-question-box (Kotak Soal Grimoire Kristal) -->
  <g id="magical-quiz-question-box" transform="translate(0, 128)">
    <rect x="8" y="14" width="112" height="100" rx="20" fill="url(#grad-stardust-card)" stroke="#c084fc" stroke-width="4" filter="url(#magical-glow)"/>
    <!-- Header Gem Band -->
    <path d="M 8 32 C 8 22, 18 14, 28 14 L 100 14 C 110 14, 120 22, 120 32 L 120 40 L 8 40 Z" fill="url(#grad-amethyst)"/>
    <!-- Corner Gem Runes -->
    <polygon points="20,27 24,23 28,27 24,31" fill="#ffffff"/>
    <polygon points="108,27 104,23 100,27 104,31" fill="#ffffff"/>
    <text x="64" y="32" font-family="'Poppins', sans-serif" font-weight="900" font-size="10" fill="#ffffff" text-anchor="middle">SOAL MANTRA</text>
    <!-- Center Orb Question Icon -->
    <circle cx="64" cy="74" r="22" fill="#faf5ff" stroke="#d8b4fe" stroke-width="2"/>
    <text x="64" y="82" font-family="'Poppins', sans-serif" font-weight="900" font-size="24" fill="#9333ea" text-anchor="middle">?</text>
    <!-- Stardust sparkles -->
    <polygon points="16,92 18,95 21,96 18,97 16,100 14,97 11,96 14,95" fill="#c084fc"/>
    <polygon points="112,88 114,91 117,92 114,93 112,96 110,93 107,92 110,91" fill="#c084fc"/>
  </g>

  <!-- [1, 1]: quiz-answer-box (Kotak Jawaban Kristal Normal) -->
  <g id="magical-quiz-answer-box" transform="translate(128, 128)">
    <rect x="8" y="24" width="112" height="80" rx="18" fill="url(#grad-stardust-card)" stroke="#d8b4fe" stroke-width="3" filter="url(#magical-glow)"/>
    <!-- Amethyst Gem Badge for A -->
    <rect x="18" y="36" width="30" height="56" rx="12" fill="url(#grad-amethyst)"/>
    <text x="33" y="70" font-family="'Poppins', sans-serif" font-weight="900" font-size="18" fill="#ffffff" text-anchor="middle">A</text>
    <line x1="58" y1="52" x2="108" y2="52" stroke="#9333ea" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="58" y1="74" x2="96" y2="74" stroke="#c084fc" stroke-width="4" stroke-linecap="round"/>
    <!-- Sparkle dot -->
    <circle cx="106" cy="36" r="2.5" fill="#a855f7"/>
  </g>

  <!-- [2, 1]: quiz-answer-hover (Kotak Jawaban Pendaran Violet) -->
  <g id="magical-quiz-answer-hover" transform="translate(256, 128)">
    <rect x="8" y="24" width="112" height="80" rx="18" fill="#fdf4ff" stroke="#a855f7" stroke-width="4" filter="url(#stardust-glow)"/>
    <rect x="18" y="36" width="30" height="56" rx="12" fill="url(#grad-royal-purple)"/>
    <text x="33" y="70" font-family="'Poppins', sans-serif" font-weight="900" font-size="18" fill="#fdf4ff" text-anchor="middle">A</text>
    <line x1="58" y1="52" x2="108" y2="52" stroke="#7e22ce" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="58" y1="74" x2="96" y2="74" stroke="#c084fc" stroke-width="4" stroke-linecap="round"/>
    <polygon points="106,32 108,35 111,36 108,37 106,40 104,37 101,36 104,35" fill="#a855f7"/>
  </g>

  <!-- [3, 1]: quiz-answer-correct (Kotak Jawaban Berkat Hijau Ajaib) -->
  <g id="magical-quiz-answer-correct" transform="translate(384, 128)">
    <rect x="8" y="24" width="112" height="80" rx="18" fill="#f0fdf4" stroke="#10b981" stroke-width="4" filter="url(#stardust-glow)"/>
    <circle cx="34" cy="64" r="18" fill="url(#grad-crystal-emerald)"/>
    <path d="M 26 64 L 32 70 L 42 56" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="58" y1="52" x2="108" y2="52" stroke="#047857" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="58" y1="74" x2="96" y2="74" stroke="#34d399" stroke-width="4" stroke-linecap="round"/>
    <circle cx="106" cy="34" r="3" fill="#10b981"/>
  </g>

  <!-- [4, 1]: quiz-answer-wrong (Kotak Jawaban Peringatan Kutukan Merah) -->
  <g id="magical-quiz-answer-wrong" transform="translate(512, 128)">
    <rect x="8" y="24" width="112" height="80" rx="18" fill="#fff1f2" stroke="#f43f5e" stroke-width="4" filter="url(#stardust-glow)"/>
    <circle cx="34" cy="64" r="18" fill="url(#grad-crystal-rose)"/>
    <line x1="26" y1="56" x2="42" y2="72" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
    <line x1="42" y1="56" x2="26" y2="72" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
    <line x1="58" y1="52" x2="108" y2="52" stroke="#be123c" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="58" y1="74" x2="96" y2="74" stroke="#fb7185" stroke-width="4" stroke-linecap="round"/>
  </g>

  <!-- [5, 1]: truefalse-card-box (Kartu Pernyataan Perkamen Sihir) -->
  <g id="magical-truefalse-card-box" transform="translate(640, 128)">
    <rect x="8" y="16" width="112" height="96" rx="18" fill="url(#grad-stardust-card)" stroke="#c084fc" stroke-width="3.5" filter="url(#magical-glow)"/>
    <rect x="14" y="22" width="100" height="26" rx="10" fill="url(#grad-amethyst)"/>
    <text x="64" y="39" font-family="'Poppins', sans-serif" font-weight="900" font-size="10" fill="#ffffff" text-anchor="middle">PERNYATAAN MANTRA</text>
    <line x1="20" y1="62" x2="108" y2="62" stroke="#581c87" stroke-width="4" stroke-linecap="round"/>
    <line x1="20" y1="80" x2="92" y2="80" stroke="#7e22ce" stroke-width="4" stroke-linecap="round"/>
    <line x1="20" y1="96" x2="72" y2="96" stroke="#c084fc" stroke-width="4" stroke-linecap="round"/>
  </g>

  <!-- [6, 1]: btn-true-box (Tombol Kristal BENAR Zamrud-Ungu) -->
  <g id="magical-btn-true-box" transform="translate(768, 128)">
    <rect x="8" y="24" width="112" height="80" rx="20" fill="url(#grad-crystal-emerald)" stroke="#ffffff" stroke-width="3.5" filter="url(#magical-glow)"/>
    <circle cx="36" cy="64" r="18" fill="#ffffff"/>
    <path d="M 28 64 L 34 70 L 44 56" fill="none" stroke="#059669" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="80" y="70" font-family="'Poppins', sans-serif" font-weight="900" font-size="15" fill="#ffffff" text-anchor="middle">BENAR</text>
    <polygon points="108,32 110,35 113,36 110,37 108,40 106,37 103,36 106,35" fill="#ffffff"/>
  </g>

  <!-- [7, 1]: btn-false-box (Tombol Kristal SALAH Ruby-Ungu) -->
  <g id="magical-btn-false-box" transform="translate(896, 128)">
    <rect x="8" y="24" width="112" height="80" rx="20" fill="url(#grad-crystal-rose)" stroke="#ffffff" stroke-width="3.5" filter="url(#magical-glow)"/>
    <circle cx="36" cy="64" r="18" fill="#ffffff"/>
    <line x1="28" y1="56" x2="44" y2="72" stroke="#e11d48" stroke-width="4" stroke-linecap="round"/>
    <line x1="44" y1="56" x2="28" y2="72" stroke="#e11d48" stroke-width="4" stroke-linecap="round"/>
    <text x="80" y="70" font-family="'Poppins', sans-serif" font-weight="900" font-size="15" fill="#ffffff" text-anchor="middle">SALAH</text>
    <polygon points="108,32 110,35 113,36 110,37 108,40 106,37 103,36 106,35" fill="#ffffff"/>
  </g>


  <!-- ========================================================================
       ROW 2 (y=256): Buka Kotak & Flip Tiles (Peti Ajaib & Mandala Kartu)
       ======================================================================== -->
  <!-- [0, 2]: box-closed (Peti Harta Karun Kristal Tertutup) -->
  <g id="magical-box-closed" transform="translate(0, 256)">
    <rect x="18" y="44" width="92" height="70" rx="16" fill="url(#grad-stardust-card)" stroke="#9333ea" stroke-width="4" filter="url(#magical-glow)"/>
    <!-- Lid band -->
    <rect x="12" y="32" width="104" height="24" rx="10" fill="url(#grad-royal-purple)" stroke="#c084fc" stroke-width="2"/>
    <!-- Vertical Arcane Gold Band -->
    <rect x="56" y="32" width="16" height="82" fill="url(#grad-crystal-gold)"/>
    <!-- Mystic Lock -->
    <circle cx="64" cy="64" r="12" fill="#ffffff" stroke="#9333ea" stroke-width="3"/>
    <circle cx="64" cy="64" r="5" fill="#c084fc"/>
    <!-- Stardust sparkles around chest -->
    <polygon points="20,24 22,27 25,28 22,29 20,32 18,29 15,28 18,27" fill="#c084fc" filter="url(#stardust-glow)"/>
    <polygon points="106,86 108,89 111,90 108,91 106,94 104,91 101,90 104,89" fill="#ffffff"/>
    <text x="64" y="96" font-family="'Poppins', sans-serif" font-weight="900" font-size="20" fill="#581c87" text-anchor="middle">1</text>
  </g>

  <!-- [1, 2]: box-open (Peti Terbuka Memancarkan Cahaya Bintang) -->
  <g id="magical-box-open" transform="translate(128, 256)">
    <!-- Radiance beams -->
    <polygon points="64,30 18,0 36,0" fill="#fdf4ff" opacity="0.8" filter="url(#stardust-glow)"/>
    <polygon points="64,30 58,0 70,0" fill="#ffffff" opacity="0.9"/>
    <polygon points="64,30 92,0 110,0" fill="#fdf4ff" opacity="0.8" filter="url(#stardust-glow)"/>
    <!-- Chest Body -->
    <rect x="18" y="52" width="92" height="62" rx="16" fill="url(#grad-stardust-card)" stroke="#a855f7" stroke-width="4" filter="url(#magical-glow)"/>
    <ellipse cx="64" cy="52" rx="46" ry="14" fill="#fae8ff"/>
    <rect x="56" y="52" width="16" height="62" fill="url(#grad-crystal-gold)"/>
    <!-- Floating Grand Sorcerer Jewel -->
    <polygon points="64,26 74,44 92,46 78,58 82,76 64,66 46,76 50,58 36,46 54,44" fill="url(#grad-amethyst)" stroke="#ffffff" stroke-width="2"/>
  </g>

  <!-- [2, 2]: box-gold (Peti Kristal Emas Archmage) -->
  <g id="magical-box-gold" transform="translate(256, 256)">
    <rect x="18" y="44" width="92" height="70" rx="16" fill="url(#grad-crystal-gold)" stroke="#78350f" stroke-width="4" filter="url(#stardust-glow)"/>
    <rect x="12" y="32" width="104" height="24" rx="10" fill="#a855f7" stroke="#ffffff" stroke-width="2"/>
    <rect x="56" y="32" width="16" height="82" fill="#ffffff" opacity="0.8"/>
    <circle cx="64" cy="74" r="16" fill="#581c87" stroke="#ffffff" stroke-width="2"/>
    <polygon points="64,64 68,71 76,72 70,77 72,85 64,81 56,85 58,77 52,72 60,71" fill="#fef08a"/>
  </g>

  <!-- [3, 2]: box-lid (Tutup Peti Melayang Bercahaya) -->
  <g id="magical-box-lid" transform="translate(384, 256)">
    <g transform="rotate(-18 64 54)">
      <rect x="12" y="44" width="104" height="26" rx="10" fill="url(#grad-royal-purple)" stroke="#e9d5ff" stroke-width="3" filter="url(#magical-glow)"/>
      <rect x="56" y="44" width="16" height="26" fill="url(#grad-crystal-gold)"/>
      <circle cx="64" cy="44" r="8" fill="#ffffff" stroke="#c084fc" stroke-width="2"/>
    </g>
  </g>

  <!-- [4, 2]: card-back (Mandala Bintang Sihir Flip Tiles) -->
  <g id="magical-card-back" transform="translate(512, 256)">
    <rect x="16" y="12" width="96" height="104" rx="18" fill="url(#grad-royal-purple)" stroke="#e879f9" stroke-width="3.5" filter="url(#magical-glow)"/>
    <rect x="22" y="18" width="84" height="92" rx="12" fill="none" stroke="#d8b4fe" stroke-width="2" stroke-dasharray="4,4"/>
    <!-- Arcane Mandala Star -->
    <circle cx="64" cy="64" r="28" fill="none" stroke="#ffffff" stroke-width="2"/>
    <polygon points="64,38 72,56 90,64 72,72 64,90 56,72 38,64 56,56" fill="#f5d0fe" opacity="0.9"/>
    <circle cx="64" cy="64" r="8" fill="#ffffff" filter="url(#stardust-glow)"/>
  </g>

  <!-- [5, 2]: card-front (Depan Kartu Kristal Luminous) -->
  <g id="magical-card-front" transform="translate(640, 256)">
    <rect x="16" y="12" width="96" height="104" rx="18" fill="url(#grad-stardust-card)" stroke="#c084fc" stroke-width="3.5" filter="url(#magical-glow)"/>
    <circle cx="64" cy="56" r="24" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/>
    <text x="64" y="65" font-family="'Poppins', sans-serif" font-weight="900" font-size="26" fill="#7e22ce" text-anchor="middle">A</text>
    <rect x="34" y="88" width="60" height="8" rx="4" fill="#d8b4fe"/>
    <circle cx="86" cy="24" r="2.5" fill="#a855f7"/>
  </g>

  <!-- [6, 2]: card-matched (Kartu Cocok Bercahaya Emas & Peri) -->
  <g id="magical-card-matched" transform="translate(768, 256)">
    <rect x="16" y="12" width="96" height="104" rx="18" fill="#faf5ff" stroke="#10b981" stroke-width="4" filter="url(#stardust-glow)"/>
    <circle cx="64" cy="54" r="24" fill="url(#grad-crystal-emerald)"/>
    <path d="M 52 54 L 60 62 L 76 46" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="64" y="96" font-family="'Poppins', sans-serif" font-weight="900" font-size="11" fill="#047857" text-anchor="middle">MATCHED</text>
  </g>

  <!-- [7, 2]: card-placeholder (Slot Konstelasi Kartu Kosong) -->
  <g id="magical-card-placeholder" transform="translate(896, 256)">
    <rect x="16" y="12" width="96" height="104" rx="18" fill="#faf5ff" stroke="#c084fc" stroke-width="3" stroke-dasharray="6,6"/>
    <circle cx="64" cy="64" r="16" fill="#f3e8ff"/>
    <polygon points="64,54 67,61 74,64 67,67 64,74 61,67 54,64 61,61" fill="#c084fc"/>
  </g>


  <!-- ========================================================================
       ROW 3 (y=384): Menjodohkan & Pengelompokan (Kuali & Meja Alkimia)
       ======================================================================== -->
  <!-- [0, 3]: matchup-prompt-box (Kotak Soal Perkamen Mantra) -->
  <g id="magical-matchup-prompt-box" transform="translate(0, 384)">
    <rect x="8" y="20" width="112" height="88" rx="18" fill="url(#grad-stardust-card)" stroke="#c084fc" stroke-width="3.5" filter="url(#magical-glow)"/>
    <rect x="16" y="28" width="96" height="22" rx="8" fill="url(#grad-amethyst)"/>
    <text x="64" y="43" font-family="'Poppins', sans-serif" font-weight="900" font-size="10" fill="#ffffff" text-anchor="middle">PASANGAN MANTRA</text>
    <circle cx="28" cy="70" r="8" fill="#9333ea"/>
    <line x1="42" y1="70" x2="104" y2="70" stroke="#581c87" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="42" y1="86" x2="88" y2="86" stroke="#c084fc" stroke-width="4" stroke-linecap="round"/>
  </g>

  <!-- [1, 3]: matchup-slot-box (Lingkaran Pemanggilan Target Dropzone) -->
  <g id="magical-matchup-slot-box" transform="translate(128, 384)">
    <rect x="8" y="20" width="112" height="88" rx="18" fill="#faf5ff" stroke="#a855f7" stroke-width="3.5" stroke-dasharray="6,6"/>
    <rect x="22" y="44" width="84" height="40" rx="12" fill="#f3e8ff" stroke="#d8b4fe" stroke-width="2"/>
    <text x="64" y="68" font-family="'Poppins', sans-serif" font-weight="900" font-size="11" fill="#7e22ce" text-anchor="middle">LETAKKAN RUNE</text>
  </g>

  <!-- [2, 3]: matchup-item-box (Tablet Rune Draggable Kristal) -->
  <g id="magical-matchup-item-box" transform="translate(256, 384)">
    <rect x="8" y="24" width="112" height="80" rx="16" fill="url(#grad-stardust-card)" stroke="#059669" stroke-width="3.5" filter="url(#magical-glow)"/>
    <!-- Mana grip runes -->
    <polygon points="20,52 23,55 20,58 17,55" fill="#a855f7"/>
    <polygon points="20,70 23,73 20,76 17,73" fill="#a855f7"/>
    <text x="68" y="70" font-family="'Poppins', sans-serif" font-weight="900" font-size="13" fill="#065f46" text-anchor="middle">JAWABAN</text>
  </g>

  <!-- [3, 3]: matchup-bank-box (Wadah Bank Rune Alkimia) -->
  <g id="magical-matchup-bank-box" transform="translate(384, 384)">
    <rect x="8" y="16" width="112" height="96" rx="18" fill="url(#grad-stardust-card)" stroke="#c084fc" stroke-width="3.5" filter="url(#magical-glow)"/>
    <rect x="14" y="22" width="100" height="22" rx="8" fill="url(#grad-amethyst)"/>
    <text x="64" y="37" font-family="'Poppins', sans-serif" font-weight="900" font-size="9" fill="#ffffff" text-anchor="middle">BANK KATA MANTRA</text>
    <rect x="18" y="52" width="42" height="24" rx="8" fill="#f3e8ff"/>
    <rect x="68" y="52" width="42" height="24" rx="8" fill="#f3e8ff"/>
    <rect x="18" y="80" width="42" height="24" rx="8" fill="#f3e8ff"/>
    <rect x="68" y="80" width="42" height="24" rx="8" fill="#f3e8ff"/>
  </g>

  <!-- [4, 3]: groupsort-bucket-1 (Kuali Mana Safir Biru) -->
  <g id="magical-groupsort-bucket-1" transform="translate(512, 384)">
    <path d="M 24 40 L 32 108 C 33 114, 40 118, 46 118 L 82 118 C 88 118, 95 114, 96 108 L 104 40 Z"
          fill="url(#grad-royal-purple)" stroke="#38bdf8" stroke-width="3.5" filter="url(#magical-glow)"/>
    <ellipse cx="64" cy="40" rx="40" ry="14" fill="#38bdf8" stroke="#ffffff" stroke-width="2"/>
    <!-- Steam / bubble stardust -->
    <circle cx="52" cy="24" r="3" fill="#ffffff" filter="url(#stardust-glow)"/>
    <circle cx="74" cy="20" r="4" fill="#bae6fd"/>
    <rect x="34" y="68" width="60" height="26" rx="8" fill="#ffffff"/>
    <text x="64" y="85" font-family="'Poppins', sans-serif" font-weight="900" font-size="12" fill="#0284c7" text-anchor="middle">GRUP A</text>
  </g>

  <!-- [5, 3]: groupsort-bucket-2 (Kuali Mana Zamrud Hijau) -->
  <g id="magical-groupsort-bucket-2" transform="translate(640, 384)">
    <path d="M 24 40 L 32 108 C 33 114, 40 118, 46 118 L 82 118 C 88 118, 95 114, 96 108 L 104 40 Z"
          fill="url(#grad-royal-purple)" stroke="#34d399" stroke-width="3.5" filter="url(#magical-glow)"/>
    <ellipse cx="64" cy="40" rx="40" ry="14" fill="#34d399" stroke="#ffffff" stroke-width="2"/>
    <circle cx="50" cy="22" r="3.5" fill="#ffffff" filter="url(#stardust-glow)"/>
    <circle cx="76" cy="25" r="3" fill="#a7f3d0"/>
    <rect x="34" y="68" width="60" height="26" rx="8" fill="#ffffff"/>
    <text x="64" y="85" font-family="'Poppins', sans-serif" font-weight="900" font-size="12" fill="#047857" text-anchor="middle">GRUP B</text>
  </g>

  <!-- [6, 3]: groupsort-bucket-3 (Kuali Mana Amethyst Ungu) -->
  <g id="magical-groupsort-bucket-3" transform="translate(768, 384)">
    <path d="M 24 40 L 32 108 C 33 114, 40 118, 46 118 L 82 118 C 88 118, 95 114, 96 108 L 104 40 Z"
          fill="url(#grad-royal-purple)" stroke="#e879f9" stroke-width="3.5" filter="url(#magical-glow)"/>
    <ellipse cx="64" cy="40" rx="40" ry="14" fill="#e879f9" stroke="#ffffff" stroke-width="2"/>
    <circle cx="54" cy="20" r="4" fill="#ffffff" filter="url(#stardust-glow)"/>
    <circle cx="72" cy="24" r="3" fill="#fdf4ff"/>
    <rect x="34" y="68" width="60" height="26" rx="8" fill="#ffffff"/>
    <text x="64" y="85" font-family="'Poppins', sans-serif" font-weight="900" font-size="12" fill="#7e22ce" text-anchor="middle">GRUP C</text>
  </g>

  <!-- [7, 3]: groupsort-card-box (Kartu Item Grimoire Siap Sortir) -->
  <g id="magical-groupsort-card-box" transform="translate(896, 384)">
    <rect x="12" y="24" width="104" height="80" rx="18" fill="url(#grad-amethyst)" stroke="#ffffff" stroke-width="3.5" filter="url(#magical-glow)"/>
    <rect x="20" y="32" width="88" height="64" rx="12" fill="#ffffff"/>
    <text x="64" y="69" font-family="'Poppins', sans-serif" font-weight="900" font-size="13" fill="#581c87" text-anchor="middle">KARTU RUNE</text>
  </g>


  <!-- ========================================================================
       ROW 4 (y=512): Fruit Slicer (Enchanted Crystal Fruits & Void Bomb)
       ======================================================================== -->
  <!-- [0, 4]: fruit-watermelon (Semangka Kristal Amethyst) -->
  <g id="magical-fruit-watermelon" transform="translate(0, 512)">
    <!-- Crystal rind -->
    <path d="M 16 48 C 16 92, 50 116, 64 116 C 78 116, 112 92, 112 48 Z" fill="#7e22ce" stroke="#c084fc" stroke-width="3.5" filter="url(#magical-glow)"/>
    <!-- Crystal flesh (luminous magenta-violet) -->
    <path d="M 22 48 C 22 86, 52 108, 64 108 C 76 108, 106 86, 106 48 Z" fill="#f5d0fe"/>
    <path d="M 26 48 C 26 82, 54 102, 64 102 C 74 102, 102 82, 102 48 Z" fill="url(#grad-amethyst)"/>
    <!-- Crystal seeds (Diamond shaped) -->
    <polygon points="44,58 47,62 44,66 41,62" fill="#ffffff"/>
    <polygon points="64,68 67,72 64,76 61,72" fill="#ffffff"/>
    <polygon points="84,58 87,62 84,66 81,62" fill="#ffffff"/>
    <polygon points="54,82 56,85 54,88 52,85" fill="#ffffff"/>
    <polygon points="74,82 76,85 74,88 72,85" fill="#ffffff"/>
    <!-- Stardust sparkles -->
    <polygon points="98,34 100,38 104,39 100,40 98,44 96,40 92,39 96,38" fill="#ffffff" filter="url(#stardust-glow)"/>
  </g>

  <!-- [1, 4]: fruit-orange (Jeruk Kristal Surya Ajaib) -->
  <g id="magical-fruit-orange" transform="translate(128, 512)">
    <circle cx="64" cy="68" r="42" fill="url(#grad-crystal-gold)" stroke="#ffffff" stroke-width="3.5" filter="url(#stardust-glow)"/>
    <!-- Inner faceted crystal lines -->
    <polygon points="64,34 84,56 64,88 44,56" fill="#fef08a" opacity="0.6"/>
    <!-- Arcane leaf -->
    <path d="M 64 26 C 78 18, 88 24, 88 28 C 80 34, 70 32, 64 26 Z" fill="#c084fc" stroke="#ffffff" stroke-width="1.5"/>
    <polygon points="30,38 32,41 35,42 32,43 30,46 28,43 25,42 28,41" fill="#ffffff" filter="url(#stardust-glow)"/>
  </g>

  <!-- [2, 4]: fruit-apple (Apel Kristal Merah Delima & Serbuk Peri) -->
  <g id="magical-fruit-apple" transform="translate(256, 512)">
    <path d="M 64 36 C 46 20, 20 36, 22 66 C 24 94, 52 114, 64 114 C 76 114, 104 94, 106 66 C 108 36, 82 20, 64 36 Z"
          fill="url(#grad-crystal-rose)" stroke="#ffffff" stroke-width="3.5" filter="url(#magical-glow)"/>
    <!-- Specular facet -->
    <polygon points="44,46 54,42 48,58 38,62" fill="#ffffff" opacity="0.65"/>
    <path d="M 64 36 Q 66 18 74 12" fill="none" stroke="#7e22ce" stroke-width="4" stroke-linecap="round"/>
    <polygon points="98,30 100,33 103,34 100,35 98,38 96,35 93,34 96,33" fill="#ffffff" filter="url(#stardust-glow)"/>
  </g>

  <!-- [3, 4]: fruit-banana (Pisang Bulan Sabit Kristal) -->
  <g id="magical-fruit-banana" transform="translate(384, 512)">
    <path d="M 26 92 C 38 104, 78 104, 100 74 C 110 60, 110 42, 108 26 C 102 38, 92 56, 76 72 C 58 88, 38 92, 26 92 Z"
          fill="url(#grad-crystal-gold)" stroke="#ffffff" stroke-width="3.5" filter="url(#stardust-glow)"/>
    <circle cx="108" cy="26" r="4" fill="#a855f7"/>
    <circle cx="26" cy="92" r="4" fill="#a855f7"/>
    <polygon points="76,46 78,49 81,50 78,51 76,54 74,51 71,50 74,49" fill="#ffffff"/>
  </g>

  <!-- [4, 4]: fruit-strawberry (Stroberi Permata Pink Diamond) -->
  <g id="magical-fruit-strawberry" transform="translate(512, 512)">
    <path d="M 64 112 C 40 96, 24 74, 26 48 C 28 30, 48 32, 64 36 C 80 32, 100 30, 102 48 C 104 74, 88 96, 64 112 Z"
          fill="url(#grad-crystal-rose)" stroke="#ffffff" stroke-width="3.5" filter="url(#magical-glow)"/>
    <!-- Crystal Leaves (Amethyst Crown) -->
    <path d="M 64 36 L 50 20 L 64 28 L 78 20 Z" fill="#a855f7" stroke="#ffffff" stroke-width="1.5"/>
    <circle cx="48" cy="54" r="2.5" fill="#ffffff"/>
    <circle cx="64" cy="58" r="2.5" fill="#ffffff"/>
    <circle cx="80" cy="54" r="2.5" fill="#ffffff"/>
    <circle cx="56" cy="74" r="2.5" fill="#ffffff"/>
    <circle cx="72" cy="74" r="2.5" fill="#ffffff"/>
    <polygon points="20,30 22,33 25,34 22,35 20,38 18,35 15,34 18,33" fill="#ffffff" filter="url(#stardust-glow)"/>
  </g>

  <!-- [5, 4]: fruit-bomb (Bola Sihir Hitam Gelap / Dark Void Magic Orb) -->
  <g id="magical-fruit-bomb" transform="translate(640, 512)">
    <circle cx="64" cy="72" r="40" fill="url(#grad-cosmic-void)" stroke="#c084fc" stroke-width="4" filter="url(#void-glow)"/>
    <!-- Swirling void rune vortex -->
    <ellipse cx="64" cy="72" rx="26" ry="12" fill="none" stroke="#e879f9" stroke-width="2.5" stroke-dasharray="8,6" transform="rotate(-25 64 72)"/>
    <circle cx="64" cy="72" r="10" fill="#9333ea"/>
    <!-- Purple flames fuse -->
    <path d="M 64 32 Q 74 18 86 20" fill="none" stroke="#e879f9" stroke-width="3.5"/>
    <polygon points="86,20 90,12 94,18 100,16 96,23 100,27 94,27 90,34 88,27 82,25" fill="#f43f5e" filter="url(#stardust-glow)"/>
    <polygon points="87,21 90,15 93,20 97,18 95,22 97,25 93,25 90,29 88,25 84,24" fill="#fef08a"/>
  </g>

  <!-- [6, 4]: fruit-badge-box (Badge Jawaban Mengambang Kristal) -->
  <g id="magical-fruit-badge-box" transform="translate(768, 512)">
    <rect x="8" y="42" width="112" height="44" rx="16" fill="url(#grad-stardust-card)" stroke="#c084fc" stroke-width="3.5" filter="url(#magical-glow)"/>
    <line x1="24" y1="64" x2="104" y2="64" stroke="#581c87" stroke-width="4.5" stroke-linecap="round"/>
  </g>

  <!-- [7, 4]: fruit-splash (Cipratan Serbuk Bintang & Kilatan Pedang Peri) -->
  <g id="magical-fruit-splash" transform="translate(896, 512)">
    <path d="M 20 20 L 108 108" stroke="#ffffff" stroke-width="7" stroke-linecap="round" filter="url(#stardust-glow)"/>
    <path d="M 24 16 L 112 104" stroke="#e879f9" stroke-width="4" stroke-linecap="round"/>
    <circle cx="36" cy="56" r="6" fill="#c084fc" filter="url(#magical-glow)"/>
    <circle cx="86" cy="42" r="5" fill="#ffffff"/>
    <circle cx="58" cy="88" r="5" fill="#f472b6"/>
    <polygon points="76,70 79,74 83,75 79,76 76,80 73,76 69,75 73,74" fill="#ffffff" filter="url(#stardust-glow)"/>
  </g>


  <!-- ========================================================================
       ROW 5 (y=640): Putar Roda & Kata (Astro-Runic Wheel & Ubin Rune)
       ======================================================================== -->
  <!-- [0, 5]: wheel-rim (Lingkaran Roda Zodiak Astral) -->
  <g id="magical-wheel-rim" transform="translate(0, 640)">
    <circle cx="64" cy="64" r="48" fill="none" stroke="#581c87" stroke-width="9" filter="url(#magical-glow)"/>
    <circle cx="64" cy="64" r="48" fill="none" stroke="#c084fc" stroke-width="4"/>
    <!-- Starlight Studs -->
    <polygon points="64,12 66,15 69,16 66,17 64,20 62,17 59,16 62,15" fill="#ffffff" filter="url(#stardust-glow)"/>
    <polygon points="116,64 114,66 112,69 111,66 108,64 111,62 112,59 114,62" fill="#ffffff" filter="url(#stardust-glow)"/>
    <polygon points="64,116 66,113 69,112 66,111 64,108 62,111 59,112 62,113" fill="#ffffff" filter="url(#stardust-glow)"/>
    <polygon points="12,64 14,66 16,69 17,66 20,64 17,62 16,59 14,62" fill="#ffffff" filter="url(#stardust-glow)"/>
  </g>

  <!-- [1, 5]: wheel-center (Poros Tengah Eye of Archmage) -->
  <g id="magical-wheel-center" transform="translate(128, 640)">
    <circle cx="64" cy="64" r="40" fill="url(#grad-amethyst)" stroke="#ffffff" stroke-width="4" filter="url(#stardust-glow)"/>
    <circle cx="64" cy="64" r="28" fill="url(#grad-royal-purple)" stroke="#f5d0fe" stroke-width="3"/>
    <polygon points="64,46 70,58 82,64 70,70 64,82 58,70 46,64 58,58" fill="#ffffff" filter="url(#stardust-glow)"/>
  </g>

  <!-- [2, 5]: wheel-pointer (Jarum Kristal Penunjuk Ajaib) -->
  <g id="magical-wheel-pointer" transform="translate(256, 640)">
    <polygon points="64,116 38,20 90,20" fill="url(#grad-amethyst)" stroke="#ffffff" stroke-width="4" filter="url(#stardust-glow)"/>
    <polygon points="64,104 46,26 82,26" fill="url(#grad-stardust-card)"/>
    <circle cx="64" cy="34" r="9" fill="#ffffff" stroke="#9333ea" stroke-width="2.5"/>
    <polygon points="64,28 66,32 70,34 66,36 64,40 62,36 58,34 62,32" fill="#9333ea"/>
  </g>

  <!-- [3, 5]: wheel-btn-box (Tombol Putar Roda Mantra) -->
  <g id="magical-wheel-btn-box" transform="translate(384, 640)">
    <rect x="8" y="28" width="112" height="72" rx="36" fill="url(#grad-amethyst)" stroke="#ffffff" stroke-width="3.5" filter="url(#magical-glow)"/>
    <text x="64" y="65" font-family="'Poppins', sans-serif" font-weight="900" font-size="13" fill="#ffffff" text-anchor="middle">PUTAR RODA!</text>
    <text x="64" y="82" font-family="'Poppins', sans-serif" font-weight="900" font-size="10" fill="#fdf4ff" text-anchor="middle">✨ MANIFESTASI</text>
  </g>

  <!-- [4, 5]: tile-letter-box (Ubin Huruf Rune Kristal) -->
  <g id="magical-tile-letter-box" transform="translate(512, 640)">
    <rect x="18" y="18" width="92" height="92" rx="20" fill="url(#grad-stardust-card)" stroke="#c084fc" stroke-width="3.5" filter="url(#magical-glow)"/>
    <rect x="24" y="24" width="80" height="80" rx="14" fill="#faf5ff"/>
    <text x="64" y="77" font-family="'Poppins', sans-serif" font-weight="900" font-size="46" fill="#581c87" text-anchor="middle">A</text>
    <circle cx="88" cy="32" r="3" fill="#a855f7"/>
  </g>

  <!-- [5, 5]: tile-letter-slot (Slot Target Susun Huruf Bintang) -->
  <g id="magical-tile-letter-slot" transform="translate(640, 640)">
    <rect x="18" y="18" width="92" height="92" rx="20" fill="#faf5ff" stroke="#a855f7" stroke-width="3" stroke-dasharray="6,6"/>
    <polygon points="64,54 67,61 74,64 67,67 64,74 61,67 54,64 61,61" fill="#d8b4fe"/>
  </g>

  <!-- [6, 5]: wordsearch-cell-box (Kotak Sel Matriks Kata Luminous) -->
  <g id="magical-wordsearch-cell-box" transform="translate(768, 640)">
    <rect x="16" y="16" width="96" height="96" rx="16" fill="url(#grad-stardust-card)" stroke="#e9d5ff" stroke-width="3" filter="url(#magical-glow)"/>
    <text x="64" y="75" font-family="'Poppins', sans-serif" font-weight="900" font-size="40" fill="#581c87" text-anchor="middle">K</text>
  </g>

  <!-- [7, 5]: wordsearch-found-box (Kotak Sel Kata Ditemukan Bercahaya Emas) -->
  <g id="magical-wordsearch-found-box" transform="translate(896, 640)">
    <rect x="16" y="16" width="96" height="96" rx="16" fill="url(#grad-crystal-gold)" stroke="#ffffff" stroke-width="4" filter="url(#stardust-glow)"/>
    <text x="64" y="75" font-family="'Poppins', sans-serif" font-weight="900" font-size="40" fill="#581c87" text-anchor="middle">K</text>
  </g>


  <!-- ========================================================================
       ROW 6 (y=768): Whack-a-Mole (Tikus Penyihir & Tongkat Kristal)
       ======================================================================== -->
  <!-- [0, 6]: mole-hole (Vortex Portal Sihir Melingkar) -->
  <g id="magical-mole-hole" transform="translate(0, 768)">
    <ellipse cx="64" cy="64" rx="52" ry="32" fill="#2e1065" stroke="#a855f7" stroke-width="5" filter="url(#void-glow)"/>
    <ellipse cx="64" cy="64" rx="40" ry="20" fill="#0f172a"/>
    <ellipse cx="64" cy="64" rx="28" ry="10" fill="#581c87"/>
    <!-- Stardust around vortex -->
    <circle cx="34" cy="50" r="2.5" fill="#ffffff" filter="url(#stardust-glow)"/>
    <circle cx="94" cy="74" r="2.5" fill="#ffffff"/>
  </g>

  <!-- [1, 6]: mole-normal (Tikus Bertopi Penyihir Bintang) -->
  <g id="magical-mole-normal" transform="translate(128, 768)">
    <!-- Body -->
    <path d="M 28 116 C 28 50, 44 32, 64 32 C 84 32, 100 50, 100 116 Z" fill="#9333ea" stroke="#581c87" stroke-width="3"/>
    <!-- Wizard Hat on head -->
    <polygon points="64,4 40,36 88,36" fill="url(#grad-royal-purple)" stroke="#ffffff" stroke-width="2"/>
    <ellipse cx="64" cy="36" rx="30" ry="8" fill="#581c87" stroke="#c084fc" stroke-width="2"/>
    <!-- Stars on hat -->
    <polygon points="64,18 66,22 70,23 66,24 64,28 62,24 58,23 62,22" fill="#fef08a"/>
    <!-- Eyes -->
    <ellipse cx="50" cy="58" rx="4" ry="6" fill="#ffffff"/>
    <ellipse cx="78" cy="58" rx="4" ry="6" fill="#ffffff"/>
    <circle cx="50" cy="58" r="2" fill="#0f172a"/>
    <circle cx="78" cy="58" r="2" fill="#0f172a"/>
    <!-- Snout & Whisker -->
    <ellipse cx="64" cy="72" rx="16" ry="10" fill="#fdf4ff"/>
    <ellipse cx="64" cy="68" rx="5" ry="3.5" fill="#f43f5e"/>
    <rect x="61" y="77" width="6" height="6" fill="#ffffff" stroke="#7e22ce" stroke-width="1"/>
  </g>

  <!-- [2, 6]: mole-hit (Tikus Pusing dengan Orbit Bintang Ajaib) -->
  <g id="magical-mole-hit" transform="translate(256, 768)">
    <path d="M 28 116 C 28 60, 44 44, 64 44 C 84 44, 100 60, 100 116 Z" fill="#9333ea" stroke="#581c87" stroke-width="3"/>
    <!-- Tilted Wizard Hat -->
    <g transform="rotate(25 64 30)">
      <polygon points="64,4 40,36 88,36" fill="url(#grad-royal-purple)" stroke="#ffffff" stroke-width="2"/>
      <ellipse cx="64" cy="36" rx="30" ry="8" fill="#581c87"/>
    </g>
    <!-- Spiral Eyes -->
    <text x="50" y="70" font-family="'Poppins', sans-serif" font-weight="900" font-size="16" fill="#ffffff" text-anchor="middle">@</text>
    <text x="78" y="70" font-family="'Poppins', sans-serif" font-weight="900" font-size="16" fill="#ffffff" text-anchor="middle">@</text>
    <!-- Orbiting Stardust Stars -->
    <polygon points="40,24 43,30 50,30 45,34 47,40 40,36 33,40 35,34 30,30 37,30" fill="#ffffff" filter="url(#stardust-glow)"/>
    <polygon points="88,24 91,30 98,30 93,34 95,40 88,36 81,40 83,34 78,30 85,30" fill="#fef08a" filter="url(#stardust-glow)"/>
  </g>

  <!-- [3, 6]: mole-card-box (Papan Jawaban Mantra Dipegang Tikus) -->
  <g id="magical-mole-card-box" transform="translate(384, 768)">
    <rect x="8" y="36" width="112" height="56" rx="16" fill="url(#grad-stardust-card)" stroke="#c084fc" stroke-width="3.5" filter="url(#magical-glow)"/>
    <line x1="24" y1="64" x2="104" y2="64" stroke="#581c87" stroke-width="4.5" stroke-linecap="round"/>
  </g>

  <!-- [4, 6]: hammer-idle (Tongkat Sihir Kristal Archmage Siap Ayun) -->
  <g id="magical-hammer-idle" transform="translate(512, 768)">
    <g transform="rotate(25 64 64)">
      <!-- Golden / Amethyst Staff Handle -->
      <rect x="58" y="36" width="12" height="76" rx="6" fill="url(#grad-amethyst)" stroke="#581c87" stroke-width="2"/>
      <!-- Grand Star Crystal Head -->
      <circle cx="64" cy="30" r="18" fill="url(#grad-crystal-gold)" stroke="#ffffff" stroke-width="3" filter="url(#stardust-glow)"/>
      <polygon points="64,16 68,26 78,28 70,36 72,46 64,40 56,46 58,36 50,28 60,26" fill="#ffffff"/>
    </g>
  </g>

  <!-- [5, 6]: hammer-hit (Tongkat Mengayun dengan Ledakan Stardust) -->
  <g id="magical-hammer-hit" transform="translate(640, 768)">
    <g transform="rotate(-40 64 64)">
      <rect x="58" y="36" width="12" height="76" rx="6" fill="url(#grad-amethyst)" stroke="#581c87" stroke-width="2"/>
      <circle cx="64" cy="30" r="18" fill="url(#grad-crystal-gold)" stroke="#ffffff" stroke-width="3"/>
    </g>
    <!-- Stardust Blast Waves -->
    <path d="M 20 34 Q 14 64 34 96" fill="none" stroke="#e879f9" stroke-width="4.5" stroke-linecap="round" filter="url(#stardust-glow)"/>
    <path d="M 32 38 Q 24 64 42 90" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round"/>
  </g>

  <!-- [6, 6]: mole-banner-box (Banner Target Mantra Pukul Tikus) -->
  <g id="magical-mole-banner-box" transform="translate(768, 768)">
    <rect x="8" y="24" width="112" height="80" rx="18" fill="url(#grad-stardust-card)" stroke="#c084fc" stroke-width="3.5" filter="url(#magical-glow)"/>
    <rect x="16" y="32" width="96" height="22" rx="8" fill="url(#grad-amethyst)"/>
    <text x="64" y="47" font-family="'Poppins', sans-serif" font-weight="900" font-size="10" fill="#ffffff" text-anchor="middle">PUKUL JAWABAN</text>
    <line x1="28" y1="74" x2="100" y2="74" stroke="#581c87" stroke-width="4.5" stroke-linecap="round"/>
  </g>

  <!-- [7, 6]: spark-effect (Nova Ledakan Bintang Ajaib) -->
  <g id="magical-spark-effect" transform="translate(896, 768)">
    <polygon points="64,12 76,48 116,64 76,80 64,116 52,80 12,64 52,48" fill="#ffffff" filter="url(#stardust-glow)"/>
    <polygon points="64,32 72,56 96,64 72,72 64,96 56,72 32,64 56,56" fill="#e879f9"/>
    <circle cx="64" cy="64" r="8" fill="#ffffff"/>
  </g>


  <!-- ========================================================================
       ROW 7 (y=896): Universal Dialogs & Controls
       ======================================================================== -->
  <!-- [0, 7]: modal-dialog-box (Kotak Dialog Kartu Rangkuman Akhir) -->
  <g id="magical-modal-dialog-box" transform="translate(0, 896)">
    <rect x="12" y="14" width="104" height="100" rx="22" fill="url(#grad-stardust-card)" stroke="#c084fc" stroke-width="4" filter="url(#magical-glow)"/>
    <!-- Golden Sorcerer Crest -->
    <circle cx="64" cy="42" r="18" fill="url(#grad-amethyst)"/>
    <polygon points="64,30 68,39 77,40 71,45 73,54 64,49 55,54 57,45 51,40 60,39" fill="#fef08a"/>
    <line x1="30" y1="74" x2="98" y2="74" stroke="#581c87" stroke-width="4.5" stroke-linecap="round"/>
    <rect x="34" y="88" width="60" height="16" rx="8" fill="url(#grad-royal-purple)"/>
  </g>

  <!-- [1, 7]: play-button-box (Tombol Besar Play Game Kristal Terpadu) -->
  <g id="magical-play-button-box" transform="translate(128, 896)">
    <rect x="8" y="24" width="112" height="80" rx="22" fill="url(#grad-amethyst)" stroke="#ffffff" stroke-width="3.5" filter="url(#stardust-glow)"/>
    <polygon points="50,44 50,84 86,64" fill="#ffffff"/>
    <text x="64" y="98" font-family="'Poppins', sans-serif" font-weight="900" font-size="10" fill="#fdf4ff" text-anchor="middle">PLAY</text>
  </g>

  <!-- [2, 7]: action-button-box (Tombol Aksi Sekunder Mantra) -->
  <g id="magical-action-button-box" transform="translate(256, 896)">
    <rect x="8" y="28" width="112" height="72" rx="20" fill="url(#grad-royal-purple)" stroke="#e879f9" stroke-width="3" filter="url(#magical-glow)"/>
    <text x="64" y="70" font-family="'Poppins', sans-serif" font-weight="900" font-size="14" fill="#ffffff" text-anchor="middle">SUBMIT</text>
  </g>

  <!-- [3, 7]: trophy-cup (Cawan Mythical Kristal Keabadian) -->
  <g id="magical-trophy-cup" transform="translate(384, 896)">
    <rect x="42" y="94" width="44" height="16" rx="5" fill="#581c87" stroke="#c084fc" stroke-width="2"/>
    <rect x="54" y="78" width="20" height="16" fill="url(#grad-crystal-gold)"/>
    <path d="M 34 26 L 94 26 C 94 64, 80 78, 64 78 C 48 78, 34 64, 34 26 Z" fill="url(#grad-amethyst)" stroke="#ffffff" stroke-width="3.5" filter="url(#stardust-glow)"/>
    <path d="M 34 32 C 18 32, 18 58, 36 60" fill="none" stroke="#f5d0fe" stroke-width="4" stroke-linecap="round"/>
    <path d="M 94 32 C 110 32, 110 58, 92 60" fill="none" stroke="#f5d0fe" stroke-width="4" stroke-linecap="round"/>
    <polygon points="64,36 67,44 75,45 69,50 71,58 64,54 57,58 59,50 53,45 61,44" fill="#ffffff"/>
  </g>

  <!-- [4, 7]: speaker-on (Ikon Suara Mantra Aktif) -->
  <g id="magical-speaker-on" transform="translate(512, 896)">
    <circle cx="64" cy="64" r="44" fill="url(#grad-stardust-card)" stroke="#c084fc" stroke-width="3" filter="url(#magical-glow)"/>
    <polygon points="38,54 48,54 62,42 62,86 48,74 38,74" fill="#7e22ce"/>
    <path d="M 72 50 C 78 54, 78 74, 72 78" fill="none" stroke="#c084fc" stroke-width="4" stroke-linecap="round"/>
    <path d="M 80 42 C 92 48, 92 80, 80 86" fill="none" stroke="#9333ea" stroke-width="4" stroke-linecap="round"/>
  </g>

  <!-- [5, 7]: speaker-off (Ikon Suara Mantra Bisu) -->
  <g id="magical-speaker-off" transform="translate(640, 896)">
    <circle cx="64" cy="64" r="44" fill="url(#grad-stardust-card)" stroke="#c084fc" stroke-width="3" filter="url(#magical-glow)"/>
    <polygon points="38,54 48,54 62,42 62,86 48,74 38,74" fill="#94a3b8"/>
    <line x1="38" y1="38" x2="90" y2="90" stroke="#f43f5e" stroke-width="5" stroke-linecap="round"/>
  </g>

  <!-- [6, 7]: restart-icon (Ouroboros Waktu / Reload) -->
  <g id="magical-restart-icon" transform="translate(768, 896)">
    <circle cx="64" cy="64" r="44" fill="url(#grad-stardust-card)" stroke="#c084fc" stroke-width="3" filter="url(#magical-glow)"/>
    <path d="M 64 36 A 28 28 0 1 1 38 52" fill="none" stroke="#9333ea" stroke-width="6" stroke-linecap="round"/>
    <polygon points="38,36 38,56 58,56" fill="#9333ea"/>
  </g>

  <!-- [7, 7]: lotus-logo (Lotus Suci Keabadian & Serbuk Peri) -->
  <g id="magical-lotus-logo" transform="translate(896, 896)">
    <circle cx="64" cy="64" r="44" fill="url(#grad-royal-purple)" stroke="#ffffff" stroke-width="3.5" filter="url(#stardust-glow)"/>
    <!-- Radiant Lotus Petals -->
    <path d="M 64 24 C 54 40, 54 64, 64 80 C 74 64, 74 40, 64 24 Z" fill="#ffffff"/>
    <path d="M 64 40 C 44 46, 34 66, 46 82 C 54 72, 60 64, 64 40 Z" fill="#f5d0fe" opacity="0.9"/>
    <path d="M 64 40 C 84 46, 94 66, 82 82 C 74 72, 68 64, 64 40 Z" fill="#f5d0fe" opacity="0.9"/>
    <circle cx="64" cy="78" r="4.5" fill="#fef08a" filter="url(#stardust-glow)"/>
  </g>

</svg>`;

  return svg;
}

// Generate PNG Buffer for Magical theme
function createMagicalPNG() {
  const width = 1024;
  const height = 1024;
  const rawData = Buffer.alloc(height * (1 + width * 4));
  let offset = 0;

  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // Filter: None
    const row = Math.floor(y / 128);
    const inCellY = y % 128;

    for (let x = 0; x < width; x++) {
      const col = Math.floor(x / 128);
      const inCellX = x % 128;

      let r = 250, g = 245, b = 255, a = 0; // default transparent

      if (inCellX === 0 || inCellY === 0 || inCellX === 127 || inCellY === 127) {
        r = 192; g = 132; b = 252; a = 70; // subtle purple cell border
      }

      if (inCellX >= 10 && inCellX <= 118 && inCellY >= 10 && inCellY <= 118) {
        // Magical Violet / Amethyst Base Tinting
        r = 250; g = 245; b = 255; a = 250;
        if (row === 0) { // UI
          if (col === 1) { r = 244; g = 63; b = 94; a = 255; }
          else if (col === 2) { r = 250; g = 204; b = 21; a = 255; }
          else if (col === 4) { r = 52; g = 211; b = 153; a = 255; }
          else if (col === 5) { r = 244; g = 63; b = 94; a = 255; }
          else { r = 168; g = 85; b = 247; a = 240; }
        } else if (row === 1) { // Quiz
          if (col === 6) { r = 16; g = 185; b = 129; a = 255; }
          else if (col === 7) { r = 244; g = 63; b = 94; a = 255; }
          else { r = 243; g = 232; b = 255; a = 250; }
        } else if (row === 2) { // Boxes & Cards
          if (col === 4) { r = 88; g = 28; b = 135; a = 255; } // Card Back
          else if (col === 2) { r = 250; g = 204; b = 21; a = 255; }
          else { r = 192; g = 132; b = 252; a = 240; }
        } else if (row === 4) { // Crystal Fruits
          if (col === 0) { r = 192; g = 132; b = 252; a = 255; } // Amethyst Watermelon
          else if (col === 1) { r = 251; g = 146; b = 60; a = 255; } // Solar Orange
          else if (col === 2) { r = 244; g = 63; b = 94; a = 255; } // Ruby Apple
          else if (col === 3) { r = 250; g = 204; b = 21; a = 255; } // Crescent Banana
          else if (col === 4) { r = 244; g = 114; b = 182; a = 255; } // Pink Diamond Strawberry
          else if (col === 5) { r = 46; g = 16; b = 101; a = 255; } // Dark Void Bomb
          else { r = 192; g = 132; b = 252; a = 240; }
        } else if (row === 6) { // Wizard Mole
          if (col === 0) { r = 46; g = 16; b = 101; a = 255; }
          else if (col === 1 || col === 2) { r = 147; g = 51; b = 234; a = 255; }
          else { r = 216; g = 180; b = 254; a = 250; }
        } else {
          r = 168; g = 85; b = 247; a = 240;
        }
      }

      rawData[offset++] = r;
      rawData[offset++] = g;
      rawData[offset++] = b;
      rawData[offset++] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData);

  function crc32(buf) {
    let crc = 0 ^ (-1);
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
    }
    return (crc ^ (-1)) >>> 0;
  }

  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(12 + len);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    const typeAndData = buf.subarray(4, 8 + len);
    const crc = crc32(typeAndData);
    buf.writeUInt32BE(crc, 8 + len);
    return buf;
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8);
  ihdr.writeUInt8(6, 9);
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);

  const pngHeader = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([pngHeader, ihdrChunk, idatChunk, iendChunk]);
}

const svgContent = buildMagicalSVG();
const pngBuffer = createMagicalPNG();

const targets = [
  { svg: 'games/common/spritesheet-magical.svg', png: 'games/common/spritesheet-magical.png' },
  { svg: 'public/games/common/spritesheet-magical.svg', png: 'public/games/common/spritesheet-magical.png' }
];

targets.forEach(t => {
  fs.mkdirSync(path.dirname(t.svg), { recursive: true });
  fs.writeFileSync(t.svg, svgContent, 'utf8');
  fs.writeFileSync(t.png, pngBuffer);
  console.log(`Saved ${t.svg} (${svgContent.length} bytes) and ${t.png} (${pngBuffer.length} bytes)`);
});
