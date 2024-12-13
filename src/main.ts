import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);  // Listen on port 3000 (or any port you prefer)
  console.log('App started on http://localhost:3000');
}

bootstrap().catch(err => console.error('Error bootstrapping app:', err));
