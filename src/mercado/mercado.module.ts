import { Module } from '@nestjs/common';
import { MercadoController } from './mercado.controller';
import { MercadoService } from './mercado.service';
import { MercadoRepository } from './repositories/mercado.repository';
import { PrismaService } from '../config/prisma/prisma.service';

@Module({
  controllers: [MercadoController],
  providers: [MercadoService, MercadoRepository, PrismaService],
})
export class MercadoModule {}
