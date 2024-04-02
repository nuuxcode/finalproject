import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import {
  ApiTags,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiOperation,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { UseGuards, Req } from '@nestjs/common';
//import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post.service';
import { CreatePostDTO } from './post.dto';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { HttpException, HttpStatus } from '@nestjs/common';
//import { JwtAuthGuard } from '../auth/auth.jwt.guard';
//import { JwtOrClerkGuard } from '../auth/jwt-or-clerk.guard';
import { ClerkRequiredGuard } from '../clerk/clerk.module';

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
  @ApiOperation({ summary: 'Get all posts with pagination' })
  async getAllPosts(
    @Query('page') page: string,
    @Query('take') take: string,
  ): Promise<PostModel[]> {
    const pageNumber = parseInt(page, 10) || 0;
    const takeNumber = parseInt(take, 10) || 10;

    return this.postService.findAll({ page: pageNumber, take: takeNumber });
  }

  @Get('post/:id')
  @ApiOperation({ summary: 'Get a post by its ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the post with the given ID',
  })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async getPostById(@Param('id') id: string): Promise<any> {
    return this.postService.findOne({ id: id });
  }

  @ApiCookieAuth()
  @Post('post')
  @ApiBody({ type: CreatePostDTO })
  @UseGuards(ClerkRequiredGuard)
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async createDraft(
    @Req() request: any,
    @Body() postData: CreatePostDTO,
  ): Promise<PostModel> {
    const userId = request.user.id;
    try {
      return await this.postService.create(userId, postData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiCookieAuth()
  @Roles('admin', 'moderator')
  @UseGuards(RolesGuard)
  @UseGuards(ClerkRequiredGuard)
  @Delete('post/:id')
  @ApiOperation({ summary: 'Delete a post by its ID' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return await this.postService.delete({ id: id });
  }

  // @Get('feed')
  // @ApiQuery({
  //   name: 'page',
  //   required: false,
  //   type: Number,
  //   description: 'Page number (default is 0)',
  // })
  // @ApiQuery({
  //   name: 'take',
  //   required: false,
  //   type: Number,
  //   description: 'Number of posts per page (default is 10)',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Return all published posts with pagination',
  // })
  // async getPublishedPosts(
  //   @Query('page') page: number,
  //   @Query('take') take: number,
  // ): Promise<PostModel[]> {
  //   return this.postService.findAll({
  //     page,
  //     take,
  //     where: { isVisible: true },
  //   });
  // }

  // @Get('full-text-search/:searchString')
  // async getFullTextSearchPosts(
  //   @Param('searchString') searchString: string,
  // ): Promise<PostModel[]> {
  //   return this.postService.searchPosts(searchString);
  // }

  // @Get('filtered-posts/:searchString')
  // async getFilteredSearchPosts(
  //   @Param('searchString') searchString: string,
  // ): Promise<PostModel[]> {
  //   return this.postService.findAll({
  //     where: {
  //       OR: [
  //         {
  //           title: { contains: searchString, mode: 'insensitive' },
  //         },
  //         {
  //           content: { contains: searchString, mode: 'insensitive' },
  //         },
  //       ],
  //     },
  //   });
  // }

  // @Post('post')
  // @ApiBody({ type: CreatePostDTO })
  // //@UseGuards(AuthGuard('jwt')) disable it temporarily
  // async createDraft(
  //   @Body()
  //   postData: {
  //     title: string;
  //     content?: string;
  //     authorEmail: string;
  //     slug: string;
  //     forumId: string;
  //   },
  // ): Promise<PostModel> {
  //   const { title, content, authorEmail, slug, forumId } = postData;
  //   return this.postService.create({
  //     title,
  //     content,
  //     slug,
  //     user: {
  //       connect: { email: authorEmail },
  //     },
  //     forum: {
  //       connect: { id: forumId },
  //     },
  //   });
  // }

  // @Put('publish/:id')
  // async publishPost(@Param('id') id: string): Promise<PostModel> {
  //   return this.postService.update({
  //     where: { id: id },
  //     data: { isVisible: true },
  //   });
  // }
}
