import {
  Injectable,
  CanActivate,
  ExecutionContext,
  //UnauthorizedException,
} from '@nestjs/common';
import clerkClient, { Clerk } from '@clerk/clerk-sdk-node';

export const CLERK = 'CLERK';
export type ClerkService = ReturnType<typeof Clerk>;

@Injectable()
export class ClerkGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    console.log('ClerkGuard canActivate method called clerk.guard.ts');
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization || ``;
    const headerToken = authHeader.split(' ')[1];

    // Extract token from cookies
    const cookieToken = req.cookies?.__session;
    console.log('cookieToken', cookieToken);
    // Use the token from the header if it exists, otherwise use the token from the cookies
    const token = headerToken || cookieToken;

    console.log('token', token);
    const res = await clerkClient.authenticateRequest({ headerToken: token });
    console.log('res', res);
    req.auth = res.toAuth();

    return true;
  }
}
