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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiBody({
    type: CreatePostDto,
    description: 'Data to create a new post',
  })
  @ApiCreatedResponse({
    description: 'The post has been successfully created.',
    type: CreatePostDto,
  })
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
  @ApiQuery({ name: 'limit', required: true, type: Number })
  @ApiQuery({ name: 'skip', required: true, type: Number })
  @ApiQuery({ name: 'cursor', required: false, type: String })
  async findAll(
    // use cursor based pagination
    @Query('limit') limit: number,
    @Query('skip') skip: number,
    @Query('cursor') cursor?: string,
    // @Query('tagId') tagId?: string,
  ) {
    const result = await this.postsService.findAll(limit, skip, cursor);
    return result;
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.postsService.findOne(id);
  // }
  @Get(':id')
  @ApiQuery({
    name: 'filter',
    required: false,
    type: String,
    description: 'Filter posts by id',
  })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @ApiQuery(UpdatePostDto)
  // @UseGuards(IsMineGuard)  💡 Prevent user from updating other user's posts
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiQuery({
    name: 'delete',
    required: false,
    type: String,
    description: 'Delete posts by id',
  })
  // @UseGuards(IsMineGuard)  💡 Prevent user from updating other user's posts
  remove(@Param('id') id: string) {
    return this.postsService.delete(id);
  }
}
