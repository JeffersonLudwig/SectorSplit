import { IsString, IsOptional, MinLength } from 'class-validator';

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  body?: string;
}
