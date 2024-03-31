import { ApiProperty } from '@nestjs/swagger';

export class CreateNewCommentDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  authorEmail: string;
}

export class CreateCommentDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  postId: string;

  @ApiProperty()
  authorEmail: string;

  @ApiProperty()
  parentId?: string;
}
