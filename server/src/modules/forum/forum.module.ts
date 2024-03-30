import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';
import { ModeratorService } from '../moderator/moderator.service';
import { ModeratorController } from '../moderator/moderator.controller';

@Module({
  imports: [],
  controllers: [ForumController, ModeratorController],
  providers: [ForumService, PrismaService, ModeratorService],
})
export class ForumModule {}
