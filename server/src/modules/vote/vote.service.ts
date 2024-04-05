import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VoteService {
  constructor(private prisma: PrismaService) {}

  async votePost(userId: string, postId: string, voteStatus: number) {
    console.log('userId', userId);
    console.log('postId', postId);
    console.log('voteStatus', voteStatus);
    const previousVote = await this.prisma.postVotes.findUnique({
      where: {
        userId_postId: {
          userId: userId,
          postId: postId,
        },
      },
    });
    if (previousVote && voteStatus === previousVote.voteStatus) {
      throw new Error(
        'New vote status is the same as the current vote status.',
      );
    }
    let increment = 0;
    let upvotesIncrement = 0;
    let downvotesIncrement = 0;
    if (!previousVote) {
      await this.prisma.postVotes.create({
        data: { postId, userId, voteStatus },
      });
      increment = voteStatus;
      upvotesIncrement = voteStatus === 1 ? 1 : 0;
      downvotesIncrement = voteStatus === -1 ? 1 : 0;
    } else {
      await this.prisma.postVotes.update({
        where: { id: previousVote.id },
        data: { voteStatus },
      });
      //(previousVote.voteStatus === 1 && voteStatus === -1) || (previousVote.voteStatus === -1 && voteStatus === 1)
      if (Math.abs(previousVote.voteStatus - voteStatus) === 2) {
        increment = voteStatus * 2;
      } else {
        increment = voteStatus - previousVote.voteStatus;
      }
      upvotesIncrement =
        voteStatus === 1 ? 1 : previousVote.voteStatus === 1 ? -1 : 0;
      downvotesIncrement =
        voteStatus === -1 ? 1 : previousVote.voteStatus === -1 ? -1 : 0;
    }

    await this.prisma.post.update({
      where: { id: postId },
      data: {
        votesCount: { increment: increment },
        upvotesCount: { increment: upvotesIncrement },
        downvotesCount: { increment: downvotesIncrement },
      },
    });

    return { message: 'Vote updated successfully' };
  }

  async voteComment(userId: string, commentId: string, voteStatus: number) {
    const previousVote = await this.prisma.commentVotes.findUnique({
      where: {
        userId_commentId: {
          userId: userId,
          commentId: commentId,
        },
      },
    });
    if (previousVote && voteStatus === previousVote.voteStatus) {
      throw new Error(
        'New vote status is the same as the current vote status.',
      );
    }
    let increment = 0;
    let upvotesIncrement = 0;
    let downvotesIncrement = 0;
    if (!previousVote) {
      await this.prisma.commentVotes.create({
        data: { commentId, userId, voteStatus },
      });
      increment = voteStatus;
      upvotesIncrement = voteStatus === 1 ? 1 : 0;
      downvotesIncrement = voteStatus === -1 ? 1 : 0;
    } else {
      await this.prisma.commentVotes.update({
        where: { id: previousVote.id },
        data: { voteStatus },
      });
      if (Math.abs(previousVote.voteStatus - voteStatus) === 2) {
        increment = voteStatus * 2;
      } else {
        increment = voteStatus - previousVote.voteStatus;
      }
      upvotesIncrement =
        voteStatus === 1 ? 1 : previousVote.voteStatus === 1 ? -1 : 0;
      downvotesIncrement =
        voteStatus === -1 ? 1 : previousVote.voteStatus === -1 ? -1 : 0;
    }

    await this.prisma.comment.update({
      where: { id: commentId },
      data: {
        votesCount: { increment: increment },
        upvotesCount: { increment: upvotesIncrement },
        downvotesCount: { increment: downvotesIncrement },
      },
    });

    return { message: 'Vote updated successfully' };
  }
}
