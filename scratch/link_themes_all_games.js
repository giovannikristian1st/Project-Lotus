const fs = require('fs');
const path = require('path');

const dirs = ['games', 'public/games'];
const games = ['quiz', 'quiz-powerup', 'fruitninja', 'flashcards', 'wheel', 'matchup', 'openbox', 'wordsearch', 'anagram', 'truefalse', 'whackamole', 'groupsort'];

dirs.forEach(dir => {
  games.forEach(g => {
    const filePath = path.join(dir, g + '.html');
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Ensure themes.css is linked
    if (!content.includes('themes.css')) {
      if (content.includes('</head>')) {
        content = content.replace('</head>', '  <link rel="stylesheet" href="common/themes.css">\n</head>');
        changed = true;
      }
    }

    // 2. Ensure themes.js is included
    if (!content.includes('themes.js')) {
      if (content.includes('</body>')) {
        content = content.replace('</body>', '  <script src="common/themes.js"></script>\n</body>');
        changed = true;
      }
    }

    // 3. Make base body CSS white background and black text
    // Replace dark body background
    content = content.replace(/body\s*\{([^}]+)\}/, (match, p1) => {
      let updated = p1;
      // replace background
      updated = updated.replace(/background\s*:[^;]+;/i, 'background: #ffffff;');
      // replace color
      updated = updated.replace(/color\s*:[^;]+;/i, 'color: #0f172a;');
      return `body {${updated}}`;
    });
    changed = true;

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath} to clean white theme!`);
    }
  });
});
console.log('All games updated successfully!');