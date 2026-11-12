# LotusWall - Wordwall Versi Gratis untuk Sekolah

Platform gamifikasi pembelajaran interaktif gratis tanpa batasan kuota untuk guru dan sekolah, dibangun menggunakan **Next.js (App Router)**, pustaka **10 Standalone HTML5 Game Engines** di `/public/games/`, dan **Supabase Database**.

---

## 🌟 Fitur Utama

1. **Unified Content Format (Format Soal Terpadu):**
   * Guru menginput materi/soal **1 kali saja**, dan konten tersebut otomatis dapat dimainkan di **10 template game berbeda** secara instan.
2. **10 Standalone HTML5 Game Engines (`/public/games/`):**
   * Setiap game dibuat sebagai file HTML5 & JavaScript mandiri terpisah dari indeks:
     - `quiz.html`: Kuis Pilihan Ganda berwaktu, nyawa, skor bonus, dan leaderboard.
     - `matchup.html`: Menjodohkan (Match Up) kartu drag & drop interaktif.
     - `wheel.html`: Roda Acak (Random Wheel) fisika canvas, audio putar, dan opsi eliminasi pilihan.
     - `openbox.html`: Buka Kotak (Open the Box) 3D bernomor dengan animasi flip.
     - `wordsearch.html`: Cari Kata di kisi huruf matriks dengan drag highlight.
     - `anagram.html`: Susun Huruf (Anagram) ubin huruf teracak dengan sistem klik & tukar (click & switch).
     - `truefalse.html`: Benar atau Salah cepat berwaktu dengan detak audio tegang.
     - `flashcards.html`: Kartu Hafalan (Flip Tiles) bolak-balik 3D review materi.
     - `groupsort.html`: Pengelompokan Kategori drag & drop ke ember klasifikasi.
     - `whackamole.html`: Pukul Tikus (Whack-a-Mole) memukul jawaban benar yang muncul dari lubang.
3. **Web Audio API Synthesizer SFX:**
   * Suara interaktif (benar, salah, tick timer, putaran roda, fanfare menang, hit) diproduksi secara sintetis matematis tanpa memuat file MP3 eksternal — nol latensi, hemat kuota internet sekolah, dan 100% andal offline.
4. **Auto-Compression Gambar Client-Side:**
   * Sebelum foto di-upload guru, sistem otomatis me-resize dan mengompresnya di browser ke format WebP (~80 KB). Hasilnya: **sangat hemat kuota gratis 1 GB Supabase Storage** (cukup untuk ribuan soal bergambar oleh 50+ guru).
5. **Akses Siswa Tanpa Login:**
   * Siswa dapat langsung bermain melalui tautan game atau memasukkan **Kode PIN 6 Digit**.
6. **Portal Guru & Rekap Nilai:**
   * Manajemen aktivitas, pembuatan penugasan dengan batas waktu, analisis statistik kelas, dan **Ekspor ke Excel / CSV**.

---

## 🚀 Panduan Menjalankan Proyek

### 1. Jalankan di Lingkungan Lokal
```bash
# Jalankan development server
npm run dev
```
Buka browser di `http://localhost:3000`.

Aplikasi dilengkapi dengan **Mode Demo Lokal Otomatis** sehingga dapat langsung dimainkan dan diuji tanpa konfigurasi database awal!

### 2. Konfigurasi Database Supabase (Opsional tapi Direkomendasikan)
1. Buat project gratis baru di [supabase.com](https://supabase.com).
2. Buka menu **SQL Editor** di dashboard Supabase Anda.
3. Buka file `supabase/schema.sql` di proyek ini, salin seluruh kodenya, lalu klik **Run** di Supabase SQL Editor.
4. Salin URL project dan Anon Key dari **Project Settings -> API**.
5. Masukkan ke file `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
6. Restart development server (`npm run dev`). Aplikasi akan otomatis beralih ke cloud Supabase!

---

## 📁 Struktur Direktori Proyek

```
CKTC LOTUS PROJECT/
├── app/
│   ├── layout.tsx                     # Root layout & navbar
│   ├── globals.css                    # Tailwind CSS directives
│   ├── page.tsx                       # Homepage & input PIN siswa
│   ├── auth/page.tsx                  # Login / Registrasi Guru (Supabase Auth)
│   ├── create/page.tsx                # Creator Studio (Editor Soal Terpadu)
│   ├── dashboard/page.tsx             # Dashboard Guru & Penugasan
│   ├── dashboard/assignments/[id]/    # Rekapitulasi Nilai & Ekspor CSV
│   ├── play/[id]/page.tsx             # Universal Player + Wordwall Template Switcher
│   └── play/code/[code]/page.tsx      # Akses Siswa via PIN 6-digit
├── public/
│   └── games/                         # Standalone HTML5 Engines
│       ├── common/
│       │   ├── sfx.js                 # Web Audio API Sound Synthesizer
│       │   ├── bridge.js              # Universal Game Adapter & Messaging
│       │   └── confetti.js            # Efek Confetti Kanvas
│       ├── quiz.html
│       ├── matchup.html
│       ├── wheel.html
│       ├── openbox.html
│       ├── wordsearch.html
│       ├── anagram.html
│       ├── truefalse.html
│       ├── flashcards.html
│       ├── groupsort.html
│       └── whackamole.html
├── lib/
│   ├── types.ts                       # Model data TypeScript
│   ├── image-compress.ts              # Utilitas kompresi gambar hemat kuota
│   ├── mock-data.ts                   # Koleksi soal demo bawaan
│   ├── db.ts                          # Database layer terpadu (Supabase + LocalStorage)
│   └── supabase/client.ts             # Supabase Client JS
├── supabase/
│   └── schema.sql                     # Skrip SQL tabel, RLS, & bucket Supabase
└── package.json
```
