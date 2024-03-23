// simple Guard implementation

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import clerkClient, { Clerk } from '@clerk/clerk-sdk-node';

export const CLERK = 'CLERK';
export type ClerkService = ReturnType<typeof Clerk>;

@Injectable()
export class ClerkGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization || ``;
    const headerToken = authHeader.split(' ')[1];

    const res = await clerkClient.authenticateRequest({ headerToken });

    req.auth = res.toAuth();

    return true;
  }
}
