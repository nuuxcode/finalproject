import { ApiProperty } from '@nestjs/swagger';

export class CreateNewCommentDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  userId: string;
}

export class CreateCommentDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  postId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  parentId?: string;
}
