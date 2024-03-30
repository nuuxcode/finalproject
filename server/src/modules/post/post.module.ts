import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { PostService } from './post.service';
import { PostController } from './post.controller';
import { VoteService } from '../vote/vote.service';
import { VoteController } from '../vote/vote.controller';

@Module({
  imports: [],
  controllers: [PostController, VoteController],
  providers: [PostService, PrismaService, VoteService],
  exports: [PostService],
})
export class PostModule {}
