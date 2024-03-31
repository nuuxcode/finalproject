import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  Query,
  // UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  CreateCommentDto,
  CreateNewCommentDto,
} from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment as CommentModel } from '@prisma/client';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Comment } from './comment.entity';
// import { commentAttachDto } from './dto/comment-attach.dto';
// import { AuthGuard } from '@nestjs/passport';

@ApiTags('comments')
@Controller('posts/:postId/comments')
export class PostCommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiBody({ type: CreateNewCommentDto })
  //@UseGuards(AuthGuard('jwt')) disable it temporarily
  async createDraft(
    @Param('postId') postId: string,
    @Body()
    commentData: {
      content?: string;
      authorEmail: string;
    },
  ): Promise<CommentModel> {
    const { content, authorEmail } = commentData;
    return this.commentService.createNewComment({
      content,
      user: {
        connect: { email: authorEmail },
      },
      post: {
        connect: { id: postId },
      },
      status: 'active',
    });
  }

  @Post(':commentId/replies')
  @ApiBody({ type: CreateNewCommentDto })
  //@UseGuards(AuthGuard('jwt')) disable it temporarily
  async createReply(
    @Param('commentId') commentId: string,
    @Body()
    commentData: {
      content?: string;
      authorEmail: string;
    },
  ): Promise<CommentModel> {
    const { content, authorEmail } = commentData;
    const parentComment = await this.commentService.getCommentById(commentId);
    if (!parentComment) {
      throw new NotFoundException('Parent comment not found');
    }
    const postId = parentComment.postId;
    return this.commentService.createNewComment({
      content,
      user: {
        connect: { email: authorEmail },
      },
      parent: {
        connect: { id: commentId },
      },
      post: {
        connect: { id: postId },
      },
      status: 'active',
    });
  }

  @Patch(':commentId')
  @ApiParam({ name: 'commentId', description: 'ID of the comment to update' })
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
    // @UseGuards(AuthGuard('jwt')) //disable it temporarily
    @Param('commentId') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    try {
      const updatedComment = await this.commentService.updateCommentById({
        where: { id: id },
        data: { ...updateCommentDto },
      });
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

  @Delete(':commentId')
  @ApiParam({ name: 'commentId', description: 'ID of the comment to delete' })
  @ApiResponse({ status: 200, description: 'Successfully deleted comment.' })
  @ApiBadRequestResponse({ description: 'Failed to delete comment.' })
  async deleteCommentById(
    @Param('commentId') commentId: string,
  ): Promise<void> {
    try {
      await this.commentService.updateCommentById({
        where: { id: commentId },
        data: { isVisible: true, status: 'deleted' },
      });
    } catch (error) {
      throw new BadRequestException('Failed to delete comment.');
    }
  }

  @Get()
  @ApiParam({
    name: 'postId',
    description: 'ID of the post to fetch top level comments for.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved comments.',
    type: [Comment],
  })
  async getCommentsForPost(
    @Param('postId') postId: string,
  ): Promise<Comment[]> {
    return this.commentService.getCommentsForPost(postId);
  }

  @Get(':commentId/replies')
  @ApiParam({
    name: 'commentId',
    description: 'ID of the parent comment to fetch children comments for',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved children comments.',
    type: [Comment],
  })
  async getCommentsReplies(
    @Param('commentId') commentId: string,
  ): Promise<Comment[]> {
    return this.commentService.getCommentsReplies(commentId);
  }
}

