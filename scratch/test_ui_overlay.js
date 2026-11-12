const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const testHtml = `<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800;900&display=swap">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Poppins', sans-serif; }
  body {
    background: #faf5ff;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .test-question {
    width: 700px;
    min-height: 140px;
    background: url('../games/common/spritesheet-magical.svg#quiz-question-box') no-repeat center / 100% 100%;
    color: #3b0764;
    padding: 30px 50px;
    text-align: center;
    font-size: 22px;
    font-weight: 800;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 12px 28px rgba(88, 28, 135, 0.35));
  }
  .test-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    width: 700px;
  }
  .test-opt {
    height: 72px;
    background: url('../games/common/spritesheet-magical.svg#quiz-answer-box') no-repeat center / 100% 100%;
    color: #3b0764;
    font-size: 18px;
    font-weight: 700;
    display: flex;
    align-items: center;
    padding: 0 24px;
    gap: 14px;
    filter: drop-shadow(0 6px 16px rgba(126, 34, 206, 0.2));
  }
</style>
</head>
<body>
  <div class="test-question">
    <div style="font-size: 13px; color: #7e22ce; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">Pertanyaan #1</div>
    <div>Planet manakah yang dijuluki sebagai "Planet Merah" di Tata Surya?</div>
  </div>
  <div class="test-options">
    <div class="test-opt"><span>A.</span> <span>Planet Mars</span></div>
    <div class="test-opt"><span>B.</span> <span>Planet Venus</span></div>
    <div class="test-opt"><span>C.</span> <span>Planet Jupiter</span></div>
    <div class="test-opt"><span>D.</span> <span>Planet Merkurius</span></div>
  </div>
</body>
</html>`;

fs.writeFileSync(path.resolve(__dirname, 'test_ui_overlay.html'), testHtml);
console.log('Saved test_ui_overlay.html');
