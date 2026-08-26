import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findNext() {
    const now = new Date();

    const session = await this.prisma.raceSession.findFirst({
      where: { startsAt: { gt: now } },
      orderBy: { startsAt: 'asc' },
      include: {
        race: {
          select: {
            id: true,
            name: true,
            slug: true,
            country: true,
            flagUrl: true,
            circuit: {
              select: { name: true, city: true },
            },
          },
        },
      },
    });

    if (!session) {
      throw new NotFoundException('No upcoming sessions found');
    }

    return session;
  }
}
