'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { Assignment } from '@/lib/types';
import { ArrowLeft, Clock, Calendar, CheckCircle, ShieldAlert } from 'lucide-react';

export default function PlayByCodePage() {
  const params = useParams();
  const router = useRouter();
  const code = params.code as string;

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadAssignment() {
      if (!code) return;
      const res = await db.getAssignmentByCode(code.trim());
      if (res) {
        setAssignment(res);
      } else {
        setError(`Tugas atau PIN "${code}" tidak ditemukan. Silakan periksa kembali kode dari guru.`);
      }
      setLoading(false);
    }
    loadAssignment();
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-slate-500 font-semibold">
        Mencari tugas dengan PIN {code}...
      </div>
    );
  }

  if (error || !assignment) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto text-3xl">
          ⚠️
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Kode PIN Tidak Ditemukan</h2>
        <p className="text-sm text-slate-500">{error || 'Kode tugas salah atau sudah kedaluwarsa.'}</p>
        <button 
          onClick={() => router.push('/')}
          className="px-6 py-2.5 bg-brand-600 text-white rounded-xl font-bold text-sm shadow-md"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const handleStartGame = () => {
    router.push(`/play/${assignment.activity_id}?assignment=${assignment.id}`);
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4 space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6 text-center">
        <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-3xl flex items-center justify-center mx-auto text-3xl shadow-inner">
          📝
        </div>

        <div>
          <span className="px-3 py-1 bg-brand-50 text-brand-700 text-xs font-bold rounded-full border border-brand-200">
            Penugasan Resmi Guru
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{assignment.title}</h1>
          <p className="text-sm text-slate-500 mt-1">{assignment.activity?.title}</p>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 grid grid-cols-2 gap-4 text-left text-xs">
          <div>
            <span className="text-slate-400 block font-semibold">Batas Waktu:</span>
            <span className="text-slate-700 font-bold text-sm">
              {assignment.deadline ? new Date(assignment.deadline).toLocaleString('id-ID') : 'Tidak Ada Batas Waktu'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block font-semibold">Waktu per Soal:</span>
            <span className="text-slate-700 font-bold text-sm">{assignment.timer_seconds || 30} Detik</span>
          </div>
        </div>

        <button
          onClick={handleStartGame}
          className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-lg rounded-2xl shadow-lg shadow-brand-500/30 transition-all hover:scale-[1.02]"
        >
          Mulai Kerjakan Tugas 🚀
        </button>
      </div>
    </div>
  );
}
