import { Module } from '@nestjs/common';
import { ListaProdutosController } from './lista-produtos.controller';
import { ListaProdutosService } from './lista-produtos.service';
import { ListaProdutosRepository } from './repositories/listaProdutos.repository';
import { PrismaService } from '../config/prisma/prisma.service';

@Module({
  controllers: [ListaProdutosController],
  providers: [ListaProdutosService, ListaProdutosRepository, PrismaService],
})
export class ListaProdutosModule {}
