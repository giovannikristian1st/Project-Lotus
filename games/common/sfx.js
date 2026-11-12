/**
 * SFX Engine menggunakan Web Audio API murni.
 * Tanpa file MP3 eksternal, bekerja 100% offline, latensi nol, dan sangat jernih.
 */
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.2, gainValue = 0.15) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainValue, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  // Nada Benar: Ceria arpeggio C5 -> E5 -> G5 -> C6
  correct() {
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.25, 0.2);
      }, idx * 75);
    });
  }

  // Nada Salah: Buzzer nada rendah
  wrong() {
    this.init();
    this.playTone(180, 'sawtooth', 0.18, 0.22);
    setTimeout(() => {
      this.playTone(140, 'sawtooth', 0.25, 0.22);
    }, 120);
  }

  // Detak Jam Timer
  tick() {
    this.playTone(800, 'sine', 0.04, 0.08);
  }

  // Klik Tombol
  click() {
    this.playTone(600, 'sine', 0.05, 0.1);
  }

  // Roda berputar (Tik tik ratchet)
  wheelClick() {
    this.playTone(950, 'triangle', 0.03, 0.12);
  }

  // Flip Kartu / Buka Kotak (Pop)
  flip() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  // Menang Game (Fanfare)
  win() {
    this.init();
    const melody = [
      { f: 523.25, d: 120 }, // C5
      { f: 659.25, d: 120 }, // E5
      { f: 783.99, d: 120 }, // G5
      { f: 1046.50, d: 350 }, // C6
    ];
    let time = 0;
    melody.forEach((note) => {
      setTimeout(() => {
        this.playTone(note.f, 'triangle', note.d / 1000 + 0.1, 0.25);
      }, time);
      time += note.d;
    });
  }

  // Whack Hit (Pukul Tikus)
  hit() {
    this.playTone(450, 'triangle', 0.08, 0.25);
  }
}

// Instance global
window.SFX = new SoundEffects();
// Otomatis init saat user pertama kali klik di halaman
window.addEventListener('pointerdown', () => window.SFX.init(), { once: true });
