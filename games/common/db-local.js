/**
 * db-local.js: LotusWall Local Database Engine (localStorage + IndexedDB)
 * Stores teacher accounts, remember-password preference, curriculum-tagged activities
 * (Standard & AI Camera templates, TK-SMK levels, multi-language), media blobs, & leaderboards.
 */

const LOTUS_SEED_VERSION = '2026.11';

const DEFAULT_TEACHERS = [
  { id: 't-1', name: 'Budi Prasetyo, S.Pd.', email: 'budi.prasetyo@sekolah.sch.id', password: '1qaz2wsx', subject: 'IPA / Sains', school: 'SMP Negeri 1 Bunga Bangsa' },
  { id: 't-2', name: 'Siti Rahmawati, M.Pd.', email: 'siti.rahmawati@sekolah.sch.id', password: '1qaz2wsx', subject: 'Matematika', school: 'SMP Negeri 1 Bunga Bangsa' },
  { id: 't-3', name: 'Agus Setiawan, S.Si.', email: 'agus.setiawan@sekolah.sch.id', password: '1qaz2wsx', subject: 'Fisika / Kimia', school: 'SMA Bintang Cemerlang' },
  { id: 't-4', name: 'Dewi Lestari, S.Pd.', email: 'dewi.lestari@sekolah.sch.id', password: '1qaz2wsx', subject: 'Bahasa Indonesia', school: 'SD Pertiwi 01' },
  { id: 't-5', name: 'Hendra Wijaya, B.Ed.', email: 'hendra.wijaya@sekolah.sch.id', password: '1qaz2wsx', subject: 'Bahasa Inggris', school: 'SMP Harapan Nusantara' },
  { id: 't-6', name: 'Rina Marlina, S.Pd.', email: 'rina.marlina@sekolah.sch.id', password: '1qaz2wsx', subject: 'Biologi', school: 'SMA Cendekia Bangsa' },
  { id: 't-7', name: 'Ahmad Fauzi, S.Ag.', email: 'ahmad.fauzi@sekolah.sch.id', password: '1qaz2wsx', subject: 'Pendidikan Agama', school: 'SMP Al-Hikmah' },
  { id: 't-8', name: 'Nurul Hidayah, S.Pd.', email: 'nurul.hidayah@sekolah.sch.id', password: '1qaz2wsx', subject: 'IPS / Geografi', school: 'SMP Negeri 2 Merdeka' },
  { id: 't-9', name: 'Fajar Nugroho, S.Kom.', email: 'fajar.nugroho@sekolah.sch.id', password: '1qaz2wsx', subject: 'Informatika / TIK', school: 'SMK Bintang Juara' },
  { id: 't-10', name: 'Sri Wahyuni, S.Pd.', email: 'sri.wahyuni@sekolah.sch.id', password: '1qaz2wsx', subject: 'Seni & Budaya', school: 'SD Mandiri Jaya' }
];

const _NOW = new Date().toISOString();

