import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerConfig } from './common/swagger/swagger.config';
import { ENVIRONMENTS } from './common/constants/app-info.constants';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    // Création de l'application NestJS
    const app = await NestFactory.create(AppModule);

    // Configuration globale des pipes de validation
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    // Configuration CORS
    app.enableCors({
      origin: process.env.CORS_ORIGIN || [
        'http://localhost:3000',
        'http://localhost:3001',
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      credentials: true,
    });

    // Préfixe global pour toutes les routes API
    app.setGlobalPrefix('api/v1', {
      exclude: ['/'], // Exclure la route racine
    });

    // Configuration Swagger selon l'environnement
    const environment = process.env.NODE_ENV?.toLowerCase();

    if (environment === ENVIRONMENTS.PRODUCTION) {
      // En production, on peut limiter l'accès à Swagger
      SwaggerConfig.setupProduction(app);
    } else {
      // En développement et test, setup complet
      SwaggerConfig.setupDevelopment(app);
    }

    // Port d'écoute
    const port = process.env.PORT || 3000;
    const host = process.env.HOST || '0.0.0.0';

    await app.listen(port, host);
  } catch (error) {
    logger.error("❌ Erreur lors du démarrage de l'application:", error);
    process.exit(1);
  }
}

// Gestion des erreurs non capturées
process.on('unhandledRejection', (reason, promise) => {
  const logger = new Logger('UnhandledRejection');
  logger.error('Promesse rejetée non gérée:', reason);
  logger.error('À la promesse:', promise);
});

process.on('uncaughtException', (error) => {
  const logger = new Logger('UncaughtException');
  logger.error('Exception non capturée:', error);
  process.exit(1);
});

bootstrap();
