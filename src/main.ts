import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import * as process from 'node:process';
import { readFileSync } from 'fs';

async function bootstrap() {
  const httpsOptions =
    process.env.USE_HTTPS === 'true'
      ? {
          key: readFileSync('certs/key.pem'),
          cert: readFileSync('certs/cert.pem'),
        }
      : {};
  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.use(cookieParser());
  app.enableCors({
    origin: [
      'https://localhost:4000',
      'https://127.0.0.1:4000',
      'https://192.168.1.86:4000',
      'https://192.168.51.105:4000',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
