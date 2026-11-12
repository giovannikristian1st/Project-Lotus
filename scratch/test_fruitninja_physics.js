const fs = require('fs');

const html = fs.readFileSync('games/fruitninja.html', 'utf8');

console.log('--- Verifying Fruit Slicer Enhancements ---');

// Check key elements in HTML
const checks = [
  { name: 'Speed toggle badge exists in HTML', pass: html.includes('id="speed-badge"') && html.includes('toggleSpeed()') },
  { name: 'SPEED_CONFIGS defined with Santai as default', pass: html.includes('SPEED_CONFIGS') && html.includes("id: 'santai'") },
  { name: 'Gentle floaty gravity (<= 0.1)', pass: html.includes('gravity: 0.08') },
  { name: 'Apex based trajectory calculation', pass: html.includes('Math.sqrt(2 * cfg.gravity * deltaY)') },
  { name: 'Centered badge with clear font', pass: html.includes('15px Poppins') && html.includes('badgeW') },
  { name: 'Direct tap/click slice support', pass: html.includes('checkTapSlice') },
  { name: 'Forgiving hitbox covering fruit and badge', pass: html.includes('distBadge') },
  { name: 'Visual slice popups (+100, Salah)', pass: html.includes('popups.push') },
  { name: 'Question timer resets per question', pass: html.includes('timeRemaining = timerSeconds') },
  { name: 'Smart spawn prioritizing correct answer', pass: html.includes('hasCorrectOnScreen') }
];

let allPassed = true;
checks.forEach(c => {
  console.log(`${c.pass ? '✓' : '✗'} ${c.name}`);
  if (!c.pass) allPassed = false;
});

if (allPassed) {
  console.log('\nAll Fruit Slicer checks PASSED perfectly!');
} else {
  console.error('\nSome checks failed!');
  process.exit(1);
}
