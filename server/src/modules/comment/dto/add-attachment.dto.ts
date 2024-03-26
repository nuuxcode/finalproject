import { ApiProperty } from '@nestjs/swagger';

export class AttachmentMetadataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  url: string;
}
