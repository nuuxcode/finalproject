import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(addCommentDto: CreateCommentDto, user: any): Promise<Comment> {
    const { content, postId, parentId } = addCommentDto;
    const userId = user.id;

    if (!content.trim()) {
      throw new BadRequestException("Comment can't be empty");
    }

    try {
      const comment = await this.prisma.comment.create({
        data: {
          content,
          status: null,
          post: {
            connect: {
              id: postId,
            },
          },
          user: {
            connect: {
              id: userId, // current authed user making the request
            },
          },
          ...(parentId && {
            parent: {
              connect: {
                id: parentId,
              },
            },
          }),
        },
      });
      return comment;
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async findAll(postId: string): Promise<Comment[]> {
    try {
      // Retrieve top-level comments for the post
      const topLevelComments = await this.prisma.comment.findMany({
        where: {
          postId,
          parentId: null, // top level comments wont have parenrID
        },
        include: {
          user: true,
          post: {
            select: {
              userId: true,
              title: true,
            },
          },
          replies: {
            // get the comment and its replies
            include: {
              user: true,
            },
            orderBy: { createdAt: 'desc' },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return topLevelComments;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to fetch comments');
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto, user: any) {
    // return `This action updates a #${id} comment`;
    if (!user) {
      throw new UnauthorizedException('Unauthorized: User not authenticated');
    }

    // Retrieve user ID and isAdmin status from user object
    const userId = user.id;
    const isAdmin = user.isAdmin;
    const { content } = updateCommentDto;

    if (!content.trim()) {
      throw new BadRequestException("Comment can't be empty");
    }

    const currComment = await this.prisma.comment.findFirst({
      where: {
        id,
      },
    });

    if (!currComment) {
      throw new BadRequestException('Comment not found');
    }

    if (currComment?.userId !== userId && !isAdmin) {
      if (!isAdmin) {
        throw new Error(`{
          code: "UNAUTHORIZED",
          message: "You can only update your own comments.",
        }`);
      }

      const newComment = await this.prisma.comment.update({
        where: {
          id,
        },
        data: {
          content,
        },
      });

      return newComment;
    }
  }

  async remove(id: string, user: any): Promise<boolean> {
    try {
      const userId = user.id;
      const isAdmin = user.isAdmin;

      const comment = await this.prisma.comment.findFirst({
        where: {
          id,
        },
        include: {
          replies: true, // Include child comments (true/false)
        },
      });

      if (!comment) {
        throw new Error('Comment not found');
      }

      if (comment.userId !== userId && !isAdmin) {
        throw new Error("Unauthorized: Cannot delete another user's comment");
      }

      if (comment.replies && comment.replies.length > 0) {
        await this.deleteChildComments(comment.replies);
      }

      await this.prisma.comment.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to delete comment');
    }
  }

  // Helper to delete child comments recursively
  private async deleteChildComments(comments: any[]): Promise<void> {
    for (const comment of comments) {
      if (comment.replies && comment.replies.length > 0) {
        await this.deleteChildComments(comment.replies);
      }
      await this.prisma.comment.delete({
        where: {
          id: comment.id,
        },
      });
    }
  }
}
