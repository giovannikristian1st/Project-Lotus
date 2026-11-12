'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { Assignment, GameResult } from '@/lib/types';
import { 
  ArrowLeft, 
  Download, 
  Trophy, 
  Clock, 
  Users, 
  CheckCircle, 
  Award, 
  FileSpreadsheet,
  Share2
} from 'lucide-react';

export default function AssignmentResultsPage() {
  const params = useParams();
  const router = useRouter();
  const assignmentId = params.id as string;

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [results, setResults] = useState<GameResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResultsData() {
      setLoading(true);
      // Ambil assignment
      let foundAsg: Assignment | null = null;
      if (typeof window !== 'undefined') {
        const storedAssignments: Assignment[] = JSON.parse(localStorage.getItem('wordwall_assignments') || '[]');
        foundAsg = storedAssignments.find(a => a.id === assignmentId) || null;
      }
      setAssignment(foundAsg);

      if (foundAsg) {
        // Ambil hasil untuk assignment ini atau activity terkait
        const res = await db.getResults(foundAsg.activity_id, assignmentId);
        setResults(res);
      }
      setLoading(false);
    }
    loadResultsData();
  }, [assignmentId]);

  // Ekspor ke CSV / Excel
  const exportToCsv = () => {
    if (results.length === 0) {
      alert('Belum ada data nilai untuk diekspor!');
      return;
    }

    const headers = ['Peringkat', 'Nama Siswa', 'Kelas', 'Skor Poin', 'Waktu Pengerjaan (Detik)', 'Tanggal Selesai'];
    const rows = results.map((r, idx) => [
      idx + 1,
      `"${r.student_name}"`,
      `"${r.student_class || '-'}"`,
      r.score,
      r.time_taken_seconds,
      `"${new Date(r.completed_at).toLocaleString('id-ID')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_Nilai_${assignment?.title.replace(/[^a-zA-Z0-9]/g, '_') || 'Tugas'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-slate-500 font-semibold">
        Memuat rekapitulasi nilai tugas...
      </div>
    );
  }

  const avgScore = results.length > 0 
    ? Math.round(results.reduce((acc, curr) => acc + curr.score, 0) / results.length) 
    : 0;

  const highestScore = results.length > 0
    ? Math.max(...results.map(r => r.score))
    : 0;

  const avgTime = results.length > 0
    ? Math.round(results.reduce((acc, curr) => acc + curr.time_taken_seconds, 0) / results.length)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push('/dashboard')}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-indigo-100 text-indigo-800 rounded-full">
              PIN Tugas: {assignment?.access_code || '-'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Rekapitulasi Nilai: {assignment?.title || 'Tugas Kelas'}
            </h1>
          </div>
        </div>

        <button
          onClick={exportToCsv}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md flex items-center gap-2 self-start sm:self-center transition-all"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Ekspor ke Excel / CSV</span>
        </button>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl">
            👥
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{results.length}</div>
            <div className="text-xs font-semibold text-slate-500">Siswa Mengerjakan</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl">
            🏆
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{highestScore} pts</div>
            <div className="text-xs font-semibold text-slate-500">Nilai Tertinggi</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">
            📊
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{avgScore} pts</div>
            <div className="text-xs font-semibold text-slate-500">Rata-Rata Kelas</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
            ⏱️
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{avgTime}s</div>
            <div className="text-xs font-semibold text-slate-500">Rata-Rata Waktu</div>
          </div>
        </div>
      </div>

      {/* Tabel Rincian Nilai Siswa */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Daftar Hasil Siswa</h2>

        {results.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm">
            Belum ada siswa yang menyelesaikan tugas ini. Berikan kode PIN <strong>{assignment?.access_code}</strong> kepada siswa untuk mulai mengerjakan.
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
                  <th className="py-3 px-4 text-right">Waktu Selesai</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {results.map((r, idx) => (
                  <tr key={r.id || idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold">
                      {idx === 0 ? '🥇 1' : idx === 1 ? '🥈 2' : idx === 2 ? '🥉 3' : idx + 1}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{r.student_name}</td>
                    <td className="py-3.5 px-4 text-slate-500">{r.student_class || '-'}</td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-emerald-600">{r.score} pts</td>
                    <td className="py-3.5 px-4 text-right text-slate-500">{r.time_taken_seconds} detik</td>
                    <td className="py-3.5 px-4 text-right text-xs text-slate-400">
                      {new Date(r.completed_at).toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
