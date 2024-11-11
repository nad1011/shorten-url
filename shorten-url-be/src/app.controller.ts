import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipThrottle } from './decorators/throttler.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SkipThrottle()
  getAppInfo() {
    return this.appService.getAppInfo();
  }

  @Get('health')
  @SkipThrottle()
  async getHealthStatus() {
    return this.appService.getHealthStatus();
  }
}
