// src/common/services/logger.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

interface LogEventOptions {
  message: string;
  source?: string;
  userId?: string;
  action?: string;
  ipAddress?: string;
  requestData?: Prisma.InputJsonValue;
  responseData?: Prisma.InputJsonValue;
  status?: string;
  environment?: string;
  deviceInfo?: Prisma.InputJsonValue;
}

@Injectable()
export class LoggerService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Enregistre un log dans la base de données.
   */
  async logEvent(options: LogEventOptions): Promise<void> {
    const {
      message,
      source = '',
      userId = '',
      action = '',
      ipAddress = '',
      requestData = {},
      responseData = {},
      status = '',
      environment = process.env.NODE_ENV || 'development',
      deviceInfo = {},
    } = options;

    try {
      await this.prisma.log.create({
        data: {
          message,
          source,
          userId,
          action,
          ipAddress,
          requestData,
          responseData,
          status,
          environment,
          deviceInfo,
        },
      });
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement du log:",
        (error as Error).message,
      );
    }
  }
}
