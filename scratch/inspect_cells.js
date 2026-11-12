const fs = require('fs');
const content = fs.readFileSync('scratch/build_masterpiece_magical_spritesheet.js', 'utf8');
const lines = content.split('\n');
console.log('Total lines:', lines.length);
lines.forEach((l, i) => {
  if (l.includes('id="art-')) {
    console.log(`${i + 1}: ${l.trim()}`);
  }
});
