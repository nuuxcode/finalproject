import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ForumService } from './forum.service';
import {
  ApiTags,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { Forum as ForumModel } from '@prisma/client';
import { CreateForumDTO } from './forum.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UseGuards, Req } from '@nestjs/common';
//import { AuthGuard } from '@nestjs/passport';
import { ClerkRequiredGuard } from '../clerk/clerk.module';

@ApiTags('forums')
@Controller('forums')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Get()
  @ApiOperation({ summary: 'Get all forums' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default is 0)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of forums per page (default is 10)',
  })
  getAllForums(@Query('page') page: number, @Query('limit') limit: number) {
    return this.forumService.getAllForums(page, limit);
  }

  @ApiCookieAuth()
  @Post()
  @ApiBody({ type: CreateForumDTO })
  //@UseGuards(AuthGuard('jwt'))
  @UseGuards(ClerkRequiredGuard)
  @ApiOperation({ summary: 'Create a new forum' })
  @ApiResponse({
    status: 201,
    description: 'The forum has been successfully created.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async createForum(
    @Req() request: any,
    @Body() forumData: CreateForumDTO,
  ): Promise<ForumModel> {
    const userId = request.user.id;
    try {
      return await this.forumService.create(userId, forumData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':idOrSlug')
  @ApiOperation({ summary: 'Get a specific forum by ID or slug' })
  @ApiParam({ name: 'idOrSlug', description: 'Forum ID or slug' })
  getForumByIdOrSlug(@Param('idOrSlug') idOrSlug: string) {
    return this.forumService.getForumByIdOrSlug(idOrSlug);
  }

  @ApiCookieAuth()
  @Put(':idOrSlug')
  @ApiBody({ type: CreateForumDTO })
  //@UseGuards(AuthGuard('jwt'))
  @UseGuards(ClerkRequiredGuard)
  @ApiOperation({ summary: 'Update a forum' })
  @ApiParam({ name: 'idOrSlug', description: 'Forum ID or slug' })
  @ApiResponse({
    status: 200,
    description: 'The forum has been successfully updated.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async updateForum(
    @Param('idOrSlug') idOrSlug: string,
    @Body() forumData: CreateForumDTO,
  ): Promise<ForumModel> {
    try {
      return await this.forumService.updateForum(idOrSlug, forumData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':idOrSlug/posts')
  @ApiOperation({ summary: 'Get posts for a specific forum' })
  @ApiParam({ name: 'idOrSlug', description: 'Forum ID or slug' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default is 0)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of posts per page (default is 10)',
  })
  getPostsForForum(
    @Param('idOrSlug') idOrSlug: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.forumService.getPostsForForumByIdOrSlug(idOrSlug, page, limit);
  }

  @Get(':idOrSlug/subscribers')
  @ApiOperation({ summary: 'Get subscribers for a specific forum' })
  @ApiParam({ name: 'idOrSlug', description: 'Forum ID or slug' })
  getSubscribersForForum(@Param('idOrSlug') idOrSlug: string) {
    return this.forumService.getSubscribersForForumByIdOrSlug(idOrSlug);
  }

  @ApiCookieAuth()
  @Post(':idOrSlug/subscribe')
  @UseGuards(ClerkRequiredGuard)
  @ApiOperation({ summary: 'Subscribe to a specific forum' })
  @ApiResponse({
    status: 200,
    description: 'Successfully subscribed to the forum.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async subscribeToForum(
    @Req() request: any,
    @Param('idOrSlug') idOrSlug: string,
  ) {
    const userId = request.user.id;
    try {
      return await this.forumService.subscribeToForum(userId, idOrSlug);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiCookieAuth()
  @Delete(':idOrSlug/subscribe')
  @UseGuards(ClerkRequiredGuard)
  @ApiOperation({ summary: 'Unsubscribe from a specific forum' })
  @ApiResponse({
    status: 200,
    description: 'Successfully unsubscribed from the forum.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async unsubscribeFromForum(
    @Req() request: any,
    @Param('idOrSlug') idOrSlug: string,
  ) {
    const userId = request.user.id;
    try {
      return await this.forumService.unsubscribeFromForum(userId, idOrSlug);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