@ApiTags('comments')
@Controller('/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('/')
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
    description: 'Number of posts per page (default is 10)',
  })
  @ApiResponse({ status: 200, description: 'Return all posts with pagination' })
  async getAllPosts(
    @Query('page') page: number,
    @Query('take') take: number,
  ): Promise<Comment[]> {
    return this.commentService.findAll({ page, take });
  }

  @Get('comment/:id')
  async getCommentById(@Param('id') id: string): Promise<Comment> {
    return this.commentService.getCommentById(id);
  }

  @Get('public')
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
    description: 'Number of comments per page (default is 10)',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all published comments with pagination',
  })
  async getPublishedComments(
    @Query('page') page: number,
    @Query('take') take: number,
  ): Promise<CommentModel[]> {
    return this.commentService.findAll({
      page,
      take,
      where: { isVisible: true },
    });
  }

  @Get('full-text-search/:searchString')
  async getFullTextSearchComments(
    @Param('searchString') searchString: string,
  ): Promise<CommentModel[]> {
    return this.commentService.searchComments(searchString);
  }

  @Get('filtered-commments/:searchString')
  async getFilteredSearchComments(
    @Param('searchString') searchString: string,
  ): Promise<CommentModel[]> {
    return this.commentService.findAll({
      where: {
        OR: [
          {
            content: { contains: searchString, mode: 'insensitive' },
          },
        ],
      },
    });
  }

  @Post('comment')
  @ApiBody({ type: CreateCommentDto })
  //@UseGuards(AuthGuard('jwt')) disable it temporarily
  async createDraft(
    @Body()
    CommentData: {
      content?: string;
      authorEmail: string;
      postId: string;
      parentId: string;
    },
  ): Promise<CommentModel> {
    const { content, authorEmail, postId } = CommentData;
    return this.commentService.createNewComment({
      content,
      user: {
        connect: { email: authorEmail },
      },
      post: {
        connect: { id: postId },
      },
      status: 'active',
    });
  }

  @Post(':commentId/publish')
  @ApiParam({ name: 'commentId', description: 'ID of the comment to publish' })
  @ApiResponse({ status: 200, description: 'Successfully published comment.' })
  @ApiBadRequestResponse({ description: 'Failed to publish comment.' })
  async updateCommentIsPublic(
    @Param('commentId') commentId: string,
  ): Promise<void> {
    try {
      await this.commentService.updateCommentIsPublic(commentId, true);
    } catch (error) {
      throw new BadRequestException('Failed to publish comment.');
    }
  }

  @Post(':commentId/hide')
  @ApiParam({ name: 'commentId', description: 'ID of the comment to hide' })
  @ApiResponse({ status: 200, description: 'Successfully hidden comment.' })
  @ApiBadRequestResponse({ description: 'Failed to hide comment.' })
  async updateCommentIsHidden(
    @Param('commentId') commentId: string,
  ): Promise<void> {
    try {
      await this.commentService.updateCommentIsPublic(commentId, false);
    } catch (error) {
      throw new BadRequestException('Failed to hide comment.');
    }
  }

  @Post(':commentId/upvote')
  @ApiParam({ name: 'commentId', description: 'ID of the comment to upvote' })
  @ApiResponse({ status: 200, description: 'Successfully upvoted comment.' })
  @ApiBadRequestResponse({ description: 'Failed to upvote comment.' })
  async upvoteComment(@Param('commentId') commentId: string): Promise<void> {
    try {
      await this.commentService.updateCommentVotes(commentId, 1);
    } catch (error) {
      throw new BadRequestException('Failed to upvote comment.');
    }
  }

  @Post(':commentId/downvote')
  @ApiParam({ name: 'commentId', description: 'ID of the comment to downvote' })
  @ApiResponse({ status: 200, description: 'Successfully downvoted comment.' })
  @ApiBadRequestResponse({ description: 'Failed to downvote comment.' })
  async downvoteComment(@Param('commentId') commentId: string): Promise<void> {
    try {
      await this.commentService.updateCommentVotes(commentId, -1);
    } catch (error) {
      throw new BadRequestException('Failed to downvote comment.');
    }
  }

  @Delete(':commentId')
  // @UseGuards(AuthGuard('jwt')) //disable it temporarily
  @ApiParam({ name: 'commentId', description: 'ID of the comment to delete' })
  @ApiResponse({ status: 200, description: 'Successfully deleted comment.' })
  @ApiBadRequestResponse({ description: 'Failed to delete comment.' })
  async deleteCommentById(
    @Param('commentId') commentId: string,
  ): Promise<void> {
    try {
      await this.commentService.deleteCommentById(commentId);
    } catch (error) {
      throw new BadRequestException('Failed to delete comment.');
    }
  }
}
