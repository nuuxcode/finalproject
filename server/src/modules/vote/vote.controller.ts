import { Controller, Put, Param, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { VoteService } from './vote.service';
//import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { VoteDto } from './vote.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ClerkRequiredGuard } from '../clerk/clerk.module';

@Controller('')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}
  @ApiTags('posts')
  @ApiCookieAuth()
  //@UseGuards(AuthGuard('jwt'))
  @UseGuards(ClerkRequiredGuard)
  @Put('/posts/:id/vote')
  @ApiOperation({ summary: 'Vote on a post' })
  @ApiParam({ name: 'id', description: 'The ID of the post' })
  @ApiBody({ type: VoteDto })
  async vote(
    @Req() request: Request,
    @Param('id') postId: string,
    @Body() voteDto: VoteDto,
  ) {
    console.log('userId', request.user.id);
    const userId = request.user.id;
    try {
      return await this.voteService.votePost(
        userId,
        postId,
        voteDto.voteStatus,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiTags('comments')
  @ApiCookieAuth()
  //@UseGuards(AuthGuard('jwt'))
  @UseGuards(ClerkRequiredGuard)
  @Put('/comments/:id/vote')
  @ApiOperation({ summary: 'Vote on a comment' })
  @ApiParam({ name: 'id', description: 'The ID of the comment' })
  @ApiBody({ type: VoteDto })
  async voteComment(
    @Req() request: Request,
    @Param('id') commentId: string,
    @Body() voteDto: VoteDto,
  ) {
    console.log('userId', request.user.id);
    const userId = request.user.id;
    try {
      return await this.voteService.voteComment(
        userId,
        commentId,
        voteDto.voteStatus,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
