import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SectorSplit — Fórmula 1',
  description:
    'Plataforma web de Fórmula 1 com calendário, countdown de sessões, dados de circuitos e fórum de debates por Grande Prêmio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-white min-h-screen`}
      >
        <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 font-bold text-lg">
              <span className="text-red-500">⬡</span>
              <span>SectorSplit</span>
            </a>
            <div className="flex items-center gap-6">
              <a href="/calendar" className="text-sm text-zinc-400 hover:text-white transition">
                Calendário
              </a>
              <a href="/auth/login" className="text-sm bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded-lg transition font-medium">
                Entrar
              </a>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="border-t border-zinc-800 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center text-zinc-500 text-sm">
            SectorSplit · Não afiliado à FIA ou Formula One Management ·{' '}
            <a href="https://github.com/JeffersonLudwig/SectorSplit" className="hover:text-red-500 transition">
              GitHub
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
