import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:4000',
      'http://127.0.0.1:4000',
      'http://192.168.1.86:4000',
      'http://192.168.51.105:4000',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
