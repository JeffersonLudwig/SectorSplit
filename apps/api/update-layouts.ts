import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const layouts: Record<string, string> = {
  'circuit-australia-2026': 'Australia',
  'circuit-china-2026': 'China',
  'circuit-japan-2026': 'Japan',
  'circuit-bahrain-2026': 'Bahrain',
  'circuit-saudi-arabia-2026': 'Saudi_Arabia',
  'circuit-miami-2026': 'Miami',
  'circuit-monaco-2026': 'Monaco',
  'circuit-spain-2026': 'Spain',
  'circuit-canada-2026': 'Canada',
  'circuit-austria-2026': 'Austria',
  'circuit-great-britain-2026': 'Great_Britain',
  'circuit-hungary-2026': 'Hungary',
  'circuit-belgium-2026': 'Belgium',
  'circuit-netherlands-2026': 'Netherlands',
  'circuit-italy-2026': 'Italy',
  'circuit-azerbaijan-2026': 'Baku',
  'circuit-singapore-2026': 'Singapore',
  'circuit-usa-2026': 'USA',
  'circuit-mexico-2026': 'Mexico',
  'circuit-brazil-2026': 'Brazil',
  'circuit-las-vegas-2026': 'Las_Vegas',
  'circuit-qatar-2026': 'Qatar',
  'circuit-abu-dhabi-2026': 'Abu_Dhabi',
};

async function main() {
  for (const [id, name] of Object.entries(layouts)) {
    const url = `https://media.formula1.com/image/upload/f_auto/q_auto/v1677244985/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/${name}_Circuit.png`;
    try {
      await prisma.circuit.update({
        where: { id },
        data: { layoutUrl: url }
      });
      console.log(`Updated ${id}`);
    } catch (e) {
      console.log(`Skip ${id} - not found`);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
