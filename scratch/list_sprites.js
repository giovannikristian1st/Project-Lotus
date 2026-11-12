const fs = require('fs');
const content = fs.readFileSync('scratch/build_masterpiece_magical_spritesheet.js', 'utf8');
const ids = [];
const re = /id="art-([^"]+)"/g;
let m;
while ((m = re.exec(content)) !== null) {
  ids.push(m[1]);
}
console.log('Count:', ids.length);
console.log(JSON.stringify(ids, null, 2));
