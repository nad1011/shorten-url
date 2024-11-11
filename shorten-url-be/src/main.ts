import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ThrottlerExceptionFilter } from './throttler/throttler-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ThrottlerExceptionFilter());

  await app.listen(3000);
}
bootstrap();