const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    pin: '100101',
    teacher_id: 't-1',
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
          { text: 'Mars', isCorrect: true, image: '' },
          { text: 'Venus', isCorrect: false, image: '' },
          { text: 'Jupiter', isCorrect: false, image: '' },
          { text: 'Mercury', isCorrect: false, image: '' }
        ]
      },
      {
        id: 'q2',
        text: 'What star provides the light and gravitational center of our solar system?',
        image: 'https://images.unsplash.com/photo-1532703108390-d45a8888c7f9?w=600&auto=format&fit=crop&q=80',
        audio: '',
        category: 'Star',
        options: [
          { text: 'The Sun', isCorrect: true, image: '' },
          { text: 'Polaris', isCorrect: false, image: '' },
          { text: 'The Moon', isCorrect: false, image: '' }
        ]
      },
      {
        id: 'q3',
        text: 'Which of these are Gas Giant planets? (Select all that apply)',
        image: '',
        audio: '',
        category: 'Gas Giant',
        options: [
          { text: 'Jupiter', isCorrect: true, image: '' },
          { text: 'Saturn', isCorrect: true, image: '' },
          { text: 'Earth', isCorrect: false, image: '' },
          { text: 'Mars', isCorrect: false, image: '' }
        ]
      }
    ]
  },
  {
    id: 'proj-2',
    pin: '100102',
    teacher_id: 't-1',
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
          { text: 'Gajah', isCorrect: false }
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
        text: 'Zat hijau daun yang membantu tumbuhan membuat makanan disebut...',
        category: 'Botani',
        options: [
          { text: 'Klorofil', isCorrect: true },
          { text: 'Oksigen', isCorrect: false },
          { text: 'Glukosa', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'proj-3',
    pin: '100103',
    teacher_id: 't-2',
    title: 'Kuis Matematika SMP: Bilangan, Aljabar & Geometri',
    subject: 'Matematika',
    level: 'SMP',
    language: 'id',
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
        id: 'q-math-1',
        text: 'Hasil dari -18 + 25 - (-7) adalah...',
        category: 'Bilangan',
        options: [
          { text: '14', isCorrect: true },
          { text: '-14', isCorrect: false },
          { text: '0', isCorrect: false },
          { text: '10', isCorrect: false }
        ]
      },
      {
        id: 'q-math-2',
        text: 'Nilai dari 36 ÷ (-4) × 5 adalah...',
        category: 'Bilangan',
        options: [
          { text: '-45', isCorrect: true },
          { text: '45', isCorrect: false },
          { text: '-35', isCorrect: false },
          { text: '25', isCorrect: false }
        ]
      },
      {
        id: 'q-math-3',
        text: 'Jika 3x - 5 = 16, berapakah nilai x?',
        category: 'Aljabar',
        options: [
          { text: '7', isCorrect: true },
          { text: '5', isCorrect: false },
          { text: '6', isCorrect: false },
          { text: '9', isCorrect: false }
        ]
      },
      {
        id: 'q-math-4',
        text: 'Luas segitiga dengan alas 12 cm dan tinggi 9 cm adalah...',
        category: 'Geometri',
        options: [
          { text: '54 cm²', isCorrect: true },
          { text: '108 cm²', isCorrect: false },
          { text: '42 cm²', isCorrect: false },
          { text: '21 cm²', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'proj-4',
    pin: '100104',
    teacher_id: 't-10',
    title: 'Kindergarten Colors, Shapes & Friendly Animals',
    subject: 'Seni & Budaya',
    level: 'TK',
    language: 'en',
    template_type: 'truefalse',
    theme: 'white',
    is_public: true,
    rules: { hasLives: true, livesCount: 3, timeMode: 'none', timerSeconds: 0, shuffleQuestions: true, shuffleAnswers: true },
    is_deleted: false,
    deleted_at: null,
    updated_at: _NOW,
    created_at: _NOW,
    questions: [
      {
        id: 'q-tk-1',
        text: 'Mixing red and yellow paint creates bright orange.',
        category: 'Colors',
        options: [
          { text: 'True', isCorrect: true },
          { text: 'False', isCorrect: false }
        ]
      },
      {
        id: 'q-tk-2',
        text: 'A triangle always has four equal sides.',
        category: 'Shapes',
        options: [
          { text: 'False', isCorrect: true },
          { text: 'True', isCorrect: false }
        ]
      },
      {
        id: 'q-tk-3',
        text: 'Bananas and sunflowers share a sunny yellow color.',
        category: 'Colors',
        options: [
          { text: 'True', isCorrect: true },
          { text: 'False', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'proj-5',
    pin: '100105',
    teacher_id: 't-5',
    title: 'English Grammar & Everyday Phrasal Verbs',
    subject: 'Bahasa Inggris',
    level: 'SMP',
    language: 'en',
    template_type: 'quiz-powerup',
    theme: 'white',
    is_public: true,
    rules: { hasLives: true, livesCount: 3, timeMode: 'timer', timerSeconds: 25, shuffleQuestions: true, shuffleAnswers: true },
    is_deleted: false,
    deleted_at: null,
    updated_at: _NOW,
    created_at: _NOW,
    questions: [
      {
        id: 'q-en-1',
        text: 'She ____ to the science museum every Sunday morning.',
        category: 'Present Simple',
        options: [
          { text: 'goes', isCorrect: true },
          { text: 'go', isCorrect: false },
          { text: 'going', isCorrect: false },
          { text: 'gone', isCorrect: false }
        ]
      },
      {
        id: 'q-en-2',
        text: 'Please "turn off" the projector before leaving. What does "turn off" mean?',
        category: 'Phrasal Verbs',
        options: [
          { text: 'Switch off / power down', isCorrect: true },
          { text: 'Make louder', isCorrect: false },
          { text: 'Carry outside', isCorrect: false },
          { text: 'Paint blue', isCorrect: false }
        ]
      },
      {
        id: 'q-en-3',
        text: 'Choose the correct past tense form: Yesterday we ____ our robotics project.',
        category: 'Past Tense',
        options: [
          { text: 'finished', isCorrect: true },
          { text: 'finish', isCorrect: false },
          { text: 'finishing', isCorrect: false },
          { text: 'finishes', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'proj-6',
    pin: '100106',
    teacher_id: 't-9',
    title: 'SMK Web & Networking Fundamentals',
    subject: 'Informatika / TIK',
    level: 'SMK',
    language: 'en',
    template_type: 'wordsearch',
    theme: 'white',
    is_public: true,
    rules: { hasLives: false, livesCount: 0, timeMode: 'stopwatch', timerSeconds: 0, shuffleQuestions: true, shuffleAnswers: true },
    is_deleted: false,
    deleted_at: null,
    updated_at: _NOW,
    created_at: _NOW,
    questions: [
      {
        id: 'q-it-1',
        text: 'Primary style language used for web layout and responsive design',
        word: 'STYLESHEET',
        correctAnswer: 'STYLESHEET',
        wrongAnswers: ['COMPILER', 'KERNEL', 'MODEM'],
        options: [{ text: 'STYLESHEET', isCorrect: true }, { text: 'COMPILER', isCorrect: false }, { text: 'KERNEL', isCorrect: false }]
      },
      {
        id: 'q-it-2',
        text: 'Device forwarding packets across computer networks',
        word: 'ROUTER',
        correctAnswer: 'ROUTER',
        wrongAnswers: ['PRINTER', 'SCANNER', 'PIXEL'],
        options: [{ text: 'ROUTER', isCorrect: true }, { text: 'PRINTER', isCorrect: false }, { text: 'SCANNER', isCorrect: false }]
      },
      {
        id: 'q-it-3',
        text: 'Core markup language used to structure web pages',
        word: 'HTML',
        correctAnswer: 'HTML',
        wrongAnswers: ['BIOS', 'SATA', 'BASH'],
        options: [{ text: 'HTML', isCorrect: true }, { text: 'BIOS', isCorrect: false }, { text: 'SATA', isCorrect: false }]
      },
      {
        id: 'q-it-4',
        text: 'Server system holding structured tables and records',
        word: 'DATABASE',
        correctAnswer: 'DATABASE',
        wrongAnswers: ['MONITOR', 'CURSOR', 'CABLE'],
        options: [{ text: 'DATABASE', isCorrect: true }, { text: 'MONITOR', isCorrect: false }, { text: 'CURSOR', isCorrect: false }]
      }
    ]
  },
  {
    id: 'proj-7',
    pin: '100107',
    teacher_id: 't-3',
    title: 'SMA Fisika & Reaksi Kimia: Cepat Tangkap AI',
    subject: 'Fisika / Kimia',
    level: 'SMA',
    language: 'id',
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
        id: 'q-fk-1',
        text: 'Satuan Internasional (SI) untuk Gaya menurut Hukum Newton adalah...',
        category: 'Mekanika',
        options: [
          { text: 'Newton (N)', isCorrect: true },
          { text: 'Joule (J)', isCorrect: false },
          { text: 'Watt (W)', isCorrect: false },
          { text: 'Pascal (Pa)', isCorrect: false }
        ]
      },
      {
        id: 'q-fk-2',
        text: 'Lambang unsur kimia untuk Natrium (Sodium) adalah...',
        category: 'Tabel Periodik',
        options: [
          { text: 'Na', isCorrect: true },
          { text: 'N', isCorrect: false },
          { text: 'K', isCorrect: false },
          { text: 'Ni', isCorrect: false }
        ]
      },
      {
        id: 'q-fk-3',
        text: 'Hukum kekekalan energi menyatakan energi tidak dapat dimusnahkan melainkan hanya...',
        category: 'Energi',
        options: [
          { text: 'Berubah bentuk', isCorrect: true },
          { text: 'Hilang menjadi udara', isCorrect: false },
          { text: 'Membeku total', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'proj-8',
    pin: '100108',
    teacher_id: 't-6',
    title: 'AI Head Catcher 2P: Cellular Biology Duel',
    subject: 'Biologi',
    level: 'SMA',
    language: 'en',
    template_type: 'head-catcher',
    theme: 'white',
    is_public: true,
    rules: { hasLives: true, livesCount: 3, timeMode: 'timer', timerSeconds: 30, shuffleQuestions: true, shuffleAnswers: true },
    is_deleted: false,
    deleted_at: null,
    updated_at: _NOW,
    created_at: _NOW,
    questions: [
      {
        id: 'q-bio-1',
        text: 'Which organelle is known as the powerhouse of the cell?',
        category: 'Cell Structure',
        options: [
          { text: 'Mitochondria', isCorrect: true },
          { text: 'Ribosome', isCorrect: false },
          { text: 'Golgi Body', isCorrect: false }
        ]
      },
      {
        id: 'q-bio-2',
        text: 'Which pigment captures sunlight during photosynthesis in plants?',
        category: 'Botany',
        options: [
          { text: 'Chlorophyll', isCorrect: true },
          { text: 'Hemoglobin', isCorrect: false },
          { text: 'Melanin', isCorrect: false }
        ]
      },
      {
        id: 'q-bio-3',
        text: 'DNA stores genetic instructions inside which structure in eukaryotes?',
        category: 'Genetics',
        options: [
          { text: 'Nucleus', isCorrect: true },
          { text: 'Vacuole', isCorrect: false },
          { text: 'Cell Wall', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'proj-9',
    pin: '100109',
    teacher_id: 't-4',
    title: 'Mandarin Calligraphy: Dasar Goresan Hanzi HSK 1',
    subject: 'Bahasa Mandarin',
    level: 'SD',
    language: 'zh',
    template_type: 'hanzi-battle',
    theme: 'white',
    is_public: true,
    rules: { hasLives: false, livesCount: 0, timeMode: 'none', timerSeconds: 0, shuffleQuestions: true, shuffleAnswers: true },
    is_deleted: false,
    deleted_at: null,
    updated_at: _NOW,
    created_at: _NOW,
    questions: [
      {
        id: 'q-zh-1',
        text: '你 (nǐ) — You / Kamu',
        word: '你',
        pinyin: 'nǐ',
        meaning: 'you / kamu',
        correctAnswer: '你',
        options: [{ text: '你', isCorrect: true }, { text: '我', isCorrect: false }, { text: '好', isCorrect: false }]
      },
      {
        id: 'q-zh-2',
        text: '好 (hǎo) — Good / Baik',
        word: '好',
        pinyin: 'hǎo',
        meaning: 'good / baik',
        correctAnswer: '好',
        options: [{ text: '好', isCorrect: true }, { text: '大', isCorrect: false }, { text: '人', isCorrect: false }]
      },
      {
        id: 'q-zh-3',
        text: '我 (wǒ) — I / Me / Saya',
        word: '我',
        pinyin: 'wǒ',
        meaning: 'I / saya',
        correctAnswer: '我',
        options: [{ text: '我', isCorrect: true }, { text: '你', isCorrect: false }, { text: '山', isCorrect: false }]
      },
      {
        id: 'q-zh-4',
        text: '水 (shuǐ) — Water / Air',
        word: '水',
        pinyin: 'shuǐ',
        meaning: 'water / air',
        correctAnswer: '水',
        options: [{ text: '水', isCorrect: true }, { text: '火', isCorrect: false }, { text: '日', isCorrect: false }]
      },
      {
        id: 'q-zh-5',
        text: '山 (shān) — Mountain / Gunung',
        word: '山',
        pinyin: 'shān',
        meaning: 'mountain / gunung',
        correctAnswer: '山',
        options: [{ text: '山', isCorrect: true }, { text: '月', isCorrect: false }, { text: '木', isCorrect: false }]
      }
    ]
  },
  {
    id: 'proj-10',
    pin: '100110',
    teacher_id: 't-8',
    title: 'IPS Geografi: Pulau & Ibu Kota Provinsi Indonesia',
    subject: 'IPS / Geografi',
    level: 'SMP',
    language: 'id',
    template_type: 'groupsort',
    theme: 'white',
    is_public: true,
    rules: { hasLives: true, livesCount: 3, timeMode: 'stopwatch', timerSeconds: 0, shuffleQuestions: true, shuffleAnswers: true },
    is_deleted: false,
    deleted_at: null,
    updated_at: _NOW,
    created_at: _NOW,
    questions: [
      { id: 'q-ips-1', text: 'Medan', category: 'Sumatera', correctAnswer: 'Medan', options: [{ text: 'Medan', isCorrect: true }] },
      { id: 'q-ips-2', text: 'Palembang', category: 'Sumatera', correctAnswer: 'Palembang', options: [{ text: 'Palembang', isCorrect: true }] },
      { id: 'q-ips-3', text: 'Bandung', category: 'Jawa', correctAnswer: 'Bandung', options: [{ text: 'Bandung', isCorrect: true }] },
      { id: 'q-ips-4', text: 'Surabaya', category: 'Jawa', correctAnswer: 'Surabaya', options: [{ text: 'Surabaya', isCorrect: true }] },
      { id: 'q-ips-5', text: 'Makassar', category: 'Sulawesi', correctAnswer: 'Makassar', options: [{ text: 'Makassar', isCorrect: true }] },
      { id: 'q-ips-6', text: 'Manado', category: 'Sulawesi', correctAnswer: 'Manado', options: [{ text: 'Manado', isCorrect: true }] }
    ]
  },
  {
    id: 'proj-11',
    pin: '100111',
    teacher_id: 't-1',
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
        text: 'At standard pressure, water boils at what Celsius temperature?',
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
        text: 'How many legs does a butterfly or ant (insect) have?',
        category: 'Zoology',
        options: [
          { text: 'Six', isCorrect: true },
          { text: 'Eight', isCorrect: false },
          { text: 'Four', isCorrect: false }
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
    // 1. Teachers
    if (!localStorage.getItem('lotus_teachers')) {
      localStorage.setItem('lotus_teachers', JSON.stringify(DEFAULT_TEACHERS));
    }

    // 2. Projects & non-destructive seed migration
    const existingProjectsRaw = localStorage.getItem('lotus_projects');
    const savedSeedVersion = localStorage.getItem('lotus_seed_version');

    if (!existingProjectsRaw) {
      localStorage.setItem('lotus_projects', JSON.stringify(INITIAL_PROJECTS));
      localStorage.setItem('lotus_seeded_project_ids', JSON.stringify(INITIAL_PROJECTS.map(p => p.id)));
      localStorage.setItem('lotus_seed_version', LOTUS_SEED_VERSION);
    } else {
      try {
        let existingProjects = JSON.parse(existingProjectsRaw);
        if (Array.isArray(existingProjects)) {
          existingProjects = existingProjects.map(p => this.normalizeProjectMeta(p));

          let seededIds = [];
          try {
            const parsed = JSON.parse(localStorage.getItem('lotus_seeded_project_ids') || '[]');
            seededIds = Array.isArray(parsed) ? parsed : ['proj-1', 'proj-2', 'proj-3'];
          } catch (e) {
            seededIds = ['proj-1', 'proj-2', 'proj-3'];
          }

          const newDefaults = [];
          INITIAL_PROJECTS.forEach(proj => {
            if (!seededIds.includes(proj.id)) {
              if (!existingProjects.some(ep => ep.id === proj.id)) {
                newDefaults.push(proj);
              }
              seededIds.push(proj.id);
            }
          });

          if (newDefaults.length > 0 || savedSeedVersion !== LOTUS_SEED_VERSION) {
            const merged = [...existingProjects, ...newDefaults].map(p => this.normalizeProjectMeta(p));
            localStorage.setItem('lotus_projects', JSON.stringify(merged));
            localStorage.setItem('lotus_seeded_project_ids', JSON.stringify(seededIds));
            localStorage.setItem('lotus_seed_version', LOTUS_SEED_VERSION);
          }
        }
      } catch (e) {
        console.warn('Seed sync warning:', e);
      }
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
      (t.email.toLowerCase() === cleanInput || t.name.toLowerCase() === cleanInput) &&
      t.password === password
    );

    if (found) {
      this.setCurrentTeacher(found, Boolean(rememberMe));
      if (rememberMe) {
        this.saveRememberedCredentials(emailOrName.trim(), password);
      } else {
        this.clearRememberedCredentials();
      }
      return { success: true, teacher: found };
    }
    const errMsg = window.LotusI18n
      ? window.LotusI18n.t('login.errWrong')
      : 'Email/Name or password is incorrect! (Demo password: 1qaz2wsx)';
    return { success: false, message: errMsg };
  }

  registerTeacher({ name, email, password, subject, school }, rememberMe = true) {
    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = password || '';
    if (!cleanName || !cleanEmail || !cleanPass) {
      return {
        success: false,
        message: window.LotusI18n ? window.LotusI18n.t('login.errRegFields') : 'Please complete all required registration fields.'
      };
    }

    const teachers = [...this.getTeachers()];
    if (teachers.some(t => t.email.toLowerCase() === cleanEmail)) {
      return {
        success: false,
        message: window.LotusI18n ? window.LotusI18n.t('login.errEmailExists') : 'A teacher account with this email already exists.'
      };
    }

    const newTeacher = {
      id: 't-' + Date.now(),
      name: cleanName,
      email: cleanEmail,
      password: cleanPass,
      subject: (subject || 'General').trim(),
      school: (school || 'LotusWall Partner School').trim()
    };
    teachers.push(newTeacher);
    localStorage.setItem('lotus_teachers', JSON.stringify(teachers));
    this.setCurrentTeacher(newTeacher, Boolean(rememberMe));
    if (rememberMe) {
      this.saveRememberedCredentials(cleanEmail, cleanPass);
    }
    return { success: true, teacher: newTeacher };
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
    return projectData;
  }

  renameProject(projectId, newTitle) {
    const all = this.getAllProjects();
    const proj = all.find(p => p.id === projectId);
    if (proj && newTitle && newTitle.trim()) {
      proj.title = newTitle.trim();
      proj.updated_at = new Date().toISOString();
      this.saveAllProjects(all);
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
}

window.LotusDB = new LocalDatabase();
