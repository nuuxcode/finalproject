import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { CLERK, ClerkService } from '../clerk/clerk.module';
import { Counter, Gauge } from 'prom-client';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { NextFunction, Response, Request } from 'express';

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

@Injectable()
export class CustomMetricsMiddleware implements NestMiddleware {
  public customDurationGauge: Gauge<string>;
  public customErrorsCounter: Counter<string>;

  constructor(
    // Must be identical to those declared in our AppModule
    @InjectMetric('count') public appCounter: Counter<string>,
    @InjectMetric('gauge') public appGauge: Gauge<string>,
  ) {
    // Customizing the names and help messages for metrics

    this.customDurationGauge = new Gauge<string>({
      name: 'app_duration_metrics',
      help: 'app_concurrent_metrics_help',
      labelNames: ['app_method', 'app_origin', 'le'],
    });
    this.customErrorsCounter = new Counter<string>({
      name: 'app_error_metrics',
      help: 'app_usage_metrics_to_detect_errors',
      labelNames: ['app_method', 'app_origin', 'app_status'],
    });
  }
  use(req: Request, res: Response, next: NextFunction) {
    this.appCounter.labels(req.method, req.originalUrl).inc();
    this.appGauge.inc();

    // Recording start time for measuring duration
    const startTime = Date.now();

    // Setting up a callback for when the response finishes
    res.on('finish', () => {
      // Calculating the duration and recording it in the custom duration gauge
      const endTime = Date.now();
      const duration = endTime - startTime;
      this.customDurationGauge
        .labels(req.method, req.originalUrl, (duration / 1000).toString())
        .set(duration);

      // Incrementing the custom errors counter based on the response status code
      this.customErrorsCounter
        .labels(req.method, req.originalUrl, res.statusCode.toString())
        .inc();
    });

    next();
  }
}
