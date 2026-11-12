const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const testUrl = 'file:///' + path.resolve(__dirname, '../games/quiz.html').replace(/\\/g, '/') + '?theme=magical';

// Let's inspect what body class is after 1 second
const script = `
const { execSync } = require('child_process');
const chromePath = 'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe';
`;

console.log('Testing quiz.html theme resolution...');
