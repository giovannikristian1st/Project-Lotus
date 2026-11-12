const { execSync } = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');

const g1 = 'quiz-powerup.html';
const out1 = path.resolve(__dirname, 'audits', 'quiz-powerup.png');
execSync(`"${chromePath}" --headless=new --window-size=1200,800 --default-background-color=ffffff --virtual-time-budget=2000 --screenshot="${out1}" "file:///${path.resolve(__dirname, '../games', g1).replace(/\\/g, '/')}?theme=magical"`);

console.log('Recaptured quiz-powerup.png');
