const { execSync } = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const html = execSync(`"${chromePath}" --headless=new --dump-dom "file:///c:/Users/ivank/Desktop/Antigravity%20Projects/CKTC%20LOTUS%20PROJECT/games/flashcards.html?theme=magical"`).toString();
console.log('Cards count:', (html.match(/class="tile-card"/g) || []).length);
const fs = require('fs');
fs.writeFileSync('scratch/flashcards_dump.html', html);
