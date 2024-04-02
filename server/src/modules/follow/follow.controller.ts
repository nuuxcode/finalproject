import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { FollowService } from './follow.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
} from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';

@ApiTags('users')
@Controller('users')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get(':idOrUsername/followers')
  @ApiOperation({
    summary: 'Get followers of a specific user by ID or username',
  })
  @ApiParam({ name: 'idOrUsername', description: 'User ID or username' })
  @ApiOkResponse({ description: 'Returns a list of followers of the user' })
  getFollowers(@Param('idOrUsername') idOrUsername: string) {
    return this.followService.getFollowers(idOrUsername);
  }

  @Get(':idOrUsername/followings')
  @ApiOperation({
    summary: 'Get users followed by a specific user by ID or username',
  })
  @ApiParam({ name: 'idOrUsername', description: 'User ID or username' })
  @ApiOkResponse({
    description: 'Returns a list of users followed by the user',
  })
  getFollowings(@Param('idOrUsername') idOrUsername: string) {
    return this.followService.getFollowings(idOrUsername);
  }

  @Post(':idOrUsername/followings/:followingIdOrUsername')
  @ApiOperation({ summary: 'Follow a user' })
  @ApiParam({
    name: 'idOrUsername',
    description: 'User ID or username of the follower',
  })
  @ApiParam({
    name: 'followingIdOrUsername',
    description: 'User ID or username of the user to follow',
  })
  @ApiOkResponse({
    description:
      'Follows the user and returns the updated follower and following counts',
  })
  async followUser(
    @Param('idOrUsername') idOrUsername: string,
    @Param('followingIdOrUsername') followingIdOrUsername: string,
  ) {
    try {
      const result = await this.followService.followUser(
        idOrUsername,
        followingIdOrUsername,
      );
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':idOrUsername/followings/:followingIdOrUsername')
  @ApiOperation({ summary: 'Unfollow a user' })
  @ApiParam({
    name: 'idOrUsername',
    description: 'User ID or username of the follower',
  })
  @ApiParam({
    name: 'followingIdOrUsername',
    description: 'User ID or username of the user to unfollow',
  })
  @ApiOkResponse({
    description:
      'Unfollows the user and returns the updated follower and following counts',
  })
  async unfollowUser(
    @Param('idOrUsername') idOrUsername: string,
    @Param('followingIdOrUsername') followingIdOrUsername: string,
  ) {
    try {
      const result = await this.followService.unfollowUser(
        idOrUsername,
        followingIdOrUsername,
      );
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
