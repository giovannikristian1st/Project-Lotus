const GRID_SIZE = 10;
const targetWords = ['MATAHARI', 'MERKURIUS', 'VENUS', 'BUMI', 'MARS', 'JUPITER', 'SATURNUS'];

const DIRECTIONS = [
  { dr: 0, dc: 1, name: 'Horizontal (Kanan)' },
  { dr: 1, dc: 0, name: 'Vertikal (Bawah)' },
  { dr: 1, dc: 1, name: 'Diagonal (Turun-Kanan)' },
  { dr: -1, dc: 1, name: 'Diagonal (Naik-Kanan)' },
  { dr: 1, dc: -1, name: 'Diagonal (Turun-Kiri)' },
];

function testGeneration(runs = 500) {
  let successCount = 0;
  for (let run = 0; run < runs; run++) {
    // If placement fails, we can retry the entire grid up to 5 times
    let gridPlaced = false;
    for (let gridAttempt = 0; gridAttempt < 5; gridAttempt++) {
      const grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
      const sortedWords = [...targetWords].sort((a, b) => b.length - a.length);
      let allPlaced = true;

      for (const word of sortedWords) {
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 250) {
          attempts++;
          const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];

          let minR = 0, maxR = GRID_SIZE - 1;
          if (dir.dr === 1) maxR = GRID_SIZE - word.length;
          else if (dir.dr === -1) minR = word.length - 1;

          let minC = 0, maxC = GRID_SIZE - 1;
          if (dir.dc === 1) maxC = GRID_SIZE - word.length;
          else if (dir.dc === -1) minC = word.length - 1;

          if (minR > maxR || minC > maxC) continue;

          const r = Math.floor(Math.random() * (maxR - minR + 1)) + minR;
          const c = Math.floor(Math.random() * (maxC - minC + 1)) + minC;

          let fits = true;
          for (let i = 0; i < word.length; i++) {
            const cr = r + i * dir.dr;
            const cc = c + i * dir.dc;
            if (grid[cr][cc] !== '' && grid[cr][cc] !== word[i]) {
              fits = false;
              break;
            }
          }

          if (fits) {
            for (let i = 0; i < word.length; i++) {
              const cr = r + i * dir.dr;
              const cc = c + i * dir.dc;
              grid[cr][cc] = word[i];
            }
            placed = true;
          }
        }

        if (!placed) {
          allPlaced = false;
          break;
        }
      }

      if (allPlaced) {
        gridPlaced = true;
        break;
      }
    }
    if (gridPlaced) successCount++;
  }

  console.log(`Success rate with 7 long words (incl 9 letters): ${successCount} / ${runs} (${(successCount / runs * 100).toFixed(1)}%)`);
}

testGeneration(500);
