import { Module } from '@nestjs/common';
import { ResidenciaController } from './residencia.controller';
import { ResidenciaService } from './residencia.service';
import { ResidenciaRepository } from './repositories/residencia.repository';
import { PrismaService } from '../config/prisma/prisma.service';

@Module({
  controllers: [ResidenciaController],
  providers: [ResidenciaService, ResidenciaRepository, PrismaService],
})
export class ResidenciaModule {}
