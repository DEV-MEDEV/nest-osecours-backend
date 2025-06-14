import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfoModule } from './info/info.module';
import { PrismaService } from './prisma.service';
import { LoggerService } from './logger.service';

@Module({
  imports: [InfoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, LoggerService],
  exports: [PrismaService, LoggerService],
})
export class AppModule {}
