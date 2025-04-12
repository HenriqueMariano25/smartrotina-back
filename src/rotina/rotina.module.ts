import { Module } from '@nestjs/common';
import { RotinaController } from './rotina.controller';
import { RotinaService } from './rotina.service';
import { PrismaService } from '../config/prisma/prisma.service';
import { RotinaRepository } from './repositories/rotina.repository';

@Module({
  controllers: [RotinaController],
  providers: [RotinaService, PrismaService, RotinaRepository],
})
export class RotinaModule {}
