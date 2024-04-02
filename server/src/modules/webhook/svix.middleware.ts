// svix.middleware.ts
import { Injectable, NestMiddleware, RawBodyRequest } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Webhook, WebhookVerificationError } from 'svix';

@Injectable()
export class SvixMiddleware implements NestMiddleware {
  use(req: RawBodyRequest<Request>, res: Response, next: NextFunction) {
    const wh = new Webhook(process.env.SVIX_WEBHOOK_SECRET);
    try {
      const payload = req.rawBody.toString();
      //console.log(payload);
      const signature = Array.isArray(req.headers['svix-signature'])
        ? req.headers['svix-signature'][0]
        : req.headers['svix-signature'];
      const timestamp = Array.isArray(req.headers['svix-timestamp'])
        ? req.headers['svix-timestamp'][0]
        : req.headers['svix-timestamp'];
      const id = Array.isArray(req.headers['svix-id'])
        ? req.headers['svix-id'][0]
        : req.headers['svix-id'];
      //console.log(signature, timestamp, id);
      const msg = wh.verify(payload, {
        'svix-signature': signature,
        'svix-timestamp': timestamp,
        'svix-id': id,
      });
      //console.log("x", msg);
      req.body = msg;
      next();
    } catch (err) {
      if (err instanceof WebhookVerificationError) {
        //console.error(err);
        res.status(403).send();
      } else {
        throw err;
      }
    }
  }
}
