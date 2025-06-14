import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { API_DOCS_CONFIG } from '../constants/app-info.constants';

/**
 * Configuration et setup de Swagger pour l'API O'Secours
 */
export class SwaggerConfig {
  /**
   * Configure et initialise Swagger pour l'application
   */
  static setup(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle(API_DOCS_CONFIG.TITLE)
      .setDescription(API_DOCS_CONFIG.DESCRIPTION)
      .setVersion(API_DOCS_CONFIG.VERSION)
      .setLicense(API_DOCS_CONFIG.LICENSE.name, API_DOCS_CONFIG.LICENSE.url)
      .addServer('http://localhost:3000', 'Serveur de développement')
      .addServer('https://api.osecours.fr', 'Serveur de production')

      // Configuration de sécurité JWT
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: "Token JWT pour l'authentification",
          in: 'header',
        },
        'JWT-auth',
      )

      // Tags organisés par module
      .addTag('Info', 'Informations du backend et contrôles de santé')

      .build();

    const document = SwaggerModule.createDocument(app, config, {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
      deepScanRoutes: true,
    });

    // Personnalisation de l'interface Swagger
    const customOptions = {
      customSiteTitle: "API O'Secours - Documentation",
      customfavIcon: '/favicon.ico',
      swaggerOptions: {
        persistAuthorization: true,
        displayOperationId: false,
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
        defaultModelsExpandDepth: 2,
        defaultModelExpandDepth: 2,
        docExpansion: 'list',
        operationsSorter: 'alpha',
        tagsSorter: 'alpha',
      },
    };

    // Setup Swagger UI
    SwaggerModule.setup(
      API_DOCS_CONFIG.BASE_PATH,
      app,
      document,
      customOptions,
    );

    // Endpoint JSON pour la documentation
    SwaggerModule.setup(API_DOCS_CONFIG.JSON_PATH, app, document, {
      jsonDocumentUrl: API_DOCS_CONFIG.JSON_PATH,
    });
  }

  /**
   * Configuration pour les environnements de développement
   */
  static setupDevelopment(app: INestApplication): void {
    // En développement, on peut ajouter des fonctionnalités supplémentaires
    this.setup(app);

    console.log(
      `📚 Documentation Swagger disponible sur: http://localhost:3000${API_DOCS_CONFIG.BASE_PATH}`,
    );
    console.log(
      `📄 JSON Swagger disponible sur: http://localhost:3000${API_DOCS_CONFIG.JSON_PATH}`,
    );
  }

  /**
   * Configuration pour l'environnement de production
   */
  static setupProduction(app: INestApplication): void {
    // En production, on peut désactiver certaines fonctionnalités
    // ou ajouter des restrictions d'accès
    this.setup(app);

    console.log(`📚 Documentation API déployée`);
  }
}
