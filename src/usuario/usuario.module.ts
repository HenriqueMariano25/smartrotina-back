import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { UsuarioRepository } from './repositories/usuario.repository';
import { PrismaService } from '../config/prisma/prisma.service';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaService, UsuarioRepository],
  exports: [UsuarioService],
})
export class UsuarioModule {}
