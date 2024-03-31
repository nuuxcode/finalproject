import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController, PostCommentController } from './comment.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CommentController, PostCommentController],
  providers: [CommentService, PrismaService],
})
export class CommentModule {}
