// scratch/build_masterpiece_magical_spritesheet.js
// MASTERPIECE MAGICAL WORLD SPRITESHEET (1024x1024)
// 64 unique, hand-crafted, tangible fantasy illustrations (No flat shapes, no generic icons, no default Windows emojis).
// All cells maintain strict 1:1 natural proportions (Zero distortion, zero stretching).

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function generateMasterpieceSVG() {
  const width = 1024;
  const height = 1024;

  const cellNames = [
    // ROW 0: Universal HUD & Essentials
    "stat-badge-pill", "heart-life", "star-score", "clock-timer", "badge-correct", "badge-wrong", "powerup-5050", "powerup-freeze",
    // ROW 1: Kuis & Benar-Salah
    "quiz-question-box", "quiz-answer-box", "quiz-answer-hover", "quiz-answer-correct", "quiz-answer-wrong", "truefalse-card-box", "btn-true-box", "btn-false-box",
    // ROW 2: Buka Kotak & Flip Tiles
    "box-closed", "box-open", "box-gold", "box-lid", "card-back", "card-front", "card-matched", "card-placeholder",
    // ROW 3: Menjodohkan & Pengelompokan
    "matchup-prompt-box", "matchup-slot-box", "matchup-item-box", "matchup-bank-box", "groupsort-bucket-1", "groupsort-bucket-2", "groupsort-bucket-3", "groupsort-card-box",
    // ROW 4: Fruit Slicer (6 Mythical Fruits + Bomb + Splash)
    "fruit-watermelon", "fruit-orange", "fruit-apple", "fruit-banana", "fruit-strawberry", "fruit-bomb", "fruit-badge-box", "fruit-splash",
    // ROW 5: Putar Roda & Word Puzzles
    "wheel-rim", "wheel-center", "wheel-pointer", "wheel-btn-box", "tile-letter-box", "tile-letter-slot", "wordsearch-cell-box", "wordsearch-found-box",
    // ROW 6: Whack-a-Mole
    "mole-hole", "mole-normal", "mole-hit", "mole-card-box", "hammer-idle", "hammer-hit", "mole-banner-box", "spark-effect",
    // ROW 7: Universal System & Controls
    "modal-dialog-box", "play-button-box", "action-button-box", "trophy-cup", "speaker-on", "speaker-off", "restart-icon", "lotus-logo"
  ];

  let views = '';
  cellNames.forEach((name, idx) => {
    const col = idx % 8;
    const row = Math.floor(idx / 8);
    // preserveAspectRatio="xMidYMid meet" guarantees 100% natural, un-distorted 1:1 proportion
    views += `    <view id="${name}" viewBox="${col * 128} ${row * 128} 128 128" preserveAspectRatio="xMidYMid meet" />\n`;
    views += `    <view id="art-${name}" viewBox="${col * 128} ${row * 128} 128 128" preserveAspectRatio="xMidYMid meet" />\n`;
  });

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <clipPath id="cell-clip"><rect x="0" y="0" width="128" height="128" /></clipPath>
${views}
    <!-- Filters: Glowing Stardust, Amethyst Auras, Volcanic Flames -->
    <filter id="glow-stardust" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#ffffff" flood-opacity="0.95"/>
      <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="#c084fc" flood-opacity="0.8"/>
    </filter>
    <filter id="glow-gold" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="#facc15" flood-opacity="0.9"/>
      <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#78350f" flood-opacity="0.5"/>
    </filter>
    <filter id="glow-ruby" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#f43f5e" flood-opacity="0.9"/>
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#881337" flood-opacity="0.6"/>
    </filter>
    <filter id="glow-emerald" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#10b981" flood-opacity="0.9"/>
      <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#064e3b" flood-opacity="0.5"/>
    </filter>
    <filter id="shadow-deep" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#1e1b4b" flood-opacity="0.45"/>
    </filter>
    <filter id="cursed-miasma" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#a855f7" flood-opacity="0.9"/>
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="0.85"/>
    </filter>

    <!-- Rich Gradient Palette -->
    <!-- Gold / Brass -->
    <linearGradient id="gold-metal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fffbeb"/>
      <stop offset="25%" stop-color="#fde047"/>
      <stop offset="60%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#854d0e"/>
    </linearGradient>
    <linearGradient id="gold-rim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#ca8a04"/>
      <stop offset="100%" stop-color="#713f12"/>
    </linearGradient>

    <!-- Amethyst / Royal Violet -->
    <linearGradient id="amethyst-deep" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7e22ce"/>
      <stop offset="40%" stop-color="#581c87"/>
      <stop offset="100%" stop-color="#2e1065"/>
    </linearGradient>
    <linearGradient id="amethyst-bright" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f5d0fe"/>
      <stop offset="45%" stop-color="#c084fc"/>
      <stop offset="100%" stop-color="#9333ea"/>
    </linearGradient>
    <linearGradient id="amethyst-core" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="35%" stop-color="#f0abfc"/>
      <stop offset="75%" stop-color="#c084fc"/>
      <stop offset="100%" stop-color="#6b21a8"/>
    </linearGradient>

    <!-- Crimson / Phoenix Ruby -->
    <linearGradient id="ruby-flame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffe4e6"/>
      <stop offset="30%" stop-color="#fb7185"/>
      <stop offset="70%" stop-color="#e11d48"/>
      <stop offset="100%" stop-color="#881337"/>
    </linearGradient>

    <!-- Emerald / Nature Life -->
    <linearGradient id="emerald-crystal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#d1fae5"/>
      <stop offset="35%" stop-color="#34d399"/>
      <stop offset="75%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#064e3b"/>
    </linearGradient>

    <!-- Sapphire / Ocean Cyan -->
    <linearGradient id="sapphire-mana" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e0f2fe"/>
      <stop offset="35%" stop-color="#38bdf8"/>
      <stop offset="75%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0c4a6e"/>
    </linearGradient>

    <!-- Ancient Parchment Vellum -->
    <linearGradient id="parchment-page" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="30%" stop-color="#fdf4ff"/>
      <stop offset="80%" stop-color="#f3e8ff"/>
      <stop offset="100%" stop-color="#e9d5ff"/>
    </linearGradient>
    <linearGradient id="parchment-aged" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fffbeb"/>
      <stop offset="50%" stop-color="#fef3c7"/>
      <stop offset="100%" stop-color="#fde68a"/>
    </linearGradient>

    <!-- Dragon Bone / Ivory -->
    <linearGradient id="dragon-ivory" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </linearGradient>

    <!-- Obsidian Void -->
    <linearGradient id="obsidian-dark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="40%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>

    <!-- Bronze Wood -->
    <linearGradient id="ancient-wood" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#92400e"/>
      <stop offset="50%" stop-color="#78350f"/>
      <stop offset="100%" stop-color="#451a03"/>
    </linearGradient>
  </defs>
`;

  // Helper to add spark cluster
  const sparkAt = (cx, cy, s = 8, color = '#ffffff') => `
    <polygon points="${cx},${cy - s} ${cx + s * 0.3},${cy - s * 0.3} ${cx + s},${cy} ${cx + s * 0.3},${cy + s * 0.3} ${cx},${cy + s} ${cx - s * 0.3},${cy + s * 0.3} ${cx - s},${cy} ${cx - s * 0.3},${cy - s * 0.3}" fill="${color}" filter="url(#glow-stardust)"/>
  `;

  // =========================================================================
  // ROW 0: Universal HUD & Essentials (Tangible Mythical Artifacts)
  // =========================================================================

  // [0, 0]: Dragon-Bone Scroll Bar with Inlaid Gem & Golden Claws
  svg += `
  <g id="art-stat-badge-pill" transform="translate(0, 0)" clip-path="url(#cell-clip)">
    <path d="M 18 64 C 18 52, 28 42, 40 42 L 88 42 C 100 42, 110 52, 110 64 C 110 76, 100 86, 88 86 L 40 86 C 28 86, 18 76, 18 64 Z"
          fill="url(#dragon-ivory)" stroke="#94a3b8" stroke-width="2.5" filter="url(#shadow-deep)"/>
    <path d="M 18 64 C 12 50, 6 56, 10 72 C 14 82, 22 76, 26 64 Z" fill="url(#gold-metal)" stroke="#78350f" stroke-width="1.5"/>
    <circle cx="22" cy="64" r="5" fill="#f43f5e" filter="url(#glow-ruby)"/>
    <path d="M 110 64 C 116 50, 122 56, 118 72 C 114 82, 106 76, 102 64 Z" fill="url(#gold-metal)" stroke="#78350f" stroke-width="1.5"/>
    <circle cx="106" cy="64" r="5" fill="#f43f5e" filter="url(#glow-ruby)"/>
    <rect x="34" y="48" width="60" height="32" rx="10" fill="url(#amethyst-deep)" stroke="url(#gold-metal)" stroke-width="2"/>
    <polygon points="64,52 74,64 64,76 54,64" fill="url(#amethyst-bright)" filter="url(#glow-stardust)"/>
    <circle cx="64" cy="64" r="4" fill="#ffffff"/>
    ${sparkAt(42, 64, 4)}
    ${sparkAt(86, 64, 4)}
  </g>`;

  // [1, 0]: Sacred Phoenix Ruby Heart in Feathered Wings
  svg += `
  <g id="art-heart-life" transform="translate(128, 0)" clip-path="url(#cell-clip)">
    <path d="M 64 68 C 42 36, 12 40, 14 68 C 16 86, 42 84, 64 80 Z" fill="url(#gold-metal)" stroke="#78350f" stroke-width="2" filter="url(#glow-gold)"/>
    <path d="M 64 68 C 86 36, 116 40, 114 68 C 112 86, 86 84, 64 80 Z" fill="url(#gold-metal)" stroke="#78350f" stroke-width="2" filter="url(#glow-gold)"/>
    <path d="M 64 70 C 48 48, 28 50, 30 70 C 32 80, 50 78, 64 76 Z" fill="#ffffff" opacity="0.65"/>
    <path d="M 64 70 C 80 48, 100 50, 98 70 C 96 80, 78 78, 64 76 Z" fill="#ffffff" opacity="0.65"/>
    <path d="M 64 102 C 32 72, 26 44, 44 28 C 56 20, 64 28, 64 36 C 64 28, 72 20, 84 28 C 102 44, 96 72, 64 102 Z"
          fill="url(#ruby-flame)" stroke="#ffffff" stroke-width="3" filter="url(#glow-ruby)"/>
    <polygon points="64,42 46,54 64,92 82,54" fill="#ffffff" opacity="0.38"/>
    <polygon points="42,32 52,44 38,54" fill="#ffffff" opacity="0.75"/>
    <polygon points="64,16 68,24 76,26 70,32 72,40 64,36 56,40 58,32 52,26 60,24" fill="url(#gold-metal)" filter="url(#glow-gold)"/>
    ${sparkAt(64, 60, 6)}
  </g>`;

  // [2, 0]: Archmage Cosmic Astrolabe Star
  svg += `
  <g id="art-star-score" transform="translate(256, 0)" clip-path="url(#cell-clip)">
    <ellipse cx="64" cy="64" rx="50" ry="20" fill="none" stroke="url(#gold-metal)" stroke-width="3.5" transform="rotate(-30 64 64)" filter="url(#glow-gold)"/>
    <ellipse cx="64" cy="64" rx="50" ry="20" fill="none" stroke="#c084fc" stroke-width="2.5" stroke-dasharray="6,4" transform="rotate(30 64 64)"/>
    <circle cx="24" cy="40" r="5" fill="#38bdf8" filter="url(#glow-stardust)"/>
    <circle cx="104" cy="88" r="5" fill="#38bdf8" filter="url(#glow-stardust)"/>
    <polygon points="64,10 74,38 100,26 86,52 114,64 86,76 100,102 74,90 64,118 54,90 28,102 42,76 14,64 42,52 28,26 54,38"
             fill="url(#gold-metal)" stroke="#78350f" stroke-width="3" filter="url(#glow-gold)"/>
    <polygon points="64,24 71,46 92,38 82,58 102,64 82,70 92,90 71,82 64,104 57,82 36,90 46,70 26,64 46,58 36,38 57,46"
             fill="#ffffff" opacity="0.85" filter="url(#glow-stardust)"/>
    <circle cx="64" cy="64" r="10" fill="url(#amethyst-bright)"/>
    <circle cx="64" cy="64" r="5" fill="#ffffff"/>
  </g>`;

  // [3, 0]: Chrono-Hourglass with Swirling Mana Sand & Gargoyle Mounts
  svg += `
  <g id="art-clock-timer" transform="translate(384, 0)" clip-path="url(#cell-clip)">
    <path d="M 28 20 L 100 20 C 100 28, 92 32, 86 34 L 42 34 C 36 32, 28 28, 28 20 Z" fill="url(#gold-metal)" stroke="#78350f" stroke-width="2" filter="url(#glow-gold)"/>
    <path d="M 28 108 L 100 108 C 100 100, 92 96, 86 94 L 42 94 C 36 96, 28 100, 28 108 Z" fill="url(#gold-metal)" stroke="#78350f" stroke-width="2" filter="url(#glow-gold)"/>
    <circle cx="64" cy="14" r="5" fill="#38bdf8" filter="url(#glow-stardust)"/>
    <circle cx="64" cy="114" r="5" fill="#38bdf8" filter="url(#glow-stardust)"/>
    <path d="M 32 30 Q 24 64 32 98" fill="none" stroke="url(#gold-metal)" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M 96 30 Q 104 64 96 98" fill="none" stroke="url(#gold-metal)" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M 42 32 L 86 32 C 86 52, 74 60, 68 64 C 74 68, 86 76, 86 96 L 42 96 C 42 76, 54 68, 60 64 C 54 60, 42 52, 42 32 Z"
          fill="url(#parchment-page)" stroke="#c084fc" stroke-width="3" filter="url(#shadow-deep)"/>
    <path d="M 46 40 L 82 40 C 78 54, 70 58, 64 62 C 58 58, 50 54, 46 40 Z" fill="url(#amethyst-bright)"/>
    <path d="M 46 94 L 82 94 C 82 82, 72 74, 64 72 C 56 74, 46 82, 46 94 Z" fill="url(#amethyst-bright)"/>
    <line x1="64" y1="62" x2="64" y2="76" stroke="#ffffff" stroke-width="3" stroke-linecap="round" filter="url(#glow-stardust)"/>
    ${sparkAt(64, 68, 3)}
  </g>`;

  // [4, 0]: Emerald Blessing Crest (Holy Crystal Sword & Laurel Wreath - BENAR)
  svg += `
  <g id="art-badge-correct" transform="translate(512, 0)" clip-path="url(#cell-clip)">
    <circle cx="64" cy="64" r="50" fill="url(#emerald-crystal)" stroke="url(#gold-metal)" stroke-width="4" filter="url(#glow-emerald)"/>
    <circle cx="64" cy="64" r="40" fill="none" stroke="#a7f3d0" stroke-width="2.5" stroke-dasharray="6,4"/>
    <polygon points="64,10 70,18 64,24 58,18" fill="url(#gold-metal)"/>
    <polygon points="64,118 70,110 64,104 58,110" fill="url(#gold-metal)"/>
    <polygon points="10,64 18,58 24,64 18,70" fill="url(#gold-metal)"/>
    <polygon points="118,64 110,58 104,64 110,70" fill="url(#gold-metal)"/>
    <polygon points="64,26 70,72 64,76 58,72" fill="#ffffff" filter="url(#glow-stardust)"/>
    <line x1="64" y1="26" x2="64" y2="74" stroke="#a7f3d0" stroke-width="1.5"/>
    <rect x="50" y="74" width="28" height="6" rx="3" fill="url(#gold-metal)" stroke="#78350f" stroke-width="1"/>
    <rect x="61" y="80" width="6" height="12" rx="2" fill="#78350f"/>
    <circle cx="64" cy="94" r="5" fill="url(#gold-metal)"/>
    <path d="M 40 62 L 56 78 L 88 42" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow-stardust)"/>
  </g>`;

  // [5, 0]: Abyssal Cursed Seal (Crossed Flaming Bone Scythes & Volcanic Fissures - SALAH)
  svg += `
  <g id="art-badge-wrong" transform="translate(640, 0)" clip-path="url(#cell-clip)">
    <circle cx="64" cy="64" r="50" fill="url(#obsidian-dark)" stroke="url(#ruby-flame)" stroke-width="4.5" filter="url(#glow-ruby)"/>
    <path d="M 64 18 Q 68 40 60 64 Q 72 80 64 110" fill="none" stroke="#f43f5e" stroke-width="3" opacity="0.8"/>
    <path d="M 18 64 Q 40 58 64 64 Q 86 68 110 64" fill="none" stroke="#f43f5e" stroke-width="3" opacity="0.8"/>
    <g transform="rotate(45 64 64)">
      <line x1="24" y1="64" x2="104" y2="64" stroke="url(#gold-metal)" stroke-width="5" stroke-linecap="round"/>
      <path d="M 98 64 C 98 44, 82 36, 74 38 C 86 48, 92 56, 90 64 Z" fill="url(#ruby-flame)" filter="url(#glow-ruby)"/>
      <circle cx="24" cy="64" r="5" fill="#f43f5e"/>
    </g>
    <g transform="rotate(-45 64 64)">
      <line x1="24" y1="64" x2="104" y2="64" stroke="url(#gold-metal)" stroke-width="5" stroke-linecap="round"/>
      <path d="M 98 64 C 98 44, 82 36, 74 38 C 86 48, 92 56, 90 64 Z" fill="url(#ruby-flame)" filter="url(#glow-ruby)"/>
      <circle cx="24" cy="64" r="5" fill="#f43f5e"/>
    </g>
    <circle cx="64" cy="64" r="14" fill="#0f172a" stroke="#ffffff" stroke-width="2"/>
    <ellipse cx="64" cy="64" rx="4" ry="9" fill="#f43f5e" filter="url(#glow-ruby)"/>
    ${sparkAt(64, 64, 3, '#ffffff')}
  </g>`;

  // [6, 0]: Tome of Arcane Lightning (50:50 Power-up)
  svg += `
  <g id="art-powerup-5050" transform="translate(768, 0)" clip-path="url(#cell-clip)">
    <path d="M 64 92 C 46 84, 26 86, 14 94 L 14 36 C 26 28, 46 26, 64 34 C 82 26, 102 28, 114 36 L 114 94 C 102 86, 82 84, 64 92 Z"
          fill="url(#amethyst-deep)" stroke="url(#gold-metal)" stroke-width="3" filter="url(#shadow-deep)"/>
    <path d="M 64 88 C 48 80, 28 82, 18 90 L 18 40 C 28 32, 48 30, 64 38 C 80 30, 100 32, 110 40 L 110 90 C 100 82, 80 80, 64 88 Z"
          fill="url(#parchment-page)"/>
    <path d="M 64 36 Q 66 68 62 102 L 56 110 L 68 110 L 64 102" fill="url(#gold-metal)" stroke="#78350f" stroke-width="1.5"/>
    <polygon points="72,12 44,52 64,52 50,86 88,44 68,44" fill="url(#gold-metal)" stroke="#ffffff" stroke-width="2.5" filter="url(#glow-stardust)"/>
    <circle cx="36" cy="54" r="8" fill="none" stroke="#9333ea" stroke-width="2"/>
    <line x1="28" y1="70" x2="48" y2="70" stroke="#7e22ce" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="92" cy="54" r="8" fill="none" stroke="#9333ea" stroke-width="2"/>
    <line x1="80" y1="70" x2="100" y2="70" stroke="#7e22ce" stroke-width="2.5" stroke-linecap="round"/>
  </g>`;

  // [7, 0]: Frost Wyrm Cryo-Orb (Freeze Timer Power-up)
  svg += `
  <g id="art-powerup-freeze" transform="translate(896, 0)" clip-path="url(#cell-clip)">
    <path d="M 24 96 Q 44 80 50 64" fill="none" stroke="url(#dragon-ivory)" stroke-width="6" stroke-linecap="round"/>
    <path d="M 104 96 Q 84 80 78 64" fill="none" stroke="url(#dragon-ivory)" stroke-width="6" stroke-linecap="round"/>
    <rect x="42" y="96" width="44" height="14" rx="6" fill="url(#gold-metal)" stroke="#78350f" stroke-width="2"/>
    <circle cx="64" cy="54" r="42" fill="url(#sapphire-mana)" stroke="#ffffff" stroke-width="3.5" filter="url(#glow-stardust)"/>
    <g transform="translate(64, 54)">
      <line x1="0" y1="-28" x2="0" y2="28" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="-24" y1="-14" x2="24" y2="14" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="-24" y1="14" x2="24" y2="-14" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
      <polygon points="0,-16 -6,-22 0,-20 6,-22" fill="#ffffff"/>
      <polygon points="0,16 -6,22 0,20 6,22" fill="#ffffff"/>
      <circle cx="0" cy="0" r="8" fill="url(#gold-metal)" stroke="#ffffff" stroke-width="2"/>
      <circle cx="0" cy="0" r="3" fill="#ffffff"/>
    </g>
    ${sparkAt(42, 32, 4)}
    ${sparkAt(86, 32, 4)}
  </g>`;

  // =========================================================================
  // ROW 1: Kuis & Benar-Salah (Original Intricate Fantasy Masterpieces)
  // =========================================================================

  // [0, 1]: Grand Open Grimoire Question Box with Curving Pages & Bookmark Ribbon
  svg += `
  <g id="art-quiz-question-box" transform="translate(0, 128)" clip-path="url(#cell-clip)">
    <path d="M 64 106 C 44 98, 22 100, 8 108 L 8 24 C 22 16, 44 14, 64 22 C 84 14, 106 16, 120 24 L 120 108 C 106 100, 84 98, 64 106 Z"
          fill="url(#amethyst-deep)" stroke="#2e1065" stroke-width="3.5" filter="url(#shadow-deep)"/>
    <polygon points="8,24 28,24 8,44" fill="url(#gold-metal)"/>
    <polygon points="120,24 100,24 120,44" fill="url(#gold-metal)"/>
    <polygon points="8,108 28,108 8,88" fill="url(#gold-metal)"/>
    <polygon points="120,108 100,108 120,88" fill="url(#gold-metal)"/>
    <path d="M 64 102 C 46 95, 24 97, 12 104 L 12 26 C 24 19, 46 17, 64 24 C 82 17, 104 19, 116 26 L 116 104 C 104 97, 82 95, 64 102 Z"
          fill="url(#gold-metal)"/>
    <path d="M 64 98 C 46 92, 26 94, 14 100 L 14 28 C 26 22, 46 20, 64 26 Z" fill="url(#parchment-page)"/>
    <path d="M 64 98 C 82 92, 102 94, 114 100 L 114 28 C 102 22, 82 20, 64 26 Z" fill="url(#parchment-page)"/>
    <line x1="64" y1="24" x2="64" y2="100" stroke="#581c87" stroke-width="3"/>
    <path d="M 64 22 Q 66 64 61 112 L 56 114 L 68 114 L 64 106" fill="url(#ruby-flame)" stroke="#881337" stroke-width="2" filter="url(#glow-ruby)"/>
    <circle cx="38" cy="50" r="12" fill="none" stroke="url(#gold-metal)" stroke-width="2.5"/>
    <polygon points="38,42 41,47 46,47 42,51 44,56 38,53 32,56 34,51 30,47 35,47" fill="url(#gold-metal)"/>
    <circle cx="90" cy="50" r="14" fill="url(#amethyst-deep)" stroke="url(#gold-metal)" stroke-width="2"/>
    <ellipse cx="90" cy="50" rx="9" ry="5" fill="#fdf4ff"/>
    <circle cx="90" cy="50" r="4" fill="#9333ea"/>
    ${sparkAt(104, 34, 4)}
  </g>`;

  // [1, 1]: Closed Leather Spellbook Choice Box with Ribbed Spine & Wax Seal
  svg += `
  <g id="art-quiz-answer-box" transform="translate(128, 128)" clip-path="url(#cell-clip)">
    <rect x="12" y="24" width="104" height="82" rx="14" fill="url(#amethyst-deep)" stroke="#2e1065" stroke-width="3" filter="url(#shadow-deep)"/>
    <rect x="36" y="30" width="74" height="70" rx="8" fill="url(#parchment-page)" stroke="url(#gold-metal)" stroke-width="2.5"/>
    <path d="M 12 36 C 12 28, 18 24, 28 24 L 36 24 L 36 106 L 28 106 C 18 106, 12 102, 12 94 Z" fill="url(#ancient-wood)" stroke="url(#gold-metal)" stroke-width="2"/>
    <line x1="12" y1="40" x2="36" y2="40" stroke="url(#gold-metal)" stroke-width="2.5"/>
    <line x1="12" y1="65" x2="36" y2="65" stroke="url(#gold-metal)" stroke-width="2.5"/>
    <line x1="12" y1="90" x2="36" y2="90" stroke="url(#gold-metal)" stroke-width="2.5"/>
    <circle cx="73" cy="65" r="18" fill="url(#gold-metal)" stroke="#78350f" stroke-width="2" filter="url(#glow-gold)"/>
    <polygon points="73,53 77,61 85,62 79,68 81,76 73,72 65,76 67,68 61,62 69,61" fill="#78350f"/>
    <circle cx="73" cy="65" r="4" fill="#facc15"/>
    <polygon points="116,24 100,24 116,40" fill="url(#gold-metal)"/>
    <polygon points="116,106 100,106 116,90" fill="url(#gold-metal)"/>
  </g>`;

  // [2, 1]: Awakened Stardust Spellbook (Hover State)
  svg += `
  <g id="art-quiz-answer-hover" transform="translate(256, 128)" clip-path="url(#cell-clip)">
    <rect x="10" y="22" width="108" height="86" rx="16" fill="url(#amethyst-bright)" stroke="#ffffff" stroke-width="4" filter="url(#glow-stardust)"/>
    <rect x="36" y="28" width="76" height="74" rx="10" fill="#ffffff" stroke="url(#gold-metal)" stroke-width="2.5"/>
    <path d="M 10 36 C 10 26, 18 22, 28 22 L 36 22 L 36 108 L 28 108 C 18 108, 10 104, 10 94 Z" fill="url(#gold-metal)" stroke="#78350f" stroke-width="2"/>
    <circle cx="74" cy="65" r="20" fill="url(#amethyst-deep)" stroke="#ffffff" stroke-width="3" filter="url(#glow-stardust)"/>
    <polygon points="74,52 83,65 74,78 65,65" fill="#facc15" filter="url(#glow-gold)"/>
    <circle cx="74" cy="65" r="5" fill="#ffffff"/>
    ${sparkAt(48, 40, 5)}
    ${sparkAt(100, 42, 5)}
  </g>`;

  // [3, 1]: Emerald Blessed Grimoire (Correct Answer)
  svg += `
  <g id="art-quiz-answer-correct" transform="translate(384, 128)" clip-path="url(#cell-clip)">
    <rect x="12" y="24" width="104" height="82" rx="14" fill="url(#emerald-crystal)" stroke="#ffffff" stroke-width="3.5" filter="url(#glow-emerald)"/>
    <rect x="36" y="30" width="74" height="70" rx="8" fill="#ecfdf5" stroke="url(#gold-metal)" stroke-width="2.5"/>
    <path d="M 12 36 C 12 28, 18 24, 28 24 L 36 24 L 36 106 L 28 106 C 18 106, 12 102, 12 94 Z" fill="#065f46" stroke="url(#gold-metal)" stroke-width="2"/>
    <circle cx="73" cy="65" r="18" fill="url(#emerald-crystal)" stroke="#ffffff" stroke-width="2.5" filter="url(#glow-stardust)"/>
    <path d="M 64 65 L 71 72 L 83 58" fill="none" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;

  // [4, 1]: Infernal Cursed Grimoire (Wrong Answer)
  svg += `
  <g id="art-quiz-answer-wrong" transform="translate(512, 128)" clip-path="url(#cell-clip)">
    <rect x="12" y="24" width="104" height="82" rx="14" fill="url(#ruby-flame)" stroke="#ffffff" stroke-width="3.5" filter="url(#glow-ruby)"/>
    <rect x="36" y="30" width="74" height="70" rx="8" fill="#fff1f2" stroke="#991b1b" stroke-width="2.5"/>
    <path d="M 12 36 C 12 28, 18 24, 28 24 L 36 24 L 36 106 L 28 106 C 18 106, 12 102, 12 94 Z" fill="#450a0a" stroke="#f43f5e" stroke-width="2"/>
    <circle cx="73" cy="65" r="16" fill="#0f172a" stroke="#f43f5e" stroke-width="2.5" filter="url(#glow-ruby)"/>
    <line x1="65" y1="57" x2="81" y2="73" stroke="#f43f5e" stroke-width="4" stroke-linecap="round"/>
    <line x1="81" y1="57" x2="65" y2="73" stroke="#f43f5e" stroke-width="4" stroke-linecap="round"/>
  </g>`;

  // [5, 1]: Imperial Royal Decree Scroll (True/False Card Box)
  svg += `
  <g id="art-truefalse-card-box" transform="translate(640, 128)" clip-path="url(#cell-clip)">
    <rect x="10" y="14" width="108" height="10" rx="5" fill="url(#ancient-wood)" stroke="url(#gold-metal)" stroke-width="2" filter="url(#glow-gold)"/>
    <circle cx="10" cy="19" r="7" fill="url(#gold-metal)"/>
    <circle cx="118" cy="19" r="7" fill="url(#gold-metal)"/>
    <rect x="10" y="104" width="108" height="10" rx="5" fill="url(#ancient-wood)" stroke="url(#gold-metal)" stroke-width="2" filter="url(#glow-gold)"/>
    <circle cx="10" cy="109" r="7" fill="url(#gold-metal)"/>
    <circle cx="118" cy="109" r="7" fill="url(#gold-metal)"/>
    <rect x="16" y="24" width="96" height="80" fill="url(#parchment-aged)" stroke="#78350f" stroke-width="2.5" filter="url(#shadow-deep)"/>
    <circle cx="64" cy="40" r="14" fill="url(#ruby-flame)" stroke="url(#gold-metal)" stroke-width="2" filter="url(#glow-ruby)"/>
    <polygon points="64,32 67,37 72,38 68,42 70,47 64,44 58,47 60,42 56,38 61,37" fill="url(#gold-metal)"/>
    <path d="M 60 52 L 56 68 L 62 64 L 64 68 Z" fill="#9f1239"/>
    <path d="M 68 52 L 72 68 L 66 64 L 64 68 Z" fill="#9f1239"/>
  </g>`;

  // [6, 1]: Emerald Dragon Heater Shield (BENAR Crest)
  svg += `
  <g id="art-btn-true-box" transform="translate(768, 128)" clip-path="url(#cell-clip)">
    <path d="M 16 22 L 112 22 C 112 22, 114 68, 64 116 C 14 68, 16 22, 16 22 Z"
          fill="url(#emerald-crystal)" stroke="url(#gold-metal)" stroke-width="4.5" filter="url(#glow-emerald)"/>
    <path d="M 24 30 L 104 30 C 104 30, 106 66, 64 104 C 22 66, 24 30, 24 30 Z"
          fill="#065f46" stroke="#a7f3d0" stroke-width="2"/>
    <path d="M 64 42 C 54 42, 46 50, 48 64 C 50 76, 64 84, 64 84 C 64 84, 78 76, 80 64 C 82 50, 74 42, 64 42 Z"
          fill="url(#gold-metal)" stroke="#78350f" stroke-width="2"/>
    <polygon points="52,42 42,32 50,48" fill="url(#gold-metal)"/>
    <polygon points="76,42 86,32 78,48" fill="url(#gold-metal)"/>
    <circle cx="56" cy="58" r="3.5" fill="#f43f5e" filter="url(#glow-ruby)"/>
    <circle cx="72" cy="58" r="3.5" fill="#f43f5e" filter="url(#glow-ruby)"/>
    <path d="M 44 64 L 58 78 L 84 50" fill="none" stroke="#ffffff" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow-stardust)"/>
  </g>`;

  // [7, 1]: Crimson Demon Aegis Barbed Shield (SALAH Crest)
  svg += `
  <g id="art-btn-false-box" transform="translate(896, 128)" clip-path="url(#cell-clip)">
    <path d="M 16 22 L 112 22 C 112 22, 116 70, 64 118 C 12 70, 16 22, 16 22 Z"
          fill="url(#ruby-flame)" stroke="url(#gold-metal)" stroke-width="4.5" filter="url(#glow-ruby)"/>
    <path d="M 24 30 L 104 30 C 104 30, 106 66, 64 104 C 22 66, 24 30, 24 30 Z"
          fill="url(#obsidian-dark)" stroke="#f43f5e" stroke-width="2"/>
    <path d="M 24 30 Q 10 14 6 28 Q 14 36 24 34 Z" fill="url(#gold-metal)"/>
    <path d="M 104 30 Q 118 14 122 28 Q 114 36 104 34 Z" fill="url(#gold-metal)"/>
    <line x1="42" y1="46" x2="86" y2="90" stroke="url(#gold-metal)" stroke-width="7" stroke-linecap="round"/>
    <line x1="86" y1="46" x2="42" y2="90" stroke="url(#gold-metal)" stroke-width="7" stroke-linecap="round"/>
    <line x1="42" y1="46" x2="86" y2="90" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
    <line x1="86" y1="46" x2="42" y2="90" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
    <circle cx="64" cy="68" r="12" fill="#0f172a" stroke="#ffffff" stroke-width="2"/>
    <ellipse cx="64" cy="68" rx="4" ry="8" fill="#f43f5e" filter="url(#glow-ruby)"/>
  </g>`;

  // =========================================================================
  // ROW 2: Buka Kotak & Flip Tiles (Peti Relik & Sampul Kartu Tarot)
  // =========================================================================

  // [0, 2]: Archmage Ancient Relic Chest (Closed)
  svg += `
  <g id="art-box-closed" transform="translate(0, 256)" clip-path="url(#cell-clip)">
    <rect x="16" y="46" width="96" height="66" rx="16" fill="url(#amethyst-deep)" stroke="url(#gold-metal)" stroke-width="4" filter="url(#shadow-deep)"/>
    <path d="M 10 48 C 10 30, 24 24, 64 24 C 104 24, 118 30, 118 48 Z" fill="url(#amethyst-bright)" stroke="url(#gold-metal)" stroke-width="3"/>
    <path d="M 16 66 Q 4 60 8 82 Q 16 86 16 76 Z" fill="url(#gold-metal)"/>
    <path d="M 112 66 Q 124 60 120 82 Q 112 86 112 76 Z" fill="url(#gold-metal)"/>
    <circle cx="64" cy="74" r="16" fill="url(#gold-metal)" stroke="#78350f" stroke-width="2.5" filter="url(#glow-gold)"/>
    <polygon points="64,62 72,74 64,86 56,74" fill="url(#amethyst-deep)"/>
    <circle cx="64" cy="74" r="5" fill="#f5d0fe" filter="url(#glow-stardust)"/>
    ${sparkAt(64, 40, 4)}
  </g>`;

  // [1, 2]: Unsealed Vault of Wonders (Open Chest with Erupting Stardust Pillars)
  svg += `
  <g id="art-box-open" transform="translate(128, 256)" clip-path="url(#cell-clip)">
    <polygon points="64,36 12,2 32,2" fill="#ffffff" opacity="0.8" filter="url(#glow-stardust)"/>
    <polygon points="64,36 54,0 74,0" fill="#fdf4ff" opacity="0.95"/>
    <polygon points="64,36 96,2 116,2" fill="#ffffff" opacity="0.8" filter="url(#glow-stardust)"/>
    <rect x="16" y="54" width="96" height="58" rx="16" fill="url(#amethyst-deep)" stroke="url(#gold-metal)" stroke-width="4" filter="url(#shadow-deep)"/>
    <ellipse cx="64" cy="54" rx="46" ry="14" fill="#f5d0fe" stroke="url(#gold-metal)" stroke-width="2"/>
    <polygon points="64,24 74,40 92,42 78,54 82,72 64,62 46,72 50,54 36,42 54,40" fill="url(#gold-metal)" stroke="#ffffff" stroke-width="2" filter="url(#glow-stardust)"/>
    <circle cx="64" cy="50" r="8" fill="url(#amethyst-bright)"/>
    ${sparkAt(32, 28, 5)}
    ${sparkAt(96, 28, 5)}
  </g>`;

  // [2, 2]: Celestial Sun King Treasure Vault (Gold Chest)
  svg += `
  <g id="art-box-gold" transform="translate(256, 256)" clip-path="url(#cell-clip)">
    <rect x="16" y="46" width="96" height="66" rx="16" fill="url(#gold-metal)" stroke="#78350f" stroke-width="4" filter="url(#glow-gold)"/>
    <path d="M 10 48 C 10 30, 24 24, 64 24 C 104 24, 118 30, 118 48 Z" fill="url(#gold-rim)" stroke="#ffffff" stroke-width="2.5"/>
    <circle cx="36" cy="38" r="4.5" fill="#f43f5e" filter="url(#glow-ruby)"/>
    <circle cx="64" cy="34" r="6" fill="#38bdf8" filter="url(#glow-stardust)"/>
    <circle cx="92" cy="38" r="4.5" fill="#10b981" filter="url(#glow-emerald)"/>
    <circle cx="64" cy="74" r="18" fill="#3b0764" stroke="#ffffff" stroke-width="2.5"/>
    <polygon points="64,62 69,70 78,71 71,77 73,86 64,81 55,86 57,77 50,71 59,70" fill="url(#gold-metal)" filter="url(#glow-gold)"/>
  </g>`;

  // [3, 2]: Flying Winged Chest Lid (Box Lid)
  svg += `
  <g id="art-box-lid" transform="translate(384, 256)" clip-path="url(#cell-clip)">
    <g transform="rotate(-18 64 54)">
      <path d="M 10 48 C 10 30, 24 24, 64 24 C 104 24, 118 30, 118 48 Z" fill="url(#amethyst-deep)" stroke="url(#gold-metal)" stroke-width="3.5" filter="url(#glow-gold)"/>
      <path d="M 14 48 C 14 34, 26 28, 64 28 C 102 28, 114 34, 114 48 Z" fill="url(#ruby-flame)"/>
      <path d="M 10 44 Q 0 34 2 20 Q 14 26 12 40 Z" fill="url(#gold-metal)"/>
      <path d="M 118 44 Q 128 34 126 20 Q 114 26 116 40 Z" fill="url(#gold-metal)"/>
      <circle cx="64" cy="36" r="8" fill="url(#gold-metal)" filter="url(#glow-gold)"/>
      <circle cx="64" cy="36" r="4" fill="#ffffff"/>
    </g>
  </g>`;

  // [4, 2]: Illuminated Tarot Grimoire Cover (Flip Tiles Card Back)
  svg += `
  <g id="art-card-back" transform="translate(512, 256)" clip-path="url(#cell-clip)">
    <rect x="14" y="12" width="100" height="104" rx="16" fill="url(#amethyst-deep)" stroke="url(#gold-metal)" stroke-width="3.5" filter="url(#shadow-deep)"/>
    <rect x="20" y="18" width="88" height="92" rx="12" fill="none" stroke="url(#gold-metal)" stroke-width="2" stroke-dasharray="6,4"/>
    <polygon points="20,18 36,18 20,34" fill="url(#gold-metal)"/>
    <polygon points="108,18 92,18 108,34" fill="url(#gold-metal)"/>
    <polygon points="20,110 36,110 20,94" fill="url(#gold-metal)"/>
    <polygon points="108,110 92,110 108,94" fill="url(#gold-metal)"/>
    <circle cx="64" cy="64" r="26" fill="none" stroke="url(#gold-metal)" stroke-width="2.5" filter="url(#glow-gold)"/>
    <polygon points="64,42 70,58 86,64 70,70 64,86 58,70 42,64 58,58" fill="#ffffff" filter="url(#glow-stardust)"/>
    <circle cx="64" cy="64" r="7" fill="url(#sapphire-mana)"/>
    <circle cx="64" cy="64" r="3" fill="#ffffff"/>
  </g>`;

  // [5, 2]: Enchanted Baroque Mirror Plate (Flip Tiles Card Front)
  svg += `
  <g id="art-card-front" transform="translate(640, 256)" clip-path="url(#cell-clip)">
    <rect x="10" y="10" width="108" height="108" rx="16" fill="url(#parchment-page)" stroke="url(#gold-metal)" stroke-width="4" filter="url(#shadow-deep)"/>
    <rect x="18" y="18" width="92" height="92" rx="10" fill="url(#dragon-ivory)" stroke="#c084fc" stroke-width="2"/>
    <polygon points="18,18 34,18 18,34" fill="url(#gold-metal)"/>
    <polygon points="110,18 94,18 110,34" fill="url(#gold-metal)"/>
    <polygon points="18,110 34,110 18,94" fill="url(#gold-metal)"/>
    <polygon points="110,110 94,110 110,94" fill="url(#gold-metal)"/>
  </g>`;

  // [6, 2]: Awakened Radiant Astral Crest (Flip Tiles Card Matched)
  svg += `
  <g id="art-card-matched" transform="translate(768, 256)" clip-path="url(#cell-clip)">
    <rect x="14" y="12" width="100" height="104" rx="16" fill="#ecfdf5" stroke="url(#emerald-crystal)" stroke-width="4" filter="url(#glow-emerald)"/>
    <g transform="translate(64, 64)">
      <line x1="-36" y1="0" x2="36" y2="0" stroke="url(#gold-metal)" stroke-width="3"/>
      <line x1="0" y1="-36" x2="0" y2="36" stroke="url(#gold-metal)" stroke-width="3"/>
      <line x1="-25" y1="-25" x2="25" y2="25" stroke="url(#gold-metal)" stroke-width="2.5"/>
      <line x1="25" y1="-25" x2="-25" y2="25" stroke="url(#gold-metal)" stroke-width="2.5"/>
    </g>
    <circle cx="64" cy="64" r="26" fill="url(#emerald-crystal)" stroke="#ffffff" stroke-width="3" filter="url(#glow-stardust)"/>
    <path d="M 52 64 L 60 72 L 76 54" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    ${sparkAt(32, 28, 5)}
    ${sparkAt(96, 28, 5)}
  </g>`;

  // [7, 2]: Stone Socket Constellation Pedestal (Card Placeholder)
  svg += `
  <g id="art-card-placeholder" transform="translate(896, 256)" clip-path="url(#cell-clip)">
    <rect x="14" y="12" width="100" height="104" rx="16" fill="url(#amethyst-deep)" stroke="#c084fc" stroke-width="3" stroke-dasharray="6,6"/>
    <polygon points="26,24 34,24 26,32" fill="#38bdf8" filter="url(#glow-stardust)"/>
    <polygon points="102,24 94,24 102,32" fill="#38bdf8" filter="url(#glow-stardust)"/>
    <polygon points="26,104 34,104 26,96" fill="#38bdf8" filter="url(#glow-stardust)"/>
    <polygon points="102,104 94,104 102,96" fill="#38bdf8" filter="url(#glow-stardust)"/>
    <circle cx="48" cy="50" r="4" fill="#ffffff" filter="url(#glow-stardust)"/>
    <circle cx="80" cy="50" r="4" fill="#ffffff" filter="url(#glow-stardust)"/>
    <circle cx="64" cy="78" r="4" fill="#ffffff" filter="url(#glow-stardust)"/>
    <line x1="48" y1="50" x2="80" y2="50" stroke="#c084fc" stroke-width="2"/>
    <line x1="80" y1="50" x2="64" y2="78" stroke="#c084fc" stroke-width="2"/>
    <line x1="64" y1="78" x2="48" y2="50" stroke="#c084fc" stroke-width="2"/>
  </g>`;

  // =========================================================================
  // ROW 3: Menjodohkan & Pengelompokan (Mimbar Alkimia & Kuali Sihir)
  // =========================================================================

  // [0, 3]: Alchemist's Reading Lectern & Scroll with Peacock Feather Quill
  svg += `
  <g id="art-matchup-prompt-box" transform="translate(0, 384)" clip-path="url(#cell-clip)">
    <rect x="6" y="16" width="116" height="96" rx="16" fill="url(#parchment-aged)" stroke="url(#ancient-wood)" stroke-width="3.5" filter="url(#shadow-deep)"/>
    <rect x="10" y="20" width="108" height="18" rx="6" fill="url(#ancient-wood)" stroke="url(#gold-metal)" stroke-width="1.5"/>
    <circle cx="18" cy="29" r="4" fill="url(#gold-metal)"/>
    <circle cx="110" cy="29" r="4" fill="url(#gold-metal)"/>
    <polygon points="64,22 68,29 64,35 60,29" fill="url(#gold-metal)"/>
    <rect x="14" y="42" width="100" height="64" rx="8" fill="#ffffff" stroke="#c084fc" stroke-width="1.5"/>
    <path d="M 98 44 C 102 34, 110 28, 112 30 C 108 38, 100 50, 98 56 Z" fill="url(#sapphire-mana)" stroke="url(#gold-metal)" stroke-width="1"/>
  </g>`;

  // [1, 3]: Mystic Ritual Stone Socket Slate
  svg += `
  <g id="art-matchup-slot-box" transform="translate(128, 384)" clip-path="url(#cell-clip)">
    <rect x="6" y="16" width="116" height="96" rx="16" fill="url(#amethyst-deep)" stroke="#c084fc" stroke-width="3" stroke-dasharray="6,6" filter="url(#shadow-deep)"/>
    <polygon points="16,26 28,26 16,38" fill="url(#gold-metal)"/>
    <polygon points="112,26 100,26 112,38" fill="url(#gold-metal)"/>
    <polygon points="16,102 28,102 16,90" fill="url(#gold-metal)"/>
    <polygon points="112,102 100,102 112,90" fill="url(#gold-metal)"/>
    <rect x="20" y="30" width="88" height="68" rx="10" fill="#2e1065" stroke="#e879f9" stroke-width="1.5" opacity="0.85"/>
  </g>`;

  // [2, 3]: Enchanted Floating Rune Slate with Hovering Cyan Crystal
  svg += `
  <g id="art-matchup-item-box" transform="translate(256, 384)" clip-path="url(#cell-clip)">
    <rect x="6" y="20" width="116" height="88" rx="16" fill="url(#parchment-page)" stroke="url(#gold-metal)" stroke-width="3" filter="url(#shadow-deep)"/>
    <rect x="12" y="26" width="12" height="76" rx="4" fill="url(#gold-metal)"/>
    <circle cx="18" cy="64" r="3.5" fill="#38bdf8"/>
    <rect x="104" y="26" width="12" height="76" rx="4" fill="url(#gold-metal)"/>
    <circle cx="110" cy="64" r="3.5" fill="#38bdf8"/>
    <rect x="28" y="26" width="72" height="76" rx="8" fill="#ffffff" stroke="#e9d5ff" stroke-width="1.5"/>
  </g>`;

  // [3, 3]: Archivist's Magical Tome Shelf (Book Bank)
  svg += `
  <g id="art-matchup-bank-box" transform="translate(384, 384)" clip-path="url(#cell-clip)">
    <rect x="8" y="18" width="112" height="94" rx="16" fill="url(#ancient-wood)" stroke="url(#gold-metal)" stroke-width="3.5" filter="url(#shadow-deep)"/>
    <path d="M 12 24 L 116 24 L 110 32 L 18 32 Z" fill="url(#gold-metal)"/>
    <rect x="14" y="60" width="100" height="6" fill="url(#gold-metal)"/>
    <rect x="20" y="34" width="12" height="26" rx="2" fill="url(#ruby-flame)"/>
    <rect x="34" y="38" width="10" height="22" rx="2" fill="url(#emerald-crystal)"/>
    <rect x="46" y="32" width="14" height="28" rx="2" fill="url(#amethyst-deep)"/>
    <circle cx="78" cy="48" r="8" fill="url(#sapphire-mana)" filter="url(#glow-stardust)"/>
    <rect x="76" y="38" width="4" height="4" fill="url(#gold-metal)"/>
    <rect x="22" y="68" width="14" height="38" rx="2" fill="url(#amethyst-bright)"/>
    <rect x="38" y="72" width="12" height="34" rx="2" fill="url(#gold-metal)"/>
    <circle cx="64" cy="88" r="7" fill="url(#parchment-aged)" stroke="#78350f" stroke-width="1.5"/>
    <rect x="78" y="70" width="14" height="36" rx="2" fill="url(#ruby-flame)"/>
    <rect x="94" y="74" width="12" height="32" rx="2" fill="url(#emerald-crystal)"/>
  </g>`;

  // [4, 3]: Oceanic Sapphire Cauldron (Bucket 1)
  svg += `
  <g id="art-groupsort-bucket-1" transform="translate(512, 384)" clip-path="url(#cell-clip)">
    <path d="M 20 44 L 28 106 C 30 114, 38 118, 48 118 L 80 118 C 90 118, 98 114, 100 106 L 108 44 Z"
          fill="url(#obsidian-dark)" stroke="url(#gold-metal)" stroke-width="3.5" filter="url(#shadow-deep)"/>
    <ellipse cx="16" cy="62" rx="6" ry="12" fill="none" stroke="url(#gold-metal)" stroke-width="3.5"/>
    <ellipse cx="112" cy="62" rx="6" ry="12" fill="none" stroke="url(#gold-metal)" stroke-width="3.5"/>
    <ellipse cx="64" cy="44" rx="44" ry="15" fill="url(#sapphire-mana)" stroke="#ffffff" stroke-width="2.5" filter="url(#glow-stardust)"/>
    <circle cx="48" cy="26" r="6" fill="#e0f2fe" filter="url(#glow-stardust)"/>
    <circle cx="76" cy="22" r="5" fill="#bae6fd"/>
    <circle cx="64" cy="16" r="4" fill="#ffffff" filter="url(#glow-stardust)"/>
    <polygon points="64,68 84,78 64,102 44,78" fill="url(#gold-metal)" stroke="#78350f" stroke-width="2"/>
    <circle cx="64" cy="82" r="6" fill="url(#sapphire-mana)"/>
  </g>`;

  // [5, 3]: Verdant Emerald Cauldron (Bucket 2)
  svg += `
  <g id="art-groupsort-bucket-2" transform="translate(640, 384)" clip-path="url(#cell-clip)">
    <path d="M 20 44 L 28 106 C 30 114, 38 118, 48 118 L 80 118 C 90 118, 98 114, 100 106 L 108 44 Z"
          fill="url(#obsidian-dark)" stroke="url(#gold-metal)" stroke-width="3.5" filter="url(#shadow-deep)"/>
    <ellipse cx="16" cy="62" rx="6" ry="12" fill="none" stroke="url(#gold-metal)" stroke-width="3.5"/>
    <ellipse cx="112" cy="62" rx="6" ry="12" fill="none" stroke="url(#gold-metal)" stroke-width="3.5"/>
    <ellipse cx="64" cy="44" rx="44" ry="15" fill="url(#emerald-crystal)" stroke="#ffffff" stroke-width="2.5" filter="url(#glow-emerald)"/>
    <circle cx="46" cy="24" r="5.5" fill="#a7f3d0" filter="url(#glow-stardust)"/>
    <circle cx="74" cy="20" r="5" fill="#6ee7b7"/>
    <circle cx="60" cy="14" r="4" fill="#ffffff"/>
    <polygon points="64,68 84,78 64,102 44,78" fill="url(#gold-metal)" stroke="#78350f" stroke-width="2"/>
    <circle cx="64" cy="82" r="6" fill="url(#emerald-crystal)"/>
  </g>`;

  // [6, 3]: Royal Amethyst Cauldron (Bucket 3)
  svg += `
  <g id="art-groupsort-bucket-3" transform="translate(768, 384)" clip-path="url(#cell-clip)">
    <path d="M 20 44 L 28 106 C 30 114, 38 118, 48 118 L 80 118 C 90 118, 98 114, 100 106 L 108 44 Z"
          fill="url(#obsidian-dark)" stroke="url(#gold-metal)" stroke-width="3.5" filter="url(#shadow-deep)"/>
    <ellipse cx="16" cy="62" rx="6" ry="12" fill="none" stroke="url(#gold-metal)" stroke-width="3.5"/>
    <ellipse cx="112" cy="62" rx="6" ry="12" fill="none" stroke="url(#gold-metal)" stroke-width="3.5"/>
    <ellipse cx="64" cy="44" rx="44" ry="15" fill="url(#amethyst-bright)" stroke="#ffffff" stroke-width="2.5" filter="url(#glow-stardust)"/>
    <circle cx="48" cy="24" r="5.5" fill="#f5d0fe" filter="url(#glow-stardust)"/>
    <circle cx="76" cy="20" r="5" fill="#e879f9"/>
    <circle cx="64" cy="14" r="4" fill="#ffffff"/>
    <polygon points="64,68 84,78 64,102 44,78" fill="url(#gold-metal)" stroke="#78350f" stroke-width="2"/>
    <circle cx="64" cy="82" r="6" fill="url(#amethyst-deep)"/>
  </g>`;

  // [7, 3]: Group Sort Active Card Box
  svg += `
  <g id="art-groupsort-card-box" transform="translate(896, 384)" clip-path="url(#cell-clip)">
    <rect x="8" y="16" width="112" height="96" rx="16" fill="url(#parchment-page)" stroke="url(#gold-metal)" stroke-width="3.5" filter="url(#shadow-deep)"/>
    <rect x="16" y="24" width="96" height="80" rx="10" fill="#ffffff" stroke="#c084fc" stroke-width="2"/>
    <polygon points="16,24 30,24 16,38" fill="url(#gold-metal)"/>
    <polygon points="112,24 98,24 112,38" fill="url(#gold-metal)"/>
    <polygon points="16,104 30,104 16,90" fill="url(#gold-metal)"/>
    <polygon points="112,104 98,104 112,90" fill="url(#gold-metal)"/>
  </g>`;

  // =========================================================================
  // ROW 4: Fruit Slicer -> 6 Enchanted Mythical Relics
  // =========================================================================

  // [0, 4]: Astral Dragon Melon
  svg += `
  <g id="art-fruit-watermelon" transform="translate(0, 512)" clip-path="url(#cell-clip)">
    <ellipse cx="64" cy="64" rx="52" ry="46" fill="url(#emerald-crystal)" stroke="#064e3b" stroke-width="3.5" filter="url(#shadow-deep)"/>
    <path d="M 24 40 Q 64 34 104 40" fill="none" stroke="#a7f3d0" stroke-width="4" stroke-linecap="round"/>
    <path d="M 16 64 Q 64 60 112 64" fill="none" stroke="#a7f3d0" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M 24 88 Q 64 92 104 88" fill="none" stroke="#a7f3d0" stroke-width="4" stroke-linecap="round"/>
    <path d="M 28 64 C 28 92, 50 106, 64 106 C 78 106, 100 92, 100 64 Z" fill="url(#ruby-flame)" stroke="#ffffff" stroke-width="2" filter="url(#glow-ruby)"/>
    <polygon points="46,74 48,80 44,80" fill="#3b0764"/>
    <polygon points="64,78 66,84 62,84" fill="#3b0764"/>
    <polygon points="82,74 84,80 80,80" fill="#3b0764"/>
    <circle cx="64" cy="18" r="6" fill="url(#gold-metal)"/>
    ${sparkAt(64, 46, 5)}
  </g>`;

  // [1, 4]: Solar Phoenix Orange
  svg += `
  <g id="art-fruit-orange" transform="translate(128, 512)" clip-path="url(#cell-clip)">
    <circle cx="64" cy="64" r="46" fill="url(#gold-rim)" stroke="#78350f" stroke-width="3.5" filter="url(#glow-gold)"/>
    <ellipse cx="64" cy="64" rx="36" ry="36" fill="url(#gold-metal)"/>
    <path d="M 64 22 C 76 10, 96 16, 92 34 C 80 34, 70 28, 64 22 Z" fill="url(#emerald-crystal)" stroke="#064e3b" stroke-width="2"/>
    <circle cx="64" cy="22" r="4.5" fill="#78350f"/>
    <path d="M 64 34 L 64 94 M 34 64 L 94 64 M 43 43 L 85 85 M 43 85 L 85 43" stroke="#fffbeb" stroke-width="2.5" opacity="0.8"/>
    <circle cx="64" cy="64" r="9" fill="#ffffff" filter="url(#glow-stardust)"/>
    <circle cx="64" cy="64" r="4" fill="#facc15"/>
    ${sparkAt(88, 44, 4)}
  </g>`;

  // [2, 4]: Arcane Amethyst Apple
  svg += `
  <g id="art-fruit-apple" transform="translate(256, 512)" clip-path="url(#cell-clip)">
    <path d="M 64 34 C 44 14, 14 34, 18 68 C 22 98, 48 112, 64 112 C 80 112, 106 98, 110 68 C 114 34, 84 14, 64 34 Z"
          fill="url(#amethyst-deep)" stroke="url(#gold-metal)" stroke-width="3.5" filter="url(#glow-stardust)"/>
    <path d="M 64 34 Q 60 16 68 8" fill="none" stroke="url(#ancient-wood)" stroke-width="5" stroke-linecap="round"/>
    <path d="M 68 14 C 84 10, 94 20, 88 30 C 76 30, 70 22, 68 14 Z" fill="url(#emerald-crystal)" stroke="#064e3b" stroke-width="2" filter="url(#glow-emerald)"/>
    <polygon points="64,48 76,64 64,80 52,64" fill="#ffffff" opacity="0.85" filter="url(#glow-stardust)"/>
    <circle cx="64" cy="64" r="6" fill="#f0abfc"/>
    ${sparkAt(42, 46, 5)}
  </g>`;

  // [3, 4]: Celestial Crescent Moon Banana
  svg += `
  <g id="art-fruit-banana" transform="translate(384, 512)" clip-path="url(#cell-clip)">
    <path d="M 28 28 C 58 20, 106 48, 108 96 C 88 88, 54 74, 38 48 C 30 38, 28 28, 28 28 Z"
          fill="url(#gold-metal)" stroke="#78350f" stroke-width="3.5" filter="url(#glow-gold)"/>
    <rect x="22" y="24" width="8" height="8" rx="2" fill="url(#ancient-wood)"/>
    <path d="M 106 94 L 112 102 L 102 100 Z" fill="#78350f"/>
    <path d="M 32 32 C 58 28, 96 52, 102 90" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="68" cy="52" r="5" fill="#38bdf8" filter="url(#glow-stardust)"/>
    <circle cx="86" cy="72" r="4" fill="#38bdf8" filter="url(#glow-stardust)"/>
    ${sparkAt(54, 40, 5)}
  </g>`;

  // [4, 4]: Imperial Crimson Ruby Strawberry
  svg += `
  <g id="art-fruit-strawberry" transform="translate(512, 512)" clip-path="url(#cell-clip)">
    <path d="M 64 114 C 44 98, 18 78, 20 48 C 22 28, 44 26, 64 34 C 84 26, 106 28, 108 48 C 110 78, 84 98, 64 114 Z"
          fill="url(#ruby-flame)" stroke="url(#gold-metal)" stroke-width="3.5" filter="url(#glow-ruby)"/>
    <path d="M 64 32 L 64 14" stroke="url(#ancient-wood)" stroke-width="4.5" stroke-linecap="round"/>
    <polygon points="64,30 50,38 56,26 44,22 58,20 64,10 70,20 84,22 72,26 78,38" fill="url(#emerald-crystal)" stroke="#064e3b" stroke-width="2"/>
    <circle cx="44" cy="52" r="3" fill="url(#gold-metal)"/>
    <circle cx="64" cy="58" r="3.5" fill="url(#gold-metal)"/>
    <circle cx="84" cy="52" r="3" fill="url(#gold-metal)"/>
    <circle cx="52" cy="74" r="3" fill="url(#gold-metal)"/>
    <circle cx="76" cy="74" r="3" fill="url(#gold-metal)"/>
    <circle cx="64" cy="92" r="3" fill="url(#gold-metal)"/>
    ${sparkAt(64, 46, 5)}
  </g>`;

  // [5, 4]: Nether Void Cursed Bomb (Obsidian with Amethyst Wick Flame)
  svg += `
  <g id="art-fruit-bomb" transform="translate(640, 512)" clip-path="url(#cell-clip)">
    <circle cx="64" cy="68" r="44" fill="url(#obsidian-dark)" stroke="url(#ruby-flame)" stroke-width="4.5" filter="url(#shadow-deep)"/>
    <path d="M 64 24 Q 68 44 60 68 Q 74 88 64 112" fill="none" stroke="#f43f5e" stroke-width="2.5"/>
    <path d="M 20 68 Q 44 60 68 68 Q 92 76 108 68" fill="none" stroke="#f43f5e" stroke-width="2.5"/>
    <rect x="52" y="20" width="24" height="10" rx="3" fill="url(#gold-metal)" stroke="#78350f" stroke-width="1.5"/>
    <path d="M 64 20 Q 72 10 82 12" fill="none" stroke="#e2e8f0" stroke-width="3" stroke-linecap="round"/>
    <polygon points="84,12 88,4 94,8 102,2 98,12 106,16 94,18 90,26 86,18" fill="url(#amethyst-bright)" filter="url(#cursed-miasma)"/>
    <circle cx="92" cy="12" r="4" fill="#ffffff" filter="url(#glow-stardust)"/>
    <polygon points="56,60 62,64 56,68" fill="#f43f5e"/>
    <polygon points="72,60 66,64 72,68" fill="#f43f5e"/>
    <path d="M 58 78 Q 64 82 70 78" fill="none" stroke="#f43f5e" stroke-width="2.5"/>
  </g>`;

  // [6, 4]: Fruit Slicer Prompt Banner Box
  svg += `
  <g id="art-fruit-badge-box" transform="translate(768, 512)" clip-path="url(#cell-clip)">
    <rect x="8" y="24" width="112" height="80" rx="16" fill="url(#parchment-page)" stroke="url(#gold-metal)" stroke-width="3.5" filter="url(#shadow-deep)"/>
    <rect x="16" y="32" width="96" height="64" rx="10" fill="#ffffff" stroke="#c084fc" stroke-width="2"/>
    <polygon points="16,32 30,32 16,46" fill="url(#gold-metal)"/>
    <polygon points="112,32 98,32 112,46" fill="url(#gold-metal)"/>
    <polygon points="16,96 30,96 16,82" fill="url(#gold-metal)"/>
    <polygon points="112,96 98,96 112,82" fill="url(#gold-metal)"/>
  </g>`;

  // [7, 4]: Sliced Mana Splash Effect
  svg += `
  <g id="art-fruit-splash" transform="translate(896, 512)" clip-path="url(#cell-clip)">
    <circle cx="64" cy="64" r="28" fill="url(#amethyst-bright)" filter="url(#glow-stardust)"/>
    <circle cx="64" cy="64" r="14" fill="#ffffff"/>
    <circle cx="34" cy="38" r="8" fill="url(#amethyst-bright)"/>
    <circle cx="94" cy="42" r="7" fill="url(#amethyst-bright)"/>
    <circle cx="40" cy="90" r="9" fill="url(#amethyst-bright)"/>
    <circle cx="92" cy="88" r="8" fill="url(#amethyst-bright)"/>
    <circle cx="64" cy="20" r="6" fill="#f0abfc"/>
    <circle cx="64" cy="108" r="6" fill="#f0abfc"/>
    ${sparkAt(64, 64, 8)}
  </g>`;

  // =========================================================================
  // ROW 5: Putar Roda & Kata (Astro-Runic Wheel & Ubin Batu Rune)
  // =========================================================================

  // [0, 5]: Astro-Runic Zodiac Ring
  svg += `
  <g id="art-wheel-rim" transform="translate(0, 640)" clip-path="url(#cell-clip)">
    <circle cx="64" cy="64" r="54" fill="none" stroke="url(#gold-metal)" stroke-width="12" filter="url(#glow-gold)"/>
    <circle cx="64" cy="64" r="48" fill="none" stroke="#2e1065" stroke-width="2"/>
    <circle cx="64" cy="64" r="60" fill="none" stroke="#2e1065" stroke-width="2"/>
    <circle cx="64" cy="10" r="5" fill="#f43f5e" filter="url(#glow-ruby)"/>
    <circle cx="64" cy="118" r="5" fill="#f43f5e" filter="url(#glow-ruby)"/>
    <circle cx="10" cy="64" r="5" fill="#10b981" filter="url(#glow-emerald)"/>
    <circle cx="118" cy="64" r="5" fill="#10b981" filter="url(#glow-emerald)"/>
    <circle cx="26" cy="26" r="4" fill="#38bdf8" filter="url(#glow-stardust)"/>
    <circle cx="102" cy="26" r="4" fill="#38bdf8" filter="url(#glow-stardust)"/>
    <circle cx="26" cy="102" r="4" fill="#38bdf8" filter="url(#glow-stardust)"/>
    <circle cx="102" cy="102" r="4" fill="#38bdf8" filter="url(#glow-stardust)"/>
  </g>`;

  // [1, 5]: Archmage Sovereign Hub Medallion (Wheel Center)
  svg += `
  <g id="art-wheel-center" transform="translate(128, 640)" clip-path="url(#cell-clip)">
    <circle cx="64" cy="64" r="46" fill="url(#amethyst-deep)" stroke="url(#gold-metal)" stroke-width="5" filter="url(#glow-gold)"/>
    <circle cx="64" cy="64" r="32" fill="url(#amethyst-bright)" stroke="#ffffff" stroke-width="3"/>
    <polygon points="64,36 72,54 92,64 72,74 64,92 56,74 36,64 56,54" fill="url(#gold-metal)" stroke="#ffffff" stroke-width="1.5" filter="url(#glow-stardust)"/>
    <circle cx="64" cy="64" r="8" fill="#ffffff" filter="url(#glow-stardust)"/>
    <circle cx="64" cy="64" r="4" fill="#facc15"/>
  </g>`;

  // [2, 5]: Dragon-Head Gilded Compass Needle (Pointer)
  svg += `
  <g id="art-wheel-pointer" transform="translate(256, 640)" clip-path="url(#cell-clip)">
    <polygon points="64,8 86,64 72,60 64,118 56,60 42,64" fill="url(#gold-metal)" stroke="#78350f" stroke-width="3" filter="url(#glow-gold)"/>
    <polygon points="64,16 78,58 64,106 50,58" fill="#ffffff" opacity="0.6"/>
    <circle cx="64" cy="60" r="14" fill="url(#ruby-flame)" stroke="#ffffff" stroke-width="2.5" filter="url(#glow-ruby)"/>
    <circle cx="64" cy="60" r="6" fill="#ffffff"/>
    <polygon points="64,8 68,18 64,24 60,18" fill="#ffffff" filter="url(#glow-stardust)"/>
  </g>`;

  // [3, 5]: Spin Button Plaque Box
  svg += `
  <g id="art-wheel-btn-box" transform="translate(384, 640)" clip-path="url(#cell-clip)">
    <rect x="8" y="24" width="112" height="80" rx="20" fill="url(#amethyst-deep)" stroke="url(#gold-metal)" stroke-width="4" filter="url(#shadow-deep)"/>
    <rect x="16" y="32" width="96" height="64" rx="14" fill="url(#gold-metal)" stroke="#ffffff" stroke-width="2"/>
    <circle cx="24" cy="40" r="4" fill="#78350f"/>
    <circle cx="104" cy="40" r="4" fill="#78350f"/>
    <circle cx="24" cy="88" r="4" fill="#78350f"/>
    <circle cx="104" cy="88" r="4" fill="#78350f"/>
  </g>`;

  // [4, 5]: Carved Rune Stone Tablet (Anagram Letter Tile)
  svg += `
  <g id="art-tile-letter-box" transform="translate(512, 640)" clip-path="url(#cell-clip)">
    <rect x="8" y="12" width="112" height="104" rx="16" fill="url(#parchment-page)" stroke="url(#gold-metal)" stroke-width="3.5" filter="url(#shadow-deep)"/>
    <rect x="16" y="20" width="96" height="88" rx="10" fill="#ffffff" stroke="#d8b4fe" stroke-width="2"/>
    <polygon points="16,20 28,20 16,32" fill="url(#gold-metal)"/>
    <polygon points="112,20 100,20 112,32" fill="url(#gold-metal)"/>
    <polygon points="16,108 28,108 16,96" fill="url(#gold-metal)"/>
    <polygon points="112,108 100,108 112,96" fill="url(#gold-metal)"/>
  </g>`;

  // [5, 5]: Carved Stone Indentation (Anagram Letter Slot)
  svg += `
  <g id="art-tile-letter-slot" transform="translate(640, 640)" clip-path="url(#cell-clip)">
    <rect x="8" y="12" width="112" height="104" rx="16" fill="url(#amethyst-deep)" stroke="#c084fc" stroke-width="3" stroke-dasharray="6,5" filter="url(#shadow-deep)"/>
    <rect x="16" y="20" width="96" height="88" rx="10" fill="#2e1065" opacity="0.6"/>
  </g>`;

  // [6, 5]: Polished Alabaster Tile (Wordsearch Cell)
  svg += `
  <g id="art-wordsearch-cell-box" transform="translate(768, 640)" clip-path="url(#cell-clip)">
    <rect x="10" y="10" width="108" height="108" rx="14" fill="#ffffff" stroke="#d8b4fe" stroke-width="2.5" filter="url(#shadow-deep)"/>
    <rect x="16" y="16" width="96" height="96" rx="10" fill="#faf5ff" stroke="none"/>
  </g>`;

  // [7, 5]: Blazing Topaz Flare Tile (Wordsearch Found Cell)
  svg += `
  <g id="art-wordsearch-found-box" transform="translate(896, 640)" clip-path="url(#cell-clip)">
    <rect x="10" y="10" width="108" height="108" rx="14" fill="url(#gold-metal)" stroke="#ffffff" stroke-width="3" filter="url(#glow-gold)"/>
    <rect x="16" y="16" width="96" height="96" rx="10" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
    ${sparkAt(24, 24, 4)}
    ${sparkAt(104, 104, 4)}
  </g>`;

  // =========================================================================
  // ROW 6: Whack-a-Mole (Tikus Penyihir & Tongkat Bintang Agung)
  // =========================================================================

  // [0, 6]: Abyssal Void Portal Pit (Mole Hole)
  svg += `
  <g id="art-mole-hole" transform="translate(0, 768)" clip-path="url(#cell-clip)">
    <ellipse cx="64" cy="74" rx="56" ry="32" fill="url(#ancient-wood)" stroke="url(#gold-metal)" stroke-width="3" filter="url(#shadow-deep)"/>
    <ellipse cx="64" cy="72" rx="48" ry="24" fill="#020617"/>
    <ellipse cx="64" cy="72" rx="42" ry="18" fill="url(#amethyst-deep)" opacity="0.8"/>
    <ellipse cx="64" cy="72" rx="34" ry="12" fill="none" stroke="#c084fc" stroke-width="2" stroke-dasharray="6,4"/>
    <circle cx="64" cy="72" r="6" fill="#38bdf8" filter="url(#glow-stardust)"/>
  </g>`;

  // [1, 6]: Mischievous Sorcerer Mole
  svg += `
  <g id="art-mole-normal" transform="translate(128, 768)" clip-path="url(#cell-clip)">
    <ellipse cx="64" cy="78" rx="34" ry="32" fill="#78350f" stroke="#451a03" stroke-width="3"/>
    <ellipse cx="64" cy="84" rx="22" ry="18" fill="#fde68a"/>
    <circle cx="36" cy="56" r="12" fill="#78350f"/>
    <circle cx="36" cy="56" r="7" fill="#fbcfe8"/>
    <circle cx="92" cy="56" r="12" fill="#78350f"/>
    <circle cx="92" cy="56" r="7" fill="#fbcfe8"/>
    <ellipse cx="52" cy="72" rx="6" ry="8" fill="#0f172a"/>
    <circle cx="50" cy="70" r="2.5" fill="#ffffff"/>
    <ellipse cx="76" cy="72" rx="6" ry="8" fill="#0f172a"/>
    <circle cx="74" cy="70" r="2.5" fill="#ffffff"/>
    <ellipse cx="64" cy="82" rx="6" ry="4" fill="#f43f5e"/>
    <rect x="61" y="86" width="6" height="6" fill="#ffffff"/>
    <polygon points="64,6 40,54 88,54" fill="url(#amethyst-deep)" stroke="url(#gold-metal)" stroke-width="2.5"/>
    <ellipse cx="64" cy="54" rx="28" ry="8" fill="url(#amethyst-bright)"/>
    <polygon points="64,26 66,32 72,32 68,36 70,42 64,38 58,42 60,36 56,32 62,32" fill="url(#gold-metal)"/>
    <circle cx="64" cy="6" r="5" fill="url(#gold-metal)" filter="url(#glow-gold)"/>
  </g>`;

  // [2, 6]: Dazed Mole with Swirling Halo Stars
  svg += `
  <g id="art-mole-hit" transform="translate(256, 768)" clip-path="url(#cell-clip)">
    <ellipse cx="64" cy="80" rx="34" ry="32" fill="#78350f" stroke="#451a03" stroke-width="3"/>
    <ellipse cx="64" cy="86" rx="22" ry="18" fill="#fde68a"/>
    <line x1="46" y1="68" x2="58" y2="76" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
    <line x1="58" y1="68" x2="46" y2="76" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
    <line x1="70" y1="68" x2="82" y2="76" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
    <line x1="82" y1="68" x2="70" y2="76" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="64" cy="84" rx="6" ry="4" fill="#f43f5e"/>
    <polygon points="56,18 36,62 84,62" fill="url(#amethyst-deep)" stroke="url(#gold-metal)" stroke-width="2.5" transform="rotate(18 64 64)"/>
    <ellipse cx="64" cy="46" rx="40" ry="12" fill="none" stroke="url(#gold-metal)" stroke-width="2.5" stroke-dasharray="6,4" transform="rotate(-15 64 46)"/>
    <polygon points="34,44 38,40 44,42 40,46" fill="url(#gold-metal)"/>
    <polygon points="86,40 92,42 88,46 94,48" fill="url(#gold-metal)"/>
    ${sparkAt(64, 38, 5)}
  </g>`;

  // [3, 6]: Whack-a-Mole Card Box
  svg += `
  <g id="art-mole-card-box" transform="translate(384, 768)" clip-path="url(#cell-clip)">
    <rect x="8" y="16" width="112" height="96" rx="16" fill="url(#parchment-page)" stroke="url(#gold-metal)" stroke-width="3.5" filter="url(#shadow-deep)"/>
    <rect x="16" y="24" width="96" height="80" rx="10" fill="#ffffff" stroke="#c084fc" stroke-width="2"/>
    <polygon points="16,24 30,24 16,38" fill="url(#gold-metal)"/>
    <polygon points="112,24 98,24 112,38" fill="url(#gold-metal)"/>
    <polygon points="16,104 30,104 16,90" fill="url(#gold-metal)"/>
    <polygon points="112,104 98,104 112,90" fill="url(#gold-metal)"/>
  </g>`;

  // [4, 6]: Scepter of the Arch-Starlight (Hammer Idle)
  svg += `
  <g id="art-hammer-idle" transform="translate(512, 768)" clip-path="url(#cell-clip)">
    <g transform="rotate(-25 64 64)">
      <rect x="58" y="34" width="12" height="82" rx="6" fill="url(#ancient-wood)" stroke="url(#gold-metal)" stroke-width="2"/>
      <circle cx="64" cy="116" r="7" fill="url(#gold-metal)"/>
      <rect x="30" y="24" width="68" height="24" rx="8" fill="url(#gold-metal)" stroke="#78350f" stroke-width="2" filter="url(#glow-gold)"/>
      <polygon points="64,4 74,20 90,24 78,36 82,52 64,44 46,52 50,36 38,24 54,20" fill="url(#amethyst-bright)" stroke="#ffffff" stroke-width="2" filter="url(#glow-stardust)"/>
      <circle cx="64" cy="28" r="6" fill="#ffffff"/>
    </g>
  </g>`;

  // [5, 6]: Thunderstrike Scepter with Impact Shockwaves (Hammer Hit)
  svg += `
  <g id="art-hammer-hit" transform="translate(640, 768)" clip-path="url(#cell-clip)">
    <g transform="rotate(35 64 64)">
      <rect x="58" y="34" width="12" height="82" rx="6" fill="url(#ancient-wood)" stroke="url(#gold-metal)" stroke-width="2"/>
      <rect x="30" y="24" width="68" height="24" rx="8" fill="url(#gold-metal)" stroke="#78350f" stroke-width="2" filter="url(#glow-gold)"/>
      <polygon points="64,4 74,20 90,24 78,36 82,52 64,44 46,52 50,36 38,24 54,20" fill="url(#ruby-flame)" stroke="#ffffff" stroke-width="2" filter="url(#glow-ruby)"/>
    </g>
    <path d="M 18 84 L 32 94 L 24 102" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" filter="url(#glow-stardust)"/>
    <path d="M 88 102 L 96 92 L 110 98" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" filter="url(#glow-stardust)"/>
    ${sparkAt(64, 98, 8, '#fde047')}
  </g>`;

  // [6, 6]: Royal Banner Box
  svg += `
  <g id="art-mole-banner-box" transform="translate(768, 768)" clip-path="url(#cell-clip)">
    <path d="M 12 16 L 116 16 L 116 92 L 64 116 L 12 92 Z" fill="url(#amethyst-deep)" stroke="url(#gold-metal)" stroke-width="3.5" filter="url(#shadow-deep)"/>
    <rect x="10" y="12" width="108" height="12" rx="4" fill="url(#gold-metal)" stroke="#78350f" stroke-width="1.5"/>
    <circle cx="10" cy="18" r="6" fill="#f43f5e"/>
    <circle cx="118" cy="18" r="6" fill="#f43f5e"/>
    <path d="M 22 28 L 106 28 L 106 86 L 64 106 L 22 86 Z" fill="url(#parchment-page)" stroke="url(#gold-metal)" stroke-width="2"/>
  </g>`;

  // [7, 6]: Astral Nova Star Flare (Spark Effect)
  svg += `
  <g id="art-spark-effect" transform="translate(896, 768)" clip-path="url(#cell-clip)">
    <polygon points="64,8 76,46 120,64 76,82 64,120 52,82 8,64 52,46" fill="#ffffff" filter="url(#glow-stardust)"/>
    <polygon points="64,28 72,54 98,64 72,74 64,100 56,74 30,64 56,54" fill="url(#amethyst-bright)"/>
    <circle cx="64" cy="64" r="10" fill="#ffffff" filter="url(#glow-stardust)"/>
    <circle cx="64" cy="64" r="5" fill="#fde047"/>
  </g>`;

  // =========================================================================
  // ROW 7: Universal System & Controls (Tangible Fantasy Relics)
  // =========================================================================

  // [0, 7]: Great Grimoire of Destiny (Modal Dialog Box)
  svg += `
  <g id="art-modal-dialog-box" transform="translate(0, 896)" clip-path="url(#cell-clip)">
    <path d="M 64 106 C 44 98, 22 100, 8 108 L 8 24 C 22 16, 44 14, 64 22 C 84 14, 106 16, 120 24 L 120 108 C 106 100, 84 98, 64 106 Z"
          fill="url(#amethyst-deep)" stroke="url(#gold-metal)" stroke-width="4" filter="url(#shadow-deep)"/>
    <path d="M 64 98 C 46 92, 26 94, 14 100 L 14 28 C 26 22, 46 20, 64 26 Z" fill="url(#parchment-page)"/>
    <path d="M 64 98 C 82 92, 102 94, 114 100 L 114 28 C 102 22, 82 20, 64 26 Z" fill="url(#parchment-page)"/>
    <line x1="64" y1="24" x2="64" y2="100" stroke="#7e22ce" stroke-width="2.5"/>
    <circle cx="64" cy="44" r="16" fill="url(#gold-metal)" stroke="#78350f" stroke-width="2" filter="url(#glow-gold)"/>
    <polygon points="64,34 67,42 75,43 69,48 71,56 64,52 57,56 59,48 53,43 61,42" fill="#3b0764"/>
  </g>`;

  // [1, 7]: Enchanted Crystal Orb of Initiation (Play Button)
  svg += `
  <g id="art-play-button-box" transform="translate(128, 896)" clip-path="url(#cell-clip)">
    <path d="M 28 104 L 100 104 C 94 92, 84 88, 64 88 C 44 88, 34 92, 28 104 Z" fill="url(#gold-metal)" stroke="#78350f" stroke-width="2.5" filter="url(#glow-gold)"/>
    <circle cx="32" cy="102" r="5" fill="#f43f5e"/>
    <circle cx="96" cy="102" r="5" fill="#f43f5e"/>
    <circle cx="64" cy="56" r="42" fill="url(#amethyst-bright)" stroke="#ffffff" stroke-width="4" filter="url(#glow-stardust)"/>
    <polygon points="52,36 52,76 86,56" fill="url(#gold-metal)" stroke="#ffffff" stroke-width="2.5" filter="url(#glow-gold)"/>
    <circle cx="64" cy="56" r="6" fill="#ffffff"/>
  </g>`;

  // [2, 7]: Gilded Stone Sarcophagus Seal (Action Button Plaque)
  svg += `
  <g id="art-action-button-box" transform="translate(256, 896)" clip-path="url(#cell-clip)">
    <rect x="8" y="26" width="112" height="76" rx="22" fill="url(#amethyst-deep)" stroke="url(#gold-metal)" stroke-width="4" filter="url(#shadow-deep)"/>
    <rect x="18" y="34" width="92" height="60" rx="14" fill="url(#parchment-page)" stroke="#ffffff" stroke-width="2"/>
    <circle cx="64" cy="64" r="16" fill="url(#gold-metal)" stroke="#78350f" stroke-width="2"/>
    <path d="M 54 64 L 74 64 M 64 54 L 64 74" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
  </g>`;

  // [3, 7]: Holy Grail of the Archmage Encrusted with Jewels (Trophy Cup)
  svg += `
  <g id="art-trophy-cup" transform="translate(384, 896)" clip-path="url(#cell-clip)">
    <rect x="38" y="94" width="52" height="18" rx="6" fill="url(#ancient-wood)" stroke="url(#gold-metal)" stroke-width="2.5" filter="url(#shadow-deep)"/>
    <rect x="52" y="76" width="24" height="20" fill="url(#gold-metal)" stroke="#78350f" stroke-width="1.5"/>
    <path d="M 32 24 L 96 24 C 96 66, 80 80, 64 80 C 48 80, 32 66, 32 24 Z"
          fill="url(#gold-metal)" stroke="#78350f" stroke-width="3.5" filter="url(#glow-gold)"/>
    <circle cx="44" cy="34" r="4" fill="#f43f5e" filter="url(#glow-ruby)"/>
    <circle cx="64" cy="34" r="5" fill="#38bdf8" filter="url(#glow-stardust)"/>
    <circle cx="84" cy="34" r="4" fill="#10b981" filter="url(#glow-emerald)"/>
    <ellipse cx="64" cy="24" rx="32" ry="8" fill="#ffffff" filter="url(#glow-stardust)"/>
    <polygon points="64,44 68,52 76,53 70,58 72,66 64,62 56,66 58,58 52,53 60,52" fill="#ffffff" filter="url(#glow-stardust)"/>
  </g>`;

  // [4, 7]: Enchanted Resonating Cathedral Handbell (Speaker On)
  svg += `
  <g id="art-speaker-on" transform="translate(512, 896)" clip-path="url(#cell-clip)">
    <rect x="60" y="14" width="8" height="26" rx="4" fill="url(#gold-metal)" stroke="#78350f" stroke-width="1.5"/>
    <circle cx="64" cy="14" r="6" fill="#f43f5e" filter="url(#glow-ruby)"/>
    <path d="M 40 40 L 88 40 C 88 64, 100 82, 106 88 L 22 88 C 28 82, 40 64, 40 40 Z"
          fill="url(#gold-metal)" stroke="#78350f" stroke-width="3" filter="url(#glow-gold)"/>
    <ellipse cx="64" cy="88" rx="42" ry="10" fill="url(#amethyst-deep)" stroke="url(#gold-metal)" stroke-width="2"/>
    <circle cx="64" cy="94" r="6" fill="url(#amethyst-bright)" filter="url(#glow-stardust)"/>
    <path d="M 80 56 C 88 62, 88 78, 80 84" fill="none" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" filter="url(#glow-stardust)"/>
    <path d="M 92 48 C 104 56, 104 88, 92 96" fill="none" stroke="#c084fc" stroke-width="4" stroke-linecap="round"/>
  </g>`;

  // [5, 7]: Silenced Runic Bell Wrapped in Frozen Chains (Speaker Off)
  svg += `
  <g id="art-speaker-off" transform="translate(640, 896)" clip-path="url(#cell-clip)">
    <rect x="60" y="14" width="8" height="26" rx="4" fill="#64748b" stroke="#334155" stroke-width="1.5"/>
    <path d="M 40 40 L 88 40 C 88 64, 100 82, 106 88 L 22 88 C 28 82, 40 64, 40 40 Z"
          fill="#475569" stroke="#1e293b" stroke-width="3"/>
    <ellipse cx="64" cy="88" rx="42" ry="10" fill="#0f172a"/>
    <line x1="28" y1="44" x2="100" y2="84" stroke="url(#ruby-flame)" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="32" y1="32" x2="96" y2="96" stroke="#f43f5e" stroke-width="7" stroke-linecap="round" filter="url(#glow-ruby)"/>
  </g>`;

  // [6, 7]: Ouroboros Jade Dragon of Eternity (Restart Icon)
  svg += `
  <g id="art-restart-icon" transform="translate(768, 896)" clip-path="url(#cell-clip)">
    <circle cx="64" cy="64" r="44" fill="url(#amethyst-deep)" stroke="url(#gold-metal)" stroke-width="4" filter="url(#glow-gold)"/>
    <path d="M 64 32 A 32 32 0 1 1 36 50" fill="none" stroke="url(#gold-metal)" stroke-width="9" stroke-linecap="round"/>
    <polygon points="36,32 36,54 58,54" fill="url(#gold-metal)" stroke="#78350f" stroke-width="2"/>
    <circle cx="44" cy="46" r="3" fill="#f43f5e" filter="url(#glow-ruby)"/>
    <circle cx="64" cy="64" r="14" fill="#38bdf8" filter="url(#glow-stardust)"/>
    <circle cx="64" cy="64" r="5" fill="#ffffff"/>
  </g>`;

  // [7, 7]: Sacred Cosmic Lotus of Wisdom (Lotus Logo)
  svg += `
  <g id="art-lotus-logo" transform="translate(896, 896)" clip-path="url(#cell-clip)">
    <circle cx="64" cy="64" r="46" fill="url(#amethyst-deep)" stroke="url(#gold-metal)" stroke-width="4" filter="url(#glow-gold)"/>
    <path d="M 64 22 C 52 38, 52 64, 64 82 C 76 64, 76 38, 64 22 Z" fill="#ffffff" filter="url(#glow-stardust)"/>
    <path d="M 64 38 C 42 46, 32 66, 44 82 C 54 74, 60 64, 64 38 Z" fill="url(#amethyst-bright)" opacity="0.9"/>
    <path d="M 64 38 C 86 46, 96 66, 84 82 C 74 74, 68 64, 64 38 Z" fill="url(#amethyst-bright)" opacity="0.9"/>
    <circle cx="64" cy="78" r="6" fill="url(#gold-metal)" filter="url(#glow-gold)"/>
    ${sparkAt(64, 54, 5)}
  </g>`;

  svg += `\n</svg>`;
  return svg;
}

