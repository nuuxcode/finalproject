import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDTO {
  @ApiProperty({ description: 'The title of the post' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'The content of the post' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ description: 'The ID of the forum where the post is created' })
  @IsNotEmpty()
  @IsString()
  forumId: string;

  @ApiProperty({ description: 'The image URL of the post', required: false })
  @IsString()
  imageUrl?: string;

  // @ApiProperty({ description: 'The ID of the user creating the post' })
  // @IsNotEmpty()
  // @IsString()
  // userId: string;

  // @ApiProperty({ description: 'Whether the post is pinned or not', required: false })
  // @IsOptional()
  // @IsBoolean()
  // isPinned?: boolean;

  // @ApiProperty({ description: 'Whether the post is visible or not', required: false })
  // @IsOptional()
  // @IsBoolean()
  // isVisible?: boolean;

  // @ApiProperty({ description: 'The slug of the post' })
  // @IsNotEmpty()
  // @IsString()
  // slug: string;
}
