import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ClerkGuard, ClerkRequiredGuard } from '../clerk/clerk.module';
import { RequireAuthProp, WithAuthProp } from '@clerk/clerk-sdk-node';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  @UseGuards(ClerkGuard)
  async getHello(@Request() req: WithAuthProp<Request>) {
    const userId = req.auth.userId;
    const message = await this.appService.getHello(userId);
    return { message };
  }

  @Get('/welcome')
  @UseGuards(ClerkRequiredGuard)
  async getWelcome(@Request() req: RequireAuthProp<Request>) {
    const userId = req.auth.userId;
    const message = await this.appService.getWelcome(userId);
    return { message };
  }
}
