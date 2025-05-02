import { Module } from '@nestjs/common';
import { ListaProdutosController } from './lista-produtos.controller';
import { ListaProdutosService } from './lista-produtos.service';
import { ListaProdutosRepository } from './repositories/listaProdutos.repository';
import { PrismaService } from '../config/prisma/prisma.service';
import { TipoProdutoRepository } from './repositories/tipoProduto.repository';
import { ProdutoModule } from '../produto/produto.module';
import { ProdutoListaProdutoRepository } from './repositories/produtoListaProduto.repository';

@Module({
  imports: [ProdutoModule],
  controllers: [ListaProdutosController],
  providers: [
    ListaProdutosService,
    ListaProdutosRepository,
    PrismaService,
    TipoProdutoRepository,
    ProdutoListaProdutoRepository,
  ],
  exports: [ListaProdutosService],
})
export class ListaProdutosModule {}
