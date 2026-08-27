'use client';

import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function getTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, total: diff };
}

interface CountdownProps {
  targetDate: string;
}

const SESSION_LABELS: Record<string, string> = {
  PRACTICE_1: 'Treino Livre 1',
  PRACTICE_2: 'Treino Livre 2',
  PRACTICE_3: 'Treino Livre 3',
  QUALIFYING: 'Qualificação',
  SPRINT_QUALIFYING: 'Sprint Qualifying',
  SPRINT: 'Sprint',
  RACE: 'Corrida',
};

export function Countdown({ targetDate }: CountdownProps) {
  // Start as null to avoid hydration mismatch — only calculate on client
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Set initial value on client
    setTimeLeft(getTimeLeft(targetDate));

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // Render placeholder while server-rendering (prevents hydration mismatch)
  if (!timeLeft) {
    return (
      <div className="flex gap-3 justify-center">
        {['Dias', 'Horas', 'Min', 'Seg'].map((label) => (
          <div
            key={label}
            className="flex flex-col items-center bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 min-w-[72px]"
          >
            <span className="text-3xl font-mono font-bold text-red-500 tabular-nums">
              --
            </span>
            <span className="text-xs text-zinc-400 uppercase tracking-widest mt-1">
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (timeLeft.total <= 0) {
    return (
      <div className="text-center text-red-500 font-bold text-xl animate-pulse">
        🏁 Em andamento!
      </div>
    );
  }

  const blocks = [
    { label: 'Dias', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Seg', value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-3 justify-center">
      {blocks.map(({ label, value }) => (
        <div
          key={label}
          className="flex flex-col items-center bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 min-w-[72px]"
        >
          <span className="text-3xl font-mono font-bold text-red-500 tabular-nums">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-xs text-zinc-400 uppercase tracking-widest mt-1">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export { SESSION_LABELS };
