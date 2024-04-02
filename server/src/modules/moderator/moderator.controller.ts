import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { ModeratorService } from './moderator.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { UseGuards } from '@nestjs/common';
//import { AuthGuard } from '@nestjs/passport';
import { ClerkRequiredGuard } from '../clerk/clerk.module';

@ApiTags('Moderators')
@Controller()
export class ModeratorController {
  constructor(private moderatorService: ModeratorService) {}

  @Get('moderators')
  @ApiOperation({ summary: 'Retrieve a list of all forum moderators' })
  async getAllModerators() {
    return this.moderatorService.getModerators();
  }

  @Get('forums/:forumId/moderators')
  @ApiOperation({
    summary: 'Retrieve a list of all moderators for a specific forum',
  })
  @ApiParam({
    name: 'forumId',
    required: true,
    description: 'The ID of the forum',
  })
  async getForumModerators(@Param('forumId') forumId: string) {
    return this.moderatorService.getForumModerators(forumId);
  }

  @ApiCookieAuth()
  @Post('forums/:forumId/moderators')
  @ApiOperation({
    summary: 'Assign moderator role to a user for a specific forum',
  })
  @ApiParam({
    name: 'forumId',
    required: true,
    description: 'The ID of the forum',
  })
  @ApiBody({
    description: 'The ID of the user',
    schema: { type: 'object', properties: { userId: { type: 'string' } } },
  })
  async assignModerator(
    @Param('forumId') forumId: string,
    @Body('userId') userId: string,
  ) {
    try {
      return await this.moderatorService.assignModerator(forumId, userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiCookieAuth()
  @Delete('forums/:forumId/moderators/:userId')
  @Roles('admin', 'forumowner')
  @UseGuards(RolesGuard)
  //@UseGuards(AuthGuard('jwt'))
  @UseGuards(ClerkRequiredGuard)
  @ApiOperation({
    summary: 'Remove moderator role from a user for a specific forum',
  })
  @ApiParam({
    name: 'forumId',
    required: true,
    description: 'The ID of the forum',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'The ID of the user',
  })
  async removeModerator(
    @Param('forumId') forumId: string,
    @Param('userId') userId: string,
  ) {
    try {
      return await this.moderatorService.removeModerator(forumId, userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
