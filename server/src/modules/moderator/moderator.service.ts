import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ModeratorService {
  constructor(private prisma: PrismaService) {}

  async getModerators() {
    return this.prisma.user.findMany({
      where: {
        moderations: {
          some: {},
        },
      },
    });
  }

  async getForumModerators(forumId: string) {
    const forumModerators = await this.prisma.forumModerator.findMany({
      where: {
        forumId: forumId,
      },
      include: {
        user: true,
      },
    });

    return forumModerators.map((moderator) => moderator.user);
  }

  async assignModerator(forumId: string, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const existingModerator = await this.prisma.forumModerator.findUnique({
      where: { userId_forumId: { userId: userId, forumId: forumId } },
    });

    if (existingModerator) {
      throw new Error('User is already a moderator for this forum');
    }

    const newModerator = await this.prisma.forumModerator.create({
      data: {
        userId: userId,
        forumId: forumId,
      },
    });

    return {
      message: 'User assigned as moderator successfully',
      moderator: newModerator,
    };
  }

  async removeModerator(forumId: string, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const existingModerator = await this.prisma.forumModerator.findUnique({
      where: { userId_forumId: { userId: userId, forumId: forumId } },
    });

    if (!existingModerator) {
      throw new Error('User is not a moderator for this forum');
    }

    await this.prisma.forumModerator.delete({
      where: {
        userId_forumId: {
          userId: userId,
          forumId: forumId,
        },
      },
    });

    return {
      message: 'User removed as moderator successfully',
    };
  }
}
