import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { Race, RaceSession, Post } from '@/types';
import { Countdown, SESSION_LABELS } from '@/components/countdown/Countdown';
import { PostCard } from '@/components/forum/PostCard';

type RaceDetail = Race & {
  sessions: RaceSession[];
  posts: (Post & { _count: { comments: number } })[];
};

async function getRace(slug: string): Promise<RaceDetail | null> {
  try {
    return await api.get<RaceDetail>(`/races/${slug}`);
  } catch {
    return null;
  }
}

function getNextSession(sessions: RaceSession[]): RaceSession | null {
  const now = new Date();
  return (
    sessions
      .filter((s) => new Date(s.startsAt) > now)
      .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())[0] ?? null
  );
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function RacePage({ params }: Props) {
  const { slug } = await params;
  const race = await getRace(slug);

  if (!race) notFound();

  const nextSession = getNextSession(race.sessions);
  const { circuit } = race;

  function formatLapRecord(ms: number | null): string {
    if (!ms) return '—';
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const millis = ms % 1000;
    return `${minutes}:${String(seconds).padStart(2, '0')}.${String(millis).padStart(3, '0')}`;
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-start gap-4">
        {race.flagUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={race.flagUrl} alt={race.country} className="w-16 h-auto rounded-lg mt-1" />
        )}
        <div>
          <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
            Round {race.round} · {race.season}
          </p>
          <h1 className="text-3xl font-bold mt-1">{race.name}</h1>
          <p className="text-zinc-400 mt-1">{circuit.city}, {circuit.country}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Circuit + Sessions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Circuit Info */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">🏁 {circuit.name}</h2>

            {circuit.layoutUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={circuit.layoutUrl}
                alt={`Layout do ${circuit.name}`}
                className="w-full max-h-48 object-contain mb-6 rounded"
              />
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Voltas', value: circuit.laps },
                { label: 'Comprimento', value: `${circuit.lengthKm} km` },
                { label: 'Recorde', value: formatLapRecord(circuit.lapRecordMs ?? null) },
                { label: 'Por', value: circuit.lapRecordBy ?? '—' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-zinc-800 rounded-lg p-3 text-center">
                  <p className="text-zinc-400 text-xs mb-1">{label}</p>
                  <p className="text-white font-mono font-semibold text-sm">{value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sessions */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">📅 Sessões</h2>
            <div className="space-y-2">
              {race.sessions.map((session) => {
                const isPast = new Date(session.startsAt) < new Date();
                const isNext = nextSession?.id === session.id;
                return (
                  <div
                    key={session.id}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 ${
                      isNext
                        ? 'bg-red-500/10 border border-red-500/30'
                        : isPast
                        ? 'opacity-50 bg-zinc-800/50'
                        : 'bg-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isNext && <span className="text-red-500 text-xs">▶</span>}
                      <span className="text-sm font-medium">
                        {SESSION_LABELS[session.type]}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-400 font-mono">
                      {new Date(session.startsAt).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right: Countdown + Forum Preview */}
        <div className="space-y-6">
          {/* Countdown */}
          {nextSession && (
            <section className="bg-zinc-900 border border-red-500/20 rounded-xl p-6 text-center">
              <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">
                {SESSION_LABELS[nextSession.type]}
              </p>
              <p className="text-zinc-500 text-xs font-mono mb-4">
                {new Date(nextSession.startsAt).toLocaleDateString('pt-BR')}
              </p>
              <Countdown targetDate={nextSession.startsAt} />
            </section>
          )}

          {/* Forum Preview */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">💬 Fórum</h2>
              <a
                href={`/races/${race.slug}/forum`}
                className="text-xs text-red-500 hover:text-red-400 transition"
              >
                Ver todos →
              </a>
            </div>
            {race.posts.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-zinc-500 text-sm mb-3">Nenhum debate ainda.</p>
                <a
                  href={`/races/${race.slug}/forum/new`}
                  className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg transition"
                >
                  Criar Tópico
                </a>
              </div>
            ) : (
              <div className="space-y-2">
                {race.posts.map((post) => (
                  <PostCard key={post.id} post={{ ...post, race: { id: race.id, name: race.name, slug: race.slug } }} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
