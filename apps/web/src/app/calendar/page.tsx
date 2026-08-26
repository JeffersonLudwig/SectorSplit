import { api } from '@/lib/api';
import { Race, RaceSession } from '@/types';
import { RaceCard } from '@/components/calendar/RaceCard';

type RaceWithSessions = Race & { sessions: RaceSession[] };

async function getRaces(): Promise<RaceWithSessions[]> {
  try {
    return await api.get<RaceWithSessions[]>('/races');
  } catch {
    return [];
  }
}

export const metadata = {
  title: 'Calendário 2026 — SectorSplit',
};

export default async function CalendarPage() {
  const races = await getRaces();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Calendário 2026</h1>
        <p className="text-zinc-400">
          {races.length} Grandes Prêmios · Temporada de Fórmula 1
        </p>
      </div>

      {races.length === 0 ? (
        <div className="text-center py-16 text-zinc-500">
          <p className="text-4xl mb-4">📅</p>
          <p>Nenhuma corrida encontrada.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {races.map((race) => (
            <RaceCard key={race.id} race={race} />
          ))}
        </div>
      )}
    </div>
  );
}
