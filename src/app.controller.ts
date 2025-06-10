import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import type { HealthStatus } from 'src/app.models';
import { Public } from 'src/auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('hc')
  getHealthStatus(): HealthStatus {
    return this.appService.getHealthStatus();
  }
}
