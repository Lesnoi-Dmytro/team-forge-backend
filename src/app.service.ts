import { Injectable } from '@nestjs/common';
import type { HealthStatus } from 'src/app.models';

@Injectable()
export class AppService {
  getHealthStatus(): HealthStatus {
    return {
      status: 'Server is running',
    };
  }
}
