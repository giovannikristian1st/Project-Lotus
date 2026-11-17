-- ==============================================================================
-- LOTUSWALL SUPABASE DATABASE SCHEMA & SEED SCRIPT
-- ==============================================================================
-- Jalankan skrip ini di: Supabase Dashboard -> SQL Editor -> New Query -> Run
-- Kompatibel penuh dengan:
-- 1. Kunci Baru (Publishable Key: sb_publishable_...) -> Disarankan!
-- 2. Kunci Legacy (Anon Key: eyJ...) -> Tetap berfungsi hingga early 2027
-- CATATAN: JANGAN gunakan Secret Key (sb_secret_... / service_role) di web browser!
-- ==============================================================================

-- 1. Buat Tabel Guru (Teachers)
CREATE TABLE IF NOT EXISTS public.teachers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    subject TEXT DEFAULT 'IPA & Umum',
    school TEXT DEFAULT 'Sekolah LotusWall',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Buat Tabel Proyek Pembelajaran (Projects)
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    pin TEXT NOT NULL,
    teacher_id TEXT REFERENCES public.teachers(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    subject TEXT DEFAULT 'IPA / Sains',
    level TEXT DEFAULT 'SD',
    language TEXT DEFAULT 'id',
    template_type TEXT DEFAULT 'quiz',
    theme TEXT DEFAULT 'white',
    rules JSONB DEFAULT '{"hasLives": true, "livesCount": 3, "timeMode": "timer", "timerSeconds": 30, "shuffleQuestions": true, "shuffleAnswers": true}'::jsonb,
    questions JSONB DEFAULT '[]'::jsonb,
    is_public BOOLEAN DEFAULT true,
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk mempercepat pencarian PIN murid & penyaringan komunitas
CREATE INDEX IF NOT EXISTS idx_projects_pin ON public.projects(pin);
CREATE INDEX IF NOT EXISTS idx_projects_teacher ON public.projects(teacher_id);
CREATE INDEX IF NOT EXISTS idx_projects_community ON public.projects(is_public, is_deleted);

-- ==============================================================================
-- 3. PENGATURAN IZIN AKSES (Row Level Security / RLS)
-- ==============================================================================
-- Mengizinkan murid main game lewat PIN & guru simpan soal menggunakan Supabase Publishable Key / Anon Key
-- RLS memastikan Secret Key tidak pernah diperlukan di sisi browser client.

ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policy Teachers: Izinkan baca akun untuk verifikasi login & pendaftaran akun baru
DROP POLICY IF EXISTS "Public can view teachers" ON public.teachers;
CREATE POLICY "Public can view teachers" ON public.teachers FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can insert teacher" ON public.teachers;
CREATE POLICY "Public can insert teacher" ON public.teachers FOR INSERT WITH CHECK (true);

-- Policy Projects: Murid & Guru bisa membaca semua proyek publik yang tidak dihapus
DROP POLICY IF EXISTS "Anyone can read public projects" ON public.projects;
CREATE POLICY "Anyone can read public projects" ON public.projects FOR SELECT USING (is_deleted = false);

DROP POLICY IF EXISTS "Anyone can create projects" ON public.projects;
CREATE POLICY "Anyone can create projects" ON public.projects FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update projects" ON public.projects;
CREATE POLICY "Anyone can update projects" ON public.projects FOR UPDATE USING (true);

-- ==============================================================================
-- 4. SEED DATA: 1 AKUN GURU DEMO (username: demo, password: demo)
-- ==============================================================================
INSERT INTO public.teachers (id, name, username, email, password, subject, school)
VALUES (
    't-demo',
    'Guru Demo',
    'demo',
    'demo@lotuswall.com',
    'demo',
    'IPA & Umum',
    'Sekolah LotusWall'
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    username = EXCLUDED.username,
    email = EXCLUDED.email,
    password = EXCLUDED.password,
    subject = EXCLUDED.subject,
    school = EXCLUDED.school;

-- ==============================================================================
-- 5. SEED DATA: 3 PROYEK LENGKAP MILIK GURU DEMO (MASING-MASING 10 SOAL)
-- ==============================================================================

-- Proyek 1: Solar System & Space Exploration (Kuis Klasik - 10 Soal)
INSERT INTO public.projects (id, pin, teacher_id, title, subject, level, language, template_type, theme, rules, questions, is_public, is_deleted)
VALUES (
    'proj-1',
    '100101',
    't-demo',
    'Solar System & Space Exploration',
    'IPA / Sains',
    'SD',
    'en',
    'quiz',
    'white',
    '{"hasLives": true, "livesCount": 3, "timeMode": "timer", "timerSeconds": 30, "shuffleQuestions": true, "shuffleAnswers": true}'::jsonb,
    '[
        {"id":"q1","text":"Which planet in our solar system is famously called the Red Planet?","category":"Terrestrial Planet","options":[{"text":"Mars","isCorrect":true},{"text":"Venus","isCorrect":false},{"text":"Jupiter","isCorrect":false},{"text":"Mercury","isCorrect":false}]},
        {"id":"q2","text":"What star provides the light and gravitational center of our solar system?","category":"Star","options":[{"text":"The Sun","isCorrect":true},{"text":"Polaris","isCorrect":false},{"text":"The Moon","isCorrect":false},{"text":"Sirius","isCorrect":false}]},
        {"id":"q3","text":"Which of these are Gas Giant planets? (Select all that apply)","category":"Gas Giant","options":[{"text":"Jupiter","isCorrect":true},{"text":"Saturn","isCorrect":true},{"text":"Earth","isCorrect":false},{"text":"Mars","isCorrect":false}]},
        {"id":"q4","text":"What is the hottest planet in our solar system due to its thick atmosphere?","category":"Terrestrial Planet","options":[{"text":"Venus","isCorrect":true},{"text":"Mercury","isCorrect":false},{"text":"Mars","isCorrect":false},{"text":"Jupiter","isCorrect":false}]},
        {"id":"q5","text":"Which planet is famous for its large, bright ring system made of ice and rock?","category":"Gas Giant","options":[{"text":"Saturn","isCorrect":true},{"text":"Neptune","isCorrect":false},{"text":"Uranus","isCorrect":false},{"text":"Jupiter","isCorrect":false}]},
        {"id":"q6","text":"What is Earths only natural satellite that causes ocean tides?","category":"Satellite","options":[{"text":"The Moon","isCorrect":true},{"text":"Europa","isCorrect":false},{"text":"Titan","isCorrect":false},{"text":"Phobos","isCorrect":false}]},
        {"id":"q7","text":"What celestial body was reclassified in 2006 as a dwarf planet in the Kuiper Belt?","category":"Dwarf Planet","options":[{"text":"Pluto","isCorrect":true},{"text":"Ceres","isCorrect":false},{"text":"Eris","isCorrect":false},{"text":"Haumea","isCorrect":false}]},
        {"id":"q8","text":"What natural phenomenon occurs when the Moon passes directly between the Earth and the Sun?","category":"Astronomy","options":[{"text":"Solar Eclipse","isCorrect":true},{"text":"Lunar Eclipse","isCorrect":false},{"text":"Meteor Shower","isCorrect":false},{"text":"Equinox","isCorrect":false}]},
        {"id":"q9","text":"Which planet is known as an Ice Giant and has an axis that tilts on its side?","category":"Ice Giant","options":[{"text":"Uranus","isCorrect":true},{"text":"Neptune","isCorrect":false},{"text":"Saturn","isCorrect":false},{"text":"Mars","isCorrect":false}]},
        {"id":"q10","text":"What is the largest planet in our solar system, famous for its Great Red Spot?","category":"Gas Giant","options":[{"text":"Jupiter","isCorrect":true},{"text":"Saturn","isCorrect":false},{"text":"Earth","isCorrect":false},{"text":"Neptune","isCorrect":false}]}
    ]'::jsonb,
    true,
    false
)
ON CONFLICT (id) DO UPDATE SET
    pin = EXCLUDED.pin,
    teacher_id = EXCLUDED.teacher_id,
    title = EXCLUDED.title,
    subject = EXCLUDED.subject,
    level = EXCLUDED.level,
    language = EXCLUDED.language,
    template_type = EXCLUDED.template_type,
    theme = EXCLUDED.theme,
    rules = EXCLUDED.rules,
    questions = EXCLUDED.questions,
    is_public = EXCLUDED.is_public,
    is_deleted = EXCLUDED.is_deleted;

-- Proyek 2: Tebas Buah: Satwa & Ekosistem Nusantara (Tebas Buah - 10 Soal)
INSERT INTO public.projects (id, pin, teacher_id, title, subject, level, language, template_type, theme, rules, questions, is_public, is_deleted)
VALUES (
    'proj-2',
    '100102',
    't-demo',
    'Tebas Buah: Satwa & Ekosistem Nusantara',
    'IPA / Sains',
    'SD',
    'id',
    'fruitninja',
    'white',
    '{"hasLives": true, "livesCount": 3, "timeMode": "stopwatch", "timerSeconds": 0, "shuffleQuestions": true, "shuffleAnswers": true}'::jsonb,
    '[
        {"id":"q-fn1","text":"Hewan mamalia terbesar di dunia yang hidup di lautan adalah...","category":"Mamalia","options":[{"text":"Paus Biru","isCorrect":true},{"text":"Hiu Putih","isCorrect":false},{"text":"Gajah Laut","isCorrect":false}]},
        {"id":"q-fn2","text":"Organ pernapasan utama pada ikan air tawar dan laut adalah...","category":"Anatomi","options":[{"text":"Insang","isCorrect":true},{"text":"Paru-paru","isCorrect":false},{"text":"Kulit","isCorrect":false}]},
        {"id":"q-fn3","text":"Zat hijau daun yang membantu tumbuhan memasak makanan lewat fotosintesis disebut...","category":"Botani","options":[{"text":"Klorofil","isCorrect":true},{"text":"Oksigen","isCorrect":false},{"text":"Glukosa","isCorrect":false}]},
        {"id":"q-fn4","text":"Kadal terbesar di dunia yang merupakan satwa purba asli Nusa Tenggara Timur adalah...","category":"Reptil","options":[{"text":"Komodo","isCorrect":true},{"text":"Biawak Air","isCorrect":false},{"text":"Iguana","isCorrect":false}]},
        {"id":"q-fn5","text":"Burung endemik Papua yang terkenal dengan keindahan bulu ekor hiasnya adalah...","category":"Burung","options":[{"text":"Cendrawasih","isCorrect":true},{"text":"Kasuari","isCorrect":false},{"text":"Merak Jawa","isCorrect":false}]},
        {"id":"q-fn6","text":"Kera besar berambut kemerahan yang hidup di hutan Sumatera dan Kalimantan adalah...","category":"Primata","options":[{"text":"Orangutan","isCorrect":true},{"text":"Bekantan","isCorrect":false},{"text":"Siamang","isCorrect":false}]},
        {"id":"q-fn7","text":"Tumbuhan parasit langka raksasa tanpa akar dan daun yang ditemukan di Bengkulu adalah...","category":"Botani","options":[{"text":"Rafflesia Arnoldii","isCorrect":true},{"text":"Bunga Bangkai","isCorrect":false},{"text":"Kantung Semar","isCorrect":false}]},
        {"id":"q-fn8","text":"Mamalia bercula satu yang sangat langka dan dilindungi di Taman Nasional Ujung Kulon adalah...","category":"Konservasi","options":[{"text":"Badak Jawa","isCorrect":true},{"text":"Tapir","isCorrect":false},{"text":"Anoa","isCorrect":false}]},
        {"id":"q-fn9","text":"Hewan khas Sulawesi yang berbadan kecil menyerupai kerbau liar bertanduk runcing adalah...","category":"Mamalia","options":[{"text":"Anoa","isCorrect":true},{"text":"Babirusa","isCorrect":false},{"text":"Kancil","isCorrect":false}]},
        {"id":"q-fn10","text":"Proses penguapan air laut dan sungai menjadi uap air oleh sinar matahari disebut...","category":"Siklus Air","options":[{"text":"Evaporasi","isCorrect":true},{"text":"Kondensasi","isCorrect":false},{"text":"Presipitasi","isCorrect":false}]}
    ]'::jsonb,
    true,
    false
)
ON CONFLICT (id) DO UPDATE SET
    pin = EXCLUDED.pin,
    teacher_id = EXCLUDED.teacher_id,
    title = EXCLUDED.title,
    subject = EXCLUDED.subject,
    level = EXCLUDED.level,
    language = EXCLUDED.language,
    template_type = EXCLUDED.template_type,
    theme = EXCLUDED.theme,
    rules = EXCLUDED.rules,
    questions = EXCLUDED.questions,
    is_public = EXCLUDED.is_public,
    is_deleted = EXCLUDED.is_deleted;

