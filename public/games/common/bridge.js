/**
 * GameBridge: Penghubung antara Game Engine Mandiri dan Platform Portal / Supabase
 */
class LotusGameBridge {
  constructor() {
    this.activity = null;
    this.playerName = (window.LotusI18n && window.LotusI18n.getLang() === 'en') ? 'Guest Student' : 'Siswa Tamu';
    this.playerClass = '-';
    this.assignmentId = null;
    this.startTime = Date.now();
    this.onActivityReadyCallback = null;
    this.onSettingsCallback = null;
    this.isActivityLoaded = false;

    // Listen postMessage dari parent / dashboard iframe
    window.addEventListener('message', (event) => {
      if (!event.data) return;
      if (event.data.type === 'INIT_ACTIVITY') {
        const newAct = this.normalizeActivity(event.data.activity);
        this.playerName = event.data.playerName || this.playerName;
        this.playerClass = event.data.playerClass || this.playerClass;
        this.assignmentId = event.data.assignmentId || null;

        const themeToApply = newAct?.theme || this.activity?.theme || 'white';
        if (window.LotusThemes) {
          window.LotusThemes.apply(themeToApply, Boolean(newAct && newAct.theme));
        }

        const isSameActivity = this.isActivityLoaded && this.activity && newAct && (this.activity.id === newAct.id);
        this.activity = newAct;

        if (this.onActivityReadyCallback) {
          if (!this.isActivityLoaded || !isSameActivity) {
            this.isActivityLoaded = true;
            this.onActivityReadyCallback(this.activity);
          }
        }
      } else if (event.data.type === 'UPDATE_SETTINGS') {
        const baseAct = this.activity ? { ...this.activity } : this.getDefaultActivity();
        const incomingAct = (event.data.activity && typeof event.data.activity === 'object') ? event.data.activity : null;
        const merged = {
          ...baseAct,
          ...(incomingAct || {})
        };

        const mergedRules = {
          ...(baseAct.rules || {}),
          ...(incomingAct && incomingAct.rules ? incomingAct.rules : {}),
          ...(event.data.rules && typeof event.data.rules === 'object' ? event.data.rules : {})
        };
        const mergedSettings = {
          ...(baseAct.settings || {}),
          ...(incomingAct && incomingAct.settings ? incomingAct.settings : {}),
          ...(event.data.settings && typeof event.data.settings === 'object' ? event.data.settings : {})
        };

        if (event.data.rules && typeof event.data.rules === 'object') {
          const r = event.data.rules;
          if (r.timerSeconds !== undefined) mergedSettings.timerSeconds = r.timerSeconds;
          if (r.hasLives !== undefined) {
            mergedSettings.hasLives = r.hasLives;
            if (!r.hasLives) mergedSettings.lives = 0;
          }
          if (r.livesCount !== undefined) {
            mergedSettings.lives = (mergedRules.hasLives === false) ? 0 : r.livesCount;
          }
          if (r.timeMode !== undefined) mergedSettings.timeMode = r.timeMode;
          if (r.shuffleQuestions !== undefined) mergedSettings.shuffle = r.shuffleQuestions;
          if (r.shuffleAnswers !== undefined) mergedSettings.shuffleAnswers = r.shuffleAnswers;
        } else if (event.data.settings && typeof event.data.settings === 'object') {
          const s = event.data.settings;
          if (s.timerSeconds !== undefined) mergedRules.timerSeconds = s.timerSeconds;
          if (s.lives !== undefined) {
            mergedRules.livesCount = s.lives;
            mergedRules.hasLives = Number(s.lives) > 0;
          }
          if (s.hasLives !== undefined) mergedRules.hasLives = s.hasLives;
          if (s.timeMode !== undefined) mergedRules.timeMode = s.timeMode;
          if (s.shuffle !== undefined) mergedRules.shuffleQuestions = s.shuffle;
          if (s.shuffleAnswers !== undefined) mergedRules.shuffleAnswers = s.shuffleAnswers;
        }

        merged.rules = mergedRules;
        merged.settings = mergedSettings;

        const nextTheme = event.data.theme || (incomingAct && incomingAct.theme) || merged.theme;
        if (nextTheme) {
          merged.theme = (nextTheme === 'magical') ? 'magical' : 'white';
        }

        this.activity = this.normalizeActivity(merged);

        if (window.LotusThemes) {
          const hasExplicitTheme = Boolean(event.data.theme || (incomingAct && incomingAct.theme));
          const themeToApply = nextTheme || this.activity?.theme || 'white';
          window.LotusThemes.apply(themeToApply, hasExplicitTheme);
        }

        if (this.onSettingsCallback) {
          this.onSettingsCallback({
            ...event.data,
            activity: this.activity,
            rules: this.activity.rules,
            settings: this.activity.settings,
            theme: this.activity.theme || event.data.theme
          });
        } else if (this.onActivityReadyCallback && event.data.restart !== false) {
          this.isActivityLoaded = true;
          this.startTime = Date.now();
          this.onActivityReadyCallback(this.activity);
        }
      } else if (event.data.type === 'GAME_SETTINGS' || event.data.type === 'GAME_CMD') {
        if (this.onSettingsCallback) {
          this.onSettingsCallback(event.data);
        }
      } else if (event.data.type === 'LANG_CHANGE' && window.LotusI18n) {
        window.LotusI18n.setLang(event.data.lang, { persist: false, broadcast: false });
      }
    });

    // Beri tahu parent window bahwa bridge siap menerima data kuis
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'GAME_READY' }, '*');
      }
    } catch (e) {}
  }

  onReady(callback) {
    this.onActivityReadyCallback = callback;
    this.resolveActivity();
  }

  onSettings(callback) {
    this.onSettingsCallback = typeof callback === 'function' ? callback : null;
  }

  postState(stateObj = {}) {
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'GAME_STATE', ...(stateObj || {}) }, '*');
      }
    } catch (e) {}
  }

  isEmbedded() {
    try {
      if (window.self !== window.top) return true;
    } catch (e) {
      return true;
    }
    try {
      return new URLSearchParams(window.location.search).get('embedded') === '1';
    } catch (e) {
      return false;
    }
  }

  resolveActivity() {
    // 1. Cek window variable
    if (window.WORDWALL_ACTIVITY) {
      this.activity = window.WORDWALL_ACTIVITY;
      this.triggerReady();
      return;
    }

    // 2. Cek URL Params
    const urlParams = new URLSearchParams(window.location.search);
    const activityId = urlParams.get('id');
    const nameParam = urlParams.get('name');
    const classParam = urlParams.get('class');
    const assignmentParam = urlParams.get('assignment');

    if (nameParam) this.playerName = decodeURIComponent(nameParam);
    if (classParam) this.playerClass = decodeURIComponent(classParam);
    if (assignmentParam) this.assignmentId = assignmentParam;

    // 3. Cek localStorage untuk cache activity
    if (activityId) {
      try {
        const stored = localStorage.getItem(`activity_${activityId}`) || localStorage.getItem('current_game_activity');
        if (stored) {
          this.activity = JSON.parse(stored);
          this.triggerReady();
          return;
        }

        // Cek lotus_projects dari LotusDB (cocokkan ID atau PIN)
        const lotusProjects = JSON.parse(localStorage.getItem('lotus_projects') || '[]');
        const found = lotusProjects.find(p => p.id === activityId || String(p.pin || '') === String(activityId));
        if (found) {
          this.activity = found;
          this.triggerReady();
          return;
        }

        // Cek wordwall_activities (kompatibilitas lama)
        const wordwallActivities = JSON.parse(localStorage.getItem('wordwall_activities') || '[]');
        const foundWW = wordwallActivities.find(p => p.id === activityId);
        if (foundWW) {
          this.activity = foundWW;
          this.triggerReady();
          return;
        }
      } catch (e) {}
    }

    // 4. Fallback Default Sample Activity
    this.activity = this.getDefaultActivity();
    this.triggerReady();
  }

  normalizeActivity(act) {
    if (!act) return this.getDefaultActivity();
    const normalized = { ...act };
    const isEn = window.LotusI18n ? window.LotusI18n.getLang() === 'en' : true;

    const rawList = act.questions || act.content?.items || [];
    const items = rawList.map((item, idx) => {
      const qText = item.text || item.question || (isEn ? `Question #${idx + 1}` : `Pertanyaan #${idx + 1}`);
      let opts = [];
      let correctAns = item.correctAnswer || '';
      let wrongAns = Array.isArray(item.wrongAnswers) ? [...item.wrongAnswers] : [];

      if (Array.isArray(item.options) && item.options.length > 0) {
        opts = item.options.map(o => {
          if (typeof o === 'string') return { text: o, isCorrect: false, image: '' };
          return { text: o.text || '', isCorrect: Boolean(o.isCorrect), image: o.image || '' };
        });
        const correctOpts = opts.filter(o => o.isCorrect);
        if (correctOpts.length > 0 && !correctAns) {
          correctAns = correctOpts[0].text;
        }
        const wrongOpts = opts.filter(o => !o.isCorrect);
        if (wrongOpts.length > 0 && wrongAns.length === 0) {
          wrongAns = wrongOpts.map(w => w.text);
        }
      } else {
        opts = [
          { text: correctAns || (isEn ? 'Correct Answer' : 'Jawaban Benar'), isCorrect: true, image: '' },
          ...wrongAns.map(w => ({ text: w, isCorrect: false, image: '' }))
        ];
      }

      return {
        id: item.id || String(idx + 1),
        text: qText,
        question: qText,
        image: item.image || '',
        audio: item.audio || '',
        pinyin: item.pinyin || '',
        meaning: item.meaning || '',
        options: opts,
        correctAnswer: correctAns || (opts[0] ? opts[0].text : (isEn ? 'Correct Answer' : 'Jawaban Benar')),
        wrongAnswers: wrongAns.length > 0 ? wrongAns : (isEn ? ['Option B', 'Distractor'] : ['Pilihan Lain', 'Pengecoh']),
        category: item.category || (isEn ? 'General' : 'Umum'),
        pairTarget: item.pairTarget || correctAns || (opts[0] ? opts[0].text : ''),
        word: item.word || correctAns || qText
      };
    });

    if (items.length === 0) {
      return this.normalizeActivity(this.getDefaultActivity());
    }

    normalized.questions = items;
    normalized.content = { items: items };

    const rules = act.rules || {};
    const settings = act.settings || {};

    const timerSecs = Number(rules.timerSeconds ?? settings.timerSeconds ?? 30);
    const hasLives = rules.hasLives !== undefined ? rules.hasLives : (settings.lives !== 0);
    const livesCnt = hasLives ? (Number(rules.livesCount ?? settings.lives ?? 3) || 3) : 0;
    const timeMode = rules.timeMode || (timerSecs > 0 ? 'timer' : 'none');
    const shuffle = rules.shuffleQuestions ?? settings.shuffle ?? true;
    const shuffleAns = rules.shuffleAnswers ?? true;

    normalized.settings = {
      timerSeconds: timerSecs,
      lives: livesCnt,
      hasLives: hasLives,
      timeMode: timeMode,
      shuffle: shuffle,
      shuffleAnswers: shuffleAns,
      showAnswers: true
    };

    normalized.rules = {
      hasLives: hasLives,
      livesCount: livesCnt,
      timeMode: timeMode,
      timerSeconds: timerSecs,
      shuffleQuestions: shuffle,
      shuffleAnswers: shuffleAns
    };

    return normalized;
  }

  triggerReady() {
    this.startTime = Date.now();
    this.activity = this.normalizeActivity(this.activity);

    // Terapkan tema jika dispesifikasikan dalam activity atau URL
    const urlParams = new URLSearchParams(window.location.search);
    const themeToApply = urlParams.get('theme') || this.activity?.theme || 'white';
    if (window.LotusThemes) {
      window.LotusThemes.apply(themeToApply);
    }

    if (this.onActivityReadyCallback && this.activity) {
      if (!this.isActivityLoaded) {
        this.isActivityLoaded = true;
        this.onActivityReadyCallback(this.activity);
      }
    }
  }

  finishGame(score, maxScore, answersSummary = [], customStudentName = null) {
    const timeTaken = Math.max(1, Math.round((Date.now() - this.startTime) / 1000));
    const defaultPlayer = (window.LotusI18n && window.LotusI18n.getLang() === 'en') ? 'Player' : 'Pemain';
    const finalStudentName = (customStudentName || this.playerName || defaultPlayer).trim();
    const resultData = {
      type: 'GAME_OVER',
      activityId: this.activity?.id || 'demo-1',
      assignmentId: this.assignmentId,
      studentName: finalStudentName,
      studentClass: this.playerClass || '-',
      score: score,
      maxScore: maxScore,
      percentage: Math.round((score / Math.max(1, maxScore)) * 100),
      timeTakenSeconds: timeTaken,
      answersSummary: answersSummary,
      completedAt: new Date().toISOString()
    };

    if (window.parent && window.parent !== window) {
      window.parent.postMessage(resultData, '*');
    }

    try {
      const resultsKey = `results_${this.activity?.id || 'demo'}`;
      const existing = JSON.parse(localStorage.getItem(resultsKey) || '[]');
      existing.push({
        id: 'res_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        student_name: finalStudentName,
        student_class: this.playerClass || '-',
        score: score,
        max_score: maxScore,
        time_taken_seconds: timeTaken,
        completed_at: new Date().toISOString()
      });
      existing.sort((a, b) => b.score - a.score || a.time_taken_seconds - b.time_taken_seconds);
      localStorage.setItem(resultsKey, JSON.stringify(existing.slice(0, 100)));
    } catch (e) {}

    return resultData;
  }

  getLeaderboard() {
    try {
      const resultsKey = `results_${this.activity?.id || 'demo'}`;
      return JSON.parse(localStorage.getItem(resultsKey) || '[]');
    } catch (e) {
      return [];
    }
  }

  deleteLeaderboardEntry(entryId) {
    try {
      const resultsKey = `results_${this.activity?.id || 'demo'}`;
      let existing = JSON.parse(localStorage.getItem(resultsKey) || '[]');
      existing = existing.filter(e => e.id !== entryId);
      localStorage.setItem(resultsKey, JSON.stringify(existing));
      return existing;
    } catch (e) {
      return [];
    }
  }

  clearLeaderboard() {
    try {
      const resultsKey = `results_${this.activity?.id || 'demo'}`;
      localStorage.removeItem(resultsKey);
      return [];
    } catch (e) {
      return [];
    }
  }

  getDefaultActivity() {
    const isEn = window.LotusI18n ? window.LotusI18n.getLang() === 'en' : true;
    if (isEn) {
      return {
        id: "demo-tata-surya",
        title: "Solar System & Space Science",
        description: "Test your knowledge about planets and celestial bodies in our solar system!",
        subject: "Science",
        level: "SD",
        language: "en",
        settings: { timerSeconds: 30, lives: 3, shuffle: true, showAnswers: true },
        content: {
          items: [
            {
              id: "1",
              question: "Which planet is famously nicknamed the 'Red Planet'?",
              correctAnswer: "Mars",
              wrongAnswers: ["Venus", "Jupiter", "Mercury"],
              category: "Terrestrial Planet",
              pairTarget: "Mars",
              word: "MARS",
              image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=600&auto=format&fit=crop&q=80"
            },
            {
              id: "2",
              question: "Which star sits at the center of our solar system?",
              correctAnswer: "Sun",
              wrongAnswers: ["Moon", "Sirius", "Polaris"],
              category: "Star",
              pairTarget: "Sun",
              word: "SUN",
              image: "https://images.unsplash.com/photo-1532703108390-d45a8888c7f9?w=600&auto=format&fit=crop&q=80"
            },
            {
              id: "3",
              question: "Which planet is the largest in our solar system?",
              correctAnswer: "Jupiter",
              wrongAnswers: ["Saturn", "Uranus", "Neptune"],
              category: "Gas Giant",
              pairTarget: "Jupiter",
              word: "JUPITER",
              image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600&auto=format&fit=crop&q=80"
            },
            {
              id: "4",
              question: "Which planet is famous for its wide, icy rings?",
              correctAnswer: "Saturn",
              wrongAnswers: ["Neptune", "Uranus", "Jupiter"],
              category: "Gas Giant",
              pairTarget: "Saturn",
              word: "SATURN",
              image: "https://images.unsplash.com/photo-1614732484003-ef9881555dc3?w=600&auto=format&fit=crop&q=80"
            },
            {
              id: "5",
              question: "What is Earth's only natural satellite?",
              correctAnswer: "Moon",
              wrongAnswers: ["Titan", "Phobos", "Europa"],
              category: "Natural Satellite",
              pairTarget: "Moon",
              word: "MOON",
              image: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=600&auto=format&fit=crop&q=80"
            }
          ]
        }
      };
    }

    return {
      id: "demo-tata-surya",
      title: "Tata Surya & Sains Antariksa",
      description: "Uji pengetahuan tentang planet dan benda langit dalam tata surya kita!",
      subject: "Sains / IPA",
      level: "SD",
      language: "id",
      settings: { timerSeconds: 30, lives: 3, shuffle: true, showAnswers: true },
      content: {
        items: [
          {
            id: "1",
            question: "Planet manakah yang dijuluki sebagai 'Planet Merah'?",
            correctAnswer: "Mars",
            wrongAnswers: ["Venus", "Jupiter", "Merkurius"],
            category: "Planet Terestrial",
            pairTarget: "Mars",
            word: "MARS",
            image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=600&auto=format&fit=crop&q=80"
          },
          {
            id: "2",
            question: "Bintang yang menjadi pusat tata surya kita adalah...",
            correctAnswer: "Matahari",
            wrongAnswers: ["Bulan", "Sirius", "Polaris"],
            category: "Bintang",
            pairTarget: "Matahari",
            word: "MATAHARI",
            image: "https://images.unsplash.com/photo-1532703108390-d45a8888c7f9?w=600&auto=format&fit=crop&q=80"
          },
          {
            id: "3",
            question: "Planet terbesar dalam tata surya kita adalah...",
            correctAnswer: "Jupiter",
            wrongAnswers: ["Saturnus", "Uranus", "Neptunus"],
            category: "Planet Gas Raksasa",
            pairTarget: "Jupiter",
            word: "JUPITER",
            image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600&auto=format&fit=crop&q=80"
          },
          {
            id: "4",
            question: "Planet yang terkenal dengan cincinnya yang indah dan lebar adalah...",
            correctAnswer: "Saturnus",
            wrongAnswers: ["Neptunus", "Uranus", "Jupiter"],
            category: "Planet Gas Raksasa",
            pairTarget: "Saturnus",
            word: "SATURNUS",
            image: "https://images.unsplash.com/photo-1614732484003-ef9881555dc3?w=600&auto=format&fit=crop&q=80"
          },
          {
            id: "5",
            question: "Satelit alami yang mengorbit Bumi adalah...",
            correctAnswer: "Bulan",
            wrongAnswers: ["Titan", "Phobos", "Europa"],
            category: "Satelit Alami",
            pairTarget: "Bulan",
            word: "BULAN",
            image: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=600&auto=format&fit=crop&q=80"
          }
        ]
      }
    };
  }

  // Static proxy methods agar pemanggilan via class atau instance selalu bekerja
  static onReady(callback) {
    if (window.GameBridge && typeof window.GameBridge.onReady === 'function') {
      window.GameBridge.onReady(callback);
    }
  }

  static onSettings(callback) {
    if (window.GameBridge && typeof window.GameBridge.onSettings === 'function') {
      window.GameBridge.onSettings(callback);
    }
  }

  static postState(stateObj) {
    if (window.GameBridge && typeof window.GameBridge.postState === 'function') {
      window.GameBridge.postState(stateObj);
    }
  }

  static isEmbedded() {
    if (window.GameBridge && typeof window.GameBridge.isEmbedded === 'function') {
      return window.GameBridge.isEmbedded();
    }
    try {
      if (window.self !== window.top) return true;
    } catch (e) {
      return true;
    }
    try {
      return new URLSearchParams(window.location.search).get('embedded') === '1';
    } catch (e) {
      return false;
    }
  }

  static finishGame(...args) {
    if (window.GameBridge && typeof window.GameBridge.finishGame === 'function') {
      return window.GameBridge.finishGame(...args);
    }
  }

  static getLeaderboard() {
    if (window.GameBridge && typeof window.GameBridge.getLeaderboard === 'function') {
      return window.GameBridge.getLeaderboard();
    }
    return [];
  }

  static deleteLeaderboardEntry(entryId) {
    if (window.GameBridge && typeof window.GameBridge.deleteLeaderboardEntry === 'function') {
      return window.GameBridge.deleteLeaderboardEntry(entryId);
    }
    return [];
  }

  static clearLeaderboard() {
    if (window.GameBridge && typeof window.GameBridge.clearLeaderboard === 'function') {
      return window.GameBridge.clearLeaderboard();
    }
    return [];
  }
}

// Instansiasi tunggal
const _lotusGameBridgeInstance = new LotusGameBridge();

// Pasang ke window dan global scope agar pemanggilan langsung GameBridge.onReady(...) tidak pernah gagal
window.GameBridge = _lotusGameBridgeInstance;
window.LotusGameBridge = LotusGameBridge;
var GameBridge = _lotusGameBridgeInstance;
