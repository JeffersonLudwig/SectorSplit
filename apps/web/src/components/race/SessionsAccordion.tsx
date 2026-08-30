'use client';

import { useState } from 'react';
import { RaceSession, SESSION_LABELS } from '@/types';

interface Props {
  sessions: RaceSession[];
  nextSession: RaceSession | null;
}

export function SessionsAccordion({ sessions, nextSession }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function toggle(id: string) {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  }

  return (
    <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">📅 Sessões</h2>
      <div className="space-y-2">
        {sessions.map((session) => {
          const isPast = new Date(session.startsAt) < new Date();
          const isNext = nextSession?.id === session.id;
          const hasResults = isPast && session.results && session.results.length > 0;
          const isExpanded = expandedId === session.id;

          return (
            <div key={session.id} className="overflow-hidden">
              <button
                onClick={() => hasResults && toggle(session.id)}
                className={`w-full flex items-center justify-between rounded-lg px-4 py-3 transition-colors ${
                  isNext
                    ? 'bg-red-500/10 border border-red-500/30'
                    : isPast
                    ? 'bg-zinc-800/50 hover:bg-zinc-800'
                    : 'bg-zinc-800 opacity-70 cursor-not-allowed'
                } ${isExpanded && 'rounded-b-none'}`}
                disabled={!hasResults && !isPast}
              >
                <div className="flex items-center gap-3">
                  {isNext && <span className="text-red-500 text-xs">▶</span>}
                  <span className={`text-sm font-medium text-zinc-100 ${isPast && !hasResults ? 'opacity-50' : ''}`}>
                    {SESSION_LABELS[session.type?.toUpperCase()] || String(session.type)}
                  </span>
                  {hasResults && (
                    <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded-full ml-2">
                      Ver Resultados
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-zinc-400 font-mono">
                    {new Date(session.startsAt).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  {hasResults && (
                    <svg
                      className={`w-4 h-4 text-zinc-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
              </button>

              {/* Accordion Content: Results Table */}
              {isExpanded && hasResults && (
                <div className="bg-zinc-950/50 border border-t-0 border-zinc-800 rounded-b-lg p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="text-xs uppercase text-zinc-500 border-b border-zinc-800/50">
                          <th className="py-2 px-2 font-medium w-12 text-center">Pos</th>
                          <th className="py-2 px-4 font-medium">Piloto</th>
                          <th className="py-2 px-4 font-medium">Equipe</th>
                          <th className="py-2 px-4 font-medium">Tempo / Status</th>
                          <th className="py-2 px-4 font-medium text-right">Pts</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/30">
                        {session.results?.map(res => (
                          <tr key={res.id} className="hover:bg-zinc-800/20 transition-colors">
                            <td className="py-2 px-2 font-mono font-bold text-zinc-400 text-center">
                              {res.position}
                            </td>
                            <td className="py-2 px-4">
                              <div className="flex items-center gap-2">
                                {res.driver.photoUrl ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img 
                                    src={res.driver.photoUrl} 
                                    alt={res.driver.lastName} 
                                    className="w-6 h-6 rounded-full object-cover bg-zinc-800"
                                  />
                                ) : (
                                  <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-400">
                                    {res.driver.number}
                                  </div>
                                )}
                                <span className="font-medium text-zinc-200">
                                  {res.driver.firstName} {res.driver.lastName}
                                </span>
                              </div>
                            </td>
                            <td className="py-2 px-4">
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-1 h-3 rounded-full" 
                                  style={{ backgroundColor: res.driver.team?.color || '#333' }}
                                />
                                <span className="text-zinc-400 text-xs">
                                  {res.driver.team?.name || '—'}
                                </span>
                              </div>
                            </td>
                            <td className="py-2 px-4 font-mono text-zinc-300">
                              {res.timeStr || res.status || '—'}
                            </td>
                            <td className="py-2 px-4 font-bold text-zinc-400 text-right">
                              {res.points ? `+${res.points}` : '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
