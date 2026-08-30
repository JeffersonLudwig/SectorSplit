import { PrismaClient, SessionType } from '@prisma/client';

const prisma = new PrismaClient();

const TEAMS = [
  {
    id: 'ferrari',
    name: 'Ferrari',
    color: '#DC0000',
    logoUrl: 'https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png',
    carUrl: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/ferrari.png',
  },
  {
    id: 'red-bull',
    name: 'Red Bull Racing',
    color: '#3671C6',
    logoUrl: 'https://media.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing-logo.png',
    carUrl: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/red-bull-racing.png',
  },
  {
    id: 'mclaren',
    name: 'McLaren',
    color: '#FF8000',
    logoUrl: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mclaren-logo.png',
    carUrl: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/mclaren.png',
  },
  {
    id: 'mercedes',
    name: 'Mercedes',
    color: '#27F4D2',
    logoUrl: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mercedes-logo.png',
    carUrl: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/mercedes.png',
  },
  {
    id: 'aston-martin',
    name: 'Aston Martin',
    color: '#229971',
    logoUrl: 'https://media.formula1.com/content/dam/fom-website/teams/2024/aston-martin-logo.png',
    carUrl: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/aston-martin.png',
  },
  {
    id: 'williams',
    name: 'Williams',
    color: '#005AFF',
    logoUrl: 'https://media.formula1.com/content/dam/fom-website/teams/2024/williams-logo.png',
    carUrl: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/williams.png',
  },
  {
    id: 'audi',
    name: 'Audi F1 Team',
    color: '#F40000',
    logoUrl: 'https://media.formula1.com/content/dam/fom-website/teams/2024/kick-sauber-logo.png', // Fallback for 2026
    carUrl: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/kick-sauber.png',
  },
  {
    id: 'alpine',
    name: 'Alpine',
    color: '#0093CC',
    logoUrl: 'https://media.formula1.com/content/dam/fom-website/teams/2024/alpine-logo.png',
    carUrl: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/alpine.png',
  },
  {
    id: 'rb',
    name: 'Racing Bulls',
    color: '#6692FF',
    logoUrl: 'https://media.formula1.com/content/dam/fom-website/teams/2024/rb-logo.png',
    carUrl: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/rb.png',
  },
  {
    id: 'haas',
    name: 'Haas F1 Team',
    color: '#B6BABD',
    logoUrl: 'https://media.formula1.com/content/dam/fom-website/teams/2024/haas-logo.png',
    carUrl: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/haas.png',
  },
];

