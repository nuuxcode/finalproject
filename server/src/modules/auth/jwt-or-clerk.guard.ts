import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ClerkGuard } from '../clerk/clerk.guard';
import { Observable } from 'rxjs';

@Injectable()
export class JwtOrClerkGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log(
      'JwtOrClerkGuard canActivate method called auth.jwt-or-clerk.guard.ts',
    );
    const jwtGuard = new (AuthGuard('jwt'))();
    const clerkGuard = new ClerkGuard();
    try {
      const clerkResult = await this.resolveGuardResult(
        clerkGuard.canActivate(context),
      );
      console.log('ClerkGuard canActivate method called clerk.guard.ts');
      console.log('clerkResult', clerkResult);
      if (clerkResult) {
        return true;
      } else {
        const jwtResult = await this.resolveGuardResult(
          jwtGuard.canActivate(context),
        );
        console.log('JwtGuard canActivate method called auth.jwt.guard.ts');
        return jwtResult;
      }
    } catch (err) {
      return false;
    }
  }

  private async resolveGuardResult(
    result: boolean | Promise<boolean> | Observable<boolean>,
  ): Promise<boolean> {
    if (typeof result === 'boolean') {
      return result;
    } else if (result instanceof Promise) {
      return result;
    } else if (result instanceof Observable) {
      return result.toPromise();
    }
    return false;
  }
}
