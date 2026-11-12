-- ==============================================================================
-- WORDWALL SEKOLAH - SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Jalankan skrip ini di SQL Editor pada Supabase Dashboard Anda.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABEL PROFILES (Profil Guru)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  school_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABEL ACTIVITIES (Katalog Kuis & Game Wordwall)
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  subject TEXT DEFAULT 'Umum',
  template_default TEXT NOT NULL DEFAULT 'quiz', -- 'quiz', 'matchup', 'wheel', 'openbox', 'wordsearch', 'anagram', 'truefalse', 'flashcards', 'groupsort', 'whackamole'
  content JSONB NOT NULL DEFAULT '{"items": []}'::jsonb,
  settings JSONB NOT NULL DEFAULT '{"timerSeconds": 30, "lives": 3, "shuffle": true, "showAnswers": true}'::jsonb,
  is_public BOOLEAN DEFAULT true,
  play_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABEL ASSIGNMENTS (Penugasan Guru ke Siswa)
CREATE TABLE IF NOT EXISTS public.assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  access_code TEXT UNIQUE NOT NULL, -- Kode unik 6 digit (misal: "849201")
  deadline TIMESTAMPTZ,
  show_answers_end BOOLEAN DEFAULT true,
  timer_seconds INTEGER DEFAULT 30,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TABEL RESULTS (Rekap Skor & Hasil Pengerjaan Siswa)
CREATE TABLE IF NOT EXISTS public.results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE,
  activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  student_class TEXT DEFAULT '-',
  score INTEGER NOT NULL DEFAULT 0,
  max_score INTEGER NOT NULL DEFAULT 0,
  time_taken_seconds INTEGER NOT NULL DEFAULT 0,
  answers_summary JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;

-- Policy Profiles: User bisa melihat dan edit profil sendiri
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Policy Activities:
-- 1. Semua orang (termasuk siswa tanpa login) bisa melihat activity yang public
CREATE POLICY "Public activities are viewable by everyone" ON public.activities
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);

-- 2. Guru bisa membuat activity
CREATE POLICY "Teachers can create activities" ON public.activities
  FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

-- 3. Guru bisa update & delete miliknya sendiri
CREATE POLICY "Teachers can update own activities" ON public.activities
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Teachers can delete own activities" ON public.activities
  FOR DELETE USING (auth.uid() = user_id);

-- Policy Assignments:
-- 1. Siapapun yang punya kode bisa membaca data assignment
CREATE POLICY "Anyone can view assignments by code" ON public.assignments
  FOR SELECT USING (true);

-- 2. Guru bisa mengelola penugasan miliknya
CREATE POLICY "Teachers can insert assignments" ON public.assignments
  FOR INSERT WITH CHECK (auth.uid() = teacher_id OR auth.uid() IS NULL);
CREATE POLICY "Teachers can update own assignments" ON public.assignments
  FOR UPDATE USING (auth.uid() = teacher_id);
CREATE POLICY "Teachers can delete own assignments" ON public.assignments
  FOR DELETE USING (auth.uid() = teacher_id);

-- Policy Results:
-- 1. Siswa (anonim) bisa insert hasil pengerjaan mereka
CREATE POLICY "Anyone can submit game results" ON public.results
  FOR INSERT WITH CHECK (true);

-- 2. Siapapun bisa melihat leaderboard untuk activity/assignment terkait
CREATE POLICY "Anyone can view results" ON public.results
  FOR SELECT USING (true);

-- ==============================================================================
-- 7. STORAGE BUCKET UNTUK GAMBAR SOAL
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('game-assets', 'game-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Policy Storage: Siapapun bisa melihat gambar (public access)
CREATE POLICY "Public Access Game Assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'game-assets');

-- Policy Storage: Siapapun yang login bisa upload gambar
CREATE POLICY "Authenticated users can upload game assets" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'game-assets');
