// // webhook.module.ts
// import {
//   Module,
//   NestModule,
//   MiddlewareConsumer,
//   RequestMethod,
// } from '@nestjs/common';
// import { WebhookController } from './webhook.controller';
// import { WebhookService } from './webhook.service';
// import { UserModule } from '../user/user.module';
// import { SvixMiddleware } from './svix.middleware';

// @Module({
//   imports: [UserModule],
//   controllers: [WebhookController],
//   providers: [WebhookService],
// })
// export class WebhookModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(SvixMiddleware)
//       .forRoutes({ path: 'webhook', method: RequestMethod.POST });
//   }
// }
