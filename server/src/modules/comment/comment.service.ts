import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Comment as CommentModel } from '@prisma/client';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Comment } from './comment.entity';
// import { AttachmentMetadataDto } from '../attachment/attachment.dto';
// import { AttachmentMetadataDto } from './dto/add-attachment.dto';
import { commentAttachDto } from './dto/comment-attach.dto';
// import { emailAddresses } from '@clerk/clerk-sdk-node';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async getCommentsForPost(postId: string): Promise<Comment[]> {
    try {
      const comments = await this.prisma.comment.findMany({
        where: {
          postId,
          parentId: null,
        },
        include: {
          user: {
            select: {
              username: true,
              avatarUrl: true,
              reputation: true,
            },
          },
        },
      });
      return comments;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to fetch comments');
    }
  }

  async getCommentsReplies(
    commentId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<Comment[]> {
    try {
      const childComments = await this.prisma.comment.findMany({
        where: {
          parentId: commentId,
        },
        include: {
          user: {
            select: {
              username: true,
              avatarUrl: true,
              reputation: true,
            },
          },
          attachments: true,
        },
        skip: (page - 1) * limit,
        take: limit,
      });
      return childComments;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to fetch child comments');
    }
  }

  async getCommentById(commentId: string): Promise<Comment> {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: {
          id: commentId,
        },
        include: {
          user: {
            select: {
              username: true,
              avatarUrl: true,
              reputation: true,
            },
          },
          attachments: true,
        },
      });
      if (!comment) {
        throw new BadRequestException('Comment not found');
      }
      return comment;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to fetch comment');
    }
  }

  async getAllComments(): Promise<Comment[]> {
    try {
      const comments = await this.prisma.comment.findMany({
        where: {
          isVisible: true,
        },
        include: {
          user: {
            select: {
              username: true,
              avatarUrl: true,
              reputation: true,
            },
          },
        },
      });
      return comments;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to fetch comments');
    }
  }

  async searchComments(searchTerm: string): Promise<CommentModel[]> {
    const comments = await this.prisma.$queryRaw`
      SELECT *
      FROM "Comment"
      WHERE to_tsvector('english', content) @@ plainto_tsquery('english', ${searchTerm})
    `;

    return (comments as CommentModel[]).map((comment) => {
      return {
        id: comment.id,
        content: comment.content,
        userId: comment.userId,
        postId: comment.postId,
        isVisible: comment.isVisible,
        parentId: comment.parentId,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        votesCount: comment.votesCount,
      } as CommentModel;
    });
  }

  async createNewComment(
    userId: string,
    CommentData: {
      content: string;
      postId: string;
      parentId: string;
    },
  ): Promise<CommentModel> {
    const { content, postId } = CommentData;
    try {
      const comment = await this.prisma.comment.create({
        data: {
          content,
          user: {
            connect: { id: userId },
          },
          post: {
            connect: { id: postId },
          },
        },
      });
      return comment;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to create comment');
    }
  }

  async updateCommentById(
    params: {
      where: Prisma.CommentWhereUniqueInput;
      data: Prisma.CommentUpdateInput;
    },
    // id: string, updateCommentDto: Prisma.CommentUpdateInput
  ): Promise<Comment> {
    try {
      const { data, where } = params;
      const updatedComment = await this.prisma.comment.update({
        where,
        data,
      });
      return updatedComment;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to update comment');
    }
  }

  async updateCommentVotes(
    commentId: string,
    voteStatus: number,
  ): Promise<Comment> {
    try {
      const updatedComment = await this.prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          votesCount: {
            increment: voteStatus,
          },
        },
      });
      return updatedComment;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to update comment votes');
    }
  }

  async updateCommentIsPublic(
    commentId: string,
    publish: boolean,
  ): Promise<Comment> {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: {
          id: commentId,
        },
      });
      if (!comment) {
        throw new NotFoundException('Comment not found');
      }
      if (comment.isVisible === publish) {
        return comment;
      }
      const updatedComment = await this.prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          isVisible: publish,
        },
      });
      return updatedComment;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to update comment status');
    }
  }
  async deleteCommentById(commentId: string): Promise<Comment> {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: {
          id: commentId,
        },
      });
      if (!comment) {
        throw new NotFoundException('Comment not found');
      }
      const deleted = await this.prisma.comment.delete({
        where: {
          id: comment.id,
        },
      });
      return deleted;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to delete comment');
    }
  }

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
          post: {
            connect: {
              id: postId,
            },
          },
          user: {
            connect: {
              id: userId,
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

  async findAll(params: {
    page?: number;
    take?: number;
    cursor?: Prisma.CommentWhereUniqueInput;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithAggregationInput;
  }): Promise<CommentModel[]> {
    const { page = 0, take = 10, cursor, where, orderBy } = params;
    return this.prisma.comment.findMany({
      skip: page * take,
      take,
      cursor,
      where,
      orderBy,
      include: {
        user: {
          select: {
            username: true,
            avatarUrl: true,
            reputation: true,
          },
        },
        attachments: {
          include: {
            attachment: true,
          },
        },
      },
    });
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
}
