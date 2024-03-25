import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {
  ApiBadRequestResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Comment } from './comment.entity';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Created successfully.',
    type: Comment,
  })
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: any,
  ): Promise<Comment> {
    return this.commentService.create(createCommentDto, req.user);
  }

  @Get(':postId')
  @ApiParam({
    name: 'postId',
    description: 'ID of the post to fetch comments for',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved comments.',
    type: [Comment],
  })
  async findAll(@Param('postId') postId: string): Promise<Comment[]> {
    return this.commentService.findAll(postId);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'ID of the comment to update' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated comment.',
    type: Comment,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Comment content cannot be empty.',
  })
  @ApiUnauthorizedResponse({
    description:
      'Unauthorized: Only the post owner or admin can update comments.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req: any,
  ): Promise<Comment> {
    try {
      const updatedComment = await this.commentService.update(
        id,
        updateCommentDto,
        req.user,
      );
      return updatedComment;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      } else {
        throw new BadRequestException('Failed to update comment');
      }
    }
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID of the comment to delete' })
  @ApiResponse({ status: 200, description: 'Successfully deleted comment.' })
  @ApiBadRequestResponse({ description: 'Failed to delete comment.' })
  async remove(@Param('id') id: string, @Req() req: any): Promise<void> {
    try {
      await this.commentService.remove(id, req);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('Failed to delete comment.');
      }
    }
  }
}
