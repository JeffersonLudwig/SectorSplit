import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

const AUTHOR_SELECT = {
  id: true,
  username: true,
  avatarUrl: true,
};

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByRace(slug: string, page: number, limit: number) {
    const race = await this.prisma.race.findUnique({ where: { slug } });
    if (!race) throw new NotFoundException(`Race "${slug}" not found`);

    const skip = (page - 1) * limit;
    const [total, posts] = await Promise.all([
      this.prisma.post.count({ where: { raceId: race.id } }),
      this.prisma.post.findMany({
        where: { raceId: race.id },
        skip,
        take: limit,
        orderBy: [{ pinned: 'desc' }, { createdAt: 'desc' }],
        include: {
          author: { select: AUTHOR_SELECT },
          _count: { select: { comments: true } },
        },
      }),
    ]);

    return {
      data: posts,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async create(slug: string, dto: CreatePostDto, authorId: string) {
    const race = await this.prisma.race.findUnique({ where: { slug } });
    if (!race) throw new NotFoundException(`Race "${slug}" not found`);

    return this.prisma.post.create({
      data: { ...dto, raceId: race.id, authorId },
      include: { author: { select: AUTHOR_SELECT } },
    });
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: AUTHOR_SELECT },
        race: { select: { id: true, name: true, slug: true } },
        _count: { select: { comments: true } },
      },
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(id: string, dto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: dto,
      include: { author: { select: AUTHOR_SELECT } },
    });
  }

  async remove(id: string) {
    return this.prisma.post.delete({ where: { id } });
  }

  async assertOwnerOrAdmin(
    postId: string,
    userId: string,
    role: string,
  ): Promise<void> {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });
    if (!post) throw new NotFoundException('Post not found');
    if (post.authorId !== userId && role !== 'ADMIN') {
      throw new ForbiddenException(
        'You can only edit or delete your own posts',
      );
    }
  }
}
