import { PrismaClient, SessionType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function dt(iso: string): Date {
  return new Date(iso);
}

// ─── SEASON DATA ─────────────────────────────────────────────────────────────

const season2026 = [
  {
    round: 1,
    name: 'Grande Prêmio da Austrália',
    slug: 'australia-2026',
    country: 'Austrália',
    flagUrl: 'https://flagcdn.com/w80/au.png',
    circuit: {
      name: 'Albert Park Circuit',
      country: 'Austrália',
      city: 'Melbourne',
      laps: 58,
      lengthKm: 5.278,
      lapRecordMs: 80235, // 1:20.235
      lapRecordBy: 'Charles Leclerc (2022)',
      layoutUrl: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244985/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Australia_Circuit.png',
    },
    sessions: [
      { type: SessionType.PRACTICE_1, startsAt: dt('2026-03-13T01:30:00Z'), endsAt: dt('2026-03-13T02:30:00Z') },
      { type: SessionType.PRACTICE_2, startsAt: dt('2026-03-13T05:00:00Z'), endsAt: dt('2026-03-13T06:00:00Z') },
      { type: SessionType.PRACTICE_3, startsAt: dt('2026-03-14T01:30:00Z'), endsAt: dt('2026-03-14T02:30:00Z') },
      { type: SessionType.QUALIFYING, startsAt: dt('2026-03-14T05:00:00Z'), endsAt: dt('2026-03-14T06:00:00Z') },
      { type: SessionType.RACE,       startsAt: dt('2026-03-15T04:00:00Z'), endsAt: dt('2026-03-15T06:00:00Z') },
    ],
  },
  {
    round: 2,
    name: 'Grande Prêmio da China',
    slug: 'china-2026',
    country: 'China',
    flagUrl: 'https://flagcdn.com/w80/cn.png',
    circuit: {
      name: 'Shanghai International Circuit',
      country: 'China',
      city: 'Xangai',
      laps: 56,
      lengthKm: 5.451,
      lapRecordMs: 95340, // 1:35.340
      lapRecordBy: 'Michael Schumacher (2004)',
      layoutUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Shanghai_International_Circuit_track_map.svg/400px-Shanghai_International_Circuit_track_map.svg.png',
    },
    sessions: [
      { type: SessionType.PRACTICE_1,      startsAt: dt('2026-03-20T03:30:00Z'), endsAt: dt('2026-03-20T04:30:00Z') },
      { type: SessionType.SPRINT_QUALIFYING, startsAt: dt('2026-03-20T07:30:00Z'), endsAt: dt('2026-03-20T08:30:00Z') },
      { type: SessionType.SPRINT,           startsAt: dt('2026-03-21T03:00:00Z'), endsAt: dt('2026-03-21T04:00:00Z') },
      { type: SessionType.QUALIFYING,       startsAt: dt('2026-03-21T07:00:00Z'), endsAt: dt('2026-03-21T08:00:00Z') },
      { type: SessionType.RACE,             startsAt: dt('2026-03-22T07:00:00Z'), endsAt: dt('2026-03-22T09:00:00Z') },
    ],
  },
  {
    round: 3,
    name: 'Grande Prêmio do Japão',
    slug: 'japan-2026',
    country: 'Japão',
    flagUrl: 'https://flagcdn.com/w80/jp.png',
    circuit: {
      name: 'Suzuka International Racing Course',
      country: 'Japão',
      city: 'Suzuka',
      laps: 53,
      lengthKm: 5.807,
      lapRecordMs: 90983, // 1:30.983
      lapRecordBy: 'Lewis Hamilton (2019)',
      layoutUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Suzuka_circuit_layout.svg/400px-Suzuka_circuit_layout.svg.png',
    },
    sessions: [
      { type: SessionType.PRACTICE_1, startsAt: dt('2026-04-03T02:30:00Z'), endsAt: dt('2026-04-03T03:30:00Z') },
      { type: SessionType.PRACTICE_2, startsAt: dt('2026-04-03T06:00:00Z'), endsAt: dt('2026-04-03T07:00:00Z') },
      { type: SessionType.PRACTICE_3, startsAt: dt('2026-04-04T02:30:00Z'), endsAt: dt('2026-04-04T03:30:00Z') },
      { type: SessionType.QUALIFYING, startsAt: dt('2026-04-04T06:00:00Z'), endsAt: dt('2026-04-04T07:00:00Z') },
      { type: SessionType.RACE,       startsAt: dt('2026-04-05T05:00:00Z'), endsAt: dt('2026-04-05T07:00:00Z') },
    ],
  },
  {
    round: 4,
    name: 'Grande Prêmio do Bahrein',
    slug: 'bahrain-2026',
    country: 'Bahrein',
    flagUrl: 'https://flagcdn.com/w80/bh.png',
    circuit: {
      name: 'Bahrain International Circuit',
      country: 'Bahrein',
      city: 'Sakhir',
      laps: 57,
      lengthKm: 5.412,
      lapRecordMs: 91447, // 1:31.447
      lapRecordBy: 'Pedro de la Rosa (2005)',
      layoutUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Bahrain_International_Circuit--Grand_Prix_Layout.svg/400px-Bahrain_International_Circuit--Grand_Prix_Layout.svg.png',
    },
    sessions: [
      { type: SessionType.PRACTICE_1, startsAt: dt('2026-04-17T11:30:00Z'), endsAt: dt('2026-04-17T12:30:00Z') },
      { type: SessionType.PRACTICE_2, startsAt: dt('2026-04-17T15:00:00Z'), endsAt: dt('2026-04-17T16:00:00Z') },
      { type: SessionType.PRACTICE_3, startsAt: dt('2026-04-18T11:30:00Z'), endsAt: dt('2026-04-18T12:30:00Z') },
      { type: SessionType.QUALIFYING, startsAt: dt('2026-04-18T15:00:00Z'), endsAt: dt('2026-04-18T16:00:00Z') },
      { type: SessionType.RACE,       startsAt: dt('2026-04-19T15:00:00Z'), endsAt: dt('2026-04-19T17:00:00Z') },
    ],
  },
  {
    round: 5,
    name: 'Grande Prêmio da Arábia Saudita',
    slug: 'saudi-arabia-2026',
    country: 'Arábia Saudita',
    flagUrl: 'https://flagcdn.com/w80/sa.png',
    circuit: {
      name: 'Jeddah Corniche Circuit',
      country: 'Arábia Saudita',
      city: 'Jeddah',
      laps: 50,
      lengthKm: 6.174,
      lapRecordMs: 73651, // 1:13.651
      lapRecordBy: 'Lewis Hamilton (2021)',
      layoutUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Jeddah_Corniche_Circuit.png/400px-Jeddah_Corniche_Circuit.png',
    },
    sessions: [
      { type: SessionType.PRACTICE_1, startsAt: dt('2026-04-24T13:30:00Z'), endsAt: dt('2026-04-24T14:30:00Z') },
      { type: SessionType.PRACTICE_2, startsAt: dt('2026-04-24T17:00:00Z'), endsAt: dt('2026-04-24T18:00:00Z') },
      { type: SessionType.PRACTICE_3, startsAt: dt('2026-04-25T13:30:00Z'), endsAt: dt('2026-04-25T14:30:00Z') },
      { type: SessionType.QUALIFYING, startsAt: dt('2026-04-25T17:00:00Z'), endsAt: dt('2026-04-25T18:00:00Z') },
      { type: SessionType.RACE,       startsAt: dt('2026-04-26T17:00:00Z'), endsAt: dt('2026-04-26T19:00:00Z') },
    ],
  },
  {
    round: 6,
    name: 'Grande Prêmio de Miami',
    slug: 'miami-2026',
    country: 'Estados Unidos',
    flagUrl: 'https://flagcdn.com/w80/us.png',
    circuit: {
      name: 'Miami International Autodrome',
      country: 'Estados Unidos',
      city: 'Miami',
      laps: 57,
      lengthKm: 5.412,
      lapRecordMs: 90135, // 1:30.135
      lapRecordBy: 'Max Verstappen (2023)',
      layoutUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Miami_International_Autodrome_Track_Map.png/400px-Miami_International_Autodrome_Track_Map.png',
    },
    sessions: [
      { type: SessionType.PRACTICE_1,      startsAt: dt('2026-05-01T16:30:00Z'), endsAt: dt('2026-05-01T17:30:00Z') },
      { type: SessionType.SPRINT_QUALIFYING, startsAt: dt('2026-05-01T20:30:00Z'), endsAt: dt('2026-05-01T21:30:00Z') },
      { type: SessionType.SPRINT,           startsAt: dt('2026-05-02T16:00:00Z'), endsAt: dt('2026-05-02T17:00:00Z') },
      { type: SessionType.QUALIFYING,       startsAt: dt('2026-05-02T20:00:00Z'), endsAt: dt('2026-05-02T21:00:00Z') },
      { type: SessionType.RACE,             startsAt: dt('2026-05-03T20:00:00Z'), endsAt: dt('2026-05-03T22:00:00Z') },
    ],
  },
  {
    round: 7,
    name: 'Grande Prêmio de Mônaco',
    slug: 'monaco-2026',
    country: 'Mônaco',
    flagUrl: 'https://flagcdn.com/w80/mc.png',
    circuit: {
      name: 'Circuit de Monaco',
      country: 'Mônaco',
      city: 'Monte Carlo',
      laps: 78,
      lengthKm: 3.337,
      lapRecordMs: 74260, // 1:14.260
      lapRecordBy: 'Rubens Barrichello (2004)',
      layoutUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Monte_Carlo_Formula_1_track_map.svg/400px-Monte_Carlo_Formula_1_track_map.svg.png',
    },
    sessions: [
      { type: SessionType.PRACTICE_1, startsAt: dt('2026-05-22T11:30:00Z'), endsAt: dt('2026-05-22T12:30:00Z') },
      { type: SessionType.PRACTICE_2, startsAt: dt('2026-05-22T15:00:00Z'), endsAt: dt('2026-05-22T16:00:00Z') },
      { type: SessionType.PRACTICE_3, startsAt: dt('2026-05-23T10:30:00Z'), endsAt: dt('2026-05-23T11:30:00Z') },
      { type: SessionType.QUALIFYING, startsAt: dt('2026-05-23T14:00:00Z'), endsAt: dt('2026-05-23T15:00:00Z') },
      { type: SessionType.RACE,       startsAt: dt('2026-05-24T13:00:00Z'), endsAt: dt('2026-05-24T15:00:00Z') },
    ],
  },
  {
    round: 8,
    name: 'Grande Prêmio da Espanha',
    slug: 'spain-2026',
    country: 'Espanha',
    flagUrl: 'https://flagcdn.com/w80/es.png',
    circuit: {
      name: 'Circuit de Barcelona-Catalunya',
      country: 'Espanha',
      city: 'Barcelona',
      laps: 66,
      lengthKm: 4.657,
      lapRecordMs: 82456, // 1:22.456
      lapRecordBy: 'Max Verstappen (2021)',
      layoutUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Circuit_de_Barcelona_Catalunya_track_map.svg/400px-Circuit_de_Barcelona_Catalunya_track_map.svg.png',
    },
    sessions: [
      { type: SessionType.PRACTICE_1, startsAt: dt('2026-05-29T11:30:00Z'), endsAt: dt('2026-05-29T12:30:00Z') },
      { type: SessionType.PRACTICE_2, startsAt: dt('2026-05-29T15:00:00Z'), endsAt: dt('2026-05-29T16:00:00Z') },
      { type: SessionType.PRACTICE_3, startsAt: dt('2026-05-30T10:30:00Z'), endsAt: dt('2026-05-30T11:30:00Z') },
      { type: SessionType.QUALIFYING, startsAt: dt('2026-05-30T14:00:00Z'), endsAt: dt('2026-05-30T15:00:00Z') },
      { type: SessionType.RACE,       startsAt: dt('2026-05-31T13:00:00Z'), endsAt: dt('2026-05-31T15:00:00Z') },
    ],
  },
  {
    round: 9,
    name: 'Grande Prêmio do Canadá',
    slug: 'canada-2026',
    country: 'Canadá',
    flagUrl: 'https://flagcdn.com/w80/ca.png',
    circuit: {
      name: 'Circuit Gilles Villeneuve',
      country: 'Canadá',
      city: 'Montreal',
      laps: 70,
      lengthKm: 4.361,
      lapRecordMs: 74297, // 1:14.297
      lapRecordBy: 'Valtteri Bottas (2019)',
      layoutUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Circuit_Gilles_Villeneuve.svg/400px-Circuit_Gilles_Villeneuve.svg.png',
    },
    sessions: [
      { type: SessionType.PRACTICE_1, startsAt: dt('2026-06-12T17:30:00Z'), endsAt: dt('2026-06-12T18:30:00Z') },
      { type: SessionType.PRACTICE_2, startsAt: dt('2026-06-12T21:00:00Z'), endsAt: dt('2026-06-12T22:00:00Z') },
      { type: SessionType.PRACTICE_3, startsAt: dt('2026-06-13T16:30:00Z'), endsAt: dt('2026-06-13T17:30:00Z') },
      { type: SessionType.QUALIFYING, startsAt: dt('2026-06-13T20:00:00Z'), endsAt: dt('2026-06-13T21:00:00Z') },
      { type: SessionType.RACE,       startsAt: dt('2026-06-14T18:00:00Z'), endsAt: dt('2026-06-14T20:00:00Z') },
    ],
  },
  {
    round: 10,
    name: 'Grande Prêmio da Áustria',
    slug: 'austria-2026',
    country: 'Áustria',
    flagUrl: 'https://flagcdn.com/w80/at.png',
    circuit: {
      name: 'Red Bull Ring',
      country: 'Áustria',
      city: 'Spielberg',
      laps: 71,
      lengthKm: 4.318,
      lapRecordMs: 67275, // 1:07.275
      lapRecordBy: 'Carlos Sainz (2020)',
      layoutUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/RedBullRing.svg/400px-RedBullRing.svg.png',
    },
    sessions: [
      { type: SessionType.PRACTICE_1,       startsAt: dt('2026-06-26T10:30:00Z'), endsAt: dt('2026-06-26T11:30:00Z') },
      { type: SessionType.SPRINT_QUALIFYING, startsAt: dt('2026-06-26T14:30:00Z'), endsAt: dt('2026-06-26T15:30:00Z') },
      { type: SessionType.SPRINT,            startsAt: dt('2026-06-27T10:00:00Z'), endsAt: dt('2026-06-27T11:00:00Z') },
      { type: SessionType.QUALIFYING,        startsAt: dt('2026-06-27T14:00:00Z'), endsAt: dt('2026-06-27T15:00:00Z') },
      { type: SessionType.RACE,              startsAt: dt('2026-06-28T13:00:00Z'), endsAt: dt('2026-06-28T15:00:00Z') },
    ],
  },
  {
    round: 11,
    name: 'Grande Prêmio da Grã-Bretanha',
    slug: 'great-britain-2026',
    country: 'Reino Unido',
    flagUrl: 'https://flagcdn.com/w80/gb.png',
    circuit: {
      name: 'Silverstone Circuit',
      country: 'Reino Unido',
      city: 'Silverstone',
      laps: 52,
      lengthKm: 5.891,
      lapRecordMs: 87097, // 1:27.097
      lapRecordBy: 'Max Verstappen (2020)',
      layoutUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Silverstone_Circuit_2011.svg/400px-Silverstone_Circuit_2011.svg.png',
    },
    sessions: [
      { type: SessionType.PRACTICE_1, startsAt: dt('2026-07-03T11:30:00Z'), endsAt: dt('2026-07-03T12:30:00Z') },
      { type: SessionType.PRACTICE_2, startsAt: dt('2026-07-03T15:00:00Z'), endsAt: dt('2026-07-03T16:00:00Z') },
      { type: SessionType.PRACTICE_3, startsAt: dt('2026-07-04T10:30:00Z'), endsAt: dt('2026-07-04T11:30:00Z') },
      { type: SessionType.QUALIFYING, startsAt: dt('2026-07-04T14:00:00Z'), endsAt: dt('2026-07-04T15:00:00Z') },
      { type: SessionType.RACE,       startsAt: dt('2026-07-05T14:00:00Z'), endsAt: dt('2026-07-05T16:00:00Z') },
    ],
  },
  {
    round: 12,
    name: 'Grande Prêmio da Bélgica',
    slug: 'belgium-2026',
    country: 'Bélgica',
    flagUrl: 'https://flagcdn.com/w80/be.png',
    circuit: {
      name: 'Circuit de Spa-Francorchamps',
      country: 'Bélgica',
      city: 'Spa',
      laps: 44,
      lengthKm: 7.004,
      lapRecordMs: 106286, // 1:46.286
      lapRecordBy: 'Valtteri Bottas (2018)',
      layoutUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Spa-Francorchamps_of_Belgium.svg/400px-Spa-Francorchamps_of_Belgium.svg.png',
    },
    sessions: [
      { type: SessionType.PRACTICE_1, startsAt: dt('2026-07-24T11:30:00Z'), endsAt: dt('2026-07-24T12:30:00Z') },
      { type: SessionType.PRACTICE_2, startsAt: dt('2026-07-24T15:00:00Z'), endsAt: dt('2026-07-24T16:00:00Z') },
      { type: SessionType.PRACTICE_3, startsAt: dt('2026-07-25T10:30:00Z'), endsAt: dt('2026-07-25T11:30:00Z') },
      { type: SessionType.QUALIFYING, startsAt: dt('2026-07-25T14:00:00Z'), endsAt: dt('2026-07-25T15:00:00Z') },
      { type: SessionType.RACE,       startsAt: dt('2026-07-26T13:00:00Z'), endsAt: dt('2026-07-26T15:00:00Z') },
    ],
  },
  {
    round: 13,
    name: 'Grande Prêmio da Hungria',
    slug: 'hungary-2026',
    country: 'Hungria',
    flagUrl: 'https://flagcdn.com/w80/hu.png',
    circuit: {
      name: 'Hungaroring',
      country: 'Hungria',
      city: 'Budapest',
      laps: 70,
      lengthKm: 4.381,
      lapRecordMs: 75525, // 1:15.525
      lapRecordBy: 'Lewis Hamilton (2020)',
      layoutUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Hungaroring.svg/400px-Hungaroring.svg.png',
    },
    sessions: [
      { type: SessionType.PRACTICE_1, startsAt: dt('2026-07-31T11:30:00Z'), endsAt: dt('2026-07-31T12:30:00Z') },
      { type: SessionType.PRACTICE_2, startsAt: dt('2026-07-31T15:00:00Z'), endsAt: dt('2026-07-31T16:00:00Z') },
      { type: SessionType.PRACTICE_3, startsAt: dt('2026-08-01T10:30:00Z'), endsAt: dt('2026-08-01T11:30:00Z') },
      { type: SessionType.QUALIFYING, startsAt: dt('2026-08-01T14:00:00Z'), endsAt: dt('2026-08-01T15:00:00Z') },
      { type: SessionType.RACE,       startsAt: dt('2026-08-02T13:00:00Z'), endsAt: dt('2026-08-02T15:00:00Z') },
    ],
  },
  {
    round: 14,
    name: 'Grande Prêmio dos Países Baixos',
    slug: 'netherlands-2026',
    country: 'Países Baixos',
    flagUrl: 'https://flagcdn.com/w80/nl.png',
    circuit: {
      name: 'Circuit Zandvoort',
      country: 'Países Baixos',
      city: 'Zandvoort',
      laps: 72,
      lengthKm: 4.259,
      lapRecordMs: 72097, // 1:12.097
      lapRecordBy: 'Max Verstappen (2021)',
      layoutUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Zandvoort_track_layout.svg/400px-Zandvoort_track_layout.svg.png',
    },
    sessions: [
      { type: SessionType.PRACTICE_1, startsAt: dt('2026-08-28T10:30:00Z'), endsAt: dt('2026-08-28T11:30:00Z') },
      { type: SessionType.PRACTICE_2, startsAt: dt('2026-08-28T14:00:00Z'), endsAt: dt('2026-08-28T15:00:00Z') },
      { type: SessionType.PRACTICE_3, startsAt: dt('2026-08-29T09:30:00Z'), endsAt: dt('2026-08-29T10:30:00Z') },
      { type: SessionType.QUALIFYING, startsAt: dt('2026-08-29T13:00:00Z'), endsAt: dt('2026-08-29T14:00:00Z') },
      { type: SessionType.RACE,       startsAt: dt('2026-08-30T13:00:00Z'), endsAt: dt('2026-08-30T15:00:00Z') },
    ],
  },
  {
    round: 15,
    name: 'Grande Prêmio da Itália',
    slug: 'italy-2026',
    country: 'Itália',
    flagUrl: 'https://flagcdn.com/w80/it.png',
    circuit: {
      name: 'Autodromo Nazionale Monza',
      country: 'Itália',
      city: 'Monza',
      laps: 53,
      lengthKm: 5.793,
      lapRecordMs: 81046, // 1:21.046
      lapRecordBy: 'Rubens Barrichello (2004)',
      layoutUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Monza_track_map_2000.svg/400px-Monza_track_map_2000.svg.png',
    },
    sessions: [
      { type: SessionType.PRACTICE_1, startsAt: dt('2026-09-04T11:30:00Z'), endsAt: dt('2026-09-04T12:30:00Z') },
      { type: SessionType.PRACTICE_2, startsAt: dt('2026-09-04T15:00:00Z'), endsAt: dt('2026-09-04T16:00:00Z') },
      { type: SessionType.PRACTICE_3, startsAt: dt('2026-09-05T10:30:00Z'), endsAt: dt('2026-09-05T11:30:00Z') },
      { type: SessionType.QUALIFYING, startsAt: dt('2026-09-05T14:00:00Z'), endsAt: dt('2026-09-05T15:00:00Z') },
      { type: SessionType.RACE,       startsAt: dt('2026-09-06T13:00:00Z'), endsAt: dt('2026-09-06T15:00:00Z') },
    ],
  },
  {
    round: 16,
    name: 'Grande Prêmio de Singapura',
    slug: 'singapore-2026',
    country: 'Singapura',
    flagUrl: 'https://flagcdn.com/w80/sg.png',
    circuit: {
      name: 'Marina Bay Street Circuit',
      country: 'Singapura',
      city: 'Singapura',
      laps: 62,
      lengthKm: 4.94,
      lapRecordMs: 103837, // 1:43.837
      lapRecordBy: 'Kevin Magnussen (2018)',
      layoutUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Singapore_circuit_2010.svg/400px-Singapore_circuit_2010.svg.png',
    },
    sessions: [
      { type: SessionType.PRACTICE_1, startsAt: dt('2026-09-18T09:30:00Z'), endsAt: dt('2026-09-18T10:30:00Z') },
      { type: SessionType.PRACTICE_2, startsAt: dt('2026-09-18T13:00:00Z'), endsAt: dt('2026-09-18T14:00:00Z') },
      { type: SessionType.PRACTICE_3, startsAt: dt('2026-09-19T09:30:00Z'), endsAt: dt('2026-09-19T10:30:00Z') },
      { type: SessionType.QUALIFYING, startsAt: dt('2026-09-19T13:00:00Z'), endsAt: dt('2026-09-19T14:00:00Z') },
      { type: SessionType.RACE,       startsAt: dt('2026-09-20T12:00:00Z'), endsAt: dt('2026-09-20T14:00:00Z') },
    ],
  },
  {
    round: 17,
    name: 'Grande Prêmio do Texas',
    slug: 'united-states-2026',
    country: 'Estados Unidos',
    flagUrl: 'https://flagcdn.com/w80/us.png',
    circuit: {
      name: 'Circuit of the Americas',
      country: 'Estados Unidos',
      city: 'Austin',
      laps: 56,
      lengthKm: 5.513,
      lapRecordMs: 96169, // 1:36.169
      lapRecordBy: 'Charles Leclerc (2019)',
      layoutUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/USA_track_2014.svg/400px-USA_track_2014.svg.png',
    },
    sessions: [
      { type: SessionType.PRACTICE_1,       startsAt: dt('2026-10-16T18:30:00Z'), endsAt: dt('2026-10-16T19:30:00Z') },
      { type: SessionType.SPRINT_QUALIFYING, startsAt: dt('2026-10-16T22:30:00Z'), endsAt: dt('2026-10-16T23:30:00Z') },
      { type: SessionType.SPRINT,            startsAt: dt('2026-10-17T18:00:00Z'), endsAt: dt('2026-10-17T19:00:00Z') },
      { type: SessionType.QUALIFYING,        startsAt: dt('2026-10-17T22:00:00Z'), endsAt: dt('2026-10-17T23:00:00Z') },
      { type: SessionType.RACE,              startsAt: dt('2026-10-18T19:00:00Z'), endsAt: dt('2026-10-18T21:00:00Z') },
    ],
  },
  {
    round: 18,
    name: 'Grande Prêmio do México',
    slug: 'mexico-2026',
    country: 'México',
    flagUrl: 'https://flagcdn.com/w80/mx.png',
    circuit: {
      name: 'Autodromo Hermanos Rodriguez',
      country: 'México',
      city: 'Cidade do México',
      laps: 71,
      lengthKm: 4.304,
      lapRecordMs: 79048, // 1:19.048
      lapRecordBy: 'Valtteri Bottas (2021)',
      layoutUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Mexico_circuit_2015.svg/400px-Mexico_circuit_2015.svg.png',
    },
    sessions: [
      { type: SessionType.PRACTICE_1, startsAt: dt('2026-10-23T18:30:00Z'), endsAt: dt('2026-10-23T19:30:00Z') },
      { type: SessionType.PRACTICE_2, startsAt: dt('2026-10-23T22:00:00Z'), endsAt: dt('2026-10-23T23:00:00Z') },
      { type: SessionType.PRACTICE_3, startsAt: dt('2026-10-24T17:30:00Z'), endsAt: dt('2026-10-24T18:30:00Z') },
      { type: SessionType.QUALIFYING, startsAt: dt('2026-10-24T21:00:00Z'), endsAt: dt('2026-10-24T22:00:00Z') },
      { type: SessionType.RACE,       startsAt: dt('2026-10-25T20:00:00Z'), endsAt: dt('2026-10-25T22:00:00Z') },
    ],
  },
  {
    round: 19,
    name: 'Grande Prêmio de São Paulo',
    slug: 'brazil-2026',
    country: 'Brasil',
    flagUrl: 'https://flagcdn.com/w80/br.png',
    circuit: {
      name: 'Autodromo Jose Carlos Pace (Interlagos)',
      country: 'Brasil',
      city: 'São Paulo',
      laps: 71,
      lengthKm: 4.309,
      lapRecordMs: 72909, // 1:12.909
      lapRecordBy: 'Rubens Barrichello (2004)',
      layoutUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Autodromo_Jose_Carlos_Pace_track_map.svg/400px-Autodromo_Jose_Carlos_Pace_track_map.svg.png',
    },
    sessions: [
      { type: SessionType.PRACTICE_1,       startsAt: dt('2026-10-30T14:30:00Z'), endsAt: dt('2026-10-30T15:30:00Z') },
      { type: SessionType.SPRINT_QUALIFYING, startsAt: dt('2026-10-30T18:30:00Z'), endsAt: dt('2026-10-30T19:30:00Z') },
      { type: SessionType.SPRINT,            startsAt: dt('2026-10-31T14:00:00Z'), endsAt: dt('2026-10-31T15:00:00Z') },
      { type: SessionType.QUALIFYING,        startsAt: dt('2026-10-31T18:00:00Z'), endsAt: dt('2026-10-31T19:00:00Z') },
      { type: SessionType.RACE,              startsAt: dt('2026-11-01T17:00:00Z'), endsAt: dt('2026-11-01T19:00:00Z') },
    ],
  },
  {
    round: 20,
    name: 'Grande Prêmio de Las Vegas',
    slug: 'las-vegas-2026',
    country: 'Estados Unidos',
    flagUrl: 'https://flagcdn.com/w80/us.png',
    circuit: {
      name: 'Las Vegas Street Circuit',
      country: 'Estados Unidos',
      city: 'Las Vegas',
      laps: 50,
      lengthKm: 6.201,
      lapRecordMs: 93021, // 1:33.021
      lapRecordBy: 'Oscar Piastri (2024)',
      layoutUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Las_Vegas_Grand_Prix_circuit_map.svg/400px-Las_Vegas_Grand_Prix_circuit_map.svg.png',
    },
    sessions: [
      { type: SessionType.PRACTICE_1, startsAt: dt('2026-11-19T06:30:00Z'), endsAt: dt('2026-11-19T07:30:00Z') },
      { type: SessionType.PRACTICE_2, startsAt: dt('2026-11-20T06:00:00Z'), endsAt: dt('2026-11-20T07:00:00Z') },
      { type: SessionType.PRACTICE_3, startsAt: dt('2026-11-21T04:30:00Z'), endsAt: dt('2026-11-21T05:30:00Z') },
      { type: SessionType.QUALIFYING, startsAt: dt('2026-11-21T07:00:00Z'), endsAt: dt('2026-11-21T08:00:00Z') },
      { type: SessionType.RACE,       startsAt: dt('2026-11-22T06:00:00Z'), endsAt: dt('2026-11-22T08:00:00Z') },
    ],
  },
  {
    round: 21,
    name: 'Grande Prêmio de Abu Dhabi',
    slug: 'abu-dhabi-2026',
    country: 'Emirados Árabes Unidos',
    flagUrl: 'https://flagcdn.com/w80/ae.png',
    circuit: {
      name: 'Yas Marina Circuit',
      country: 'Emirados Árabes Unidos',
      city: 'Abu Dhabi',
      laps: 58,
      lengthKm: 5.281,
      lapRecordMs: 84701, // 1:24.701
      lapRecordBy: 'Max Verstappen (2021)',
      layoutUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Yas_Marina_Circuit_2021.svg/400px-Yas_Marina_Circuit_2021.svg.png',
    },
    sessions: [
      { type: SessionType.PRACTICE_1, startsAt: dt('2026-12-04T09:30:00Z'), endsAt: dt('2026-12-04T10:30:00Z') },
      { type: SessionType.PRACTICE_2, startsAt: dt('2026-12-04T13:00:00Z'), endsAt: dt('2026-12-04T14:00:00Z') },
      { type: SessionType.PRACTICE_3, startsAt: dt('2026-12-05T09:30:00Z'), endsAt: dt('2026-12-05T10:30:00Z') },
      { type: SessionType.QUALIFYING, startsAt: dt('2026-12-05T13:00:00Z'), endsAt: dt('2026-12-05T14:00:00Z') },
      { type: SessionType.RACE,       startsAt: dt('2026-12-06T13:00:00Z'), endsAt: dt('2026-12-06T15:00:00Z') },
    ],
  },
];

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Starting seed...');

  // Admin user
  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@sectorsplit.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@sectorsplit.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created');

  // Demo user
  const demoPassword = await bcrypt.hash('Demo@123', 10);
  await prisma.user.upsert({
    where: { email: 'demo@sectorsplit.com' },
    update: {},
    create: {
      username: 'f1fan_demo',
      email: 'demo@sectorsplit.com',
      password: demoPassword,
      role: 'USER',
    },
  });
  console.log('✅ Demo user created');

  // Season races
  for (const gp of season2026) {
    // Circuit
    const circuit = await prisma.circuit.upsert({
      where: { id: `circuit-${gp.slug}` },
      update: gp.circuit,
      create: {
        id: `circuit-${gp.slug}`,
        ...gp.circuit,
      },
    });

    // Race
    const race = await prisma.race.upsert({
      where: { slug: gp.slug },
      update: {
        name: gp.name,
        country: gp.country,
        flagUrl: gp.flagUrl,
      },
      create: {
        id: `race-${gp.slug}`,
        season: 2026,
        round: gp.round,
        name: gp.name,
        slug: gp.slug,
        country: gp.country,
        flagUrl: gp.flagUrl,
        circuitId: circuit.id,
      },
    });

    // Sessions
    for (const session of gp.sessions) {
      await prisma.raceSession.upsert({
        where: { raceId_type: { raceId: race.id, type: session.type } },
        update: { startsAt: session.startsAt, endsAt: session.endsAt },
        create: {
          raceId: race.id,
          type: session.type,
          startsAt: session.startsAt,
          endsAt: session.endsAt,
        },
      });
    }

    console.log(`✅ GP Round ${gp.round}: ${gp.name}`);
  }

  console.log('\n🏁 Seed complete! 2026 F1 season loaded.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
