import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Req } from '@nestjs/common';
import { Forum } from '@prisma/client';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';

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
  @UseGuards(JwtAuthGuard)
  async getAll(): Promise<User[]> {
    return this.userService.users({});
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getLoggedInUser(@Req() req): Promise<User> {
    return this.userService.getUserById(req.user.id);
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Get(':id/owned-forums')
  getOwnedForums(@Param('id') id: string): Promise<Forum[]> {
    return this.forumService.getForumsByOwnerId(id);
  }

  @Get(':id/moderator-forums')
  getModeratorForums(@Param('id') id: string) {
    return this.forumService.getModeratorForums(id);
  }

  // @Post('user')
  // async signupUser(
  //   @Body() userData: { username: string; email: string; password: string },
  // ): Promise<User> {
  //   return this.userService.createUser(userData);
  // }
}
