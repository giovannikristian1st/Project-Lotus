const fs = require('fs');
const path = require('path');

const games = [
  "quiz.html", "quiz-powerup.html", "truefalse.html", "openbox.html",
  "flashcards.html", "matchup.html", "groupsort.html", "fruitninja.html",
  "wheel.html", "whackamole.html", "wordsearch.html", "anagram.html"
];

const report = {};
games.forEach(g => {
  const content = fs.readFileSync(path.join(__dirname, '..', 'games', g), 'utf8');
  const classes = new Set();
  const re = /class=["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    m[1].split(/\s+/).forEach(c => {
      if (c && !c.startsWith('fa-') && !c.startsWith('fas') && !c.startsWith('text-')) {
        classes.add(c);
      }
    });
  }
  report[g] = Array.from(classes);
});

console.log(JSON.stringify(report, null, 2));
