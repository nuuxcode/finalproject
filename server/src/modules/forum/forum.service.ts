import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Forum as ForumModel } from '@prisma/client';
import { CreateForumDTO } from './forum.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ForumService {
  constructor(private prisma: PrismaService) {}

  getAllForums(page: number = 0, limit: number = 10) {
    return this.prisma.forum.findMany({
      skip: page * limit,
      take: Number(limit),
    });
  }

  async findForum(whereClause: Prisma.ForumWhereUniqueInput) {
    const forum = await this.prisma.forum.findUnique({
      where: whereClause,
      include: {
        posts: {
          take: 10,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            comments: true,
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
            forum: {
              select: {
                id: true,
                slug: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (forum) {
      forum.posts = forum.posts.map((post) => ({
        ...post,
        attachments: post.attachments.map((attachment) => ({
          id: attachment.id,
          postId: attachment.postId,
          attachmentId: attachment.attachmentId,
          name: attachment.attachment.name,
          type: attachment.attachment.type,
          url: attachment.attachment.url,
          createdAt: attachment.attachment.createdAt,
          updatedAt: attachment.attachment.updatedAt,
        })),
      })) as any;
    }

    return forum;
  }

  async getForumByIdOrSlug(idOrSlug: string) {
    console.log('idOrSlug', idOrSlug);
    let forum = await this.findForum({ id: idOrSlug });

    if (!forum) {
      forum = await this.findForum({ slug: idOrSlug });
    }

    return forum;
  }

  async getPostsForForumByIdOrSlug(
    idOrSlug: string,
    page: number = 0,
    limit: number = 10,
  ) {
    // Try to get the forum by ID first
    let forum = await this.prisma.forum.findUnique({ where: { id: idOrSlug } });

    // If no forum is found, try to get it by slug
    if (!forum) {
      forum = await this.prisma.forum.findUnique({ where: { slug: idOrSlug } });
    }

    // If still no forum is found, return an empty array
    if (!forum) {
      return [];
    }

    // If a forum is found, get its posts
    let posts = await this.prisma.post.findMany({
      where: { forumId: forum.id },
      skip: page * limit,
      take: Number(limit),
      include: {
        comments: true,
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

    posts = posts.map((post) => ({
      ...post,
      attachments: post.attachments.map((attachment) => ({
        id: attachment.id,
        postId: attachment.postId,
        attachmentId: attachment.attachmentId,
        attachment: {
          id: attachment.attachment.id,
          name: attachment.attachment.name,
          type: attachment.attachment.type,
          url: attachment.attachment.url,
          createdAt: attachment.attachment.createdAt,
          updatedAt: attachment.attachment.updatedAt,
        },
      })),
    }));

    return posts;
  }

  async getPostsForForum(
    forumId: string,
    page: number = 0,
    limit: number = 10,
  ) {
    let posts = await this.prisma.post.findMany({
      where: { forumId: forumId },
      skip: page * limit,
      take: Number(limit),
      include: {
        comments: true,
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

    posts = posts.map((post) => ({
      ...post,
      attachments: post.attachments.map((attachment) => ({
        id: attachment.id,
        postId: attachment.postId,
        attachmentId: attachment.attachmentId,
        attachment: {
          id: attachment.attachment.id,
          name: attachment.attachment.name,
          type: attachment.attachment.type,
          url: attachment.attachment.url,
          createdAt: attachment.attachment.createdAt,
          updatedAt: attachment.attachment.updatedAt,
        },
      })),
    }));

    return posts;
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

  async getForumsByOwnerIdOrUsername(
    idOrUsername: string,
  ): Promise<ForumModel[]> {
    let user = await this.prisma.user.findUnique({
      where: { id: idOrUsername },
    });
    if (!user) {
      user = await this.prisma.user.findUnique({
        where: { username: idOrUsername },
      });
    }

    if (!user) {
      throw new NotFoundException(
        `User with ID or username ${idOrUsername} not found`,
      );
    }

    return this.prisma.forum.findMany({
      where: { ownerUserId: user.id },
    });
  }

  async getModeratorForums(userId: string) {
    const forumModerators = await this.prisma.forumModerator.findMany({
      where: { userId },
      include: { forum: true },
    });

    return forumModerators.map((moderator) => moderator.forum);
  }

  async getModeratorForumsByUserIdOrUsername(idOrUsername: string) {
    let user = await this.prisma.user.findUnique({
      where: { id: idOrUsername },
    });
    if (!user) {
      user = await this.prisma.user.findUnique({
        where: { username: idOrUsername },
      });
    }

    if (!user) {
      throw new NotFoundException(
        `User with ID or username ${idOrUsername} not found`,
      );
    }

    const forumModerators = await this.prisma.forumModerator.findMany({
      where: { userId: user.id },
      include: { forum: true },
    });

    return forumModerators.map((moderator) => moderator.forum);
  }
}
