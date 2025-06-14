import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [InfoController],
  providers: [InfoService, PrismaService],
  exports: [InfoService],
})
export class InfoModule {}
