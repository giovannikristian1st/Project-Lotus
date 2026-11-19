// ====================================================================
//  漢字 HERO — WEB AUDIO API SYNTHESIZER ENGINE
//  Dynamic 8-Bit Audio Effects and Competitive Music Loop
//  0 KB Asset Size (Fully Mathematical Audio Synthesis)
//  ====================================================================

var GameAudio = {
  ctx: null,
  masterGain: null,
  bgmGain: null,
  sfxGain: null,
  muted: false,
  isPlayingBGM: false,
  bgmInterval: null,
  bgmTempo: 135, // Beats Per Minute
  bgmStep: 0,
  bgmNextNoteTime: 0.0,
  bgmScheduleAheadTime: 0.1, // Schedule 100ms in advance
  bgmLookahead: 25.0, // Check note queue every 25ms

  init: function() {
    if (this.ctx) return;
    try {
      var AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();

      // Master output
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);

      // BGM gain channel (music loops should be quieter)
      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.value = 0.14;
      this.bgmGain.connect(this.masterGain);

      // SFX gain channel
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.50;
      this.sfxGain.connect(this.masterGain);

      // Load persistent mute setting
      var savedMute = localStorage.getItem('ifp_games_audio_muted');
      if (savedMute === 'true') {
        this.setMute(true);
      }
    } catch(e) {
      console.warn("Web Audio API not supported in this browser context.", e);
    }
  },

  ensureCtx: function() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  setMute: function(val) {
    this.ensureCtx();
    this.muted = !!val;
    localStorage.setItem('ifp_games_audio_muted', this.muted);
    if (this.masterGain) {
      this.masterGain.gain.value = this.muted ? 0.0 : 1.0;
    }
    this.updateMuteButtons();
  },

  toggleMute: function() {
    this.setMute(!this.muted);
    this.playClick();
  },

  updateMuteButtons: function() {
    var btns = document.querySelectorAll('.audio-mute-btn');
    var self = this;
    btns.forEach(function(btn) {
      btn.innerHTML = self.muted ? '🔇' : '🔊';
    });
  },

  // ───────────────────────────────────────────────
  //  SOUND EFFECTS (SFX) SYNTHESIZERS
  // ───────────────────────────────────────────────

  playClick: function() {
    this.ensureCtx();
    if (!this.ctx || this.muted) return;

    var osc = this.ctx.createOscillator();
    var gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.type = 'sine';
    var now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.start(now);
    osc.stop(now + 0.08);
  },

  playSuccess: function(streak) {
    this.ensureCtx();
    if (!this.ctx || this.muted) return;

    var now = this.ctx.currentTime;
    // Scale baseline pitch based on current streak
    var baseFreq = 440 + (streak || 0) * 45;
    if (baseFreq > 1300) baseFreq = 1300;

    // Upward 3-note arpeggio chord (chime)
    var notes = [baseFreq, baseFreq * 1.25, baseFreq * 1.5];
    notes.forEach(function(freq, index) {
      var osc = GameAudio.ctx.createOscillator();
      var gain = GameAudio.ctx.createGain();
      osc.connect(gain);
      gain.connect(GameAudio.sfxGain);

      osc.type = 'triangle';
      var startTime = now + index * 0.07;
      var duration = 0.22;

      osc.frequency.setValueAtTime(freq, startTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.05, startTime + duration);

      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  },

  playFailure: function() {
    this.ensureCtx();
    if (!this.ctx || this.muted) return;

    var osc = this.ctx.createOscillator();
    var gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.type = 'sawtooth';
    var now = this.ctx.currentTime;

    osc.frequency.setValueAtTime(160, now);
    osc.frequency.linearRampToValueAtTime(70, now + 0.32);

    gain.gain.setValueAtTime(0.20, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.32);

    osc.start(now);
    osc.stop(now + 0.32);
  },

  playHit: function() {
    this.ensureCtx();
    if (!this.ctx || this.muted) return;

    var now = this.ctx.currentTime;
    var duration = 0.20;

    // Synthesize hit crunch noise (combating / hitting)
    var bufferSize = this.ctx.sampleRate * duration;
    var buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    var data = buffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    var noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    var filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(180, now + duration);

    var gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.38, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(now);
    noise.stop(now + duration);
  },

  playPull: function() {
    this.ensureCtx();
    if (!this.ctx || this.muted) return;

    var osc = this.ctx.createOscillator();
    var gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.type = 'triangle';
    var now = this.ctx.currentTime;

    // Pitch modulation Creak (friction tension)
    osc.frequency.setValueAtTime(75, now);
    for (var i = 0; i < 12; i++) {
      var t = now + i * 0.016;
      osc.frequency.setValueAtTime(75 + (i % 2 === 0 ? 40 : 0), t);
    }

    gain.gain.setValueAtTime(0.24, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.22);

    osc.start(now);
    osc.stop(now + 0.22);
  },

  playVictory: function() {
    this.ensureCtx();
    if (!this.ctx || this.muted) return;

    var now = this.ctx.currentTime;
    // Upward fanfare chords
    var melody = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    melody.forEach(function(freq, index) {
      var osc = GameAudio.ctx.createOscillator();
      var gain = GameAudio.ctx.createGain();
      osc.connect(gain);
      gain.connect(GameAudio.sfxGain);

      osc.type = 'square';
      var startTime = now + index * 0.09;
      var duration = index === 6 ? 0.6 : 0.16;

      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  },

  playDefeat: function() {
    this.ensureCtx();
    if (!this.ctx || this.muted) return;

    var now = this.ctx.currentTime;
    // Descending sad retro tune
    var melody = [220.00, 207.65, 196.00, 174.61];
    melody.forEach(function(freq, index) {
      var osc = GameAudio.ctx.createOscillator();
      var gain = GameAudio.ctx.createGain();
      osc.connect(gain);
      gain.connect(GameAudio.sfxGain);

      osc.type = 'sawtooth';
      var startTime = now + index * 0.16;
      var duration = index === 3 ? 0.90 : 0.24;

      osc.frequency.setValueAtTime(freq, startTime);
      if (index === 3) {
        osc.frequency.exponentialRampToValueAtTime(60, startTime + duration);
      }

      gain.gain.setValueAtTime(0.16, startTime);
      gain.gain.linearRampToValueAtTime(0.001, startTime + duration);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  },

  // ───────────────────────────────────────────────
  //  BACKGROUND MUSIC (BGM) COMPOSER LOOP — HIGH-OCTANE BATTLE OST
  // ───────────────────────────────────────────────
  bgmTempo: 150, // High-energy driving battle tempo
  bgmTotalSteps: 32, // 2-bar 16th note battle loop

  startBGM: function(tempo) {
    this.ensureCtx();
    if (!this.ctx) return;
    if (this.isPlayingBGM) return;
    this.isPlayingBGM = true;
    if (tempo) this.bgmTempo = tempo;

    this.bgmStep = 0;
    this.bgmNextNoteTime = this.ctx.currentTime;

    var self = this;
    function scheduleLoop() {
      if (!self.isPlayingBGM) return;
      while (self.bgmNextNoteTime < self.ctx.currentTime + self.bgmScheduleAheadTime) {
        self.scheduleNote(self.bgmStep, self.bgmNextNoteTime);
        self.advanceStep();
      }
      self.bgmInterval = setTimeout(scheduleLoop, self.bgmLookahead);
    }

    scheduleLoop();
  },

  setBGMTempo: function(tempo) {
    this.bgmTempo = tempo;
  },

  stopBGM: function() {
    this.isPlayingBGM = false;
    if (this.bgmInterval) {
      clearTimeout(this.bgmInterval);
      this.bgmInterval = null;
    }
  },

  advanceStep: function() {
    var secondsPerBeat = 60.0 / this.bgmTempo;
    var secondsPerStep = 0.25 * secondsPerBeat; // 16th note steps
    this.bgmNextNoteTime += secondsPerStep;
    this.bgmStep = (this.bgmStep + 1) % (this.bgmTotalSteps || 32);
  },

  scheduleNote: function(step, time) {
    if (!this.ctx || this.muted) return;

    var ctx = this.ctx;
    var s16 = step % 16;
    var bar = Math.floor(step / 16); // Bar 0 or Bar 1

    // ── 1. PUNCHY 808 BATTLE KICK DRUM (Beats 1, 2.5, 3, 4.5) ──
    if (s16 === 0 || s16 === 6 || s16 === 8 || s16 === 14) {
      var kickOsc = ctx.createOscillator();
      var kickGain = ctx.createGain();
      kickOsc.connect(kickGain);
      kickGain.connect(this.bgmGain);

      kickOsc.type = 'sine';
      kickOsc.frequency.setValueAtTime(140, time);
      kickOsc.frequency.exponentialRampToValueAtTime(38, time + 0.14);

      kickGain.gain.setValueAtTime(0.35, time);
      kickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);

      kickOsc.start(time);
      kickOsc.stop(time + 0.14);
    }

    // ── 2. CRISP BATTLE SNARE / CLAP (Beats 2 and 4) ──
    if (s16 === 4 || s16 === 12) {
      var snareDur = 0.10;
      var bufferSize = ctx.sampleRate * snareDur;
      var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      var data = buffer.getChannelData(0);
      for (var i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      var noise = ctx.createBufferSource();
      noise.buffer = buffer;

      var filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, time);
      filter.Q.setValueAtTime(1.8, time);

      var snareGain = ctx.createGain();
      snareGain.gain.setValueAtTime(0.25, time);
      snareGain.gain.exponentialRampToValueAtTime(0.001, time + snareDur);

      noise.connect(filter);
      filter.connect(snareGain);
      snareGain.connect(this.bgmGain);

      noise.start(time);
      noise.stop(time + snareDur);

      // Body tone
      var snareTone = ctx.createOscillator();
      var snareToneGain = ctx.createGain();
      snareTone.type = 'triangle';
      snareTone.frequency.setValueAtTime(210, time);
      snareTone.frequency.exponentialRampToValueAtTime(80, time + 0.08);
      snareToneGain.gain.setValueAtTime(0.18, time);
      snareToneGain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

      snareTone.connect(snareToneGain);
      snareToneGain.connect(this.bgmGain);
      snareTone.start(time);
      snareTone.stop(time + 0.08);
    }

    // ── 3. FAST 16TH HI-HAT CYMBALS (Driving Anime Groove) ──
    var hatDur = (s16 % 2 === 0) ? 0.025 : 0.045;
    var hatBuf = ctx.createBuffer(1, ctx.sampleRate * hatDur, ctx.sampleRate);
    var hatData = hatBuf.getChannelData(0);
    for (var h = 0; h < hatData.length; h++) {
      hatData[h] = Math.random() * 2 - 1;
    }
    var hatSource = ctx.createBufferSource();
    hatSource.buffer = hatBuf;
    var hatFilter = ctx.createBiquadFilter();
    hatFilter.type = 'highpass';
    hatFilter.frequency.setValueAtTime(8500, time);

    var hatGain = ctx.createGain();
    var hatVol = (s16 % 4 === 2) ? 0.12 : ((s16 % 2 === 0) ? 0.06 : 0.09);
    hatGain.gain.setValueAtTime(hatVol, time);
    hatGain.gain.exponentialRampToValueAtTime(0.001, time + hatDur);

    hatSource.connect(hatFilter);
    hatFilter.connect(hatGain);
    hatGain.connect(this.bgmGain);
    hatSource.start(time);
    hatSource.stop(time + hatDur);

    // ── 4. PERSONA SLAP / SYNTH DRIVING BASSLINE ──
    // 32-step battle chord progression: Bar 0 = A Minor / C, Bar 1 = F Major / G
    var bassNotesBar0 = [
      110.00, 0, 110.00, 220.00,  // A2, _, A2, A3 (octave jump)
      0, 130.81, 146.83, 0,       // _, C3, D3, _
      110.00, 110.00, 0, 164.81,  // A2, A2, _, E3
      196.00, 0, 220.00, 110.00   // G3, _, A3, A2
    ];
    var bassNotesBar1 = [
      87.31,  0, 87.31,  174.61,  // F2, _, F2, F3
      0, 103.83, 116.54, 0,       // _, Ab2, Bb2, _
      98.00,  98.00,  0, 196.00,  // G2, G2, _, G3
      220.00, 0, 246.94, 261.63   // A3, _, B3, C4
    ];

    var bFreq = (bar === 0 ? bassNotesBar0 : bassNotesBar1)[s16];
    if (bFreq > 0) {
      var bOsc = ctx.createOscillator();
      var bGain = ctx.createGain();
      var bFilter = ctx.createBiquadFilter();

      bOsc.type = 'sawtooth';
      bOsc.frequency.setValueAtTime(bFreq, time);

      bFilter.type = 'lowpass';
      bFilter.frequency.setValueAtTime(500, time);
      bFilter.frequency.exponentialRampToValueAtTime(140, time + 0.12);

      bGain.gain.setValueAtTime(0.30, time);
      bGain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

      bOsc.connect(bFilter);
      bFilter.connect(bGain);
      bGain.connect(this.bgmGain);

      bOsc.start(time);
      bOsc.stop(time + 0.12);
    }

    // ── 5. HIGH-OCTANE ANIME LEAD SYNTH ARPEGGIO ──
    // Fast melodic arpeggio hook soaring above the rhythm
    var leadNotesBar0 = [
      440.00, 0, 523.25, 659.25,  // A4, _, C5, E5
      587.33, 523.25, 440.00, 0,  // D5, C5, A4, _
      659.25, 0, 783.99, 880.00,  // E5, _, G5, A5
      783.99, 659.25, 587.33, 523.25 // G5, E5, D5, C5
    ];
    var leadNotesBar1 = [
      698.46, 0, 880.00, 1046.50, // F5, _, A5, C6
      880.00, 698.46, 587.33, 0,  // A5, F5, D5, _
      783.99, 0, 987.77, 1174.66, // G5, _, B5, D6
      1046.50, 880.00, 783.99, 659.25 // C6, A5, G5, E5
    ];

    var lFreq = (bar === 0 ? leadNotesBar0 : leadNotesBar1)[s16];
    if (lFreq > 0) {
      var lOsc = ctx.createOscillator();
      var lGain = ctx.createGain();

      lOsc.type = 'square';
      lOsc.frequency.setValueAtTime(lFreq, time);

      var lDur = 0.10;
      lGain.gain.setValueAtTime(0.09, time);
      lGain.gain.exponentialRampToValueAtTime(0.001, time + lDur);

      lOsc.connect(lGain);
      lGain.connect(this.bgmGain);

      lOsc.start(time);
      lOsc.stop(time + lDur);
    }
  },

  setupAutoInit: function() {
    var self = this;
    var initEvents = ['click', 'touchstart', 'pointerdown'];
    var initTrigger = function() {
      self.ensureCtx();
      initEvents.forEach(function(ev) {
        document.removeEventListener(ev, initTrigger);
      });
      self.updateMuteButtons();
    };
    initEvents.forEach(function(ev) {
      document.addEventListener(ev, initTrigger);
    });
  }
};

GameAudio.setupAutoInit();
