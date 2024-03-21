import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // Request,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
// import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Prisma } from '@prisma/client';
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
    @Body() createPostDto: Prisma.PostCreateInput,
    // TODO. GET user from incoming request
    // @Request() req: ExpressRequestWithUser
  ) {
    // update post info with authed user
    // createPostDto.userId = req.user.sub;
    return this.postsService.create(createPostDto);
  }

  @Get()
  async findAll(
    // use cursor based pagination
    @Query('limit') limit: number,
    @Query('skip') skip: number,
    @Query('cursor') cursor: string,
    // @Query('tagId') tagId?: string,
  ) {
    const result = await this.postsService.findAll(limit, skip, cursor);
    return result;
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  // @UseGuards(IsMineGuard)  💡 Prevent user from updating other user's posts
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  // @UseGuards(IsMineGuard)  💡 Prevent user from updating other user's posts
  remove(@Param('id') id: string) {
    return this.postsService.delete(id);
  }
}
