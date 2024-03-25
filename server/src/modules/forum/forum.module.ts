import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';

@Module({
  imports: [],
  controllers: [ForumController],
  providers: [ForumService, PrismaService],
})
export class ForumModule {}
