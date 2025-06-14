import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { InfoService } from './info.service';
import { BackendInfoDto } from './dto/backend-info.dto';
import { IBackendInfo } from './interfaces/backend-info.interface';
import { SWAGGER_TAGS } from '../common/constants/app-info.constants';

@ApiTags(SWAGGER_TAGS.INFO)
@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get()
  @ApiOperation({
    summary: 'Récupérer les informations du backend',
    description: `Retourne toutes les informations détaillées du backend O'Secours`,
  })
  @ApiOkResponse({
    description: 'Informations du backend récupérées avec succès',
    type: BackendInfoDto,
    example: {
      name: "O'Secours Backend API",
      version: '1.0.0',
      description: "API backend pour le système d'alerte d'urgence O'Secours",
      author: "Équipe O'Secours",
      environment: 'development',
      lastUpdated: '2024-06-14T10:30:00.000Z',
      startTime: '2024-06-14T08:00:00.000Z',
      uptime: 3600000,
      nodeVersion: 'v18.17.0',
      status: 'healthy',
      apiDocsUrl: 'http://localhost:3000/api/docs',
      database: {
        provider: 'mysql',
        status: 'connected',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description:
      'Erreur interne du serveur lors de la récupération des informations',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: {
          type: 'string',
          example: 'Erreur lors de la récupération des informations du backend',
        },
        error: { type: 'string', example: 'Internal Server Error' },
      },
    },
  })
  async getBackendInfo(): Promise<IBackendInfo> {
    return await this.infoService.getBackendInfo();
  }
}
