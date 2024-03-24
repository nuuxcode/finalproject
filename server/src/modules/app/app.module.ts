import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from '../user/user.module';
import { PostModule } from '../post/post.module';
//import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { GLOBAL_CONFIG } from '../../configs/global.config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ClerkModule } from '../clerk/clerk.module';

@Module({
  imports: [
    PrismaModule,
    //AuthModule,
    UserModule,
    PostModule,
    ConfigModule.forRoot({ isGlobal: true, load: [() => GLOBAL_CONFIG] }),
    ClerkModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretKey: configService.get('CLERK_KEY'),
        publishableKey: configService.get('CLERK_PUB_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
