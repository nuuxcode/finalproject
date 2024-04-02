import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class WebhookService {
  constructor(private readonly userService: UserService) {}

  async handleWebhook(message) {
    console.log('Webhook received service');
    console.log(message);
    const { type, data } = message;

    if (type === 'user.created') {
      console.log(`User ${data.username} was ${type}`);

      const username = data.username || 'default_username';
      const password = 'xxxx';
      const avatarUrl = data.image_url;
      const email = data.email_addresses[0].email_address;

      const user = await this.userService.findUser({ id: data.id });

      if (user) {
        await this.userService.updateUser({
          where: { id: data.id },
          data: {
            username: username,
            password: password,
            email: email,
            avatarUrl: avatarUrl,
          },
        });

        console.log('User updated in database');
      } else {
        await this.userService.createUser({
          id: data.id,
          username: username,
          password: password,
          email: email,
          avatarUrl: avatarUrl,
        });

        console.log('User saved to database');
      }
    } else if (type === 'user.updated') {
      console.log(`User ${data.username} was ${type}`);

      const username = data.username || 'default_username';
      const avatarUrl = data.image_url;
      const email = data.email_addresses[0].email_address;

      const user = await this.userService.findUser({ id: data.id });

      if (user) {
        await this.userService.updateUser({
          where: { id: data.id },
          data: {
            username: username,
            email: email,
            avatarUrl: avatarUrl,
          },
        });

        console.log('User updated in database');
      } else {
        await this.userService.createUser({
          id: data.id,
          username: username,
          password: 'xxxx',
          email: email,
          avatarUrl: avatarUrl,
        });

        console.log('User created in database');
      }
    } else if (type === 'user.deleted') {
      console.log(`User ${data.username} was ${type}`);

      const user = await this.userService.findUser({ id: data.id });

      if (user) {
        await this.userService.deleteUser({ id: data.id });
        console.log('User deleted from database');
      } else {
        console.log('User not found in database');
      }
    }
  }
}
