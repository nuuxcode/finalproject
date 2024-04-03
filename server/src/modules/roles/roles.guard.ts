import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('RolesGuard', user.id, roles);
    if (!user) {
      throw new UnauthorizedException(
        'You must be logged in to perform this action',
      );
    }

    // Fetch user roles from the database
    const userRoles = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });
    request.user.role = userRoles.role;
    //can recove id and tweak everything to use excplicit id
    const id =
      request.params.id ||
      request.params.forumId ||
      request.params.postId ||
      request.params.commentId;
    const type = request.route.path.split('/')[3]; // '/api/v1/type/id'.split('/')[1] == 'type'
    console.log('id', id, 'type', type);
    let isModerator = false;
    let isAdmin = false;
    let isForumOwner = false;

    if (roles.includes('moderator')) {
      isModerator = await this.isUserAModerator(user.id, id, type);
    }

    console.log('isModerator', isModerator);
    if (roles.includes('admin')) {
      console.log(user);
      isAdmin = user.role === 'admin';
    }

    console.log('isAdmin', isAdmin);
    if (roles.includes('forumowner')) {
      isForumOwner = await this.isUserAForumOwner(user.id, id);
    }

    console.log('isForumOwner', isForumOwner);
    return (
      roles.some((role) => user.role === role) ||
      isModerator ||
      isAdmin ||
      isForumOwner
    );
  }

  async isUserAForumOwner(userId: string, forumId: string): Promise<boolean> {
    const forum = await this.prisma.forum.findUnique({
      where: { id: forumId },
      select: { ownerUserId: true },
    });

    return forum.ownerUserId === userId;
  }

  async isUserAModerator(
    userId: string,
    id: string,
    type: 'forums' | 'posts' | 'comments',
  ): Promise<boolean> {
    let forumId: string;
    console.log('type', type);
    if (type === 'forums') {
      forumId = id;
    } else if (type === 'posts') {
      const post = await this.prisma.post.findUnique({
        where: { id: id },
        select: { forumId: true },
      });
      forumId = post.forumId;
    } else if (type === 'comments') {
      const comment = await this.prisma.comment.findUnique({
        where: { id: id },
        include: { post: { select: { forumId: true } } },
      });
      forumId = comment.post.forumId;
    }

    console.log('forumId', forumId);
    const moderatorRecord = await this.prisma.forumModerator.findUnique({
      where: {
        userId_forumId: {
          userId: userId,
          forumId: forumId,
        },
      },
    });

    return !!moderatorRecord;
  }
}