// 1. Generate SVG content
const svgContent = generateMasterpieceSVG();

const targets = [
  path.resolve(__dirname, '..', 'games', 'common', 'spritesheet-magical.svg'),
  path.resolve(__dirname, '..', 'public', 'games', 'common', 'spritesheet-magical.svg')
];

targets.forEach(t => {
  fs.mkdirSync(path.dirname(t), { recursive: true });
  fs.writeFileSync(t, svgContent, 'utf8');
  console.log(`Saved SVG: ${t} (${fs.statSync(t).size} bytes)`);
});

// 2. Render 1024x1024 High-Res PNG via Headless Chrome
const htmlPath = path.resolve(__dirname, 'render_magical.html');
const masterPNG = path.resolve(__dirname, 'output_magical.png');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const htmlWrapper = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 1024px; height: 1024px; background: transparent; overflow: hidden; }
    img { width: 1024px; height: 1024px; display: block; }
  </style>
</head>
<body>
  <img src="file:///${targets[0].replace(/\\/g, '/')}" />
</body>
</html>`;

fs.writeFileSync(htmlPath, htmlWrapper, 'utf8');

if (fs.existsSync(chromePath)) {
  const cmd = `"${chromePath}" --headless=new --screenshot="${masterPNG}" --window-size=1024,1024 --hide-scrollbars "file:///${htmlPath.replace(/\\/g, '/')}"`;
  console.log('Rendering 1024x1024 PNG from SVG using Chrome...');
  try {
    execSync(cmd, { stdio: 'inherit' });
    if (fs.existsSync(masterPNG)) {
      const pngTargets = [
        path.resolve(__dirname, '..', 'games', 'common', 'spritesheet-magical.png'),
        path.resolve(__dirname, '..', 'public', 'games', 'common', 'spritesheet-magical.png')
      ];
      pngTargets.forEach(pt => {
        fs.copyFileSync(masterPNG, pt);
        console.log(`Saved PNG: ${pt} (${fs.statSync(pt).size} bytes)`);
      });
    }
  } catch (e) {
    console.error('Render error:', e.message);
  }
} else {
  console.log('Chrome not found, skipping PNG rasterization.');
}

console.log('Done building Masterpiece Magical Spritesheet with full 1:1 view fragments!');
