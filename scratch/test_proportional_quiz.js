const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const testHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800;900&display=swap">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
    body { background: #faf5ff; min-height: 100vh; padding: 60px 40px; display: flex; flex-direction: column; align-items: center; }

    /* Themed Question Card (Proportional Grimoire Crest + Royal Vellum Card) */
    .question-card {
      position: relative;
      width: 100%;
      max-width: 820px;
      background: linear-gradient(180deg, #ffffff 0%, #fdf4ff 50%, #f3e8ff 100%);
      border: 3px solid #7e22ce;
      border-radius: 24px;
      box-shadow: 0 0 0 3px #facc15, 0 16px 40px rgba(126, 34, 206, 0.22);
      padding: 38px 48px 30px 48px;
      text-align: center;
      margin-bottom: 36px;
    }

    /* 1:1 Proportional Grimoire Crest Floating at Top */
    .question-card::before {
      content: '';
      position: absolute;
      top: -46px;
      left: 50%;
      transform: translateX(-50%);
      width: 88px;
      height: 88px;
      background: url('../games/common/spritesheet-magical.svg#quiz-question-box') no-repeat center / contain;
      filter: drop-shadow(0 8px 18px rgba(126, 34, 206, 0.45));
    }

    .q-number {
      color: #7e22ce;
      font-weight: 800;
      font-size: 15px;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 8px;
    }

    .q-text {
      color: #2e1065;
      font-weight: 800;
      font-size: 24px;
      line-height: 1.4;
      margin-bottom: 16px;
    }

    .q-img {
      width: 140px;
      height: 140px;
      border-radius: 16px;
      border: 3px solid #7e22ce;
      box-shadow: 0 0 0 2px #facc15, 0 8px 20px rgba(126, 34, 206, 0.3);
      object-fit: cover;
      margin: 0 auto;
      display: block;
    }

    /* Options Grid */
    .options-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
      width: 100%;
      max-width: 820px;
    }

    /* Themed Option Button: 1:1 Proportional Spellbook Crest on Left + Royal Plaque */
    .opt-btn {
      position: relative;
      background: linear-gradient(135deg, #ffffff 0%, #faf5ff 100%);
      border: 2.5px solid #d8b4fe;
      border-left: 6px solid #7e22ce;
      border-radius: 16px;
      box-shadow: 0 4px 14px rgba(168, 85, 247, 0.15);
      padding: 14px 20px 14px 72px;
      min-height: 68px;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: left;
    }

    /* 1:1 Proportional Tome Seal Sprite on Left */
    .opt-btn::before {
      content: '';
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 48px;
      height: 48px;
      background: url('../games/common/spritesheet-magical.svg#quiz-answer-box') no-repeat center / contain;
      filter: drop-shadow(0 2px 6px rgba(126, 34, 206, 0.3));
      transition: transform 0.2s ease;
    }

    .opt-btn:hover {
      background: #faf5ff;
      border-color: #a855f7;
      border-left-color: #9333ea;
      transform: translateY(-3px);
      box-shadow: 0 10px 24px rgba(168, 85, 247, 0.3);
    }
    .opt-btn:hover::before {
      background-image: url('../games/common/spritesheet-magical.svg#quiz-answer-hover');
      transform: translateY(-50%) scale(1.1);
    }

    .opt-btn.correct {
      background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
      border-color: #10b981;
      border-left-color: #059669;
      color: #064e3b;
      box-shadow: 0 10px 24px rgba(16, 185, 129, 0.35);
    }
    .opt-btn.correct::before {
      background-image: url('../games/common/spritesheet-magical.svg#quiz-answer-correct');
    }

    .opt-key {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-weight: 900;
      font-size: 15px;
      text-shadow: 0 1px 3px #2e1065;
      z-index: 2;
    }

    .opt-text {
      color: #3b0764;
      font-weight: 700;
      font-size: 18px;
    }
  </style>
</head>
<body>
  <div class="question-card">
    <div class="q-number">Pertanyaan 1 dari 5</div>
    <div class="q-text">Planet manakah yang dijuluki sebagai 'Planet Merah'?</div>
  </div>

  <div class="options-grid">
    <div class="opt-btn">
      <span class="opt-key">A</span>
      <span class="opt-text">Venus</span>
    </div>
    <div class="opt-btn correct">
      <span class="opt-key">B</span>
      <span class="opt-text">Mars</span>
    </div>
    <div class="opt-btn">
      <span class="opt-key">C</span>
      <span class="opt-text">Jupiter</span>
    </div>
    <div class="opt-btn">
      <span class="opt-key">D</span>
      <span class="opt-text">Merkurius</span>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(path.resolve(__dirname, 'test_proportional_quiz.html'), testHtml);
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outPath = path.resolve(__dirname, 'test_proportional_quiz.png');
execSync(`"${chromePath}" --headless=new --window-size=1000,600 --screenshot="${outPath}" "file:///${path.resolve(__dirname, 'test_proportional_quiz.html').replace(/\\/g, '/')}"`);
console.log('Saved test_proportional_quiz.png');
