import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { Post as PostModel } from '@prisma/client';
import { CreatePostDTO } from './post.dto';
import slugify from 'slugify';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, postData: CreatePostDTO): Promise<PostModel> {
    const { title, content, forumId } = postData;
    const slug = slugify(title, { lower: true, strict: true }).substring(
      0,
      100,
    );
    return this.prisma.post.create({
      data: {
        title,
        content,
        slug,
        user: {
          connect: { id: userId },
        },
        forum: {
          connect: { id: forumId },
        },
      },
    });
  }

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
        upvotesCount: post.upvotesCount,
        downvotesCount: post.downvotesCount,
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
    page?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithAggregationInput;
  }): Promise<Post[]> {
    const { page = 0, take = 10, cursor, where, orderBy } = params;

    const posts = await this.prisma.post.findMany({
      skip: page * take,
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
        forum: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return posts.map((post) => ({
      ...post,
      forum: {
        name: post.forum.name,
        slug: post.forum.slug,
      },
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
    }));
  }

  // async create(data: Prisma.PostCreateInput): Promise<Post> {
  //   return this.prisma.post.create({
  //     data,
  //   });
  // }

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
