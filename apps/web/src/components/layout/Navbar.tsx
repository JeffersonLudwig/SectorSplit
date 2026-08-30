'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { User } from '@/types';
import { useTheme } from '@/components/layout/ThemeProvider';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('ss_user');
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, [pathname]);

  function handleLogout() {
    localStorage.removeItem('ss_token');
    localStorage.removeItem('ss_user');
    setUser(null);
    setMenuOpen(false);
    router.push('/');
    router.refresh();
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-red-500">⬡</span>
          <span className="text-white">SectorSplit</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link href="/grid" className="text-sm text-zinc-400 hover:text-white transition hidden sm:block">
            Equipes
          </Link>
          <Link href="/calendar" className="text-sm text-zinc-400 hover:text-white transition hidden sm:block">
            Calendário
          </Link>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Alternar tema"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 transition text-zinc-400 hover:text-white"
          >
            {theme === 'dark' ? (
              /* Sun icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 110 10A5 5 0 0112 7z" />
              </svg>
            ) : (
              /* Moon icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 text-sm bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg transition"
              >
                <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold uppercase">
                  {user.username[0]}
                </div>
                <span className="text-zinc-200 max-w-[120px] truncate hidden sm:block">{user.username}</span>
                <svg className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${menuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-zinc-700">
                    <p className="text-xs text-zinc-500">Logado como</p>
                    <p className="text-sm text-white font-medium truncate">{user.username}</p>
                    {user.role === 'ADMIN' && (
                      <span className="text-xs text-red-400 font-medium">Admin</span>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-zinc-800 transition"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login" className="text-sm text-zinc-300 hover:text-white transition px-3 py-1.5">
                Entrar
              </Link>
              <Link href="/auth/register" className="text-sm bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded-lg transition font-medium">
                Cadastrar
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
