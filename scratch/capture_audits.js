const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const games = [
  'quiz.html',
  'quiz-powerup.html',
  'truefalse.html',
  'openbox.html',
  'flashcards.html',
  'matchup.html',
  'groupsort.html',
  'fruitninja.html',
  'wheel.html',
  'whackamole.html',
  'anagram.html',
  'wordsearch.html'
];

const auditDir = path.resolve(__dirname, 'audits');
if (!fs.existsSync(auditDir)) fs.mkdirSync(auditDir, { recursive: true });

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

for (const g of games) {
  const url = 'file:///' + path.resolve(__dirname, '../games', g).replace(/\\/g, '/') + '?theme=magical';
  const outPath = path.resolve(auditDir, g.replace('.html', '.png'));
  const cmd = `"${chromePath}" --headless=new --window-size=1200,800 --default-background-color=ffffff --virtual-time-budget=2000 --screenshot="${outPath}" "${url}"`;
  try {
    execSync(cmd, { stdio: 'pipe' });
    const stat = fs.statSync(outPath);
    console.log(`Captured ${g} -> ${stat.size} bytes`);
  } catch (e) {
    console.error(`Failed ${g}:`, e.message);
  }
}
