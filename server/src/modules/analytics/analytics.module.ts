import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService, PrismaService],
})
export class AnalyticsModule {}
