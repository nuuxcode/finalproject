// webhook.service.ts

import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class WebhookService {
  constructor(private readonly userService: UserService) {}

  async handleWebhook(message) {
    const { id, type, data } = message;
    console.log(data);
    if (type === 'user.created') {
      console.log(`User ${id} was ${type}`);
      // const firstName = data.first_name;
      // const lastName = data.last_name;

      await this.userService.createUser({
        id: id,
        username: 'x',
        password: 'xx',
        email: 'xxx',
      });

      console.log('User saved to database');
    }
  }
}
