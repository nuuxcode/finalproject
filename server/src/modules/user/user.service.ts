import {
  //PostVotes,
  Prisma,
  User,
  //ForumSubscription,
  //CommentVotes,
  Post,
  Comment,
} from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.PostOrderByWithAggregationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async getUserByIdOrUsername(idOrUsername: string): Promise<User> {
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
    return user;
  }

  async getUserById(id: string): Promise<User> {
    console.log('id', id);
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async getUserPosts(idOrUsername: string): Promise<Post[]> {
    const user = await this.getUserByIdOrUsername(idOrUsername);
    return this.prisma.post.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  async getUserComments(idOrUsername: string): Promise<Comment[]> {
    const user = await this.getUserByIdOrUsername(idOrUsername);
    return this.prisma.comment.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  async getUserPostVotes(idOrUsername: string): Promise<any[]> {
    const user = await this.getUserByIdOrUsername(idOrUsername);
    const postVotes = await this.prisma.postVotes.findMany({
      where: {
        userId: user.id,
        voteStatus: {
          in: [1, -1],
        },
      },
      include: {
        post: true,
      },
    });

    return postVotes.map((postVote) => ({
      ...postVote,
      title: postVote.post.title,
      content: postVote.post.content,
      userId: postVote.post.userId,
      forumId: postVote.post.forumId,
      isPinned: postVote.post.isPinned,
      isVisible: postVote.post.isVisible,
      slug: postVote.post.slug,
      updatedAt: postVote.post.updatedAt,
      votesCount: postVote.post.votesCount,
      upvotesCount: postVote.post.upvotesCount,
      downvotesCount: postVote.post.downvotesCount,
      post: undefined,
    }));
  }

  async getUserCommentVotes(idOrUsername: string): Promise<any[]> {
    const user = await this.getUserByIdOrUsername(idOrUsername);
    const commentVotes = await this.prisma.commentVotes.findMany({
      where: {
        userId: user.id,
      },
      include: {
        comment: true,
      },
    });

    return commentVotes.map((commentVote) => ({
      ...commentVote,
      content: commentVote.comment.content,
      userId: commentVote.comment.userId,
      postId: commentVote.comment.postId,
      isVisible: commentVote.comment.isVisible,
      parentId: commentVote.comment.parentId,
      updatedAt: commentVote.comment.updatedAt,
      downvotesCount: commentVote.comment.downvotesCount,
      upvotesCount: commentVote.comment.upvotesCount,
      comment: undefined,
    }));
  }

  async getUserSubscriptions(idOrUsername: string): Promise<any[]> {
    const user = await this.getUserByIdOrUsername(idOrUsername);
    const subscriptions = await this.prisma.forumSubscription.findMany({
      where: {
        userId: user.id,
      },
      include: {
        forum: true,
      },
    });

    return subscriptions.map((subscription) => ({
      ...subscription,
      name: subscription.forum.name,
      slug: subscription.forum.slug,
      description: subscription.forum.description,
      ownerUserId: subscription.forum.ownerUserId,
      logo: subscription.forum.logo,
      banner: subscription.forum.banner,
      updatedAt: subscription.forum.updatedAt,
      postsCount: subscription.forum.postsCount,
      viewsCount: subscription.forum.viewsCount,
      subscribersCount: subscription.forum.subscribersCount,
      deletedAt: subscription.forum.deletedAt,
      forum: undefined,
    }));
  }
}
