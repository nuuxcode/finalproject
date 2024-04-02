import { ApiProperty } from '@nestjs/swagger';

export class ReportDto {
  // @ApiProperty({ description: 'The ID of the reporter' })
  // reporterId: string;

  @ApiProperty({ description: 'The ID of the post', required: false })
  postId?: string;

  @ApiProperty({ description: 'The ID of the comment', required: false })
  commentId?: string;

  @ApiProperty({ description: 'The reason for the report' })
  reason: string;
}

export class UpdateReportDto {
  @ApiProperty({ description: 'The action taken on the report' })
  actionTaken: string;

  // @ApiProperty({ description: 'The ID of the user who resolved the report' })
  // resolvedBy: string;
}
