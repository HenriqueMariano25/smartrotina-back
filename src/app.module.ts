import { Module } from '@nestjs/common';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ResidenciaModule } from './residencia/residencia.module';

@Module({
  imports: [AutenticacaoModule, UsuarioModule, ResidenciaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
