// full implementation with configurable module and injectable service

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Module,
  Inject,
  ConfigurableModuleBuilder,
  DynamicModule,
} from '@nestjs/common';
import { Clerk } from '@clerk/clerk-sdk-node';

export const CLERK = 'CLERK';
export type ClerkService = ReturnType<typeof Clerk>;

type ClerkKeys = { secretKey: string; publishableKey: string };

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: CLERK_KEYS,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<ClerkKeys>()
  .setClassMethodName('forRoot')
  .build();

@Injectable()
export class ClerkGuard implements CanActivate {
  constructor(@Inject(CLERK) private readonly clerk: ClerkService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization || ``;
    const headerToken = authHeader.split(' ')[1];

    const res = await this.clerk.authenticateRequest({ headerToken });

    const auth = res.toAuth();
    req.auth = {
      ...auth,
      claims: auth.sessionClaims,
    };

    return true;
  }
}

@Injectable()
export class ClerkRequiredGuard implements CanActivate {
  constructor(@Inject(CLERK) private readonly clerk: ClerkService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization || ``;
    const headerToken = authHeader.split(' ')[1];

    const res = await this.clerk.authenticateRequest({ headerToken });

    if (!res.isSignedIn) return false;

    const auth = res.toAuth();

    req.auth = {
      ...auth,
      claims: auth.sessionClaims,
    };

    return true;
  }
}

@Module({})
export class ClerkModule extends ConfigurableModuleClass {
  private static hydrateModule(module: DynamicModule): DynamicModule {
    return {
      ...module,
      providers: [
        ...module.providers,
        {
          provide: CLERK,
          useFactory: (clerkKeys: ClerkKeys) =>
            Clerk({ secretKey: clerkKeys.secretKey }),
          inject: [CLERK_KEYS],
        },
      ],
      exports: [CLERK],
    };
  }

  static forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    return this.hydrateModule(super.forRoot(options));
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return this.hydrateModule(super.forRootAsync(options));
  }
}
