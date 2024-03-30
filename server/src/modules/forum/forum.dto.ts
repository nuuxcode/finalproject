import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { IsSlug } from './is-slug.validator';

export class CreateForumDTO {
  @ApiProperty({ description: 'The name of the forum' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The slug of the forum' })
  @IsString()
  @IsSlug()
  @Length(1, 50)
  slug: string;

  @ApiProperty({ description: 'The description of the forum' })
  @IsString()
  description: string;

  // @ApiProperty({ description: 'The ID of the user who owns the forum' })
  // @IsString()
  // ownerUserId: string;

  // @ApiProperty({ description: 'The logo of the forum', required: false })
  // @IsString()
  // @IsOptional()
  // logo?: string;

  // @ApiProperty({ description: 'The banner of the forum', required: false })
  // @IsString()
  // @IsOptional()
  // banner?: string;
}
