/**
 * db-local.js: LotusWall Local Database Engine (localStorage + IndexedDB)
 * Stores teacher accounts, remember-password preference, curriculum-tagged activities
 * (Standard & AI Camera templates, TK-SMK levels, multi-language), media blobs, & leaderboards.
 */

const LOTUS_SEED_VERSION = '2026.11.17-pure-cloud';

const DEFAULT_TEACHERS = [
  {
    id: 't-demo',
    name: 'Guru Demo',
    username: 'demo',
    email: 'demo@lotuswall.com',
    password: 'demo',
    subject: 'IPA & Umum',
    school: 'Sekolah LotusWall'
  }
];

const _NOW = new Date().toISOString();

const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    pin: '100101',
    teacher_id: 't-demo',
    title: 'Solar System & Space Exploration',
    subject: 'IPA / Sains',
    level: 'SD',
    language: 'en',
    template_type: 'quiz',
    theme: 'white',
    is_public: true,
    rules: { hasLives: true, livesCount: 3, timeMode: 'timer', timerSeconds: 30, shuffleQuestions: true, shuffleAnswers: true },
    is_deleted: false,
    deleted_at: null,
    updated_at: _NOW,
    created_at: _NOW,
    questions: [
      {
        id: 'q1',
        text: 'Which planet in our solar system is famously called the Red Planet?',
        image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=600&auto=format&fit=crop&q=80',
        audio: '',
        category: 'Terrestrial Planet',
        options: [
          { text: 'Mars', isCorrect: true },
          { text: 'Venus', isCorrect: false },
          { text: 'Jupiter', isCorrect: false },
          { text: 'Mercury', isCorrect: false }
        ]
      },
      {
        id: 'q2',
        text: 'What star provides the light and gravitational center of our solar system?',
        image: 'https://images.unsplash.com/photo-1532703108390-d45a8888c7f9?w=600&auto=format&fit=crop&q=80',
        audio: '',
        category: 'Star',
        options: [
          { text: 'The Sun', isCorrect: true },
          { text: 'Polaris', isCorrect: false },
          { text: 'The Moon', isCorrect: false },
          { text: 'Sirius', isCorrect: false }
        ]
      },
      {
        id: 'q3',
        text: 'Which of these are Gas Giant planets? (Select all that apply)',
        category: 'Gas Giant',
        options: [
          { text: 'Jupiter', isCorrect: true },
          { text: 'Saturn', isCorrect: true },
          { text: 'Earth', isCorrect: false },
          { text: 'Mars', isCorrect: false }
        ]
      },
      {
        id: 'q4',
        text: 'What is the hottest planet in our solar system due to its thick greenhouse atmosphere?',
        category: 'Terrestrial Planet',
        options: [
          { text: 'Venus', isCorrect: true },
          { text: 'Mercury', isCorrect: false },
          { text: 'Mars', isCorrect: false },
          { text: 'Jupiter', isCorrect: false }
        ]
      },
      {
        id: 'q5',
        text: 'Which planet is famous for its large, bright ring system made of ice and rock?',
        category: 'Gas Giant',
        options: [
          { text: 'Saturn', isCorrect: true },
          { text: 'Neptune', isCorrect: false },
          { text: 'Uranus', isCorrect: false },
          { text: 'Jupiter', isCorrect: false }
        ]
      },
      {
        id: 'q6',
        text: "What is Earth's only natural satellite that causes ocean tides?",
        category: 'Satellite',
        options: [
          { text: 'The Moon', isCorrect: true },
          { text: 'Europa', isCorrect: false },
          { text: 'Titan', isCorrect: false },
          { text: 'Phobos', isCorrect: false }
        ]
      },
      {
        id: 'q7',
        text: 'What celestial body was reclassified in 2006 as a dwarf planet in the Kuiper Belt?',
        category: 'Dwarf Planet',
        options: [
          { text: 'Pluto', isCorrect: true },
          { text: 'Ceres', isCorrect: false },
          { text: 'Eris', isCorrect: false },
          { text: 'Haumea', isCorrect: false }
        ]
      },
      {
        id: 'q8',
        text: 'What natural phenomenon occurs when the Moon passes directly between the Earth and the Sun?',
        category: 'Astronomy',
        options: [
          { text: 'Solar Eclipse', isCorrect: true },
          { text: 'Lunar Eclipse', isCorrect: false },
          { text: 'Meteor Shower', isCorrect: false },
          { text: 'Equinox', isCorrect: false }
        ]
      },
      {
        id: 'q9',
        text: 'Which planet is known as an Ice Giant and has an axis that tilts almost completely on its side?',
        category: 'Ice Giant',
        options: [
          { text: 'Uranus', isCorrect: true },
          { text: 'Neptune', isCorrect: false },
          { text: 'Saturn', isCorrect: false },
          { text: 'Mars', isCorrect: false }
        ]
      },
      {
        id: 'q10',
        text: 'What is the largest planet in our solar system, famous for its Great Red Spot?',
        category: 'Gas Giant',
        options: [
          { text: 'Jupiter', isCorrect: true },
          { text: 'Saturn', isCorrect: false },
          { text: 'Earth', isCorrect: false },
          { text: 'Neptune', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'proj-2',
    pin: '100102',
    teacher_id: 't-demo',
    title: 'Tebas Buah: Satwa & Ekosistem Nusantara',
    subject: 'IPA / Sains',
    level: 'SD',
    language: 'id',
    template_type: 'fruitninja',
    theme: 'white',
    is_public: true,
    rules: { hasLives: true, livesCount: 3, timeMode: 'stopwatch', timerSeconds: 0, shuffleQuestions: true, shuffleAnswers: true },
    is_deleted: false,
    deleted_at: null,
    updated_at: _NOW,
    created_at: _NOW,
    questions: [
      {
        id: 'q-fn1',
        text: 'Hewan mamalia terbesar di dunia yang hidup di lautan adalah...',
        category: 'Mamalia',
        options: [
          { text: 'Paus Biru', isCorrect: true },
          { text: 'Hiu Putih', isCorrect: false },
          { text: 'Gajah Laut', isCorrect: false }
        ]
      },
      {
        id: 'q-fn2',
        text: 'Organ pernapasan utama pada ikan air tawar dan laut adalah...',
        category: 'Anatomi',
        options: [
          { text: 'Insang', isCorrect: true },
          { text: 'Paru-paru', isCorrect: false },
          { text: 'Kulit', isCorrect: false }
        ]
      },
      {
        id: 'q-fn3',
        text: 'Zat hijau daun yang membantu tumbuhan memasak makanan lewat fotosintesis disebut...',
        category: 'Botani',
        options: [
          { text: 'Klorofil', isCorrect: true },
          { text: 'Oksigen', isCorrect: false },
          { text: 'Glukosa', isCorrect: false }
        ]
      },
      {
        id: 'q-fn4',
        text: 'Kadal terbesar di dunia yang merupakan satwa purba asli Nusa Tenggara Timur adalah...',
        category: 'Reptil',
        options: [
          { text: 'Komodo', isCorrect: true },
          { text: 'Biawak Air', isCorrect: false },
          { text: 'Iguana', isCorrect: false }
        ]
      },
      {
        id: 'q-fn5',
        text: 'Burung endemik Papua yang terkenal dengan keindahan bulu ekor hiasnya adalah...',
        category: 'Burung',
        options: [
          { text: 'Cendrawasih', isCorrect: true },
          { text: 'Kasuari', isCorrect: false },
          { text: 'Merak Jawa', isCorrect: false }
        ]
      },
      {
        id: 'q-fn6',
        text: 'Kera besar berambut kemerahan yang hidup di hutan Sumatera dan Kalimantan adalah...',
        category: 'Primata',
        options: [
          { text: 'Orangutan', isCorrect: true },
          { text: 'Bekantan', isCorrect: false },
          { text: 'Siamang', isCorrect: false }
        ]
      },
      {
        id: 'q-fn7',
        text: 'Tumbuhan parasit langka raksasa tanpa akar dan daun yang ditemukan di Bengkulu adalah...',
        category: 'Botani',
        options: [
          { text: 'Rafflesia Arnoldii', isCorrect: true },
          { text: 'Bunga Bangkai', isCorrect: false },
          { text: 'Kantung Semar', isCorrect: false }
        ]
      },
      {
        id: 'q-fn8',
        text: 'Mamalia bercula satu yang sangat langka dan dilindungi di Taman Nasional Ujung Kulon adalah...',
        category: 'Konservasi',
        options: [
          { text: 'Badak Jawa', isCorrect: true },
          { text: 'Tapir', isCorrect: false },
          { text: 'Anoa', isCorrect: false }
        ]
      },
      {
        id: 'q-fn9',
        text: 'Hewan khas Sulawesi yang berbadan kecil menyerupai kerbau liar bertanduk runcing adalah...',
        category: 'Mamalia',
        options: [
          { text: 'Anoa', isCorrect: true },
          { text: 'Babirusa', isCorrect: false },
          { text: 'Kancil', isCorrect: false }
        ]
      },
      {
        id: 'q-fn10',
        text: 'Proses penguapan air laut dan sungai menjadi uap air oleh sinar matahari disebut...',
        category: 'Siklus Air',
        options: [
          { text: 'Evaporasi', isCorrect: true },
          { text: 'Kondensasi', isCorrect: false },
          { text: 'Presipitasi', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'proj-3',
    pin: '100103',
    teacher_id: 't-demo',
    title: 'AI Motion Hand Slicer: Everyday Science Trivia',
    subject: 'IPA / Sains',
    level: 'SMP',
    language: 'en',
    template_type: 'ai-slicer',
    theme: 'white',
    is_public: true,
    rules: { hasLives: true, livesCount: 3, timeMode: 'timer', timerSeconds: 30, shuffleQuestions: true, shuffleAnswers: true },
    is_deleted: false,
    deleted_at: null,
    updated_at: _NOW,
    created_at: _NOW,
    questions: [
      {
        id: 'q-ais-1',
        text: 'Which gas do humans inhale from the air to stay alive?',
        category: 'Biology',
        options: [
          { text: 'Oxygen', isCorrect: true },
          { text: 'Nitrogen', isCorrect: false },
          { text: 'Helium', isCorrect: false },
          { text: 'Methane', isCorrect: false }
        ]
      },
      {
        id: 'q-ais-2',
        text: 'At standard atmospheric pressure, water boils at what Celsius temperature?',
        category: 'Physics',
        options: [
          { text: '100°C', isCorrect: true },
          { text: '50°C', isCorrect: false },
          { text: '0°C', isCorrect: false },
          { text: '212°C', isCorrect: false }
        ]
      },
      {
        id: 'q-ais-3',
        text: 'How many legs does an insect such as an ant, bee, or butterfly have?',
        category: 'Zoology',
        options: [
          { text: 'Six', isCorrect: true },
          { text: 'Eight', isCorrect: false },
          { text: 'Four', isCorrect: false },
          { text: 'Ten', isCorrect: false }
        ]
      },
      {
        id: 'q-ais-4',
        text: 'What force pulls dropped objects downward toward the center of planet Earth?',
        category: 'Physics',
        options: [
          { text: 'Gravity', isCorrect: true },
          { text: 'Magnetism', isCorrect: false },
          { text: 'Friction', isCorrect: false },
          { text: 'Centrifugal', isCorrect: false }
        ]
      },
      {
        id: 'q-ais-5',
        text: 'What state of matter is water steam or air trapped inside a balloon?',
        category: 'Chemistry',
        options: [
          { text: 'Gas', isCorrect: true },
          { text: 'Liquid', isCorrect: false },
          { text: 'Solid', isCorrect: false },
          { text: 'Plasma', isCorrect: false }
        ]
      },
      {
        id: 'q-ais-6',
        text: 'Which essential mineral makes human bones and teeth strong and healthy?',
        category: 'Health',
        options: [
          { text: 'Calcium', isCorrect: true },
          { text: 'Iron', isCorrect: false },
          { text: 'Sodium', isCorrect: false },
          { text: 'Potassium', isCorrect: false }
        ]
      },
      {
        id: 'q-ais-7',
        text: 'What is the closest star to our planet Earth?',
        category: 'Astronomy',
        options: [
          { text: 'The Sun', isCorrect: true },
          { text: 'Proxima Centauri', isCorrect: false },
          { text: 'Betelgeuse', isCorrect: false },
          { text: 'Sirius', isCorrect: false }
        ]
      },
      {
        id: 'q-ais-8',
        text: 'What simple machine consists of a grooved wheel with a rope to lift heavy loads?',
        category: 'Mechanics',
        options: [
          { text: 'Pulley', isCorrect: true },
          { text: 'Lever', isCorrect: false },
          { text: 'Wedge', isCorrect: false },
          { text: 'Screw', isCorrect: false }
        ]
      },
      {
        id: 'q-ais-9',
        text: 'Which clean energy source is captured directly from sunlight using solar panels?',
        category: 'Energy',
        options: [
          { text: 'Solar Energy', isCorrect: true },
          { text: 'Geothermal', isCorrect: false },
          { text: 'Wind Power', isCorrect: false },
          { text: 'Fossil Fuel', isCorrect: false }
        ]
      },
      {
        id: 'q-ais-10',
        text: 'What muscular organ pumps oxygen-rich blood throughout the human body?',
        category: 'Human Body',
        options: [
          { text: 'Heart', isCorrect: true },
          { text: 'Lungs', isCorrect: false },
          { text: 'Liver', isCorrect: false },
          { text: 'Kidneys', isCorrect: false }
        ]
      }
    ]
  }
];

class LocalDatabase {
  constructor() {
    this.dbName = 'LotusWallDB';
    this.dbVersion = 1;
    this.db = null;
    this.initStorage();
  }

  generatePin(seedNum) {
    if (seedNum) return String(seedNum);
    return String(100000 + Math.floor(Math.random() * 899999));
  }

  normalizeProjectMeta(p) {
    if (!p) return p;
    const copy = { ...p };
    if (!copy.level) copy.level = 'SD';
    if (!copy.language) copy.language = 'id';
    if (copy.is_public === undefined) copy.is_public = true;
    if (!copy.pin) copy.pin = this.generatePin();
    if (!copy.theme || copy.theme === 'cyberpunk') copy.theme = 'white';
    return copy;
  }

  async initStorage() {
    // 1. Supabase Cloud Sync check & init
    this.getSupabaseClient();

    // 2. Teachers & non-destructive seed migration
    const savedSeedVersion = localStorage.getItem('lotus_seed_version');
    const existingTeachersRaw = localStorage.getItem('lotus_teachers');

    if (!existingTeachersRaw || savedSeedVersion !== LOTUS_SEED_VERSION) {
      // Cleanly remove obsolete old mock teachers (t-1 through t-10), keep demo and custom registered teachers
      let currentTeachers = [];
      try {
        currentTeachers = JSON.parse(existingTeachersRaw || '[]');
      } catch (e) {}
      const oldMockIds = ['t-1', 't-2', 't-3', 't-4', 't-5', 't-6', 't-7', 't-8', 't-9', 't-10'];
      const customTeachers = currentTeachers.filter(t => !oldMockIds.includes(t.id) && t.id !== 't-demo');
      const finalTeachers = [...DEFAULT_TEACHERS, ...customTeachers];
      localStorage.setItem('lotus_teachers', JSON.stringify(finalTeachers));
    }

    // 3. Projects & seed migration
    const existingProjectsRaw = localStorage.getItem('lotus_projects');
    if (!existingProjectsRaw || savedSeedVersion !== LOTUS_SEED_VERSION) {
      let currentProjects = [];
      try {
        currentProjects = JSON.parse(existingProjectsRaw || '[]');
      } catch (e) {}
      const oldMockTeacherIds = ['t-1', 't-2', 't-3', 't-4', 't-5', 't-6', 't-7', 't-8', 't-9', 't-10'];
      const defaultIds = INITIAL_PROJECTS.map(p => p.id);
      // Cleanly remove all old mock teacher projects to prevent unwanted games from cluttering community
      const userProjects = currentProjects.filter(p =>
        !defaultIds.includes(p.id) &&
        !p.id.startsWith('proj-demo-old') &&
        !oldMockTeacherIds.includes(p.teacher_id)
      );
      const mergedProjects = [...INITIAL_PROJECTS, ...userProjects].map(p => this.normalizeProjectMeta(p));
      localStorage.setItem('lotus_projects', JSON.stringify(mergedProjects));
      localStorage.setItem('lotus_seeded_project_ids', JSON.stringify(defaultIds));
      localStorage.setItem('lotus_seed_version', LOTUS_SEED_VERSION);
    }

    // 4. Background cloud sync if Supabase configured (Pure Supabase Sync)
    if (this.hasSupabase()) {
      this.syncProjectsFromCloud().catch(() => {});
      this.syncTeachersFromCloud().catch(() => {});
    }

    // 3. IndexedDB for media assets
    return new Promise((resolve) => {
      try {
        const req = indexedDB.open(this.dbName, this.dbVersion);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains('media_assets')) {
            db.createObjectStore('media_assets', { keyPath: 'id' });
          }
        };
        req.onsuccess = (e) => {
          this.db = e.target.result;
          resolve(this.db);
        };
        req.onerror = () => resolve(null);
      } catch (e) {
        resolve(null);
      }
    });
  }

  // --- TEACHERS & AUTH ---
  getTeachers() {
    try {
      const list = JSON.parse(localStorage.getItem('lotus_teachers') || '[]');
      return Array.isArray(list) && list.length > 0 ? list : DEFAULT_TEACHERS;
    } catch (e) {
      return DEFAULT_TEACHERS;
    }
  }

  getTeacherById(teacherId) {
    return this.getTeachers().find(t => t.id === teacherId) || null;
  }

  getTeacherNameById(teacherId) {
    const t = this.getTeacherById(teacherId);
    return t ? t.name : 'LotusWall Teacher';
  }

  getCurrentTeacherStrict() {
    try {
      const saved = sessionStorage.getItem('lotus_active_teacher') || localStorage.getItem('lotus_active_teacher');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  }

  getCurrentTeacher() {
    return this.getCurrentTeacherStrict() || DEFAULT_TEACHERS[0];
  }

  setCurrentTeacher(teacher, rememberSession = false) {
    sessionStorage.setItem('lotus_active_teacher', JSON.stringify(teacher));
    if (rememberSession) {
      localStorage.setItem('lotus_active_teacher', JSON.stringify(teacher));
    } else {
      localStorage.removeItem('lotus_active_teacher');
    }
  }

  getRememberedCredentials() {
    try {
      const raw = localStorage.getItem('lotus_remembered_login');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  saveRememberedCredentials(identifier, password) {
    try {
      localStorage.setItem('lotus_remembered_login', JSON.stringify({
        identifier: identifier || '',
        password: password || '',
        remember: true
      }));
    } catch (e) {}
  }

  clearRememberedCredentials() {
    try {
      localStorage.removeItem('lotus_remembered_login');
    } catch (e) {}
  }

  logoutTeacher() {
    sessionStorage.removeItem('lotus_active_teacher');
    localStorage.removeItem('lotus_active_teacher');
  }

  authenticateTeacher(emailOrName, password, rememberMe = false) {
    const teachers = this.getTeachers();
    const cleanInput = (emailOrName || '').trim().toLowerCase();

    const found = teachers.find(t =>
      (
        (t.email && t.email.toLowerCase() === cleanInput) ||
        (t.username && t.username.toLowerCase() === cleanInput) ||
        (t.name && t.name.toLowerCase() === cleanInput)
      ) &&
      t.password === password
    );

    if (found) {
      this.setCurrentTeacher(found, Boolean(rememberMe));
      if (rememberMe) {
        this.saveRememberedCredentials(found.username || emailOrName.trim(), password);
      } else {
        this.clearRememberedCredentials();
      }
      return { success: true, teacher: found };
    }
    const errMsg = window.LotusI18n
      ? window.LotusI18n.t('login.errWrong')
      : 'Email/Name or password is incorrect! (Demo password: demo)';
    return { success: false, message: errMsg };
  }

  async authenticateTeacherAsync(emailOrName, password, rememberMe = false) {
    let res = this.authenticateTeacher(emailOrName, password, rememberMe);
    if (!res.success && this.hasSupabase()) {
      try {
        await this.syncTeachersFromCloud();
        res = this.authenticateTeacher(emailOrName, password, rememberMe);
      } catch (e) {}
    }
    return res;
  }

  async registerTeacher({ name, username, email, password, subject, school }, rememberMe = true) {
    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = password || '';
    let cleanUsername = (username || cleanEmail.split('@')[0]).trim().toLowerCase().replace(/[^a-z0-9_.-]/g, '');
    if (!cleanUsername) {
      cleanUsername = 'guru_' + Math.floor(1000 + Math.random() * 9000);
    }

    if (!cleanName || !cleanEmail || !cleanPass) {
      return {
        success: false,
        message: window.LotusI18n ? window.LotusI18n.t('login.errRegFields') : 'Please complete all required registration fields.'
      };
    }

    // Refresh teachers from Supabase if connected
    if (this.hasSupabase()) {
      try {
        await this.syncTeachersFromCloud();
      } catch (e) {}
    }

    const teachers = [...this.getTeachers()];
    if (teachers.some(t => t.email && t.email.toLowerCase() === cleanEmail)) {
      return {
        success: false,
        message: window.LotusI18n ? window.LotusI18n.t('login.errEmailExists') : 'A teacher account with this email already exists.'
      };
    }

    if (teachers.some(t => t.username && t.username.toLowerCase() === cleanUsername)) {
      return {
        success: false,
        message: (window.LotusI18n && window.LotusI18n.getLang() === 'id')
          ? 'Username tersebut sudah digunakan oleh guru lain. Silakan pilih username lain.'
          : 'This username is already taken. Please choose another username.'
      };
    }

    const newTeacher = {
      id: 't-' + Date.now(),
      name: cleanName,
      username: cleanUsername,
      email: cleanEmail,
      password: cleanPass,
      subject: (subject || 'General').trim(),
      school: (school || 'LotusWall Partner School').trim()
    };

    teachers.push(newTeacher);
    localStorage.setItem('lotus_teachers', JSON.stringify(teachers));
    this.setCurrentTeacher(newTeacher, Boolean(rememberMe));
    if (rememberMe) {
      this.saveRememberedCredentials(cleanUsername, cleanPass);
    }

    // Sync to Supabase Cloud
    if (this.hasSupabase()) {
      const sb = this.getSupabaseClient();
      if (sb) {
        try {
          await sb.from('teachers').upsert(newTeacher);
          try {
            await sb.auth.signUp({
              email: cleanEmail,
              password: cleanPass,
              options: {
                data: {
                  name: cleanName,
                  username: cleanUsername
                }
              }
            });
          } catch (_) {}
        } catch (err) {
          console.warn('LotusDB: Could not sync teacher to Supabase Cloud:', err);
        }
      }
    }

    return { success: true, teacher: newTeacher };
  }

  async findTeacherByEmail(email) {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail) return null;

    // Check Supabase first if available
    if (this.hasSupabase()) {
      const sb = this.getSupabaseClient();
      if (sb) {
        try {
          const { data, error } = await sb
            .from('teachers')
            .select('*')
            .ilike('email', cleanEmail)
            .maybeSingle();
          if (!error && data) {
            const teachers = this.getTeachers();
            const idx = teachers.findIndex(t => t.id === data.id || (t.email && t.email.toLowerCase() === cleanEmail));
            if (idx >= 0) {
              teachers[idx] = data;
            } else {
              teachers.push(data);
            }
            localStorage.setItem('lotus_teachers', JSON.stringify(teachers));
            return data;
          }
        } catch (e) {
          console.warn('LotusDB findTeacherByEmail Supabase error:', e);
        }
      }
    }

    // Fallback to local storage
    const teachers = this.getTeachers();
    return teachers.find(t => t.email && t.email.toLowerCase() === cleanEmail) || null;
  }

  async resetTeacherPassword(email, newPassword) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = String(newPassword || '').trim();
    if (!cleanEmail || !cleanPass) {
      return {
        success: false,
        message: (window.LotusI18n && window.LotusI18n.getLang() === 'id')
          ? 'Email dan kata sandi baru harus diisi.'
          : 'Email and new password are required.'
      };
    }
    if (cleanPass.length < 4) {
      return {
        success: false,
        message: (window.LotusI18n && window.LotusI18n.getLang() === 'id')
          ? 'Kata sandi baru minimal 4 karakter.'
          : 'Password must be at least 4 characters.'
      };
    }

    // Verify teacher exists
    const teacher = await this.findTeacherByEmail(cleanEmail);
    if (!teacher) {
      return {
        success: false,
        message: window.LotusI18n ? window.LotusI18n.t('forgot.userNotFound') : 'No account found with this email.'
      };
    }

    // Update in Supabase
    if (this.hasSupabase()) {
      const sb = this.getSupabaseClient();
      if (sb) {
        try {
          const { error } = await sb
            .from('teachers')
            .update({ password: cleanPass })
            .ilike('email', cleanEmail);
          if (error) console.warn('Supabase password update error:', error);
        } catch (err) {
          console.warn('Supabase password update exception:', err);
        }
      }
    }

    // Update in Local Storage
    const teachers = this.getTeachers();
    const idx = teachers.findIndex(t => t.email && t.email.toLowerCase() === cleanEmail);
    if (idx >= 0) {
      teachers[idx].password = cleanPass;
      localStorage.setItem('lotus_teachers', JSON.stringify(teachers));
    }

    // Update remembered credentials if matches
    const remembered = this.getRememberedCredentials();
    if (remembered && (remembered.identifier.toLowerCase() === cleanEmail || (teacher.username && remembered.identifier.toLowerCase() === teacher.username.toLowerCase()))) {
      this.saveRememberedCredentials(remembered.identifier, cleanPass);
    }

    return {
      success: true,
      teacher: { ...teacher, password: cleanPass },
      message: window.LotusI18n ? window.LotusI18n.t('forgot.resetSuccess') : 'Password updated successfully!'
    };
  }

  async sendPasswordResetEmail(email) {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail) {
      return {
        success: false,
        message: 'Email must be provided.'
      };
    }

    // Verify teacher exists first
    const teacher = await this.findTeacherByEmail(cleanEmail);
    if (!teacher) {
      return {
        success: false,
        message: window.LotusI18n ? window.LotusI18n.t('forgot.userNotFound') : 'No account found with this email.'
      };
    }

    if (!this.hasSupabase()) {
      return {
        success: false,
        message: (window.LotusI18n && window.LotusI18n.getLang() === 'id')
          ? 'Koneksi Supabase Cloud belum aktif.'
          : 'Supabase Cloud connection is not active.'
      };
    }

    const sb = this.getSupabaseClient();
    try {
      const redirectUrl = window.location.origin + window.location.pathname;
      const { error } = await sb.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: redirectUrl
      });
      if (error) {
        return {
          success: false,
          message: error.message
        };
      }
      return {
        success: true,
        message: window.LotusI18n ? window.LotusI18n.t('forgot.linkSent') : 'Password reset link sent to your email!'
      };
    } catch (err) {
      return {
        success: false,
        message: err.message || 'Failed to send reset link.'
      };
    }
  }

  // --- PROJECTS (MY PROJECTS, RECYCLE BIN & COMMUNITY) ---
  getAllProjects() {
    try {
      const list = JSON.parse(localStorage.getItem('lotus_projects') || '[]') || [];
      return Array.isArray(list) ? list.map(p => this.normalizeProjectMeta(p)) : [];
    } catch (e) {
      return [];
    }
  }

  saveAllProjects(projects) {
    localStorage.setItem('lotus_projects', JSON.stringify(projects));
  }

  getTeacherActiveProjects(teacherId) {
    return this.getAllProjects().filter(p => p.teacher_id === teacherId && !p.is_deleted);
  }

  getTeacherRecycleBin(teacherId) {
    return this.getAllProjects().filter(p => p.teacher_id === teacherId && p.is_deleted);
  }

  getProjectById(id) {
    return this.getAllProjects().find(p => p.id === id) || null;
  }

  findProjectByPin(pinOrId) {
    const target = String(pinOrId || '').trim().toLowerCase();
    if (!target) return null;
    return this.getAllProjects().find(p =>
      !p.is_deleted &&
      (String(p.pin || '').toLowerCase() === target || String(p.id || '').toLowerCase() === target)
    ) || null;
  }

  getCommunityProjects(filters = {}) {
    const { level = 'all', subject = 'all', language = 'all', search = '' } = filters || {};
    const q = (search || '').trim().toLowerCase();
    const teachersMap = new Map(this.getTeachers().map(t => [t.id, t]));

    return this.getAllProjects()
      .filter(p => !p.is_deleted && p.is_public !== false)
      .map(p => {
        const owner = teachersMap.get(p.teacher_id);
        return {
          ...p,
          teacher_name: owner ? owner.name : 'LotusWall Teacher',
          teacher_school: owner ? owner.school : ''
        };
      })
      .filter(p => {
        if (level && level !== 'all' && (p.level || 'SD') !== level) return false;
        if (subject && subject !== 'all' && (p.subject || '') !== subject) return false;
        if (language && language !== 'all' && (p.language || 'id') !== language) return false;
        if (q) {
          const hay = `${p.title} ${p.subject} ${p.teacher_name} ${p.level} ${p.template_type}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
  }

  saveProject(projectData) {
    const all = this.getAllProjects();
    const existingIdx = all.findIndex(p => p.id === projectData.id);
    const now = new Date().toISOString();

    if (existingIdx >= 0) {
      all[existingIdx] = this.normalizeProjectMeta({
        ...all[existingIdx],
        ...projectData,
        updated_at: now
      });
    } else {
      const newProject = this.normalizeProjectMeta({
        ...projectData,
        id: projectData.id || ('proj-' + Date.now()),
        pin: projectData.pin || this.generatePin(),
        is_deleted: false,
        created_at: now,
        updated_at: now
      });
      all.unshift(newProject);
    }

    this.saveAllProjects(all);
    this.syncProjectToCloud(existingIdx >= 0 ? all[existingIdx] : all[0]);
    return projectData;
  }

  renameProject(projectId, newTitle) {
    const all = this.getAllProjects();
    const proj = all.find(p => p.id === projectId);
    if (proj && newTitle && newTitle.trim()) {
      proj.title = newTitle.trim();
      proj.updated_at = new Date().toISOString();
      this.saveAllProjects(all);
      this.syncProjectToCloud(proj);
      return true;
    }
    return false;
  }

  duplicateProject(projectId, targetTeacherId = null) {
    const all = this.getAllProjects();
    const source = all.find(p => p.id === projectId);
    if (!source) return null;

    const suffix = window.LotusI18n ? window.LotusI18n.t('db.copySuffix') : '(Copy)';
    const clone = JSON.parse(JSON.stringify(source));
    clone.id = 'proj-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    clone.pin = this.generatePin();
    if (targetTeacherId) clone.teacher_id = targetTeacherId;
    clone.title = `${source.title} ${suffix}`;
    clone.created_at = new Date().toISOString();
    clone.updated_at = new Date().toISOString();
    clone.is_deleted = false;
    clone.deleted_at = null;

    all.unshift(clone);
    this.saveAllProjects(all);
    return clone;
  }

  duplicateToTeacher(projectId, teacherId) {
    return this.duplicateProject(projectId, teacherId);
  }

  moveToRecycleBin(projectId) {
    const all = this.getAllProjects();
    const proj = all.find(p => p.id === projectId);
    if (proj) {
      proj.is_deleted = true;
      proj.deleted_at = new Date().toISOString();
      this.saveAllProjects(all);
      this.syncProjectToCloud(proj);
      return true;
    }
    return false;
  }

  restoreProject(projectId) {
    const all = this.getAllProjects();
    const proj = all.find(p => p.id === projectId);
    if (proj) {
      proj.is_deleted = false;
      proj.deleted_at = null;
      proj.updated_at = new Date().toISOString();
      this.saveAllProjects(all);
      this.syncProjectToCloud(proj);
      return true;
    }
    return false;
  }

  permanentDeleteProject(projectId) {
    const all = this.getAllProjects().filter(p => p.id !== projectId);
    this.saveAllProjects(all);
    return true;
  }

  emptyRecycleBin(teacherId) {
    const all = this.getAllProjects().filter(p => !(p.teacher_id === teacherId && p.is_deleted));
    this.saveAllProjects(all);
    return true;
  }

  // --- MEDIA STORAGE ---
  async saveMedia(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target.result;
        const mediaId = 'media-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6);
        if (this.db) {
          try {
            const tx = this.db.transaction('media_assets', 'readwrite');
            tx.objectStore('media_assets').put({ id: mediaId, name: file.name, type: file.type, data: dataUrl });
          } catch (err) {}
        }
        resolve(dataUrl);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  // --- PROJECT JSON EXPORT / IMPORT (PORTABLE LOCAL <-> GITHUB SYNC) ---
  exportProjectsBundle(teacherId = null, includeRecycle = false) {
    const all = this.getAllProjects();
    const filtered = all.filter(p => {
      if (teacherId && p.teacher_id !== teacherId) return false;
      if (!includeRecycle && p.is_deleted) return false;
      return true;
    });
    return {
      lotus_export_version: 1,
      exported_at: new Date().toISOString(),
      teacher_id: teacherId || null,
      projects: filtered.map(p => this.normalizeProjectMeta(p))
    };
  }

  downloadProjectsJson(teacherId = null) {
    const bundle = this.exportProjectsBundle(teacherId, false);
    if (!bundle.projects || bundle.projects.length === 0) {
      return { count: 0 };
    }
    const teacher = teacherId ? this.getTeacherById(teacherId) : null;
    const slug = (teacher && teacher.name ? teacher.name : 'all-teachers')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'projects';
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lotuswall-projects-${slug}-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return { count: bundle.projects.length };
  }

  importProjectsJson(jsonInput, targetTeacherId = null) {
    let parsed;
    try {
      parsed = typeof jsonInput === 'string' ? JSON.parse(jsonInput) : jsonInput;
    } catch (e) {
      throw new Error('INVALID_JSON');
    }

    let incoming = [];
    if (Array.isArray(parsed)) {
      incoming = parsed;
    } else if (parsed && Array.isArray(parsed.projects)) {
      incoming = parsed.projects;
    } else if (parsed && typeof parsed === 'object' && parsed.title && Array.isArray(parsed.questions)) {
      incoming = [parsed];
    } else {
      throw new Error('INVALID_BUNDLE');
    }

    const validItems = incoming.filter(p => p && typeof p === 'object' && (p.title || Array.isArray(p.questions)));
    if (validItems.length === 0) {
      throw new Error('EMPTY_BUNDLE');
    }

    const all = this.getAllProjects();
    const now = new Date().toISOString();
    let added = 0;
    let updated = 0;

    validItems.forEach((rawProj, idx) => {
      const ownerId = targetTeacherId || rawProj.teacher_id || 't-1';
      const clone = JSON.parse(JSON.stringify(rawProj));
      clone.teacher_id = ownerId;
      clone.is_deleted = false;
      clone.deleted_at = null;
      clone.updated_at = now;
      if (!clone.created_at) clone.created_at = now;
      if (!clone.title || !String(clone.title).trim()) clone.title = `Imported Project ${idx + 1}`;
      if (!Array.isArray(clone.questions)) clone.questions = [];

      const existingIdx = clone.id ? all.findIndex(p => p.id === clone.id) : -1;
      if (existingIdx >= 0) {
        if (all[existingIdx].teacher_id === ownerId) {
          all[existingIdx] = this.normalizeProjectMeta({ ...all[existingIdx], ...clone, updated_at: now });
          updated++;
        } else {
          clone.id = 'proj-' + Date.now() + '-' + idx + '-' + Math.floor(Math.random() * 1000);
          clone.pin = this.generatePin();
          all.unshift(this.normalizeProjectMeta(clone));
          added++;
        }
      } else {
        if (!clone.id) {
          clone.id = 'proj-' + Date.now() + '-' + idx + '-' + Math.floor(Math.random() * 1000);
        }
        const pinCollision = clone.pin && all.some(p => p.pin === clone.pin);
        if (!clone.pin || pinCollision) clone.pin = this.generatePin();
        all.unshift(this.normalizeProjectMeta(clone));
        added++;
      }
    });

    this.saveAllProjects(all);
    return { added, updated, total: added + updated };
  }

  // --- EXPORT TEACHERS TO CSV ---
  exportTeachersToExcel() {
    const teachers = this.getTeachers();
    let csv = 'ID,Name,Email,Password,Subject,School\n';
    teachers.forEach(t => {
      csv += `"${t.id}","${t.name}","${t.email}","${t.password}","${t.subject}","${t.school}"\n`;
    });

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'LotusWall_Teachers_Directory.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // --- LEADERBOARD & RESULTS ---
  getLeaderboard(activityId) {
    try {
      const key = `results_${activityId}`;
      const data = JSON.parse(localStorage.getItem(key) || '[]');
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  }

  deleteLeaderboardEntry(activityId, entryId) {
    try {
      const key = `results_${activityId}`;
      let data = JSON.parse(localStorage.getItem(key) || '[]');
      data = data.filter(item => item.id !== entryId);
      localStorage.setItem(key, JSON.stringify(data));
      return data;
    } catch (e) {
      return [];
    }
  }

  clearLeaderboard(activityId) {
    try {
      localStorage.removeItem(`results_${activityId}`);
      return [];
    } catch (e) {
      return [];
    }
  }

  // --- SUPABASE CLOUD SYNC ENGINE ---
  getSupabaseConfig() {
    let url = '';
    let key = '';
    if (typeof window !== 'undefined' && window.LOTUS_SUPABASE_CONFIG && window.LOTUS_SUPABASE_CONFIG.url) {
      url = String(window.LOTUS_SUPABASE_CONFIG.url || '').trim();
      key = String(window.LOTUS_SUPABASE_CONFIG.publishableKey || window.LOTUS_SUPABASE_CONFIG.key || '').trim();
    }
    if (!url || !key) {
      try {
        const raw = localStorage.getItem('supabase_config');
        if (raw) {
          const parsed = JSON.parse(raw);
          url = url || String(parsed.url || '').trim();
          key = key || String(parsed.key || '').trim();
        }
      } catch (e) {}
    }
    return { url, key };
  }

  setSupabaseConfig(url, key) {
    if (!url || !key) {
      localStorage.removeItem('supabase_config');
    } else {
      localStorage.setItem('supabase_config', JSON.stringify({ url: url.trim(), key: key.trim() }));
    }
    this._supabaseClient = null;
    this._supabaseClientUrl = null;
    this._supabaseClientKey = null;
  }

  hasSupabase() {
    const cfg = this.getSupabaseConfig();
    return Boolean(cfg.url && cfg.key);
  }

  getSupabaseClient() {
    const cfg = this.getSupabaseConfig();
    if (!cfg.url || !cfg.key) {
      this._supabaseClient = null;
      return null;
    }
    if (this._supabaseClient && this._supabaseClientUrl === cfg.url && this._supabaseClientKey === cfg.key) {
      return this._supabaseClient;
    }
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      try {
        this._supabaseClient = window.supabase.createClient(cfg.url, cfg.key);
        this._supabaseClientUrl = cfg.url;
        this._supabaseClientKey = cfg.key;
        return this._supabaseClient;
      } catch (e) {
        console.warn('LotusDB Supabase initialization error:', e);
      }
    }
    return null;
  }

  async syncProjectToCloud(project) {
    const sb = this.getSupabaseClient();
    if (!sb || !project) return;
    try {
      const payload = {
        id: project.id,
        pin: String(project.pin || this.generatePin()),
        teacher_id: project.teacher_id || 't-demo',
        title: project.title || 'Untitled Project',
        subject: project.subject || 'IPA / Sains',
        level: project.level || 'SD',
        language: project.language || 'id',
        template_type: project.template_type || 'quiz',
        theme: project.theme || 'white',
        rules: project.rules || {},
        questions: project.questions || [],
        is_public: project.is_public !== false,
        is_deleted: Boolean(project.is_deleted),
        deleted_at: project.deleted_at || null,
        updated_at: project.updated_at || new Date().toISOString(),
        created_at: project.created_at || new Date().toISOString()
      };
      await sb.from('projects').upsert(payload, { onConflict: 'id' });
    } catch (e) {
      console.warn('LotusDB: Could not sync project to Supabase:', e);
    }
  }

  async syncProjectsFromCloud() {
    const sb = this.getSupabaseClient();
    if (!sb) return null;
    try {
      const { data, error } = await sb.from('projects').select('*').order('updated_at', { ascending: false });
      if (!error && Array.isArray(data)) {
        // PURE SUPABASE CLOUD MODE: Supabase is the SINGLE SOURCE OF TRUTH!
        // Directly overwrite local cache with Supabase projects (no merging with stale local projects)
        const cloudProjects = data.map(cp => this.normalizeProjectMeta(cp));
        this.saveAllProjects(cloudProjects);
        return cloudProjects;
      }
    } catch (e) {
      console.warn('LotusDB: Could not fetch projects from Supabase:', e);
    }
    return null;
  }

  async syncTeachersFromCloud() {
    const sb = this.getSupabaseClient();
    if (!sb) return null;
    try {
      const { data, error } = await sb.from('teachers').select('*');
      if (!error && Array.isArray(data) && data.length > 0) {
        localStorage.setItem('lotus_teachers', JSON.stringify(data));
        return data;
      }
    } catch (e) {
      console.warn('LotusDB: Could not fetch teachers from Supabase:', e);
    }
    return null;
  }

  async syncDeleteFromCloud(projectId) {
    const sb = this.getSupabaseClient();
    if (!sb || !projectId) return;
    try {
      await sb.from('projects').delete().eq('id', projectId);
    } catch (e) {
      console.warn('LotusDB: Could not delete project from Supabase:', e);
    }
  }
}

window.LotusDB = new LocalDatabase();
