// this file contains controller for the admin dashboard that contains chart data for the application usage.
import { Controller, Get, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}


  @ApiOperation({ summary: 'Get total count usage statistics' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/usage')
  usageStats() {
    return this.adminService.getCountData();
  }

  @ApiOperation({ summary: 'Get avg post likes' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/posts/votes/avg')
  calculatePostLikesAvg() {
    return this.adminService.calculatePostLikesAverage();
  }

  @ApiOperation({ summary: 'Get average votes per post' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/posts/votes/avg')
  calculatePostLikesMax() {
    return this.adminService.findMaxPostLikes();
  }

  @ApiOperation({ summary: 'Get top 10 posts' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/posts/votes/top')
  calculatePostLikesMin() {
    return this.adminService.findTopTenPosts();
  }

  @ApiOperation({ summary: 'Get top 10 users' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/users/posts/top')
  calculatePostLikesTop() {
    return this.adminService.findTopTenUsers();
  }

  // get users wuth the most posts  
  @ApiOperation({ summary: 'Get top 10 users by post' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/users/posts/top')
  findTopTenUsers() {
    return this.adminService.findTopTenUsers();
  }

  // get users with the most comments
  @ApiOperation({ summary: 'Get top 10 users by comments' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/users/comments/top')
  findTopTenUsersComments() {
    return this.adminService.findTopTenCommenters();
  }

  // get most popular forums
  @ApiOperation({ summary: 'Get top 10 forums by subscriptions' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/forums/popular')
  findTopTenForums() {
    return this.adminService.findTopTenForums();
  }

}
