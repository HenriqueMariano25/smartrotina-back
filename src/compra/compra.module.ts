import { Module } from '@nestjs/common';
import { CompraController } from './compra.controller';
import { CompraService } from './compra.service';
import { CompraRepository } from './repositories/compra.repository';
import { FormaPagamentoRepository } from './repositories/formaPagamento.repository';
import { PrismaService } from '../config/prisma/prisma.service';
import { ListaProdutosModule } from '../lista-produtos/lista-produtos.module';
import { ListaProdutosService } from '../lista-produtos/lista-produtos.service';

@Module({
  imports: [ListaProdutosModule],
  controllers: [CompraController],
  providers: [
    CompraService,
    CompraRepository,
    FormaPagamentoRepository,
    PrismaService,
  ],
})
export class CompraModule {}
