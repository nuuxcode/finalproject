import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PostsService {
  // constructor(private readonly prisma: PrismaService) {}
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    /* TODO:💡 
      ensure user is logged in to create a post
      update DBmodel tu require user field
    */
    try {
      return await this.prisma.post.create({
        data: createPostDto,
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new NotFoundException('User not found');
      }
      throw new HttpException(`Title and Content Required ${error}`, 500);
    }
  }

  async findAll(
    limit: number = 10,
    skip: number = 0,
    cursor: string = null,
    // TODO💡: add unique identifier for tags
    // tagId: string = null,
  ) {
    const posts = await this.prisma.post.findMany({
      take: limit + 1,
      skip: skip,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
        tag: true,
        votes: true,
      },
    });
    let nextCursor: typeof cursor | undefined = undefined;
    if (posts.length > limit) {
      const nextItem = posts.pop();
      nextCursor = nextItem?.id;
    }

    return {
      posts,
      nextCursor,
    };
  }

  async findOne(id: string) {
    return await this.prisma.post.findFirst({
      where: {
        id,
      },
      include: {
        user: true,
        votes: true,
        tag: true,
        attachments: true,
      },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    // TODO: 💡 CHECK IF USER IS ONWER/ADMIN
    try {
      // find post by id. If not found, throw error
      await this.prisma.post.findUniqueOrThrow({
        where: { id },
      });

      // update post using prisma client
      const updatedPost = await this.prisma.post.update({
        where: { id },
        data: {
          ...updatePostDto,
        },
      });

      return updatedPost;
    } catch (error) {
      // check if post not found and throw error
      if (error.code === 'P2025') {
        throw new NotFoundException(`Post with id ${id} not found`);
      }
    }
  }

  async delete(id: string) {
    // TODO: 💡 CHECK IF USER IS ONWER/ADMIN
    try {
      // find post by id. If not found, throw error
      const post = await this.prisma.post.findUniqueOrThrow({
        where: { id },
      });

      // delete post using prisma client
      await this.prisma.post.delete({
        where: { id },
      });

      return `Post with id ${post.id} deleted`;
    } catch (error) {
      // check if post not found and throw error
      if (error.code === 'P2025') {
        throw new NotFoundException(`Post with id ${id} not found`);
      }
    }
  }
}
