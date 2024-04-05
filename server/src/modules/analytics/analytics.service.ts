import { Injectable } from '@nestjs/common';
//import { CreateAnalyticsDto } from './dto/create-analytics.dto';
//import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}
  /**
   * Retrieves the count of users, posts, forums, and tags.
   * @returns An object containing the count of users, posts, forums, and tags.
   */

  async getCountData() {
    const users = await this.prisma.user.count();
    const posts = await this.prisma.post.count();
    const forums = await this.prisma.forum.count();
    const tags = await this.prisma.tag.count();
    return { users: users, posts: posts, forums: forums, tags: tags };
  }

  async getCommentsByMonth() {
    const commentsByMonth = await this.prisma.$queryRaw<
      { month: number; count: number }[]
    >`
    SELECT EXTRACT(MONTH FROM "createdAt") AS month, COUNT(*) AS count
    FROM "Comment"
    GROUP BY EXTRACT(MONTH FROM "createdAt")
    ORDER BY month;
  `;

    const result: { month: number; count: number }[] = [];

    for (let i = 1; i <= 12; i++) {
      const entry = commentsByMonth.find((item) => Number(item.month) === i);

      result.push({
        month: i,
        count: entry ? Number(entry.count) : 0,
      });
    }
    return result;
  }

  async getPostsByMonth() {
    const postsByMonth = await this.prisma.$queryRaw<
      { month: number; count: number }[]
    >`
    SELECT EXTRACT(MONTH FROM "createdAt") AS month, COUNT(*) AS count
    FROM "Post"
    GROUP BY EXTRACT(MONTH FROM "createdAt")
    ORDER BY month;
  `;

    const result: { month: number; count: number }[] = [];

    for (let i = 1; i <= 12; i++) {
      const entry = postsByMonth.find((item) => Number(item.month) === i);

      result.push({
        month: i,
        count: entry ? Number(entry.count) : 0,
      });
    }
    return result;
  }

  async getForumsByMonth() {
    const forumsByMonth = await this.prisma.$queryRaw<
      { month: number; count: number }[]
    >`
    SELECT EXTRACT(MONTH FROM "createdAt") AS month, COUNT(*) AS count
    FROM "Forum"
    GROUP BY EXTRACT(MONTH FROM "createdAt")
    ORDER BY month;
  `;

    const result: { month: number; count: number }[] = [];

    for (let i = 1; i <= 12; i++) {
      const entry = forumsByMonth.find((item) => Number(item.month) === i);

      result.push({
        month: i,
        count: entry ? Number(entry.count) : 0,
      });
    }
    return result;
  }

  async getUsersByMonth() {
    const usersByMonth = await this.prisma.$queryRaw<
      { month: number; count: number }[]
    >`
    SELECT EXTRACT(MONTH FROM "createdAt") AS month, COUNT(*) AS count
    FROM "User"
    GROUP BY EXTRACT(MONTH FROM "createdAt")
    ORDER BY month;
  `;

    const result: { month: number; count: number }[] = [];

    for (let i = 1; i <= 12; i++) {
      const entry = usersByMonth.find((item) => Number(item.month) === i);

      result.push({
        month: i,
        count: entry ? Number(entry.count) : 0,
      });
    }
    return result;
  }

  async getUserVerificationCounts() {
    const verifiedUsersCount = await this.prisma.user.count({
      where: { emailVerified: true },
    });

    const pendingUsersCount = await this.prisma.user.count({
      where: { emailVerified: false },
    });

    return { verified: verifiedUsersCount, pending: pendingUsersCount };
  }

  async getPostsCommentsPercentage() {
    const posts = await this.prisma.post.count();
    const postsWithComments = await this.prisma.post.count({
      where: {
        commentsCount: {
          gt: 0,
        },
      },
    });
    return { postsReplied: (postsWithComments / posts) * 100 };
  }

  // method to find the top ten posts with the most likes
  async findTopTenPosts() {
    const posts = await this.prisma.post.findMany({
      take: 10,
      orderBy: {
        viewsCount: 'desc',
      },
    });
    return posts;
  }

  // method to get users with the most posts
  async findTopTenUsers() {
    const users = await this.prisma.user.findMany({
      take: 10,
      orderBy: {
        PostCount: 'desc',
      },
    });
    return users;
  }

  // method to get the most popular forums
  async findTopTenForums() {
    const forums = await this.prisma.forum.findMany({
      take: 10,
      orderBy: {
        postsCount: 'desc',
      },
    });
    return forums;
  }
}
