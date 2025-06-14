import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  IBackendInfo,
  IDatabaseInfo,
  IHealthCheck,
} from './interfaces/backend-info.interface';
import {
  APP_INFO,
  APP_STATUS,
  DATABASE_STATUS,
  ENVIRONMENTS,
  TECHNICAL_INFO,
  API_DOCS_CONFIG,
  Environment,
  AppStatus,
} from '../common/constants/app-info.constants';

@Injectable()
export class InfoService {
  private readonly startTime: Date;

  constructor(private readonly prisma: PrismaService) {
    this.startTime = new Date();
  }

  /**
   * Récupère toutes les informations du backend
   */
  async getBackendInfo(): Promise<IBackendInfo> {
    const packageJson = this.getPackageInfo();
    const databaseInfo = await this.getDatabaseInfo();
    const healthStatus = await this.getHealthStatus();

    return {
      name: APP_INFO.name,
      version: packageJson.version,
      description: APP_INFO.description,
      author: APP_INFO.author,
      environment: this.getEnvironment(),
      lastUpdated: this.getLastUpdated(),
      startTime: this.startTime,
      uptime: this.getUptime(),
      nodeVersion: process.version,
      status: healthStatus,
      apiDocsUrl: this.getApiDocsUrl(),
      database: databaseInfo,
    };
  }

  /**
   * Vérifie le statut de santé de l'application
   */
  async checkHealth(): Promise<IHealthCheck> {
    const databaseInfo = await this.getDatabaseInfo();
    const status = await this.getHealthStatus();

    return {
      status,
      database: databaseInfo,
      timestamp: new Date(),
    };
  }

  /**
   * Récupère les informations de la base de données
   */
  private async getDatabaseInfo(): Promise<IDatabaseInfo> {
    try {
      // Test de connexion à la base de données
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        provider: TECHNICAL_INFO.DATABASE_PROVIDER,
        status: DATABASE_STATUS.CONNECTED,
      };
    } catch (error) {
      console.error('Erreur de connexion à la base de données:', error);

      return {
        provider: TECHNICAL_INFO.DATABASE_PROVIDER,
        status: DATABASE_STATUS.ERROR,
      };
    }
  }

  /**
   * Détermine le statut global de santé de l'application
   */
  private async getHealthStatus(): Promise<AppStatus> {
    try {
      const databaseInfo = await this.getDatabaseInfo();

      // Si la BDD est en erreur, l'app est unhealthy
      if (databaseInfo.status === DATABASE_STATUS.ERROR) {
        return APP_STATUS.UNHEALTHY;
      }

      // Si la BDD est déconnectée, l'app est degraded
      if (databaseInfo.status === DATABASE_STATUS.DISCONNECTED) {
        return APP_STATUS.DEGRADED;
      }

      // Vérifications supplémentaires (mémoire, CPU, etc.)
      const memoryUsage = process.memoryUsage();
      const memoryThreshold = 500 * 1024 * 1024; // 500MB

      if (memoryUsage.heapUsed > memoryThreshold) {
        return APP_STATUS.DEGRADED;
      }

      return APP_STATUS.HEALTHY;
    } catch (error) {
      console.error('Erreur lors de la vérification de santé:', error);
      return APP_STATUS.UNHEALTHY;
    }
  }

  /**
   * Récupère l'environnement actuel
   */
  private getEnvironment(): Environment {
    const env = process.env.NODE_ENV?.toLowerCase();

    switch (env) {
      case 'production':
        return ENVIRONMENTS.PRODUCTION;
      case 'test':
        return ENVIRONMENTS.TEST;
      default:
        return ENVIRONMENTS.DEVELOPMENT;
    }
  }

  /**
   * Calcule le temps de fonctionnement en millisecondes
   */
  private getUptime(): number {
    return Date.now() - this.startTime.getTime();
  }

  /**
   * Récupère la date de dernière mise à jour (build time ou start time)
   */
  private getLastUpdated(): Date {
    // En production, on pourrait récupérer la date de build
    // Pour l'instant, on utilise la date de démarrage
    return this.startTime;
  }

  /**
   * Construit l'URL de la documentation API
   */
  private getApiDocsUrl(): string {
    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || 3000;
    const protocol =
      this.getEnvironment() === ENVIRONMENTS.PRODUCTION ? 'https' : 'http';

    return `${protocol}://${host}:${port}${API_DOCS_CONFIG.BASE_PATH}`;
  }

  /**
   * Récupère les informations du package.json
   */
  private getPackageInfo() {
    try {
      // En production, ces informations pourraient être injectées via des variables d'environnement
      return {
        version: process.env.npm_package_version || APP_INFO.version,
        name: process.env.npm_package_name || APP_INFO.name,
      };
    } catch (error) {
      console.warn(
        'Impossible de lire package.json, utilisation des valeurs par défaut',
        error,
      );
      return {
        version: APP_INFO.version,
        name: APP_INFO.name,
      };
    }
  }
}
