import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RacesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.race.findMany({
      where: { season: 2026 },
      orderBy: { round: 'asc' },
      include: {
        circuit: true,
        sessions: { orderBy: { startsAt: 'asc' } },
      },
    });
  }

  async findBySlug(slug: string) {
    const race = await this.prisma.race.findUnique({
      where: { slug },
      include: {
        circuit: true,
        sessions: { 
          orderBy: { startsAt: 'asc' },
          include: {
            results: {
              orderBy: { position: 'asc' },
              include: {
                driver: {
                  include: { team: true }
                }
              }
            }
          }
        },
        posts: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            author: { select: { id: true, username: true, avatarUrl: true } },
            _count: { select: { comments: true } },
          },
        },
      },
    });

    if (!race) {
      throw new NotFoundException(`Race with slug "${slug}" not found`);
    }

    return race;
  }
}
