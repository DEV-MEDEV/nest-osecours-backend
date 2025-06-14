import { IAppMetadata } from '../../info/interfaces/backend-info.interface';

/**
 * Constantes statiques de l'application O'Secours
 */
export const APP_INFO: IAppMetadata = {
  name: "O'Secours Backend API",
  version: process.env.npm_package_version || '1.0.0',
  description:
    "API backend pour le système d'alerte d'urgence O'Secours permettant la gestion des alertes, interventions et communications entre citoyens et services de secours",
  author: "Équipe O'Secours",
};

/**
 * Constantes pour les statuts de l'application
 */
export const APP_STATUS = {
  HEALTHY: 'healthy',
  DEGRADED: 'degraded',
  UNHEALTHY: 'unhealthy',
} as const;

/**
 * Constantes pour les environnements
 */
export const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;

/**
 * Constantes pour les statuts de base de données
 */
export const DATABASE_STATUS = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  ERROR: 'error',
} as const;

/**
 * Configuration des URLs de documentation
 */
export const API_DOCS_CONFIG = {
  BASE_PATH: '/api/docs',
  JSON_PATH: '/api/docs-json',
  TITLE: "Documentation API O'Secours",
  DESCRIPTION:
    "Documentation complète de l'API backend du système d'alerte d'urgence O'Secours",
  VERSION: APP_INFO.version,
  CONTACT: {
    name: "Équipe O'Secours",
    email: 'support@osecours.fr',
  },
  LICENSE: {
    name: 'MIT',
    url: 'https://opensource.org/licenses/MIT',
  },
} as const;

/**
 * Constantes pour les tags Swagger
 */
export const SWAGGER_TAGS = {
  INFO: 'Info',
  AUTH: 'Authentication',
  ALERTS: 'Alerts',
  RESCUE: 'Rescue Services',
  INTERVENTIONS: 'Interventions',
  NOTIFICATIONS: 'Notifications',
  ADMIN: 'Administration',
  CITIZEN: 'Citizen',
  MONITORING: 'Monitoring',
} as const;

/**
 * Métadonnées techniques
 */
export const TECHNICAL_INFO = {
  DATABASE_PROVIDER: 'mysql',
  ORM: 'Prisma',
  FRAMEWORK: 'NestJS',
  LANGUAGE: 'TypeScript',
  NODE_MIN_VERSION: '18.0.0',
} as const;

/**
 * Types dérivés des constantes
 */
export type AppStatus = (typeof APP_STATUS)[keyof typeof APP_STATUS];
export type Environment = (typeof ENVIRONMENTS)[keyof typeof ENVIRONMENTS];
export type DatabaseStatus =
  (typeof DATABASE_STATUS)[keyof typeof DATABASE_STATUS];
