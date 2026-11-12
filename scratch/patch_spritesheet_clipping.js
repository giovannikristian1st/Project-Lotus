const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'build_masterpiece_magical_spritesheet.js');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Add clipPath into defs
if (!code.includes('id="cell-clip"')) {
  code = code.replace('<defs>', '<defs>\n    <clipPath id="cell-clip"><rect x="0" y="0" width="128" height="128" /></clipPath>');
}

// 2. Add clip-path to all <g id="art-
code = code.replace(/<g id="art-([^"]+)" transform="translate\(([^)]+)\)">/g, '<g id="art-$1" transform="translate($2)" clip-path="url(#cell-clip)">');

// 3. Keep ruby ribbon comfortably inside cell bounds
code = code.replace('L 54 122 L 68 122 L 64 112', 'L 56 114 L 68 114 L 64 106');

fs.writeFileSync(filePath, code);
console.log('Successfully patched build_masterpiece_magical_spritesheet.js with cell clipping');
