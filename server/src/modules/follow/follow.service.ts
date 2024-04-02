import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FollowService {
  constructor(private prisma: PrismaService) {}

  async getUserByIdOrUsername(idOrUsername: string) {
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

  async getFollowers(idOrUsername: string) {
    const user = await this.getUserByIdOrUsername(idOrUsername);
    const followers = await this.prisma.userFollows.findMany({
      where: { followingId: user.id },
      include: { follower: true },
    });
    return {
      user,
      followers: followers.map((follow) => follow.follower),
    };
  }

  async getFollowings(idOrUsername: string) {
    const user = await this.getUserByIdOrUsername(idOrUsername);
    const followings = await this.prisma.userFollows.findMany({
      where: { followerId: user.id },
      include: { following: true },
    });
    return {
      user,
      followings: followings.map((follow) => follow.following),
    };
  }

  async followUser(idOrUsername: string, followingIdOrUsername: string) {
    const user = await this.getUserByIdOrUsername(idOrUsername);
    const followingUser = await this.getUserByIdOrUsername(
      followingIdOrUsername,
    );
    const userId = user.id;
    const followingId = followingUser.id;

    // Check if the follow relation already exists
    const existingFollow = await this.prisma.userFollows.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: followingId,
        },
      },
    });

    if (existingFollow) {
      throw new Error('User is already following this user');
    }

    // Create the follow relation
    await this.prisma.userFollows.create({
      data: {
        followerId: userId,
        followingId: followingId,
      },
    });

    // Increment the followingCount of the user
    await this.prisma.user.update({
      where: { id: userId },
      data: { followingCount: { increment: 1 } },
    });

    // Increment the followersCount of the user being followed
    await this.prisma.user.update({
      where: { id: followingId },
      data: { followersCount: { increment: 1 } },
    });

    return { message: 'User followed successfully' };
  }

  async unfollowUser(idOrUsername: string, followingIdOrUsername: string) {
    const user = await this.getUserByIdOrUsername(idOrUsername);
    const followingUser = await this.getUserByIdOrUsername(
      followingIdOrUsername,
    );
    const userId = user.id;
    const followingId = followingUser.id;

    // Check if the follow relation exists
    const existingFollow = await this.prisma.userFollows.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: followingId,
        },
      },
    });

    if (!existingFollow) {
      throw new Error('User is not following this user');
    }

    // Delete the follow relation
    await this.prisma.userFollows.delete({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: followingId,
        },
      },
    });

    // Decrement the followingCount of the user
    await this.prisma.user.update({
      where: { id: userId },
      data: { followingCount: { decrement: 1 } },
    });

    // Decrement the followersCount of the user being unfollowed
    await this.prisma.user.update({
      where: { id: followingId },
      data: { followersCount: { decrement: 1 } },
    });

    return { message: 'User unfollowed successfully' };
  }
}
