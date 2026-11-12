import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Gamepad2, PlusCircle, LayoutDashboard, Sparkles, UserCircle } from 'lucide-react';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'Wordwall Sekolah - Gamifikasi Pembelajaran Interaktif Gratis',
  description: 'Platform edukasi gratis setara Wordwall untuk guru dan sekolah di Indonesia. Buat kuis interaktif, roda acak, menjodohkan, dan rekap nilai siswa.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={poppins.variable}>
      <body className="font-sans antialiased flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-brand-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                  LotusWall
                </span>
                <span className="hidden sm:inline-block ml-1.5 px-2 py-0.5 text-[10px] font-bold bg-brand-100 text-brand-800 rounded-full uppercase tracking-wider">
                  Sekolah Gratis
                </span>
              </div>
            </Link>

            {/* Nav Menu */}
            <nav className="flex items-center gap-2 sm:gap-4">
              <Link 
                href="/create" 
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Buat Aktivitas</span>
              </Link>
              
              <Link 
                href="/dashboard" 
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline">Dashboard Guru</span>
              </Link>

              <Link 
                href="/auth" 
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <UserCircle className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline">Akun</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1">
          {children}
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span><strong>LotusWall</strong> &copy; {new Date().getFullYear()} - Didedikasikan untuk Guru & Siswa Indonesia</span>
            </div>
            <div className="flex gap-6 text-slate-400 text-xs">
              <span>Database PostgreSQL Supabase</span>
              <span>10 Standalone HTML5 Game Engines</span>
              <span>Format Soal Terpadu</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
