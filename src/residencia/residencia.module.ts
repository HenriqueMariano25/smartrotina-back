import { Module } from '@nestjs/common';
import { ResidenciaController } from './residencia.controller';
import { ResidenciaService } from './residencia.service';
import { ResidenciaRepository } from './repositories/residencia.repository';
import { PrismaService } from '../config/prisma/prisma.service';
import { MoradorRepository } from './repositories/morador.repository';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
  controllers: [ResidenciaController],
  providers: [
    ResidenciaService,
    ResidenciaRepository,
    PrismaService,
    MoradorRepository,
  ],
})
export class ResidenciaModule {}
