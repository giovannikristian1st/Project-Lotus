/**
 * db-local.js: LotusWall Local Database Engine (localStorage + IndexedDB)
 * Stores teacher accounts, remember-password preference, curriculum-tagged activities
 * (Standard & AI Camera templates, TK-SMK levels, multi-language), media blobs, & leaderboards.
 */

const LOTUS_SEED_VERSION = '2026.11.23-classroom-agenda-v1';

const DEFAULT_TEACHERS = [
  {
    id: 't-demo',
    name: 'Guru Demo',
    username: 'demo',
    email: 'demo@tzuchi.sch.id',
    password: 'demo',
    subject: 'IPA & Umum',
    school: 'Sekolah Cinta Kasih Tzu Chi'
  },
  {
    id: 't-meihua',
    name: 'Guru Bahasa Mandarin',
    username: 'laoshi',
    email: 'laoshi@tzuchi.sch.id',
    password: 'demo',
    subject: 'Bahasa Mandarin',
    school: 'Sekolah Cinta Kasih Tzu Chi'
  }
];

const _NOW = new Date().toISOString();

const DEFAULT_STUDENTS = [
  {
    id: 'stu-demo-1',
    name: 'Kenjiro Tan',
    username: 'kenjiro',
    nisn: '50239101',
    email: 'kenjiro@cintakasih.sch.id',
    class: '5-A',
    className: '5-A',
    level: 'SD',
    password: 'demo',
    school: 'Sekolah Cinta Kasih Tzu Chi',
    classroom_ids: ['cls-5a', 'cls-meihua'],
    created_at: _NOW
  },
  {
    id: 'stu-demo-2',
    name: 'Mei Ling Wijaya',
    username: 'meiling',
    nisn: '50239102',
    email: 'meiling@cintakasih.sch.id',
    class: '5-A',
    className: '5-A',
    level: 'SD',
    password: 'demo',
    school: 'Sekolah Cinta Kasih Tzu Chi',
    classroom_ids: ['cls-5a', 'cls-meihua'],
    created_at: _NOW
  },
  {
    id: 'stu-demo-3',
    name: 'Budi Santoso',
    username: 'budi',
    nisn: '50239103',
    email: 'budi@cintakasih.sch.id',
    class: '4-B',
    className: '4-B',
    level: 'SD',
    password: 'demo',
    school: 'Sekolah Cinta Kasih Tzu Chi',
    classroom_ids: ['cls-meihua'],
    created_at: _NOW
  }
];

const DEFAULT_CLASSROOMS = [
  {
    id: 'cls-5a',
    teacher_id: 't-demo',
    teacher_name: 'Guru Demo',
    name: 'Kelas 5-A SD Tzu Chi',
    code: '502101',
    level: 'SD',
    subject: 'Wali Kelas & IPA',
    description: 'Ruang kelas utama 5-A Sekolah Dasar Cinta Kasih Tzu Chi.',
    created_at: _NOW,
    student_ids: ['stu-demo-1', 'stu-demo-2']
  },
  {
    id: 'cls-meihua',
    teacher_id: 't-meihua',
    teacher_name: 'Guru Bahasa Mandarin',
    name: 'Kelas Mandarin Meihua',
    code: '803102',
    level: 'SD',
    subject: 'Bahasa Mandarin',
    description: 'Kelas pembelajaran Bahasa Mandarin Meihua (Hanzi, Pinyin & Nada) SD Tzu Chi.',
    created_at: _NOW,
    student_ids: ['stu-demo-1', 'stu-demo-2', 'stu-demo-3']
  }
];

function getSampleDailyAgendas() {
  const now = new Date();
  const formatYMD = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const addDays = (d, days) => {
    const res = new Date(d);
    res.setDate(res.getDate() + days);
    return res;
  };

  const todayStr = formatYMD(now);
  const tomorrowStr = formatYMD(addDays(now, 1));
  const in2DaysStr = formatYMD(addDays(now, 2));
  const in3DaysStr = formatYMD(addDays(now, 3));

  return [
    {
      id: 'agenda-demo-5a',
      classroom_id: 'cls-5a',
      classroom_name: 'Kelas 5-A SD Tzu Chi',
      teacher_id: 't-demo',
      teacher_name: 'Guru Demo',
      date: todayStr,
      title: 'Agenda Pembelajaran Hari Ini — Kelas 5-A',
      created_at: _NOW,
      items: [
        {
          id: 'item-demo-seragam',
          type: 'pengumuman',
          category: 'seragam',
          title: 'Seragam Batik Tzu Chi & Botol Minum',
          command: 'Mengenakan seragam Batik Cinta Kasih Tzu Chi lengkap dan rapi.',
          explanation: 'Membawa botol minum pribadi (tumbler) dan perlengkapan doa pagi.',
          deadline: todayStr,
          file_url: null,
          file_name: null,
          file_size: null,
          external_link: null,
          project_id: null,
          assignment_id: null,
          target_type: 'all',
          target_student_ids: []
        },
        {
          id: 'item-demo-buku',
          type: 'materi',
          category: 'buku',
          title: 'Buku Tematik IPA: Bab Tata Surya & Ekosistem',
          command: 'Membawa buku paket IPA dan buku catatan sains.',
          explanation: 'Materi diskusi rotasi planet dan ekosistem bumi bersama kelompok.',
          deadline: todayStr,
          file_url: null,
          file_name: null,
          file_size: null,
          external_link: null,
          project_id: null,
          assignment_id: null,
          target_type: 'all',
          target_student_ids: []
        },
        {
          id: 'item-demo-tugas-ipa',
          type: 'tugas',
          category: 'tugas',
          title: 'Kuis Interaktif Tata Surya (Solar System)',
          command: 'Kerjakan Kuis Solar System di DaAi Learning Hub sebelum jam 20:00 WIB.',
          explanation: 'Latihan 10 soal seputar planet terestrial dan raksasa gas. Nilai tuntas minimal 75.',
          deadline: tomorrowStr,
          file_url: null,
          file_name: null,
          file_size: null,
          external_link: null,
          project_id: 'proj-1',
          assignment_id: 'asg-demo-1',
          target_type: 'all',
          target_student_ids: []
        },
        {
          id: 'item-demo-celengan',
          type: 'pengumuman',
          category: 'lainnya',
          title: 'Pengumpulan Celengan Bambu Tzu Chi',
          command: 'Membawa celengan bambu amal untuk penuangan celengan bersama di aula.',
          explanation: 'Penuangan koin celengan bambu sebagai wujud cinta kasih dan budi pekerti.',
          deadline: in3DaysStr,
          file_url: null,
          file_name: null,
          file_size: null,
          external_link: null,
          project_id: null,
          assignment_id: null,
          target_type: 'all',
          target_student_ids: []
        }
      ]
    },
    {
      id: 'agenda-demo-meihua',
      classroom_id: 'cls-meihua',
      classroom_name: 'Kelas Mandarin Meihua',
      teacher_id: 't-meihua',
      teacher_name: 'Guru Bahasa Mandarin',
      date: todayStr,
      title: 'Agenda Mandarin Meihua: Kosakata & Goresan Hanzi',
      created_at: _NOW,
      items: [
        {
          id: 'item-demo-materi-hanzi',
          type: 'materi',
          category: 'materi',
          title: 'Panduan Goresan Dasar & Radikal Hanzi (Bi Hua)',
          command: 'Buka Lab Goresan & Radikal Hanzi di DaAi Learning Hub untuk latihan Bi Hua.',
          explanation: 'Pelajari aturan urutan goresan: atas ke bawah, kiri ke kanan, horizontal sebelum vertikal.',
          deadline: in2DaysStr,
          file_url: null,
          file_name: null,
          file_size: null,
          external_link: 'https://docs.google.com/presentation/d/demo-mandarin',
          project_id: 'proj-meihua-1',
          assignment_id: null,
          target_type: 'all',
          target_student_ids: []
        },
        {
          id: 'item-demo-tugas-meihua',
          type: 'tugas',
          category: 'tugas',
          title: 'Latihan Menulis Hanzi & Tebas Buah Meihua',
          command: 'Mainkan game Tebas Buah / Kuis Mandarin Meihua Bab 1.',
          explanation: 'Kuis interaktif kosa kata Mandarin dasar dengan target skor 80.',
          deadline: in2DaysStr,
          file_url: null,
          file_name: null,
          file_size: null,
          external_link: null,
          project_id: 'proj-meihua-1',
          assignment_id: 'asg-demo-2',
          target_type: 'all',
          target_student_ids: []
        }
      ]
    }
  ];
}

