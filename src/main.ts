import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug']
  });
  app.enableCors();
  await app.listen(3000);
}

bootstrap().catch(err => console.error('Error bootstrapping app:', err));
