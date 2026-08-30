import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';

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
        <Navbar />

        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="border-t border-zinc-800 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center text-zinc-500 text-sm">
            SectorSplit · Não afiliado à FIA ou Formula One Management ·{' '}
            <a
              href="https://github.com/JeffersonLudwig/SectorSplit"
              className="hover:text-red-500 transition"
            >
              GitHub
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
