import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { Post as PostModel } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async searchPosts(searchTerm: string): Promise<PostModel[]> {
    const posts = await this.prisma.$queryRaw`
      SELECT *
      FROM "Post"
      WHERE to_tsvector('english', title) @@ plainto_tsquery('english', ${searchTerm})
      OR to_tsvector('english', content) @@ plainto_tsquery('english', ${searchTerm})
    `;

    return (posts as PostModel[]).map((post) => {
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        userId: post.userId,
        forumId: post.forumId,
        isPinned: post.isPinned,
        isVisible: post.isVisible,
        slug: post.slug,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        commentsCount: post.commentsCount,
        viewsCount: post.viewsCount,
        votesCount: post.votesCount,
      } as PostModel;
    });
  }

  async findOne(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
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

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
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

  async create(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { data, where } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }
}
