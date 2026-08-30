import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe — strips unknown fields, throws on invalid DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS — allow any localhost port in dev, production URL in prod
  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, SSR)
      if (!origin) return callback(null, true);
      // Allow any localhost port
      if (/^http:\/\/localhost(:\d+)?$/.test(origin)) return callback(null, true);
      // Allow configured production URL
      const prodUrl = process.env.FRONTEND_URL;
      if (prodUrl && origin === prodUrl) return callback(null, true);
      callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  });

  // Global API prefix
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 SectorSplit API running on: http://localhost:${port}/api`);
}
bootstrap();
