import { Module } from '@nestjs/common';
import { ListaProdutosController } from './lista-produtos.controller';
import { ListaProdutosService } from './lista-produtos.service';
import { ListaProdutosRepository } from './repositories/listaProdutos.repository';
import { PrismaService } from '../config/prisma/prisma.service';
import { ProdutoRepository } from './repositories/produto.repository';
import { TipoProdutoRepository } from './repositories/tipoProduto.repository';

@Module({
  controllers: [ListaProdutosController],
  providers: [
    ListaProdutosService,
    ListaProdutosRepository,
    PrismaService,
    ProdutoRepository,
    TipoProdutoRepository
  ],
})
export class ListaProdutosModule {}
