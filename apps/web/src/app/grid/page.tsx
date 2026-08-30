import { api } from '@/lib/api';
import { Team } from '@/types';

async function getTeams(): Promise<Team[]> {
  try {
    return await api.get<Team[]>('/teams');
  } catch {
    return [];
  }
}

export default async function GridPage() {
  const teams = await getTeams();

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold">Grid 2026</h1>
        <p className="text-zinc-400 mt-2">Pilotos e Equipes do Mundial de Fórmula 1</p>
      </header>

      <div className="space-y-12">
        {teams.map((team) => (
          <div key={team.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 lg:p-8 overflow-hidden relative">
            
            {/* Background Accent */}
            <div 
              className="absolute top-0 right-0 w-64 h-64 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"
              style={{ backgroundColor: team.color }}
            />

            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 relative z-10">
              
              {/* Team Info */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-1.5 h-12 rounded-full" 
                    style={{ backgroundColor: team.color }}
                  />
                  <div>
                    <h2 className="text-2xl font-bold">{team.name}</h2>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  {team.drivers?.map(driver => (
                    <div key={driver.id} className="flex items-center gap-4 bg-zinc-950/50 p-4 rounded-xl flex-1">
                      {driver.photoUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img 
                          src={driver.photoUrl} 
                          alt={`${driver.firstName} ${driver.lastName}`}
                          className="w-16 h-16 object-cover rounded-lg border-b-2"
                          style={{ borderColor: team.color }}
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-zinc-800 flex items-center justify-center">
                          <span className="text-xl font-bold text-zinc-600">{driver.number}</span>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-zinc-400">{driver.firstName}</p>
                        <p className="font-bold text-lg uppercase">{driver.lastName}</p>
                        <div className="text-xl font-black mt-1" style={{ color: team.color }}>
                          {driver.number}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Car Image */}
              {team.carUrl && (
                <div className="flex-1 flex justify-center lg:justify-end w-full lg:w-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={team.carUrl} 
                    alt={`Carro da equipe ${team.name}`}
                    className="max-w-full h-auto object-contain max-h-48 drop-shadow-2xl"
                  />
                </div>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
