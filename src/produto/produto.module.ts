import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';
import { PrismaService } from '../config/prisma/prisma.service';
import { ProdutoRepository } from './repositories/produto.repository';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoService, PrismaService, ProdutoRepository],
  exports: [ProdutoService],
})
export class ProdutoModule {}
