import { ApiProperty } from '@nestjs/swagger';

export class BackendInfoDto {
  @ApiProperty({
    description: "Nom de l'application",
    example: "O'Secours Backend API",
  })
  name: string;

  @ApiProperty({
    description: "Version de l'application",
    example: '1.0.0',
  })
  version: string;

  @ApiProperty({
    description: "Description de l'application",
    example: "API backend pour le système d'alerte d'urgence O'Secours",
  })
  description: string;

  @ApiProperty({
    description: "Auteur de l'application",
    example: "Équipe O'Secours",
  })
  author: string;

  @ApiProperty({
    description: "Environnement d'exécution",
    example: 'development',
    enum: ['development', 'production', 'test'],
  })
  environment: string;

  @ApiProperty({
    description: 'Date de dernière mise à jour',
    example: '2024-06-14T10:30:00.000Z',
    type: Date,
  })
  lastUpdated: Date;

  @ApiProperty({
    description: "Timestamp de démarrage de l'application",
    example: '2024-06-14T08:00:00.000Z',
    type: Date,
  })
  startTime: Date;

  @ApiProperty({
    description: 'Temps de fonctionnement (uptime) en millisecondes',
    example: 3600000,
  })
  uptime: number;

  @ApiProperty({
    description: 'Version de Node.js utilisée',
    example: '18.17.0',
  })
  nodeVersion: string;

  @ApiProperty({
    description: "Statut de santé de l'application",
    example: 'healthy',
    enum: ['healthy', 'degraded', 'unhealthy'],
  })
  status: string;

  @ApiProperty({
    description: 'URL de la documentation API',
    example: 'http://localhost:3000/api/docs',
  })
  apiDocsUrl: string;

  @ApiProperty({
    description: 'Informations sur la base de données',
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        example: 'mysql',
      },
      status: {
        type: 'string',
        example: 'connected',
      },
    },
  })
  database: {
    provider: string;
    status: string;
  };
}
