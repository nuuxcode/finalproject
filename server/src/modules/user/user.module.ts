import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserListener } from './user.listener';
import { ForumService } from '../forum/forum.service';
import { FollowModule } from '../follow/follow.module';

@Module({
  imports: [PrismaModule, FollowModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, UserListener, ForumService],
  exports: [UserService],
})
export class UserModule {}
