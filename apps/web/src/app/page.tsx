import { api } from '@/lib/api';
import { RaceSession, SESSION_LABELS } from '@/types';
import { Countdown } from '@/components/countdown/Countdown';
import Link from 'next/link';

interface NextSession extends RaceSession {
  race: {
    id: string;
    name: string;
    slug: string;
    country: string;
    flagUrl: string | null;
    circuit: { name: string; city: string };
  };
}

async function getNextSession(): Promise<NextSession | null> {
  try {
    return await api.get<NextSession>('/sessions/next');
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const nextSession = await getNextSession();

  return (
    <div className="space-y-12">
      {/* Hero — Next Session Countdown */}
      <section className="text-center py-12">
        <p className="text-zinc-500 text-sm uppercase tracking-widest mb-2">
          Próxima Sessão
        </p>

        {nextSession ? (
          <>
            <div className="flex items-center justify-center gap-3 mb-2">
              {nextSession.race.flagUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={nextSession.race.flagUrl}
                  alt={nextSession.race.country}
                  className="w-8 h-auto rounded"
                />
              )}
              <h1 className="text-2xl font-bold text-white">
                {nextSession.race.name}
              </h1>
            </div>

            <p className="text-zinc-400 text-sm mb-2">
              {SESSION_LABELS[nextSession.type]} ·{' '}
              {nextSession.race.circuit.name}
            </p>

            <p className="text-zinc-500 text-xs font-mono mb-8">
              {new Date(nextSession.startsAt).toLocaleString('pt-BR', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short',
              })}
            </p>

            <Countdown targetDate={nextSession.startsAt} />

            <div className="mt-6">
              <a
                href={`/races/${nextSession.race.slug}`}
                className="text-sm text-red-500 hover:text-red-400 transition underline underline-offset-4"
              >
                Ver detalhes do GP →
              </a>
            </div>
          </>
        ) : (
          <div className="text-zinc-400 py-8">
            <p className="text-4xl mb-4">🏁</p>
            <p>Temporada encerrada. Até 2027!</p>
          </div>
        )}
      </section>

      {/* CTA Forum */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold mb-2">Fórum de Debates</h2>
        <p className="text-zinc-400 text-sm mb-6">
          Discuta cada Grande Prêmio com outros fãs. Análises, opiniões e muito mais.
        </p>
        <a
          href="/calendar"
          className="inline-block bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-2.5 rounded-lg transition"
        >
          Ver Calendário
        </a>
      </section>
    </div>
  );
}
