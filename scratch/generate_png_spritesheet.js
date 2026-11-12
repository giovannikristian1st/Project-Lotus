const fs = require('fs');
const zlib = require('zlib');

// Create a high-quality 512x512 PNG sprite sheet
function generateSpritesheetPNG() {
  const width = 512;
  const height = 512;
  const imgData = Buffer.alloc(width * height * 4);

  function setPixel(x, y, r, g, b, a = 255) {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const idx = (y * width + x) * 4;
    imgData[idx] = r;
    imgData[idx + 1] = g;
    imgData[idx + 2] = b;
    imgData[idx + 3] = a;
  }

  function fillRect(x0, y0, w, h, r, g, b, a = 255) {
    for (let y = y0; y < y0 + h; y++) {
      for (let x = x0; x < x0 + w; x++) {
        setPixel(x, y, r, g, b, a);
      }
    }
  }

  function fillRoundRect(x0, y0, w, h, radius, r, g, b, a = 255) {
    for (let y = y0; y < y0 + h; y++) {
      for (let x = x0; x < x0 + w; x++) {
        let inside = true;
        if (x < x0 + radius && y < y0 + radius) {
          inside = (Math.hypot(x - (x0 + radius), y - (y0 + radius)) <= radius);
        } else if (x >= x0 + w - radius && y < y0 + radius) {
          inside = (Math.hypot(x - (x0 + w - radius), y - (y0 + radius)) <= radius);
        } else if (x < x0 + radius && y >= y0 + h - radius) {
          inside = (Math.hypot(x - (x0 + radius), y - (y0 + h - radius)) <= radius);
        } else if (x >= x0 + w - radius && y >= y0 + h - radius) {
          inside = (Math.hypot(x - (x0 + w - radius), y - (y0 + h - radius)) <= radius);
        }
        if (inside) setPixel(x, y, r, g, b, a);
      }
    }
  }

  function strokeRoundRect(x0, y0, w, h, radius, strokeW, r, g, b, a = 255) {
    for (let y = y0 - strokeW; y < y0 + h + strokeW; y++) {
      for (let x = x0 - strokeW; x < x0 + w + strokeW; x++) {
        // Simple border check
        const inOuter = (x >= x0 - strokeW && x < x0 + w + strokeW && y >= y0 - strokeW && y < y0 + h + strokeW);
        const inInner = (x >= x0 + strokeW && x < x0 + w - strokeW && y >= y0 + strokeW && y < y0 + h - strokeW);
        if (inOuter && !inInner) {
          setPixel(x, y, r, g, b, a);
        }
      }
    }
  }

  function fillCircle(cx, cy, radius, r, g, b, a = 255) {
    for (let y = cy - radius; y <= cy + radius; y++) {
      for (let x = cx - radius; x <= cx + radius; x++) {
        if (Math.hypot(x - cx, y - cy) <= radius) {
          setPixel(x, y, r, g, b, a);
        }
      }
    }
  }

  // Draw 16 Sprites in a 4x4 Grid of 128x128
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const ox = col * 128;
      const oy = row * 128;

      if (row === 0 && col === 0) {
        // (0,0) BOX CLOSED
        fillRoundRect(ox + 18, oy + 38, 92, 76, 16, 255, 255, 255);
        strokeRoundRect(ox + 18, oy + 38, 92, 76, 16, 3, 99, 102, 241);
        fillRect(ox + 54, oy + 38, 20, 76, 79, 70, 229);
        fillRoundRect(ox + 14, oy + 24, 100, 22, 8, 99, 102, 241);
        fillCircle(ox + 64, oy + 22, 8, 234, 179, 8);
        fillCircle(ox + 64, oy + 76, 12, 234, 179, 8);
      } else if (row === 0 && col === 1) {
        // (1,0) BOX OPEN
        fillRoundRect(ox + 18, oy + 46, 92, 68, 16, 255, 255, 255);
        strokeRoundRect(ox + 18, oy + 46, 92, 68, 16, 3, 234, 179, 8);
        fillRoundRect(ox + 24, oy + 46, 80, 20, 10, 254, 240, 138);
        fillRoundRect(ox + 16, oy + 20, 96, 24, 8, 79, 70, 229);
        fillCircle(ox + 64, oy + 28, 10, 251, 191, 36);
      } else if (row === 0 && col === 2) {
        // (2,0) BOX GOLD
        fillRoundRect(ox + 18, oy + 38, 92, 76, 14, 234, 179, 8);
        strokeRoundRect(ox + 18, oy + 38, 92, 76, 14, 3, 161, 98, 7);
        fillRoundRect(ox + 14, oy + 22, 100, 24, 10, 202, 138, 4);
        fillRect(ox + 54, oy + 34, 20, 22, 255, 255, 255);
        fillCircle(ox + 64, oy + 44, 4, 15, 23, 42);
      } else if (row === 0 && col === 3) {
        // (3,0) BOX LID
        fillRoundRect(ox + 14, oy + 46, 100, 36, 12, 79, 70, 229);
        strokeRoundRect(ox + 14, oy + 46, 100, 36, 12, 3, 55, 48, 163);
        fillRoundRect(ox + 46, oy + 38, 36, 12, 6, 234, 179, 8);
      } else if (row === 1 && col === 0) {
        // (0,1) CARD BACK
        fillRoundRect(ox + 22, oy + 16, 84, 96, 16, 59, 130, 246);
        strokeRoundRect(ox + 22, oy + 16, 84, 96, 16, 3, 30, 64, 175);
        fillCircle(ox + 64, oy + 64, 18, 255, 255, 255, 80);
        fillCircle(ox + 64, oy + 64, 8, 255, 255, 255);
      } else if (row === 1 && col === 1) {
        // (1,1) CARD FRONT
        fillRoundRect(ox + 22, oy + 16, 84, 96, 16, 255, 255, 255);
        strokeRoundRect(ox + 22, oy + 16, 84, 96, 16, 3, 203, 213, 225);
        fillRoundRect(ox + 28, oy + 22, 72, 84, 10, 248, 250, 252);
        fillCircle(ox + 64, oy + 64, 14, 226, 232, 240);
      } else if (row === 1 && col === 2) {
        // (2,1) TILE LETTER
        fillRoundRect(ox + 20, oy + 20, 88, 88, 18, 255, 255, 255);
        strokeRoundRect(ox + 20, oy + 20, 88, 88, 18, 3, 148, 163, 184);
        fillRoundRect(ox + 24, oy + 24, 80, 80, 14, 248, 250, 252);
        // Draw A letter shape
        fillRect(ox + 60, oy + 40, 8, 48, 15, 23, 42);
        fillRect(ox + 46, oy + 60, 36, 8, 15, 23, 42);
      } else if (row === 1 && col === 3) {
        // (3,1) SLOT TARGET
        fillRoundRect(ox + 20, oy + 20, 88, 88, 18, 248, 250, 252);
        strokeRoundRect(ox + 20, oy + 20, 88, 88, 18, 3, 148, 163, 184);
        fillCircle(ox + 64, oy + 64, 14, 226, 232, 240);
        fillRect(ox + 62, oy + 54, 4, 20, 148, 163, 184);
        fillRect(ox + 54, oy + 62, 20, 4, 148, 163, 184);
      } else if (row === 2 && col === 0) {
        // (0,2) HOLE BURROW
        fillRoundRect(ox + 16, oy + 60, 96, 48, 24, 133, 77, 14);
        fillRoundRect(ox + 28, oy + 66, 72, 34, 17, 15, 23, 42);
      } else if (row === 2 && col === 1) {
        // (1,2) MOLE
        fillCircle(ox + 64, oy + 68, 32, 120, 53, 15);
        fillCircle(ox + 64, oy + 66, 14, 251, 207, 232);
        fillCircle(ox + 64, oy + 62, 5, 190, 24, 93);
        fillCircle(ox + 52, oy + 52, 4, 0, 0, 0);
        fillCircle(ox + 76, oy + 52, 4, 0, 0, 0);
      } else if (row === 2 && col === 2) {
        // (2,2) HAMMER
        fillRect(ox + 40, oy + 50, 48, 12, 180, 83, 9);
        fillRoundRect(ox + 50, oy + 30, 28, 52, 8, 100, 116, 139);
      } else if (row === 2 && col === 3) {
        // (3,2) BUCKET SORT
        fillRoundRect(ox + 26, oy + 42, 76, 70, 16, 255, 255, 255);
        strokeRoundRect(ox + 26, oy + 42, 76, 70, 16, 3, 59, 130, 246);
        fillRoundRect(ox + 20, oy + 34, 88, 18, 9, 96, 165, 250);
        fillRoundRect(ox + 42, oy + 64, 44, 20, 6, 37, 99, 235);
      } else if (row === 3 && col === 0) {
        // (0,3) BADGE CORRECT
        fillRoundRect(ox + 20, oy + 20, 88, 88, 22, 16, 185, 129);
        strokeRoundRect(ox + 20, oy + 20, 88, 88, 22, 3, 4, 120, 87);
        // Checkmark
        for (let i = 0; i < 8; i++) {
          fillCircle(ox + 42 + i * 2, oy + 64 + i * 2, 4, 255, 255, 255);
        }
        for (let i = 0; i < 16; i++) {
          fillCircle(ox + 56 + i * 2, oy + 78 - i * 2, 4, 255, 255, 255);
        }
      } else if (row === 3 && col === 1) {
        // (1,3) BADGE WRONG
        fillRoundRect(ox + 20, oy + 20, 88, 88, 22, 239, 68, 68);
        strokeRoundRect(ox + 20, oy + 20, 88, 88, 22, 3, 185, 28, 28);
        for (let i = 0; i < 20; i++) {
          fillCircle(ox + 44 + i * 2, oy + 44 + i * 2, 4, 255, 255, 255);
          fillCircle(ox + 84 - i * 2, oy + 44 + i * 2, 4, 255, 255, 255);
        }
      } else if (row === 3 && col === 2) {
        // (2,3) POWERUP FREEZE
        fillRoundRect(ox + 20, oy + 20, 88, 88, 22, 56, 189, 248);
        strokeRoundRect(ox + 20, oy + 20, 88, 88, 22, 3, 2, 132, 199);
        fillRect(ox + 62, oy + 38, 4, 52, 255, 255, 255);
        fillRect(ox + 38, oy + 62, 52, 4, 255, 255, 255);
        fillCircle(ox + 64, oy + 64, 8, 255, 255, 255);
      } else if (row === 3 && col === 3) {
        // (3,3) POWERUP STAR
        fillRoundRect(ox + 20, oy + 20, 88, 88, 22, 234, 179, 8);
        strokeRoundRect(ox + 20, oy + 20, 88, 88, 22, 3, 161, 98, 7);
        fillCircle(ox + 64, oy + 64, 22, 255, 255, 255);
        fillCircle(ox + 64, oy + 64, 14, 234, 179, 8);
      }
    }
  }

  // PNG Encoder
  const scanlineLength = width * 4;
  const rawBuf = Buffer.alloc((scanlineLength + 1) * height);
  let srcOffset = 0;
  let dstOffset = 0;
  for (let y = 0; y < height; y++) {
    rawBuf[dstOffset++] = 0;
    imgData.copy(rawBuf, dstOffset, srcOffset, srcOffset + scanlineLength);
    dstOffset += scanlineLength;
    srcOffset += scanlineLength;
  }

  const deflated = zlib.deflateSync(rawBuf);

  function crc32(buf) {
    let crc = 0 ^ (-1);
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
    }
    return (crc ^ (-1)) >>> 0;
  }
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[i] = c;
  }

  function makeChunk(type, data) {
    const len = data.length;
    const header = Buffer.alloc(4);
    header.writeUInt32BE(len, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const toCrc = Buffer.concat([typeBuf, data]);
    crcBuf.writeUInt32BE(crc32(toCrc), 0);
    return Buffer.concat([header, typeBuf, data, crcBuf]);
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const pngData = Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', deflated),
    makeChunk('IEND', Buffer.alloc(0))
  ]);

  fs.writeFileSync('games/common/spritesheet.png', pngData);
  fs.writeFileSync('public/games/common/spritesheet.png', pngData);
  console.log('PNG SPRITESHEET CREATED! Length:', pngData.length);
}

generateSpritesheetPNG();