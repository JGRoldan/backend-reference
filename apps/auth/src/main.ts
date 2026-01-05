import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Seguridad básica HTTP
  app.use(helmet());

  // Prefijo global
  app.setGlobalPrefix('api');

  // Pipes globales de NestJS
  // Validación de datos de entrada
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Filtros globales
  // Manejo de excepciones personalizadas
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Interceptors globales
  // Logging de solicitudes y respuestas
  app.useGlobalInterceptors(new LoggingInterceptor());

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  Logger.log(`🚀 Auth service running on port ${port}`);
}

bootstrap();
