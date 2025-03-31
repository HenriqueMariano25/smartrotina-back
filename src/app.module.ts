import { Module } from '@nestjs/common';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [AutenticacaoModule, UsuarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
