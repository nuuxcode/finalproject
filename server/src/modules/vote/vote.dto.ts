import { ApiProperty } from '@nestjs/swagger';

export class VoteDto {
  @ApiProperty({ description: 'The vote status', example: 1 })
  voteStatus: number;
}
