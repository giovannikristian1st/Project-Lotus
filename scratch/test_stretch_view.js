const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const testSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 128" width="256" height="128">
  <view id="cell1" viewBox="0 0 128 128" preserveAspectRatio="none" />
  <view id="cell2" viewBox="128 0 128 128" preserveAspectRatio="none" />
  <!-- Cell 1: An ornate box container with gold borders and light parchment center -->
  <g id="cell1-art">
    <rect x="4" y="4" width="120" height="120" rx="14" fill="#fdf4ff" stroke="#7e22ce" stroke-width="4" />
    <rect x="8" y="8" width="112" height="112" rx="10" fill="none" stroke="#eab308" stroke-width="2" />
    <!-- 4 golden corners -->
    <polygon points="8,8 24,8 8,24" fill="#eab308" />
    <polygon points="120,8 104,8 120,24" fill="#eab308" />
    <polygon points="8,120 24,120 8,104" fill="#eab308" />
    <polygon points="120,120 104,120 120,104" fill="#eab308" />
  </g>
</svg>`;
fs.writeFileSync(path.resolve(__dirname, 'test_stretch.svg'), testSvg);

const testHtml = `<!DOCTYPE html>
<html>
<head>
<style>
  .wide-card {
    width: 600px;
    height: 120px;
    background: url('test_stretch.svg#cell1') no-repeat center / 100% 100%;
    color: #3b0764;
    font-size: 22px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
  }
</style>
</head>
<body style="background: #faf5ff; padding: 20px;">
  <div class="wide-card">This Question Text Sits Directly on the Sprite!</div>
</body>
</html>`;
fs.writeFileSync(path.resolve(__dirname, 'test_stretch.html'), testHtml);

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outPath = path.resolve(__dirname, 'test_stretch.png');
execSync(`"${chromePath}" --headless=new --screenshot="${outPath}" "file:///${path.resolve(__dirname, 'test_stretch.html').replace(/\\/g, '/')}"`);
console.log('Saved test_stretch.png, stat:', fs.statSync(outPath).size);
