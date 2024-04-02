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

    // Check if the forum exists
    const forum = await this.prisma.forum.findUnique({
      where: { id: forumId },
    });
    if (!forum) {
      throw new Error('Forum not found');
    }

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
  ): Promise<any> {
    let post: any = await this.prisma.post.findUnique({
      where: postWhereUniqueInput,
      include: {
        forum: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
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
        comments: {
          include: {
            user: {
              select: {
                username: true,
                avatarUrl: true,
                reputation: true,
              },
            },
          },
        },
      },
    });

    if (post) {
      post = {
        ...post,
        attachments: post.attachments.map(
          (attachment) => attachment.attachment,
        ),
        comments: post.comments.map(({ user, ...comment }) => ({
          ...comment,
          username: user.username,
          avatarUrl: user.avatarUrl,
          reputation: user.reputation,
        })),
      };
    }

    return post;
  }

  async findAll(params: {
    page?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithAggregationInput;
  }): Promise<Post[]> {
    const { page = 0, take = 10, cursor, where, orderBy } = params;

    let posts = await this.prisma.post.findMany({
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
        comments: true,
      },
    });

    posts = posts.map((post) => ({
      ...post,
      attachments: post.attachments.map((attachment) => attachment.attachment),
    })) as any;

    return posts;
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
