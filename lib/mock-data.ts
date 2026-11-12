import { Activity } from './types';

export const INITIAL_DEMO_ACTIVITIES: Activity[] = [
  {
    id: "demo-tata-surya",
    title: "Tata Surya & Sains Antariksa",
    description: "Pelajari karakteristik planet, matahari, dan benda langit dalam tata surya kita.",
    subject: "Sains / IPA",
    template_default: "quiz",
    is_public: true,
    play_count: 42,
    settings: {
      timerSeconds: 30,
      lives: 3,
      shuffle: true,
      showAnswers: true
    },
    content: {
      items: [
        {
          id: "1",
          question: "Planet manakah yang dijuluki sebagai 'Planet Merah'?",
          correctAnswer: "Mars",
          wrongAnswers: ["Venus", "Jupiter", "Merkurius"],
          hint: "Tanahnya mengandung senyawa besi oksida.",
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
          hint: "Menghasilkan energi radiasi panas dan cahaya.",
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
          hint: "Memiliki badai Bintik Merah Raksasa.",
          category: "Planet Gas Raksasa",
          pairTarget: "Jupiter",
          word: "JUPITER",
          image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600&auto=format&fit=crop&q=80"
        },
        {
          id: "4",
          question: "Planet yang memiliki sistem cincin yang sangat indah dan mencolok adalah...",
          correctAnswer: "Saturnus",
          wrongAnswers: ["Neptunus", "Uranus", "Jupiter"],
          hint: "Cincinnya tersusun atas debu, es, dan batuan.",
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
          hint: "Menyebabkan pasang surut air laut di Bumi.",
          category: "Satelit Alami",
          pairTarget: "Bulan",
          word: "BULAN",
          image: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=600&auto=format&fit=crop&q=80"
        }
      ]
    }
  },
  {
    id: "demo-english-animals",
    title: "English Animal Vocabulary",
    description: "Match animals to their English names and habitats in a fun way!",
    subject: "Bahasa Inggris",
    template_default: "matchup",
    is_public: true,
    play_count: 85,
    settings: {
      timerSeconds: 40,
      lives: 3,
      shuffle: true,
      showAnswers: true
    },
    content: {
      items: [
        {
          id: "en-1",
          question: "The king of the jungle with a majestic mane",
          correctAnswer: "Lion",
          wrongAnswers: ["Tiger", "Cheetah", "Leopard"],
          category: "Carnivore",
          pairTarget: "Lion",
          word: "LION",
          image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&auto=format&fit=crop&q=80"
        },
        {
          id: "en-2",
          question: "The largest land animal with big ears and a long trunk",
          correctAnswer: "Elephant",
          wrongAnswers: ["Rhino", "Hippo", "Giraffe"],
          category: "Herbivore",
          pairTarget: "Elephant",
          word: "ELEPHANT",
          image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&auto=format&fit=crop&q=80"
        },
        {
          id: "en-3",
          question: "The tallest mammal with a very long neck",
          correctAnswer: "Giraffe",
          wrongAnswers: ["Zebra", "Camel", "Horse"],
          category: "Herbivore",
          pairTarget: "Giraffe",
          word: "GIRAFFE",
          image: "https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=600&auto=format&fit=crop&q=80"
        },
        {
          id: "en-4",
          question: "An intelligent sea creature that jumps and clicks",
          correctAnswer: "Dolphin",
          wrongAnswers: ["Shark", "Whale", "Seal"],
          category: "Marine Mammal",
          pairTarget: "Dolphin",
          word: "DOLPHIN",
          image: "https://images.unsplash.com/photo-1607153333879-c1a058256540?w=600&auto=format&fit=crop&q=80"
        }
      ]
    }
  },
  {
    id: "demo-matematika-dasar",
    title: "Tantangan Operasi Bilangan Matematika",
    description: "Uji kecepatan berhitung perkalian dan operasi dasar matematika.",
    subject: "Matematika",
    template_default: "wheel",
    is_public: true,
    play_count: 64,
    settings: {
      timerSeconds: 25,
      lives: 3,
      shuffle: true,
      showAnswers: true
    },
    content: {
      items: [
        {
          id: "m-1",
          question: "Berapa hasil dari 7 x 8?",
          correctAnswer: "56",
          wrongAnswers: ["54", "48", "64"],
          category: "Perkalian",
          pairTarget: "56",
          word: "56"
        },
        {
          id: "m-2",
          question: "Berapa hasil dari 9 x 6?",
          correctAnswer: "54",
          wrongAnswers: ["45", "63", "56"],
          category: "Perkalian",
          pairTarget: "54",
          word: "54"
        },
        {
          id: "m-3",
          question: "Berapa hasil dari 12 x 5?",
          correctAnswer: "60",
          wrongAnswers: ["50", "65", "70"],
          category: "Perkalian",
          pairTarget: "60",
          word: "60"
        },
        {
          id: "m-4",
          question: "Berapa akar kuadrat dari 144?",
          correctAnswer: "12",
          wrongAnswers: ["14", "16", "11"],
          category: "Akar Bilangan",
          pairTarget: "12",
          word: "12"
        }
      ]
    }
  }
];
