import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from '../user/user.module';
import { PostModule } from '../post/post.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { GLOBAL_CONFIG } from '../../configs/global.config';
import { AppService, CustomMetricsMiddleware } from './app.service';
import { AppController } from './app.controller';
import { ClerkModule } from '../clerk/clerk.module';
import { ForumModule } from '../forum/forum.module'; // Import the ForumModul
import { PrometheusModule, makeCounterProvider, makeGaugeProvider } from '@willsoto/nestjs-prometheus';
import { CommentModule } from '../comment/comment.module';
import { WebhookModule } from '../webhook/webhook.module';

@Module({
  imports: [
    PrometheusModule.register({
      path: '/app-metrics',
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    PostModule,
    CommentModule,
    WebhookModule,
    ConfigModule.forRoot({ isGlobal: true, load: [() => GLOBAL_CONFIG] }),
    ClerkModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretKey: configService.get('CLERK_KEY'),
        publishableKey: configService.get('CLERK_PUB_KEY'),
      }),
      inject: [ConfigService],
    }),
    ForumModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    makeCounterProvider({
      name: 'count',
      help: 'metric_help',
      labelNames: ['method', 'origin'] as string[],
    }),
    makeGaugeProvider({
      name: 'gauge',
      help: 'metric_help',
    }),
  ],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomMetricsMiddleware).forRoutes('*');
  }
}
