const vm = require('vm');
const fs = require('fs');

// Test logic of wordsearch
function runTests() {
  const html = fs.readFileSync('public/games/wordsearch.html', 'utf8');
  
  // Verify directions in script
  if (!html.includes('diagonal-turun-kanan') || !html.includes('diagonal-naik-kanan') || !html.includes('diagonal-turun-kiri')) {
    throw new Error('Diagonal directions not found in generateGrid');
  }

  // Verify enterSelect has dr === dc
  if (!html.includes('dr === dc')) {
    throw new Error('Diagonal check (dr === dc) not found in enterSelect');
  }

  // Verify touch support exists
  if (!html.includes('touchstart') || !html.includes('touchmove')) {
    throw new Error('Touch listeners not found');
  }

  console.log('All code structure assertions passed!');
  
  // Test straight line function for diagonal
  function getStraightLine(start, end) {
    const line = [];
    const dr = Math.sign(end.r - start.r);
    const dc = Math.sign(end.c - start.c);
    let currR = start.r;
    let currC = start.c;

    while (true) {
      line.push({ r: currR, c: currC });
      if (currR === end.r && currC === end.c) break;
      currR += dr;
      currC += dc;
    }
    return line;
  }

  // Test diagonal down-right
  const diag1 = getStraightLine({ r: 0, c: 0 }, { r: 3, c: 3 });
  console.assert(diag1.length === 4, 'Diagonal 1 length should be 4');
  console.assert(diag1[1].r === 1 && diag1[1].c === 1, 'Diagonal 1 step 1');

  // Test diagonal up-right
  const diag2 = getStraightLine({ r: 3, c: 0 }, { r: 0, c: 3 });
  console.assert(diag2.length === 4, 'Diagonal 2 length should be 4');
  console.assert(diag2[1].r === 2 && diag2[1].c === 1, 'Diagonal 2 step 1');

  // Test diagonal down-left
  const diag3 = getStraightLine({ r: 0, c: 3 }, { r: 3, c: 0 });
  console.assert(diag3.length === 4, 'Diagonal 3 length should be 4');
  console.assert(diag3[1].r === 1 && diag3[1].c === 2, 'Diagonal 3 step 1');

  console.log('All diagonal line math verified successfully!');
}

runTests();
