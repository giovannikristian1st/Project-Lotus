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

    .card-statement {
      position: relative;
      width: 100%;
      max-width: 820px;
      background: linear-gradient(180deg, #fffbeb 0%, #fef3c7 60%, #fde68a 100%);
      border: 3.5px solid #78350f;
      border-radius: 20px;
      box-shadow: 0 0 0 3px #facc15, 0 16px 40px rgba(120, 53, 15, 0.25);
      padding: 44px 50px 32px 50px;
      text-align: center;
      margin-bottom: 40px;
    }

    /* 1:1 Proportional Royal Decree Wax Seal Crest */
    .card-statement::before {
      content: '';
      position: absolute;
      top: -42px;
      left: 50%;
      transform: translateX(-50%);
      width: 84px;
      height: 84px;
      background: url('../games/common/spritesheet-magical.svg#truefalse-card-box') no-repeat center / contain;
      filter: drop-shadow(0 8px 16px rgba(120, 53, 15, 0.45));
    }

    .statement-num {
      color: #92400e;
      font-weight: 800;
      font-size: 15px;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 8px;
    }

    .statement-text {
      color: #451a03;
      font-weight: 800;
      font-size: 24px;
      line-height: 1.45;
    }

    .btn-group {
      display: flex;
      gap: 32px;
      justify-content: center;
      width: 100%;
      max-width: 600px;
    }

    /* BENAR Button: 1:1 Proportional Emerald Shield Crest + Emerald Plate */
    .btn-true {
      flex: 1;
      height: 76px;
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      border: 3px solid #10b981;
      border-radius: 20px;
      box-shadow: 0 0 0 2px #facc15, 0 10px 24px rgba(16, 185, 129, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      cursor: pointer;
      color: #ffffff;
      font-weight: 900;
      font-size: 24px;
      letter-spacing: 1px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
      transition: transform 0.15s ease;
    }
    .btn-true::before {
      content: '';
      width: 52px;
      height: 52px;
      background: url('../games/common/spritesheet-magical.svg#btn-true-box') no-repeat center / contain;
      filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
    }
    .btn-true:hover {
      transform: translateY(-3px) scale(1.03);
    }

    /* SALAH Button: 1:1 Proportional Crimson Demon Shield Crest + Ruby Plate */
    .btn-false {
      flex: 1;
      height: 76px;
      background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
      border: 3px solid #f43f5e;
      border-radius: 20px;
      box-shadow: 0 0 0 2px #facc15, 0 10px 24px rgba(244, 63, 94, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      cursor: pointer;
      color: #ffffff;
      font-weight: 900;
      font-size: 24px;
      letter-spacing: 1px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
      transition: transform 0.15s ease;
    }
    .btn-false::before {
      content: '';
      width: 52px;
      height: 52px;
      background: url('../games/common/spritesheet-magical.svg#btn-false-box') no-repeat center / contain;
      filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
    }
    .btn-false:hover {
      transform: translateY(-3px) scale(1.03);
    }
  </style>
</head>
<body>
  <div class="card-statement">
    <div class="statement-num">Pernyataan 1 dari 5</div>
    <div class="statement-text">Planet yang terkenal dengan cincinnya yang indah dan lebar adalah... -> Jawaban: Neptunus</div>
  </div>

  <div class="btn-group">
    <button class="btn-true">BENAR</button>
    <button class="btn-false">SALAH</button>
  </div>
</body>
</html>`;

fs.writeFileSync(path.resolve(__dirname, 'test_proportional_tf.html'), testHtml);
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outPath = path.resolve(__dirname, 'test_proportional_tf.png');
execSync(`"${chromePath}" --headless=new --window-size=1000,550 --screenshot="${outPath}" "file:///${path.resolve(__dirname, 'test_proportional_tf.html').replace(/\\/g, '/')}"`);
console.log('Saved test_proportional_tf.png');
