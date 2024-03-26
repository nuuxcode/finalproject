import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { ForumService } from './forum.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { CreateForumDto } from './forum.dto';

@ApiTags('forums')
@Controller('forums')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Get()
  @ApiOperation({ summary: 'Get all forums' })
  getAllForums() {
    return this.forumService.getAllForums();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get forum for a specific user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  getForumForUser(@Param('id') userId: string) {
    return this.forumService.getForumForUser(userId);
  }

  @Get(':id/posts')
  @ApiOperation({ summary: 'Get posts for a specific forum' })
  @ApiParam({ name: 'id', description: 'Forum ID' })
  @ApiQuery({ name: 'page', description: 'Page number' })
  @ApiQuery({ name: 'limit', description: 'Limit number of posts' })
  getPostsForForum(
    @Param('id') forumId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.forumService.getPostsForForum(forumId, page, limit);
  }

  @Get(':id/moderator')
  @ApiOperation({ summary: 'Get moderator for a specific forum' })
  @ApiParam({ name: 'id', description: 'Forum ID' })
  getModeratorForForum(@Param('id') forumId: string) {
    return this.forumService.getModeratorForForum(forumId);
  }

  @Get(':id/subscribers')
  @ApiOperation({ summary: 'Get subscribers for a specific forum' })
  @ApiParam({ name: 'id', description: 'Forum ID' })
  getSubscribersForForum(@Param('id') forumId: string) {
    return this.forumService.getSubscribersForForum(forumId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new forum' })
  @ApiBody({ description: 'Forum data', type: CreateForumDto })
  createForum(@Body() forumData: CreateForumDto) {
    return this.forumService.createForum(forumData);
  }
}