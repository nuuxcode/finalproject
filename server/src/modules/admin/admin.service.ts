// this serves as the service layer for the admin module that generates metrics for the admin dashboard.
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { stringify } from 'querystring';
// import { PrismaClient } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  /**
   * Retrieves the count of users, posts, forums, and tags.
   * @returns An object containing the count of users, posts, forums, and tags.
   */
  
  async getCountData() {
    const users = await this.prisma.user.count();
    const posts = await this.prisma.post.count();
    const forums = await this.prisma.forum.count();
    const tags = await  this.prisma.tag.count();
    return {"users": users, 'posts':posts, 'forums':forums, 'tags':tags};
  }

  /**
   * Retrieves the average likes per post
   * @returns The average of all post likes.
   */
  calculatePostLikesAverage() {
    return this.prisma.post.aggregate({
      _avg: {
        votesCount: true,
      },
    });
  } 
  /**
   * Retrieves the maximum post likes.
   * @returns The maximum post likes.
   */
  findMaxPostLikes() {
    return this.prisma.post.aggregate({
      _max: {
        votesCount: true,
      },
    });
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
  // method to get  users with the most comments
  async findTopTenCommenters() {
    const users = await this.prisma.user.findMany({
      take: 10,
      orderBy: {
        CommentCount: 'desc',
      },
    });
    return users;
  }
  // method to get users with the most forum subscriptions
  async findTopTenSubscribers() {
    const users = await this.prisma.user.findMany({
      take: 10,
      orderBy: {
        subscribedForumsCount: 'desc',
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