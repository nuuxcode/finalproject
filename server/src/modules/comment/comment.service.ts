import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Comment } from './comment.entity';
// import { AttachmentMetadataDto } from '../attachment/attachment.dto';
// import { AttachmentMetadataDto } from './dto/add-attachment.dto';
import { commentAttachDto } from './dto/comment-attach.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(addCommentDto: CreateCommentDto, user: any): Promise<Comment> {
    const { content, postId, parentId } = addCommentDto;
    // const userId = user.id;
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
              id: userId, // update for clerkauth 💡
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

  async create_attach(
    commentAttachment: commentAttachDto,
    user: any,
  ): Promise<Comment> {
    const { createCommentDto, attachmentMetadataDto } = commentAttachment;

    const { content, postId, parentId } = createCommentDto;
    const userId = user.id;

    if (!content.trim()) {
      throw new BadRequestException("Comment can't be empty");
    }

    try {
      const comment = await this.prisma.comment.create({
        data: {
          content,
          status: 'active',
          attachments: {
            create: {
              attachment: {
                connect: { ...attachmentMetadataDto },
              },
            },
          },
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
      // Retrieve comments at the top level
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

      const comment = await this.prisma.comment.findUnique({
        where: {
          id,
        },
        // to also delete nested comments if needed
        // include: {
        //   replies: true,
        // },
      });

      if (!comment) {
        throw new Error('Comment not found');
      }

      if (comment.userId !== userId && !isAdmin) {
        throw new Error("Unauthorized: Cannot delete another user's comment");
      }

      // Soft deleting the comment by setting its status to 'deleted': comment and children kept but not displayed
      // deletedAt field in database can be added to alsmo mark deleted comments
      await this.prisma.comment.update({
        where: {
          id,
        },
        data: {
          status: 'deleted',
        },
      });

      return true;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to delete comment');
    }
  }
}