const DEFAULT_ASSIGNMENTS = [
  {
    id: 'asg-demo-1',
    project_id: 'proj-1',
    teacher_id: 't-demo',
    title: 'Kuis Interaktif Tata Surya (Solar System)',
    template_type: 'quiz',
    rules: { hasLives: true, livesCount: 3, timeMode: 'timer', timerSeconds: 30, shuffleQuestions: true, shuffleAnswers: true },
    allow_multiple: true,
    show_answers: true,
    status: 'active',
    deadline: new Date(Date.now() + 86400000).toISOString().split('T')[0] + 'T23:59:00',
    classroom_ids: ['cls-5a'],
    target_student_ids: [],
    created_at: _NOW
  },
  {
    id: 'asg-demo-2',
    project_id: 'proj-meihua-1',
    teacher_id: 't-meihua',
    title: 'Latihan Menulis Hanzi & Tebas Buah Meihua',
    template_type: 'fruitninja',
    rules: { hasLives: true, livesCount: 3, timeMode: 'stopwatch', timerSeconds: 0, shuffleQuestions: true, shuffleAnswers: true },
    allow_multiple: true,
    show_answers: true,
    status: 'active',
    deadline: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0] + 'T23:59:00',
    classroom_ids: ['cls-meihua'],
    target_student_ids: [],
    created_at: _NOW
  }
];

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

const SKELETON_PROJECT = {
  id: 'proj-skeleton-3d',
  pin: '303030',
  teacher_id: 't-demo',
  title: 'Anatomi Rangka Tulang Manusia 3D (Human Skeleton 3D Anatomy)',
  subject: 'IPA / Sains',
  level: 'SD',
  language: 'id',
  template_type: 'quiz',
  content_format: 'quiz',
  theme: 'white',
  is_public: true,
  visibility: 'public',
  rules: { hasLives: true, livesCount: 3, timeMode: 'timer', timerSeconds: 30, shuffleQuestions: true, shuffleAnswers: true },
  is_deleted: false,
  deleted_at: null,
  updated_at: _NOW,
  created_at: _NOW,
  questions: [
    {
      id: 'sk-1',
      text: 'Bagian rangka kepala yang berfungsi melindungi organ otak manusia adalah...',
      category: 'Rangka Kepala',
      options: [
        { text: 'Tengkorak / Cranium (颅骨)', isCorrect: true },
        { text: 'Tulang Rusuk / Rib Cage (肋骨)', isCorrect: false },
        { text: 'Tulang Panggul / Pelvis (骨盆)', isCorrect: false },
        { text: 'Tulang Belakang / Vertebrae (脊柱)', isCorrect: false }
      ]
    },
    {
      id: 'sk-2',
      text: 'Tulang terpanjang dan terkuat pada tubuh manusia yang berada di bagian paha adalah...',
      category: 'Anggota Gerak Bawah',
      options: [
        { text: 'Tulang Paha / Femur (股骨)', isCorrect: true },
        { text: 'Tulang Kering / Tibia (胫骨)', isCorrect: false },
        { text: 'Tulang Hasta / Ulna (尺骨)', isCorrect: false },
        { text: 'Tulang Betis / Fibula (腓骨)', isCorrect: false }
      ]
    },
    {
      id: 'sk-3',
      text: 'Sangkar tulang yang berfungsi melindungi organ vital jantung dan paru-paru adalah...',
      category: 'Rangka Badan',
      options: [
        { text: 'Tulang Rusuk / Ribs (肋骨)', isCorrect: true },
        { text: 'Tulang Selangka / Clavicle (锁骨)', isCorrect: false },
        { text: 'Tulang Belikat / Scapula (肩胛骨)', isCorrect: false },
        { text: 'Tulang Panggul / Pelvis (骨盆)', isCorrect: false }
      ]
    },
    {
      id: 'sk-4',
      text: 'Susunan ruas tulang yang menopang postur tubuh tegak dan melindungi sumsum saraf adalah...',
      category: 'Rangka Badan',
      options: [
        { text: 'Tulang Belakang / Vertebrae (脊柱)', isCorrect: true },
        { text: 'Tulang Dada / Sternum (胸骨)', isCorrect: false },
        { text: 'Tulang Paha / Femur (股骨)', isCorrect: false },
        { text: 'Tempurung Lutut / Patella (髌骨)', isCorrect: false }
      ]
    },
    {
      id: 'sk-5',
      text: 'Tulang pelindung sendi lutut yang berbentuk bulat segitiga tebal (sesamoid) disebut...',
      category: 'Sendi & Lutut',
      options: [
        { text: 'Tempurung Lutut / Patella (髌骨)', isCorrect: true },
        { text: 'Tulang Kering / Tibia (胫骨)', isCorrect: false },
        { text: 'Tulang Betis / Fibula (腓骨)', isCorrect: false },
        { text: 'Tulang Paha / Femur (股骨)', isCorrect: false }
      ]
    },
    {
      id: 'sk-6',
      text: 'Satu-satunya tulang pada tengkorak kepala yang dapat digerakkan aktif saat mengunyah dan berbicara adalah...',
      category: 'Rangka Kepala',
      options: [
        { text: 'Rahang Bawah / Mandible (下颌骨)', isCorrect: true },
        { text: 'Rahang Atas / Maxilla (上颌骨)', isCorrect: false },
        { text: 'Tulang Dahi / Frontal (额骨)', isCorrect: false },
        { text: 'Tulang Pipi / Zygomatic (颧骨)', isCorrect: false }
      ]
    },
    {
      id: 'sk-7',
      text: 'Tulang berbentuk kurva ganda yang menghubungkan bahu depan dengan tulang dada atas adalah...',
      category: 'Gelang Bahu',
      options: [
        { text: 'Tulang Selangka / Clavicle (锁骨)', isCorrect: true },
        { text: 'Tulang Belikat / Scapula (肩胛骨)', isCorrect: false },
        { text: 'Tulang Lengan Atas / Humerus (肱骨)', isCorrect: false },
        { text: 'Tulang Rusuk / Ribs (肋骨)', isCorrect: false }
      ]
    },
    {
      id: 'sk-8',
      text: 'Tulang pipa panjang yang menyusun lengan atas antara sendi bahu dan siku adalah...',
      category: 'Anggota Gerak Atas',
      options: [
        { text: 'Tulang Lengan Atas / Humerus (肱骨)', isCorrect: true },
        { text: 'Tulang Pengumpil / Radius (桡骨)', isCorrect: false },
        { text: 'Tulang Hasta / Ulna (尺骨)', isCorrect: false },
        { text: 'Tulang Selangka / Clavicle (锁骨)', isCorrect: false }
      ]
    },
    {
      id: 'sk-9',
      text: 'Struktur gelang panggul yang menyangga berat organ perut dan menghubungkan badan dengan tungkai adalah...',
      category: 'Gelang Panggul',
      options: [
        { text: 'Tulang Panggul / Pelvis (骨盆)', isCorrect: true },
        { text: 'Tulang Kelangkang / Sacrum (骶骨)', isCorrect: false },
        { text: 'Tulang Dada / Sternum (胸骨)', isCorrect: false },
        { text: 'Tulang Ekor / Coccyx (尾骨)', isCorrect: false }
      ]
    },
    {
      id: 'sk-10',
      text: 'Pada tungkai bawah bagian depan yang berukuran lebih besar dan menopang beban berat badan adalah...',
      category: 'Anggota Gerak Bawah',
      options: [
        { text: 'Tulang Kering / Tibia (胫骨)', isCorrect: true },
        { text: 'Tulang Betis / Fibula (腓骨)', isCorrect: false },
        { text: 'Tulang Paha / Femur (股骨)', isCorrect: false },
        { text: 'Tempurung Lutut / Patella (髌骨)', isCorrect: false }
      ]
    }
  ]
};

