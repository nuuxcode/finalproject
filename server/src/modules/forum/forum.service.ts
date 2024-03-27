import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ForumService {
  constructor(private prisma: PrismaService) {}

  getAllForums(page: number = 0, limit: number = 10) {
    return this.prisma.forum.findMany({
      skip: page * limit,
      take: Number(limit),
    });
  }

  getForumForUser(userId: string) {
    return this.prisma.forum.findMany({ where: { ownerUserId: userId } });
  }

  getPostsForForum(forumId: string, page: number = 0, limit: number = 10) {
    return this.prisma.post.findMany({
      where: { forumId: forumId },
      skip: page * limit,
      take: Number(limit),
      include: {
        user: {
          select: {
            username: true,
            avatarUrl: true,
            reputation: true,
          },
        },
        attachments: {
          include: {
            attachment: true,
          },
        },
      },
    });
  }

  getModeratorForForum(forumId: string) {
    return this.prisma.forumModerator.findMany({ where: { forumId: forumId } });
  }

  getSubscribersForForum(forumId: string) {
    return this.prisma.forumSubscription.findMany({
      where: { forumId: forumId },
    });
  }

  createForum(forumData: any) {
    return this.prisma.forum.create({ data: forumData });
  }
}
