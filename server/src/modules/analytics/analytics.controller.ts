import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('analytics')
@Controller('/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @ApiOperation({ summary: 'Get total count usage statistics' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/total')
  usageStats() {
    return this.analyticsService.getCountData();
  }

  @ApiOperation({ summary: 'Get top 10 posts' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/posts/votes/top')
  calculatePostLikesMin() {
    return this.analyticsService.findTopTenPosts();
  }

  @ApiOperation({ summary: 'Get top 10 users' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/users/posts/top')
  calculatePostLikesTop() {
    return this.analyticsService.findTopTenUsers();
  }

  // get users with the most posts
  @ApiOperation({ summary: 'Get top 10 users by post' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/users/posts/top')
  findTopTenUsers() {
    return this.analyticsService.findTopTenUsers();
  }

  // get most popular forums
  @ApiOperation({ summary: 'Get top 10 forums by subscriptions' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/forums/popular')
  findTopTenForums() {
    return this.analyticsService.findTopTenForums();
  }

  @ApiOperation({ summary: 'Get comments by month' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/commentsByMonth')
  getCommentsByMonth() {
    return this.analyticsService.getCommentsByMonth();
  }

  @ApiOperation({ summary: 'Get Posts by month' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/postsByMonth')
  getPostsByMonth() {
    return this.analyticsService.getPostsByMonth();
  }

  @ApiOperation({ summary: 'Get Forums by month' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/forumsByMonth')
  getForumsByMonth() {
    return this.analyticsService.getForumsByMonth();
  }

  @ApiOperation({ summary: 'Get Tags by month' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/usersByMonth')
  getUsersByMonth() {
    return this.analyticsService.getUsersByMonth();
  }

  @ApiOperation({ summary: 'Get verified users' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/users/verified')
  getVerifiedUsers() {
    return this.analyticsService.getUserVerificationCounts();
  }

  @ApiOperation({ summary: 'Get % Posts that have engagement ' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/posts/percentReplied')
  getPostVotesRatio() {
    return this.analyticsService.getPostsCommentsPercentage();
  }

}