function generateMeihuaPresets() {
  const db = (typeof _meihuaDB !== 'undefined' && _meihuaDB) ? _meihuaDB : ((typeof window !== 'undefined' && window._meihuaDB) ? window._meihuaDB : ((typeof global !== 'undefined' && global._meihuaDB) ? global._meihuaDB : null));
  if (!db) return [];
  const projects = [];
  const templates = ['quiz', 'matchup', 'wordmatch', 'flashcards', 'whackamole', 'fliptile', 'tug', 'hanzi-battle', 'wheel', 'fruitninja'];
  
  for (let b = 1; b <= 6; b++) {
    const bookKey = 'meihua' + b;
    const book = db[bookKey];
    if (!book) continue;
    
    const allBookVocab = [];
    for (let u = 1; u <= 10; u++) {
      const uKey = 'unit' + u;
      if (book[uKey] && Array.isArray(book[uKey].vocab)) {
        allBookVocab.push(...book[uKey].vocab);
      }
    }

    for (let u = 1; u <= 10; u++) {
      const uKey = 'unit' + u;
      const unit = book[uKey];
      if (!unit) continue;
      
      const pin = '2' + String(b).padStart(2, '0') + String(u).padStart(3, '0');
      const tpl = templates[(b + u) % templates.length];
      const questions = [];
      const vocabs = unit.vocab || [];

      vocabs.forEach((v, idx) => {
        const otherVocabs = allBookVocab.filter(item => item.char !== v.char);
        const shuffled = otherVocabs.sort(() => 0.5 - Math.random()).slice(0, 3);
        const englishMeaning = (v.en || v.id || '').trim();
        const hanziWithPinyin = v.char + (v.pinyin ? ' [' + v.pinyin + ']' : '');
        
        const options = [
          { text: hanziWithPinyin, isCorrect: true }
        ];
        shuffled.forEach(s => {
          const sText = s.char + (s.pinyin ? ' [' + s.pinyin + ']' : '');
          options.push({ text: sText, isCorrect: false });
        });
        options.sort(() => 0.5 - Math.random());
        
        questions.push({
          id: 'q_' + b + '_' + u + '_' + (idx + 1),
          text: englishMeaning,
          answer: hanziWithPinyin,
          prompt_en: englishMeaning,
          prompt_zh: hanziWithPinyin,
          image: '',
          audio: '',
          category: 'Bab ' + u,
          options: options
        });
      });

      projects.push({
        id: 'meihua-b' + b + '-u' + u,
        pin: pin,
        teacher_id: 't-meihua',
        title: 'Meihua ' + b + ' Bab ' + u + ': ' + unit.title,
        subject: 'Bahasa Mandarin',
        level: 'SD',
        language: 'zh',
        template_type: tpl,
        content_format: 'quiz',
        theme: 'white',
        is_public: true,
        visibility: 'public',
        rules: { hasLives: true, livesCount: 3, timeMode: 'timer', timerSeconds: 30, shuffleQuestions: true, shuffleAnswers: true },
        is_deleted: false,
        questions: questions
      });
    }
  }
  return projects;
}

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

    // Strict Rule: Semua aktivitas Mandarin / Hanzi / Meihua WAJIB publik, tidak boleh privat
    const isHanzi = (copy.language === 'zh') ||
      (copy.subject && /mandarin|hanzi|meihua/i.test(copy.subject)) ||
      (copy.title && /[\u4e00-\u9fa5]|meihua/i.test(copy.title)) ||
      (copy.id && /meihua/i.test(copy.id));

    if (isHanzi || copy.id === 'proj-1' || copy.id === 'proj-2' || copy.id === 'proj-3' || copy.id === 'proj-skeleton-3d') {
      copy.is_public = true;
      copy.visibility = 'public';
      copy.is_private = false;
    } else {
      if (copy.is_public === undefined) copy.is_public = (copy.visibility !== 'private' && !copy.is_private);
      if (!copy.visibility) copy.visibility = (copy.is_public && !copy.is_private) ? 'public' : 'private';
      if (copy.visibility === 'private' || copy.is_private) copy.is_public = false;
    }

    if (copy.id === 'proj-1' && copy.template_type === 'wordmatch') copy.template_type = 'quiz';
    if (!copy.content_format) copy.content_format = 'quiz';
    if (!copy.pin) copy.pin = this.generatePin();
    if (!copy.theme || copy.theme === 'cyberpunk') copy.theme = 'white';
    return copy;
  }

  ensureMeihuaPresets() {
    try {
      const all = this.getAllProjects();
      let hasChanges = false;
      const existingMap = new Map();
      all.forEach((p, idx) => {
        if (p && p.id) existingMap.set(p.id, idx);
      });
      
      const allPresets = [
        ...INITIAL_PROJECTS,
        SKELETON_PROJECT,
        ...(typeof generateMeihuaPresets === 'function' ? generateMeihuaPresets() : [])
      ];

      for (const preset of allPresets) {
        if (!preset || !preset.id) continue;
        const norm = this.normalizeProjectMeta(preset);
        if (!existingMap.has(preset.id)) {
          all.push(norm);
          existingMap.set(preset.id, all.length - 1);
          hasChanges = true;
        } else {
          // If already in list but private or deleted, heal it to public & active
          const idx = existingMap.get(preset.id);
          const current = all[idx];
          const hasOldText = current.questions && current.questions.some(q => q.text && q.text.includes('Pilih'));
          if (hasOldText || current.is_deleted || current.is_public === false || current.visibility === 'private' || current.is_private) {
            all[idx] = {
              ...current,
              ...norm,
              questions: norm.questions,
              is_deleted: false,
              is_public: true,
              visibility: 'public',
              is_private: false
            };
            hasChanges = true;
            continue;
          }
          if (current.is_deleted || current.is_public === false || current.visibility === 'private' || current.is_private) {
            all[idx] = {
              ...current,
              ...norm,
              is_deleted: false,
              is_public: true,
              visibility: 'public',
              is_private: false
            };
            hasChanges = true;
          }
        }
      }
      
      if (hasChanges) {
        localStorage.setItem('lotus_projects', JSON.stringify(all));
      }
    } catch (e) {
      console.warn('ensureMeihuaPresets error:', e);
    }
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
      const customTeachers = currentTeachers.filter(t => !oldMockIds.includes(t.id) && t.id !== 't-demo' && t.id !== 't-meihua');
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
      const allPresets = [...INITIAL_PROJECTS, SKELETON_PROJECT, ...(typeof generateMeihuaPresets === 'function' ? generateMeihuaPresets() : [])];
      const defaultIds = allPresets.map(p => p.id);
      // Cleanly remove all old mock teacher projects to prevent unwanted games from cluttering community
      const userProjects = currentProjects.filter(p =>
        !defaultIds.includes(p.id) &&
        !p.id.startsWith('proj-demo-old') &&
        !oldMockTeacherIds.includes(p.teacher_id)
      );
      const mergedProjects = [...allPresets, ...userProjects].map(p => this.normalizeProjectMeta(p));
      localStorage.setItem('lotus_projects', JSON.stringify(mergedProjects));
      localStorage.setItem('lotus_seeded_project_ids', JSON.stringify(defaultIds));
      localStorage.setItem('lotus_seed_version', LOTUS_SEED_VERSION);
    }

    // 4. Students seed check
    const existingStudentsRaw = localStorage.getItem('lotus_students');
    if (!existingStudentsRaw) {
      localStorage.setItem('lotus_students', JSON.stringify(DEFAULT_STUDENTS));
    } else {
      try {
        const stuList = JSON.parse(existingStudentsRaw || '[]');
        let modified = false;
        DEFAULT_STUDENTS.forEach(ds => {
          if (!stuList.some(s => s.id === ds.id || s.username === ds.username || s.nisn === ds.nisn)) {
            stuList.push(ds);
            modified = true;
          }
        });
        if (modified) {
          localStorage.setItem('lotus_students', JSON.stringify(stuList));
        }
      } catch (e) {
        localStorage.setItem('lotus_students', JSON.stringify(DEFAULT_STUDENTS));
      }
    }

    // 5. Classrooms seed check
    const existingClassroomsRaw = localStorage.getItem('lotus_classrooms');
    if (!existingClassroomsRaw) {
      localStorage.setItem('lotus_classrooms', JSON.stringify(DEFAULT_CLASSROOMS));
    } else {
      try {
        const clsList = JSON.parse(existingClassroomsRaw || '[]');
        let modified = false;
        DEFAULT_CLASSROOMS.forEach(dc => {
          if (!clsList.some(c => c.id === dc.id || c.code === dc.code)) {
            clsList.push(dc);
            modified = true;
          }
        });
        if (modified) {
          localStorage.setItem('lotus_classrooms', JSON.stringify(clsList));
        }
      } catch (e) {
        localStorage.setItem('lotus_classrooms', JSON.stringify(DEFAULT_CLASSROOMS));
      }
    }

    // 6. Daily Agendas seed check
    const existingAgendasRaw = localStorage.getItem('lotus_daily_agendas');
    if (!existingAgendasRaw) {
      localStorage.setItem('lotus_daily_agendas', JSON.stringify(getSampleDailyAgendas()));
    } else {
      try {
        const agList = JSON.parse(existingAgendasRaw || '[]');
        if (!Array.isArray(agList) || agList.length === 0) {
          localStorage.setItem('lotus_daily_agendas', JSON.stringify(getSampleDailyAgendas()));
        }
      } catch (e) {
        localStorage.setItem('lotus_daily_agendas', JSON.stringify(getSampleDailyAgendas()));
      }
    }

    // 7. Assignments seed check
    const existingAssignmentsRaw = localStorage.getItem('lotus_assignments');
    if (!existingAssignmentsRaw) {
      localStorage.setItem('lotus_assignments', JSON.stringify(DEFAULT_ASSIGNMENTS));
    } else {
      try {
        const asgList = JSON.parse(existingAssignmentsRaw || '[]');
        if (!Array.isArray(asgList) || asgList.length === 0) {
          localStorage.setItem('lotus_assignments', JSON.stringify(DEFAULT_ASSIGNMENTS));
        }
      } catch (e) {
        localStorage.setItem('lotus_assignments', JSON.stringify(DEFAULT_ASSIGNMENTS));
      }
    }

    localStorage.setItem('lotus_seed_version', LOTUS_SEED_VERSION);

    // 8. Background cloud sync if Supabase configured (Pure Supabase Sync)
    if (this.hasSupabase()) {
      this.syncProjectsFromCloud().catch(() => {});
      this.syncTeachersFromCloud().catch(() => {});
      this.syncAssignmentsFromCloud().catch(() => {});
      this.syncClassroomsFromCloud().catch(() => {});
      this.syncDailyAgendasFromCloud().catch(() => {});
      this.syncStudentsFromCloud().catch(() => {});
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

  clearAllActiveSessions() {
    try {
      sessionStorage.removeItem('lotus_active_teacher');
      localStorage.removeItem('lotus_active_teacher');
      sessionStorage.removeItem('lotus_student_profile');
      localStorage.removeItem('lotus_student_profile');
      sessionStorage.removeItem('lotus_active_navigation');
      localStorage.removeItem('lotus_active_navigation');
    } catch (e) {}
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

  // --- STUDENTS & STUDENT AUTH ---
  getStudents() {
    try {
      const raw = localStorage.getItem('lotus_students');
      if (raw) {
        const list = JSON.parse(raw);
        if (Array.isArray(list) && list.length > 0) return list;
      }
      localStorage.setItem('lotus_students', JSON.stringify(DEFAULT_STUDENTS));
      return DEFAULT_STUDENTS;
    } catch (e) {
      return DEFAULT_STUDENTS;
    }
  }

  saveAllStudents(students) {
    localStorage.setItem('lotus_students', JSON.stringify(students || []));
  }

  getStudentById(id) {
    if (!id) return null;
    return this.getStudents().find(s => s.id === id) || null;
  }

  findStudentByIdentifier(identifier) {
    if (!identifier) return null;
    const clean = String(identifier).trim().toLowerCase();
    const students = this.getStudents();
    return students.find(s =>
      (s.id && s.id.toLowerCase() === clean) ||
      (s.username && s.username.toLowerCase() === clean) ||
      (s.nisn && s.nisn.toLowerCase() === clean) ||
      (s.email && s.email.toLowerCase() === clean) ||
      (s.name && s.name.toLowerCase() === clean)
    ) || null;
  }

  getStudentsByClass(className) {
    if (!className) return [];
    const clean = String(className).trim().toLowerCase();
    return this.getStudents().filter(s => {
      const sClass = String(s.class || s.className || '').trim().toLowerCase();
      return sClass === clean || sClass.includes(clean);
    });
  }

  async registerStudent(studentData, rememberSession = false) {
    if (!studentData || !studentData.name) {
      return { success: false, message: 'Nama murid wajib diisi.' };
    }
    const cleanName = String(studentData.name).trim();
    const rawUsername = studentData.username || studentData.nisn || studentData.email || cleanName.toLowerCase().replace(/\s+/g, '.');
    const cleanUsername = String(rawUsername).trim().toLowerCase();
    const cleanPass = String(studentData.password || '').trim();

    if (!cleanPass) {
      return { success: false, message: 'Kata sandi murid wajib diisi.' };
    }

    const students = this.getStudents();
    const duplicate = students.find(s =>
      (s.username && s.username.toLowerCase() === cleanUsername) ||
      (studentData.nisn && s.nisn && s.nisn === String(studentData.nisn).trim()) ||
      (studentData.email && s.email && s.email.toLowerCase() === String(studentData.email).trim().toLowerCase())
    );

    if (duplicate) {
      return { success: false, message: 'Akun murid dengan Username/NISN/Email tersebut sudah terdaftar.' };
    }

    const id = 'stu-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
    const assignedClass = studentData.class || studentData.className || studentData.grade || 'Umum';
    const newStudent = {
      id,
      name: cleanName,
      username: cleanUsername,
      nisn: studentData.nisn ? String(studentData.nisn).trim() : '',
      email: studentData.email ? String(studentData.email).trim() : `${cleanUsername}@cintakasih.sch.id`,
      class: assignedClass,
      className: assignedClass,
      level: studentData.level || 'SD',
      password: cleanPass,
      school: studentData.school || 'Sekolah Cinta Kasih Tzu Chi',
      classroom_ids: [],
      created_at: new Date().toISOString()
    };

    if (newStudent.class.includes('5-A') || newStudent.class.includes('5A')) {
      newStudent.classroom_ids.push('cls-5a');
      const cls5a = this.getClassroomById('cls-5a');
      if (cls5a && Array.isArray(cls5a.student_ids) && !cls5a.student_ids.includes(newStudent.id)) {
        cls5a.student_ids.push(newStudent.id);
        this.saveAllClassrooms(this.getAllClassrooms());
      }
    }

    students.push(newStudent);
    this.saveAllStudents(students);

    if (this.hasSupabase()) {
      const sb = this.getSupabaseClient();
      if (sb) {
        try {
          await sb.from('students').upsert(newStudent);
        } catch (err) {
          console.warn('LotusDB: Could not sync student to Supabase:', err);
        }
      }
    }

    if (rememberSession) {
      this.setCurrentStudent(newStudent, true);
    }

    return {
      success: true,
      student: newStudent,
      message: `Akun murid ${newStudent.name} berhasil didaftarkan!`
    };
  }

  authenticateStudent(usernameOrName, password, rememberMe = false) {
    const students = this.getStudents();
    const cleanInput = String(usernameOrName || '').trim().toLowerCase();
    const cleanPass = String(password || '').trim();

    if (!cleanInput || !cleanPass) {
      return { success: false, message: 'Harap masukkan Username/NISN dan kata sandi.' };
    }

    const found = students.find(s =>
      (
        (s.username && s.username.toLowerCase() === cleanInput) ||
        (s.nisn && s.nisn.toLowerCase() === cleanInput) ||
        (s.email && s.email.toLowerCase() === cleanInput) ||
        (s.name && s.name.toLowerCase() === cleanInput)
      ) &&
      (s.password === cleanPass || cleanPass === 'demo')
    );

    if (found) {
      this.setCurrentStudent(found, rememberMe);
      return {
        success: true,
        student: found,
        message: 'Login murid berhasil.'
      };
    }

    return {
      success: false,
      message: 'NISN, Username, atau kata sandi murid salah. (Demo password: demo)'
    };
  }

  async authenticateStudentAsync(usernameOrName, password, rememberMe = false) {
    const res = this.authenticateStudent(usernameOrName, password, rememberMe);
    if (res.success) return res;

    if (this.hasSupabase()) {
      const sb = this.getSupabaseClient();
      if (sb) {
        try {
          const clean = String(usernameOrName || '').trim().toLowerCase();
          const { data, error } = await sb.from('students').select('*')
            .or(`username.ilike.${clean},nisn.eq.${clean},email.ilike.${clean},name.ilike.${clean}`)
            .maybeSingle();

          if (!error && data && (data.password === password || password === 'demo')) {
            const students = this.getStudents();
            const idx = students.findIndex(s => s.id === data.id);
            if (idx >= 0) students[idx] = data;
            else students.push(data);
            this.saveAllStudents(students);
            this.setCurrentStudent(data, rememberMe);
            return { success: true, student: data, message: 'Login murid berhasil via Supabase.' };
          }
        } catch (e) {
          console.warn('LotusDB authenticateStudentAsync Supabase error:', e);
        }
      }
    }

    return res;
  }

  getCurrentStudentStrict() {
    try {
      const saved = sessionStorage.getItem('lotus_student_profile') || localStorage.getItem('lotus_student_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  }

  getCurrentStudent() {
    const current = this.getCurrentStudentStrict();
    if (current) return current;
    const students = this.getStudents();
    return students && students.length > 0 ? students[0] : DEFAULT_STUDENTS[0];
  }

  setCurrentStudent(student, rememberSession = false) {
    try {
      if (!student) {
        this.logoutStudent();
        return;
      }
      sessionStorage.setItem('lotus_student_profile', JSON.stringify(student));
      if (rememberSession) {
        localStorage.setItem('lotus_student_profile', JSON.stringify(student));
      } else {
        localStorage.removeItem('lotus_student_profile');
      }
    } catch (e) {}
  }

  logoutStudent() {
    try {
      sessionStorage.removeItem('lotus_student_profile');
      localStorage.removeItem('lotus_student_profile');
    } catch (e) {}
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

    // Ensure Meihua & Skeleton presets are loaded
    if (typeof this.ensureMeihuaPresets === 'function') {
      this.ensureMeihuaPresets();
    }

    const teachersMap = new Map(this.getTeachers().map(t => [t.id, t]));

    return this.getAllProjects()
      .filter(p => !p.is_deleted && p.is_public !== false && p.visibility !== 'private' && !p.is_private)
      .map(p => {
        const owner = teachersMap.get(p.teacher_id);
        return {
          ...p,
          teacher_name: owner ? owner.name : 'Guru Cinta Kasih',
          teacher_school: owner ? owner.school : 'Sekolah Cinta Kasih Tzu Chi'
        };
      })
      .filter(p => {
        if (level && level !== 'all' && (p.level || 'SD') !== level) return false;
        if (subject && subject !== 'all' && (p.subject || '') !== subject) return false;
        if (language && language !== 'all' && (p.language || 'id') !== language) return false;
        if (q) {
          const hay = `${p.title} ${p.subject} ${p.teacher_name} ${p.level} ${p.template_type} ${p.pin}`.toLowerCase();
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
        const cloudProjects = data.map(cp => this.normalizeProjectMeta(cp));
        
        // Merge cloud projects with built-in presets (Meihua 1-60, Skeleton 3D, and Initial Projects)
        // Cloud projects override presets with matching id, but presets not in cloud are strictly preserved
        const allPresets = [
          ...INITIAL_PROJECTS,
          SKELETON_PROJECT,
          ...(typeof generateMeihuaPresets === 'function' ? generateMeihuaPresets() : [])
        ];
        
        const mergedMap = new Map();
        // 1. Seed with built-in presets
        allPresets.forEach(p => {
          if (p && p.id) mergedMap.set(p.id, this.normalizeProjectMeta(p));
        });
        // 2. Overlay cloud projects
        cloudProjects.forEach(cp => {
          if (cp && cp.id) mergedMap.set(cp.id, cp);
        });
        
        const mergedList = Array.from(mergedMap.values());
        this.saveAllProjects(mergedList);
        return mergedList;
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

  async syncClassroomsFromCloud() {
    const sb = this.getSupabaseClient();
    if (!sb) return null;
    try {
      const { data, error } = await sb.from('classrooms').select('*');
      if (!error && Array.isArray(data) && data.length > 0) {
        const local = this.getAllClassrooms();
        const map = new Map();
        local.forEach(c => map.set(c.id, c));
        data.forEach(c => map.set(c.id, c));
        const merged = Array.from(map.values());
        this.saveAllClassrooms(merged);
        return merged;
      }
    } catch (e) {
      console.warn('LotusDB: Could not fetch classrooms from Supabase:', e);
    }
    return null;
  }

  async syncDailyAgendasFromCloud() {
    const sb = this.getSupabaseClient();
    if (!sb) return null;
    try {
      const { data, error } = await sb.from('daily_agendas').select('*');
      if (!error && Array.isArray(data) && data.length > 0) {
        const local = this.getAllDailyAgendas();
        const map = new Map();
        local.forEach(a => map.set(a.id, a));
        data.forEach(a => map.set(a.id, a));
        const merged = Array.from(map.values());
        this.saveAllDailyAgendas(merged);
        return merged;
      }
    } catch (e) {
      console.warn('LotusDB: Could not fetch daily agendas from Supabase:', e);
    }
    return null;
  }

  async syncStudentsFromCloud() {
    const sb = this.getSupabaseClient();
    if (!sb) return null;
    try {
      const { data, error } = await sb.from('students').select('*');
      if (!error && Array.isArray(data) && data.length > 0) {
        const local = this.getStudents();
        const map = new Map();
        local.forEach(s => map.set(s.id, s));
        data.forEach(s => map.set(s.id, s));
        const merged = Array.from(map.values());
        this.saveAllStudents(merged);
        return merged;
      }
    } catch (e) {
      console.warn('LotusDB: Could not fetch students from Supabase:', e);
    }
    return null;
  }
  // --- ASSIGNMENTS & STUDENT SUBMISSIONS ---
  getAllAssignments() {
    try {
      const raw = localStorage.getItem('lotus_assignments');
      if (raw) {
        const list = JSON.parse(raw);
        if (Array.isArray(list) && list.length > 0) return list;
      }
      localStorage.setItem('lotus_assignments', JSON.stringify(DEFAULT_ASSIGNMENTS));
      return DEFAULT_ASSIGNMENTS;
    } catch (e) {
      return DEFAULT_ASSIGNMENTS;
    }
  }

  saveAllAssignments(assignments) {
    localStorage.setItem('lotus_assignments', JSON.stringify(assignments || []));
  }

  getTeacherAssignments(teacherId) {
    return this.getAllAssignments()
      .filter(a => a.teacher_id === teacherId)
      .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  }

  getAssignmentById(id) {
    if (!id) return null;
    return this.getAllAssignments().find(a => a.id === id) || null;
  }

  async getAssignmentByIdAsync(id) {
    if (!id) return null;
    let asg = this.getAssignmentById(id);
    if (!asg && this.hasSupabase()) {
      const sb = this.getSupabaseClient();
      if (sb) {
        try {
          const { data, error } = await sb.from('assignments').select('*').eq('id', id).maybeSingle();
          if (!error && data) {
            const list = this.getAllAssignments();
            const idx = list.findIndex(a => a.id === id);
            if (idx >= 0) list[idx] = data;
            else list.push(data);
            this.saveAllAssignments(list);
            return data;
          }
        } catch (e) {}
      }
    }
    return asg;
  }

  async createAssignment({ projectId, teacherId, title, templateType, rules = {}, allowMultiple = false, showAnswers = true, deadline = null, classroomIds = [], targetStudentIds = [] }) {
    const id = 'asg-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
    const clsIds = Array.isArray(classroomIds) ? classroomIds : (classroomIds ? [classroomIds] : []);
    const tStudents = Array.isArray(targetStudentIds) ? targetStudentIds : (targetStudentIds ? [targetStudentIds] : []);

    const newAsg = {
      id,
      project_id: projectId,
      teacher_id: teacherId,
      title: (title || 'Tugas').trim(),
      template_type: templateType || 'quiz',
      rules: rules || {},
      allow_multiple: Boolean(allowMultiple),
      show_answers: showAnswers !== false,
      status: 'active',
      deadline: deadline || null,
      classroom_ids: clsIds,
      target_student_ids: tStudents,
      created_at: new Date().toISOString()
    };

    const all = this.getAllAssignments();
    all.unshift(newAsg);
    this.saveAllAssignments(all);

    // Auto-post agenda item of type 'tugas' to target classrooms' daily agendas
    if (clsIds.length > 0) {
      const targetDate = deadline ? String(deadline).split('T')[0] : new Date().toISOString().split('T')[0];
      for (const cId of clsIds) {
        try {
          const cls = this.getClassroomById(cId);
          const clsName = cls ? cls.name : 'Kelas';
          const agendaList = this.getAllDailyAgendas();
          let agenda = agendaList.find(a => a.classroom_id === cId && a.date === targetDate);

          const agendaItem = {
            id: 'item-asg-' + id + '-' + Math.random().toString(36).substring(2, 6),
            type: 'tugas',
            category: 'tugas',
            title: newAsg.title,
            command: `Kerjakan tugas ${newAsg.title} di DaAi Learning Hub sebelum batas waktu.`,
            explanation: `Aktivitas penugasan interaktif: ${newAsg.title}. Silakan klik 'Mulai Kerjakan Tugas' untuk langsung bermain.`,
            deadline: deadline || null,
            file_url: null,
            file_name: null,
            file_size: null,
            external_link: null,
            project_id: projectId,
            assignment_id: id,
            target_type: (tStudents.length > 0) ? 'selective' : 'all',
            target_student_ids: tStudents
          };

          if (agenda) {
            agenda.items = Array.isArray(agenda.items) ? agenda.items : [];
            agenda.items.push(agendaItem);
            await this.saveDailyAgenda({
              id: agenda.id,
              classroomId: cId,
              teacherId,
              date: targetDate,
              title: agenda.title,
              items: agenda.items
            });
          } else {
            await this.saveDailyAgenda({
              classroomId: cId,
              teacherId,
              date: targetDate,
              title: `Agenda Pembelajaran — ${clsName}`,
              items: [agendaItem]
            });
          }
        } catch (e) {
          console.warn('LotusDB: Could not auto-post assignment agenda item:', e);
        }
      }
    }

    if (this.hasSupabase()) {
      const sb = this.getSupabaseClient();
      if (sb) {
        try {
          await sb.from('assignments').upsert(newAsg);
        } catch (err) {
          console.warn('LotusDB: Could not sync assignment to Supabase:', err);
        }
      }
    }

    return newAsg;
  }

  async updateAssignmentStatus(assignmentId, status) {
    const all = this.getAllAssignments();
    const asg = all.find(a => a.id === assignmentId);
    if (!asg) return null;

    asg.status = status;
    this.saveAllAssignments(all);

    if (this.hasSupabase()) {
      const sb = this.getSupabaseClient();
      if (sb) {
        try {
          await sb.from('assignments').update({ status }).eq('id', assignmentId);
        } catch (e) {
          console.warn('LotusDB: Could not update assignment status in Supabase:', e);
        }
      }
    }
    return asg;
  }

  async deleteAssignment(assignmentId) {
    let all = this.getAllAssignments();
    all = all.filter(a => a.id !== assignmentId);
    this.saveAllAssignments(all);

    // Also delete local submissions for this assignment
    let subs = this.getAllSubmissions();
    subs = subs.filter(s => s.assignment_id !== assignmentId);
    this.saveAllSubmissions(subs);

    // Also remove any daily agenda items linked to this assignment
    try {
      const agendas = this.getAllDailyAgendas();
      let changed = false;
      agendas.forEach(ag => {
        if (Array.isArray(ag.items)) {
          const originalLen = ag.items.length;
          ag.items = ag.items.filter(it => it.assignment_id !== assignmentId);
          if (ag.items.length !== originalLen) changed = true;
        }
      });
      if (changed) {
        this.saveAllDailyAgendas(agendas);
      }
    } catch (e) {}

    if (this.hasSupabase()) {
      const sb = this.getSupabaseClient();
      if (sb) {
        try {
          await sb.from('assignment_submissions').delete().eq('assignment_id', assignmentId);
          await sb.from('assignments').delete().eq('id', assignmentId);
        } catch (e) {
          console.warn('LotusDB: Could not delete assignment from Supabase:', e);
        }
      }
    }
    return true;
  }

  // --- SUBMISSIONS ---
  getAllSubmissions() {
    try {
      const list = JSON.parse(localStorage.getItem('lotus_assignment_submissions') || '[]') || [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  saveAllSubmissions(submissions) {
    localStorage.setItem('lotus_assignment_submissions', JSON.stringify(submissions || []));
  }

  hasStudentSubmittedLocally(assignmentId, studentName) {
    const clean = String(studentName || '').trim().toLowerCase();
    if (!clean) return false;
    return this.getAllSubmissions().some(s =>
      s.assignment_id === assignmentId &&
      String(s.student_name || '').trim().toLowerCase() === clean
    );
  }

  async submitAssignmentResult({ assignmentId, studentName, studentClass = '-', score = 0, maxScore = 0, percentage = 0, timeTakenSeconds = 0, answersSummary = [] }) {
    const id = 'sub-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
    const subRecord = {
      id,
      assignment_id: assignmentId,
      student_name: (studentName || 'Siswa').trim(),
      student_class: (studentClass || '-').trim(),
      score: Number(score) || 0,
      max_score: Number(maxScore) || 0,
      percentage: Number(percentage) || 0,
      time_taken_seconds: Number(timeTakenSeconds) || 0,
      answers_summary: Array.isArray(answersSummary) ? answersSummary : [],
      created_at: new Date().toISOString()
    };

    const all = this.getAllSubmissions();
    all.push(subRecord);
    this.saveAllSubmissions(all);

    if (this.hasSupabase()) {
      const sb = this.getSupabaseClient();
      if (sb) {
        try {
          await sb.from('assignment_submissions').insert(subRecord);
        } catch (err) {
          console.warn('LotusDB: Could not insert submission to Supabase:', err);
        }
      }
    }

    return subRecord;
  }

  async getAssignmentSubmissions(assignmentId) {
    if (!assignmentId) return [];
    let cloudSubs = null;

    if (this.hasSupabase()) {
      const sb = this.getSupabaseClient();
      if (sb) {
        try {
          const { data, error } = await sb
            .from('assignment_submissions')
            .select('*')
            .eq('assignment_id', assignmentId)
            .order('created_at', { ascending: false });
          if (!error && Array.isArray(data)) {
            cloudSubs = data;
          }
        } catch (e) {
          console.warn('LotusDB: Could not fetch submissions from Supabase:', e);
        }
      }
    }

    if (cloudSubs !== null) {
      const localSubs = this.getAllSubmissions().filter(s => s.assignment_id === assignmentId);
      const map = new Map();
      cloudSubs.forEach(s => map.set(s.id, s));
      localSubs.forEach(s => {
        if (!map.has(s.id)) map.set(s.id, s);
      });
      const merged = Array.from(map.values()).sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
      return merged;
    }

    return this.getAllSubmissions()
      .filter(s => s.assignment_id === assignmentId)
      .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  }

  async syncAssignmentsFromCloud() {
    const sb = this.getSupabaseClient();
    if (!sb) return null;
    try {
      const { data, error } = await sb.from('assignments').select('*');
      if (!error && Array.isArray(data)) {
        this.saveAllAssignments(data);
        return data;
      }
    } catch (e) {
      console.warn('LotusDB: Could not fetch assignments from Supabase:', e);
    }
    return null;
  }

  computeAssignmentAnalytics(submissions = [], projectQuestions = []) {
    const total = submissions.length;
    if (total === 0) {
      return {
        totalStudents: 0,
        averageScore: 0,
        averagePercentage: 0,
        highestScore: 0,
        lowestScore: 0,
        averageTimeSeconds: 0,
        questionBreakdown: []
      };
    }

    const totalScores = submissions.reduce((acc, s) => acc + (s.score || 0), 0);
    const totalPerc = submissions.reduce((acc, s) => acc + (s.percentage || 0), 0);
    const totalTime = submissions.reduce((acc, s) => acc + (s.time_taken_seconds || 0), 0);
    const scores = submissions.map(s => s.score || 0);

    // Analyze per question
    const qMap = new Map();
    (projectQuestions || []).forEach((q, idx) => {
      qMap.set(String(q.id || idx + 1), {
        questionId: q.id || String(idx + 1),
        questionIndex: idx + 1,
        questionText: q.text || q.question || `Pertanyaan #${idx + 1}`,
        correctAnswer: (q.options && q.options.find(o => o.isCorrect))?.text || q.correctAnswer || '-',
        correctCount: 0,
        wrongCount: 0,
        totalAnswers: 0,
        wrongAnswersMap: {}
      });
    });

    submissions.forEach(sub => {
      const ansList = Array.isArray(sub.answers_summary) ? sub.answers_summary : [];
      ansList.forEach((ans, idx) => {
        const qId = String(ans.questionId || ans.id || idx + 1);
        let qStat = qMap.get(qId);
        if (!qStat) {
          qStat = {
            questionId: qId,
            questionIndex: idx + 1,
            questionText: ans.questionText || `Pertanyaan #${idx + 1}`,
            correctAnswer: ans.correctAnswer || '-',
            correctCount: 0,
            wrongCount: 0,
            totalAnswers: 0,
            wrongAnswersMap: {}
          };
          qMap.set(qId, qStat);
        }

        qStat.totalAnswers++;
        if (ans.isCorrect) {
          qStat.correctCount++;
        } else {
          qStat.wrongCount++;
          const given = String(ans.studentAnswer || ans.userAnswer || 'Salah').trim();
          qStat.wrongAnswersMap[given] = (qStat.wrongAnswersMap[given] || 0) + 1;
        }
      });
    });

    const questionBreakdown = Array.from(qMap.values()).map(q => {
      const accuracy = q.totalAnswers > 0 ? Math.round((q.correctCount / q.totalAnswers) * 100) : 0;
      let topWrong = '-';
      let maxWrongCount = 0;
      Object.entries(q.wrongAnswersMap).forEach(([ans, count]) => {
        if (count > maxWrongCount) {
          maxWrongCount = count;
          topWrong = `${ans} (${count} siswa)`;
        }
      });

      let difficultyLabel = 'Sedang';
      if (accuracy >= 80) difficultyLabel = 'Mudah';
      else if (accuracy < 50) difficultyLabel = 'Sulit';

      return {
        ...q,
        accuracyPercent: accuracy,
        topWrongAnswer: topWrong,
        difficultyLabel
      };
    });

    return {
      totalStudents: total,
      averageScore: Math.round((totalScores / total) * 10) / 10,
      averagePercentage: Math.round(totalPerc / total),
      highestScore: Math.max(...scores),
      lowestScore: Math.min(...scores),
      averageTimeSeconds: Math.round(totalTime / total),
      questionBreakdown
    };
  }
  // --- CLASSROOM MANAGEMENT ---
  generateClassroomCode() {
    const existing = new Set(this.getAllClassrooms().map(c => String(c.code)));
    for (let i = 0; i < 1000; i++) {
      const code = String(100000 + Math.floor(Math.random() * 900000));
      if (!existing.has(code)) return code;
    }
    return String(Date.now()).slice(-6);
  }

  getAllClassrooms() {
    try {
      const raw = localStorage.getItem('lotus_classrooms');
      if (raw) {
        const list = JSON.parse(raw);
        if (Array.isArray(list) && list.length > 0) return list;
      }
      localStorage.setItem('lotus_classrooms', JSON.stringify(DEFAULT_CLASSROOMS));
      return DEFAULT_CLASSROOMS;
    } catch (e) {
      return DEFAULT_CLASSROOMS;
    }
  }

  saveAllClassrooms(classrooms) {
    localStorage.setItem('lotus_classrooms', JSON.stringify(classrooms || []));
  }

  async createClassroom({ teacherId, teacherName, name, level = 'SD', subject = 'Wali Kelas', description = '' }) {
    const code = this.generateClassroomCode();
    const id = 'cls-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
    const tName = teacherName || (teacherId ? this.getTeacherNameById(teacherId) : 'Guru Demo') || 'Guru Demo';

    const newClass = {
      id,
      teacher_id: teacherId || 't-demo',
      teacher_name: tName,
      name: (name || 'Kelas Baru').trim(),
      code,
      level: level || 'SD',
      subject: (subject || 'Umum').trim(),
      description: (description || '').trim(),
      created_at: new Date().toISOString(),
      student_ids: []
    };

    const all = this.getAllClassrooms();
    all.unshift(newClass);
    this.saveAllClassrooms(all);

    if (this.hasSupabase()) {
      const sb = this.getSupabaseClient();
      if (sb) {
        try {
          await sb.from('classrooms').upsert(newClass);
        } catch (err) {
          console.warn('LotusDB: Could not sync classroom to Supabase:', err);
        }
      }
    }

    return newClass;
  }

  getClassroomsByTeacher(teacherId) {
    if (!teacherId) return [];
    return this.getAllClassrooms()
      .filter(c => c.teacher_id === teacherId)
      .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  }

  getClassroomById(id) {
    if (!id) return null;
    return this.getAllClassrooms().find(c => c.id === id) || null;
  }

  getClassroomByCode(code) {
    if (!code) return null;
    const clean = String(code).trim().toLowerCase();
    return this.getAllClassrooms().find(c => String(c.code || '').trim().toLowerCase() === clean) || null;
  }

  async joinClassroom(studentProfile, classCode) {
    if (!classCode) {
      return { success: false, message: 'Harap masukkan 6-digit kode kelas.' };
    }
    const cleanCode = String(classCode).trim().toLowerCase();
    const classroom = this.getClassroomByCode(cleanCode);
    if (!classroom) {
      return {
        success: false,
        message: `Kode kelas "${classCode}" tidak ditemukan. Harap periksa kembali 6-digit kode dari guru Anda.`
      };
    }

    let student = null;
    if (typeof studentProfile === 'object' && studentProfile !== null) {
      student = studentProfile;
    } else if (typeof studentProfile === 'string' && studentProfile.trim()) {
      student = this.findStudentByIdentifier(studentProfile);
      if (!student) {
        student = this.getStudents().find(s => s.name.toLowerCase() === studentProfile.trim().toLowerCase());
      }
    }
    if (!student) {
      student = this.getCurrentStudent();
    }
    if (!student) {
      return { success: false, message: 'Data murid tidak ditemukan. Silakan masuk terlebih dahulu.' };
    }

    classroom.student_ids = Array.isArray(classroom.student_ids) ? classroom.student_ids : [];

    const studentId = student.id || student.username || student.name;
    const isEnrolled = classroom.student_ids.some(sid =>
      sid === studentId ||
      sid === student.id ||
      sid === student.username ||
      sid === student.nisn ||
      sid === student.name
    );

    if (isEnrolled) {
      return {
        success: false,
        alreadyJoined: true,
        message: `Anda sudah bergabung dalam kelas "${classroom.name}".`,
        classroom
      };
    }

    classroom.student_ids.push(student.id || student.name);

    const all = this.getAllClassrooms();
    const idx = all.findIndex(c => c.id === classroom.id);
    if (idx >= 0) all[idx] = classroom;
    else all.push(classroom);
    this.saveAllClassrooms(all);

    // Update student's classroom_ids
    const allStudents = this.getStudents();
    const sIdx = allStudents.findIndex(s => s.id === student.id || (student.username && s.username === student.username));
    if (sIdx >= 0) {
      const stuRecord = allStudents[sIdx];
      stuRecord.classroom_ids = Array.isArray(stuRecord.classroom_ids) ? stuRecord.classroom_ids : [];
      if (!stuRecord.classroom_ids.includes(classroom.id)) {
        stuRecord.classroom_ids.push(classroom.id);
      }
      this.saveAllStudents(allStudents);
      student.classroom_ids = stuRecord.classroom_ids;
    }

    const currentActive = this.getCurrentStudentStrict();
    if (currentActive && (currentActive.id === student.id || currentActive.name === student.name)) {
      currentActive.classroom_ids = currentActive.classroom_ids || [];
      if (!currentActive.classroom_ids.includes(classroom.id)) {
        currentActive.classroom_ids.push(classroom.id);
      }
      this.setCurrentStudent(currentActive, false);
    }

    if (this.hasSupabase()) {
      const sb = this.getSupabaseClient();
      if (sb) {
        try {
          await sb.from('classrooms').upsert(classroom);
        } catch (e) {
          console.warn('LotusDB joinClassroom Supabase error:', e);
        }
      }
    }

    return {
      success: true,
      classroom,
      message: `Selamat! Anda berhasil bergabung ke kelas "${classroom.name}".`
    };
  }

  getClassroomStudents(classroomId) {
    if (!classroomId) return [];
    const classroom = this.getClassroomById(classroomId);
    if (!classroom) return [];
    const rawIds = Array.isArray(classroom.student_ids) ? classroom.student_ids : [];
    const allStudents = this.getStudents();

    const result = [];
    rawIds.forEach(idOrName => {
      const clean = String(idOrName).toLowerCase().trim();
      const found = allStudents.find(s =>
        (s.id && s.id.toLowerCase() === clean) ||
        (s.username && s.username.toLowerCase() === clean) ||
        (s.nisn && s.nisn.toLowerCase() === clean) ||
        (s.name && s.name.toLowerCase() === clean)
      );
      if (found) {
        result.push(found);
      } else {
        result.push({
          id: idOrName,
          name: idOrName,
          class: classroom.name,
          school: 'Sekolah Cinta Kasih Tzu Chi'
        });
      }
    });

    return result;
  }

  getStudentClassrooms(studentNameOrId) {
    let student = null;
    if (typeof studentNameOrId === 'object' && studentNameOrId !== null) {
      student = studentNameOrId;
    } else if (typeof studentNameOrId === 'string' && studentNameOrId.trim()) {
      student = this.findStudentByIdentifier(studentNameOrId);
      if (!student) {
        student = this.getStudents().find(s => s.name.toLowerCase() === studentNameOrId.trim().toLowerCase());
      }
    }
    if (!student) {
      student = this.getCurrentStudent();
    }
    if (!student) return [];

    const identifiers = [
      student.id,
      student.username,
      student.nisn,
      student.name,
      student.email
    ].filter(Boolean).map(x => String(x).toLowerCase().trim());

    const studentClassroomIds = Array.isArray(student.classroom_ids) ? student.classroom_ids : [];
    const studentClassName = String(student.class || student.className || '').trim().toLowerCase();

    const all = this.getAllClassrooms();
    return all.filter(c => {
      if (Array.isArray(c.student_ids)) {
        const hasId = c.student_ids.some(sid => identifiers.includes(String(sid).toLowerCase().trim()));
        if (hasId) return true;
      }
      if (studentClassroomIds.includes(c.id)) return true;

      // Grade fallback matching (e.g. 5-A students)
      if (studentClassName && (studentClassName === '5-a' || studentClassName === '5a')) {
        if (c.id === 'cls-5a' || c.code === '502101') return true;
        if (c.id === 'cls-meihua' || c.code === '803102') return true;
      }
      return false;
    });
  }

  // --- DAILY AGENDA MANAGEMENT ---
  getAllDailyAgendas() {
    try {
      const raw = localStorage.getItem('lotus_daily_agendas');
      if (raw) {
        const list = JSON.parse(raw);
        if (Array.isArray(list) && list.length > 0) return list;
      }
      const sample = getSampleDailyAgendas();
      localStorage.setItem('lotus_daily_agendas', JSON.stringify(sample));
      return sample;
    } catch (e) {
      return getSampleDailyAgendas();
    }
  }

  saveAllDailyAgendas(agendas) {
    localStorage.setItem('lotus_daily_agendas', JSON.stringify(agendas || []));
  }

  async saveDailyAgenda({ id, classroomId, teacherId, date, title, items }) {
    if (!classroomId) {
      throw new Error('classroomId is required to save daily agenda');
    }
    const cls = this.getClassroomById(classroomId);
    const clsName = cls ? cls.name : 'Kelas';
    const tName = cls ? cls.teacher_name : (this.getTeacherNameById(teacherId) || 'Guru Demo');
    const dateStr = date ? String(date).split('T')[0] : new Date().toISOString().split('T')[0];

    const all = this.getAllDailyAgendas();
    let target = null;
    if (id) {
      target = all.find(a => a.id === id);
    }
    if (!target) {
      target = all.find(a => a.classroom_id === classroomId && a.date === dateStr);
    }

    const formattedItems = (items || []).map(item => ({
      id: item.id || ('item-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6)),
      type: item.type || 'materi',
      category: item.category || 'materi',
      title: (item.title || 'Agenda Item').trim(),
      command: (item.command || '').trim(),
      explanation: (item.explanation || '').trim(),
      deadline: item.deadline || null,
      file_url: item.file_url || null,
      file_name: item.file_name || null,
      file_size: item.file_size || null,
      external_link: item.external_link || null,
      project_id: item.project_id || null,
      assignment_id: item.assignment_id || null,
      target_type: item.target_type || 'all',
      target_student_ids: Array.isArray(item.target_student_ids) ? item.target_student_ids : []
    }));

    if (target) {
      target.classroom_id = classroomId;
      target.classroom_name = clsName;
      if (teacherId) target.teacher_id = teacherId;
      target.teacher_name = tName;
      target.date = dateStr;
      if (title) target.title = title;
      target.items = formattedItems;
      target.updated_at = new Date().toISOString();
    } else {
      target = {
        id: id || ('agenda-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6)),
        classroom_id: classroomId,
        classroom_name: clsName,
        teacher_id: teacherId || (cls ? cls.teacher_id : 't-demo'),
        teacher_name: tName,
        date: dateStr,
        title: title || `Agenda Pembelajaran ${dateStr}`,
        created_at: new Date().toISOString(),
        items: formattedItems
      };
      all.unshift(target);
    }

    this.saveAllDailyAgendas(all);

    if (this.hasSupabase()) {
      const sb = this.getSupabaseClient();
      if (sb) {
        try {
          await sb.from('daily_agendas').upsert(target);
        } catch (e) {
          console.warn('LotusDB: Could not sync daily agenda to Supabase:', e);
        }
      }
    }

    return target;
  }

  getDailyAgendasByClass(classroomId, date = null) {
    if (!classroomId) return [];
    let list = this.getAllDailyAgendas().filter(a => a.classroom_id === classroomId);
    if (date) {
      const dStr = String(date).split('T')[0];
      list = list.filter(a => a.date === dStr);
    }
    return list.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }

  getDailyAgendaById(agendaId) {
    if (!agendaId) return null;
    return this.getAllDailyAgendas().find(a => a.id === agendaId) || null;
  }

  async deleteDailyAgenda(agendaId) {
    if (!agendaId) return false;
    let all = this.getAllDailyAgendas();
    all = all.filter(a => a.id !== agendaId);
    this.saveAllDailyAgendas(all);
    if (this.hasSupabase()) {
      const sb = this.getSupabaseClient();
      if (sb) {
        try {
          await sb.from('daily_agendas').delete().eq('id', agendaId);
        } catch (e) {
          console.warn('LotusDB: Could not delete daily agenda from Supabase:', e);
        }
      }
    }
    return true;
  }

  getDeadlineDiffDays(deadlineStr) {
    if (!deadlineStr) return null;
    try {
      const dStr = deadlineStr.includes('T') ? deadlineStr.split('T')[0] : deadlineStr.split(' ')[0];
      const parts = dStr.split('-');
      if (parts.length !== 3) return null;
      const targetDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      const now = new Date();
      const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const diffTime = targetDate.getTime() - todayDate.getTime();
      return Math.round(diffTime / (1000 * 60 * 60 * 24));
    } catch (e) {
      return null;
    }
  }

  getCountdownLabel(deadlineStr) {
    const diffDays = this.getDeadlineDiffDays(deadlineStr);
    if (diffDays === null) return 'Tanpa Batas Waktu';
    if (diffDays < 0) {
      const absDays = Math.abs(diffDays);
      return absDays === 1 ? 'Terlewat 1 hari' : `Terlewat ${absDays} hari`;
    }
    if (diffDays === 0) return 'Hari Ini';
    if (diffDays === 1) return 'Besok';
    return `${diffDays} hari lagi`;
  }

  getStudentPersonalAgenda(studentProfile) {
    const student = studentProfile || this.getCurrentStudent();
    if (!student) return [];

    const myClassrooms = this.getStudentClassrooms(student);
    const myClassIds = new Set(myClassrooms.map(c => c.id));
    const studentIdentities = [
      student.id,
      student.username,
      student.nisn,
      student.name,
      student.email
    ].filter(Boolean).map(s => String(s).toLowerCase().trim());

    const allAgendas = this.getAllDailyAgendas();
    const relevantAgendas = allAgendas.filter(a => myClassIds.has(a.classroom_id));
    const pendingItems = [];

    relevantAgendas.forEach(agenda => {
      if (!Array.isArray(agenda.items)) return;
      agenda.items.forEach(item => {
        if (item.target_type === 'selective' && Array.isArray(item.target_student_ids) && item.target_student_ids.length > 0) {
          const matches = item.target_student_ids.some(tid =>
            studentIdentities.includes(String(tid).toLowerCase().trim())
          );
          if (!matches) return;
        }

        const countdown = this.getCountdownLabel(item.deadline);
        const diffDays = this.getDeadlineDiffDays(item.deadline);

        const isEligible = (diffDays === null) || (diffDays >= 0) || (item.status === 'active');
        if (!isEligible) return;

        pendingItems.push({
          ...item,
          agenda_id: agenda.id,
          agenda_title: agenda.title,
          agenda_date: agenda.date,
          classroom_id: agenda.classroom_id,
          classroom_name: agenda.classroom_name,
          teacher_id: agenda.teacher_id,
          teacher_name: agenda.teacher_name,
          countdown_label: countdown,
          diff_days: diffDays !== null ? diffDays : 9999
        });
      });
    });

    pendingItems.sort((a, b) => a.diff_days - b.diff_days);
    return pendingItems;
  }

  getStudentMaterialsAndAnnouncements(studentProfile, filterType = 'all') {
    const student = studentProfile || this.getCurrentStudent();
    if (!student) return [];

    const myClassrooms = this.getStudentClassrooms(student);
    const myClassIds = new Set(myClassrooms.map(c => c.id));
    const studentIdentities = [
      student.id,
      student.username,
      student.nisn,
      student.name,
      student.email
    ].filter(Boolean).map(s => String(s).toLowerCase().trim());

    const allAgendas = this.getAllDailyAgendas();
    const relevantAgendas = allAgendas.filter(a => myClassIds.has(a.classroom_id));
    const results = [];

    relevantAgendas.forEach(agenda => {
      if (!Array.isArray(agenda.items)) return;
      agenda.items.forEach(item => {
        if (item.target_type === 'selective' && Array.isArray(item.target_student_ids) && item.target_student_ids.length > 0) {
          const matches = item.target_student_ids.some(tid =>
            studentIdentities.includes(String(tid).toLowerCase().trim())
          );
          if (!matches) return;
        }

        if (filterType && filterType !== 'all') {
          const normFilter = filterType.toLowerCase();
          if (normFilter === 'kuis' || normFilter === 'tugas') {
            if (item.type !== 'tugas' && item.category !== 'tugas' && item.category !== 'ulangan') return;
          } else if (normFilter === 'materi') {
            if (item.type !== 'materi' && item.category !== 'materi' && item.category !== 'buku') return;
          } else if (normFilter === 'pengumuman') {
            if (item.type !== 'pengumuman' && item.category !== 'seragam' && item.category !== 'lainnya') return;
          } else if (item.type !== normFilter && item.category !== normFilter) {
            return;
          }
        }

        const countdown = this.getCountdownLabel(item.deadline);
        const diffDays = this.getDeadlineDiffDays(item.deadline);

        results.push({
          ...item,
          agenda_id: agenda.id,
          agenda_title: agenda.title,
          agenda_date: agenda.date,
          classroom_id: agenda.classroom_id,
          classroom_name: agenda.classroom_name,
          teacher_id: agenda.teacher_id,
          teacher_name: agenda.teacher_name,
          countdown_label: countdown,
          diff_days: diffDays
        });
      });
    });

    results.sort((a, b) => {
      const da = new Date(a.agenda_date || a.created_at || 0).getTime();
      const db = new Date(b.agenda_date || b.created_at || 0).getTime();
      return db - da;
    });

    return results;
  }

}

if (typeof window !== 'undefined') {
  window.LotusDB = new LocalDatabase();
} else if (typeof global !== 'undefined') {
  global.LotusDB = new LocalDatabase();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LocalDatabase,
    LotusDB: (typeof window !== 'undefined' ? window.LotusDB : (typeof global !== 'undefined' ? global.LotusDB : null))
  };
}

