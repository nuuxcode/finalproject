import { ApiProperty } from '@nestjs/swagger';
import { AttachmentMetadataDto } from './add-attachment.dto';
import { CreateCommentDto } from './create-comment.dto';

export class commentAttachDto {
  @ApiProperty()
  createCommentDto: CreateCommentDto;

  @ApiProperty()
  attachmentMetadataDto: AttachmentMetadataDto;
}
