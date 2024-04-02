import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReportDto } from './report.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  async getReportsByPostOrComment(postId?: string, commentId?: string) {
    let whereClause = {};

    if (postId || commentId) {
      whereClause = {
        OR: [{ postId }, { commentId }],
      };
    }

    return this.prisma.report.findMany({
      where: whereClause,
    });
  }

  async reportPostOrComment(userId: string, reportDto: ReportDto) {
    const { postId, commentId, reason } = reportDto;

    let post = null;
    let comment = null;

    if (postId) {
      post = await this.prisma.post.findUnique({ where: { id: postId } });
    }

    if (commentId) {
      comment = await this.prisma.comment.findUnique({
        where: { id: commentId },
      });
    }

    if (!post && !comment) {
      throw new NotFoundException('Post or Comment with provided ID not found');
    }

    return this.prisma.report.create({
      data: {
        reporterId: userId,
        postId: post ? postId : null,
        commentId: comment ? commentId : null,
        reason,
        status: 'Pending',
      },
    });
  }

  async getReportById(id: string) {
    return this.prisma.report.findUnique({
      where: { id },
    });
  }

  async updateReport(id: string, actionTaken: string, resolvedBy: string) {
    return this.prisma.report.update({
      where: { id },
      data: {
        status: 'Resolved',
        actionTaken,
        resolvedBy,
        resolvedAt: new Date(),
      },
    });
  }
}
