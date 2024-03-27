import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { ApiTags, ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
//import { UseGuards } from '@nestjs/common';
//import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post.service';
import { CreatePostDTO } from './post.dto';

@ApiTags('posts')
@Controller('/posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/')
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default is 0)',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of posts per page (default is 10)',
  })
  @ApiResponse({ status: 200, description: 'Return all posts with pagination' })
  async getAllPosts(
    @Query('page') page: number,
    @Query('take') take: number,
  ): Promise<PostModel[]> {
    return this.postService.findAll({ page, take });
  }

  @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.findOne({ id: id });
  }

  @Get('feed')
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default is 0)',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of posts per page (default is 10)',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all published posts with pagination',
  })
  async getPublishedPosts(
    @Query('page') page: number,
    @Query('take') take: number,
  ): Promise<PostModel[]> {
    return this.postService.findAll({
      page,
      take,
      where: { isVisible: true },
    });
  }

  @Get('full-text-search/:searchString')
  async getFullTextSearchPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.searchPosts(searchString);
  }

  @Get('filtered-posts/:searchString')
  async getFilteredSearchPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.findAll({
      where: {
        OR: [
          {
            title: { contains: searchString, mode: 'insensitive' },
          },
          {
            content: { contains: searchString, mode: 'insensitive' },
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
