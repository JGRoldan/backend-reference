import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { validateEnv } from './config/env.config';
import { AuthModule } from './modules/auth/auth.module';

// Este es el módulo principal de la aplicación.
// Actua como un contenedor para los controladores y servicios relacionados con la autenticación.
// Se ensambla aquí la funcionalidad de autenticación para ser utilizada en toda la aplicación.
@Module({
  imports: [
    // Configuración global de la aplicación con validación de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validate: validateEnv
    }),

    AuthModule,
  ],
})
export class AppModule {}
