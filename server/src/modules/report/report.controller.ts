import { Controller, Get, Post, Query, Body, Param, Put } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportDto, UpdateReportDto } from './report.dto';
import { UseGuards, Req } from '@nestjs/common';
//import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ClerkRequiredGuard } from '../clerk/clerk.module';

@ApiTags('reports')
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  @ApiOperation({ summary: 'Get reports by post or comment' })
  @ApiQuery({ name: 'postId', required: false, description: 'ID of the post' })
  @ApiQuery({
    name: 'commentId',
    required: false,
    description: 'ID of the comment',
  })
  @ApiResponse({ status: 200, description: 'Return reports' })
  getReportsByPostOrComment(
    @Query('postId') postId: string,
    @Query('commentId') commentId: string,
  ) {
    return this.reportService.getReportsByPostOrComment(postId, commentId);
  }

  @Post()
  @ApiBearerAuth()
  //@UseGuards(AuthGuard('jwt'))
  @UseGuards(ClerkRequiredGuard)
  @ApiOperation({ summary: 'Report a post or comment' })
  @ApiBody({ type: ReportDto, description: 'Report details' })
  @ApiResponse({ status: 201, description: 'Report has been created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async reportPostOrComment(@Req() request: any, @Body() reportDto: ReportDto) {
    const userId = request.user.id;
    try {
      const report = await this.reportService.reportPostOrComment(
        userId,
        reportDto,
      );
      return report;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id') // todo : only admin/moderator can access this route
  @ApiOperation({ summary: 'Get a report by id' })
  @ApiResponse({ status: 200, description: 'Return the report' })
  getReportById(@Param('id') id: string) {
    return this.reportService.getReportById(id);
  }

  @Put('/:id')
  @ApiBearerAuth()
  //@UseGuards(AuthGuard('jwt'))
  @UseGuards(ClerkRequiredGuard) // todo : only admin/moderator can access this route
  @ApiOperation({ summary: 'Update a report' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the report to update',
  })
  @ApiBody({
    type: UpdateReportDto,
    description: 'The action taken on the report',
    schema: {
      example: {
        actionTaken: 'Deleted comment',
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Report has been updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  updateReport(
    @Req() request: any,
    @Param('id') id: string,
    @Body('actionTaken') actionTaken: string,
  ) {
    const resolvedBy = request.user.id;
    return this.reportService.updateReport(id, actionTaken, resolvedBy);
  }
}
