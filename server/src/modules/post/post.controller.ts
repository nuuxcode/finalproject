import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { ApiTags, ApiBody } from '@nestjs/swagger';
//import { UseGuards } from '@nestjs/common';
//import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post.service';
import { CreatePostDTO } from './post.dto';

@ApiTags('posts')
@Controller('/posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/')
  async getAllPosts(): Promise<PostModel[]> {
    return this.postService.findAll({});
  }

  @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.findOne({ id: id });
  }

  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.findAll({
      where: { isVisible: true },
    });
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.findAll({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('post')
  @ApiBody({ type: CreatePostDTO })
  //@UseGuards(AuthGuard('jwt')) disable it temporarily
  async createDraft(
    @Body()
    postData: {
      title: string;
      content?: string;
      authorEmail: string;
      slug: string;
      forumId: string;
    },
  ): Promise<PostModel> {
    const { title, content, authorEmail, slug, forumId } = postData;
    return this.postService.create({
      title,
      content,
      slug,
      user: {
        connect: { email: authorEmail },
      },
      forum: {
        connect: { id: forumId },
      },
    });
  }

  @Put('publish/:id')
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.update({
      where: { id: id },
      data: { isVisible: true },
    });
  }

  @Delete('post/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.delete({ id: id });
  }
}
