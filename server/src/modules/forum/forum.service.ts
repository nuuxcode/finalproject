import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Forum as ForumModel } from '@prisma/client';
import { CreateForumDTO } from './forum.dto';

@Injectable()
export class ForumService {
  constructor(private prisma: PrismaService) {}

  getAllForums(page: number = 0, limit: number = 10) {
    return this.prisma.forum.findMany({
      skip: page * limit,
      take: Number(limit),
    });
  }

  async getForumByIdOrSlug(idOrSlug: string) {
    let forum = await this.prisma.forum.findUnique({ where: { id: idOrSlug } });
    if (!forum) {
      forum = await this.prisma.forum.findUnique({ where: { slug: idOrSlug } });
    }
    return forum;
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

  getSubscribersForForum(forumId: string) {
    return this.prisma.forumSubscription.findMany({
      where: { forumId: forumId },
    });
  }

  async updateForum(
    idOrSlug: string,
    forumData: CreateForumDTO,
  ): Promise<ForumModel> {
    let forum = await this.prisma.forum.findUnique({ where: { id: idOrSlug } });
    if (!forum) {
      forum = await this.prisma.forum.findUnique({ where: { slug: idOrSlug } });
    }
    if (!forum) {
      throw new Error('Forum not found');
    }

    const existingForumWithNewSlug = await this.prisma.forum.findUnique({
      where: { slug: forumData.slug },
    });
    if (
      existingForumWithNewSlug &&
      existingForumWithNewSlug.id !== forum.id &&
      existingForumWithNewSlug.slug === forumData.slug
    ) {
      throw new Error('A forum with this slug already exists.');
    }
    console.log('existingForumWithNewSlug', existingForumWithNewSlug);
    console.log('forum', forum);
    console.log('forumData', forumData);

    return this.prisma.forum.update({
      where: { id: forum.id },
      data: {
        name: forumData.name,
        description: forumData.description,
        slug: forumData.slug,
      },
    });
  }

  async create(userId: string, forumData: CreateForumDTO): Promise<ForumModel> {
    const { name, description, slug } = forumData;
    const existingForum = await this.prisma.forum.findUnique({
      where: { slug },
    });
    console.log('existingForum', existingForum);
    if (existingForum) {
      throw new Error('A forum with this slug already exists.');
    }
    return this.prisma.forum.create({
      data: {
        name,
        description,
        slug,
        owner: {
          connect: { id: userId },
        },
        moderations: {
          create: {
            user: {
              connect: { id: userId },
            },
          },
        },
      },
    });
  }

  async getForumsByOwnerId(ownerUserId: string): Promise<ForumModel[]> {
    return this.prisma.forum.findMany({
      where: { ownerUserId },
    });
  }
  async getModeratorForums(userId: string) {
    const forumModerators = await this.prisma.forumModerator.findMany({
      where: { userId },
      include: { forum: true },
    });

    return forumModerators.map((moderator) => moderator.forum);
  }
}