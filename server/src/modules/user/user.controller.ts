import { Controller, Get, UseGuards, Param, Query } from '@nestjs/common';
import { User } from '@prisma/client';
import {
  ApiTags,
  ApiQuery,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
//import { AuthGuard } from '@nestjs/passport';
import { Req } from '@nestjs/common';
import { Forum } from '@prisma/client';
//import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { ClerkRequiredGuard } from '../clerk/clerk.module';

import { UserService } from './user.service';
import { ForumService } from '../forum/forum.service';
@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(
    private userService: UserService,
    private forumService: ForumService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Returns a list of all users' })
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
    description: 'Number of users per page (default is 10)',
  })
  async getAllUsers(
    @Query('page') page: string,
    @Query('take') take: string,
  ): Promise<User[]> {
    const pageNumber = parseInt(page, 10) || 0;
    const takeNumber = parseInt(take, 10) || 10;

    return this.userService.users({
      skip: pageNumber * takeNumber,
      take: takeNumber,
    });
  }

  @Get('me')
  @ApiCookieAuth()
  //@UseGuards(AuthGuard('jwt'))
  @UseGuards(ClerkRequiredGuard)
  @ApiOperation({ summary: 'Get the currently logged in user' })
  @ApiOkResponse({ description: 'Returns the currently logged in user' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized if the user is not logged in',
  })
  async getLoggedInUser(@Req() req): Promise<User> {
    return this.userService.getUserById(req.user.id);
  }

  @Get(':idOrUsername')
  @ApiOperation({ summary: 'Get a specific user by ID or username' })
  @ApiParam({ name: 'idOrUsername', description: 'User ID or username' })
  getUserByIdOrUsername(
    @Param('idOrUsername') idOrUsername: string,
  ): Promise<User> {
    return this.userService.getUserByIdOrUsername(idOrUsername);
  }

  @Get(':idOrUsername/owned-forums')
  @ApiOperation({
    summary: 'Get forums owned by a specific user by ID or username',
  })
  @ApiParam({ name: 'idOrUsername', description: 'User ID or username' })
  getOwnedForums(
    @Param('idOrUsername') idOrUsername: string,
  ): Promise<Forum[]> {
    return this.forumService.getForumsByOwnerIdOrUsername(idOrUsername);
  }

  @Get(':idOrUsername/moderator-forums')
  @ApiOperation({
    summary: 'Get forums moderated by a specific user by ID or username',
  })
  @ApiParam({ name: 'idOrUsername', description: 'User ID or username' })
  getModeratorForums(@Param('idOrUsername') idOrUsername: string) {
    return this.forumService.getModeratorForumsByUserIdOrUsername(idOrUsername);
  }

  @Get(':idOrUsername/posts')
  @ApiOperation({ summary: 'Get posts by a specific user by ID or username' })
  @ApiParam({ name: 'idOrUsername', description: 'User ID or username' })
  getUserPosts(@Param('idOrUsername') idOrUsername: string) {
    return this.userService.getUserPosts(idOrUsername);
  }

  @Get(':idOrUsername/comments')
  @ApiOperation({
    summary: 'Get comments by a specific user by ID or username',
  })
  @ApiParam({ name: 'idOrUsername', description: 'User ID or username' })
  getUserComments(@Param('idOrUsername') idOrUsername: string) {
    return this.userService.getUserComments(idOrUsername);
  }

  @Get(':idOrUsername/posts-vote')
  @ApiOperation({
    summary: 'Get post votes by a specific user by ID or username',
  })
  @ApiParam({ name: 'idOrUsername', description: 'User ID or username' })
  getUserPostVotes(@Param('idOrUsername') idOrUsername: string) {
    return this.userService.getUserPostVotes(idOrUsername);
  }

  @Get(':idOrUsername/comments-vote')
  @ApiOperation({
    summary: 'Get comment votes by a specific user by ID or username',
  })
  @ApiParam({ name: 'idOrUsername', description: 'User ID or username' })
  getUserCommentVotes(@Param('idOrUsername') idOrUsername: string) {
    return this.userService.getUserCommentVotes(idOrUsername);
  }

  @Get(':idOrUsername/subs')
  @ApiOperation({
    summary: 'Get subscriptions by a specific user by ID or username',
  })
  @ApiParam({ name: 'idOrUsername', description: 'User ID or username' })
  getUserSubscriptions(@Param('idOrUsername') idOrUsername: string) {
    return this.userService.getUserSubscriptions(idOrUsername);
  }

  // @Post('user')
  // async signupUser(
  //   @Body() userData: { username: string; email: string; password: string },
  // ): Promise<User> {
  //   return this.userService.createUser(userData);
  // }
}