const DRIVERS = [
  // Ferrari
  { teamId: 'ferrari', firstName: 'Lewis', lastName: 'Hamilton', number: 44, country: 'GBR', photoUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png' },
  { teamId: 'ferrari', firstName: 'Charles', lastName: 'Leclerc', number: 16, country: 'MCO', photoUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png' },
  // Red Bull
  { teamId: 'red-bull', firstName: 'Max', lastName: 'Verstappen', number: 1, country: 'NLD', photoUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png' },
  { teamId: 'red-bull', firstName: 'Yuki', lastName: 'Tsunoda', number: 22, country: 'JPN', photoUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png' },
  // McLaren
  { teamId: 'mclaren', firstName: 'Lando', lastName: 'Norris', number: 4, country: 'GBR', photoUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png' },
  { teamId: 'mclaren', firstName: 'Oscar', lastName: 'Piastri', number: 81, country: 'AUS', photoUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png' },
  // Mercedes
  { teamId: 'mercedes', firstName: 'George', lastName: 'Russell', number: 63, country: 'GBR', photoUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png' },
  { teamId: 'mercedes', firstName: 'Andrea Kimi', lastName: 'Antonelli', number: 12, country: 'ITA', photoUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/K/KIMANT01_Kimi_Antonelli/kimant01.png' },
  // Aston Martin
  { teamId: 'aston-martin', firstName: 'Fernando', lastName: 'Alonso', number: 14, country: 'ESP', photoUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png' },
  { teamId: 'aston-martin', firstName: 'Lance', lastName: 'Stroll', number: 18, country: 'CAN', photoUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png' },
  // Williams
  { teamId: 'williams', firstName: 'Carlos', lastName: 'Sainz', number: 55, country: 'ESP', photoUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png' },
  { teamId: 'williams', firstName: 'Alexander', lastName: 'Albon', number: 23, country: 'THA', photoUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png' },
  // Audi
  { teamId: 'audi', firstName: 'Nico', lastName: 'Hülkenberg', number: 27, country: 'DEU', photoUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png' },
  { teamId: 'audi', firstName: 'Gabriel', lastName: 'Bortoleto', number: 88, country: 'BRA', photoUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GABBOR01_Gabriel_Bortoleto/gabbor01.png' },
  // Alpine
  { teamId: 'alpine', firstName: 'Pierre', lastName: 'Gasly', number: 10, country: 'FRA', photoUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png' },
  { teamId: 'alpine', firstName: 'Jack', lastName: 'Doohan', number: 7, country: 'AUS', photoUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/J/JACDOO01_Jack_Doohan/jacdoo01.png' },
  // RB
  { teamId: 'rb', firstName: 'Liam', lastName: 'Lawson', number: 30, country: 'NZL', photoUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png' },
  { teamId: 'rb', firstName: 'Isack', lastName: 'Hadjar', number: 17, country: 'FRA', photoUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/I/ISAHAD01_Isack_Hadjar/isahad01.png' }, // placeholder
  // Haas
  { teamId: 'haas', firstName: 'Esteban', lastName: 'Ocon', number: 31, country: 'FRA', photoUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png' },
  { teamId: 'haas', firstName: 'Oliver', lastName: 'Bearman', number: 87, country: 'GBR', photoUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png' },
];

async function seedTeamsAndDrivers() {
  console.log('Seeding Teams...');
  for (const team of TEAMS) {
    await prisma.team.upsert({
      where: { name: team.name },
      update: team,
      create: team,
    });
  }

  console.log('Seeding Drivers...');
  for (const driver of DRIVERS) {
    await prisma.driver.upsert({
      where: { number: driver.number },
      update: driver,
      create: driver,
    });
  }
}

async function seedPastRacesResults() {
  console.log('Seeding Results for all past races...');
  
  await prisma.sessionResult.deleteMany();

  const races = await prisma.race.findMany({
    include: { sessions: true }
  });
  const allDrivers = await prisma.driver.findMany();
  
  if (allDrivers.length === 0) return;

  const now = new Date();

  for (const race of races) {
    for (const session of race.sessions) {
      if (session.startsAt > now) continue;

      // shuffle drivers randomly for each session to make it look realistic
      const shuffledDrivers = [...allDrivers].sort(() => 0.5 - Math.random());

      if (session.type === SessionType.RACE || session.type === SessionType.SPRINT) {
        for (let i = 0; i < shuffledDrivers.length; i++) {
          const driver = shuffledDrivers[i];
          const position = i + 1;
          let status = 'Finished';
          let points = 0;
          let timeStr = `+${(position * (Math.random() * 2 + 1)).toFixed(3)}s`;
          let timeMs: number | null = 120000 + (position * 2300);

          if (position === 1) {
            timeStr = session.type === SessionType.RACE ? '1:24:12.333' : '0:30:12.111';
            points = session.type === SessionType.RACE ? 25 : 8;
          } else if (position === 2) points = session.type === SessionType.RACE ? 18 : 7;
          else if (position === 3) points = session.type === SessionType.RACE ? 15 : 6;
          else if (position === 4) points = session.type === SessionType.RACE ? 12 : 5;
          else if (position === 5) points = session.type === SessionType.RACE ? 10 : 4;
          else if (position === 6) points = session.type === SessionType.RACE ? 8 : 3;
          else if (position === 7) points = session.type === SessionType.RACE ? 6 : 2;
          else if (position === 8) points = session.type === SessionType.RACE ? 4 : 1;
          else if (position === 9) points = session.type === SessionType.RACE ? 2 : 0;
          else if (position === 10) points = session.type === SessionType.RACE ? 1 : 0;

          if (position > 18) {
            status = 'DNF';
            timeStr = 'DNF';
            timeMs = null;
            points = 0;
          }

          await prisma.sessionResult.upsert({
            where: { sessionId_driverId: { sessionId: session.id, driverId: driver.id } },
            update: { position, timeMs, timeStr, status, points },
            create: {
              sessionId: session.id,
              driverId: driver.id,
              position, timeMs, timeStr, status, points
            }
          });
        }
      } else {
        // Qualifying or Practice
        for (let i = 0; i < shuffledDrivers.length; i++) {
          const driver = shuffledDrivers[i];
          const position = i + 1; 
          const ms = 80000 + (position * 300) + Math.floor(Math.random() * 500);
          const min = Math.floor(ms / 60000);
          const sec = Math.floor((ms % 60000) / 1000);
          const millis = ms % 1000;
          
          let status = 'Finished';
          if (session.type.includes('QUALIFYING')) {
            status = 'Q' + (position <= 10 ? '3' : position <= 15 ? '2' : '1');
          }

          await prisma.sessionResult.upsert({
            where: { sessionId_driverId: { sessionId: session.id, driverId: driver.id } },
            update: { position, timeMs: ms, timeStr: `${min}:${sec.toString().padStart(2, '0')}.${millis.toString().padStart(3, '0')}`, status, points: null },
            create: {
              sessionId: session.id,
              driverId: driver.id,
              position,
              timeMs: ms,
              timeStr: `${min}:${sec.toString().padStart(2, '0')}.${millis.toString().padStart(3, '0')}`,
              status,
              points: null
            }
          });
        }
      }
    }
  }
}

async function main() {
  await seedTeamsAndDrivers();
  await seedPastRacesResults();
  console.log('Finished Teams & Results seed');
}

main().catch(console.error).finally(() => prisma.$disconnect());
