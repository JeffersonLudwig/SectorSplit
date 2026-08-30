import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      {/* F1 flag decoration */}
      <div className="text-6xl mb-6 select-none">🏁</div>

      <h1 className="text-8xl font-black text-red-500 font-mono leading-none mb-2">404</h1>
      <h2 className="text-2xl font-bold text-white mb-3">Página não encontrada</h2>
      <p className="text-zinc-400 max-w-sm mb-8">
        Parece que você saiu da pista. A página que você procura não existe ou foi movida.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-2.5 rounded-xl transition"
        >
          🏠 Voltar ao início
        </Link>
        <Link
          href="/calendar"
          className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-6 py-2.5 rounded-xl transition"
        >
          📅 Ver calendário
        </Link>
      </div>

      {/* Subtle decoration */}
      <div className="mt-12 flex gap-1 opacity-20 select-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className={`w-5 h-5 ${i % 2 === 0 ? 'bg-white' : 'bg-zinc-800'}`}
          />
        ))}
      </div>
    </div>
  );
}
