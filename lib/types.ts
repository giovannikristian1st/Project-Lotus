export type GameTemplate = 
  | 'quiz' 
  | 'quiz-powerup'
  | 'fruitninja'
  | 'matchup' 
  | 'wheel' 
  | 'openbox' 
  | 'wordsearch' 
  | 'anagram' 
  | 'truefalse' 
  | 'flashcards' 
  | 'groupsort' 
  | 'whackamole';

export interface QuestionItem {
  id: string;
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
  hint?: string;
  image?: string;
  category?: string;
  pairTarget?: string;
  word?: string; // Untuk anagram & wordsearch
}

export interface ActivitySettings {
  timerSeconds: number;
  lives: number;
  shuffle: boolean;
  showAnswers: boolean;
}

export interface Activity {
  id: string;
  user_id?: string;
  title: string;
  description: string;
  subject: string;
  template_default: GameTemplate;
  content: {
    items: QuestionItem[];
  };
  settings: ActivitySettings;
  is_public: boolean;
  play_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Assignment {
  id: string;
  activity_id: string;
  teacher_id?: string;
  title: string;
  access_code: string; // 6 digit kode akses unik (misal: "849201")
  deadline?: string;
  show_answers_end: boolean;
  timer_seconds: number;
  is_active: boolean;
  created_at?: string;
  activity?: Activity;
}

export interface GameResult {
  id: string;
  assignment_id?: string | null;
  activity_id: string;
  student_name: string;
  student_class?: string;
  score: number;
  max_score: number;
  percentage?: number;
  time_taken_seconds: number;
  answers_summary?: any[];
  completed_at: string;
}
