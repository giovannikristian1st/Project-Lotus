'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { Gamepad2, Sparkles, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (!isSupabaseConfigured || !supabase) {
      // Demo Mode Login
      localStorage.setItem('teacher_session', JSON.stringify({
        email: email || 'guru.demo@sekolah.sch.id',
        name: fullName || 'Guru LotusWall',
        mode: 'demo'
      }));
      router.push('/dashboard');
      return;
    }

    try {
      if (isRegister) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName }
          }
        });
        if (error) throw error;
        alert('Pendaftaran berhasil! Silakan periksa email Anda untuk verifikasi atau langsung login.');
        setIsRegister(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        router.push('/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan autentikasi');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    localStorage.setItem('teacher_session', JSON.stringify({
      email: 'guru.teladan@sekolah.sch.id',
      name: 'Ibu Guru Pertiwi',
      mode: 'demo'
    }));
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4 space-y-8">
      
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-brand-500/20">
          <Gamepad2 className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {isRegister ? 'Daftar Akun Guru' : 'Masuk ke LotusWall'}
        </h1>
        <p className="text-xs text-slate-500">
          Platform gamifikasi kuis edukasi gratis untuk guru dan sekolah
        </p>
      </div>

      {/* Info Status Supabase */}
      {!isSupabaseConfigured && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 space-y-2">
          <div className="font-bold flex items-center gap-1.5">
            <span>💡 Mode Demo Lokal Aktif</span>
          </div>
          <p>
            Kunci Supabase belum diatur di <code>.env.local</code>. Anda dapat langsung masuk menggunakan <strong>Mode Demo</strong> dengan 1 klik di bawah untuk mencoba dashboard tanpa konfigurasi!
          </p>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors shadow-sm"
          >
            Masuk Cepat Sebagai Guru Demo 🚀
          </button>
        </div>
      )}

      {/* Form Login / Register */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Prasetyo, S.Pd."
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Sekolah / Pribadi</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="guru@sekolah.sch.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Kata Sandi</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-xl shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Memproses...' : isRegister ? 'Daftar Sekarang' : 'Masuk Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs font-bold text-brand-700 hover:underline"
          >
            {isRegister ? 'Sudah punya akun? Masuk di sini' : 'Belum punya akun? Buat akun guru gratis'}
          </button>
        </div>
      </div>

    </div>
  );
}
