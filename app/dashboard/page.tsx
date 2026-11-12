'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { Activity, Assignment } from '@/lib/types';
import { 
  PlusCircle, 
  Play, 
  Trash2, 
  Edit, 
  Share2, 
  FileText, 
  Users, 
  Award, 
  Clock, 
  CheckCircle, 
  Copy,
  ExternalLink,
  BookOpen
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal Buat Tugas Baru
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    setLoading(true);
    const acts = await db.getActivities();
    setActivities(acts);

    // Ambil daftar penugasan dari localStorage atau Supabase
    if (typeof window !== 'undefined') {
      const storedAssignments = JSON.parse(localStorage.getItem('wordwall_assignments') || '[]');
      setAssignments(storedAssignments);
    }
    setLoading(false);
  }

  const handleDeleteActivity = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus aktivitas kuis ini?')) {
      await db.deleteActivity(id);
      loadDashboardData();
    }
  };

  const openCreateAssignmentModal = (act: Activity) => {
    setSelectedActivity(act);
    setAssignmentTitle(`Tugas: ${act.title}`);
    setIsModalOpen(true);
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedActivity) return;

    // Generate kode PIN 6 digit unik
    const randomPin = String(Math.floor(100000 + Math.random() * 900000));
    const newAssignment: Assignment = {
      id: 'asg_' + Date.now(),
      activity_id: selectedActivity.id,
      title: assignmentTitle.trim() || selectedActivity.title,
      access_code: randomPin,
      deadline: deadlineDate ? new Date(deadlineDate).toISOString() : undefined,
      show_answers_end: true,
      timer_seconds: selectedActivity.settings?.timerSeconds || 30,
      is_active: true,
      created_at: new Date().toISOString(),
      activity: selectedActivity
    };

    await db.createAssignment(newAssignment);
    setIsModalOpen(false);
    loadDashboardData();
    alert(`Penugasan berhasil dibuat!\nPIN Siswa: ${randomPin}\nBagikan PIN ini atau link ke siswa.`);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Dashboard Guru</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola materi pembelajaran, bagikan tugas, dan pantau rekap nilai siswa</p>
        </div>

        <Link
          href="/create"
          className="px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-2xl shadow-md shadow-brand-500/20 flex items-center gap-2 self-start sm:self-center transition-all hover:scale-105"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Buat Aktivitas Baru</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center text-2xl">
            📚
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{activities.length}</div>
            <div className="text-xs font-semibold text-slate-500">Total Aktivitas Game</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl">
            📝
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{assignments.length}</div>
            <div className="text-xs font-semibold text-slate-500">Penugasan Aktif</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl">
            🏆
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">10 Template</div>
            <div className="text-xs font-semibold text-slate-500">Format Game Terpadu</div>
          </div>
        </div>
      </div>

      {/* Bagian Penugasan Ber-PIN (Assignments) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <span>Daftar Penugasan Siswa</span>
            </h2>
            <p className="text-xs text-slate-400">Bagikan kode PIN 6-digit kepada siswa untuk mulai mengerjakan</p>
          </div>
        </div>

        {assignments.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-sm">
            Belum ada tugas yang dibuat. Klik tombol <strong>"Beri Tugas"</strong> pada salah satu aktivitas kuis di bawah untuk membuat PIN tugas kelas.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignments.map((asg) => (
              <div key={asg.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 hover:border-indigo-300 transition-all">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base line-clamp-1">{asg.title}</h3>
                    <p className="text-xs text-slate-500">{asg.activity?.title}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                    Aktif
                  </span>
                </div>

                {/* PIN Code Box */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Kode PIN Siswa:</span>
                    <span className="text-xl font-extrabold tracking-widest text-indigo-600 font-mono">{asg.access_code}</span>
                  </div>
                  <button
                    onClick={() => copyCode(asg.access_code)}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Salin PIN"
                  >
                    {copiedCode === asg.access_code ? <CheckCircle className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/assignments/${asg.id}`}
                    className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl text-center shadow-sm"
                  >
                    Rekap Nilai Siswa 📊
                  </Link>
                  <Link
                    href={`/play/code/${asg.access_code}`}
                    target="_blank"
                    className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl"
                    title="Buka Halaman Tugas"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bagian Daftar Aktivitas / Game Milik Guru */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-brand-600" />
          <span>Aktivitas Kuis & Game Saya</span>
        </h2>

        {loading ? (
          <div className="py-12 text-center text-slate-400">Memuat materi...</div>
        ) : activities.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
            <div className="text-4xl">🎨</div>
            <h3 className="text-lg font-bold text-slate-800">Belum Ada Aktivitas</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">Mulai buat game edukasi pertama Anda sekarang. Gratis dan mudah digunakan!</p>
            <Link href="/create" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-xl font-bold text-sm shadow-md">
              <PlusCircle className="w-4 h-4" />
              <span>Buat Aktivitas Pertama</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((act) => (
              <div key={act.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 bg-brand-100 text-brand-800 font-bold rounded-full">{act.subject}</span>
                    <span className="text-slate-400 font-semibold">{act.content?.items?.length || 0} Soal</span>
                  </div>

                  <h3 className="font-extrabold text-lg text-slate-900 line-clamp-1">{act.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{act.description || 'Tidak ada deskripsi'}</p>
                </div>

                <div className="space-y-3 pt-5 border-t border-slate-100 mt-5">
                  <div className="flex gap-2">
                    <Link
                      href={`/play/${act.id}`}
                      className="flex-1 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Mainkan</span>
                    </Link>

                    <button
                      onClick={() => openCreateAssignmentModal(act)}
                      className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Beri Tugas</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-xs text-slate-400">
                    <Link href={`/create?clone=${act.id}`} className="hover:text-slate-700 flex items-center gap-1">
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>

                    <button
                      onClick={() => handleDeleteActivity(act.id)}
                      className="hover:text-red-600 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Buat Penugasan (Assignment) */}
      {isModalOpen && selectedActivity && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto text-2xl">
                📌
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">Beri Penugasan Siswa</h3>
              <p className="text-xs text-slate-500">Sistem akan membuat kode PIN 6 digit unik untuk kelas Anda</p>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Tugas</label>
                <input
                  type="text"
                  required
                  value={assignmentTitle}
                  onChange={(e) => setAssignmentTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tenggat Waktu / Deadline (Opsional)</label>
                <input
                  type="datetime-local"
                  value={deadlineDate}
                  onChange={(e) => setDeadlineDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md"
                >
                  Buat PIN Tugas 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
