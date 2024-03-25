// webhook.dto.ts
import { IsString, IsObject } from 'class-validator';

export class WebhookDto {
  @IsString()
  id: string;

  @IsObject()
  attributes: any;

  @IsString()
  type: string;
}
