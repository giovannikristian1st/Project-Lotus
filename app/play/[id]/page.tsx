'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { db } from '@/lib/db';
import { Activity, GameTemplate, GameResult } from '@/lib/types';
import { 
  Maximize2, 
  Share2, 
  Trophy, 
  Layers, 
  ArrowLeft, 
  Check, 
  Copy, 
  User, 
  ExternalLink
} from 'lucide-react';

const TEMPLATES = [
  { id: 'quiz', label: 'Quiz Biasa', icon: '❓', desc: 'Pilihan ganda dengan timer hitung mundur' },
  { id: 'quiz-powerup', label: 'Quiz Power-Up', icon: '⚡', desc: 'Kuis dengan item 50:50, Freeze Time, 2x Poin' },
  { id: 'fruitninja', label: 'Fruit Slicer', icon: '🗡️', desc: 'Tebas buah jawaban yang meluncur di udara' },
  { id: 'flashcards', label: 'Flip Tiles', icon: '🎴', desc: 'Buka kartu & cari pasangan kata/jawaban' },
  { id: 'wheel', label: 'Roda Acak', icon: '🎡', desc: 'Roda putar fisika canvas dengan suara tik' },
  { id: 'matchup', label: 'Menjodohkan', icon: '🧩', desc: 'Pasangkan kartu ke slot yang cocok' },
  { id: 'openbox', label: 'Buka Kotak', icon: '🎁', desc: 'Kotak 3D bernomor dengan animasi buka' },
  { id: 'wordsearch', label: 'Cari Kata', icon: '🔍', desc: 'Temukan kata di kisi matriks huruf' },
  { id: 'anagram', label: 'Susun Huruf', icon: '🔤', desc: 'Geser ubin huruf acak menjadi kata tepat' },
  { id: 'truefalse', label: 'Benar / Salah', icon: '⚡', desc: 'Respon cepat benar atau salah' },
  { id: 'whackamole', label: 'Pukul Tikus', icon: '🔨', desc: 'Pukul jawaban benar saat muncul dari liang' },
  { id: 'groupsort', label: 'Pengelompokan', icon: '📁', desc: 'Kelompokkan ke ember kategori yang tepat' },
];

function PlayGameContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const activityId = params.id as string;

  const [activity, setActivity] = useState<Activity | null>(null);
  const [currentTemplate, setCurrentTemplate] = useState<GameTemplate>('quiz');
  const [loading, setLoading] = useState(true);
  
  // Player state
  const [playerName, setPlayerName] = useState('');
  const [playerClass, setPlayerClass] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'magical' | 'white'>('magical');
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isGamesModalOpen, setIsGamesModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  
  // Results
  const [leaderboard, setLeaderboard] = useState<GameResult[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentTplObj = TEMPLATES.find(t => t.id === currentTemplate) || TEMPLATES[0];

  const maxQuick = 4;
  const activeIndex = TEMPLATES.findIndex(t => t.id === currentTemplate);
  const quickTemplates = (activeIndex !== -1 && activeIndex >= maxQuick)
    ? [TEMPLATES[activeIndex], ...TEMPLATES.filter((_, i) => i !== activeIndex).slice(0, maxQuick - 1)]
    : TEMPLATES.slice(0, maxQuick);

  useEffect(() => {
    async function loadActivity() {
      const act = await db.getActivityById(activityId);
      if (act) {
        setActivity(act);
        const tplParam = searchParams.get('template') as GameTemplate;
        setCurrentTemplate(tplParam || act.template_default || 'quiz');

        const savedName = localStorage.getItem('player_name');
        const savedClass = localStorage.getItem('player_class');
        if (savedName) {
          setPlayerName(savedName);
          setPlayerClass(savedClass || '-');
        } else {
          setIsNameModalOpen(true);
        }

        const results = await db.getResults(act.id);
        setLeaderboard(results);
      }
      setLoading(false);
    }
    loadActivity();
  }, [activityId, searchParams]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === 'GAME_OVER') {
        const res: GameResult = {
          id: 'res_' + Date.now(),
          activity_id: activityId,
          assignment_id: event.data.assignmentId || null,
          student_name: event.data.studentName || playerName || 'Siswa',
          student_class: event.data.studentClass || playerClass || '-',
          score: event.data.score || 0,
          max_score: event.data.maxScore || 100,
          time_taken_seconds: event.data.timeTakenSeconds || 0,
          answers_summary: event.data.answersSummary || [],
          completed_at: new Date().toISOString()
        };

        db.submitResult(res).then(() => {
          db.getResults(activityId).then(setLeaderboard);
        });
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [activityId, playerName, playerClass]);

  const savePlayerInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    localStorage.setItem('player_name', playerName.trim());
    localStorage.setItem('player_class', playerClass.trim() || '-');
    setIsNameModalOpen(false);

    if (iframeRef.current && activity) {
      iframeRef.current.src = `/games/${currentTemplate}.html?id=${activity.id}&name=${encodeURIComponent(playerName)}&class=${encodeURIComponent(playerClass)}`;
    }
  };

  const handleSwitchTemplate = (tpl: GameTemplate) => {
    setCurrentTemplate(tpl);
    setIsPlaying(false); // Jangan langsung auto start setelah ganti game
  };

  const toggleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      }
    }
  };

  const copyShareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyEmbedCode = () => {
    const embedUrl = `${window.location.origin}/games/${currentTemplate}.html?id=${activityId}`;
    const code = `<iframe src="${embedUrl}" width="100%" height="600" frameborder="0" allow="camera; microphone; fullscreen; autoplay" allowfullscreen></iframe>`;
    navigator.clipboard.writeText(code);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  const handleSwitchTheme = (theme: 'magical' | 'white') => {
    setCurrentTheme(theme);
    if (iframeRef.current?.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage({
          type: 'THEME_CHANGE',
          theme: theme
        }, '*');
      } catch (e) {}
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-slate-500 font-semibold">
        Memuat game edukasi...
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Aktivitas Tidak Ditemukan</h2>
        <p className="text-sm text-slate-500">Materi kuis mungkin telah dihapus atau tautan salah.</p>
        <button onClick={() => router.push('/')} className="px-5 py-2.5 bg-brand-600 text-white rounded-xl font-bold">
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const iframeSrc = `/games/${currentTemplate}.html?id=${activity.id}&name=${encodeURIComponent(playerName || 'Siswa')}&class=${encodeURIComponent(playerClass || '-')}&theme=${currentTheme}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push('/')}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-brand-100 text-brand-800 rounded-full">{activity.subject}</span>
              <span className="text-xs text-slate-400">• {activity.content?.items?.length || 0} Soal</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">{activity.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={() => setIsNameModalOpen(true)}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl flex items-center gap-1.5"
            title="Ganti Nama Siswa"
          >
            <User className="w-4 h-4 text-slate-500" />
            <span className="max-w-[120px] truncate">{playerName || 'Pemain'}</span>
          </button>

          {isPlaying && (
            <button
              onClick={() => setIsPlaying(false)}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
              title="Kembali ke Layar Awal Play"
            >
              <span>🔄</span>
              <span className="hidden sm:inline">Ulangi Game</span>
            </button>
          )}

          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-xl flex items-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Bagikan</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"
            title="Layar Penuh"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-3 bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 relative aspect-[4/3] sm:aspect-[16/10] w-full flex items-center justify-center">
          {!isPlaying ? (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md p-6 text-center space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-500 to-indigo-600 text-white flex items-center justify-center text-4xl shadow-xl shadow-brand-500/30 animate-bounce">
                <span>{currentTplObj.icon || '🎮'}</span>
              </div>
              <div className="space-y-1">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-brand-500/20 text-brand-300 border border-brand-500/30 mb-2">
                  {currentTplObj.label}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activity.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Siap memainkan {currentTplObj.label} dengan {activity.content?.items?.length || 0} butir soal!
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="group px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xl rounded-2xl shadow-xl shadow-emerald-500/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer"
              >
                <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">▶</span>
                <span className="tracking-wider">PLAY GAME</span>
              </button>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              src={iframeSrc}
              className="w-full h-full border-none"
              allow="camera; microphone; fullscreen; autoplay"
              title={activity.title}
            />
          )}
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-600" />
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Ganti Game</h3>
                <p className="text-[11px] text-slate-400">Pilihan cepat format game:</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsGamesModalOpen(true)}
              className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200/60 transition-colors cursor-pointer"
              title="Klik untuk lihat semua game"
            >
              12 Game
            </button>
          </div>

          <div className="space-y-1.5">
            {quickTemplates.map((tpl) => {
              const isActive = currentTemplate === tpl.id;
              return (
                <button
                  key={tpl.id}
                  onClick={() => handleSwitchTemplate(tpl.id as GameTemplate)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left text-xs font-bold transition-all border cursor-pointer ${
                    isActive 
                      ? 'bg-brand-50 border-brand-500 shadow-sm ring-1 ring-brand-500 text-brand-900' 
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0 ${
                      isActive ? 'bg-brand-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700'
                    }`}>{tpl.icon}</span>
                    <span className="truncate">{tpl.label}</span>
                  </div>
                  {isActive && <span className="text-xs font-extrabold text-brand-600 shrink-0">✓</span>}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setIsGamesModalOpen(true)}
            className="w-full mt-2 py-2.5 px-3 rounded-2xl border-2 border-dashed border-slate-200 hover:border-brand-500 bg-slate-50/70 hover:bg-brand-50/50 text-slate-700 hover:text-brand-700 transition-all flex items-center justify-between gap-2 text-xs font-bold group shadow-2xs cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-white group-hover:bg-brand-100 border border-slate-200 group-hover:border-brand-200 flex items-center justify-center text-sm group-hover:scale-110 transition-transform shadow-2xs">✨</span>
              <span className="font-extrabold">More Games</span>
            </div>
            <span className="text-[10px] bg-white group-hover:bg-brand-100 border border-slate-200 group-hover:border-brand-200 px-2 py-0.5 rounded-full font-extrabold text-slate-500 group-hover:text-brand-700 transition-colors">
              Semua (12) ➔
            </span>
          </button>

          {/* PILIH TEMA VISUAL (Quick Theme Cards) */}
          <div className="border-t border-slate-100 pt-3 mt-2">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>🎨</span>
                <span>Pilih Tema</span>
              </h4>
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-extrabold shadow-2xs ${
                currentTheme === 'magical'
                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}>
                {currentTheme === 'magical' ? '🔮 Magical' : '⚪ Putih'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleSwitchTheme('white')}
                className={`p-2 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer text-center group ${
                  currentTheme === 'white'
                    ? 'bg-slate-50 border-slate-500 shadow-sm ring-1 ring-slate-400'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="w-7 h-7 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-sm shadow-2xs group-hover:scale-110 transition-transform">⚪</span>
                <span className="text-[11px] font-extrabold text-slate-800">Putih Bersih</span>
                <span className="text-[9px] text-slate-400">Klasik</span>
              </button>

              <button
                type="button"
                onClick={() => handleSwitchTheme('magical')}
                className={`p-2 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer text-center group ${
                  currentTheme === 'magical'
                    ? 'bg-purple-50/80 border-purple-500 shadow-sm ring-1 ring-purple-400'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="w-7 h-7 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-sm shadow-2xs group-hover:scale-110 transition-transform">🔮</span>
                <span className="text-[11px] font-extrabold text-purple-900">Magical World</span>
                <span className="text-[9px] text-purple-600 font-semibold">Ungu Ajaib</span>
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <a 
              href={`/games/${currentTemplate}.html?id=${activity.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Buka di Tab Baru (HTML)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            <div>
              <h3 className="text-lg font-bold text-slate-900">Papan Peringkat (Leaderboard)</h3>
              <p className="text-xs text-slate-400">Skor tertinggi dan kecepatan siswa dalam game ini</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {leaderboard.length} Pemain Tercatat
          </span>
        </div>

        {leaderboard.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-sm">
            Belum ada pemain yang menyelesaikan kuis ini. Jadilah yang pertama di papan peringkat!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase">
                  <th className="py-3 px-4">Peringkat</th>
                  <th className="py-3 px-4">Nama Siswa</th>
                  <th className="py-3 px-4">Kelas</th>
                  <th className="py-3 px-4 text-right">Skor Poin</th>
                  <th className="py-3 px-4 text-right">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {leaderboard.slice(0, 15).map((row, idx) => (
                  <tr key={row.id || idx} className={row.student_name === playerName ? 'bg-brand-50/70 font-bold' : ''}>
                    <td className="py-3 px-4">
                      {idx === 0 ? '🥇 #1' : idx === 1 ? '🥈 #2' : idx === 2 ? '🥉 #3' : `#${idx + 1}`}
                    </td>
                    <td className="py-3 px-4 text-slate-900">{row.student_name}</td>
                    <td className="py-3 px-4 text-slate-500">{row.student_class || '-'}</td>
                    <td className="py-3 px-4 text-right text-brand-600 font-bold">{row.score} pts</td>
                    <td className="py-3 px-4 text-right text-slate-500">{row.time_taken_seconds} detik</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isNameModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mx-auto text-2xl">
                🎓
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">Masukkan Nama Pemain</h3>
              <p className="text-xs text-slate-500">Nama dan kelas akan dicatat di papan peringkat kuis</p>
            </div>

            <form onSubmit={savePlayerInfo} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap Siswa</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kelas / Rombel</label>
                <input 
                  type="text" 
                  placeholder="Contoh: 7-B atau 8-IPA"
                  value={playerClass}
                  onChange={(e) => setPlayerClass(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNameModalOpen(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm"
                >
                  Main Anonim
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-sm shadow-md"
                >
                  Mulai Main 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-indigo-600" />
                <span>Bagikan Game Ini</span>
              </h3>
              <button onClick={() => setIsShareModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tautan Langsung Siswa (Direct URL):</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    readOnly
                    value={typeof window !== 'undefined' ? window.location.href : ''}
                    className="flex-1 px-3 py-2 text-xs bg-slate-100 rounded-xl font-mono text-slate-600 border border-slate-200"
                  />
                  <button 
                    onClick={copyShareLink}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? 'Tersalin' : 'Salin'}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kode Embed Iframe (untuk LMS Google Classroom / Moodle / Web Sekolah):</label>
                <div className="flex gap-2">
                  <textarea 
                    readOnly
                    rows={2}
                    value={`<iframe src="${typeof window !== 'undefined' ? window.location.origin : ''}/games/${currentTemplate}.html?id=${activityId}" width="100%" height="600" frameborder="0" allow="camera; microphone; fullscreen; autoplay" allowfullscreen></iframe>`}
                    className="flex-1 px-3 py-2 text-xs bg-slate-100 rounded-xl font-mono text-slate-600 border border-slate-200 resize-none"
                  />
                  <button 
                    onClick={copyEmbedCode}
                    className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0"
                  >
                    {copiedEmbed ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedEmbed ? 'Tersalin' : 'Salin Iframe'}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => setIsShareModalOpen(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Semua Game (More Games) */}
      {isGamesModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsGamesModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl p-6 sm:p-7 max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center text-2xl shadow-2xs border border-brand-100">
                  🎮
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-extrabold text-slate-900">Pilih Template Game</h3>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-brand-50 text-brand-700 border border-brand-200">12 Mini Game</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Pilih salah satu format permainan untuk langsung beralih dan memainkan soal:</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsGamesModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                title="Tutup Modal"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 overflow-y-auto max-h-[60vh] pr-1 py-1">
              {TEMPLATES.map((tpl) => {
                const isActive = currentTemplate === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => {
                      handleSwitchTemplate(tpl.id as GameTemplate);
                      setIsGamesModalOpen(false);
                    }}
                    className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-2.5 group cursor-pointer ${
                      isActive 
                        ? 'bg-brand-50 border-brand-500 ring-2 ring-brand-500/20 shadow-md' 
                        : 'bg-white border-slate-200 hover:border-brand-400 hover:bg-slate-50 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-2xs ${
                        isActive ? 'bg-brand-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 group-hover:bg-brand-50 group-hover:text-brand-600'
                      }`}>
                        {tpl.icon}
                      </div>
                      {isActive ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-600 text-white flex items-center gap-1 shadow-2xs">
                          <span>✓</span><span>Aktif</span>
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-slate-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all">
                          Pilih ➔
                        </span>
                      )}
                    </div>
                    <div>
                      <div className={`text-xs font-extrabold ${isActive ? 'text-brand-900' : 'text-slate-800 group-hover:text-brand-700'}`}>
                        {tpl.label}
                      </div>
                      <div className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
                        {tpl.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span>💡</span>
                <span>Klik salah satu game untuk langsung beralih. Soal otomatis menyesuaikan.</span>
              </div>
              <button
                type="button"
                onClick={() => setIsGamesModalOpen(false)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function PlayGamePage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center text-slate-500 font-semibold">Memuat Game Interaktif...</div>}>
      <PlayGameContent />
    </Suspense>
  );
}
