import { Module } from '@nestjs/common';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ResidenciaModule } from './residencia/residencia.module';
import { ListaProdutosModule } from './lista-produtos/lista-produtos.module';

@Module({
  imports: [AutenticacaoModule, UsuarioModule, ResidenciaModule, ListaProdutosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
