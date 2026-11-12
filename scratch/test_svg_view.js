const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const testSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 128" width="256" height="128">
  <view id="cell1" viewBox="0 0 128 128" />
  <view id="cell2" viewBox="128 0 128 128" />
  <rect x="0" y="0" width="128" height="128" fill="#7e22ce" rx="20" />
  <circle cx="64" cy="64" r="40" fill="#facc15" />
  <rect x="128" y="0" width="128" height="128" fill="#10b981" rx="20" />
  <polygon points="192,24 232,104 152,104" fill="#ffffff" />
</svg>`;
fs.writeFileSync(path.resolve(__dirname, 'test_frag.svg'), testSvg);

const testHtml = `<!DOCTYPE html>
<html>
<head>
<style>
  .box1 {
    width: 320px;
    height: 80px;
    background: url('test_frag.svg#cell1') no-repeat center / 100% 100%;
    color: white;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .box2 {
    width: 320px;
    height: 80px;
    margin-top: 20px;
    background: url('test_frag.svg#cell2') no-repeat center / 100% 100%;
    color: white;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
</head>
<body style="background: #faf5ff; padding: 20px;">
  <div class="box1">Button 1 with SVG View</div>
  <div class="box2">Button 2 with SVG View</div>
</body>
</html>`;
fs.writeFileSync(path.resolve(__dirname, 'test_frag.html'), testHtml);

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outPath = path.resolve(__dirname, 'test_frag.png');
execSync(`"${chromePath}" --headless=new --screenshot="${outPath}" "file:///${path.resolve(__dirname, 'test_frag.html').replace(/\\/g, '/')}"`);
console.log('Saved test_frag.png, stat:', fs.statSync(outPath).size);
