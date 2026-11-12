'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '@/lib/db';
import { compressImage } from '@/lib/image-compress';
import { Activity, GameTemplate, QuestionItem } from '@/lib/types';
import { 
  Plus, 
  Trash2, 
  Save, 
  Sparkles, 
  ArrowLeft, 
  Upload
} from 'lucide-react';

const SUBJECT_OPTIONS = [
  'Umum / Tematik',
  'Sains / IPA',
  'Matematika',
  'Bahasa Indonesia',
  'Bahasa Inggris',
  'IPS / Sejarah',
  'Pendidikan Agama',
  'Seni & Prakarya',
  'PJOK / Olahraga'
];

const TEMPLATE_OPTIONS: { id: GameTemplate; label: string; icon: string }[] = [
  { id: 'quiz', label: 'Quiz Pilihan Ganda', icon: '❓' },
  { id: 'matchup', label: 'Menjodohkan', icon: '🧩' },
  { id: 'wheel', label: 'Roda Acak (Wheel)', icon: '🎡' },
  { id: 'openbox', label: 'Buka Kotak', icon: '🎁' },
  { id: 'wordsearch', label: 'Cari Kata', icon: '🔍' },
  { id: 'anagram', label: 'Susun Huruf', icon: '🔤' },
  { id: 'truefalse', label: 'Benar / Salah', icon: '⚡' },
  { id: 'flashcards', label: 'Kartu Hafalan', icon: '🎴' },
  { id: 'groupsort', label: 'Pengelompokan', icon: '📁' },
  { id: 'whackamole', label: 'Pukul Tikus', icon: '🔨' },
];

function CreateActivityContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cloneId = searchParams.get('clone');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('Umum / Tematik');
  const [templateDefault, setTemplateDefault] = useState<GameTemplate>('quiz');
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [lives, setLives] = useState(3);
  const [shuffle, setShuffle] = useState(true);

  const [items, setItems] = useState<QuestionItem[]>([
    {
      id: '1',
      question: '',
      correctAnswer: '',
      wrongAnswers: ['', '', ''],
      category: '',
      image: ''
    }
  ]);

  const [saving, setSaving] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);

  useEffect(() => {
    if (cloneId) {
      db.getActivityById(cloneId).then(act => {
        if (act) {
          setTitle(`${act.title} (Salinan)`);
          setDescription(act.description);
          setSubject(act.subject);
          setTemplateDefault(act.template_default);
          setTimerSeconds(act.settings?.timerSeconds || 30);
          setLives(act.settings?.lives || 3);
          setItems(act.content?.items || []);
        }
      });
    }
  }, [cloneId]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: String(Date.now()),
        question: '',
        correctAnswer: '',
        wrongAnswers: ['', '', ''],
        category: '',
        image: ''
      }
    ]);
  };

  const removeItem = (index: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, idx) => idx !== index));
  };

  const updateItem = (index: number, field: keyof QuestionItem, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const updateWrongAnswer = (itemIdx: number, wrongIdx: number, val: string) => {
    const updated = [...items];
    const wrongs = [...(updated[itemIdx].wrongAnswers || ['', '', ''])];
    wrongs[wrongIdx] = val;
    updated[itemIdx].wrongAnswers = wrongs;
    setItems(updated);
  };

  const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIdx(index);
    try {
      const compressed = await compressImage(file, 800, 800, 0.8);
      const uploadedUrl = await db.uploadGameAsset(compressed.file, file.name);
      updateItem(index, 'image', uploadedUrl);
    } catch (err) {
      console.error('Upload image error:', err);
      alert('Gagal mengunggah gambar. Silakan coba kembali.');
    } finally {
      setUploadingIdx(null);
    }
  };

  const prefillSample = () => {
    setTitle('Kuis Cerdas Cermat Nusantara');
    setDescription('Latihan soal kebudayaan dan letak geografis Indonesia');
    setSubject('IPS / Sejarah');
    setItems([
      {
        id: '1',
        question: 'Ibu kota negara Indonesia yang baru di Kalimantan Timur bernama...',
        correctAnswer: 'Nusantara (IKN)',
        wrongAnswers: ['Balikpapan', 'Samarinda', 'Pontianak'],
        category: 'Geografi',
        word: 'NUSANTARA'
      },
      {
        id: '2',
        question: 'Candi Buddha terbesar di dunia yang terletak di Magelang adalah...',
        correctAnswer: 'Borobudur',
        wrongAnswers: ['Prambanan', 'Mendut', 'Penataran'],
        category: 'Sejarah',
        word: 'BOROBUDUR'
      },
      {
        id: '3',
        question: 'Danau vulkanik terbesar di Asia Tenggara yang terletak di Sumatera Utara adalah...',
        correctAnswer: 'Danau Toba',
        wrongAnswers: ['Danau Singkarak', 'Danau Maninjau', 'Danau Ranau'],
        category: 'Geografi',
        word: 'TOBA'
      }
    ]);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Mohon isi judul aktivitas!');
      return;
    }

    const validItems = items.filter(i => i.question.trim() && i.correctAnswer.trim());
    if (validItems.length === 0) {
      alert('Harap isi minimal 1 pertanyaan dengan jawaban benar!');
      return;
    }

    const processedItems = validItems.map(item => ({
      ...item,
      pairTarget: item.pairTarget || item.correctAnswer,
      category: item.category || subject,
      word: item.word || item.correctAnswer.toUpperCase().replace(/[^A-Z0-9]/g, '')
    }));

    setSaving(true);
    const newActivity: Activity = {
      id: cloneId ? 'act_' + Date.now() : 'act_' + Date.now(),
      title: title.trim(),
      description: description.trim(),
      subject: subject,
      template_default: templateDefault,
      settings: {
        timerSeconds: Number(timerSeconds),
        lives: Number(lives),
        shuffle: Boolean(shuffle),
        showAnswers: true
      },
      content: {
        items: processedItems
      },
      is_public: true,
      created_at: new Date().toISOString()
    };

    const saved = await db.saveActivity(newActivity);
    setSaving(false);
    router.push(`/play/${saved.id}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={() => router.back()} 
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Studio Pembuat Aktivitas</h1>
            <p className="text-sm text-slate-500">Buat materi kuis sekali, otomatis kompatibel dengan 10 template game</p>
          </div>
        </div>

        <button 
          type="button"
          onClick={prefillSample}
          className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl flex items-center gap-1.5 self-start sm:self-center transition-colors"
        >
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>Isi Contoh Soal Cepat</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <span>📋</span>
            <span>Informasi Materi</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-bold text-slate-700">Judul Aktivitas *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Kuis Cerdas Cermat Tata Surya"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Mata Pelajaran</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold bg-white"
              >
                {SUBJECT_OPTIONS.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3 space-y-1">
              <label className="block text-xs font-bold text-slate-700">Petunjuk / Deskripsi Singkat</label>
              <input
                type="text"
                placeholder="Contoh: Jawablah pertanyaan berikut dengan teliti sebelum waktu habis!"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <span>⚙️</span>
            <span>Template Pembuka & Pengaturan Game</span>
          </h2>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">Pilih Template Bawaan (Siswa tetap bisa ganti template saat main):</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {TEMPLATE_OPTIONS.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => setTemplateDefault(tpl.id)}
                  className={`p-3 rounded-2xl border text-left flex flex-col items-center justify-center gap-1.5 transition-all ${
                    templateDefault === tpl.id 
                      ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold shadow-sm ring-2 ring-brand-500/30' 
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl">{tpl.icon}</span>
                  <span className="text-xs text-center">{tpl.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Waktu per Soal (Detik)</label>
              <input 
                type="number"
                min="5"
                max="180"
                value={timerSeconds}
                onChange={(e) => setTimerSeconds(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Jumlah Nyawa Siswa</label>
              <select
                value={lives}
                onChange={(e) => setLives(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-semibold bg-white"
              >
                <option value={1}>1 Nyawa (Hardcore)</option>
                <option value={3}>3 Nyawa (Standar)</option>
                <option value={5}>5 Nyawa (Santai)</option>
                <option value={0}>Tak Terbatas (Latihan)</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input 
                type="checkbox"
                id="shuffle"
                checked={shuffle}
                onChange={(e) => setShuffle(e.target.checked)}
                className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500"
              />
              <label htmlFor="shuffle" className="text-sm font-semibold text-slate-700 cursor-pointer">
                Acak Urutan Soal & Pilihan
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <span>📝</span>
              <span>Daftar Soal ({items.length})</span>
            </h2>
            <button
              type="button"
              onClick={addItem}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Soal</span>
            </button>
          </div>

          <div className="space-y-6">
            {items.map((item, idx) => (
              <div key={item.id || idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5 relative group">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="font-extrabold text-brand-700 text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-brand-100 flex items-center justify-center text-xs">
                      {idx + 1}
                    </span>
                    <span>Pertanyaan #{idx + 1}</span>
                  </span>

                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus Soal Ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="block text-xs font-bold text-slate-700">Pertanyaan / Kata *</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Ketik pertanyaan di sini..."
                      value={item.question}
                      onChange={(e) => updateItem(idx, 'question', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">Gambar Pendukung (Opsional)</label>
                    {item.image ? (
                      <div className="relative rounded-xl border border-slate-200 p-2 flex items-center gap-3 bg-slate-50">
                        <img src={item.image} alt="Preview" className="w-14 h-14 object-cover rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-emerald-600 truncate">Gambar terpasang</p>
                          <button
                            type="button"
                            onClick={() => updateItem(idx, 'image', '')}
                            className="text-[11px] text-red-500 hover:underline"
                          >
                            Hapus Gambar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center p-3 border-2 border-dashed border-slate-200 hover:border-brand-400 rounded-xl cursor-pointer bg-slate-50/50 hover:bg-brand-50/20 transition-all text-center">
                        <Upload className="w-5 h-5 text-slate-400 mb-1" />
                        <span className="text-xs font-bold text-slate-600">
                          {uploadingIdx === idx ? 'Mengompres...' : 'Unggah Foto'}
                        </span>
                        <span className="text-[10px] text-slate-400">Otomatis WebP (~80 KB)</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(idx, e)}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <span>✅ Jawaban Benar *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jawaban yang tepat"
                      value={item.correctAnswer}
                      onChange={(e) => updateItem(idx, 'correctAnswer', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-800 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-600">
                      Kategori (untuk Group Sort / Pengelompokan)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Planet Gas atau Herbivora"
                      value={item.category || ''}
                      onChange={(e) => updateItem(idx, 'category', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-800 text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <label className="block text-xs font-bold text-red-600">❌ Pilihan Jawaban Salah (Pengecoh untuk Kuis):</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[0, 1, 2].map((wIdx) => (
                        <input
                          key={wIdx}
                          type="text"
                          placeholder={`Pilihan Salah ${wIdx + 1}`}
                          value={item.wrongAnswers?.[wIdx] || ''}
                          onChange={(e) => updateWrongAnswer(idx, wIdx, e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-red-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addItem}
            className="w-full py-4 border-2 border-dashed border-slate-300 hover:border-brand-500 hover:bg-brand-50/50 rounded-3xl font-bold text-sm text-slate-600 flex items-center justify-center gap-2 transition-all"
          >
            <Plus className="w-5 h-5 text-brand-600" />
            <span>Tambah Pertanyaan Baru</span>
          </button>
        </div>

        <div className="sticky bottom-6 z-30 bg-white/95 backdrop-blur-md p-4 rounded-3xl border border-slate-200 shadow-xl flex items-center justify-between gap-4">
          <div className="text-xs text-slate-500 hidden sm:block">
            Materi akan disimpan dan langsung siap dimainkan oleh siswa
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-2xl shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Menyimpan...' : 'Simpan & Mainkan Aktivitas 🚀'}</span>
          </button>
        </div>

      </form>
    </div>
  );
}

export default function CreateActivityPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center text-slate-500 font-semibold">Memuat Studio Pembuat Aktivitas...</div>}>
      <CreateActivityContent />
    </Suspense>
  );
}
