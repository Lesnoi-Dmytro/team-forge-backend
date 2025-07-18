import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';

async function bootstrap() {
  await dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors({ origin: process.env.ORIGIN });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
