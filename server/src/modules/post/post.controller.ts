import {
  //Body,
  Controller,
  //Delete,
  Get,
  //Param,
  //Post,
  //Put,
} from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { ApiTags /*, ApiBody*/ } from '@nestjs/swagger';
//import { UseGuards } from '@nestjs/common';
//import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post.service';
//import { CreatePostDTO } from './post.dto';
@ApiTags('posts')
@Controller('/posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/')
  async getAllPosts(): Promise<PostModel[]> {
    return this.postService.findAll({});
  }

  /*@Get('post/:id')
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
  @UseGuards(AuthGuard('jwt'))
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<PostModel> {
    const { title, content, authorEmail } = postData;
    return this.postService.create({
      title,
      content,
      User: {
        connect: { email: authorEmail },
      },
    });
  }

  @Put('publish/:id')
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.update({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('post/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.delete({ id: Number(id) });
  }*/
}
