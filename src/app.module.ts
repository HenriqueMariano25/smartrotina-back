import {Module} from '@nestjs/common';
import {AutenticacaoModule} from './autenticacao/autenticacao.module';
import {UsuarioModule} from './usuario/usuario.module';
import {ResidenciaModule} from './residencia/residencia.module';
import {ListaProdutosModule} from './lista-produtos/lista-produtos.module';
import {RotinaModule} from './rotina/rotina.module';
import {ProdutoModule} from './produto/produto.module';
import {ConfigModule} from '@nestjs/config';
import { MercadoModule } from './mercado/mercado.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET
    }),
    AutenticacaoModule, UsuarioModule, ResidenciaModule, ListaProdutosModule, RotinaModule, ProdutoModule, MercadoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
