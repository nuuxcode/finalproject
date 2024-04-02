import {
  Controller,
  Post,
  Get,
  HttpCode,
  Req,
  RawBodyRequest,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { Request } from 'express';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Get()
  checkLive() {
    console.log('Webhook is live');
    return { success: true, message: 'Webhook is live' };
  }

  @Post()
  @HttpCode(200)
  async handleWebhook(@Req() req: RawBodyRequest<Request>) {
    const rawBody = req.body;
    console.log('Webhook received controller');
    try {
      await this.webhookService.handleWebhook(rawBody);
      return { success: true, message: 'Webhook received' };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
}
