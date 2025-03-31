import { Module } from '@nestjs/common';
import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoService } from './autenticacao.service';
import { PrismaService } from '../config/prisma/prisma.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UsuarioModule],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService, PrismaService, JwtStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class AutenticacaoModule {}
