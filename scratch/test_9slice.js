const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Let's test border-image with SVG views
const testSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 128" width="256" height="128">
  <view id="box9" viewBox="0 0 128 128" />
  <g id="art-box9">
    <!-- 9-slice frame: 32px borders, corners never distorted -->
    <!-- Top-left corner (0,0 to 32,32) -->
    <rect x="0" y="0" width="128" height="128" rx="20" fill="#fdf4ff" stroke="#7e22ce" stroke-width="6"/>
    <!-- Gold corner brackets -->
    <polygon points="0,0 32,0 0,32" fill="#eab308"/>
    <polygon points="128,0 96,0 128,32" fill="#eab308"/>
    <polygon points="0,128 32,128 0,96" fill="#eab308"/>
    <polygon points="128,128 96,128 128,96" fill="#eab308"/>
    <rect x="32" y="32" width="64" height="64" fill="#ffffff" stroke="#c084fc" stroke-width="2"/>
  </g>
</svg>`;

fs.writeFileSync(path.resolve(__dirname, 'test_9slice.svg'), testSvg);

const testHtml = `<!DOCTYPE html>
<html>
<head>
<style>
  .box-9slice {
    width: 600px;
    height: 120px;
    border-style: solid;
    border-width: 32px;
    border-image: url('test_9slice.svg#box9') 32 fill / 32px stretch;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    font-size: 20px;
    color: #3b0764;
  }
</style>
</head>
<body style="background: #faf5ff; padding: 20px;">
  <div class="box-9slice">Testing 9-slice on 600x120px element!</div>
</body>
</html>`;

fs.writeFileSync(path.resolve(__dirname, 'test_9slice.html'), testHtml);

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outPath = path.resolve(__dirname, 'test_9slice.png');
execSync(`"${chromePath}" --headless=new --screenshot="${outPath}" "file:///${path.resolve(__dirname, 'test_9slice.html').replace(/\\/g, '/')}"`);
console.log('Saved test_9slice.png, size:', fs.statSync(outPath).size);
