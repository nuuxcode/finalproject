import { Inject, Injectable } from '@nestjs/common';
import { CLERK, ClerkService } from '../clerk/clerk.module';

@Injectable()
export class AppService {
  constructor(@Inject(CLERK) private readonly clerk: ClerkService) {}

  async getHello(userId?: string) {
    if (!userId) {
      return 'Hello, you are not log in!';
    } else {
      const user = await this.clerk.users.getUser(userId);
      return `Hello you are log in, ${user.firstName} ${user.lastName}!`;
    }
  }

  async getWelcome(userId: string) {
    const user = await this.clerk.users.getUser(userId);
    return `Welcome you are log in, ${user.firstName} ${user.lastName}!`;
  }
}
