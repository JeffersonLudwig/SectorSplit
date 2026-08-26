import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  /** GET /api/posts/:id/comments */
  @Get('posts/:id/comments')
  findByPost(@Param('id') postId: string) {
    return this.commentsService.findByPost(postId);
  }

  /** POST /api/posts/:id/comments */
  @Post('posts/:id/comments')
  @UseGuards(JwtAuthGuard)
  create(
    @Param('id') postId: string,
    @Body() dto: CreateCommentDto,
    @CurrentUser() user: any,
  ) {
    return this.commentsService.create(postId, dto, user.id);
  }

  /** PATCH /api/comments/:id */
  @Patch('comments/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCommentDto,
    @CurrentUser() user: any,
  ) {
    await this.commentsService.assertOwnerOrAdmin(id, user.id, user.role);
    return this.commentsService.update(id, dto);
  }

  /** DELETE /api/comments/:id */
  @Delete('comments/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    await this.commentsService.assertOwnerOrAdmin(id, user.id, user.role);
    return this.commentsService.remove(id);
  }
}
