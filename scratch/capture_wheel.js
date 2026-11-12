const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const url = 'file:///' + path.resolve(__dirname, '../games/wheel.html').replace(/\\/g, '/') + '?theme=magical';
const outPath = path.resolve(__dirname, 'audits/wheel.png');

const cmd = `"${chromePath}" --headless=new --window-size=1200,800 --default-background-color=ffffff --virtual-time-budget=2000 --screenshot="${outPath}" "${url}"`;
execSync(cmd, { stdio: 'inherit' });
console.log('Saved wheel.png:', fs.statSync(outPath).size);
