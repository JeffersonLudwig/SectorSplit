import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ForbiddenException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /** GET /api/races/:slug/posts — list posts for a GP */
  @Get('races/:slug/posts')
  findByRace(
    @Param('slug') slug: string,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
  ) {
    return this.postsService.findByRace(slug, +page, +limit);
  }

  /** POST /api/races/:slug/posts — create post in a GP forum */
  @Post('races/:slug/posts')
  @UseGuards(JwtAuthGuard)
  create(
    @Param('slug') slug: string,
    @Body() dto: CreatePostDto,
    @CurrentUser() user: any,
  ) {
    return this.postsService.create(slug, dto, user.id);
  }

  /** GET /api/posts/:id — post detail */
  @Get('posts/:id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  /** PATCH /api/posts/:id — edit post (owner or admin only) */
  @Patch('posts/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
    @CurrentUser() user: any,
  ) {
    await this.postsService.assertOwnerOrAdmin(id, user.id, user.role);
    return this.postsService.update(id, dto);
  }

  /** DELETE /api/posts/:id — delete post (owner or admin only) */
  @Delete('posts/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    await this.postsService.assertOwnerOrAdmin(id, user.id, user.role);
    return this.postsService.remove(id);
  }
}