-- Proyek 3: AI Motion Hand Slicer: Everyday Science Trivia (Game Kamera AI - 10 Soal)
INSERT INTO public.projects (id, pin, teacher_id, title, subject, level, language, template_type, theme, rules, questions, is_public, is_deleted)
VALUES (
    'proj-3',
    '100103',
    't-demo',
    'AI Motion Hand Slicer: Everyday Science Trivia',
    'IPA / Sains',
    'SMP',
    'en',
    'ai-slicer',
    'white',
    '{"hasLives": true, "livesCount": 3, "timeMode": "timer", "timerSeconds": 30, "shuffleQuestions": true, "shuffleAnswers": true}'::jsonb,
    '[
        {"id":"q-ais-1","text":"Which gas do humans inhale from the air to stay alive?","category":"Biology","options":[{"text":"Oxygen","isCorrect":true},{"text":"Nitrogen","isCorrect":false},{"text":"Helium","isCorrect":false},{"text":"Methane","isCorrect":false}]},
        {"id":"q-ais-2","text":"At standard atmospheric pressure, water boils at what Celsius temperature?","category":"Physics","options":[{"text":"100°C","isCorrect":true},{"text":"50°C","isCorrect":false},{"text":"0°C","isCorrect":false},{"text":"212°C","isCorrect":false}]},
        {"id":"q-ais-3","text":"How many legs does an insect such as an ant, bee, or butterfly have?","category":"Zoology","options":[{"text":"Six","isCorrect":true},{"text":"Eight","isCorrect":false},{"text":"Four","isCorrect":false},{"text":"Ten","isCorrect":false}]},
        {"id":"q-ais-4","text":"What force pulls dropped objects downward toward the center of planet Earth?","category":"Physics","options":[{"text":"Gravity","isCorrect":true},{"text":"Magnetism","isCorrect":false},{"text":"Friction","isCorrect":false},{"text":"Centrifugal","isCorrect":false}]},
        {"id":"q-ais-5","text":"What state of matter is water steam or air trapped inside a balloon?","category":"Chemistry","options":[{"text":"Gas","isCorrect":true},{"text":"Liquid","isCorrect":false},{"text":"Solid","isCorrect":false},{"text":"Plasma","isCorrect":false}]},
        {"id":"q-ais-6","text":"Which essential mineral makes human bones and teeth strong and healthy?","category":"Health","options":[{"text":"Calcium","isCorrect":true},{"text":"Iron","isCorrect":false},{"text":"Sodium","isCorrect":false},{"text":"Potassium","isCorrect":false}]},
        {"id":"q-ais-7","text":"What is the closest star to our planet Earth?","category":"Astronomy","options":[{"text":"The Sun","isCorrect":true},{"text":"Proxima Centauri","isCorrect":false},{"text":"Betelgeuse","isCorrect":false},{"text":"Sirius","isCorrect":false}]},
        {"id":"q-ais-8","text":"What simple machine consists of a grooved wheel with a rope to lift heavy loads?","category":"Mechanics","options":[{"text":"Pulley","isCorrect":true},{"text":"Lever","isCorrect":false},{"text":"Wedge","isCorrect":false},{"text":"Screw","isCorrect":false}]},
        {"id":"q-ais-9","text":"Which clean energy source is captured directly from sunlight using solar panels?","category":"Energy","options":[{"text":"Solar Energy","isCorrect":true},{"text":"Geothermal","isCorrect":false},{"text":"Wind Power","isCorrect":false},{"text":"Fossil Fuel","isCorrect":false}]},
        {"id":"q-ais-10","text":"What muscular organ pumps oxygen-rich blood throughout the human body?","category":"Human Body","options":[{"text":"Heart","isCorrect":true},{"text":"Lungs","isCorrect":false},{"text":"Liver","isCorrect":false},{"text":"Kidneys","isCorrect":false}]}
    ]'::jsonb,
    true,
    false
)
ON CONFLICT (id) DO UPDATE SET
    pin = EXCLUDED.pin,
    teacher_id = EXCLUDED.teacher_id,
    title = EXCLUDED.title,
    subject = EXCLUDED.subject,
    level = EXCLUDED.level,
    language = EXCLUDED.language,
    template_type = EXCLUDED.template_type,
    theme = EXCLUDED.theme,
    rules = EXCLUDED.rules,
    questions = EXCLUDED.questions,
    is_public = EXCLUDED.is_public,
    is_deleted = EXCLUDED.is_deleted;
