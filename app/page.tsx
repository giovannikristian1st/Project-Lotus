'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { Activity } from '@/lib/types';
import { 
  Sparkles, 
  Play, 
  PlusCircle, 
  Compass, 
  HelpCircle, 
  Shuffle, 
  Grid, 
  Search, 
  ArrowRight,
  Flame,
  Award,
  Layers,
  CheckCircle2
} from 'lucide-react';

const TEMPLATES_INFO = [
  { id: 'quiz', name: 'Quiz Interaktif', icon: '❓', desc: 'Pilihan ganda dengan timer hitung mundur, nyawa hati, dan papan skor.' },
  { id: 'matchup', name: 'Menjodohkan', icon: '🧩', desc: 'Seret dan pasangkan kata/gambar ke target yang sesuai.' },
  { id: 'wheel', name: 'Roda Acak (Wheel)', icon: '🎡', desc: 'Roda putar fisika canvas dengan suara tik-tik dan opsi hilangkan pilihan.' },
  { id: 'openbox', name: 'Buka Kotak', icon: '🎁', desc: 'Kotak 3D bernomor yang dibuka satu per satu untuk menampilkan tantangan.' },
  { id: 'wordsearch', name: 'Cari Kata', icon: '🔍', desc: 'Kisi-kisi huruf matriks untuk menemukan kosakata tersembunyi.' },
  { id: 'anagram', name: 'Susun Huruf', icon: '🔤', desc: 'Ubin huruf teracak yang digeser posisinya untuk menyusun kata yang benar.' },
  { id: 'truefalse', name: 'Benar / Salah', icon: '⚡', desc: 'Uji respon cepat menentukan kebenaran suatu pernyataan.' },
  { id: 'flashcards', name: 'Kartu Hafalan', icon: '🎴', desc: 'Kartu bolak-balik 3D interaktif untuk review materi dan definisi.' },
  { id: 'groupsort', name: 'Pengelompokan', icon: '📁', desc: 'Kelompokkan item ke dalam ember kategori yang tepat.' },
  { id: 'whackamole', name: 'Pukul Tikus', icon: '🔨', desc: 'Pukul liang jawaban yang benar sebelum tenggelam kembali.' },
];

export default function HomePage() {
  const router = useRouter();
  const [pinCode, setPinCode] = useState('');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await db.getActivities();
      setActivities(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleJoinPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinCode.trim()) return;
    router.push(`/play/code/${pinCode.trim()}`);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-sm font-semibold">
          <Sparkles className="w-4 h-4 text-brand-500" />
          <span>Wordwall Versi Gratis & Tanpa Batas untuk Sekolah</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
          Buat Materi Sekali, Mainkan di <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">10 Template Game Edukasi</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Alternatif Wordwall 100% gratis didukung Supabase Database. Siswa langsung main tanpa perlu login, lengkap dengan rekap nilai dan papan peringkat real-time.
        </p>

        {/* Form Gabung PIN Siswa */}
        <div className="max-w-md mx-auto pt-4">
          <form onSubmit={handleJoinPin} className="flex gap-2 p-2 bg-white rounded-2xl shadow-lg border border-slate-200 focus-within:ring-2 focus-within:ring-brand-500">
            <input 
              type="text" 
              placeholder="Masukkan PIN Game (misal: 849201)"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              className="flex-1 px-4 py-3 bg-transparent text-slate-900 placeholder-slate-400 font-semibold focus:outline-none"
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Mainkan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <p className="text-xs text-slate-400 mt-2">Siswa cukup masukkan kode dari guru untuk langsung bertanding!</p>
        </div>
      </section>

      {/* Pustaka 10 Template Wordwall */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-6 h-6 text-brand-600" />
              <span>10 Template Game Interaktif Terpadu</span>
            </h2>
            <p className="text-sm text-slate-500">Satu set soal guru otomatis kompatibel dengan semua template di bawah ini:</p>
          </div>
          <Link href="/create" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
            <span>Mulai Buat</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TEMPLATES_INFO.map((tpl) => (
            <div key={tpl.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-300 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                  {tpl.icon}
                </div>
                <h3 className="font-bold text-slate-800 text-base mb-1">{tpl.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{tpl.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] font-bold text-brand-600">
                <span>File HTML Mandiri</span>
                <span className="ml-auto text-slate-400 font-mono">/games/{tpl.id}.html</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Katalog Kuis Siap Mainkan Langsung */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Flame className="w-6 h-6 text-amber-500" />
              <span>Aktivitas Populer Siap Dimainkan</span>
            </h2>
            <p className="text-sm text-slate-500">Uji coba langsung materi demo tanpa perlu registrasi</p>
          </div>
          <Link href="/create" className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white font-semibold text-sm rounded-xl hover:bg-slate-800 shadow-sm">
            <PlusCircle className="w-4 h-4" />
            <span>Buat Soal Baru</span>
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-400">Memuat materi kuis...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((act) => (
              <div key={act.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:border-brand-400 hover:shadow-lg transition-all">
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                      <span className="px-2.5 py-1 bg-brand-50 text-brand-700 rounded-full border border-brand-200">{act.subject}</span>
                      <span>{act.content?.items?.length || 0} Soal</span>
                    </div>
                    <h3 className="font-extrabold text-xl text-slate-900 mb-2 line-clamp-1">{act.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2 mb-4">{act.description}</p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Template bawaan: <strong className="text-slate-700 capitalize">{act.template_default}</strong></span>
                      <span>{act.play_count || 12}x dimainkan</span>
                    </div>

                    <div className="flex gap-2">
                      <Link 
                        href={`/play/${act.id}`}
                        className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>Mainkan Sekarang</span>
                      </Link>

                      <Link 
                        href={`/create?clone=${act.id}`}
                        className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl"
                        title="Gunakan materi ini sebagai template"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Keunggulan untuk Sekolah */}
      <section className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="max-w-3xl space-y-6">
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-400/30">
            Khusus Guru & Sekolah
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Semua Fitur Premium Wordwall, Gratis Sepenuhnya dengan Supabase
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm text-slate-300">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Tanpa Batas 5 Aktivitas:</strong> Buat puluhan aktivitas sepuasnya tanpa dipaksa berlangganan.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Kompresi Gambar Otomatis:</strong> Gambar soal otomatis dikecilkan hingga 90% sehingga hemat kuota gratis Supabase Storage.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Rekap Tugas & Deadline:</strong> Buat link tugas, pantau siapa siswa yang sudah mengerjakan, dan ekspor ke Excel/CSV.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Zero-Dependency SFX:</strong> Suara interaktif dihasilkan langsung oleh Web Audio API tanpa beban kuota internet.</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
