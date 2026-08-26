import Link from 'next/link';
import { Race, RaceSession } from '@/types';

interface RaceCardProps {
  race: Race & { sessions: RaceSession[] };
}

function getStatus(sessions: RaceSession[]): 'past' | 'upcoming' | 'next' {
  const now = new Date();
  const race = sessions.find((s) => s.type === 'RACE');
  if (!race) return 'past';

  const raceDate = new Date(race.startsAt);
  if (raceDate < now) return 'past';

  // Next upcoming race: check if it's within 7 days
  const diffDays = (raceDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  if (diffDays <= 7) return 'next';

  return 'upcoming';
}

export function RaceCard({ race }: RaceCardProps) {
  const status = getStatus(race.sessions);
  const raceSession = race.sessions.find((s) => s.type === 'RACE');
  const raceDate = raceSession ? new Date(raceSession.startsAt) : null;

  const statusStyles = {
    past: 'border-zinc-700 opacity-60',
    upcoming: 'border-zinc-600 hover:border-red-500',
    next: 'border-red-500 shadow-lg shadow-red-500/10',
  };

  const statusBadge = {
    past: null,
    upcoming: null,
    next: (
      <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">
        Próxima
      </span>
    ),
  };

  return (
    <Link href={`/races/${race.slug}`}>
      <div
        className={`bg-zinc-900 border rounded-xl p-5 transition-all duration-200 cursor-pointer ${statusStyles[status]}`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {race.flagUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={race.flagUrl}
                alt={race.country}
                className="w-8 h-auto rounded-sm"
              />
            )}
            <span className="text-xs text-zinc-500 font-mono">
              R{String(race.round).padStart(2, '0')}
            </span>
          </div>
          {statusBadge[status]}
        </div>

        <h3 className="text-white font-semibold text-sm leading-snug mb-1">
          {race.name}
        </h3>
        <p className="text-zinc-400 text-xs mb-3">{race.circuit.name}</p>

        {raceDate && (
          <p className="text-zinc-500 text-xs font-mono">
            {raceDate.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        )}
      </div>
    </Link>
  );
}
